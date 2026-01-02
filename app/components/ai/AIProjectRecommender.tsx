'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SparklesIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import { cn } from '@/lib/utils'
import type { Project } from '@/lib/projects'

/**
 * AI Project Recommender Component
 * Uses GPT-4 to semantically match user interests with portfolio projects
 * Demonstrates AI integration and prompt engineering skills
 */
export function AIProjectRecommender() {
  const [userInterest, setUserInterest] = useState('')
  const [recommendation, setRecommendation] = useState<RecommendationResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Predefined suggestion chips
  const suggestions = [
    'real-time systems',
    'payment integration',
    'AI chatbots',
    'e-commerce platforms',
    'distributed systems',
  ]

  async function getRecommendation() {
    if (!userInterest.trim()) return

    setLoading(true)
    setError(null)
    setRecommendation(null)

    try {
      const response = await fetch('/api/recommend-project', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ interest: userInterest }),
      })

      if (!response.ok) {
        throw new Error('Failed to get recommendation')
      }

      const data = await response.json()
      setRecommendation(data.recommendation)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !loading) {
      getRecommendation()
    }
  }

  return (
    <section className="section bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-8 lg:p-12 border-primary/20"
        >
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            >
              <SparklesIcon className="w-8 h-8 text-primary" />
            </motion.div>
            <div>
              <h3 className="text-2xl lg:text-3xl font-bold text-white">
                AI Project Recommender
              </h3>
              <p className="text-sm text-gray-400 mt-1">
                Powered by GPT-4 Semantic Analysis
              </p>
            </div>
          </div>

          <p className="text-gray-300 mb-6 leading-relaxed">
            Tell me what interests you (e.g., "real-time systems", "AI chatbots", "payment processing"),
            and I'll use GPT-4 to recommend the most relevant project from my portfolio based on
            semantic similarity and technical stack overlap.
          </p>

          {/* Suggestion Chips */}
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="text-sm text-gray-400">Try:</span>
            {suggestions.map((suggestion) => (
              <motion.button
                key={suggestion}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setUserInterest(suggestion)}
                className="px-3 py-1 bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm 
                         rounded-full transition-colors border border-gray-700 hover:border-primary/50"
              >
                {suggestion}
              </motion.button>
            ))}
          </div>

          {/* Input Section */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <input
              type="text"
              value={userInterest}
              onChange={(e) => setUserInterest(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="e.g., distributed systems, payment integration..."
              className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 
                       text-white placeholder-gray-500 focus:border-primary focus:outline-none 
                       focus:ring-4 focus:ring-primary/20 transition-all"
              disabled={loading}
            />
            <motion.button
              onClick={getRecommendation}
              disabled={loading || !userInterest.trim()}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              className={cn(
                'px-6 py-3 rounded-lg font-semibold transition-all whitespace-nowrap',
                'focus:outline-none focus:ring-4 focus:ring-primary/50',
                loading || !userInterest.trim()
                  ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  : 'bg-primary hover:bg-primary-dark text-black'
              )}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <LoadingSpinner />
                  Analyzing...
                </span>
              ) : (
                'Recommend'
              )}
            </motion.button>
          </div>

          {/* Error State */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg"
              >
                <p className="text-red-400 text-sm">⚠️ {error}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Recommendation Result */}
          <AnimatePresence mode="wait">
            {recommendation && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-gray-800/50 rounded-xl p-6 border border-primary/30"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="inline-block px-3 py-1 bg-primary/20 text-primary text-xs 
                                   font-semibold rounded-full mb-3">
                      BEST MATCH
                    </span>
                    <h4 className="text-2xl font-bold text-white">{recommendation.title}</h4>
                    <p className="text-sm text-gray-400 mt-1">{recommendation.category}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-primary">
                      {recommendation.matchScore}%
                    </div>
                    <div className="text-xs text-gray-500">Match Score</div>
                  </div>
                </div>

                <p className="text-gray-300 mb-4 leading-relaxed">
                  {recommendation.reasoning}
                </p>

                {/* Tech Stack Overlap */}
                {recommendation.techOverlap && recommendation.techOverlap.length > 0 && (
                  <div className="mb-4">
                    <p className="text-sm text-gray-400 mb-2">Tech Stack Overlap:</p>
                    <div className="flex flex-wrap gap-2">
                      {recommendation.techOverlap.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-primary/20 text-primary text-xs rounded border border-primary/30"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 mt-6">
                  
                    href={`/case-studies/${recommendation.projectId}`}
                    className="btn btn-primary text-sm text-center group"
                  >
                    View Full Case Study
                    <ArrowRightIcon className="w-4 h-4 ml-2 inline-block group-hover:translate-x-1 transition-transform" />
                  </a>
                  {recommendation.liveUrl && (
                    
                      href={recommendation.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-secondary text-sm text-center"
                    >
                      Live Demo
                    </a>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* AI Transparency Footer */}
          <div className="mt-8 pt-6 border-t border-gray-800">
            <div className="flex items-start gap-3 text-sm text-gray-400">
              <SparklesIcon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-300 mb-1">How This Works</p>
                <p className="leading-relaxed">
                  This feature uses <strong className="text-primary">GPT-4 Turbo</strong> with custom
                  prompt engineering to analyze semantic similarity between your interest and my projects.
                  It considers technical stack, problem domain, and implementation complexity to find the
                  best match. Response time: ~2-3 seconds.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/**
 * Loading Spinner Component
 */
function LoadingSpinner() {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      className="w-4 h-4 border-2 border-black border-t-transparent rounded-full"
    />
  )
}

/**
 * Type definitions
 */
interface RecommendationResult {
  projectId: string
  title: string
  category: string
  reasoning: string
  matchScore: number
  techOverlap?: string[]
  liveUrl?: string
}