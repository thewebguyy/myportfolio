'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type ErrorType = 'none' | 'type' | 'test' | 'lint' | 'runtime'
type GateResult = 'pending' | 'running' | 'pass' | 'fail' | 'skipped'

const GATES = [
  { id: 'types', label: 'Type check', tool: 'tsc --noEmit', catchesErrors: ['type'] },
  { id: 'lint',  label: 'Lint',       tool: 'eslint',        catchesErrors: ['lint'] },
  { id: 'tests', label: 'Unit tests', tool: 'jest',           catchesErrors: ['test'] },
  { id: 'build', label: 'Build',      tool: 'next build',     catchesErrors: ['runtime'] },
]

const ERROR_LABELS: Record<ErrorType, string> = {
  none:    'No errors introduced',
  type:    'Type error: amount is string, expected number',
  test:    'Test failure: duplicate booking not prevented',
  lint:    'Lint: unused variable `seatCount`',
  runtime: 'Runtime: unhandled promise rejection',
}

export function ShipProof() {
  const [errorType, setErrorType] = useState<ErrorType>('none')
  const [gateResults, setGateResults] = useState<Record<string, GateResult>>({})
  const [running, setRunning] = useState(false)
  const [done, setDone] = useState(false)
  const [caught, setCaught] = useState<string | null>(null)

  const reset = () => { setGateResults({}); setRunning(false); setDone(false); setCaught(null) }

  const runPipeline = async () => {
    if (running) return
    setRunning(true); setDone(false); setCaught(null); setGateResults({})

    let failed = false
    for (const gate of GATES) {
      setGateResults(prev => ({ ...prev, [gate.id]: 'running' }))
      await new Promise(r => setTimeout(r, 650 + Math.random() * 350))

      if (!failed && errorType !== 'none' && gate.catchesErrors.includes(errorType)) {
        setGateResults(prev => ({ ...prev, [gate.id]: 'fail' }))
        setCaught(gate.id)
        failed = true
        const skips: Record<string, GateResult> = {}
        for (const r of GATES.slice(GATES.indexOf(gate) + 1)) skips[r.id] = 'skipped'
        setGateResults(prev => ({ ...prev, ...skips }))
        break
      } else {
        setGateResults(prev => ({ ...prev, [gate.id]: failed ? 'skipped' : 'pass' }))
      }
    }

    setRunning(false); setDone(true)
  }

  const caughtGate = caught ? GATES.find(g => g.id === caught) : null
  const allPass = done && !caught

  return (
    <div style={{ borderTop: '1px solid var(--wire)', paddingTop: '48px', marginTop: '48px' }}>
      <div className="type-label mb-4" style={{ color: 'var(--ink-4)' }}>
        Interactive Proof · 07
      </div>

      {/* Error type selector */}
      <div style={{ marginBottom: '28px' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-4)', marginBottom: '12px' }}>
          Introduce an error
        </div>
        <div className="flex flex-wrap gap-3" role="group" aria-label="Error type">
          {(['none', 'type', 'lint', 'test', 'runtime'] as ErrorType[]).map(e => (
            <button
              key={e}
              type="button"
              onClick={() => { setErrorType(e); reset() }}
              aria-pressed={errorType === e}
              className={`proof-btn ${errorType === e ? (e === 'none' ? 'proof-btn-primary' : 'proof-btn-signal') : 'proof-btn-ghost'}`}
              style={{ padding: '6px 14px', fontSize: '11px', borderColor: errorType === e && e !== 'none' ? '#d63030' : undefined, background: errorType === e && e !== 'none' ? '#d63030' : undefined }}
            >
              {e === 'none' ? 'None' : e}
            </button>
          ))}
        </div>
        {errorType !== 'none' && (
          <div role="status" style={{ marginTop: '10px', fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#d63030' }}>
            {ERROR_LABELS[errorType]}
          </div>
        )}
      </div>

      {/* Pipeline gates */}
      <div style={{ maxWidth: '420px', marginBottom: '24px' }} role="list" aria-label="Pipeline stages">
        {GATES.map((gate, i) => {
          const result = gateResults[gate.id] ?? 'pending'
          const color = result === 'pass' ? 'var(--signal)' : result === 'fail' ? '#d63030' : result === 'running' ? 'var(--ink-2)' : 'var(--ink-4)'
          const icon = result === 'pass' ? '✓' : result === 'fail' ? '✗' : result === 'running' ? '…' : result === 'skipped' ? '–' : String(i + 1)

          return (
            <div key={gate.id} role="listitem" aria-label={`${gate.label}: ${result}`} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '14px 0', borderBottom: '1px solid var(--wire)' }}>
              <motion.div animate={{ color }} style={{ width: '20px', fontFamily: 'var(--font-mono)', fontSize: '13px', flexShrink: 0, color }}>
                {icon}
              </motion.div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: result === 'pending' || result === 'skipped' ? 'var(--ink-4)' : 'var(--ink-2)' }}>
                  {gate.label}
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--ink-4)', marginTop: '2px' }}>{gate.tool}</div>
              </div>
              {result === 'fail' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#d63030', letterSpacing: '0.06em' }}>
                  BLOCKED
                </motion.div>
              )}
            </div>
          )
        })}
      </div>

      <AnimatePresence>
        {done && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            role={allPass ? 'status' : 'alert'}
            aria-live="polite"
            style={{ padding: '16px 20px', border: `1px solid ${allPass ? 'var(--signal)' : '#d63030'}`, background: 'var(--paper-2)', fontFamily: 'var(--font-mono)', fontSize: '12px', lineHeight: 1.7, color: 'var(--ink-3)', maxWidth: '420px', marginBottom: '20px' }}
          >
            {allPass ? (
              <span style={{ color: 'var(--signal)' }}>All gates passed. Ready to deploy.</span>
            ) : (
              <>
                <span style={{ color: '#d63030', fontWeight: 600 }}>Caught at: {caughtGate?.label}</span><br />
                <span>{caughtGate?.tool} blocked the pipeline. </span>
                <span style={{ color: 'var(--ink-2)' }}>
                  {errorType === 'type' ? '4 seconds here. 4 hours in production.'
                    : errorType === 'test' ? 'The test knew what the type checker couldn\'t.'
                    : errorType === 'lint' ? 'Dead variable. Future bug. Caught now.'
                    : 'Build-time failure. Nothing ships.'}
                </span>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={done ? reset : runPipeline}
        disabled={running}
        className="proof-btn proof-btn-primary"
        aria-busy={running}
      >
        {running ? 'Running…' : done ? 'Reset' : 'Run pipeline'}
      </button>
    </div>
  )
}
