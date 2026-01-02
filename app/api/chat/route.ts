import { NextRequest, NextResponse } from 'next/server'
import { openai, CHATBOT_SYSTEM_PROMPT, handleOpenAIError } from '@/lib/openai'
import { createRateLimiter, getRateLimitHeaders } from '@/lib/rateLimit'

// Rate limiter: 20 messages per hour
const rateLimiter = createRateLimiter({
  limit: 20,
  windowInSeconds: 3600,
})

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export async function POST(request: NextRequest) {
  try {
    // Apply rate limiting
    const rateLimitResult = rateLimiter(request)
    
    if (!rateLimitResult.success) {
      return NextResponse.json({
        reply: "You've reached the message limit (20 per hour). Please try again later or contact me directly at olabodewebdesigns02@gmail.com.",
      }, {
        status: 429,
        headers: getRateLimitHeaders(rateLimitResult),
      })
    }

    const body = await request.json()
    const { messages } = body

    // Validate input
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'Invalid input. Please provide messages array.' },
        { 
          status: 400,
          headers: getRateLimitHeaders(rateLimitResult),
        }
      )
    }

    // Limit to last 10 messages
    const recentMessages = messages.slice(-10)

    // Validate message structure
    for (const msg of recentMessages) {
      if (!msg.role || !msg.content || 
          (msg.role !== 'user' && msg.role !== 'assistant')) {
        return NextResponse.json(
          { error: 'Invalid message format.' },
          { 
            status: 400,
            headers: getRateLimitHeaders(rateLimitResult),
          }
        )
      }
    }

    const latestMessage = recentMessages[recentMessages.length - 1]
    if (latestMessage.role !== 'user') {
      return NextResponse.json(
        { error: 'Last message must be from user.' },
        { 
          status: 400,
          headers: getRateLimitHeaders(rateLimitResult),
        }
      )
    }

    // Sanitize user input
    const sanitizedMessage = latestMessage.content
      .replace(/[<>]/g, '')
      .substring(0, 500)

    // Check for prompt injection attempts
    const suspiciousPatterns = [
      /ignore (previous|all) instructions/i,
      /you are now/i,
      /pretend (you are|to be)/i,
      /jailbreak/i,
      /system prompt/i,
    ]

    if (suspiciousPatterns.some(pattern => pattern.test(sanitizedMessage))) {
      return NextResponse.json({
        reply: "I'm here to help with questions about Olabode's portfolio. How can I assist you with that?",
      }, {
        headers: getRateLimitHeaders(rateLimitResult),
      })
    }

    // Call OpenAI with timeout
    const completion = await Promise.race([
      openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: CHATBOT_SYSTEM_PROMPT,
          },
          ...recentMessages.map(msg => ({
            role: msg.role,
            content: msg.role === 'user' && msg.content === latestMessage.content
              ? sanitizedMessage
              : msg.content,
          })),
        ],
        temperature: 0.7,
        max_tokens: 300,
        presence_penalty: 0.6,
        frequency_penalty: 0.3,
      }),
      new Promise<never>((_, reject) => 
        setTimeout(() => reject(new Error('Request timeout')), 20000)
      ),
    ])

    const reply = completion.choices[0].message.content

    if (!reply) {
      throw new Error('Empty response from OpenAI')
    }

    return NextResponse.json({
      reply: reply.trim(),
    }, {
      headers: getRateLimitHeaders(rateLimitResult),
    })

  } catch (error: any) {
    console.error('Chatbot error:', error)
    const errorMessage = handleOpenAIError(error)

    if (error.message === 'Request timeout') {
      return NextResponse.json({
        reply: "Sorry, I'm taking longer than usual to respond. Please try asking again, or contact Olabode directly at olabodewebdesigns02@gmail.com.",
      })
    }

    return NextResponse.json({
      reply: "I'm having trouble responding right now. For immediate assistance, please contact Olabode at olabodewebdesigns02@gmail.com or explore the case studies page.",
    }, {
      status: error.status || 500,
    })
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