import { NextRequest, NextResponse } from 'next/server'
import { openai, RESUME_ANALYZER_PROMPT, handleOpenAIError, AI_CONFIG } from '@/lib/openai'
import { createRateLimiter, getRateLimitHeaders } from '@/lib/rateLimit'

// Rate limiter: 5 requests per hour (more strict due to longer processing)
const rateLimiter = createRateLimiter({
  limit: 5,
  windowInSeconds: 3600,
})

export async function POST(request: NextRequest) {
  try {
    // Apply rate limiting
    // Apply rate limiting
    const rateLimitResult = await rateLimiter(request)

    if (!rateLimitResult.success) {
      return NextResponse.json(
        {
          error: 'Rate limit exceeded. You can analyze 5 resumes per hour.',
          retryAfter: new Date(rateLimitResult.reset).toISOString(),
        },
        {
          status: 429,
          headers: getRateLimitHeaders(rateLimitResult),
        }
      )
    }

    // Check for OpenAI API key explicitly at runtime
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({
        error: "Resume analysis is currently unavailable. Please ensure the OPENAI_API_KEY is configured.",
      }, {
        status: 503,
        headers: getRateLimitHeaders(rateLimitResult),
      })
    }

    let resumeText = ''
    const contentType = request.headers.get('content-type')

    if (contentType?.includes('multipart/form-data')) {
      const formData = await request.formData()
      const fileEntry = formData.get('resume')
      const file = fileEntry instanceof File ? fileEntry : null

      if (!file) {
        return NextResponse.json(
          { error: 'No resume file provided.' },
          {
            status: 400,
            headers: getRateLimitHeaders(rateLimitResult),
          }
        )
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        return NextResponse.json(
          { error: 'File too large. Maximum size is 5MB.' },
          {
            status: 400,
            headers: getRateLimitHeaders(rateLimitResult),
          }
        )
      }

      resumeText = await extractTextFromFile(file)
    } else {
      const body = await request.json()
      resumeText = body.resumeText
    }

    // Validate input (after extraction)
    if (!resumeText || typeof resumeText !== 'string') {
      return NextResponse.json(
        { error: 'Invalid input. Please provide resume text.' },
        {
          status: 400,
          headers: getRateLimitHeaders(rateLimitResult),
        }
      )
    }

    const trimmedText = resumeText.trim()
    if (trimmedText.length < 100 || trimmedText.length > 10000) {
      return NextResponse.json(
        { error: 'Resume text must be between 100 and 10,000 characters.' },
        {
          status: 400,
          headers: getRateLimitHeaders(rateLimitResult),
        }
      )
    }

    // Sanitize input
    const sanitizedText = trimmedText
      .replace(/[<>]/g, '')
      .substring(0, 10000)

    // Call OpenAI with timeout
    const completion = await Promise.race([
      openai.chat.completions.create({
        model: AI_CONFIG.model,
        messages: [
          {
            role: 'system',
            content: RESUME_ANALYZER_PROMPT,
          },
          {
            role: 'user',
            content: `Analyze this resume:

"""
${sanitizedText}
"""

Return ONLY JSON:
{
  "matchScore": 0-100,
  "strengths": ["skill1", "skill2"],
  "gaps": ["skill1"],
  "collaborationOpportunities": ["opportunity1", "opportunity2"],
  "reasoning": "explanation"
}`,
          },
        ],
        temperature: 0.7,
        max_tokens: 800,
        response_format: { type: 'json_object' },
      }),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('Request timeout')), 30000)
      ),
    ])

    const rawResponse = completion.choices[0].message.content
    if (!rawResponse) {
      throw new Error('Empty response from OpenAI')
    }

    let analysis;
    try {
      analysis = JSON.parse(rawResponse)
    } catch (e) {
      console.error('Failed to parse AI JSON response:', rawResponse)
      throw new Error('Invalid response format from AI service')
    }

    // Validate and sanitize response
    if (
      typeof analysis.matchScore !== 'number' ||
      !Array.isArray(analysis.strengths) ||
      !Array.isArray(analysis.gaps) ||
      !Array.isArray(analysis.collaborationOpportunities)
    ) {
      throw new Error('Invalid AI response structure')
    }

    return NextResponse.json({
      analysis: {
        matchScore: Math.round(Math.max(0, Math.min(100, Number(analysis.matchScore) || 0))),
        strengths: analysis.strengths.slice(0, 8),
        gaps: analysis.gaps.slice(0, 5),
        collaborationOpportunities: analysis.collaborationOpportunities.slice(0, 4),
        reasoning: analysis.reasoning,
      },
    }, {
      headers: getRateLimitHeaders(rateLimitResult),
    })

  } catch (error: unknown) {
    console.error('Resume analysis error:', error)
    let status = 500
    if (typeof error === 'object' && error !== null && 'status' in error) {
      const errorWithStatus = error as { status: number }
      status = errorWithStatus.status
    }
    const errorMessage = handleOpenAIError(error)

    return NextResponse.json(
      {
        error: errorMessage,
        suggestion: 'Contact me directly to discuss collaboration.'
      },
      { status: status }
    )
  }
}

async function extractTextFromFile(file: File): Promise<string> {
  const fileType = file.type

  if (fileType === 'text/plain') {
    return await file.text()
  }

  // Handle PDF and DOCX with clear error (since libraries are missing)
  if (
    fileType === 'application/pdf' ||
    fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ) {
    throw new Error(
      'PDF and DOCX extraction is currently in beta. Please paste your resume text directly for analysis.'
    )
  }

  throw new Error('Unsupported file type. Please use PDF, DOCX, or plain text.')
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