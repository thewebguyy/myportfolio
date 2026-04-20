import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { openai, CONSULTING_INTERFACE_PROMPT, handleOpenAIError, AI_CONFIG } from '@/lib/openai'
import { createRateLimiter, getRateLimitHeaders } from '@/lib/rateLimit'

const rateLimiter = createRateLimiter({
  limit: 5,
  windowInSeconds: 3600,
})

const ConsultRequestSchema = z.object({
  businessType: z.string().min(2).max(100),
  revenueEstimate: z.string().min(1).max(50),
  challenge: z.string().min(10).max(1000),
})

export async function POST(request: NextRequest) {
  try {
    const rateLimitResult = await rateLimiter(request)

    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Consultation limit reached.', retryAfter: new Date(rateLimitResult.reset).toISOString() },
        { status: 429, headers: getRateLimitHeaders(rateLimitResult) }
      )
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({
        error: "Strategic audit service is currently unavailable.",
      }, { status: 503, headers: getRateLimitHeaders(rateLimitResult) })
    }

    const body = await request.json()
    const parseResult = ConsultRequestSchema.safeParse(body)
    if (!parseResult.success) {
      return NextResponse.json({ error: 'Invalid data provided.', details: parseResult.error.format() }, { status: 400 })
    }

    const { businessType, revenueEstimate, challenge } = parseResult.data

    const completion = await openai.chat.completions.create({
      model: AI_CONFIG.model,
      messages: [
        { role: 'system', content: CONSULTING_INTERFACE_PROMPT },
        {
          role: 'user',
          content: `Business Audit Request:\n- Type: ${businessType}\n- Revenue: ${revenueEstimate}\n- Primary Challenge: ${challenge}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 1500,
      response_format: { type: 'json_object' },
    })

    const rawResponse = completion.choices[0].message.content
    if (!rawResponse) throw new Error('Empty response from OpenAI')

    const auditData = JSON.parse(rawResponse)

    return NextResponse.json({ audit: auditData }, { headers: getRateLimitHeaders(rateLimitResult) })

  } catch (error: unknown) {
    console.error('Consulting Audit error:', error)
    const errorMessage = handleOpenAIError(error)
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}
