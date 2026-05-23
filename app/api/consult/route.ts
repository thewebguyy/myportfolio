import { NextResponse } from 'next/server'
import { z } from 'zod'
import { orchestrator } from '@/services/ai-orchestrator'
import { sysStorage } from '@/lib/storage'

const requestSchema = z.object({
  businessType: z.string().min(2),
  revenueEstimate: z.string().min(2),
  challenge: z.string().min(10),
})

/**
 * Technical Audit — Orchestrated Version
 * Demonstrates multi-step reasoning and persistence.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { businessType, revenueEstimate, challenge } = requestSchema.parse(body)

    // Tiered Rate Limiting Simulation (Upstash Logic already exists in middleware usually, 
    // but we can add a simulation header here to signal multi-tenant awareness)
    const isPremium = req.headers.get('x-tier') === 'enterprise'
    
    // Orchestrate the multi-step audit
    const result = await orchestrator.orchestrateAudit({
      businessType,
      revenue: revenueEstimate,
      challenge
    })

    // Persistence Layer
    const report = await sysStorage.saveReport({
      type: 'audit',
      input: { businessType, revenueEstimate, challenge },
      output: result.data,
      metadata: {
        latency: result.metadata.latency,
        userId: 'anon-sim-user'
      }
    })

    return NextResponse.json({
      audit: result.data,
      steps: result.steps, // Return steps for UI visualization
      confidenceScore: result.confidenceScore,
      assumptions: result.assumptions,
      reportId: report.id,
      metadata: {
        ...result.metadata,
        tier: isPremium ? 'Enterprise' : 'Standard'
      }
    })
  } catch (error) {
    console.error('Technical Audit Error:', error)
    return NextResponse.json(
      { error: 'System orchestration failed. Please check parameters or retry.' },
      { status: 400 }
    )
  }
}
