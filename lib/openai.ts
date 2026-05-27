import OpenAI from 'openai'

/**
 * OpenAI Configuration Constants
 */
export const AI_CONFIG = {
  model: 'gpt-4o',
  defaultTimeout: 30000,
  maxRetries: 2,
} as const

// Lazy initialize OpenAI client to prevent crashes during SSR/Build if key is missing
let openaiInstance: OpenAI | null = null

export const getOpenAIClient = () => {
  if (openaiInstance) return openaiInstance

  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    throw new Error(
      'OPENAI_API_KEY is not defined. Please configure it in your environment variables.'
    )
  }

  openaiInstance = new OpenAI({
    apiKey,
    timeout: AI_CONFIG.defaultTimeout,
    maxRetries: AI_CONFIG.maxRetries,
  })

  return openaiInstance
}

export const openai = new Proxy({} as OpenAI, {
  get: (target, prop) => {
    try {
      const client = getOpenAIClient()
      const value = Reflect.get(client, prop)
      if (typeof value === 'function') {
        return value.bind(client)
      }
      return value
    } catch (error) {
      throw error
    }
  },
})




export function estimateTokens(text: string): number {
  if (!text) return 0
  return Math.ceil(text.length / 4)
}

export function validateTokenLimit(text: string, limit: number = 8000): boolean {
  return estimateTokens(text) <= limit
}

export function handleOpenAIError(error: unknown): string {
  if (error instanceof OpenAI.APIError) {
    if (error.status === 429) {
      return 'The AI engine is currently experiencing high demand. Please try again shortly.'
    }
    if (error.status === 401) {
      return 'AI service authentication failed. Please check your configuration.'
    }
    if (error.status === 400) {
      return 'Invalid request format or parameters sent to the AI service.'
    }
    if (error.status && error.status >= 500) {
      return 'The AI service is temporarily unavailable. Please try again later.'
    }
    return `AI service error: ${error.message}`
  }

  if (error instanceof Error) {
    const msg = error.message.toLowerCase()
    if (msg.includes('timeout') || msg.includes('time out')) {
      return 'The connection to the AI engine timed out. Please try again.'
    }
    if (msg.includes('network') || msg.includes('fetch') || msg.includes('connection')) {
      return 'Network error occurred while contacting the AI service.'
    }
  }

  return 'An unexpected error occurred in the reasoning engine.'
}