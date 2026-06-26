'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Mode = 'without' | 'with'
type TxState = 'idle' | 'paying' | 'timeout' | 'confirmed' | 'duplicate-charge' | 'rejected-idempotent'

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

  const pay = async () => {
    if (txState === 'paying') {
      // Double click during inflight
      setClickCount(c => c + 1)
      if (mode === 'without') {
        // No protection — duplicate charge
        setChargeCount(c => c + 1)
        setTimeout(() => setTxState('duplicate-charge'), 400)
      } else {
        // Idempotency key already in flight — server rejects duplicate
        setTimeout(() => setTxState('rejected-idempotent'), 300)
      }
      return
    }

    if (txState !== 'idle') return

    setClickCount(1)
    setChargeCount(0)
    setTxState('paying')

    // Simulate network timeout after 1.8s
    await new Promise(r => setTimeout(r, 1800))

    if (mode === 'without') {
      // Timed out — user doesn't know
      setChargeCount(1)
      setTxState('timeout')
    } else {
      // With idempotency: server processed it once
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
      await new Promise(r => setTimeout(r, 800))
      setChargeCount(c => c + 1)
      setTxState('duplicate-charge')
    } else {
      setTxState('paying')
      setClickCount(c => c + 1)
      await new Promise(r => setTimeout(r, 600))
      // Idempotent: same key, same result, no new charge
      setTxState('confirmed')
    }
  }


  return (
    <div style={{ borderTop: '1px solid var(--wire)', paddingTop: '48px', marginTop: '48px' }}>
      <div className="type-label mb-8" style={{ color: 'var(--ink-4)' }}>
        Interactive Proof · 05
      </div>

      <div className="flex gap-3 mb-10">
        {(['without', 'with'] as Mode[]).map(m => (
          <button
            key={m}
            onClick={() => { setMode(m); reset() }}
            style={{
              fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.08em',
              textTransform: 'uppercase', padding: '8px 16px',
              background: mode === m ? (m === 'with' ? 'var(--signal)' : 'var(--ink)') : 'transparent',
              color: mode === m ? 'var(--paper)' : 'var(--ink-3)',
              border: `1px solid ${mode === m ? (m === 'with' ? 'var(--signal)' : 'var(--ink)') : 'var(--wire)'}`,
              cursor: 'pointer',
            }}
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

      {/* Pay button */}
      <div style={{ marginBottom: '24px' }}>
        <button
          onClick={pay}
          disabled={txState === 'duplicate-charge' || txState === 'confirmed' || txState === 'rejected-idempotent'}
          style={{
            fontFamily: 'var(--font-mono)', fontSize: '13px', letterSpacing: '0.06em',
            textTransform: 'uppercase', padding: '16px 40px',
            background: txState === 'paying' ? 'var(--paper-3)' : 'var(--ink)',
            color: txState === 'paying' ? 'var(--ink-4)' : 'var(--paper)',
            border: '1px solid var(--ink)', cursor: txState === 'paying' ? 'wait' : 'pointer',
          }}
        >
          {txState === 'paying' ? 'Processing...' : 'Pay $50'}
        </button>
      </div>

      {/* Metrics */}
      <div className="flex gap-8 mb-8">
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

      {/* Status + next action */}
      <AnimatePresence mode="wait">
        {txState === 'timeout' && (
          <motion.div key="timeout" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--ink-3)', marginBottom: '16px' }}>
              Network timeout. Did it go through?
            </div>
            <button
              onClick={retry}
              style={{
                fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.1em',
                textTransform: 'uppercase', padding: '10px 24px',
                background: 'var(--ink)', color: 'var(--paper)',
                border: '1px solid var(--ink)', cursor: 'pointer',
              }}
            >
              Retry payment
            </button>
          </motion.div>
        )}

        {txState === 'duplicate-charge' && (
          <motion.div key="dupe" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: '#d63030', marginBottom: '8px', fontWeight: 600 }}>
              Charged twice. $100 deducted.
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--ink-3)', marginBottom: '16px' }}>
              The retry was treated as a new request.
            </div>
            <button onClick={reset} style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '10px 24px', background: 'transparent', color: 'var(--ink-3)', border: '1px solid var(--wire)', cursor: 'pointer' }}>Reset</button>
          </motion.div>
        )}

        {txState === 'confirmed' && (
          <motion.div key="ok" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--signal)', marginBottom: '8px', fontWeight: 600 }}>
              Confirmed. $50 charged once.
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--ink-3)', marginBottom: '16px' }}>
              The retry returned the same result — no new charge.
            </div>
            <button onClick={reset} style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '10px 24px', background: 'transparent', color: 'var(--ink-3)', border: '1px solid var(--wire)', cursor: 'pointer' }}>Reset</button>
          </motion.div>
        )}

        {txState === 'rejected-idempotent' && (
          <motion.div key="idem" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--signal)', marginBottom: '8px', fontWeight: 600 }}>
              Duplicate request blocked.
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--ink-3)', marginBottom: '16px' }}>
              The key matched an in-flight request. The server ignored the second.
            </div>
            <button onClick={reset} style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '10px 24px', background: 'transparent', color: 'var(--ink-3)', border: '1px solid var(--wire)', cursor: 'pointer' }}>Reset</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
