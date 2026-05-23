import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { openai, TECHNICAL_OPPORTUNITY_PROMPT, handleOpenAIError, AI_CONFIG } from '@/lib/openai'
import { projects } from '@/lib/projects'
import { createRateLimiter, getRateLimitHeaders } from '@/lib/rateLimit'

// Rate limiter: 10 requests per hour
const rateLimiter = createRateLimiter({
  limit: 10,
  windowInSeconds: 3600,
})

const OpportunityRequestSchema = z.object({
  interest: z.string().min(3).max(200),
})

export async function POST(request: NextRequest) {
  try {
    const rateLimitResult = await rateLimiter(request)

    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Rate limit exceeded.', retryAfter: new Date(rateLimitResult.reset).toISOString() },
        { status: 429, headers: getRateLimitHeaders(rateLimitResult) }
      )
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({
        error: "Project recommender is currently unavailable.",
      }, { status: 503, headers: getRateLimitHeaders(rateLimitResult) })
    }

    const body = await request.json()
    const parseResult = OpportunityRequestSchema.safeParse(body)
    if (!parseResult.success) {
      return NextResponse.json({ error: 'Invalid input.', details: parseResult.error.format() }, { status: 400 })
    }

    const { interest } = parseResult.data
    const sanitizedInterest = interest.replace(/[<>]/g, '').substring(0, 200)

    // Context: Provide Olabode's core technical capabilities
    const capabilities = projects.map(p => ({
      id: p.id,
      title: p.title,
      category: p.category,
      tech: p.tech,
    }))

    const completion = await openai.chat.completions.create({
      model: AI_CONFIG.model,
      messages: [
        { role: 'system', content: TECHNICAL_OPPORTUNITY_PROMPT },
        {
          role: 'user',
          content: `Technical Domain: "${sanitizedInterest}"\n\nEngineering Capabilities:\n${JSON.stringify(capabilities, null, 2)}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 800,
      response_format: { type: 'json_object' },
    })

    const rawResponse = completion.choices[0].message.content
    if (!rawResponse) throw new Error('Empty response from OpenAI')

    const opportunity = JSON.parse(rawResponse)

    return NextResponse.json({ opportunity }, { headers: getRateLimitHeaders(rateLimitResult) })

  } catch (error: unknown) {
    console.error('Project Recommender error:', error)
    const errorMessage = handleOpenAIError(error)
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}