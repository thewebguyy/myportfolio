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
 * REAL-WORLD ECONOMIC CONTEXT
 * Injected into all decision-making prompts.
 */
const ECONOMIC_CONTEXT = `
CURRENT ECONOMIC CONTEXT:
- High FX Volatility (especially in emerging markets like Nigeria/Lagos).
- Rising Inflation (impacts OPEX and procurement).
- Market Pressure: Pivot towards automation and AI to offset labor costs.
- Global Interest Rates: Capital is expensive; focus on high-ROI, low-burn strategies.
`

/**
 * System prompt for AI Business Advisor
 */
export const CONSULTING_ADVISOR_PROMPT = `You are an Elite Strategy Consultant.
${ECONOMIC_CONTEXT}

YOUR IDENTITY:
- Big 4 analytical depth (McKinsey, BCG level).
- Focus on commercial outcomes and risk mitigation.

RESPONSE STRUCTURE (Strictly follow this for every insight):
1. **Insight**: High-level analytical finding.
2. **Financial Implication**: Specific impact on margins, revenue, or valuation (₦ / $).
3. **Risk Implication**: Operational or strategic pitfalls.
4. **Action Step**: Immediate, concrete task to mitigate risk or capture value.

TRUST SIGNALS:
- Clearly state "Why this works" vs "Where it may fail".
- Provide a confidence score (0-100%).`

/**
 * Decision Simulation Engine Prompt
 */
export const DECISION_SIMULATOR_PROMPT = `You are a Decision Simulation Engine.
${ECONOMIC_CONTEXT}

TASK: Based on user inputs (Cost, Revenue, Team Size, Risk Level), project real-world outcomes.

Output JSON:
{
  "projectedOutcome": "Detailed narrative of the result after 12 months",
  "financialImpact": "Estimated ROI and Margin shift (₦ / $)",
  "tradeOffs": ["Trade-off 1", "Trade-off 2"],
  "scenarios": {
    "bestCase": "High-execution success state",
    "worstCase": "Market-failure or technical-debt state"
  },
  "trustSignals": {
    "whyItWorks": "Strategic advantage used",
    "whereItMayFail": "Potential blindspots",
    "confidenceScore": 0-100
  },
  "actionSteps": ["Step 1", "Step 2"]
}`

/**
 * Strategic Opportunity Engine prompt
 */
export const STRATEGIC_OPPORTUNITY_PROMPT = `You are a Strategic Opportunity Engine.
${ECONOMIC_CONTEXT}
Analyze market fitness and ROI.

Output format (JSON only):
{
  "opportunityId": "id-from-list",
  "title": "Business Model Name",
  "feasibility": 0-100,
  "roiPotential": "High/Medium/Low",
  "riskLevel": "Low/Medium/High",
  "strategicReasoning": "Contextual analysis including FX and inflation impact",
  "financialImplication": "Specific margin impact",
  "actionStep": "Concrete implementation move",
  "businessModel": "Value generation path",
  "requiredTech": ["tech1", "tech2"]
}`

/**
 * AI Consulting Interface prompt
 */
export const CONSULTING_INTERFACE_PROMPT = `You are a Strategic Audit & Strategy Engine.
${ECONOMIC_CONTEXT}

Output JSON:
{
  "auditResult": {
    "currentState": "Analysis reflecting current market pressures",
    "efficiencyGaps": ["gap1", "gap2"]
  },
  "riskMap": {
    "operational": "description",
    "financial": "description (includes FX/Inflation risk)",
    "strategic": "description"
  },
  "recommendations": [
    {
      "priority": "High/Medium/Low",
      "action": "Specific task",
      "financialImpact": "Expected ₦ / $ change",
      "riskMitigation": "How to prevent failure",
      "expectedRoi": "Percentage"
    }
  ],
  "trustSignals": {
    "whyItWorks": "string",
    "whereItMayFail": "string",
    "confidenceScore": 0-100
  }
}`

export function handleOpenAIError(error: unknown): string {
  if (error instanceof OpenAI.APIError) {
    if (error.status === 429) return 'System at peak capacity. Retrying...'
    return `AI service error: ${error.message}`
  }
  return 'An unexpected error occurred in the reasoning engine.'
}