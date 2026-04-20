'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SparklesIcon, ChartBarIcon, ArrowPathIcon } from '@heroicons/react/24/outline'
import { cn } from '@/lib/utils'
import { ArchitecturePanel, TechnicalInsightCard, PerformanceMeter, EngineeringDecisionBlock } from '@/app/components/ui/EngineeringUI'

/**
 * Opportunity Matcher
 * Matches technical domains with monetizable engineering initiatives.
 */
export function OpportunityMatcher() {
  const [userInterest, setUserInterest] = useState('')
  const [opportunity, setOpportunity] = useState<OpportunityResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const suggestions = [
    'Real-time logistics optimization',
    'AI-driven credit scoring',
    'Automated supply chain engines',
    'High-throughput checkout systems',
    'Predictive maintenance pipelines',
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
      setError(err instanceof Error ? err.message : 'Technical analysis failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="opportunity-matcher" className="bg-background py-24 relative overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-12"
        >
          <div className="text-center space-y-4">
            <span className="label">Opportunity Engine</span>
            <h2 className="h2 text-white">
              Opportunity Matcher
            </h2>
            <p className="body max-w-2xl mx-auto">
              Map your engineering domains to high-impact technical initiatives and production-ready architectures.
            </p>
          </div>

          <div className="bg-surface rounded-[12px] p-8 lg:p-12 border border-surface-2">
            {/* Input Section */}
            <div className="space-y-8">
              <div className="flex flex-wrap gap-2 mb-4 justify-center">
                <span className="font-mono text-[10px] text-text-muted uppercase tracking-wider w-full text-center mb-2">Technical Focus Areas</span>
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => setUserInterest(suggestion)}
                    className="px-3 py-1 bg-background hover:bg-primary/10 text-text-muted hover:text-primary text-[10px] 
                             font-mono uppercase rounded-full transition-all border border-surface-2 hover:border-primary/30"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 max-w-3xl mx-auto">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={userInterest}
                    onChange={(e) => setUserInterest(e.target.value)}
                    placeholder="Enter technical domain or problem space..."
                    className="w-full bg-background border border-surface-2 rounded-[8px] px-6 py-4 
                             text-white placeholder-text-muted focus:border-primary focus:outline-none 
                             transition-all font-serif italic text-[16px]"
                    disabled={loading}
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted">
                    <SparklesIcon className="w-5 h-5" />
                  </div>
                </div>
                <button
                  onClick={getOpportunity}
                  disabled={loading || !userInterest.trim()}
                  className={cn(
                    'px-10 py-4 rounded-[6px] font-semibold uppercase tracking-widest transition-all text-[12px]',
                    loading || !userInterest.trim()
                      ? 'bg-surface-2 text-text-muted cursor-not-allowed'
                      : 'bg-primary hover:scale-[0.98] text-background'
                  )}
                >
                  {loading ? 'Analyzing...' : 'Match'}
                </button>
              </div>
            </div>

            {error && (
              <div className="mt-8 p-4 bg-red-500/5 border border-red-500/20 rounded-[8px] text-red-500 text-[11px] font-mono uppercase text-center tracking-widest">
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
                  className="mt-16 space-y-12"
                >
                  <div className="grid md:grid-cols-12 gap-12">
                    <div className="md:col-span-8 space-y-12">
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="font-mono text-[10px] uppercase text-primary tracking-[0.2em] mb-2 block">Technical Recommendation</span>
                          <h3 className="text-[32px] font-semibold text-white leading-tight">{opportunity.title}</h3>
                        </div>
                        <div className="text-right">
                          <div className="text-[32px] font-bold text-primary leading-none">{opportunity.feasibility}%</div>
                          <div className="font-mono text-[10px] text-text-muted uppercase mt-1">Feasibility</div>
                        </div>
                      </div>
                      
                      <div className="p-8 bg-background rounded-[12px] border border-surface-2 space-y-4">
                        <div className="flex items-center gap-2 font-mono text-[10px] text-text-muted uppercase tracking-widest">
                          <ChartBarIcon className="w-4 h-4 text-primary" />
                          Technical Reasoning
                        </div>
                        <p className="font-serif italic text-[18px] text-text-secondary leading-relaxed">{opportunity.strategicReasoning}</p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <TechnicalInsightCard title="Performance ROI" value={opportunity.roiPotential} description="Projected outcome of implementation" />
                        <TechnicalInsightCard title="Complexity" value={opportunity.riskLevel} description="Implementation difficulty" />
                      </div>
                    </div>

                    <div className="md:col-span-4 space-y-8">
                      <ArchitecturePanel title="Stack Recommendation">
                        <p className="text-[14px] text-text-secondary mb-6">{opportunity.businessModel}</p>
                        <div className="space-y-4">
                          <div className="font-mono text-[10px] text-text-muted uppercase tracking-widest">Core Tech</div>
                          <div className="flex flex-wrap gap-2">
                            {opportunity.requiredTech.map(tech => (
                              <span key={tech} className="pill-tag">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </ArchitecturePanel>
                      
                      <EngineeringDecisionBlock 
                        title="Engineering Move" 
                        action={`Implement ${opportunity.title.toLowerCase()} as a distributed service.`} 
                        impact="High Availability"
                        priority="High"
                      />
                    </div>
                  </div>

                  <div className="flex justify-center pt-12 border-t border-surface-2">
                    <button 
                      onClick={() => setOpportunity(null)}
                      className="flex items-center gap-2 font-mono text-[10px] text-text-muted uppercase tracking-widest hover:text-white transition-all"
                    >
                      <ArrowPathIcon className="w-4 h-4" />
                      New Analysis
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