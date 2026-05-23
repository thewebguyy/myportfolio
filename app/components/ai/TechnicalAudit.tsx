'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  ExclamationTriangleIcon,
  ArrowPathIcon,
  BoltIcon
} from '@heroicons/react/24/outline'
import { cn } from '@/lib/utils'
import { ArchitecturePanel, TechnicalInsightCard, EngineeringDecisionBlock } from '@/app/components/ui/EngineeringUI'

interface OrchestrationStep {
  id: string
  label: string
  status: 'pending' | 'processing' | 'completed' | 'failed'
}

interface AuditMetadata {
  latency: number
  tokens: number
  tier: string
}

export function TechnicalAudit() {
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [audit, setAudit] = useState<EngineeringAudit | null>(null)
  const [steps, setSteps] = useState<OrchestrationStep[]>([])
  // metadata removed
  const [formData, setFormData] = useState({
    businessType: '',
    revenueEstimate: '',
    challenge: ''
  })

  async function runAudit() {
    if (!formData.businessType || !formData.challenge) return

    setLoading(true)
    setError(null)
    setAudit(null)
    setSteps([
      { id: 'parsing', label: 'Input Normalization', status: 'processing' },
      { id: 'context', label: 'System Modeling', status: 'pending' },
      { id: 'analysis', label: 'Technical Gap Analysis', status: 'pending' },
      { id: 'generation', label: 'Synthesis', status: 'pending' },
    ])

    try {
      const response = await fetch('/api/consult', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Audit failed')
      
      setAudit(data.audit)
      setSteps(data.steps)
      setMetadata(data.metadata)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Technical audit failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="technical-audit" className="bg-background py-24 relative overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-12"
        >
          <div className="text-center space-y-4">
            <span className="label">Demo</span>
            <h2 className="h2 text-white">
              Technical Performance Audit
            </h2>
            <p className="body max-w-2xl mx-auto">
              Identify architectural bottlenecks and performance gaps in your technical infrastructure.
            </p>
          </div>

          {!audit && !loading ? (
            <div className="bg-surface p-8 lg:p-12 rounded-[12px] border border-surface-2 max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-6">
                  <div>
                    <label className="font-mono text-[10px] text-text-muted uppercase tracking-widest mb-3 block">System Type / Stack</label>
                    <input 
                      type="text"
                      placeholder="e.g. Next.js, Go, PostgreSQL"
                      className="w-full bg-background border border-surface-2 rounded-[8px] px-4 py-4 text-white focus:border-primary focus:outline-none"
                      value={formData.businessType}
                      onChange={e => setFormData({...formData, businessType: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="font-mono text-[10px] text-text-muted uppercase tracking-widest mb-3 block">Concurrent Users (Scale)</label>
                    <input 
                      type="text"
                      placeholder="e.g. 10k users"
                      className="w-full bg-background border border-surface-2 rounded-[8px] px-4 py-4 text-white focus:border-primary focus:outline-none"
                      value={formData.revenueEstimate}
                      onChange={e => setFormData({...formData, revenueEstimate: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <label className="font-mono text-[10px] text-text-muted uppercase tracking-widest mb-3 block">Primary Technical Bottleneck</label>
                  <textarea 
                    placeholder="Describe the bottleneck..."
                    className="w-full h-[148px] bg-background border border-surface-2 rounded-[8px] p-4 text-white font-mono text-sm focus:border-primary focus:outline-none resize-none"
                    value={formData.challenge}
                    onChange={e => setFormData({...formData, challenge: e.target.value})}
                  />
                </div>
              </div>

              <button
                onClick={runAudit}
                disabled={loading || !formData.businessType || !formData.challenge}
                className="w-full py-4 rounded-[6px] font-semibold uppercase tracking-widest bg-primary hover:scale-[0.98] text-background transition-all flex items-center justify-center gap-3 text-[12px]"
              >
                Execute Technical Audit
                <BoltIcon className="w-4 h-4" />
              </button>
            </div>
          ) : loading ? (
            <div className="max-w-4xl mx-auto bg-surface p-16 rounded-[12px] border border-surface-2 text-center space-y-10">
               <div className="w-12 h-12 border-2 border-surface-2 border-t-primary rounded-full animate-spin mx-auto" />
               <div className="font-mono text-[11px] text-white uppercase tracking-widest">Orchestrating Diagnostic...</div>
               <div className="flex justify-center gap-2">
                  {steps.map((step, i) => (
                    <div key={i} className={cn(
                      "px-3 py-1 rounded-[4px] border text-[9px] font-mono uppercase tracking-wider",
                      step.status === 'completed' ? 'border-secondary/30 text-secondary' :
                      step.status === 'processing' ? 'border-primary/30 text-primary animate-pulse' : 'border-surface-2 text-text-muted'
                    )}>
                      {step.label}
                    </div>
                  ))}
               </div>
            </div>
          ) : audit && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
              <div className="grid lg:grid-cols-12 gap-12">
                <div className="lg:col-span-4 space-y-8">
                  <ArchitecturePanel title="System Insight">
                     <div className="space-y-8">
                        <PerformanceMeter label="Confidence Score" score={audit.trustSignals.confidenceScore} />
                        <p className="font-serif italic text-[18px] text-text-secondary leading-relaxed">
                          &quot;{audit.auditResult.currentState}&quot;
                        </p>
                        <div className="space-y-3 pt-6 border-t border-surface-2">
                           <div className="font-mono text-[10px] text-text-muted uppercase tracking-widest">Engineering Principle</div>
                           <p className="text-[13px] text-text-secondary italic">{audit.trustSignals.whyItWorks}</p>
                        </div>
                     </div>
                  </ArchitecturePanel>
                </div>

                <div className="lg:col-span-8 space-y-8">
                   <div className="grid md:grid-cols-3 gap-6">
                      <TechnicalInsightCard title="Reliability" value="High" description="Redundancy & Failover" />
                      <TechnicalInsightCard title="Latency" value="Sub-200ms" description="Request cycle time" />
                      <TechnicalInsightCard title="Scalability" value="Elastic" description="Resource management" />
                   </div>
                   
                   <ArchitecturePanel title="Technical Recommendations">
                      <div className="grid md:grid-cols-2 gap-6">
                         {audit.recommendations.map((rec, i) => (
                           <EngineeringDecisionBlock 
                            key={i}
                            title={rec.action}
                            action={rec.technicalImpact}
                            impact={rec.expectedPerfGain}
                            priority={rec.priority as 'High' | 'Medium' | 'Low'}
                           />
                         ))}
                      </div>
                      <div className="mt-8 pt-6 border-t border-surface-2">
                         <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-[8px]">
                            <h5 className="font-mono text-[10px] text-red-500 uppercase tracking-widest mb-1 flex items-center gap-2">
                              <ExclamationTriangleIcon className="w-3 h-3" />
                              System Risk Notice
                            </h5>
                            <p className="text-[12px] text-text-secondary">{audit.trustSignals.whereItMayFail}</p>
                         </div>
                      </div>
                   </ArchitecturePanel>
                </div>
              </div>

              <div className="flex justify-center pt-8">
                 <button 
                  onClick={() => setAudit(null)} 
                  className="flex items-center gap-2 font-mono text-[10px] text-text-muted uppercase tracking-widest hover:text-white transition-all"
                 >
                  <ArrowPathIcon className="w-4 h-4" />
                  New Diagnostic
                 </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}

interface EngineeringAudit {
  auditResult: { currentState: string; efficiencyGaps: string[] }
  riskMap: { operational: string; financial: string; strategic: string }
  recommendations: { priority: string; action: string; technicalImpact: string; developmentPlan: string; expectedPerfGain: string }[]
  trustSignals: { whyItWorks: string; whereItMayFail: string; confidenceScore: number }
}
