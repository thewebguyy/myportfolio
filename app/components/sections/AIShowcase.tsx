'use client'

import { motion } from 'framer-motion'
import { CandidateScreener } from '../ai/CandidateScreener'
import { ArtifactFrame } from '../ui/ArtifactFrame'

export function AIShowcase() {
  return (
    <section id="ai" className="border-b-[0.5px] border-border-wire bg-background">
      <div className="max-w-[1440px] mx-auto border-x-[0.5px] border-border-wire">
        {/* Header */}
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
            className="hero-heading text-[40px] md:text-[56px] text-text-primary tracking-tight"
          >
            Resume Analyzer
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-mono text-[14px] text-text-primary/70 max-w-[600px] mt-6 leading-[1.8]"
          >
            Multi-step semantic extraction over resume text — JSON schema enforcement, streaming output, and structured confidence scoring. Live endpoint, real results.
          </motion.p>
        </div>

        {/* Technical Constraints */}
        <div className="border-b-[0.5px] border-border-wire px-8 lg:px-16 py-6 bg-surface/10">
          <div className="font-mono text-[10px] text-text-accent uppercase tracking-widest mb-3 font-semibold">
            System Limitations
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-[11px] text-text-primary/60">
            <div>• NO RAG: In-context prompting only</div>
            <div>• NO AUTONOMOUS AGENTS: Deterministic flows</div>
            <div>• NO FINE-TUNING: Base LLM endpoints</div>
            <div>• NO PERSISTENT STORAGE: Stateless turns</div>
          </div>
        </div>

        {/* Live Demo */}
        <div className="p-8 lg:p-16 bg-background">
          <ArtifactFrame id="RESUME-ANALYZER" title="Resume Analyzer" status="DEMO" location="API">
            <div className="p-8 bg-[#020816] font-mono border-t-[0.5px] border-border-wire min-h-[400px]">
              <CandidateScreener />
            </div>
          </ArtifactFrame>
        </div>

      </div>
    </section>
  )
}
