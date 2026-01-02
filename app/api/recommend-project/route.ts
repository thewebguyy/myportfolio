import { NextRequest, NextResponse } from 'next/server'
import { openai, PROJECT_RECOMMENDER_PROMPT, handleOpenAIError } from '@/lib/openai'
import { projects } from '@/lib/projects'

/**
 * AI Project Recommender API Route
 * 
 * Uses GPT-4 to semantically match user interests with portfolio projects
 * 
 * @route POST /api/recommend-project
 * @body { interest: string } - User's technical interest
 * @returns { recommendation: RecommendationResult }
 */
export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json()
    const { interest } = body

    // Validate input
    if (!interest || typeof interest !== 'string') {
      return NextResponse.json(
        { error: 'Invalid input. Please provide an interest string.' },
        { status: 400 }
      )
    }

    if (interest.length < 3) {
      return NextResponse.json(
        { error: 'Interest must be at least 3 characters long.' },
        { status: 400 }
      )
    }

    if (interest.length > 200) {
      return NextResponse.json(
        { error: 'Interest must be less than 200 characters.' },
        { status: 400 }
      )
    }

    // Prepare project data for AI
    const projectsData = projects.map(p => ({
      id: p.id,
      title: p.title,
      description: p.description,
      category: p.category,
      tags: p.tags,
      tech: p.tech,
    }))

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: PROJECT_RECOMMENDER_PROMPT,
        },
        {
          role: 'user',
          content: `User's interest: "${interest}"
          
Available projects:
${JSON.stringify(projectsData, null, 2)}

Analyze the user's interest and recommend the SINGLE most relevant project. Consider:
1. Technical stack overlap
2. Problem domain similarity
3. Complexity level
4. Practical applications

Return ONLY a JSON object (no markdown, no code blocks) with this exact structure:
{
  "projectId": "exact-project-id-from-list",
  "matchScore": 0-100,
  "reasoning": "2-3 sentences explaining why this is the best match",
  "techOverlap": ["tech1", "tech2"]
}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
      response_format: { type: 'json_object' },
    })

    // Parse AI response
    const rawResponse = completion.choices[0].message.content
    if (!rawResponse) {
      throw new Error('Empty response from OpenAI')
    }

    const aiResponse = JSON.parse(rawResponse)

    // Validate AI response structure
    if (!aiResponse.projectId || !aiResponse.reasoning) {
      throw new Error('Invalid AI response structure')
    }

    // Get full project details
    const recommendedProject = projects.find(p => p.id === aiResponse.projectId)
    
    if (!recommendedProject) {
      // Fallback to first featured project if AI returned invalid ID
      const fallbackProject = projects.find(p => p.featured) || projects[0]
      
      return NextResponse.json({
        recommendation: {
          projectId: fallbackProject.id,
          title: fallbackProject.title,
          category: fallbackProject.category,
          reasoning: `Based on your interest in "${interest}", this project showcases relevant technical skills.`,
          matchScore: 70,
          techOverlap: fallbackProject.tech.slice(0, 3),
          liveUrl: fallbackProject.liveUrl,
        },
      })
    }

    // Return successful recommendation
    return NextResponse.json({
      recommendation: {
        projectId: recommendedProject.id,
        title: recommendedProject.title,
        category: recommendedProject.category,
        reasoning: aiResponse.reasoning,
        matchScore: aiResponse.matchScore || 85,
        techOverlap: aiResponse.techOverlap || recommendedProject.tech.slice(0, 3),
        liveUrl: recommendedProject.liveUrl,
      },
    })

  } catch (error: any) {
    console.error('Project recommendation error:', error)

    // Handle OpenAI-specific errors
    const errorMessage = handleOpenAIError(error)

    return NextResponse.json(
      { 
        error: errorMessage,
        fallback: 'Try browsing the case studies page directly for project details.'
      },
      { status: error.status || 500 }
    )
  }
}

/**
 * Handle OPTIONS request for CORS
 */
export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    }
  )
}