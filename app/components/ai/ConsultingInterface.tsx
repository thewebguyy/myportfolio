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

export function ConsultingInterface() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [audit, setAudit] = useState<ConsultingAudit | null>(null)
  const [steps, setSteps] = useState<any[]>([])
  const [metadata, setMetadata] = useState<any>(null)
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
      { id: 'parsing', label: 'Initializing Orchestrator...', status: 'processing' },
      { id: 'classification', label: 'Pending Classification', status: 'pending' },
      { id: 'analysis', label: 'Strategic Gap Analysis', status: 'pending' },
      { id: 'generation', label: 'Finalizing Report', status: 'pending' },
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
STRATEGIC AUDIT REPORT
Generated: ${new Date().toLocaleString()}
----------------------------------------
BUSINESS: ${formData.businessType}
REVENUE: ${formData.revenueEstimate}
CHALLENGE: ${formData.challenge}

AUDIT OVERVIEW:
${audit.auditResult.currentState}

RISK MAP:
- Operational: ${audit.riskMap.operational}
- Financial: ${audit.riskMap.financial}
- Strategic: ${audit.riskMap.strategic}

RECOMMENDATIONS:
${audit.recommendations.map(r => `[${r.priority}] ${r.action} (ROI: ${r.expectedRoi})`).join('\n')}

