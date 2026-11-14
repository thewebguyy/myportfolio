'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

type Mode = 'without' | 'with'
type TxState = 'idle' | 'paying' | 'timeout' | 'confirmed' | 'double-charged' | 'rejected-idempotent'

export function RecoverProof() {
  const prefersReducedMotion = useReducedMotion()
  const [mode, setMode] = useState<Mode>('without')
  const [txState, setTxState] = useState<TxState>('idle')
  const [clickCount, setClickCount] = useState(0)
  const [chargeCount, setChargeCount] = useState(0)
  const idempotencyKey = useRef('idem_sb_94k2x8a')
  const usedKeys = useRef<Set<string>>(new Set())

  const reset = () => {
    setTxState('idle')
    setClickCount(0)
    setChargeCount(0)
    usedKeys.current.clear()
    idempotencyKey.current = `idem_sb_${Math.random().toString(36).slice(2, 9)}`
  }

  const switchMode = (m: Mode) => {
    setMode(m)
    reset()
  }

  const pay = async () => {
    if (txState === 'paying') {
      setClickCount(c => c + 1)
      if (mode === 'without') {
        setChargeCount(c => c + 1)
        setTimeout(() => setTxState('double-charged'), prefersReducedMotion ? 50 : 300)
      } else {
        setTimeout(() => setTxState('rejected-idempotent'), prefersReducedMotion ? 50 : 250)
      }
      return
    }
    if (txState !== 'idle') return

    setClickCount(1)
    setChargeCount(0)
    setTxState('paying')

    await new Promise(r => setTimeout(r, prefersReducedMotion ? 150 : 1200))

    if (mode === 'without') {
      setChargeCount(1)
      setTxState('timeout')
    } else {
      const key = idempotencyKey.current
      if (!usedKeys.current.has(key)) {
        usedKeys.current.add(key)
        setChargeCount(1)
      }
      setTxState('timeout')
    }
  }

  const retry = async () => {
    if (mode === 'without') {
      setTxState('paying')
      setClickCount(c => c + 1)
      await new Promise(r => setTimeout(r, prefersReducedMotion ? 100 : 500))
      setChargeCount(c => c + 1)
      setTxState('double-charged')
    } else {
      setTxState('paying')
      setClickCount(c => c + 1)
      await new Promise(r => setTimeout(r, prefersReducedMotion ? 100 : 450))
      setTxState('confirmed')
    }
  }

  return (
    <div className="proof-shell">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div className="type-label" style={{ color: 'var(--ink-2)', fontWeight: 700 }}>
          Interactive Proof · 05 — Atomic Payment Idempotency
        </div>
        <span className="pill-tag">Simulated Model · Subscription Manager (2023)</span>
      </div>

      <div className="proof-guide">
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, color: 'var(--signal)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '4px' }}>
          What to observe
        </div>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', lineHeight: 1.55, color: 'var(--ink-2)', margin: 0 }}>
          Click <strong>Pay $50</strong> to simulate a charge where the gateway webhook times out, then click <strong>Retry payment</strong>. Under <strong>Without idempotency</strong>, the retry triggers a second $50 deduction ($100 total). Switch to <strong>With idempotency key</strong> to see the database key lock return the original receipt with <strong>1 charge</strong>.
        </p>
      </div>

      {/* Mode toggle */}
      <div className="flex flex-wrap gap-3 mb-6" role="group" aria-label="Idempotency mode">
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
        <div style={{ marginBottom: '16px', fontFamily: 'var(--font-mono)', fontSize: '11.5px', color: 'var(--ink-3)' }}>
          Active Header: <code style={{ color: 'var(--ink)', fontWeight: 700 }}>Idempotency-Key: {idempotencyKey.current}</code>
        </div>
      )}

      {/* Hint during inflight */}
      {txState === 'paying' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ marginBottom: '12px', fontFamily: 'var(--font-mono)', fontSize: '11.5px', color: 'var(--signal)', fontWeight: 700 }}
        >
          → Waiting for webhook… (Click &quot;Pay $50&quot; again now to simulate an impatient double-tap)
        </motion.div>
      )}

      {/* Pay button & Metrics */}
      <div className="flex flex-wrap items-center gap-8 mb-6">
        <button
          type="button"
          onClick={pay}
          disabled={txState === 'double-charged' || txState === 'confirmed' || txState === 'rejected-idempotent'}
          className="proof-btn proof-btn-primary"
          style={{ fontSize: '13px', padding: '14px 32px' }}
          aria-busy={txState === 'paying'}
        >
          {txState === 'paying' ? 'Processing…' : 'Pay $50'}
        </button>

        <div className="flex gap-8" aria-live="polite" aria-atomic="true">
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', letterSpacing: '0.09em', textTransform: 'uppercase', color: 'var(--ink-4)', marginBottom: '2px' }}>
              Client Clicks
            </div>
            <div style={{ fontFamily: 'var(--font-sans)', fontSize: '28px', fontWeight: 700, color: 'var(--ink)', lineHeight: 1.1 }}>
              {clickCount}
            </div>
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', letterSpacing: '0.09em', textTransform: 'uppercase', color: 'var(--ink-4)', marginBottom: '2px' }}>
              Ledger Charges
            </div>
            <motion.div
              key={chargeCount}
              animate={prefersReducedMotion ? {} : { scale: chargeCount > 1 ? [1.15, 1] : 1 }}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '28px',
                fontWeight: 700,
                color: chargeCount > 1 ? 'var(--danger)' : 'var(--ink)',
                lineHeight: 1.1,
              }}
            >
              {chargeCount}
            </motion.div>
          </div>
        </div>
      </div>

      {/* State machine output */}
      <AnimatePresence mode="wait">
        {txState === 'timeout' && (
          <motion.div
            key="timeout"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="p-4"
            style={{ background: 'var(--paper-2)', border: '1px solid var(--wire-strong)', maxWidth: '520px' }}
          >
            <div style={{ fontFamily: 'var(--font-sans)', fontSize: '14.5px', fontWeight: 600, color: 'var(--ink)', marginBottom: '12px' }}>
              Network webhook timeout (408). Did the $50 charge succeed?
            </div>
            <button type="button" onClick={retry} className="proof-btn proof-btn-signal">
              Retry payment →
            </button>
          </motion.div>
        )}

        {txState === 'double-charged' && (
          <motion.div
            key="dupe"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            role="alert"
            className="p-5"
            style={{ background: 'var(--paper-2)', border: '1px solid var(--danger)', maxWidth: '520px' }}
          >
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--danger)', marginBottom: '6px', fontWeight: 700 }}>
              Charged twice ($100 deducted).
            </div>
            <div style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: 'var(--ink-2)', marginBottom: '14px' }}>
              Without an atomic idempotency key lock, the retry was processed as a brand-new payment intent.
            </div>
            <div className="flex flex-wrap gap-3">
              <button type="button" onClick={() => switchMode('with')} className="proof-btn proof-btn-signal">
                Try with idempotency key →
              </button>
              <button type="button" onClick={reset} className="proof-btn proof-btn-ghost">
                Reset
              </button>
            </div>
          </motion.div>
        )}

        {txState === 'confirmed' && (
          <motion.div
            key="ok"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            role="status"
            className="p-5"
            style={{ background: 'var(--paper-2)', border: '1px solid var(--signal)', maxWidth: '520px' }}
          >
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--signal)', marginBottom: '6px', fontWeight: 700 }}>
              Confirmed: $50 charged exactly once.
            </div>
            <div style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: 'var(--ink-2)', marginBottom: '14px' }}>
              PostgreSQL matched <code>{idempotencyKey.current}</code> and returned the cached response without contacting the gateway a second time.
            </div>
            <button type="button" onClick={reset} className="proof-btn proof-btn-ghost">
              Reset simulation
            </button>
          </motion.div>
        )}

        {txState === 'rejected-idempotent' && (
          <motion.div
            key="idem"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            role="status"
            className="p-5"
            style={{ background: 'var(--paper-2)', border: '1px solid var(--signal)', maxWidth: '520px' }}
          >
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--signal)', marginBottom: '6px', fontWeight: 700 }}>
              Duplicate in-flight request blocked.
            </div>
            <div style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: 'var(--ink-2)', marginBottom: '14px' }}>
              The idempotency key matched an active in-flight lock. The duplicate request was safely ignored.
            </div>
            <button type="button" onClick={reset} className="proof-btn proof-btn-ghost">
              Reset simulation
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
