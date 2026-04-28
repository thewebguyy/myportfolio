'use client'

import { motion } from 'framer-motion'

export function Manifesto() {
  return (
    <section id="manifesto" className="border-b-[0.5px] border-border-wire bg-background">
      <div className="max-w-[1440px] mx-auto border-x-[0.5px] border-border-wire px-8 lg:px-16 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column / Header */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-mono text-[11px] text-text-accent uppercase tracking-widest mb-6"
            >
              [SYSTEM_LOG: PROFESSIONAL_MANIFESTO]
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[40px] md:text-[56px] text-text-primary font-serif tracking-tight leading-[1.1]"
            >
              Engineering is not a cost center.<br />
              <span className="opacity-70">It is a lever for market dominance.</span>
            </motion.h2>
          </div>

          {/* Right Column / Body */}
          <div className="lg:col-span-7 font-mono text-[14px] text-text-primary/80 leading-[1.8] space-y-8 mt-2 lg:mt-0">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              I architect systems that transform operational friction into compounding return on investment. 
              Code for the sake of code is technical debt; code deployed to capture market share, 
              streamline user acquisition, and fortify enterprise security is an asset.
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              I have spent the past five years engineering highly concurrent infrastructure, rigorous type-safe 
              platforms, and proprietary AI workflows for scaling businesses. My methodology strips away the superfluous 
              to deliver absolute reliability, unyielding performance, and measurable business outcomes.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="pt-8 mt-8 border-t-[0.5px] border-border-wire"
            >
              <div className="font-mono text-[11px] text-text-accent uppercase tracking-widest mb-4">
                [REQUIRE_ARCHITECTURAL_INSIGHT?]
              </div>
              <a href="#contact" className="inline-flex items-center gap-3 text-text-primary hover:text-text-accent transition-colors duration-300 uppercase tracking-widest text-[13px]">
                <span className="w-2 h-2 bg-text-accent inline-block"></span>
                [Connection Initialization for High-Stakes Projects]
              </a>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}
