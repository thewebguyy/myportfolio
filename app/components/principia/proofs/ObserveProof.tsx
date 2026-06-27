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
const FAST_MAX = 200

function shuffle(arr: number[]) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

type AlertChoice = 'average' | 'p99' | null

export function ObserveProof() {
  const [alertChoice, setAlertChoice] = useState<AlertChoice>(null)
  const [results, setResults] = useState<RequestResult[]>([])
  const [running, setRunning] = useState(false)
  const [done, setDone] = useState(false)
  const runIdRef = useRef(0)

  const runBatch = useCallback(async () => {
    if (running || !alertChoice) return
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
  }, [running, alertChoice])

  const reset = () => {
    runIdRef.current++
    setResults([])
    setRunning(false)
    setDone(false)
    setAlertChoice(null)
  }

  const completed = results.filter(r => r.status === 'done')
  const sorted = [...completed].sort((a, b) => a.duration - b.duration)
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

      <AnimatePresence mode="wait">
        {!alertChoice ? (
          /* Step 1: commit to an answer before seeing the data */
          <motion.div
            key="choice"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--ink-3)', marginBottom: '28px', maxWidth: '420px', lineHeight: 1.75 }}>
              Before we run — which metric would you alert on?
            </div>
            <div className="flex flex-wrap gap-3" role="group" aria-label="Choose alert metric">
              <button
                type="button"
                onClick={() => setAlertChoice('average')}
                className="proof-btn proof-btn-ghost"
                style={{ minWidth: '160px' }}
              >
                Alert on average
              </button>
              <button
                type="button"
                onClick={() => setAlertChoice('p99')}
                className="proof-btn proof-btn-ghost"
                style={{ minWidth: '160px' }}
              >
                Alert on P99
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="run"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--ink-3)', marginBottom: '28px' }}>
              You chose{' '}
              <span style={{ color: alertChoice === 'p99' ? 'var(--signal)' : 'var(--ink-2)', fontWeight: 600 }}>
                {alertChoice === 'average' ? 'average latency' : 'P99'}
              </span>
              . 10 identical requests. Watch them land.
            </div>

            {/* Request bars */}
            <div
              role="list"
              aria-label="Request durations"
              className="space-y-2 mb-10"
              style={{ maxWidth: '520px' }}
            >
              {(results.length === 0
                ? Array.from({ length: 10 }, (_, i) => ({ id: i, duration: 0, status: 'pending' as const }))
                : results
              ).map(r => {
                const isSlow = r.status === 'done' && r.duration > 1000
                const widthPct = r.status !== 'done' ? 0
                  : isSlow ? 100
                  : Math.max(4, (r.duration / FAST_MAX) * 60)

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

            {/* Live percentile readout */}
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
                      <div style={{ fontFamily: 'var(--font-sans)', fontSize: '26px', fontWeight: 700, color: alertChoice === 'average' ? 'var(--ink)' : 'var(--ink-3)' }}>{avg}ms</div>
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

            {/* Verdict — branches on the choice made before running */}
            <AnimatePresence>
              {done && p99 && avg && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ marginBottom: '24px', maxWidth: '460px' }}
                >
                  {alertChoice === 'average' ? (
                    <div
                      role="alert"
                      style={{ padding: '16px 20px', border: '1px solid #d63030', background: 'var(--paper-2)', fontFamily: 'var(--font-mono)', fontSize: '12px', lineHeight: 1.75, color: 'var(--ink-3)' }}
                    >
                      <div style={{ color: '#d63030', fontWeight: 600, marginBottom: '6px' }}>Your alert would not have fired.</div>
                      Average was {avg}ms — well within SLA. But request 10 took{' '}
                      <span style={{ color: '#d63030' }}>{(p99 / 1000).toFixed(1)}s</span>.
                      {' '}That user experienced the failure. Average hid it completely.
                    </div>
                  ) : (
                    <div
                      role="status"
                      style={{ padding: '16px 20px', border: '1px solid var(--signal)', background: 'var(--paper-2)', fontFamily: 'var(--font-mono)', fontSize: '12px', lineHeight: 1.75, color: 'var(--ink-3)' }}
                    >
                      <div style={{ color: 'var(--signal)', fontWeight: 600, marginBottom: '6px' }}>Correct. Your alert would have fired.</div>
                      P99 was <span style={{ color: '#d63030' }}>{(p99 / 1000).toFixed(1)}s</span>.
                      {' '}Average showed {avg}ms and would have passed silently.
                      {' '}<span style={{ color: 'var(--ink-2)' }}>P99 shows what average hides.</span>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {!done ? (
              <button
                type="button"
                onClick={runBatch}
                disabled={running}
                className="proof-btn proof-btn-primary"
                aria-busy={running}
              >
                {running ? 'Sending…' : 'Send 10 requests'}
              </button>
            ) : (
              <button
                type="button"
                onClick={reset}
                className="proof-btn proof-btn-ghost"
              >
                Try the other choice
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
