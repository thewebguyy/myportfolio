'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CandidateScreener } from '../ai/CandidateScreener'
import { OpportunityMatcher } from '../ai/OpportunityMatcher'
import { TechnicalAudit } from '../ai/TechnicalAudit'
import { ArtifactFrame } from '../ui/ArtifactFrame'

const AI_TOOLS = [
  {
    id: 'screener',
    title: "Resume Analyzer",
    description: "Multi-step semantic extraction over resume text. Demonstrates JSON schema enforcement, streaming output, and structured confidence scoring.",
    tech: "JSON Schema · OpenAI GPT-4 · Streaming",
    component: CandidateScreener
  },
  {
    id: 'matcher',
    title: "Project Recommender",
    description: "Maps a technical domain to a concrete project recommendation. Rate-limited at 10 req/hour, validated with Zod.",
    tech: "Semantic Search · Zod · Rate Limiting",
    component: OpportunityMatcher
  },
  {
    id: 'audit',
    title: "Technical Audit Tool",
    description: "Multi-step prompt orchestration for system diagnostics. Takes stack and bottleneck as input; returns structured recommendations with priority scoring.",
    tech: "Prompt Engineering · Edge Functions",
    component: TechnicalAudit
  }
]

export function AIShowcase() {
  const [activeDemo, setActiveDemo] = useState<string | null>(null)

  const ActiveComponent = AI_TOOLS.find(t => t.id === activeDemo)?.component

  return (
    <section id="ai" className="border-b-[0.5px] border-border-wire bg-background">
      <div className="max-w-[1440px] mx-auto border-x-[0.5px] border-border-wire">
        {/* Intelligence Suite Header */}
        <div className="border-b-[0.5px] border-border-wire px-8 lg:px-16 py-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-mono text-[11px] text-text-accent uppercase tracking-widest mb-6"
          >
            Demos
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[40px] md:text-[56px] text-text-primary font-serif tracking-tight"
          >
            AI Engineering.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-mono text-[14px] text-text-primary/70 max-w-[600px] mt-6 leading-[1.8]"
          >
            Live demos built on streaming responses, Zod validation, rate limiting, and prompt injection defence. Each tool is a real endpoint — try it.
          </motion.p>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-b-[0.5px] border-border-wire">
          {AI_TOOLS.map((tool) => (
            <div
              key={tool.title}
              className={`border-b-[0.5px] md:border-b-0 md:border-r-[0.5px] last:border-r-0 border-border-wire p-8 flex flex-col transition-colors duration-300 ${activeDemo === tool.id ? 'bg-surface' : 'bg-background hover:bg-surface/50'}`}
            >

              
              <h3 className="font-serif text-[24px] text-text-primary mb-4">
                {tool.title}
              </h3>
              
              <p className="font-mono text-[13px] text-text-primary/70 leading-[1.6] mb-8 flex-grow">
                {tool.description}
              </p>
              
              <div className="font-mono text-[11px] text-text-accent/60 mb-8 uppercase">
                {tool.tech}
              </div>
              
              <button 
                onClick={() => setActiveDemo(activeDemo === tool.id ? null : tool.id)} 
                className={`w-full py-3 font-mono text-[13px] tracking-wider uppercase transition-colors duration-300 border-[0.5px] border-border-wire ${activeDemo === tool.id ? 'bg-text-primary text-background' : 'bg-surface text-text-primary hover:bg-text-primary hover:text-background'}`}
              >
                {activeDemo === tool.id ? 'Close' : 'Try it'}
              </button>
            </div>
          ))}
        </div>

        {/* Active Demo Area */}
        <AnimatePresence mode="wait">
          {activeDemo && ActiveComponent && (
            <motion.div
              key={activeDemo}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden bg-background"
            >
              <div className="p-8 lg:p-16">
                <ArtifactFrame id={activeDemo.toUpperCase()} title="LIVE ORCHESTRATION">
                  <div className="p-8 bg-[#020816] font-mono border-t-[0.5px] border-border-wire min-h-[400px]">
                    <div className="text-text-accent mb-8 text-[12px] opacity-80 uppercase tracking-widest">
                      &gt; SYSTEM READY. AWAITING INPUT...
                    </div>
                    <ActiveComponent />
                  </div>
                </ArtifactFrame>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  )
}
