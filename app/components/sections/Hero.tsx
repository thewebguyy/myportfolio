'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const TICKER_ITEMS = [
  { label: 'YRS EXP', value: '5+' },
  { label: 'PEAK RPS', value: '350' },
  { label: 'LATEST SHIP', value: '2am' },
  { label: 'DOUBLE BOOKINGS', value: '0' },
]

export function Hero() {
  const RESUME_URL = process.env.NEXT_PUBLIC_RESUME_URL?.trim() || ''
  const hasResumeUrl = RESUME_URL.length > 0
  const IS_AVAILABLE = process.env.NEXT_PUBLIC_AVAILABLE_FOR_HIRE === 'true'

  const [tick, setTick] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setTick(n => (n + 1) % TICKER_ITEMS.length), 3000)
    return () => clearInterval(t)
  }, [])

  return (
    <section
      className="relative min-h-screen flex items-center px-6 lg:px-8"
      style={{ background: 'var(--paper)', borderBottom: '1px solid var(--wire)' }}
    >
      <div className="w-full max-w-[1440px] mx-auto h-screen flex flex-col justify-center px-4 md:px-12 lg:px-16" style={{ borderLeft: '1px solid var(--wire)', borderRight: '1px solid var(--wire)' }}>

        {/* Top meta strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex flex-wrap items-center gap-x-6 gap-y-1 mb-12"
          style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-3)' }}
        >
          <span>OLABODE OLUSEGUN</span>
          <span style={{ color: 'var(--wire)' }}>·</span>
          <span>LAGOS, NG</span>
          <span style={{ color: 'var(--wire)' }}>·</span>
          {/* Coordinate block */}
          <span style={{ fontVariantNumeric: 'tabular-nums' }}>6.5244° N, 3.3792° E</span>
          <span style={{ color: 'var(--wire)' }}>·</span>
          <span>FINTECH · MARKETPLACE · AI SYSTEMS</span>
          {IS_AVAILABLE && (
            <>
              <span style={{ color: 'var(--wire)' }}>·</span>
              <span className="flex items-center gap-1.5" style={{ color: 'var(--signal)' }}>
                <span
                  className="inline-block w-[6px] h-[6px] rounded-full animate-pulse"
                  style={{ background: 'var(--signal)' }}
                />
                OPEN TO WORK
              </span>
            </>
          )}
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-[900px] mb-10"
          style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: 700,
            fontSize: 'clamp(42px, 6.5vw, 88px)',
            lineHeight: 1.0,
            letterSpacing: '-0.03em',
            color: 'var(--ink)',
          }}
        >
          I ship production systems from{' '}
          <span style={{ color: 'var(--signal)', fontStyle: 'italic' }}>real</span>{' '}
          constraints.{' '}
          <span style={{ color: 'var(--ink-3)', fontWeight: 400, fontSize: '0.7em' }}>{`// not sandbox pressure.`}</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.18 }}
          className="mb-12 max-w-[560px]"
          style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', lineHeight: 1.75, color: 'var(--ink-2)' }}
        >
          Transactional consistency, API security, and predictable error boundaries — designed to survive flaky mobile connections, payment provider inconsistencies, and intermittent network latency across West Africa.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.24 }}
          className="flex flex-col sm:flex-row items-start gap-4 mb-16"
        >
          <Link
            href="/#contact"
            className="btn-primary"
          >
            Get in touch
          </Link>
          <Link
            href="/#work"
            className="btn-secondary"
          >
            See the work
          </Link>
          {hasResumeUrl && (
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              Download CV
            </a>
          )}
        </motion.div>

        {/* Ticker strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.32 }}
          className="flex items-center gap-8 pt-8"
          style={{ borderTop: '1px solid var(--wire)' }}
        >
          {TICKER_ITEMS.map((item, i) => (
            <div
              key={item.label}
              className="flex flex-col gap-1 transition-opacity duration-500"
              style={{ opacity: tick === i ? 1 : 0.35 }}
            >
              <span
                style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-3)' }}
              >
                {item.label}
              </span>
              <span
                style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '20px', color: tick === i ? 'var(--signal)' : 'var(--ink)', transition: 'color 0.3s' }}
              >
                {item.value}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
