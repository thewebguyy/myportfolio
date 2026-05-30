import { AI_CONFIG, openai } from '@/lib/openai'
import { z } from 'zod'

export type OrchestrationStep = {
  id: string
  label: string
  status: 'pending' | 'processing' | 'completed' | 'failed'
  output?: unknown
}

export interface OrchestrationResult<T> {
  data: T
  steps: OrchestrationStep[]
  confidenceScore: number
  assumptions: string[]
  metadata: {
    latency: number
    tokens: number
  }
}

/**
 * AI Orchestrator Service
 * Handles the resume analysis pipeline for the live Resume Analyzer demo.
 */
export class AIOrchestrator {
  private startTime: number = 0

  constructor() {
    this.startTime = Date.now()
  }

  /**
   * Orchestrates Resume Analysis
   * Used by /api/analyze-resume → CandidateScreener component
   */
  async orchestrateTalentAudit(resumeText: string): Promise<OrchestrationResult<Record<string, unknown>>> {
    const steps: OrchestrationStep[] = [
      { id: 'extraction', label: 'Semantic Entity Extraction', status: 'pending' },
      { id: 'benchmarking', label: 'Technical Alignment Benchmarking', status: 'pending' },
      { id: 'risk_scoring', label: 'Skill Gap Analysis', status: 'pending' },
    ]

    this.startTime = Date.now()
    steps[0].status = 'processing'
    
    const completion = await openai.chat.completions.create({
      model: AI_CONFIG.model,
      messages: [
        { 
          role: 'system', 
          content: `You are a Resume Analysis Engine.
          Analyze the resume and return JSON:
          {
            "matchScore": 0-100,
            "skillGap": "Low/Medium/High",
            "skillGapSeverity": "Brief description of domain gaps (e.g., 'No financial API experience' or 'None')",
            "alignmentSignals": { "cultural": "string", "technical": "string", "strategic": "string" },
            "collaborationOpportunities": ["string"],
            "developmentPlan": "string",
            "reasoning": "string",
            "confidenceScore": 0-100,
            "assumptions": ["string"]
          }`
        },
        { role: 'user', content: resumeText }
      ],
      response_format: { type: 'json_object' }
    })

    steps[0].status = 'completed'
    steps[1].status = 'processing'
    steps[1].status = 'completed'
    steps[2].status = 'processing'
    steps[2].status = 'completed'

    let parsedJson;
    try {
      parsedJson = JSON.parse(completion.choices[0].message.content || '{}')
    } catch {
      throw new Error('LLM did not return valid JSON')
    }

    const TalentAuditResponseSchema = z.object({
      matchScore: z.number().min(0).max(100),
      skillGap: z.enum(['Low', 'Medium', 'High']),
      skillGapSeverity: z.string(),
      alignmentSignals: z.object({
        cultural: z.string(),
        technical: z.string(),
        strategic: z.string()
      }),
      collaborationOpportunities: z.array(z.string()),
      developmentPlan: z.string(),
      reasoning: z.string(),
      confidenceScore: z.number().min(0).max(100),
      assumptions: z.array(z.string())
    })

    const validatedAudit = TalentAuditResponseSchema.safeParse(parsedJson)
    if (!validatedAudit.success) {
      console.error('Zod Validation Failure:', validatedAudit.error.format())
      throw new Error('LLM response failed schema validation')
    }

    const data = validatedAudit.data

    return {
      data,
      steps,
      confidenceScore: data.confidenceScore,
      assumptions: data.assumptions,
      metadata: {
        latency: Date.now() - this.startTime,
        tokens: completion.usage?.total_tokens || 0
      }
    }
  }
}

export const orchestrator = new AIOrchestrator()
