'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CandidateScreener } from '../ai/CandidateScreener'
import { OpportunityMatcher } from '../ai/OpportunityMatcher'
import { TechnicalAudit } from '../ai/TechnicalAudit'

const AI_TOOLS = [
  {
    id: 'screener',
    title: "AI Candidate Screener",
    description: "Engineered for high-volume recruitment: handles structured output and real-time streaming analysis.",
    tech: "JSON Schema · OpenAI GPT-4 · Streaming",
    component: CandidateScreener
  },
  {
    id: 'matcher',
    title: "Opportunity Matcher",
    description: "Automated semantic matching engine with rate-limited API design for technical market analysis.",
    tech: "Semantic Search · Zod · Rate Limiting",
    component: OpportunityMatcher
  },
  {
    id: 'audit',
    title: "Technical Audit Tool",
    description: "Multi-step prompt orchestration for system diagnostics, generating deep technical insights.",
    tech: "Prompt Engineering · Edge Functions",
    component: TechnicalAudit
  }
]

export function AIShowcase() {
  const [activeDemo, setActiveDemo] = useState<string | null>(null)

  const ActiveComponent = AI_TOOLS.find(t => t.id === activeDemo)?.component

  return (
    <section id="ai" className="section-padding bg-background">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Header */}
        <div className="mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="label mb-4 block"
          >
            What I can build
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="h2 text-white mb-4"
          >
            AI integration, production-ready
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="body max-w-[600px]"
          >
            Three live AI tools I built — try them.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {AI_TOOLS.map((tool, index) => (
            <motion.div
              key={tool.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className={`group bg-surface border rounded-[12px] p-8 relative transition-all duration-300 ${activeDemo === tool.id ? 'border-primary shadow-2xl shadow-primary/10' : 'border-surface-2 hover:border-primary/30'}`}
            >
              {/* Top Accent */}
              {activeDemo === tool.id && (
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-primary rounded-t-[12px]" />
              )}
              
              <h3 className="font-sans font-semibold text-[20px] text-white mb-3">
                {tool.title}
              </h3>
              
              <p className="text-[14px] text-text-secondary leading-[1.6] mb-6 min-h-[64px]">
                {tool.description}
              </p>
              
              <div className="font-mono text-[12px] text-text-muted mb-8">
                {tool.tech}
              </div>
              
              <button 
                onClick={() => setActiveDemo(activeDemo === tool.id ? null : tool.id)} 
                className={`w-full block text-center py-3 rounded-[6px] font-semibold transition-all ${activeDemo === tool.id ? 'bg-primary text-background' : 'bg-surface-2 text-white hover:bg-surface-3'}`}
              >
                {activeDemo === tool.id ? 'Close demo' : 'Try demo'}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Demo Area */}
        <AnimatePresence mode="wait">
          {activeDemo && ActiveComponent && (
            <motion.div
              key={activeDemo}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="pt-12 border-t border-surface-2">
                <ActiveComponent />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-[14px] text-text-muted mt-12"
        >
          Rate-limited, input-validated, and streaming. Built the way production AI features should be built.
        </motion.p>
      </div>
    </section>
  )
}

