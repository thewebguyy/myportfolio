'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SparklesIcon, RocketLaunchIcon, ChartBarIcon, ArrowPathIcon } from '@heroicons/react/24/outline'
import { cn } from '@/lib/utils'
import { DataPanel, InsightCard, RiskMeter, DecisionBlock } from '@/app/components/ui/ConsultingUI'

/**
 * Strategic Opportunity Engine
 * Upgraded from Project Recommender.
 * Matches user interests with monetizable business opportunities.
 */
export function AIProjectRecommender() {
  const [userInterest, setUserInterest] = useState('')
  const [opportunity, setOpportunity] = useState<OpportunityResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const suggestions = [
    'Real-time logistics optimization',
    'AI-driven credit scoring',
    'Automated supply chain audits',
    'Carbon footprint tracking SaaS',
    'Predictive maintenance for manufacturing',
  ]

  async function getOpportunity() {
    if (!userInterest.trim()) return

    setLoading(true)
    setError(null)
    setOpportunity(null)

    try {
      const response = await fetch('/api/recommend-project', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ interest: userInterest }),
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Failed to generate opportunity')
      setOpportunity(data.opportunity)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Strategic analysis failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="section bg-secondary relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-12"
        >
          <div className="text-center space-y-4">
            <span className="text-primary text-sm font-black uppercase tracking-[0.3em]">Opportunity Engine</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Strategic <span className="gradient-text">Opportunity Matcher</span>
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto font-serif italic">
              Map your business interests to high-ROI technical initiatives and monetizable models.
            </p>
          </div>

          <div className="glass rounded-3xl p-8 lg:p-12 border-primary/10">
            {/* Input Section */}
            <div className="space-y-6">
              <div className="flex flex-wrap gap-2 mb-4 justify-center">
                <span className="text-[10px] text-gray-500 uppercase font-black w-full text-center mb-2">Industry Focus Areas</span>
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => setUserInterest(suggestion)}
                    className="px-3 py-1 bg-gray-900 hover:bg-primary/20 text-gray-400 hover:text-primary text-[10px] 
                             font-black uppercase rounded-full transition-all border border-gray-800 hover:border-primary/40"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={userInterest}
                    onChange={(e) => setUserInterest(e.target.value)}
                    placeholder="Enter industry, technical domain, or business challenge..."
                    className="w-full bg-gray-950 border border-gray-800 rounded-xl px-6 py-5 
                             text-white placeholder-gray-600 focus:border-primary focus:outline-none 
                             transition-all font-serif italic"
                    disabled={loading}
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-700">
                    <SparklesIcon className="w-5 h-5" />
                  </div>
                </div>
                <button
                  onClick={getOpportunity}
                  disabled={loading || !userInterest.trim()}
                  className={cn(
                    'px-10 py-5 rounded-xl font-black uppercase tracking-widest transition-all',
                    loading || !userInterest.trim()
                      ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
                      : 'bg-primary hover:bg-primary-light text-white shadow-xl shadow-primary/20'
                  )}
                >
                  {loading ? 'Analyzing Market Fit...' : 'Generate Opportunity'}
                </button>
              </div>
            </div>

            {error && (
              <div className="mt-8 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-500 text-xs font-bold uppercase text-center tracking-widest">
                ⚠️ {error}
              </div>
            )}

            {/* Results */}
            <AnimatePresence mode="wait">
              {opportunity && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  className="mt-12 space-y-8"
                >
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 space-y-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-[10px] font-black uppercase text-primary tracking-[0.3em] mb-2 block">Strategic Recommendation</span>
                          <h3 className="text-3xl font-bold text-white">{opportunity.title}</h3>
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-black text-primary">{opportunity.feasibility}%</div>
                          <div className="text-[10px] text-gray-500 uppercase font-black">Feasibility</div>
                        </div>
                      </div>
                      
                      <div className="p-6 bg-gray-950 rounded-2xl border border-gray-800 space-y-4">
                        <div className="flex items-center gap-2 text-xs font-black text-gray-500 uppercase tracking-widest">
                          <ChartBarIcon className="w-4 h-4 text-primary" />
                          Strategic Reasoning
                        </div>
                        <p className="text-gray-400 font-serif leading-relaxed italic">{opportunity.strategicReasoning}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <InsightCard title="ROI Potential" value={opportunity.roiPotential} description="Estimated financial return" />
                        <InsightCard title="Risk Level" value={opportunity.riskLevel} description="Implementation complexity" />
                      </div>
                    </div>

                    <div className="space-y-6">
                      <DataPanel title="Business Model">
                        <p className="text-sm text-gray-400 font-serif italic mb-4">{opportunity.businessModel}</p>
                        <div className="space-y-3">
                          <div className="text-[10px] text-gray-600 uppercase font-black">Required Infrastructure</div>
                          <div className="flex flex-wrap gap-2">
                            {opportunity.requiredTech.map(tech => (
                              <span key={tech} className="px-2 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase rounded border border-primary/20">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </DataPanel>
                      
                      <DecisionBlock 
                        title="Strategic Move" 
                        action={`Pivot focus towards ${opportunity.title.toLowerCase()} integration.`} 
                        impact="Market Leadership Potential"
                        priority="High"
                      />
                    </div>
                  </div>

                  <div className="flex justify-center pt-8 border-t border-gray-900">
                    <button 
                      onClick={() => setOpportunity(null)}
                      className="flex items-center gap-2 text-[10px] font-black text-gray-600 uppercase tracking-widest hover:text-white transition-all"
                    >
                      <ArrowPathIcon className="w-4 h-4" />
                      Reset Analysis
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function LoadingSpinner() {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
    />
  )
}

interface OpportunityResult {
  opportunityId: string
  title: string
  feasibility: number
  roiPotential: string
  riskLevel: string
  strategicReasoning: string
  businessModel: string
  requiredTech: string[]
}