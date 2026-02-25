'use client'

import React, { useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ExclamationTriangleIcon, ArrowPathIcon } from '@heroicons/react/24/outline'

/**
 * Global Error Boundary
 * Catches unhandled errors in the application
 * Provides user-friendly error UI with recovery options
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log error to monitoring service
    console.error('Application error:', error);
  }, [error]);

  return <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl w-full text-center"
    >
      {/* Error Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring' }}
        className="inline-flex items-center justify-center w-24 h-24 mb-8 bg-red-500/10 rounded-full border-4 border-red-500/20"
      >
        <ExclamationTriangleIcon className="w-12 h-12 text-red-500" />
      </motion.div>

      {/* Error Message */}
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        Oops! Something went wrong
      </h1>
      <p className="text-xl text-gray-400 mb-8 leading-relaxed">
        Don&apos;t worry, this happens to the best of us. The error has been logged and I&apos;ll look into it.
      </p>

      {/* Error Details (Development Only) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mb-8 p-6 bg-gray-900 rounded-xl text-left border border-red-500/30">
          <p className="text-sm font-mono text-red-400 mb-2">Development Mode - Error Details:</p>
          <p className="text-sm font-mono text-gray-300 break-words">
            {error.message}
          </p>
          {error.digest && (
            <p className="text-xs font-mono text-gray-500 mt-2">
              Error ID: {error.digest}
            </p>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <motion.button
          onClick={() => reset()}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn btn-primary inline-flex items-center gap-2"
        >
          <ArrowPathIcon className="w-5 h-5" />
          Try Again
        </motion.button>

        <Link href="/" className="btn btn-secondary">
          Go to Homepage
        </Link>

        <a
          href="mailto:olabodewebdesigns02@gmail.com?subject=Portfolio Error Report"
          className="btn btn-secondary"
        >
          Report Issue
        </a>
      </div>

      {/* Helpful Links */}
      <div className="mt-12 pt-8 border-t border-gray-800">
        <p className="text-sm text-gray-500 mb-4">Meanwhile, you can explore:</p>
        <div className="flex flex-wrap gap-4 justify-center text-sm">
          <Link href="/case-studies" className="text-primary hover:underline">
            Case Studies
          </Link>
          <Link href="/blog" className="text-primary hover:underline">
            Blog
          </Link>
          <Link href="/#contact" className="text-primary hover:underline">
            Contact
          </Link>
        </div>
      </div>
    </motion.div>
  </div>
}