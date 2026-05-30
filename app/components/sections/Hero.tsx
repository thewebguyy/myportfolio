'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Magnet } from '../ui/Magnet'

const RESUME_URL = process.env.NEXT_PUBLIC_RESUME_URL?.trim() || ''
const hasResumeUrl = RESUME_URL.length > 0 && !RESUME_URL.includes('drive.google.com/file/d/1wr0ECLDq7hQFMAOQYRwXix9')
const IS_AVAILABLE = process.env.NEXT_PUBLIC_AVAILABLE_FOR_HIRE === 'true'

export function Hero() {
  const [headshotFailed, setHeadshotFailed] = useState(false)
  return (
    <section className="relative min-h-screen flex items-center bg-background px-6 lg:px-8 border-b-[0.5px] border-border-wire">
      <div className="w-full max-w-[1440px] mx-auto border-x-[0.5px] border-border-wire h-screen flex flex-col justify-center px-8 lg:px-16">
        <div className="max-w-[1000px]">
          {/* Label / Status */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="font-mono text-[11px] text-text-accent uppercase tracking-widest mb-8 flex flex-wrap items-center gap-3"
          >
            <span>OLABODE OLUSEGUN · LAGOS, NG</span>
            {IS_AVAILABLE && (
              <span className="flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[9px] tracking-normal font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                AVAILABLE FOR HIRE
              </span>
            )}
          </motion.div>

          {/* Name / Monolith Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="hero-heading text-[48px] md:text-[64px] lg:text-[80px] leading-[1.05] text-text-primary mb-12 tracking-tight"
          >
            Full-stack engineer building production systems for African fintech and marketplace platforms.
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-mono text-[14px] text-text-primary/80 leading-[1.8] max-w-[640px] mb-16"
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
            
            <div className="flex items-center gap-4 sm:ml-auto">
              {IS_AVAILABLE && (
                <div className="flex items-center gap-3">
                  <span className="text-text-secondary text-[10px]">●</span>
                  <span className="font-mono text-[11px] text-text-primary/70 uppercase tracking-widest">Open to senior engineering roles</span>
                </div>
              )}
              <Magnet padding={150} strength={3}>
                <div className="w-12 h-12 border-[0.5px] border-border-wire overflow-hidden grayscale hover:grayscale-0 transition-all duration-500 rounded-full bg-surface relative flex items-center justify-center">
                  {headshotFailed ? (
                    <span className="font-mono text-[10px] text-text-accent">OO</span>
                  ) : (
                    <Image
                      src="/headshot.jpg"
                      alt="Olabode Olusegun"
                      fill
                      className="object-cover"
                      onError={() => setHeadshotFailed(true)}
                    />
                  )}
                </div>
              </Magnet>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
