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

    const c1: Cursor = { id: 'A', result: null, animating: true }
    const c2: Cursor = { id: 'B', result: null, animating: true }
    setCursors([c1, c2])

    await new Promise(r => setTimeout(r, DEMO_DELAY))

    if (isolation === 'read-committed') {
      // Both read seat=1 before either commits — race condition
      setSeats(s => s - 1) // first commit: 0
      await new Promise(r => setTimeout(r, 180))
      setSeats(s => s - 1) // second commit: -1
      await new Promise(r => setTimeout(r, 240))
      setCursors([
        { id: 'A', result: 'confirmed', animating: false },
        { id: 'B', result: 'confirmed', animating: false },
      ])
      setShowToggle(true)
    } else {
      // Serializable: second transaction blocked until first commits
      setSeats(s => s - 1) // first commit: 0
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
    <div
      className="proof-container"
      style={{
        borderTop: '1px solid var(--wire)',
        paddingTop: '48px',
        marginTop: '48px',
      }}
    >
      <div className="type-label mb-8" style={{ color: 'var(--ink-4)' }}>
        Interactive Proof · 03
      </div>

      {/* Isolation level indicator */}
      <div className="flex items-center gap-3 mb-10">
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--ink-4)',
          }}
        >
          Transaction isolation:
        </span>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: isolation === 'serializable' ? 'var(--signal)' : 'var(--ink-2)',
            fontWeight: 600,
          }}
        >
          {isolation === 'read-committed' ? 'Read Committed' : 'Serializable'}
        </span>
      </div>

      {/* Seats counter — the main event */}
      <div className="flex flex-col items-start gap-2 mb-12">
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '13px',
            letterSpacing: '0.06em',
            color: 'var(--ink-4)',
            textTransform: 'uppercase',
          }}
        >
          Seats remaining
        </span>
        <motion.div
          key={seats}
          animate={{ scale: [1.08, 1] }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
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
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                color: '#d63030',
                letterSpacing: '0.04em',
              }}
            >
              Double booking. Two people confirmed for one seat.
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Concurrent cursors — the two simultaneous requests */}
      <AnimatePresence>
        {cursors.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex gap-6 mb-10"
          >
            {cursors.map(c => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  padding: '12px 18px',
                  border: `1px solid ${
                    c.result === 'confirmed'
                      ? 'var(--signal)'
                      : c.result === 'rejected'
                      ? 'var(--wire)'
                      : 'var(--wire)'
                  }`,
                  background: 'var(--paper-2)',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10px',
                    letterSpacing: '0.1em',
                    color: 'var(--ink-4)',
                    textTransform: 'uppercase',
                    marginBottom: '6px',
                  }}
                >
                  Request {c.id}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '12px',
                    color:
                      c.result === 'confirmed'
                        ? 'var(--signal)'
                        : c.result === 'rejected'
                        ? 'var(--ink-3)'
                        : 'var(--ink-3)',
                    fontWeight: c.result ? 600 : 400,
                  }}
                >
                  {c.result === 'confirmed'
                    ? '200 Confirmed'
                    : c.result === 'rejected'
                    ? '409 Rejected'
                    : c.animating
                    ? 'reading...'
                    : '—'}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Book Now button */}
      {!hasRun || running ? (
        <button
          onClick={runSimulation}
          disabled={running}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            padding: '12px 28px',
            background: running ? 'var(--paper-3)' : 'var(--ink)',
            color: running ? 'var(--ink-4)' : 'var(--paper)',
            border: '1px solid var(--ink)',
            cursor: running ? 'not-allowed' : 'pointer',
            transition: 'all 0.15s',
          }}
        >
          {running ? 'Booking...' : 'Book Now'}
        </button>
      ) : (
        <div className="flex flex-wrap items-center gap-4">
          <button
            onClick={reset}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              padding: '12px 28px',
              background: 'transparent',
              color: 'var(--ink-3)',
              border: '1px solid var(--wire)',
              cursor: 'pointer',
            }}
          >
            Reset
          </button>

          <AnimatePresence>
            {showToggle && (
              <motion.button
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                onClick={switchToSerializable}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  padding: '12px 28px',
                  background: 'var(--signal)',
                  color: 'var(--paper)',
                  border: '1px solid var(--signal)',
                  cursor: 'pointer',
                }}
              >
                Switch to Serializable →
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Explanation — only after interaction */}
      <AnimatePresence>
        {hasRun && !running && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            style={{
              marginTop: '32px',
              paddingTop: '24px',
              borderTop: '1px solid var(--wire)',
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              lineHeight: 1.75,
              color: 'var(--ink-3)',
              maxWidth: '480px',
            }}
          >
            {isolation === 'read-committed' ? (
              <>
                Both transactions read <code style={{ color: 'var(--ink-2)' }}>seats = 1</code> before
                either committed. Both decremented. The database allowed it.{' '}
                <span style={{ color: 'var(--ink-2)' }}>This is the default in PostgreSQL.</span>
              </>
            ) : (
              <>
                Transaction B was blocked until A committed.
                It then re-read <code style={{ color: 'var(--ink-2)' }}>seats = 0</code> and
                returned 409.{' '}
                <span style={{ color: 'var(--ink-2)' }}>Zero double bookings.</span>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
