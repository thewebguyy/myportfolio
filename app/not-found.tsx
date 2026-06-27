'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function NotFound() {
  const [path, setPath] = useState('')

  useEffect(() => {
    if (typeof window !== 'undefined') setPath(window.location.pathname)
  }, [])

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
            color: 'var(--ink)',
            marginBottom: '8px',
          }}
        >
          404
        </div>
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '13px',
            color: 'var(--ink-3)',
            marginBottom: '32px',
            lineHeight: 1.7,
          }}
        >
          {path ? `${path} does not exist.` : 'This page does not exist.'}
        </p>

        <div className="flex flex-col gap-4">
          <Link href="/" className="proof-btn proof-btn-primary" style={{ justifyContent: 'center' }}>
            Back to home
          </Link>
          <Link href="/case-studies" className="proof-btn proof-btn-ghost" style={{ justifyContent: 'center' }}>
            Browse case studies
          </Link>
        </div>
      </div>
    </div>
  )
}
