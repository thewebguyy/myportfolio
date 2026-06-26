'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Mode = 'without' | 'with'
type TxState = 'idle' | 'paying' | 'timeout' | 'confirmed' | 'double-charged' | 'rejected-idempotent'

export function RecoverProof() {
  const [mode, setMode] = useState<Mode>('without')
  const [txState, setTxState] = useState<TxState>('idle')
  const [clickCount, setClickCount] = useState(0)
  const [chargeCount, setChargeCount] = useState(0)
  const idempotencyKey = useRef(`idem_${Math.random().toString(36).slice(2, 9)}`)
  const usedKeys = useRef<Set<string>>(new Set())

  const reset = () => {
    setTxState('idle')
    setClickCount(0)
    setChargeCount(0)
    idempotencyKey.current = `idem_${Math.random().toString(36).slice(2, 9)}`
  }

  const switchMode = (m: Mode) => { setMode(m); reset() }

  const pay = async () => {
    if (txState === 'paying') {
      // Second click during inflight — the interesting moment
      setClickCount(c => c + 1)
      if (mode === 'without') {
        setChargeCount(c => c + 1)
        setTimeout(() => setTxState('double-charged'), 400)
      } else {
        setTimeout(() => setTxState('rejected-idempotent'), 300)
      }
      return
    }
    if (txState !== 'idle') return

    setClickCount(1)
    setChargeCount(0)
    setTxState('paying')

    await new Promise(r => setTimeout(r, 2000))

    if (mode === 'without') {
      setChargeCount(1)
      setTxState('timeout')
    } else {
      const key = idempotencyKey.current
      if (!usedKeys.current.has(key)) { usedKeys.current.add(key); setChargeCount(1) }
      setTxState('timeout')
    }
  }

  const retry = async () => {
    if (mode === 'without') {
      setTxState('paying')
      setClickCount(c => c + 1)
      await new Promise(r => setTimeout(r, 800))
      setChargeCount(c => c + 1)
      setTxState('double-charged')
    } else {
      setTxState('paying')
      setClickCount(c => c + 1)
      await new Promise(r => setTimeout(r, 600))
      setTxState('confirmed')
    }
  }

  return (
    <div style={{ borderTop: '1px solid var(--wire)', paddingTop: '48px', marginTop: '48px' }}>
      <div className="type-label mb-4" style={{ color: 'var(--ink-4)' }}>
        Interactive Proof · 05
      </div>

      {/* Mode toggle */}
      <div className="flex gap-3 mb-10" role="group" aria-label="Idempotency mode">
        {(['without', 'with'] as Mode[]).map(m => (
          <button
            key={m}
            type="button"
            onClick={() => switchMode(m)}
            aria-pressed={mode === m}
            className={`proof-btn ${mode === m ? (m === 'with' ? 'proof-btn-signal' : 'proof-btn-primary') : 'proof-btn-ghost'}`}
          >
            {m === 'without' ? 'Without idempotency' : 'With idempotency key'}
          </button>
        ))}
      </div>

      {mode === 'with' && (
        <div style={{ marginBottom: '20px', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--ink-4)' }}>
          Key: <code style={{ color: 'var(--ink-2)' }}>{idempotencyKey.current}</code>
        </div>
      )}

      {/* Hint */}
      {txState === 'paying' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ marginBottom: '12px', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--signal)', letterSpacing: '0.06em' }}
        >
          → Click &quot;Pay $50&quot; again to simulate a duplicate request
        </motion.div>
      )}

      {/* Pay button */}
      <div style={{ marginBottom: '28px' }}>
        <button
          type="button"
          onClick={pay}
          disabled={txState === 'double-charged' || txState === 'confirmed' || txState === 'rejected-idempotent'}
          className="proof-btn proof-btn-primary"
          style={{ fontSize: '14px', padding: '16px 40px' }}
          aria-busy={txState === 'paying'}
        >
          {txState === 'paying' ? 'Processing…' : 'Pay $50'}
        </button>
      </div>

      {/* Metrics */}
      <div className="flex gap-10 mb-8" aria-live="polite" aria-atomic="true">
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-4)', marginBottom: '4px' }}>Clicks</div>
          <div style={{ fontFamily: 'var(--font-sans)', fontSize: '32px', fontWeight: 700, color: 'var(--ink)' }}>{clickCount}</div>
        </div>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-4)', marginBottom: '4px' }}>Charges</div>
          <motion.div
            key={chargeCount}
            animate={{ scale: chargeCount > 1 ? [1.2, 1] : 1 }}
            style={{ fontFamily: 'var(--font-sans)', fontSize: '32px', fontWeight: 700, color: chargeCount > 1 ? '#d63030' : 'var(--ink)' }}
          >
            {chargeCount}
          </motion.div>
        </div>
      </div>

      {/* State machine output */}
      <AnimatePresence mode="wait">
        {txState === 'timeout' && (
          <motion.div key="timeout" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--ink-3)', marginBottom: '16px' }}>
              Network timeout. Did it go through?
            </div>
            <button type="button" onClick={retry} className="proof-btn proof-btn-primary">
              Retry payment
            </button>
          </motion.div>
        )}

        {txState === 'double-charged' && (
          <motion.div key="dupe" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} role="alert">
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: '#d63030', marginBottom: '8px', fontWeight: 600 }}>
              Charged twice. $100 deducted.
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--ink-3)', marginBottom: '16px' }}>
              The retry was treated as a new request.
            </div>
            <button type="button" onClick={reset} className="proof-btn proof-btn-ghost">Reset</button>
          </motion.div>
        )}

        {txState === 'confirmed' && (
          <motion.div key="ok" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} role="status">
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--signal)', marginBottom: '8px', fontWeight: 600 }}>
              Confirmed. $50 charged once.
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--ink-3)', marginBottom: '16px' }}>
              The retry returned the same result. No new charge.
            </div>
            <button type="button" onClick={reset} className="proof-btn proof-btn-ghost">Reset</button>
          </motion.div>
        )}

        {txState === 'rejected-idempotent' && (
          <motion.div key="idem" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} role="status">
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--signal)', marginBottom: '8px', fontWeight: 600 }}>
              Duplicate request blocked.
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--ink-3)', marginBottom: '16px' }}>
              Key matched an in-flight request. The server ignored the second.
            </div>
            <button type="button" onClick={reset} className="proof-btn proof-btn-ghost">Reset</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
