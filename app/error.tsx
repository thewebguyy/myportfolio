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
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{ background: 'var(--paper)' }}
    >
      <div
        className="max-w-[480px] w-full p-8"
        style={{ border: '1px solid var(--wire)', background: 'var(--paper-2)' }}
      >
        <div
          style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: 700,
            fontSize: '48px',
            letterSpacing: '-0.04em',
            lineHeight: 1,
            color: 'var(--signal)',
            marginBottom: '32px',
          }}
        >
          Error
        </div>

        <div
          className="space-y-3 mb-8 p-5"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            lineHeight: 1.7,
            color: 'var(--ink-3)',
            border: '1px solid var(--wire)',
            background: 'var(--paper)',
          }}
        >
          <div><span style={{ color: 'var(--signal)' }}>STATUS:</span> {' '}EXECUTION_FAILURE</div>
          <div><span style={{ color: 'var(--signal)' }}>MESSAGE:</span> {' '}{error.message || 'An unexpected error occurred.'}</div>
          {error.digest && <div><span style={{ color: 'var(--signal)' }}>DIGEST:</span> {' '}{error.digest}</div>}
          <div><span style={{ color: 'var(--signal)' }}>TIMESTAMP:</span> {' '}{timestamp || '—'}</div>
        </div>

        <div className="flex flex-col gap-4">
          <button
            onClick={() => reset()}
            className="proof-btn proof-btn-primary"
            style={{ width: '100%', justifyContent: 'center' }}
          >
            Retry
          </button>
          <Link href="/" className="proof-btn proof-btn-ghost" style={{ width: '100%', justifyContent: 'center' }}>
            Back to home
          </Link>
        </div>
      </div>
    </div>
  )
}
