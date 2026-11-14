'use client'

import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

interface RequestResult {
  id: number
  duration: number
  status: 'pending' | 'done'
}

// 9 fast (~100ms) + 1 slow (8200ms) — P99 hiding in plain sight
const DURATIONS = [120, 95, 140, 88, 107, 131, 99, 115, 103, 8200]
const FAST_MAX = 200 // scale fast bars relative to this, not to P99

function shuffle(arr: number[]) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function ObserveProof() {
  const prefersReducedMotion = useReducedMotion()
  const [results, setResults] = useState<RequestResult[]>([])
  const [running, setRunning] = useState(false)
  const [done, setDone] = useState(false)
  const runIdRef = useRef(0)

  const runBatch = useCallback(async () => {
    if (running) return
    setRunning(true)
    setDone(false)
    const durations = shuffle(DURATIONS)
    const run = ++runIdRef.current
    setResults(durations.map((d, i) => ({ id: i, duration: d, status: 'pending' })))

    await Promise.all(
      durations.map((d, i) =>
        new Promise<void>(resolve =>
          setTimeout(
            () => {
              if (runIdRef.current !== run) return resolve()
              setResults(prev => prev.map(r => (r.id === i ? { ...r, status: 'done' } : r)))
              resolve()
            },
            prefersReducedMotion ? Math.min(d, 150) : Math.min(d, 2200)
          )
        )
      )
    )

    if (runIdRef.current === run) {
      setRunning(false)
      setDone(true)
    }
  }, [running, prefersReducedMotion])

  const reset = () => {
    runIdRef.current++
    setResults([])
    setRunning(false)
    setDone(false)
  }

  const completed = results.filter(r => r.status === 'done')
  const sorted = [...completed].sort((a, b) => a.duration - b.duration)
  const p50 = sorted.length >= 5 ? sorted[Math.floor(sorted.length * 0.5)]?.duration : null
  const p99 = sorted.length === 10 ? sorted[9]?.duration : null
  const avg = completed.length > 0 ? Math.round(completed.reduce((s, r) => s + r.duration, 0) / completed.length) : null

  return (
    <div className="proof-shell">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div className="type-label" style={{ color: 'var(--ink-2)', fontWeight: 700 }}>
          Interactive Proof · 01 — Tail Latency vs. Mean
        </div>
        <span className="pill-tag">Simulated Model · Servia (2026)</span>
      </div>

      <div className="proof-guide">
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, color: 'var(--signal)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '4px' }}>
          What to observe
        </div>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', lineHeight: 1.55, color: 'var(--ink-2)', margin: 0 }}>
          Click <strong>Send 10 requests</strong> to fire a simulated batch where 9 requests complete in ~100ms and 1 request hits an unindexed query lock (8.2s). Watch how the <strong>Average (920ms)</strong> and <strong>P50 (115ms)</strong> mask the 8.2s tail spike that only <strong>P99</strong> exposes.
        </p>
      </div>

      {/* Request bars */}
      <div
        role="list"
        aria-label="Request durations"
        className="space-y-2 mb-8"
        style={{ maxWidth: '560px' }}
      >
        {(results.length === 0
          ? Array.from({ length: 10 }, (_, i) => ({ id: i, duration: 0, status: 'pending' as const }))
          : results
        ).map(r => {
          const isSlow = r.status === 'done' && r.duration > 1000
          const widthPct =
            r.status !== 'done'
              ? 0
              : isSlow
              ? 100
              : Math.max(6, (r.duration / FAST_MAX) * 60)

          return (
            <div key={r.id} role="listitem" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '24px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: 'var(--ink-4)',
                  flexShrink: 0,
                  textAlign: 'right',
                }}
              >
                {String(r.id + 1).padStart(2, '0')}
              </div>
              <div
                style={{
                  flex: 1,
                  height: '26px',
                  background: 'var(--paper-2)',
                  border: '1px solid var(--wire)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {r.status === 'pending' && results.length > 0 ? (
                  <motion.div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      height: '100%',
                      background: 'var(--wire-strong)',
                      width: '28%',
                    }}
                    animate={prefersReducedMotion ? { opacity: 0.5 } : { x: ['0%', '360%'] }}
                    transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
                  />
                ) : r.status === 'done' ? (
                  <motion.div
                    initial={{ width: prefersReducedMotion ? `${widthPct}%` : 0 }}
                    animate={{ width: `${widthPct}%` }}
                    transition={{ duration: 0.2 }}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      height: '100%',
                      background: isSlow ? 'var(--danger)' : 'var(--signal)',
                      opacity: isSlow ? 1 : 0.78,
                    }}
                  />
                ) : null}
              </div>
              <div
                style={{
                  width: '58px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  fontWeight: isSlow ? 700 : 400,
                  color: isSlow ? 'var(--danger)' : 'var(--ink-3)',
                  flexShrink: 0,
                  textAlign: 'right',
                }}
              >
                {r.status === 'done'
                  ? isSlow
                    ? `${(r.duration / 1000).toFixed(1)}s`
                    : `${r.duration}ms`
                  : 'ready'}
              </div>
            </div>
          )
        })}
      </div>

      {/* Percentile readout */}
      <AnimatePresence>
        {completed.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            aria-live="polite"
            aria-atomic="true"
            className="flex flex-wrap gap-8 mb-6 p-4"
            style={{ background: 'var(--paper-2)', border: '1px solid var(--wire)', maxWidth: '560px' }}
          >
            {avg !== null && (
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', letterSpacing: '0.09em', textTransform: 'uppercase', color: 'var(--ink-4)', marginBottom: '2px' }}>
                  Average
                </div>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: '24px', fontWeight: 700, color: 'var(--ink)' }}>
                  {avg}ms
                </div>
              </div>
            )}
            {p50 !== null && (
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', letterSpacing: '0.09em', textTransform: 'uppercase', color: 'var(--ink-4)', marginBottom: '2px' }}>
                  P50 (Median)
                </div>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: '24px', fontWeight: 700, color: 'var(--ink)' }}>
                  {p50}ms
                </div>
              </div>
            )}
            {p99 !== null && (
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', letterSpacing: '0.09em', textTransform: 'uppercase', color: 'var(--ink-4)', marginBottom: '2px' }}>
                  P99 (Tail)
                </div>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: '24px', fontWeight: 700, color: 'var(--danger)' }}>
                  {(p99 / 1000).toFixed(1)}s
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {done && p99 && avg && (
          <motion.p
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ fontFamily: 'var(--font-sans)', fontSize: '14.5px', lineHeight: 1.65, color: 'var(--ink-2)', maxWidth: '520px', marginBottom: '20px' }}
          >
            Average: <strong>{avg}ms</strong>. Outlier request:{' '}
            <strong style={{ color: 'var(--danger)' }}>{(p99 / 1000).toFixed(1)}s</strong>.{' '}
            The average hides the tail spike; P95/P99 telemetry exposes it immediately.
          </motion.p>
        )}
      </AnimatePresence>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={done ? reset : runBatch}
          disabled={running}
          className={`proof-btn ${done ? 'proof-btn-ghost' : 'proof-btn-primary'}`}
          aria-busy={running}
        >
          {running ? 'Sending batch…' : done ? 'Reset simulation' : 'Send 10 requests'}
        </button>
        {done && (
          <button type="button" onClick={runBatch} className="proof-btn proof-btn-signal">
            Run another batch →
          </button>
        )}
      </div>
    </div>
  )
}
