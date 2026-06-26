'use client'

import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface RequestResult {
  id: number
  duration: number
  status: 'pending' | 'done'
}

// 9 fast + 1 slow — the P99 hiding in plain sight
const DURATIONS = [120, 95, 140, 88, 107, 131, 99, 115, 103, 8200]

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
    const initial: RequestResult[] = durations.map((d, i) => ({ id: i, duration: d, status: 'pending' }))
    setResults(initial)

    await Promise.all(
      durations.map((d, i) =>
        new Promise<void>(resolve => setTimeout(() => {
          if (runIdRef.current !== run) return resolve()
          setResults(prev => prev.map(r => r.id === i ? { ...r, status: 'done' } : r))
          resolve()
        }, d))
      )
    )

    if (runIdRef.current === run) {
      setRunning(false)
      setDone(true)
    }
  }, [running])

  const reset = () => {
    runIdRef.current++
    setResults([])
    setRunning(false)
    setDone(false)
  }

  const completed = results.filter(r => r.status === 'done')
  const p50 = completed.length >= 5
    ? [...completed].sort((a, b) => a.duration - b.duration)[Math.floor(completed.length * 0.5)]?.duration
    : null
  const p99 = completed.length === 10
    ? [...completed].sort((a, b) => a.duration - b.duration)[9]?.duration
    : null

  const maxDuration = Math.max(...DURATIONS)

  return (
    <div style={{ borderTop: '1px solid var(--wire)', paddingTop: '48px', marginTop: '48px' }}>
      <div className="type-label mb-8" style={{ color: 'var(--ink-4)' }}>
        Interactive Proof · 01
      </div>

      <div className="mb-10" style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--ink-3)' }}>
        10 identical requests. Watch them land.
      </div>

      {/* Request bars */}
      <div className="space-y-3 mb-10" style={{ maxWidth: '480px' }}>
        {results.length === 0
          ? Array.from({ length: 10 }, (_, i) => (
              <div key={i} style={{ height: '32px', background: 'var(--paper-2)', border: '1px solid var(--wire)' }} />
            ))
          : results.map(r => (
              <div key={r.id} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '20px', fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--ink-4)', flexShrink: 0 }}>
                  {String(r.id + 1).padStart(2, '0')}
                </div>
                <div style={{ flex: 1, height: '32px', background: 'var(--paper-2)', position: 'relative', overflow: 'hidden' }}>
                  {r.status === 'pending' ? (
                    <motion.div
                      style={{ position: 'absolute', top: 0, left: 0, height: '100%', background: 'var(--wire)', width: '30%' }}
                      animate={{ x: ['0%', '300%'] }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                    />
                  ) : (
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(r.duration / maxDuration) * 100}%` }}
                      transition={{ duration: 0.3 }}
                      style={{
                        position: 'absolute', top: 0, left: 0, height: '100%',
                        background: r.duration > 1000 ? '#d63030' : 'var(--signal)',
                      }}
                    />
                  )}
                </div>
                {r.status === 'done' && (
                  <div style={{ width: '60px', fontFamily: 'var(--font-mono)', fontSize: '10px', color: r.duration > 1000 ? '#d63030' : 'var(--ink-3)', flexShrink: 0, textAlign: 'right' }}>
                    {r.duration > 1000 ? `${(r.duration / 1000).toFixed(1)}s` : `${r.duration}ms`}
                  </div>
                )}
              </div>
            ))}
      </div>

      {/* Percentile readout */}
      <AnimatePresence>
        {(p50 !== null || p99 !== null) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-8 mb-10"
          >
            {p50 !== null && (
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-4)', marginBottom: '4px' }}>P50</div>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: '28px', fontWeight: 700, color: 'var(--ink)' }}>{p50}ms</div>
              </div>
            )}
            {p99 !== null && (
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-4)', marginBottom: '4px' }}>P99</div>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: '28px', fontWeight: 700, color: '#d63030' }}>{(p99 / 1000).toFixed(1)}s</div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {done && p99 && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', lineHeight: 1.75, color: 'var(--ink-3)', maxWidth: '420px', marginBottom: '24px' }}
          >
            Average: {Math.round(DURATIONS.reduce((a, b) => a + b, 0) / DURATIONS.length)}ms.
            That one request: {(p99 / 1000).toFixed(1)}s.{' '}
            <span style={{ color: 'var(--ink-2)' }}>The average hides it. The P99 doesn&apos;t.</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex gap-4">
        <button
          onClick={running ? undefined : (done ? reset : runBatch)}
          disabled={running}
          style={{
            fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.1em',
            textTransform: 'uppercase', padding: '12px 28px',
            background: running ? 'var(--paper-3)' : 'var(--ink)',
            color: running ? 'var(--ink-4)' : 'var(--paper)',
            border: '1px solid var(--ink)', cursor: running ? 'not-allowed' : 'pointer',
          }}
        >
          {running ? 'Observing...' : done ? 'Run Again' : 'Send 10 Requests'}
        </button>
      </div>
    </div>
  )
}
