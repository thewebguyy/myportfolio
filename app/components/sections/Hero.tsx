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
export function Hero() {
  const roles = [
    'High-Scale Distributed Systems',
    'AI-Powered Web Applications',
    'Sub-Second Performance Optimization',
  ]
  
  const [currentRole, setCurrentRole] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

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
  }, [displayText, isDeleting, currentRole, roles])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(234,179,124,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(35,150,127,0.1),transparent_50%)]" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [null, Math.random() * window.innerHeight],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
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
            Hello World 👋
          </motion.p>

          {/* Main heading with gradient */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="text-white">I am </span>
            <span className="gradient-text">Olabode Olusegun</span>
          </h1>

          {/* Typewriter subtitle */}
          <div className="h-24 sm:h-20 md:h-16 mb-8">
            <p className="text-2xl sm:text-3xl md:text-4xl text-gray-300 font-serif">
              Full-Stack Engineer Specializing in
              <br />
              <span className="text-primary font-semibold">
                {displayText}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="inline-block w-1 h-8 bg-primary ml-1"
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
            I architect scalable web systems that handle{' '}
            <strong className="text-white">10,000+ concurrent users</strong>, integrate{' '}
            <strong className="text-white">AI/ML pipelines</strong> for intelligent UX, and obsess over{' '}
            <strong className="text-white">sub-1s load times</strong>. Currently exploring edge computing 
            and AI agents for 2026.
          </motion.p>

          {/* Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap gap-8 mb-12 justify-center lg:justify-start"
          >
            <Metric value="5+" label="Years Experience" />
            <Metric value="99.9%" label="Uptime Maintained" />
            <Metric value="40%" label="Avg Performance Gain" />
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            
              href="#case-studies"
              className="btn btn-primary text-center group"
            >
              View Case Studies
              <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">
                →
              </span>
            </a>
            
              href="#contact"
              className="btn btn-secondary text-center group"
            >
              Let's Connect
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