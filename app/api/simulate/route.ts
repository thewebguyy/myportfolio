import { NextResponse } from 'next/server'
import { z } from 'zod'
import { orchestrator } from '@/services/ai-orchestrator'
import { sysStorage } from '@/lib/storage'

const requestSchema = z.object({
  cost: z.string().min(1),
  revenue: z.string().min(1),
  teamSize: z.string().min(1),
  riskLevel: z.string().min(1),
})

/**
 * Decision Simulation API
 * Projects outcomes and financial impacts.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const params = requestSchema.parse(body)

    const result = await orchestrator.simulateDecision(params)

    // Persistence Layer
    await sysStorage.saveReport({
      type: 'audit',
      input: params,
      output: result.data,
      metadata: {
        latency: result.metadata.latency,
        userId: 'anon-sim-user'
      }
    })

    return NextResponse.json({
      simulation: result.data,
      steps: result.steps,
      confidenceScore: result.confidenceScore,
      metadata: result.metadata
    })
  } catch (error) {
    console.error('Simulation Error:', error)
    return NextResponse.json(
      { error: 'Decision simulation failed. Check parameters.' },
      { status: 400 }
    )
  }
}
