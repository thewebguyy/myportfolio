'use client'

import { motion } from 'framer-motion'

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center bg-background px-6 lg:px-8 border-b-[0.5px] border-border-wire">
      <div className="w-full max-w-[1440px] mx-auto border-x-[0.5px] border-border-wire h-screen flex flex-col justify-center px-8 lg:px-16">
        <div className="max-w-[1000px]">
          {/* Label / Status */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="font-mono text-[11px] text-text-accent uppercase tracking-widest mb-8 flex flex-wrap gap-4"
          >
            <span>[SYS.INIT]</span>
            <span>OLABODE OLUSEGUN</span>
            <span>v2.0.4</span>
            <span className="opacity-60">LOC: LAGOS_NG</span>
          </motion.div>

          {/* Name / Monolith Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[56px] md:text-[80px] lg:text-[104px] leading-[0.95] text-text-primary mb-12 font-serif tracking-tight"
          >
            Sovereign Engineering <br />
            <span className="opacity-70">Environment.</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-mono text-[14px] text-text-primary/80 leading-[1.8] max-w-[640px] mb-16"
          >
            I architect high-concurrency systems, resilient interfaces, and proprietary technical 
            infrastructure. Every line of code serves the purpose of demonstrating engineering credibility 
            and absolute consistency. Built for zero latency.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-6"
          >
            <a href="#contact" className="font-mono text-[13px] text-text-accent uppercase tracking-widest hover:text-text-primary transition-colors duration-300 flex items-center gap-3">
              <span className="w-2 h-2 bg-text-accent inline-block"></span>
              [Connection Initialization]
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
