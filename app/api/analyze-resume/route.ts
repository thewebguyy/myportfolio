import { NextResponse } from 'next/server'
import { z } from 'zod'
import { orchestrator } from '@/services/ai-orchestrator'
import { sysStorage } from '@/lib/storage'

const requestSchema = z.object({
  resumeText: z.string().min(50),
})

/**
 * Talent Intelligence Engine - Orchestrated Version
 * Demonstrates semantic extraction and risk modeling.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { resumeText } = requestSchema.parse(body)

    const result = await orchestrator.orchestrateTalentAudit(resumeText)

    // Persistence Layer
    const report = await sysStorage.saveReport({
      type: 'talent',
      input: { length: resumeText.length },
      output: result.data,
      metadata: {
        latency: result.metadata.latency,
        userId: 'anon-sim-user'
      }
    })

    return NextResponse.json({
      analysis: result.data,
      steps: result.steps,
      confidenceScore: result.confidenceScore,
      assumptions: result.assumptions,
      reportId: report.id,
      metadata: result.metadata
    })
  } catch (error) {
    console.error('Talent Orchestration Error:', error)
    return NextResponse.json(
      { error: 'Talent risk modeling failed. Ensure resume text is clear.' },
      { status: 400 }
    )
  }
}