SYSTEM METADATA:
- Confidence Score: ${audit.confidenceScore}%
- Latency: ${metadata?.latency}ms
- Orchestration Steps: 4
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
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/4" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-12"
        >
          <div className="text-center space-y-4">
            <span className="text-primary text-sm font-black uppercase tracking-[0.4em]">Audit Interface v2.0</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              AI-Powered <span className="gradient-text">Strategic Audit</span>
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto font-serif italic">
              Multi-step orchestration pipeline for enterprise-grade strategic analysis.
            </p>
          </div>

          {!audit && !loading ? (
            <div className="glass p-8 lg:p-12 rounded-3xl border-primary/10 max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                      <BuildingOfficeIcon className="w-4 h-4 text-primary" />
                      Business Type
                    </label>
                    <input 
                      type="text"
                      placeholder="e.g. Fintech, Manufacturing"
                      className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-4 text-white focus:border-primary focus:outline-none transition-all"
                      value={formData.businessType}
                      onChange={e => setFormData({...formData, businessType: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                      <CurrencyDollarIcon className="w-4 h-4 text-primary" />
                      Revenue Estimate
                    </label>
                    <input 
                      type="text"
                      placeholder="e.g. $5M - $10M"
                      className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-4 text-white focus:border-primary focus:outline-none transition-all"
                      value={formData.revenueEstimate}
                      onChange={e => setFormData({...formData, revenueEstimate: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <ExclamationTriangleIcon className="w-4 h-4 text-primary" />
                    Key Challenge
                  </label>
                  <textarea 
                    placeholder="Describe the primary bottleneck..."
                    className="w-full h-[148px] bg-gray-950 border border-gray-800 rounded-xl p-4 text-white font-mono text-sm focus:border-primary focus:outline-none resize-none"
                    value={formData.challenge}
                    onChange={e => setFormData({...formData, challenge: e.target.value})}
                  />
                </div>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center gap-3">
                  <ExclamationTriangleIcon className="w-5 h-5 text-red-500" />
                  <p className="text-red-400 text-xs font-bold uppercase">{error}</p>
                </div>
              )}

              <button
                onClick={runAudit}
                disabled={loading || !formData.businessType || !formData.challenge}
                className={cn(
                  "w-full py-5 rounded-2xl font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3",
                  "bg-primary hover:bg-primary-light text-white shadow-2xl shadow-primary/30"
                )}
              >
                Run Strategic Audit
                <BoltIcon className="w-5 h-5" />
              </button>

              <TechnicalDetails 
                flow={['POST /api/consult', 'Zod Validation', 'AI Orchestrator', 'Redis Rate Limiting', 'Persistence Layer']}
                prompt="System: Strategic Orchestrator. Audit context: 3-stage pipeline (Classification, Analysis, Synthesis). Format: Strict JSON."
                logic="Tiered rate limiting (5 req/hr anon). Request isolation via session-id hashing. LocalStorage persistence abstraction."
              />
            </div>
          ) : loading ? (
            <div className="max-w-4xl mx-auto space-y-8">
               <div className="glass p-12 rounded-3xl border-primary/20 text-center space-y-8">
                  <div className="relative w-24 h-24 mx-auto">
                    <div className="absolute inset-0 border-4 border-primary/10 rounded-full" />
                    <motion.div 
                      animate={{ rotate: 360 }} 
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                      className="absolute inset-0 border-4 border-t-primary rounded-full" 
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <CommandLineIcon className="w-8 h-8 text-primary animate-pulse" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-white uppercase tracking-widest">Orchestrating System...</h3>
                    <p className="text-gray-500 font-serif italic">Multi-step reasoning pipeline active.</p>
                  </div>
                  <div className="grid md:grid-cols-4 gap-4 max-w-2xl mx-auto">
                     {steps.map((step, i) => (
                       <div key={i} className={cn(
                         "p-3 rounded-xl border transition-all text-[10px] font-black uppercase tracking-tighter",
                         step.status === 'completed' ? 'bg-green-500/10 border-green-500/30 text-green-500' :
                         step.status === 'processing' ? 'bg-primary/10 border-primary/30 text-primary animate-pulse' :
                         'bg-gray-900 border-gray-800 text-gray-700'
                       )}>
                         {step.label}
                       </div>
                     ))}
                  </div>
               </div>
            </div>
          ) : audit && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-8"
            >
              {/* Results Dashboard */}
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Audit Overview */}
                <DataPanel title="Audit Overview" className="lg:col-span-1">
                  <div className="space-y-6">
                    <div className="flex justify-between items-center bg-primary/5 p-4 rounded-xl border border-primary/10">
                      <div>
                         <div className="text-[10px] text-primary uppercase font-black">Confidence Score</div>
                         <div className="text-2xl font-bold text-white">{audit.confidenceScore}%</div>
                      </div>
                      <ShieldCheckIcon className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <div className="text-[10px] text-gray-500 uppercase font-black mb-2">Current State Analysis</div>
                      <p className="text-sm text-white font-serif leading-relaxed italic">&quot;{audit.auditResult.currentState}&quot;</p>
                    </div>
                  </div>
                </DataPanel>

                {/* Risk Map */}
                <DataPanel title="Risk Map" className="lg:col-span-2">
                  <div className="grid md:grid-cols-3 gap-6">
                    <RiskBlock title="Operational" description={audit.riskMap.operational} color="red" />
                    <RiskBlock title="Financial" description={audit.riskMap.financial} color="yellow" />
                    <RiskBlock title="Strategic" description={audit.riskMap.strategic} color="blue" />
                  </div>
                  <div className="mt-8 pt-6 border-t border-gray-800 flex justify-between items-center">
                    <div>
                      <h4 className="text-[10px] text-gray-500 uppercase font-black mb-1">Execution Latency</h4>
                      <div className="flex items-center gap-2 text-primary font-mono text-xs">
                        <ClockIcon className="w-3 h-3" />
                        {metadata?.latency}ms
                      </div>
                    </div>
                    <button 
                      onClick={downloadReport}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-900 border border-gray-800 text-white rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-gray-800 transition-all"
                    >
                      <ArrowDownTrayIcon className="w-3 h-3" />
                      Export Report
                    </button>
                  </div>
                </DataPanel>
              </div>

              {/* Recommendations */}
              <div className="space-y-4">
                <h3 className="text-sm font-black text-white uppercase tracking-[0.4em] text-center mb-8">Executive Recommendations</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {audit.recommendations.map((rec, i) => (
                    <DecisionBlock 
                      key={i}
                      title={`Strategy ${i+1}`}
                      action={rec.action}
                      impact={`ROI: ${rec.expectedRoi}`}
                      priority={rec.priority}
                    />
                  ))}
                </div>
              </div>

              <div className="flex justify-center gap-6 pt-8">
                <button 
                  onClick={() => setAudit(null)}
                  className="px-8 py-4 bg-gray-900 border border-gray-800 text-gray-400 hover:text-white rounded-xl uppercase text-xs font-black tracking-widest transition-all"
                >
                  New Strategic Run
                </button>
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
      <h5 className="text-[10px] font-black uppercase mb-2 tracking-widest">{title} Risk</h5>
      <p className="text-xs text-gray-300 leading-relaxed font-serif italic">{description}</p>
    </div>
  )
}

interface ConsultingAudit {
  auditResult: {
    currentState: string
    efficiencyGaps: string[]
  }
  riskMap: {
    operational: string
    financial: string
    strategic: string
  }
  recommendations: {
    priority: 'High' | 'Medium' | 'Low'
    action: string
    expectedRoi: string
  }[]
  confidenceScore: number
  assumptions: string[]
}
