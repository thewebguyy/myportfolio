'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function NotFound() {
  const [path, setPath] = useState('')
  const [timestamp, setTimestamp] = useState('')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setPath(window.location.pathname)
      setTimestamp(new Date().toISOString())
    }
  }, [])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 border-b-[0.5px] border-border-wire">
      <div className="w-full max-w-[1440px] mx-auto border-x-[0.5px] border-border-wire min-h-[70vh] flex items-center justify-center">
        <div className="max-w-xl w-full border-[0.5px] border-border-wire bg-surface/30 p-8 md:p-12 font-mono text-left">
          
          {/* Header */}
          <div className="font-display font-bold text-[48px] text-text-accent leading-none mb-8">
            404
          </div>

          {/* Dry Systems Log */}
          <div className="border-[0.5px] border-border-wire bg-background/50 p-6 space-y-3 mb-8 text-[12px] text-text-secondary">
            <div><span className="text-text-accent font-semibold">STATUS:</span> RESOURCE_NOT_FOUND</div>
            <div><span className="text-text-accent font-semibold">PATH:</span> {path || 'unknown'}</div>
            <div><span className="text-text-accent font-semibold">TIMESTAMP:</span> {timestamp || 'unknown'}</div>
            <div className="pt-2 border-t-[0.5px] border-border-wire text-text-muted">
              The requested route does not resolve to an active system path. Verify target address or return to index.
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col sm:flex-row gap-6">
            <Link 
              href="/"
              className="text-[11px] uppercase tracking-widest text-text-primary hover:text-text-accent transition-colors flex items-center gap-2"
            >
              [← Return to Index]
            </Link>
            <Link 
              href="/#work"
              className="text-[11px] uppercase tracking-widest text-text-primary hover:text-text-accent transition-colors"
            >
              [Browse Ledger]
            </Link>
          </div>

        </div>
      </div>
    </div>
  )
}