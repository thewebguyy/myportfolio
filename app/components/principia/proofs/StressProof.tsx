'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const GENERIC_500 = `HTTP/1.1 500 Internal Server Error
Content-Type: text/plain

Something went wrong.`

const STRUCTURED_409 = `HTTP/1.1 409 Conflict
Content-Type: application/json

{
  "error": "SEAT_UNAVAILABLE",
  "code": "booking/seat-taken",
  "retryable": false,
  "requestId": "req_7xK2m"
}`

export function StressProof() {
  const [revealed, setRevealed] = useState(false)
  const [selected, setSelected] = useState<'500' | '409' | null>(null)

  return (
    <div style={{ borderTop: '1px solid var(--wire)', paddingTop: '48px', marginTop: '48px' }}>
      <div className="type-label mb-8" style={{ color: 'var(--ink-4)' }}>
        Interactive Proof · 04
      </div>

      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--ink-3)', marginBottom: '32px' }}>
        Two systems. One is under 14.5% error rate. Which one?
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* 500 response */}
        <div
          onClick={() => setSelected('500')}
          style={{
            cursor: 'pointer',
            padding: '20px',
            border: `1px solid ${selected === '500' ? '#d63030' : 'var(--wire)'}`,
            background: 'var(--paper-2)',
            transition: 'border-color 0.15s',
          }}
        >
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-4)', marginBottom: '12px' }}>
            System A
          </div>
          <pre style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', lineHeight: 1.7, color: 'var(--ink-3)', margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
            {GENERIC_500}
          </pre>
        </div>

        {/* 409 response */}
        <div
          onClick={() => setSelected('409')}
          style={{
            cursor: 'pointer',
            padding: '20px',
            border: `1px solid ${selected === '409' ? 'var(--signal)' : 'var(--wire)'}`,
            background: 'var(--paper-2)',
            transition: 'border-color 0.15s',
          }}
        >
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-4)', marginBottom: '12px' }}>
            System B
          </div>
          <pre style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', lineHeight: 1.7, color: 'var(--ink-3)', margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
            {STRUCTURED_409}
          </pre>
        </div>
      </div>

      {selected && !revealed && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ marginBottom: '24px' }}>
          <button
            onClick={() => setRevealed(true)}
            style={{
              fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.1em',
              textTransform: 'uppercase', padding: '12px 28px',
              background: 'var(--ink)', color: 'var(--paper)',
              border: '1px solid var(--ink)', cursor: 'pointer',
            }}
          >
            Reveal →
          </button>
        </motion.div>
      )}

      <AnimatePresence>
        {revealed && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              padding: '20px 24px',
              border: '1px solid var(--wire)',
              background: 'var(--paper-2)',
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              lineHeight: 1.75,
              color: 'var(--ink-3)',
              maxWidth: '520px',
            }}
          >
            <span style={{ color: 'var(--signal)', fontWeight: 600 }}>System B</span> has the 14.5% error rate.
            <br /><br />
            System A&apos;s 500 is indistinguishable from a bug. System B&apos;s 409 is a deliberate signal —
            it names the error, marks it non-retryable, and provides a trace ID.
            {' '}<span style={{ color: 'var(--ink-2)' }}>High error rates are observable. Undefined failure is not.</span>
            <br /><br />
            <button
              onClick={() => { setRevealed(false); setSelected(null) }}
              style={{ background: 'none', border: 'none', color: 'var(--signal)', cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: '12px', padding: 0 }}
            >
              Reset
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
