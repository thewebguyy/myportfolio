import { NextResponse } from 'next/server'
import { z } from 'zod'
import { resumeAnalyzer } from '@/services/resume-analyzer'
import { handleOpenAIError } from '@/lib/openai'
import { createRateLimiter, getRateLimitHeaders } from '@/lib/rateLimit'

const rateLimiter = createRateLimiter({
  limit: 10,
  windowInSeconds: 3600,
})

const requestSchema = z.object({
  resumeText: z.string().min(50),
})

export async function POST(req: Request) {
  try {
    const rateLimitResult = await rateLimiter(req)
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        { status: 429, headers: getRateLimitHeaders(rateLimitResult) }
      )
    }

    let body;
    try {
      body = await req.json()
    } catch {
      return NextResponse.json(
        { error: "Invalid input. Please provide resume text." },
        { status: 400 }
      )
    }

    const parseResult = requestSchema.safeParse(body)
    if (!parseResult.success) {
      return NextResponse.json(
        { error: "Invalid input. Please provide resume text." },
        { status: 400 }
      )
    }

    const { resumeText } = parseResult.data

    const result = await resumeAnalyzer.analyzeResume(resumeText)

    return NextResponse.json({
      analysis: result.data,
      confidenceScore: result.confidenceScore,
      assumptions: result.assumptions,
      metadata: result.metadata
    }, {
      headers: getRateLimitHeaders(rateLimitResult)
    })
  } catch (error) {
    console.error('Resume Analysis Error:', error)
    const errorMessage = handleOpenAIError(error)
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}
