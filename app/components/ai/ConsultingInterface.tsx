'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  BuildingOfficeIcon, 
  CurrencyDollarIcon, 
  ExclamationTriangleIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  BoltIcon
} from '@heroicons/react/24/outline'
import { cn } from '@/lib/utils'
import { DataPanel, InsightCard, RiskMeter, DecisionBlock } from '@/app/components/ui/ConsultingUI'

export function ConsultingInterface() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [audit, setAudit] = useState<ConsultingAudit | null>(null)
  const [formData, setFormData] = useState({
    businessType: '',
    revenueEstimate: '',
    challenge: ''
  })

  async function runAudit() {
    if (!formData.businessType || !formData.revenueEstimate || !formData.challenge) return

    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/consult', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Audit failed')
      setAudit(data.audit)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Consultation failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="section bg-secondary relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/4" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-12"
        >
          <div className="text-center space-y-4">
            <span className="text-primary text-sm font-black uppercase tracking-[0.4em]">Audit Interface</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              AI-Powered <span className="gradient-text">Strategic Audit</span>
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto font-serif italic">
              Input your operational parameters for an instant, Big 4-level strategic gap analysis and risk map.
            </p>
          </div>

          {!audit ? (
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
                      placeholder="e.g. Fintech, Manufacturing, SME"
                      className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-4 text-white focus:border-primary focus:outline-none transition-all"
                      value={formData.businessType}
                      onChange={e => setFormData({...formData, businessType: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                      <CurrencyDollarIcon className="w-4 h-4 text-primary" />
                      Annual Revenue Estimate
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
                    Key Strategic Challenge
                  </label>
                  <textarea 
                    placeholder="Describe your primary operational or financial bottleneck..."
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
                  loading || !formData.businessType || !formData.challenge
                    ? "bg-gray-800 text-gray-600 cursor-not-allowed"
                    : "bg-primary hover:bg-primary-light text-white shadow-2xl shadow-primary/30"
                )}
              >
                {loading ? 'Processing Strategic Data...' : 'Generate Strategic Audit Report'}
                <BoltIcon className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-8"
            >
              {/* Audit Results Dashboard */}
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Audit Overview */}
                <DataPanel title="Audit Overview" className="lg:col-span-1">
                  <div className="space-y-6">
                    <div>
                      <div className="text-[10px] text-gray-500 uppercase font-black mb-2">Current State Analysis</div>
                      <p className="text-sm text-white font-serif leading-relaxed italic">&quot;{audit.auditResult.currentState}&quot;</p>
                    </div>
                    <div className="space-y-3">
                      <div className="text-[10px] text-gray-500 uppercase font-black">Efficiency Gaps</div>
                      {audit.auditResult.efficiencyGaps.map((gap, i) => (
                        <div key={i} className="flex gap-2 items-center p-3 bg-red-500/5 border border-red-500/20 rounded-lg">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                          <span className="text-xs text-red-200">{gap}</span>
                        </div>
                      ))}
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
                  <div className="mt-8 pt-6 border-t border-gray-800">
                    <h4 className="text-[10px] text-gray-500 uppercase font-black mb-4">Strategic Timeline</h4>
                    <div className="flex items-center gap-4">
                      <div className="px-4 py-2 bg-primary/10 border border-primary/30 rounded-lg text-primary font-bold text-xs">
                        {audit.timeline}
                      </div>
                      <div className="flex-1 h-px bg-gray-800" />
                      <span className="text-[10px] text-gray-600 uppercase font-black">Implementation Horizon</span>
                    </div>
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
                  New Strategy Audit
                </button>
                <a 
                  href="#contact"
                  className="px-8 py-4 bg-primary text-white rounded-xl uppercase text-xs font-black tracking-widest hover:bg-primary-light transition-all shadow-xl shadow-primary/20"
                >
                  Book Strategic Consultation
                </a>
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
  timeline: string
}
