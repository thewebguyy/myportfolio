'use client'

import { motion } from 'framer-motion'
import { testimonials } from '@/lib/testimonials'

export function Testimonials() {
  return (
    <section id="testimonials" className="section-padding bg-background">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Header */}
        <div className="mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="label mb-4 block"
          >
            What clients say
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="h2 text-white mb-4"
          >
            From people I've worked with
          </motion.h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="bg-surface border border-surface-2 rounded-[12px] p-8"
            >
              {/* Rating: Five 4px circles */}
              <div className="flex gap-1.5 mb-6">
                {[...Array(5)].map((_, i) => (
                  <div 
                    key={i} 
                    className={`w-1 h-1 rounded-full ${i < testimonial.rating ? 'bg-primary' : 'bg-surface-2'}`} 
                  />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="font-serif italic text-[18px] text-text-secondary leading-[1.6] mb-8">
                "{testimonial.content}"
              </blockquote>

              {/* Author & Footer */}
              <div className="flex items-end justify-between">
                <div>
                  <div className="font-sans font-medium text-[14px] text-white mb-1">
                    {testimonial.name}
                  </div>
                  <div className="font-sans text-[13px] text-text-muted">
                    {testimonial.role} at {testimonial.company}
                  </div>
                </div>

                {testimonial.verified && (
                  <div className="flex items-center gap-2 font-mono text-[10px] text-secondary uppercase tracking-[0.1em]">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Verified
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

