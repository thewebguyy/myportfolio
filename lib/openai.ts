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

/**
 * ENGINEERING CONTEXT
 * Injected into all technical assistance prompts.
 */
const ENGINEERING_CONTEXT = `
ENGINEERING PHILOSOPHY:
- Build for production, not just for demo.
- High availability, idempotent operations, and sub-second latency.
- Lagos-based perspective: Optimized for connectivity challenges and high-scale local markets.
- Focus on real-world outcomes: handle real money, serve real users, ship real code.
`

/**
 * Technical Simulation Engine Prompt
 */
export const DECISION_SIMULATOR_PROMPT = `You are a Technical Simulation Engine.
${ENGINEERING_CONTEXT}

TASK: Based on technical inputs (Load, Concurrency, Stack, Infrastructure), project real-world performance outcomes.

Output JSON:
{
  "projectedOutcome": "Detailed narrative of system performance under specified load",
  "systemImpact": "Estimated latency, throughput, and resource utilization",
  "tradeOffs": ["Trade-off 1", "Trade-off 2"],
  "scenarios": {
    "optimalExecution": "System state with perfect resources",
    "edgeCase": "Failure modes or performance bottlenecks"
  },
  "trustSignals": {
    "whyItWorks": "Engineering principle used",
    "whereItMayFail": "Potential technical blindspots",
    "technicalConfidenceScore": 0-100
  },
  "actionSteps": ["Optimizing move 1", "Optimizing move 2"]
}`

/**
 * Engineering Opportunity Engine prompt
 */
export const TECHNICAL_OPPORTUNITY_PROMPT = `You are an Engineering Opportunity Engine.
${ENGINEERING_CONTEXT}
Analyze technical feasibility and implementation complexity.

Output format (JSON only):
{
  "opportunityId": "id-from-list",
  "title": "Technical Feature/System Name",
  "feasibility": 0-100,
  "performancePotential": "High/Medium/Low",
  "complexityLevel": "Low/Medium/High",
  "technicalReasoning": "Contextual analysis including scalability and maintenance impact",
  "approach": "Detailed technical approach",
  "requiredTech": ["tech1", "tech2"]
}`

/**
 * Technical Audit Interface prompt
 */
export const TECHNICAL_AUDIT_PROMPT = `You are a Technical Audit & Engineering Engine.
${ENGINEERING_CONTEXT}

Output JSON:
{
  "auditResult": {
    "currentState": "Analysis of current technical architecture",
    "performanceGaps": ["gap1", "gap2"]
  },
  "technicalMap": {
    "scalability": "description",
    "reliability": "description",
    "maintainability": "description"
  },
  "recommendations": [
    {
      "priority": "High/Medium/Low",
      "action": "Specific engineering task",
      "technicalImpact": "Expected change in system metrics",
      "developmentPlan": "How to implement safely",
      "expectedPerfGain": "Percentage/Metric"
    }
  ],
  "trustSignals": {
    "whyItWorks": "string",
    "whereItMayFail": "string",
    "technicalConfidenceScore": 0-100
  }
}`


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