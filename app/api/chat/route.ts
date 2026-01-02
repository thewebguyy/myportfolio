import { NextRequest, NextResponse } from 'next/server'
import { openai, CHATBOT_SYSTEM_PROMPT, handleOpenAIError } from '@/lib/openai'

/**
 * Portfolio Chatbot API Route
 * 
 * Conversational AI assistant for answering questions about portfolio
 * Maintains context through conversation history
 * 
 * @route POST /api/chat
 * @body { messages: Message[] } - Conversation history
 * @returns { reply: string }
 */

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json()
    const { messages } = body

    // Validate input
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Invalid input. Please provide a messages array.' },
        { status: 400 }
      )
    }

    if (messages.length === 0) {
      return NextResponse.json(
        { error: 'Messages array cannot be empty.' },
        { status: 400 }
      )
    }

    // Limit conversation history to last 10 messages for cost control
    const recentMessages = messages.slice(-10)

    // Validate message structure
    for (const msg of recentMessages) {
      if (!msg.role || !msg.content) {
        return NextResponse.json(
          { error: 'Invalid message format. Each message must have role and content.' },
          { status: 400 }
        )
      }
      if (msg.role !== 'user' && msg.role !== 'assistant') {
        return NextResponse.json(
          { error: 'Invalid role. Must be "user" or "assistant".' },
          { status: 400 }
        )
      }
    }

    // Get the latest user message
    const latestMessage = recentMessages[recentMessages.length - 1]
    if (latestMessage.role !== 'user') {
      return NextResponse.json(
        { error: 'Last message must be from user.' },
        { status: 400 }
      )
    }

    // Check for inappropriate content (basic filtering)
    const inappropriatePatterns = [
      /jailbreak/i,
      /ignore (previous|all) instructions/i,
      /you are now/i,
      /pretend (you are|to be)/i,
    ]

    if (inappropriatePatterns.some(pattern => pattern.test(latestMessage.content))) {
      return NextResponse.json({
        reply: "I'm here to help answer questions about Olabode's portfolio and experience. How can I assist you with that?"
      })
    }

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: CHATBOT_SYSTEM_PROMPT,
        },
        ...recentMessages.map(msg => ({
          role: msg.role,
          content: msg.content,
        })),
      ],
      temperature: 0.7,
      max_tokens: 300,
      presence_penalty: 0.6,
      frequency_penalty: 0.3,
    })

    // Extract response
    const reply = completion.choices[0].message.content

    if (!reply) {
      throw new Error('Empty response from OpenAI')
    }

    // Return response
    return NextResponse.json({
      reply: reply.trim(),
    })

  } catch (error: any) {
    console.error('Chatbot error:', error)

    // Handle OpenAI-specific errors
    const errorMessage = handleOpenAIError(error)

    // Provide friendly fallback
    if (error.status === 429) {
      return NextResponse.json({
        reply: "I'm experiencing high traffic right now. Please try again in a moment, or feel free to contact Olabode directly at olabodewebdesigns02@gmail.com."
      })
    }

    return NextResponse.json(
      { 
        error: errorMessage,
        reply: "I'm having trouble responding right now. For immediate assistance, please contact Olabode at olabodewebdesigns02@gmail.com or explore the case studies page."
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

/**
 * Rate limiting helper (optional - for production)
 * 
 * In production, implement rate limiting using:
 * - Upstash Redis for distributed rate limiting
 * - Vercel Edge Config for quota management
 * - IP-based or session-based limits
 */