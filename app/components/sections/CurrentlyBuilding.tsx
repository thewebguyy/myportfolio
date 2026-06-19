'use client'

import { motion } from 'framer-motion'

export function CurrentlyBuilding() {
  const items = [
    { title: 'AI-assisted recruitment systems', desc: 'Semantic profile analysis and LLM-driven candidate evaluation pipelines.' },
    { title: 'Revenue-driven SaaS products', desc: 'Self-serve billing integrations, seat management, and multi-tenant isolation.' },
    { title: 'Production AI workflows', desc: 'Idempotency-keyed agent execution, vector embeddings search, and fallback paths.' },
    { title: 'Fintech infrastructure tooling', desc: 'Transaction isolation helpers, signature validation middleware, and webhook handlers.' },
  ]

  return (
    <section id="currently-building" className="border-b-[0.5px] border-border-wire bg-background">
      <div className="max-w-[1440px] mx-auto border-x-[0.5px] border-border-wire px-8 lg:px-16 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-mono text-[11px] text-text-accent uppercase tracking-widest mb-6"
            >
              Focus
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[40px] md:text-[56px] text-text-primary font-display font-semibold tracking-tight leading-[1.1]"
            >
              Currently<br />Building
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-mono text-[13px] text-text-secondary leading-relaxed mt-6 max-w-sm"
            >
              Active research and production shipments in systems infrastructure and artificial intelligence.
            </motion.p>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-7 space-y-6 mt-2 lg:mt-0">
            {items.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-6 border-[0.5px] border-border-wire bg-surface/30 flex items-start gap-4"
              >
                <span className="text-text-accent font-mono text-[14px] leading-none mt-1">●</span>
                <div className="space-y-1">
                  <h3 className="font-mono text-[14px] font-semibold text-text-primary uppercase tracking-wide">
                    {item.title}
                  </h3>
                  <p className="font-mono text-[12px] text-text-secondary leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
