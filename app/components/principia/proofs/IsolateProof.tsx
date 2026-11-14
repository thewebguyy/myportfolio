'use client'

import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

type IsolationLevel = 'read-committed' | 'serializable'
type BookingResult = 'confirmed' | 'rejected' | null

interface Cursor {
  id: string
  result: BookingResult
  animating: boolean
}

export function IsolateProof() {
  const prefersReducedMotion = useReducedMotion()
  const [seats, setSeats] = useState(1)
  const [isolation, setIsolation] = useState<IsolationLevel>('read-committed')
  const [cursors, setCursors] = useState<Cursor[]>([])
  const [running, setRunning] = useState(false)
  const [hasRun, setHasRun] = useState(false)
  const [showToggle, setShowToggle] = useState(false)
  const lockRef = useRef(false)

  const reset = useCallback(() => {
    setSeats(1)
    setCursors([])
    setRunning(false)
    setHasRun(false)
    lockRef.current = false
  }, [])

  const runSimulation = useCallback(async () => {
    if (running || lockRef.current) return
    lockRef.current = true
    setRunning(true)
    setHasRun(true)

    setCursors([
      { id: 'A', result: null, animating: true },
      { id: 'B', result: null, animating: true },
    ])

    const delay = prefersReducedMotion ? 100 : 650
    await new Promise(r => setTimeout(r, delay))

    if (isolation === 'read-committed') {
      setSeats(s => s - 1)
      await new Promise(r => setTimeout(r, prefersReducedMotion ? 50 : 150))
      setSeats(s => s - 1)
      await new Promise(r => setTimeout(r, prefersReducedMotion ? 50 : 180))
      setCursors([
        { id: 'A', result: 'confirmed', animating: false },
        { id: 'B', result: 'confirmed', animating: false },
      ])
      setShowToggle(true)
    } else {
      setSeats(s => s - 1)
      await new Promise(r => setTimeout(r, prefersReducedMotion ? 50 : 200))
      setCursors([
        { id: 'A', result: 'confirmed', animating: false },
        { id: 'B', result: 'rejected', animating: false },
      ])
    }

    setRunning(false)
    lockRef.current = false
  }, [isolation, running, prefersReducedMotion])

  const switchIsolation = (level: IsolationLevel) => {
    setIsolation(level)
    setShowToggle(false)
    reset()
  }

  const seatsNegative = seats < 0

  return (
    <div className="proof-shell">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div className="type-label" style={{ color: 'var(--ink-2)', fontWeight: 700 }}>
          Interactive Proof · 03 — Concurrent Booking Isolation
        </div>
        <span className="pill-tag">Simulated Model · Servia (P2034 → HTTP 409)</span>
      </div>

      <div className="proof-guide">
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, color: 'var(--signal)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '4px' }}>
          What to observe
        </div>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', lineHeight: 1.55, color: 'var(--ink-2)', margin: 0 }}>
          Two diners click <strong>Book Now</strong> at the exact same millisecond when <strong>1 seat</strong> remains. Under PostgreSQL&apos;s default <strong>Read Committed</strong>, both read <code>1</code> and both commit, driving seats to <code>-1</code>. Switch to <strong>Serializable</strong> to see PostgreSQL abort the second write with <code>409 Conflict</code>.
        </p>
      </div>

      {/* Isolation mode selector */}
      <div className="flex flex-wrap items-center gap-3 mb-8" role="group" aria-label="Database isolation level">
        <button
          type="button"
          onClick={() => switchIsolation('read-committed')}
          aria-pressed={isolation === 'read-committed'}
          className={`proof-btn ${isolation === 'read-committed' ? 'proof-btn-primary' : 'proof-btn-ghost'}`}
        >
          Read Committed (Default)
        </button>
        <button
          type="button"
          onClick={() => switchIsolation('serializable')}
          aria-pressed={isolation === 'serializable'}
          className={`proof-btn ${isolation === 'serializable' ? 'proof-btn-signal' : 'proof-btn-ghost'}`}
        >
          Serializable (Prisma P2034)
        </button>
      </div>

      {/* Seats counter */}
      <div className="flex flex-col items-start gap-2 mb-8">
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.09em', textTransform: 'uppercase', color: 'var(--ink-3)' }}>
          Seats remaining in slot
        </span>
        <motion.div
          key={seats}
          animate={prefersReducedMotion ? {} : { scale: [1.06, 1] }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          aria-live="assertive"
          aria-atomic="true"
          aria-label={`Seats remaining: ${seats}`}
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(64px, 10vw, 112px)',
            fontWeight: 700,
            letterSpacing: '-0.04em',
            lineHeight: 1,
            color: seatsNegative ? 'var(--danger)' : 'var(--ink)',
          }}
        >
          {seats}
        </motion.div>
        <AnimatePresence>
          {seatsNegative && (
            <motion.div
              role="alert"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 700, color: 'var(--danger)' }}
            >
              Double booking detected: two parties confirmed for a single seat (-1).
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Concurrent request boxes */}
      <AnimatePresence>
        {cursors.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-wrap gap-4 mb-8"
            role="status"
            aria-live="polite"
            aria-label="Request results"
          >
            {cursors.map(c => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  padding: '12px 18px',
                  border: `1px solid ${c.result === 'confirmed' ? 'var(--signal)' : 'var(--wire-strong)'}`,
                  background: 'var(--paper-2)',
                  minWidth: '170px',
                }}
              >
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', letterSpacing: '0.09em', color: 'var(--ink-3)', textTransform: 'uppercase', marginBottom: '4px' }}>
                  Concurrent Request {c.id}
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12.5px', fontWeight: 700, color: c.result === 'confirmed' ? 'var(--signal)' : 'var(--ink-2)' }}>
                  {c.result === 'confirmed' ? '200 Confirmed' : c.result === 'rejected' ? '409 Conflict (P2034)' : c.animating ? 'Reading slot…' : '—'}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-3">
        {(!hasRun || running) && (
          <button
            type="button"
            onClick={runSimulation}
            disabled={running}
            className="proof-btn proof-btn-primary"
            aria-busy={running}
          >
            {running ? 'Booking concurrently…' : 'Book Now (2 Concurrent Requests)'}
          </button>
        )}

        {hasRun && !running && (
          <>
            <button type="button" onClick={reset} className="proof-btn proof-btn-ghost">
              Reset
            </button>
            {showToggle && isolation === 'read-committed' && (
              <button
                type="button"
                onClick={() => switchIsolation('serializable')}
                className="proof-btn proof-btn-signal"
              >
                Switch to Serializable →
              </button>
            )}
          </>
        )}
      </div>

      <AnimatePresence>
        {hasRun && !running && (
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            aria-live="polite"
            style={{ marginTop: '20px', fontFamily: 'var(--font-sans)', fontSize: '14.5px', lineHeight: 1.65, color: 'var(--ink-2)', maxWidth: '540px' }}
          >
            {isolation === 'read-committed' ? (
              <>
                Both transactions read <code>seats = 1</code> before either committed, and both decremented the counter. This is PostgreSQL&apos;s default isolation level.
              </>
            ) : (
              <>
                PostgreSQL detected the read-write dependency conflict on the second transaction, threw <code>P2034</code>, and the API returned <strong>HTTP 409 Conflict</strong>. Zero double-bookings.
              </>
            )}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}
