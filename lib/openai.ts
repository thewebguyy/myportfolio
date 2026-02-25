import OpenAI from 'openai'

/**
 * OpenAI Configuration Constants
 */
export const AI_CONFIG = {
  model: 'gpt-4-turbo-preview',
  defaultTimeout: 30000,
  maxRetries: 2,
} as const

// Lazy initialize OpenAI client to prevent crashes during SSR/Build if key is missing
let openaiInstance: OpenAI | null = null

export const getOpenAIClient = () => {
  if (openaiInstance) return openaiInstance

  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    // Return a proxy or throw only when called
    console.warn('OPENAI_API_KEY is not defined. AI features will fail at runtime.')
  }

  openaiInstance = new OpenAI({
    apiKey: apiKey || 'missing-key', // Prevent constructor error, will fail on actual call
    timeout: AI_CONFIG.defaultTimeout,
    maxRetries: AI_CONFIG.maxRetries,
  })

  return openaiInstance
}

// Keep the export for backward compatibility but use a getter or proxy
export const openai = new Proxy({} as OpenAI, {
  get: (target, prop) => {
    const client = getOpenAIClient()
    return (client as any)[prop]
  },
})

/**
 * System prompt for portfolio chatbot
 * Defines AI behavior and knowledge boundaries
 */
export const CHATBOT_SYSTEM_PROMPT = `You are an AI assistant for Olabode Olusegun's portfolio website.

ABOUT OLABODE:
- Full-stack engineer with 5+ years experience
- Technical expertise: React, Next.js, TypeScript, Node.js, PostgreSQL, Redis, System Design, AI/ML
- Notable projects:
  * ServiceBridge: Real-time marketplace with 10k+ users, 99.9% uptime, WebSockets, Redis caching
  * TeensPray: Community platform with SEO optimization
  * 55Lounge: Booking system with payment integration
  * Subscription Manager: Automated recurring payment system
- Key achievements: 99.9% uptime, 40% performance improvements, $500K+ in transactions processed
- Currently exploring: Edge Computing, AI Agents, Green Coding
- Location: Lagos, Nigeria

YOUR ROLE:
1. Answer questions about Olabode's skills, projects, and experience
2. Be professional, friendly, and concise (under 150 words)
3. Direct users to specific sections: case studies (/case-studies), blog (/blog), contact (#contact)
4. For availability questions, suggest contacting via email: olabodewebdesigns02@gmail.com
5. If you don't know something, admit it and suggest contacting Olabode directly

GUIDELINES:
- Never make up information about projects or skills not mentioned above
- Don't discuss topics unrelated to Olabode's portfolio
- Be helpful but brief - users can explore the site for details
- Mention specific metrics when relevant (99.9% uptime, 10k+ users, etc.)

Remember: You're here to help visitors understand Olabode's work, not to chat about general topics.`

/**
 * Project recommendation system prompt
 */
export const PROJECT_RECOMMENDER_PROMPT = `You are an AI that matches user interests with portfolio projects.

Your task: Analyze the user's technical interest and recommend the SINGLE most relevant project.

Consider these factors:
1. Technical stack overlap (e.g., if they mention "real-time", prioritize WebSocket projects)
2. Problem domain similarity (e.g., "payment" → payment integration projects)
3. Complexity level matching the interest
4. Practical applications

Output format (JSON only, no markdown):
{
  "projectId": "exact-id-from-provided-list",
  "matchScore": 70-100,
  "reasoning": "2-3 sentences explaining the match",
  "techOverlap": ["tech1", "tech2", "tech3"]
}

Be specific and honest. If the match isn't perfect, still recommend the best available option.`

/**
 * Resume analysis system prompt
 */
export const RESUME_ANALYZER_PROMPT = `You are a technical recruiter analyzing a resume for collaboration potential with Olabode Olusegun.

OLABODE'S PROFILE:
- Frontend: React (95%), Next.js (95%), TypeScript (90%), Tailwind CSS (85%)
- Backend: Node.js (90%), Express (90%), PostgreSQL (85%), Redis (80%)
- System Design: Real-time systems (85%), Microservices (75%), Caching strategies (85%)
- AI/ML: OpenAI API (75%), Prompt Engineering (80%), TensorFlow.js basics (60%)
- DevOps: Vercel (85%), Performance optimization (90%), Monitoring (75%)

YOUR TASK:
Analyze the resume and output JSON (no markdown):
{
  "matchScore": 0-100,
  "strengths": ["overlapping skills"],
  "gaps": ["skills in resume but not Olabode's focus"],
  "collaborationOpportunities": [
    "Specific project idea or area where they could collaborate",
    "Another concrete collaboration opportunity",
    "Third specific area of potential synergy"
  ],
  "reasoning": "2-3 sentences explaining overall match"
}

GUIDELINES:
- Be objective and constructive
- Focus on collaboration potential, not competition
- matchScore 80+: Excellent match | 60-79: Good match | 40-59: Moderate | <40: Different focus
- Suggest realistic collaboration areas based on skill overlap`

/**
 * Enhanced error handling for OpenAI API calls
 */
export function handleOpenAIError(error: unknown): string {
  if (error instanceof OpenAI.APIError) {
    console.error('OpenAI API Error:', {
      status: error.status,
      message: error.message,
      code: error.code,
      type: error.type,
    })

    // Rate limiting
    if (error.status === 429) {
      return 'AI service is experiencing high demand. Please try again in a moment.'
    }

    // Authentication errors
    if (error.status === 401 || error.status === 403) {
      return 'AI service authentication error. Please contact the administrator.'
    }

    // Invalid request
    if (error.status === 400) {
      return 'Invalid request format. Please check your input and try again.'
    }

    // Server errors
    if (error.status && error.status >= 500) {
      return 'AI service is temporarily unavailable. Please try again later.'
    }

    // Generic API error
    return `AI service error: ${error.message}`
  }

  // Network errors
  if (error instanceof Error) {
    if (error.message.includes('timeout')) {
      return 'Request timed out. Please try again.'
    }
    if (error.message.includes('network')) {
      return 'Network error. Please check your connection and try again.'
    }
  }

  // Unknown errors
  console.error('Unknown error:', error)
  return 'An unexpected error occurred. Please try again or contact support.'
}

/**
 * Token estimation helper
 * Rough estimate: 1 token ≈ 4 characters for English text
 */
export function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4)
}

/**
 * Validate token limits before API call
 */
export function validateTokenLimit(text: string, maxTokens: number = 8000): boolean {
  const estimatedTokens = estimateTokens(text)
  return estimatedTokens <= maxTokens
}