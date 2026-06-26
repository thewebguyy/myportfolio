'use client'

import { motion } from 'framer-motion'
import { principles } from '@/lib/principles'

export function ChapterIndex() {
  return (
    <section
      id="index"
      aria-label="Table of contents"
      style={{ background: 'var(--paper)', borderBottom: '1px solid var(--wire)' }}
    >
      <div
        className="max-w-[1440px] mx-auto"
        style={{ borderLeft: '1px solid var(--wire)', borderRight: '1px solid var(--wire)' }}
      >
        {/* Header row */}
        <div
          className="px-[var(--page-gutter)] py-10"
          style={{ borderBottom: '1px solid var(--wire)' }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="type-label"
          >
            Table of Contents
          </motion.div>
        </div>

        {/* Chapter rows */}
        {principles.map((p, i) => (
          <motion.a
            key={p.id}
            href={`#${p.id}`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04 }}
            className="group block"
            aria-label={`Chapter ${p.index}: ${p.word} — ${p.thesis}`}
          >
            <div
              className="px-[var(--page-gutter)] py-6 grid grid-cols-12 items-baseline gap-4 transition-colors duration-150"
              style={{ borderBottom: '1px solid var(--wire)' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--paper-2)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              {/* Index number */}
              <div
                className="col-span-1 type-label"
                style={{ color: 'var(--ink-4)', fontVariantNumeric: 'tabular-nums' }}
              >
                {p.index}
              </div>

              {/* Chapter word */}
              <div className="col-span-3 md:col-span-2">
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 600,
                    fontSize: 'clamp(18px, 2vw, 26px)',
                    letterSpacing: '-0.02em',
                    color: 'var(--ink)',
                    transition: 'color 0.15s',
                  }}
                  className="group-hover:text-[var(--signal)]"
                >
                  {p.word}
                </span>
              </div>

              {/* Thesis */}
              <div className="col-span-8 md:col-span-7 hidden md:block">
                <span
                  style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--ink-3)', lineHeight: 1.5 }}
                >
                  {p.thesis}
                </span>
              </div>

              {/* Arrow */}
              <div
                className="col-span-2 flex justify-end"
                style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--ink-4)', transition: 'color 0.15s', opacity: 0 }}
                data-arrow
              >
                →
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  )
}
