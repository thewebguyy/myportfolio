'use client'

import { motion } from 'framer-motion'

export function TrustBar() {
  const items = [
    { value: '5+ Years', label: 'Experience' },
    { value: 'Fintech + AI', label: 'Systems Built' },
    { value: 'Lagos / Remote', label: 'Global Delivery' },
  ]

  return (
    <section id="trust-bar" className="bg-background border-b-[0.5px] border-border-wire">
      <div className="max-w-[1440px] mx-auto border-x-[0.5px] border-border-wire grid grid-cols-1 md:grid-cols-3">
        {items.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 5 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
            className={`px-8 py-6 flex flex-col justify-center font-mono border-border-wire
              ${idx < items.length - 1 ? 'md:border-r-[0.5px]' : ''}
              ${idx < items.length - 1 ? 'border-b-[0.5px] md:border-b-0' : ''}
            `}
          >
            <span className="text-[14px] font-semibold text-text-accent uppercase tracking-wider mb-1">
              {item.value}
            </span>
            <span className="text-[11px] text-text-secondary uppercase tracking-widest">
              {item.label}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
