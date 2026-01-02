import { NextRequest, NextResponse } from 'next/server'
import { openai, PROJECT_RECOMMENDER_PROMPT, handleOpenAIError } from '@/lib/openai'
import { projects } from '@/lib/projects'
import { createRateLimiter, getRateLimitHeaders } from '@/lib/rateLimit'

// Rate limiter: 10 requests per hour per IP
const rateLimiter = createRateLimiter({
  limit: 10,
  windowInSeconds: 3600, // 1 hour
})

export async function POST(request: NextRequest) {
  try {
    // Apply rate limiting
    const rateLimitResult = rateLimiter(request)
    
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { 
          error: 'Rate limit exceeded. Please try again later.',
          retryAfter: new Date(rateLimitResult.reset).toISOString(),
        },
        { 
          status: 429,
          headers: getRateLimitHeaders(rateLimitResult),
        }
      )
    }

    // Parse request body
    const body = await request.json()
    const { interest } = body

    // Validate input
    if (!interest || typeof interest !== 'string') {
      return NextResponse.json(
        { error: 'Invalid input. Please provide an interest string.' },
        { 
          status: 400,
          headers: getRateLimitHeaders(rateLimitResult),
        }
      )
    }

    if (interest.length < 3 || interest.length > 200) {
      return NextResponse.json(
        { error: 'Interest must be between 3 and 200 characters.' },
        { 
          status: 400,
          headers: getRateLimitHeaders(rateLimitResult),
        }
      )
    }

    // Sanitize input to prevent prompt injection
    const sanitizedInterest = interest
      .replace(/[<>]/g, '') // Remove HTML tags
      .substring(0, 200) // Enforce max length

    // Prepare project data
    const projectsData = projects.map(p => ({
      id: p.id,
      title: p.title,
      description: p.description,
      category: p.category,
      tags: p.tags,
      tech: p.tech,
    }))

    // Call OpenAI API with timeout
    const completion = await Promise.race([
      openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: PROJECT_RECOMMENDER_PROMPT,
          },
          {
            role: 'user',
            content: `User's interest: "${sanitizedInterest}"
          
Available projects:
${JSON.stringify(projectsData, null, 2)}

Return ONLY a JSON object with this structure:
{
  "projectId": "exact-project-id",
  "matchScore": 0-100,
  "reasoning": "2-3 sentences",
  "techOverlap": ["tech1", "tech2"]
}`,
          },
        ],
        temperature: 0.7,
        max_tokens: 500,
        response_format: { type: 'json_object' },
      }),
      new Promise<never>((_, reject) => 
        setTimeout(() => reject(new Error('Request timeout')), 25000)
      ),
    ])

    const rawResponse = completion.choices[0].message.content
    if (!rawResponse) {
      throw new Error('Empty response from OpenAI')
    }

    const aiResponse = JSON.parse(rawResponse)

    // Validate and sanitize AI response
    const recommendedProject = projects.find(p => p.id === aiResponse.projectId)
    
    if (!recommendedProject) {
      const fallbackProject = projects.find(p => p.featured) || projects[0]
      
      return NextResponse.json({
        recommendation: {
          projectId: fallbackProject.id,
          title: fallbackProject.title,
          category: fallbackProject.category,
          reasoning: `Based on your interest, this project showcases relevant skills.`,
          matchScore: 70,
          techOverlap: fallbackProject.tech.slice(0, 3),
          liveUrl: fallbackProject.liveUrl,
        },
      }, {
        headers: getRateLimitHeaders(rateLimitResult),
      })
    }

    return NextResponse.json({
      recommendation: {
        projectId: recommendedProject.id,
        title: recommendedProject.title,
        category: recommendedProject.category,
        reasoning: aiResponse.reasoning,
        matchScore: Math.min(100, Math.max(0, aiResponse.matchScore || 85)),
        techOverlap: aiResponse.techOverlap || recommendedProject.tech.slice(0, 3),
        liveUrl: recommendedProject.liveUrl,
      },
    }, {
      headers: getRateLimitHeaders(rateLimitResult),
    })

  } catch (error: any) {
    console.error('Project recommendation error:', error)
    const errorMessage = handleOpenAIError(error)

    return NextResponse.json(
      { 
        error: errorMessage,
        fallback: 'Try browsing the case studies page directly.'
      },
      { status: error.status || 500 }
    )
  }
}

export async function OPTIONS() {
  return NextResponse.json({}, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}