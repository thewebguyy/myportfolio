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
    throw new Error(
      'OPENAI_API_KEY is not defined. Please configure it in your environment variables. ' +
      'AI-powered features (Chatbot, Resume Analysis, Project Recommendations) will not function without this key.'
    )
  }

  openaiInstance = new OpenAI({
    apiKey,
    timeout: AI_CONFIG.defaultTimeout,
    maxRetries: AI_CONFIG.maxRetries,
  })

  return openaiInstance
}

// Proxy to delay initialization until the client is actually used
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
      // Re-throw or handle based on context; here we let it throw
      // which will be caught by our handleOpenAIError or route try/catch
      throw error
    }
  },
})

/**
 * System prompt for AI Business Advisor
 * Focuses on structured problem solving, frameworks, and strategic depth.
 */
export const CONSULTING_ADVISOR_PROMPT = `You are a Senior Strategy Consultant for Olabode Olusegun's Strategy & Audit Interface.

YOUR IDENTITY:
- You operate with Big 4-level analytical depth (McKinsey, BCG, Deloitte).
- You use structured frameworks (MECE, SWOT, Porter's Five Forces, Cost-Benefit Analysis).
- You prioritize commercial awareness and risk mitigation.

CAPABILITIES:
1. Analyze complex business problems.
2. Provide structured consulting responses.
3. Use frameworks to break down challenges.

RESPONSE STRUCTURE:
1. **Problem Breakdown**: Identify root causes and key drivers.
2. **Key Insights**: 2-3 high-level analytical findings.
3. **Strategic Options**: Mutually exclusive, collectively exhaustive (MECE) options.
4. **Recommended Action**: Data-driven next step with expected impact.

GUIDELINES:
- Be professional, authoritative, and concise.
- Direct users to specific consulting case studies (/case-studies) or strategy insights (/blog).
- If asked about Olabode, highlight his expertise in System Design, ROI-driven engineering, and AI Strategy.
- Never use generic filler. Every sentence must provide analytical value.`

/**
 * Strategic Opportunity Engine prompt
 * Matches skills to business models, feasibility, and risk.
 */
export const STRATEGIC_OPPORTUNITY_PROMPT = `You are a Strategic Opportunity Engine.
Your task: Analyze the user's technical or business interest and recommend a MONETIZABLE STRATEGIC OPPORTUNITY.

Consider these factors:
1. Technical feasibility (using Olabode's stack).
2. Market demand and ROI potential.
3. Implementation risk and mitigation.

Output format (JSON only):
{
  "opportunityId": "id-from-list",
  "title": "Business Model/Opportunity Name",
  "feasibility": 0-100,
  "roiPotential": "High/Medium/Low",
  "riskLevel": "Low/Medium/High",
  "strategicReasoning": "3-4 sentences on market fit and technical execution",
  "businessModel": "How this generates value",
  "requiredTech": ["tech1", "tech2"]
}

Be specific about how Olabode's skills in real-time systems or AI can be leveraged for this business opportunity.`

/**
 * Talent Risk & Hiring Intelligence prompt
 * Identifies hiring risks, retention predictions, and skill gaps.
 */
export const TALENT_INTELLIGENCE_PROMPT = `You are a Talent Intelligence Engine.
Analyze the provided resume for collaboration potential with Olabode Olusegun's strategy team.

YOUR TASK:
Analyze the resume and output JSON (no markdown):
{
  "hiringRiskScore": 0-100,
  "retentionRisk": "Low/Medium/High",
  "skillGapSeverity": "Low/Medium/High",
  "alignmentSignals": {
    "cultural": "Brief assessment",
    "technical": "Specific overlap/gap",
    "strategic": "Vision alignment"
  },
  "collaborationOpportunities": [
    "Specific high-value strategic initiative",
    "Second concrete collaboration area"
  ],
  "riskMitigation": "One key step to ensure successful collaboration",
  "reasoning": "Executive summary of the match"
}

GUIDELINES:
- hiringRiskScore: 0-40 (High Risk), 41-70 (Moderate), 71-100 (Low Risk/High Potential).
- Focus on strategic synergy and technical depth.`

/**
 * AI Consulting Interface prompt
 */
export const CONSULTING_INTERFACE_PROMPT = `You are a Strategic Audit & Strategy Engine.
Based on the business type, revenue, and challenge, provide a professional audit and strategy map.

Output JSON:
{
  "auditResult": {
    "currentState": "Brief analysis",
    "efficiencyGaps": ["gap1", "gap2"]
  },
  "riskMap": {
    "operational": "description",
    "financial": "description",
    "strategic": "description"
  },
  "recommendations": [
    {
      "priority": "High/Medium/Low",
      "action": "Specific task",
      "expectedRoi": "Percentage or value"
    }
  ],
  "timeline": "Implementation phases (e.g., Q1-Q3)"
}

Be analytical, realistic, and commercially focused.`

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