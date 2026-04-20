'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  BuildingOfficeIcon, 
  CurrencyDollarIcon, 
  ExclamationTriangleIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  BoltIcon,
  ArrowDownTrayIcon,
  ClockIcon,
  CommandLineIcon
} from '@heroicons/react/24/outline'
import { cn } from '@/lib/utils'
import { DataPanel, InsightCard, RiskMeter, DecisionBlock } from '@/app/components/ui/ConsultingUI'
import { TechnicalDetails } from '@/app/components/ui/TechnicalDetails'

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

export function ConsultingInterface() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [audit, setAudit] = useState<ConsultingAudit | null>(null)
  const [steps, setSteps] = useState<OrchestrationStep[]>([])
  const [metadata, setMetadata] = useState<AuditMetadata | null>(null)
  const [formData, setFormData] = useState({
    businessType: '',
    revenueEstimate: '',
    challenge: ''
  })

  async function runAudit() {
    if (!formData.businessType || !formData.revenueEstimate || !formData.challenge) return

    setLoading(true)
    setError(null)
    setAudit(null)
    setSteps([
      { id: 'parsing', label: 'Input Normalization', status: 'processing' },
      { id: 'context', label: 'Economic Modeling', status: 'pending' },
      { id: 'analysis', label: 'Strategic Gap Analysis', status: 'pending' },
      { id: 'generation', label: 'Outcome Synthesis', status: 'pending' },
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
      setError(err instanceof Error ? err.message : 'Consultation failed')
    } finally {
      setLoading(false)
    }
  }

  const downloadReport = () => {
    if (!audit) return
    const content = `
STRATEGIC AUDIT REPORT (Outcome Driven)
Generated: ${new Date().toLocaleString()}
----------------------------------------
BUSINESS: ${formData.businessType}
REVENUE: ${formData.revenueEstimate}
CHALLENGE: ${formData.challenge}

AUDIT OVERVIEW:
${audit.auditResult.currentState}

TRUST SIGNALS:
- Why it works: ${audit.trustSignals.whyItWorks}
- Where it may fail: ${audit.trustSignals.whereItMayFail}
- Confidence: ${audit.trustSignals.confidenceScore}%

RECOMMENDATIONS:
${audit.recommendations.map(r => `
[${r.priority}] ${r.action}
- Financial Impact: ${r.financialImpact}
- Risk Mitigation: ${r.riskMitigation}
- ROI: ${r.expectedRoi}
`).join('\n')}
    `
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `Strategic_Audit_${Date.now()}.txt`
    a.click()
  }

  return (
    <section className="section bg-secondary relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-12"
        >
          <div className="text-center space-y-4">
            <span className="text-primary text-sm font-black uppercase tracking-[0.4em]">Audit Interface v2.1</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Strategic <span className="gradient-text">Audit Engine</span>
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto font-serif italic">
              Generating actionable intelligence under real-world economic pressures.
            </p>
          </div>

          {!audit && !loading ? (
            <div className="glass p-8 lg:p-12 rounded-3xl border-primary/10 max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-3">Sector / Model</label>
                    <input 
                      type="text"
                      placeholder="e.g. B2B SaaS, Logistics"
                      className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-4 text-white focus:border-primary focus:outline-none"
                      value={formData.businessType}
                      onChange={e => setFormData({...formData, businessType: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-3">Scale (Annual Revenue)</label>
                    <input 
                      type="text"
                      placeholder="e.g. $2M"
                      className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-4 text-white focus:border-primary focus:outline-none"
                      value={formData.revenueEstimate}
                      onChange={e => setFormData({...formData, revenueEstimate: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-3">Primary Operational Bottleneck</label>
                  <textarea 
                    placeholder="Describe the challenge..."
                    className="w-full h-[148px] bg-gray-950 border border-gray-800 rounded-xl p-4 text-white font-mono text-sm focus:border-primary focus:outline-none resize-none"
                    value={formData.challenge}
                    onChange={e => setFormData({...formData, challenge: e.target.value})}
                  />
                </div>
              </div>

              <button
                onClick={runAudit}
                disabled={loading || !formData.businessType || !formData.challenge}
                className="w-full py-5 rounded-2xl font-black uppercase tracking-widest bg-primary hover:bg-primary-light text-white shadow-2xl transition-all flex items-center justify-center gap-3"
              >
                Execute Strategic Audit
                <BoltIcon className="w-5 h-5" />
              </button>

              <TechnicalDetails 
                flow={['POST /api/consult', 'Context Injection', 'Orchestration Pipeline', 'Output Synthesis']}
                prompt="System: Elite Consultant. Context: FX Volatility/Inflation. Format: Outcome-Driven JSON."
                logic="Decision logic factors in capital cost and risk reduction vectors."
              />
            </div>
          ) : loading ? (
            <div className="max-w-4xl mx-auto glass p-12 rounded-3xl border-primary/20 text-center space-y-8">
               <div className="w-16 h-16 border-4 border-primary/10 border-t-primary rounded-full animate-spin mx-auto" />
               <div className="text-xl font-bold text-white uppercase tracking-widest">Orchestrating Audit...</div>
               <div className="flex justify-center gap-2">
                  {steps.map((step, i) => (
                    <div key={i} className={cn(
                      "px-3 py-1 rounded text-[10px] font-black uppercase border",
                      step.status === 'completed' ? 'border-green-500/30 text-green-500' :
                      step.status === 'processing' ? 'border-primary/30 text-primary animate-pulse' : 'border-gray-800 text-gray-700'
                    )}>
                      {step.label}
                    </div>
                  ))}
               </div>
            </div>
          ) : audit && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
              <div className="grid lg:grid-cols-3 gap-8">
                <DataPanel title="System Insight">
                   <div className="space-y-6">
                      <div className="p-4 bg-primary/5 border border-primary/10 rounded-xl">
                         <div className="text-[10px] text-primary uppercase font-black mb-1">Confidence Score</div>
                         <div className="text-2xl font-bold text-white">{audit.trustSignals.confidenceScore}%</div>
                      </div>
                      <p className="text-sm text-gray-400 font-serif italic leading-relaxed">
                        &quot;{audit.auditResult.currentState}&quot;
                      </p>
                      <div className="space-y-3 pt-4 border-t border-gray-900">
                         <div className="text-[10px] text-gray-500 uppercase font-black">Strategic Logic</div>
                         <p className="text-[11px] text-white italic opacity-80">{audit.trustSignals.whyItWorks}</p>
                      </div>
                   </div>
                </DataPanel>

                <DataPanel title="Outcome Risk Map" className="lg:col-span-2">
                   <div className="grid md:grid-cols-3 gap-4">
                      <RiskBlock title="Financial" description={audit.riskMap.financial} color="yellow" />
                      <RiskBlock title="Operational" description={audit.riskMap.operational} color="red" />
                      <RiskBlock title="Strategic" description={audit.riskMap.strategic} color="blue" />
                   </div>
                   <div className="mt-8 pt-6 border-t border-gray-800 flex justify-between items-center">
                      <div className="p-3 bg-red-500/5 border border-red-500/20 rounded-xl max-w-md">
                         <h5 className="text-[10px] text-red-500 uppercase font-black mb-1">Warning: Where it may fail</h5>
                         <p className="text-[10px] text-gray-500">{audit.trustSignals.whereItMayFail}</p>
                      </div>
                      <button onClick={downloadReport} className="flex items-center gap-2 text-primary text-[10px] font-black uppercase tracking-widest">
                         <ArrowDownTrayIcon className="w-4 h-4" /> Export Audit
                      </button>
                   </div>
                </DataPanel>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                 {audit.recommendations.map((rec, i) => (
                   <div key={i} className="p-6 bg-gray-950 border border-gray-900 rounded-2xl space-y-4">
                      <div className="flex justify-between items-start">
                         <span className={cn(
                           "px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-tighter",
                           rec.priority === 'High' ? 'bg-red-500/10 text-red-500' : 'bg-yellow-500/10 text-yellow-500'
                         )}>{rec.priority} Priority</span>
                         <span className="text-[10px] text-green-500 font-bold">{rec.expectedRoi} ROI</span>
                      </div>
                      <h4 className="text-white font-bold text-sm">{rec.action}</h4>
                      <div className="space-y-2">
                         <div className="text-[9px] text-gray-600 uppercase font-black">Financial Implication</div>
                         <p className="text-[11px] text-gray-400 italic">{rec.financialImpact}</p>
                      </div>
                      <div className="pt-3 border-t border-gray-900">
                         <div className="text-[9px] text-primary uppercase font-black mb-1">Mitigation Step</div>
                         <p className="text-[11px] text-gray-500">{rec.riskMitigation}</p>
                      </div>
                   </div>
                 ))}
              </div>

              <div className="flex justify-center pt-8">
                 <button onClick={() => setAudit(null)} className="btn btn-secondary px-12">New Strategic Run</button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}

function RiskBlock({ title, description, color }: { title: string, description: string, color: 'red' | 'yellow' | 'blue' }) {
  const colors = {
    red: 'border-red-500/30 text-red-500 bg-red-500/5',
    yellow: 'border-yellow-500/30 text-yellow-500 bg-yellow-500/5',
    blue: 'border-blue-500/30 text-blue-500 bg-blue-500/5'
  }
  return (
    <div className={cn("p-4 rounded-xl border", colors[color])}>
      <h5 className="text-[10px] font-black uppercase mb-2">{title}</h5>
      <p className="text-[11px] text-gray-400 italic leading-relaxed">{description}</p>
    </div>
  )
}

interface ConsultingAudit {
  auditResult: { currentState: string; efficiencyGaps: string[] }
  riskMap: { operational: string; financial: string; strategic: string }
  recommendations: { priority: string; action: string; financialImpact: string; riskMitigation: string; expectedRoi: string }[]
  trustSignals: { whyItWorks: string; whereItMayFail: string; confidenceScore: number }
}
