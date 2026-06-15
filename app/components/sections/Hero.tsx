'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

const RESUME_URL = process.env.NEXT_PUBLIC_RESUME_URL?.trim() || ''
const hasResumeUrl = RESUME_URL.length > 0
const IS_AVAILABLE = process.env.NEXT_PUBLIC_AVAILABLE_FOR_HIRE === 'true'

export function Hero() {
  const [headshotFailed, setHeadshotFailed] = useState(false)
  return (
    <section className="relative min-h-screen flex items-center bg-background px-6 lg:px-8 border-b-[0.5px] border-border-wire">
      <div className="w-full max-w-[1440px] mx-auto border-x-[0.5px] border-border-wire h-screen flex flex-col justify-center px-8 lg:px-16">
        <div className="max-w-[1000px]">
          {/* Mobile Profile Block: Inline portrait + Name */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden flex items-center gap-4 mb-8 font-mono text-[11px] uppercase tracking-widest text-text-accent"
          >
            <div className="w-10 h-10 border-[0.5px] border-border-wire bg-surface relative overflow-hidden flex-shrink-0">
              <div className="absolute inset-0 bg-[#080D1A]/25 mix-blend-color z-10 pointer-events-none" />
              {headshotFailed ? (
                <span className="font-mono text-[10px] text-text-accent flex items-center justify-center h-full">OO</span>
              ) : (
                <Image
                  src="/headshot.jpg"
                  alt="Olabode Olusegun"
                  fill
                  className="object-cover object-top"
                  onError={() => setHeadshotFailed(true)}
                />
              )}
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-semibold text-text-primary">OLABODE OLUSEGUN</span>
                {IS_AVAILABLE && (
                  <span className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[8px] tracking-normal font-semibold">
                    <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                    ACTIVE
                  </span>
                )}
              </div>
              <span className="text-text-secondary text-[9px] lowercase">lagos, ng · 5 yrs · fintech & ai</span>
            </div>
          </motion.div>

          {/* Desktop Label / Status / Seniority Strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="hidden md:flex flex-wrap items-center gap-3 mb-8 font-mono text-[11px] uppercase tracking-widest"
          >
            <span className="text-text-accent font-semibold">OLABODE OLUSEGUN</span>
            <span className="text-text-primary/30">·</span>
            <span className="text-text-secondary">LAGOS, NG</span>
            <span className="text-text-primary/30">·</span>
            <span className="text-text-secondary font-medium">5 YRS · FINTECH · MARKETPLACE · AI SYSTEMS</span>
            {IS_AVAILABLE && (
              <>
                <span className="text-text-primary/30">·</span>
                <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[9px] tracking-normal font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  AVAILABLE FOR HIRE
                </span>
              </>
            )}
          </motion.div>

          {/* Headline and Desktop Portrait Inline Row */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-12">
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="hero-heading text-[44px] md:text-[64px] lg:text-[76px] leading-[1.05] text-text-primary tracking-tight max-w-[820px]"
            >
              Building production systems for fintech, AI, and marketplace platforms.
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="hidden md:block flex-shrink-0"
            >
              <div className="w-14 h-14 border-[0.5px] border-border-wire bg-surface relative overflow-hidden">
                <div className="absolute inset-0 bg-[#080D1A]/25 mix-blend-color z-10 pointer-events-none" />
                {headshotFailed ? (
                  <span className="font-mono text-[10px] text-text-accent flex items-center justify-center h-full">OO</span>
                ) : (
                  <Image
                    src="/headshot.jpg"
                    alt="Olabode Olusegun"
                    fill
                    className="object-cover object-top"
                    onError={() => setHeadshotFailed(true)}
                  />
                )}
              </div>
            </motion.div>
          </div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-mono text-[14px] text-text-primary/80 leading-[1.8] max-w-[640px] mb-12"
          >
            I focus on implementing transactional consistency, API security, and predictable error boundaries. I design systems to survive the real-world constraints of the West African web—flaky mobile connections, payment provider inconsistencies, and intermittent network latency.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-8"
          >
            <div className="flex items-center gap-6">
              <a href="#contact" className="font-mono text-[13px] text-text-accent uppercase tracking-widest hover:text-text-primary transition-colors duration-300 flex items-center gap-3">
                <span className="w-2 h-2 bg-text-accent inline-block"></span>
                Get in touch
              </a>
              {hasResumeUrl && (
                <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" className="font-mono text-[13px] text-text-primary/70 uppercase tracking-widest hover:text-text-primary transition-colors duration-300 flex items-center gap-3">
                  Download CV
                </a>
              )}
            </div>
          </motion.div>

          {/* Minimal Tech strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-16 pt-8 border-t-[0.5px] border-border-wire font-mono text-[11px] text-text-muted uppercase tracking-widest flex flex-wrap gap-x-8 gap-y-2"
          >
            <span>TypeScript</span>
            <span>Node.js</span>
            <span>PostgreSQL</span>
            <span>Redis</span>
            <span>AWS</span>
            <span>Docker</span>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
