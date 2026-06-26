'use client'

import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

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
        new Promise<void>(resolve => setTimeout(() => {
          if (runIdRef.current !== run) return resolve()
          setResults(prev => prev.map(r => r.id === i ? { ...r, status: 'done' } : r))
          resolve()
        }, d))
      )
    )

    if (runIdRef.current === run) { setRunning(false); setDone(true) }
  }, [running])

  const reset = () => { runIdRef.current++; setResults([]); setRunning(false); setDone(false) }

  const completed = results.filter(r => r.status === 'done')
  const sorted = [...completed].sort((a, b) => a.duration - b.duration)
  const p50 = sorted.length >= 5 ? sorted[Math.floor(sorted.length * 0.5)]?.duration : null
  const p99 = sorted.length === 10 ? sorted[9]?.duration : null
  const avg = completed.length > 0 ? Math.round(completed.reduce((s, r) => s + r.duration, 0) / completed.length) : null

  return (
    <div style={{ borderTop: '1px solid var(--wire)', paddingTop: '48px', marginTop: '48px' }}>
      <div className="type-label mb-4" style={{ color: 'var(--ink-4)' }}>
        Interactive Proof · 01
      </div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.08em', color: 'var(--ink-4)', marginBottom: '4px' }}>
        FROM: <span style={{ color: 'var(--signal)' }}>Servia</span> · Operations Platform · 2026
      </div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--ink-3)', marginBottom: '32px' }}>
        10 identical requests. Watch them land.
      </div>

      {/* Request bars — two-scale: fast bars scale against 200ms max, slow bar goes full */}
      <div
        role="list"
        aria-label="Request durations"
        className="space-y-2 mb-10"
        style={{ maxWidth: '520px' }}
      >
        {(results.length === 0 ? Array.from({ length: 10 }, (_, i) => ({ id: i, duration: 0, status: 'pending' as const })) : results).map(r => {
          const isSlow = r.status === 'done' && r.duration > 1000
          const widthPct = r.status !== 'done' ? 0
            : isSlow ? 100
            : Math.max(4, (r.duration / FAST_MAX) * 60) // fast bars: max 60% width

          return (
            <div key={r.id} role="listitem" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '22px', fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--ink-4)', flexShrink: 0, textAlign: 'right' }}>
                {String(r.id + 1).padStart(2, '0')}
              </div>
              <div style={{ flex: 1, height: '28px', background: 'var(--paper-2)', position: 'relative', overflow: 'hidden' }}>
                {r.status === 'pending' && results.length > 0 ? (
                  <motion.div
                    style={{ position: 'absolute', top: 0, left: 0, height: '100%', background: 'var(--wire)', width: '28%' }}
                    animate={{ x: ['0%', '360%'] }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  />
                ) : r.status === 'done' ? (
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${widthPct}%` }}
                    transition={{ duration: 0.25 }}
                    style={{ position: 'absolute', top: 0, left: 0, height: '100%', background: isSlow ? '#d63030' : 'var(--signal)', opacity: isSlow ? 1 : 0.7 }}
                  />
                ) : null}
              </div>
              <div style={{ width: '52px', fontFamily: 'var(--font-mono)', fontSize: '10px', color: isSlow ? '#d63030' : 'var(--ink-4)', flexShrink: 0, textAlign: 'right' }}>
                {r.status === 'done' ? (isSlow ? `${(r.duration / 1000).toFixed(1)}s` : `${r.duration}ms`) : ''}
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
            className="flex gap-8 mb-6"
          >
            {avg !== null && (
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-4)', marginBottom: '4px' }}>Average</div>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: '26px', fontWeight: 700, color: 'var(--ink)' }}>{avg}ms</div>
              </div>
            )}
            {p50 !== null && (
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-4)', marginBottom: '4px' }}>P50</div>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: '26px', fontWeight: 700, color: 'var(--ink)' }}>{p50}ms</div>
              </div>
            )}
            {p99 !== null && (
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-4)', marginBottom: '4px' }}>P99</div>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: '26px', fontWeight: 700, color: '#d63030' }}>{(p99 / 1000).toFixed(1)}s</div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {done && p99 && avg && (
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', lineHeight: 1.75, color: 'var(--ink-3)', maxWidth: '420px', marginBottom: '24px' }}
          >
            Average: {avg}ms. That one request:{' '}
            <span style={{ color: '#d63030' }}>{(p99 / 1000).toFixed(1)}s</span>.{' '}
            <span style={{ color: 'var(--ink-2)' }}>The average hides it. The P99 doesn&apos;t.</span>
          </motion.p>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={done ? reset : runBatch}
        disabled={running}
        className={`proof-btn ${done ? 'proof-btn-ghost' : 'proof-btn-primary'}`}
        aria-busy={running}
      >
        {running ? 'Sending…' : done ? 'Run again' : 'Send 10 requests'}
      </button>
    </div>
  )
}
