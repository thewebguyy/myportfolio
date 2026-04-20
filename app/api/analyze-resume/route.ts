import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { openai, TALENT_INTELLIGENCE_PROMPT, handleOpenAIError, AI_CONFIG } from '@/lib/openai'
import { createRateLimiter, getRateLimitHeaders } from '@/lib/rateLimit'
import { PDFParse } from 'pdf-parse'
import mammoth from 'mammoth'

// Rate limiter: 5 requests per hour
const rateLimiter = createRateLimiter({
  limit: 5,
  windowInSeconds: 3600,
})

const ResumeRequestSchema = z.object({
  resumeText: z.string().min(100).max(15000).optional(),
})

export async function POST(request: NextRequest) {
  try {
    const rateLimitResult = await rateLimiter(request)

    if (!rateLimitResult.success) {
      return NextResponse.json(
        {
          error: 'Rate limit exceeded. You can analyze 5 resumes per hour.',
          retryAfter: new Date(rateLimitResult.reset).toISOString(),
        },
        { status: 429, headers: getRateLimitHeaders(rateLimitResult) }
      )
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({
        error: "Talent intelligence features are currently unavailable.",
      }, { status: 503, headers: getRateLimitHeaders(rateLimitResult) })
    }

    let resumeText = ''
    const contentType = request.headers.get('content-type')

    if (contentType?.includes('multipart/form-data')) {
      const formData = await request.formData()
      const fileEntry = formData.get('resume')
      const file = fileEntry instanceof File ? fileEntry : null

      if (!file) {
        return NextResponse.json({ error: 'No resume file provided.' }, { status: 400 })
      }

      if (file.size > 5 * 1024 * 1024) {
        return NextResponse.json({ error: 'File too large. Maximum size is 5MB.' }, { status: 400 })
      }

      resumeText = await extractTextFromFile(file)
    } else {
      const body = await request.json()
      const parseResult = ResumeRequestSchema.safeParse(body)
      if (!parseResult.success) {
        return NextResponse.json({ error: 'Invalid input.', details: parseResult.error.format() }, { status: 400 })
      }
      resumeText = parseResult.data.resumeText || ''
    }

    if (!resumeText) {
      return NextResponse.json({ error: 'No resume text found.' }, { status: 400 })
    }

    const sanitizedText = resumeText.replace(/[<>]/g, '').substring(0, 10000)

    const completion = await openai.chat.completions.create({
      model: AI_CONFIG.model,
      messages: [
        { role: 'system', content: TALENT_INTELLIGENCE_PROMPT },
        {
          role: 'user',
          content: `Analyze this resume for strategic collaboration potential:
\n\n"""\n${sanitizedText}\n"""`,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
      response_format: { type: 'json_object' },
    })

    const rawResponse = completion.choices[0].message.content
    if (!rawResponse) throw new Error('Empty response from OpenAI')

    const analysis = JSON.parse(rawResponse)

    return NextResponse.json({ analysis }, { headers: getRateLimitHeaders(rateLimitResult) })

  } catch (error: unknown) {
    console.error('Talent Intelligence error:', error)
    const errorMessage = handleOpenAIError(error)
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}

async function extractTextFromFile(file: File): Promise<string> {
  const fileType = file.type
  if (fileType === 'text/plain') return await file.text()

  if (fileType === 'application/pdf') {
    try {
      const arrayBuffer = await file.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)
      // Note: pdf-parse is usually a function, but the existing code used it as a class.
      // Keeping existing implementation logic but wrapping for safety.
      const pdf = require('pdf-parse')
      const data = await pdf(buffer)
      return data.text
    } catch (error) {
      throw new Error('Failed to extract text from PDF.')
    }
  }

  if (fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
    try {
      const arrayBuffer = await file.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)
      const result = await mammoth.extractRawText({ buffer })
      return result.value
    } catch (error) {
      throw new Error('Failed to extract text from DOCX.')
    }
  }

  throw new Error('Unsupported file type.')
}