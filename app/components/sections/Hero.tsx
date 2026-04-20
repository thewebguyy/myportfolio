'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

const PHRASES = [
  "I build products that handle real money.",
  "I engineer systems that serve real users.",
  "I write code that ships to production.",
]

export function Hero() {
  const [index, setIndex] = useState(0)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % PHRASES.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center bg-hero-gradient px-6 lg:px-0">
      <div className="max-w-[1280px] mx-auto w-full">
        <div className="max-w-[800px]">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 600, ease: [0.16, 1, 0.3, 1] }}
            className="label mb-6"
          >
            Full-Stack Engineer — Lagos, Nigeria
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 800, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="display text-white mb-4"
          >
            Olabode Olusegun
          </motion.h1>

          {/* Sliding Subtitle */}
          <div className="h-[40px] md:h-[48px] overflow-hidden mb-8">
            <AnimatePresence mode="wait">
              <motion.p
                key={PHRASES[index]}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="font-serif italic text-[24px] md:text-[32px] text-text-secondary leading-tight"
              >
                {PHRASES[index]}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 600, delay: 0.4 }}
            className="text-[18px] text-text-secondary leading-[1.7] max-w-[520px] mb-10"
          >
            Five years building full-stack web products — from real-time marketplaces and payment infrastructure to AI-powered applications. Based in Lagos. Available globally.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 600, delay: 0.5 }}
            className="flex items-center gap-3 mb-16"
          >
            <a href="#work" className="btn-primary">
              See my work
            </a>
            <a href="#contact" className="btn-secondary">
              Get in touch
            </a>
          </motion.div>

          {/* Metrics */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 600, delay: 0.7 }}
            className="flex items-center gap-12"
          >
            <Metric value="5+" label="years experience" />
            <div className="w-[1px] h-10 bg-surface-2" />
            <Metric value="10k+" label="peak concurrent users" />
            <div className="w-[1px] h-10 bg-surface-2" />
            <Metric value="3" label="production AI integrations" />
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <AnimatePresence>
        {!scrolled && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-4 h-4 flex items-center justify-center"
            >
              <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L6 6L11 1" stroke="#505050" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

function Metric({ value, label }: { value: string; label: string }) {
  const [displayValue, setDisplayValue] = useState("0")

  useEffect(() => {
    let start = 0
    const end = parseInt(value.replace(/\D/g, ''))
    const suffix = value.replace(/[0-9]/g, '')
    const duration = 1200
    const increment = end / (duration / 16)
    
    const timer = setInterval(() => {
      start += increment
      if (start >= end) {
        setDisplayValue(value)
        clearInterval(timer)
      } else {
        setDisplayValue(Math.floor(start) + suffix)
      }
    }, 16)
    
    return () => clearInterval(timer)
  }, [value])

  return (
    <div className="flex flex-col gap-2">
      <span className="text-[28px] font-semibold text-white leading-none">{displayValue}</span>
      <span className="font-mono text-[10px] uppercase text-text-muted tracking-wider">{label}</span>
    </div>
  )
}