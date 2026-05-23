import { NextResponse } from 'next/server'
import { z } from 'zod'
import { createRateLimiter, getRateLimitHeaders } from '@/lib/rateLimit'

const rateLimiter = createRateLimiter({ limit: 5, windowInSeconds: 3600 })

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10).max(2000),
  website: z.string().optional()
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

    const body = await req.json()
    const parseResult = contactSchema.safeParse(body)
    
    if (!parseResult.success) {
      return NextResponse.json({ error: 'Invalid input. Please check your fields.' }, { status: 400 })
    }

    const { name, email, message, website } = parseResult.data

    // Honeypot check
    if (website && website.length > 0) {
      return NextResponse.json({ success: true }, { status: 200 }) // silently drop
    }

    const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT
    if (!endpoint) {
      return NextResponse.json(
        { error: 'Contact form is being configured. Please reach out via LinkedIn.' },
        { status: 503 }
      )
    }

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, message })
    })

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Message could not be sent. Please try again.' },
        { status: 400 }
      )
    }

    return NextResponse.json({ success: true }, { status: 200 })

  } catch (error) {
    console.error('Contact Form Error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again later.' },
      { status: 500 }
    )
  }
}
