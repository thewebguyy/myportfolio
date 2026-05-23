import { NextResponse } from 'next/server'
import { z } from 'zod'
import { orchestrator } from '@/services/ai-orchestrator'
import { sysStorage } from '@/lib/storage'
import { handleOpenAIError } from '@/lib/openai'

const requestSchema = z.object({
  resumeText: z.string().min(50),
})

/**
 * Talent Intelligence Engine - Orchestrated Version
 * Demonstrates semantic extraction and risk modeling.
 */
export async function POST(req: Request) {
  try {
    let body;
    try {
      body = await req.json()
    } catch {
      return NextResponse.json(
        { error: "Invalid input. Please provide resume text." },
        { status: 400 }
      )
    }

    const parseResult = requestSchema.safeParse(body)
    if (!parseResult.success) {
      return NextResponse.json(
        { error: "Invalid input. Please provide resume text." },
        { status: 400 }
      )
    }

    const { resumeText } = parseResult.data

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
    const errorMessage = handleOpenAIError(error)
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}