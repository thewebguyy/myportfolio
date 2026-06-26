'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type ErrorType = 'none' | 'type' | 'test' | 'lint' | 'runtime'

const GATES = [
  { id: 'types', label: 'Type check', tool: 'tsc --noEmit', catchesErrors: ['type'] },
  { id: 'lint', label: 'Lint', tool: 'eslint', catchesErrors: ['lint'] },
  { id: 'tests', label: 'Unit tests', tool: 'jest', catchesErrors: ['test'] },
  { id: 'build', label: 'Build', tool: 'next build', catchesErrors: ['runtime'] },
]

const ERROR_LABELS: Record<ErrorType, string> = {
  none: 'No errors',
  type: 'Type error: amount is string, expected number',
  test: 'Test failure: duplicate booking not prevented',
  lint: 'Lint error: unused variable `seatCount`',
  runtime: 'Runtime error: unhandled promise rejection',
}

type GateResult = 'pending' | 'running' | 'pass' | 'fail' | 'skipped'

export function ShipProof() {
  const [errorType, setErrorType] = useState<ErrorType>('none')
  const [gateResults, setGateResults] = useState<Record<string, GateResult>>({})
  const [running, setRunning] = useState(false)
  const [done, setDone] = useState(false)
  const [caught, setCaught] = useState<string | null>(null)

  const reset = () => {
    setGateResults({})
    setRunning(false)
    setDone(false)
    setCaught(null)
  }

  const runPipeline = async () => {
    if (running) return
    setRunning(true)
    setDone(false)
    setCaught(null)
    setGateResults({})

    let failed = false
    for (const gate of GATES) {
      setGateResults(prev => ({ ...prev, [gate.id]: 'running' }))
      await new Promise(r => setTimeout(r, 700 + Math.random() * 400))

      if (!failed && errorType !== 'none' && gate.catchesErrors.includes(errorType)) {
        setGateResults(prev => ({ ...prev, [gate.id]: 'fail' }))
        setCaught(gate.id)
        failed = true
        // Mark remaining as skipped
        const remaining = GATES.slice(GATES.indexOf(gate) + 1)
        const skips: Record<string, GateResult> = {}
        for (const r of remaining) skips[r.id] = 'skipped'
        setGateResults(prev => ({ ...prev, ...skips }))
        break
      } else {
        setGateResults(prev => ({ ...prev, [gate.id]: failed ? 'skipped' : 'pass' }))
      }
    }

    setRunning(false)
    setDone(true)
  }

  const caughtGate = caught ? GATES.find(g => g.id === caught) : null
  const allPass = done && !caught

  return (
    <div style={{ borderTop: '1px solid var(--wire)', paddingTop: '48px', marginTop: '48px' }}>
      <div className="type-label mb-8" style={{ color: 'var(--ink-4)' }}>
        Interactive Proof · 07
      </div>

      {/* Error type selector */}
      <div style={{ marginBottom: '28px' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-4)', marginBottom: '12px' }}>
          Introduce an error
        </div>
        <div className="flex flex-wrap gap-3">
          {(['none', 'type', 'lint', 'test', 'runtime'] as ErrorType[]).map(e => (
            <button
              key={e}
              onClick={() => { setErrorType(e); reset() }}
              style={{
                fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.06em',
                textTransform: 'uppercase', padding: '6px 14px',
                background: errorType === e ? (e === 'none' ? 'var(--ink)' : '#d63030') : 'transparent',
                color: errorType === e ? 'var(--paper)' : 'var(--ink-3)',
                border: `1px solid ${errorType === e ? (e === 'none' ? 'var(--ink)' : '#d63030') : 'var(--wire)'}`,
                cursor: 'pointer',
              }}
            >
              {e === 'none' ? 'None' : e}
            </button>
          ))}
        </div>
        {errorType !== 'none' && (
          <div style={{ marginTop: '10px', fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#d63030' }}>
            {ERROR_LABELS[errorType]}
          </div>
        )}
      </div>

      {/* Pipeline gates */}
      <div style={{ maxWidth: '420px', marginBottom: '24px' }}>
        {GATES.map((gate, i) => {
          const result = gateResults[gate.id] ?? 'pending'
          const color = result === 'pass' ? 'var(--signal)' : result === 'fail' ? '#d63030' : result === 'running' ? 'var(--ink-2)' : 'var(--ink-4)'
          const icon = result === 'pass' ? '✓' : result === 'fail' ? '✗' : result === 'running' ? '…' : result === 'skipped' ? '–' : String(i + 1)

          return (
            <div key={gate.id} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '14px 0', borderBottom: '1px solid var(--wire)' }}>
              <motion.div
                animate={{ color }}
                style={{ width: '20px', fontFamily: 'var(--font-mono)', fontSize: '13px', flexShrink: 0, color }}
              >
                {icon}
              </motion.div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: result === 'pending' || result === 'skipped' ? 'var(--ink-4)' : 'var(--ink-2)' }}>
                  {gate.label}
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--ink-4)', marginTop: '2px' }}>
                  {gate.tool}
                </div>
              </div>
              {result === 'fail' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#d63030', letterSpacing: '0.06em' }}
                >
                  BLOCKED
                </motion.div>
              )}
            </div>
          )
        })}
      </div>

      {/* Result */}
      <AnimatePresence>
        {done && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              padding: '16px 20px',
              border: `1px solid ${allPass ? 'var(--signal)' : '#d63030'}`,
              background: 'var(--paper-2)',
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              lineHeight: 1.7,
              color: 'var(--ink-3)',
              maxWidth: '420px',
              marginBottom: '20px',
            }}
          >
            {allPass ? (
              <span style={{ color: 'var(--signal)' }}>All gates passed. Ready to deploy.</span>
            ) : (
              <>
                <span style={{ color: '#d63030', fontWeight: 600 }}>Caught at: {caughtGate?.label}</span>
                <br />
                <span>{caughtGate?.tool} blocked the pipeline. </span>
                <span style={{ color: 'var(--ink-2)' }}>
                  {errorType === 'type'
                    ? '4 seconds to catch it here. 4 hours to debug it in production.'
                    : errorType === 'test'
                    ? 'The test knew what the type checker couldn\'t.'
                    : errorType === 'lint'
                    ? 'Signal from noise. The linter found a dead variable before it became a bug.'
                    : 'Build-time failure. Nothing ships.'}
                </span>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex gap-4">
        <button
          onClick={done ? reset : runPipeline}
          disabled={running}
          style={{
            fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.1em',
            textTransform: 'uppercase', padding: '12px 28px',
            background: running ? 'var(--paper-3)' : 'var(--ink)',
            color: running ? 'var(--ink-4)' : 'var(--paper)',
            border: '1px solid var(--ink)', cursor: running ? 'not-allowed' : 'pointer',
          }}
        >
          {running ? 'Running...' : done ? 'Reset' : 'Run pipeline'}
        </button>
      </div>
    </div>
  )
}
