'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const [timestamp, setTimestamp] = useState('')

  useEffect(() => {
    console.error('Captured portfolio error:', error)
    setTimestamp(new Date().toISOString())
  }, [error])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 border-b-[0.5px] border-border-wire">
      <div className="w-full max-w-[1440px] mx-auto border-x-[0.5px] border-border-wire min-h-[70vh] flex items-center justify-center">
        <div className="max-w-xl w-full border-[0.5px] border-border-wire bg-surface/30 p-8 md:p-12 font-mono text-left">
          
          {/* Header */}
          <div className="font-serif text-[48px] text-text-accent leading-none mb-8">
            Error
          </div>

          {/* Dry Systems Log */}
          <div className="border-[0.5px] border-border-wire bg-background/50 p-6 space-y-3 mb-8 text-[12px] text-text-secondary">
            <div><span className="text-text-accent font-semibold">STATUS:</span> EXECUTION_FAILURE</div>
            <div><span className="text-text-accent font-semibold">MESSAGE:</span> {error.message || 'An unexpected client-side error occurred.'}</div>
            {error.digest && (
              <div><span className="text-text-accent font-semibold">DIGEST:</span> {error.digest}</div>
            )}
            <div><span className="text-text-accent font-semibold">TIMESTAMP:</span> {timestamp || 'unknown'}</div>
            <div className="pt-2 border-t-[0.5px] border-border-wire text-text-muted">
              An unhandled exception occurred in the rendering pipeline. The event has been captured.
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6">
            <button
              onClick={() => reset()}
              className="text-[11px] uppercase tracking-widest text-text-accent hover:text-text-primary transition-colors text-left"
            >
              [Retry Operation]
            </button>
            <Link 
              href="/"
              className="text-[11px] uppercase tracking-widest text-text-primary hover:text-text-accent transition-colors"
            >
              [Return to Index]
            </Link>
            <a
              href="mailto:olabodewebdesigns02@gmail.com?subject=Portfolio%20Error%20Report"
              className="text-[11px] uppercase tracking-widest text-text-primary hover:text-text-accent transition-colors"
            >
              [Contact Engineering]
            </a>
          </div>

        </div>
      </div>
    </div>
  )
}