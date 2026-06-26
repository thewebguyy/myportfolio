'use client'

import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type IsolationLevel = 'read-committed' | 'serializable'
type BookingResult = 'confirmed' | 'rejected' | null

interface Cursor {
  id: string
  result: BookingResult
  animating: boolean
}

const DEMO_DELAY = 900

export function IsolateProof() {
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

    await new Promise(r => setTimeout(r, DEMO_DELAY))

    if (isolation === 'read-committed') {
      setSeats(s => s - 1) // both read 1, first commits: 0
      await new Promise(r => setTimeout(r, 180))
      setSeats(s => s - 1) // second commits: -1
      await new Promise(r => setTimeout(r, 240))
      setCursors([
        { id: 'A', result: 'confirmed', animating: false },
        { id: 'B', result: 'confirmed', animating: false },
      ])
      setShowToggle(true)
    } else {
      setSeats(s => s - 1)
      await new Promise(r => setTimeout(r, 300))
      setCursors([
        { id: 'A', result: 'confirmed', animating: false },
        { id: 'B', result: 'rejected', animating: false },
      ])
    }

    setRunning(false)
    lockRef.current = false
  }, [isolation, running])

  const switchToSerializable = () => {
    setIsolation('serializable')
    setShowToggle(false)
    reset()
  }

  const seatsNegative = seats < 0

  return (
    <div style={{ borderTop: '1px solid var(--wire)', paddingTop: '48px', marginTop: '48px' }}>
      <div className="type-label mb-4" style={{ color: 'var(--ink-4)' }}>
        Interactive Proof · 03
      </div>

      <div className="flex items-center gap-3 mb-10">
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink-4)' }}>
          Isolation:
        </span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', color: isolation === 'serializable' ? 'var(--signal)' : 'var(--ink-2)', fontWeight: 600 }}>
          {isolation === 'read-committed' ? 'Read Committed' : 'Serializable'}
        </span>
      </div>

      {/* Seats counter */}
      <div className="flex flex-col items-start gap-2 mb-12">
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-4)' }}>
          Seats remaining
        </span>
        <motion.div
          key={seats}
          animate={{ scale: [1.08, 1] }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          aria-live="assertive"
          aria-atomic="true"
          aria-label={`Seats remaining: ${seats}`}
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(72px, 12vw, 128px)',
            fontWeight: 700,
            letterSpacing: '-0.04em',
            lineHeight: 1,
            color: seatsNegative ? '#d63030' : 'var(--ink)',
            transition: 'color 0.3s',
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
              style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#d63030', letterSpacing: '0.04em' }}
            >
              Double booking. Two people confirmed for one seat.
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
            className="flex gap-4 mb-10"
            role="status"
            aria-live="polite"
            aria-label="Request results"
          >
            {cursors.map(c => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  padding: '12px 18px',
                  border: `1px solid ${c.result === 'confirmed' ? 'var(--signal)' : c.result === 'rejected' ? 'var(--wire)' : 'var(--wire)'}`,
                  background: 'var(--paper-2)',
                }}
              >
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.1em', color: 'var(--ink-4)', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Request {c.id}
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: c.result ? 600 : 400, color: c.result === 'confirmed' ? 'var(--signal)' : c.result === 'rejected' ? 'var(--ink-3)' : 'var(--ink-3)' }}>
                  {c.result === 'confirmed' ? '200 Confirmed' : c.result === 'rejected' ? '409 Rejected' : c.animating ? 'reading…' : '—'}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-4">
        {(!hasRun || running) && (
          <button
            type="button"
            onClick={runSimulation}
            disabled={running}
            className="proof-btn proof-btn-primary"
            aria-busy={running}
          >
            {running ? 'Booking…' : 'Book Now'}
          </button>
        )}

        {hasRun && !running && (
          <>
            <button type="button" onClick={reset} className="proof-btn proof-btn-ghost">
              Reset
            </button>
            <AnimatePresence>
              {showToggle && (
                <motion.button
                  type="button"
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  onClick={switchToSerializable}
                  className="proof-btn proof-btn-signal"
                >
                  Switch to Serializable →
                </motion.button>
              )}
            </AnimatePresence>
          </>
        )}
      </div>

      <AnimatePresence>
        {hasRun && !running && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            aria-live="polite"
            style={{ marginTop: '28px', fontFamily: 'var(--font-mono)', fontSize: '12px', lineHeight: 1.75, color: 'var(--ink-3)', maxWidth: '460px' }}
          >
            {isolation === 'read-committed' ? (
              <>
                Both transactions read <code style={{ color: 'var(--ink-2)' }}>seats = 1</code> before either committed.
                Both decremented.{' '}
                <span style={{ color: 'var(--ink-2)' }}>This is the PostgreSQL default.</span>
              </>
            ) : (
              <>
                Transaction B blocked until A committed. Re-read:{' '}
                <code style={{ color: 'var(--ink-2)' }}>seats = 0</code>. Returned 409.{' '}
                <span style={{ color: 'var(--ink-2)' }}>Zero double bookings.</span>
              </>
            )}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}
