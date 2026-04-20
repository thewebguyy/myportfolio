'use client'

import { motion } from 'framer-motion'
import { ArrowDownIcon } from '@heroicons/react/24/outline'
import { useState, useEffect } from 'react'

/**
 * Hero Section Component
 * Features:
 * - Animated typewriter effect for roles
 * - Key metrics display
 * - Dual CTAs (case studies + contact)
 * - Smooth scroll to next section
 */
const roles = [
  'Strategic Enterprise Audits',
  'Risk-Driven System Architecture',
  'Commercial Strategy & ROI',
]

/**
 * Hero Section Component
 * Features:
 * - Animated typewriter effect for roles
 * - Key metrics display
 * - Dual CTAs (case studies + contact)
 * - Smooth scroll to next section
 */
export function Hero() {
  const [currentRole, setCurrentRole] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [isClient, setIsClient] = useState(false)

  // Initialize client-side only state
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Typewriter effect
  useEffect(() => {
    const currentText = roles[currentRole]
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentText.length) {
          setDisplayText(currentText.slice(0, displayText.length + 1))
        } else {
          setTimeout(() => setIsDeleting(true), 2000)
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1))
        } else {
          setIsDeleting(false)
          setCurrentRole((prev) => (prev + 1) % roles.length)
        }
      }
    }, isDeleting ? 50 : 100)

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, currentRole])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-secondary">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(0,75,142,0.2),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(0,102,204,0.1),transparent_50%)]" />
      </div>

      {/* Floating particles - Only render on client to avoid window SSR errors */}
      {/* Floating particles - Always render container to avoid layout shift, but only show particles on client */}
      <div className={`absolute inset-0 overflow-hidden pointer-events-none transition-opacity duration-1000 ${isClient ? 'opacity-100' : 'opacity-0'}`}>
        {isClient && (
          <>
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-primary/30 rounded-full"
                initial={{
                  x: Math.random() * 100 + '%',
                  y: Math.random() * 100 + '%',
                }}
                animate={{
                  y: [null, Math.random() * 100 + '%'],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: Math.random() * 10 + 10,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
            ))}
          </>
        )}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center lg:text-left"
        >
          {/* Pretitle */}
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm md:text-base text-primary font-semibold tracking-wider uppercase mb-6"
          >
            Senior Strategy & Audit Specialist
          </motion.p>

          {/* Main heading with gradient */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="text-white">I am </span>
            <span className="gradient-text">Olabode Olusegun</span>
          </h1>

          {/* Typewriter subtitle */}
          <div className="h-24 sm:h-20 md:h-16 mb-8">
            <p className="text-2xl sm:text-3xl md:text-4xl text-gray-300 font-serif">
              Engineering Excellence in
              <br />
              <span
                className="text-primary font-semibold"
                aria-live="polite"
                aria-atomic="true"
              >
                {displayText}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="inline-block w-1 h-8 bg-primary ml-1"
                  aria-hidden="true"
                />
              </span>
            </p>
          </div>

          {/* Value proposition */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-lg md:text-xl text-gray-400 max-w-3xl mb-12 leading-relaxed"
          >
            I architect strategic audit interfaces that drive ROI, mitigate operational risk, 
            and provide <strong className="text-white">Big 4-level analytical depth</strong> for 
            global enterprises. Specializing in <strong className="text-white">AI-driven decision systems</strong> 
            and <strong className="text-white">commercial risk architecture</strong>.
          </motion.p>

          {/* Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap gap-8 mb-12 justify-center lg:justify-start"
          >
            <Metric value="5+" label="Years Experience" />
            <Metric value="99.9%" label="Uptime Targets" />
            <Metric value="40%" label="Avg Perf. Increase" />
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <a
              href="#case-studies"
              className="btn btn-primary text-center group"
            >
              View Case Studies
              <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">
                →
              </span>
            </a>
            <a
              href="#contact"
              className="btn btn-secondary text-center group"
            >
              Let&apos;s Connect
              <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">
                →
              </span>
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.a
          href="#bento"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 no-print"
          aria-label="Scroll to next section"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-gray-500 hover:text-primary transition-colors"
          >
            <span className="text-sm">Scroll</span>
            <ArrowDownIcon className="w-6 h-6" />
          </motion.div>
        </motion.a>
      </div>
    </section>
  )
}

/**
 * Metric Component
 * Displays a single metric with value and label
 */
function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center lg:text-left">
      <div className="text-3xl md:text-4xl font-bold text-primary mb-1">
        {value}
      </div>
      <div className="text-sm text-gray-500 uppercase tracking-wider">
        {label}
      </div>
    </div>
  )
}