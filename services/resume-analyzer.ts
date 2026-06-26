import { createHash } from 'crypto'
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

// In-memory cache for resume analysis results.
// Key: SHA-256 hex digest of the raw resume text.
// Value: the validated AnalysisResult returned by the LLM.
//
// Strategy: FIFO eviction at 100 entries. Identical resume text produces the
// same hash and is served from cache without an API call. The cache lives in
// process memory and is intentionally reset on server restart — acceptable for
// a portfolio demo where cost reduction matters more than cross-restart persistence.
const MAX_CACHE_SIZE = 100
const analysisCache = new Map<string, AnalysisResult<TalentAuditData>>()

function getCacheKey(text: string): string {
  return createHash('sha256').update(text).digest('hex')
}

function cacheSet(key: string, value: AnalysisResult<TalentAuditData>): void {
  if (analysisCache.size >= MAX_CACHE_SIZE) {
    // Evict the oldest entry (Map insertion order is guaranteed in JS)
    const oldestKey = analysisCache.keys().next().value
    if (oldestKey !== undefined) analysisCache.delete(oldestKey)
  }
  analysisCache.set(key, value)
}

/**
 * Resume Analyzer
 * Makes a single structured OpenAI call and validates the response with Zod.
 * Results are cached by SHA-256 hash of the resume text to avoid redundant API calls.
 */
export class ResumeAnalyzer {
  async analyzeResume(resumeText: string): Promise<AnalysisResult<TalentAuditData>> {
    const cacheKey = getCacheKey(resumeText)
    const cached = analysisCache.get(cacheKey)
    if (cached) return cached

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

    const result: AnalysisResult<TalentAuditData> = {
      data,
      confidenceScore: data.confidenceScore,
      assumptions: data.assumptions,
      metadata: {
        latency: Date.now() - start,
        tokens: completion.usage?.total_tokens || 0
      }
    }

    cacheSet(cacheKey, result)
    return result
  }
}

export const resumeAnalyzer = new ResumeAnalyzer()
