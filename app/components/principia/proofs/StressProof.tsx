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

  const reset = () => {
    setRevealed(false)
    setSelected(null)
  }

  return (
    <div className="proof-shell">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div className="type-label" style={{ color: 'var(--ink-2)', fontWeight: 700 }}>
          Interactive Proof · 04 — Unhandled Failure vs. Deliberate Conflict Signal
        </div>
        <span className="pill-tag">Simulated Model · Conflict Handling</span>
      </div>

      <div className="proof-guide">
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, color: 'var(--signal)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '4px' }}>
          What to observe
        </div>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', lineHeight: 1.55, color: 'var(--ink-2)', margin: 0 }}>
          Compare two ways a contended booking request can fail: an opaque <strong>500</strong> and a structured <strong>409 Conflict</strong>. Select a response below and click <strong>Reveal</strong> to see why the structured signal is easier to handle safely.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6" role="group" aria-label="Select a system response" style={{ maxWidth: '680px' }}>
        {[
          { id: '500' as const, label: 'System A (Opaque Crash)', content: GENERIC_500 },
          { id: '409' as const, label: 'System B (Structured Conflict)', content: STRUCTURED_409 },
        ].map(({ id, label, content }) => (
          <button
            key={id}
            type="button"
            onClick={() => !revealed && setSelected(id)}
            aria-pressed={selected === id}
            disabled={revealed}
            style={{
              textAlign: 'left',
              padding: '20px',
              border: `2px solid ${selected === id ? (id === '500' ? 'var(--danger)' : 'var(--signal)') : 'var(--wire)'}`,
              background: 'var(--paper-2)',
              transition: 'border-color 0.15s',
              cursor: revealed ? 'default' : 'pointer',
            }}
          >
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: selected === id ? 'var(--signal)' : 'var(--ink-3)', marginBottom: '12px' }}>
              {label}
            </div>
            <pre style={{ fontFamily: 'var(--font-mono)', fontSize: '11.5px', lineHeight: 1.65, color: 'var(--ink)', margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
              {content}
            </pre>
          </button>
        ))}
      </div>

      {selected && !revealed && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ marginBottom: '20px' }}>
          <button type="button" onClick={() => setRevealed(true)} className="proof-btn proof-btn-primary">
            Reveal answer →
          </button>
        </motion.div>
      )}

      <AnimatePresence>
        {revealed && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            role="status"
            aria-live="polite"
            style={{
              padding: '20px 24px',
              border: '1px solid var(--wire-strong)',
              background: 'var(--paper-2)',
              fontFamily: 'var(--font-sans)',
              fontSize: '14.5px',
              lineHeight: 1.65,
              color: 'var(--ink-2)',
              maxWidth: '680px',
            }}
          >
            <strong style={{ color: 'var(--signal)' }}>System B</strong> returns a structured conflict instead of an opaque crash.
            <br /><br />
            System A&apos;s <code>500</code> is an unhandled failure that leaves the client guessing whether to retry. System B&apos;s <code>409 Conflict</code> is a deliberate protocol signal: it names the exact domain reason (<code>CONCURRENCY_CONFLICT</code>), specifies retry semantics, and attaches a correlation <code>requestId</code>.
            <div className="mt-4">
              <button type="button" onClick={reset} className="proof-btn proof-btn-ghost">
                Reset comparison
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
