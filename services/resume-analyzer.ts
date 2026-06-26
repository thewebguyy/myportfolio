import { AI_CONFIG, openai } from '@/lib/openai'
import { z } from 'zod'

export interface AnalysisResult<T> {
  data: T
  confidenceScore: number
  assumptions: string[]
  metadata: {
    latency: number
    tokens: number
  }
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

export type TalentAuditData = z.infer<typeof TalentAuditResponseSchema>

/**
 * Resume Analyzer
 * Makes a single structured OpenAI call and validates the response with Zod.
 */
export class ResumeAnalyzer {
  async analyzeResume(resumeText: string): Promise<AnalysisResult<TalentAuditData>> {
    const start = Date.now()

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

    let parsedJson;
    try {
      parsedJson = JSON.parse(completion.choices[0].message.content || '{}')
    } catch {
      throw new Error('LLM did not return valid JSON')
    }

    const validated = TalentAuditResponseSchema.safeParse(parsedJson)
    if (!validated.success) {
      console.error('Zod Validation Failure:', validated.error.format())
      throw new Error('LLM response failed schema validation')
    }

    const data = validated.data

    return {
      data,
      confidenceScore: data.confidenceScore,
      assumptions: data.assumptions,
      metadata: {
        latency: Date.now() - start,
        tokens: completion.usage?.total_tokens || 0
      }
    }
  }
}

export const resumeAnalyzer = new ResumeAnalyzer()
