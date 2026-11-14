'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

type ErrorType = 'none' | 'type' | 'test' | 'lint' | 'runtime'
type GateResult = 'pending' | 'running' | 'pass' | 'fail' | 'skipped'

const GATES = [
  { id: 'types', label: 'Type check', tool: 'tsc --noEmit', catchesErrors: ['type'] },
  { id: 'lint',  label: 'Lint',       tool: 'eslint',        catchesErrors: ['lint'] },
  { id: 'tests', label: 'Unit tests', tool: 'jest',          catchesErrors: ['test'] },
  { id: 'build', label: 'Build',      tool: 'next build',    catchesErrors: ['runtime'] },
]

const ERROR_LABELS: Record<ErrorType, string> = {
  none:    'Clean commit: no defects injected',
  type:    'Injected defect: payment amount is string ("100"), expected number',
  test:    'Injected defect: concurrent booking regression allows duplicate seat',
  lint:    'Injected defect: unused variable `seatCount` in reservation controller',
  runtime: 'Injected defect: broken dynamic import in production route bundle',
}

export function ShipProof() {
  const prefersReducedMotion = useReducedMotion()
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
      await new Promise(r => setTimeout(r, prefersReducedMotion ? 80 : 420))

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

    setRunning(false)
    setDone(true)
  }

  const caughtGate = caught ? GATES.find(g => g.id === caught) : null
  const allPass = done && !caught

  return (
    <div className="proof-shell">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div className="type-label" style={{ color: 'var(--ink-2)', fontWeight: 700 }}>
          Interactive Proof · 07 — Automated Pull-Request Verification Gates
        </div>
        <span className="pill-tag">Simulated Model · Servia GitHub Actions CI</span>
      </div>

      <div className="proof-guide">
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, color: 'var(--signal)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '4px' }}>
          What to observe
        </div>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', lineHeight: 1.55, color: 'var(--ink-2)', margin: 0 }}>
          Inject a specific class of defect (<strong>type</strong>, <strong>lint</strong>, <strong>test</strong>, or <strong>runtime</strong>) or leave <strong>None</strong> selected, then click <strong>Run pipeline</strong> to see which automated gate halts the release before staging.
        </p>
      </div>

      {/* Error type selector */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', letterSpacing: '0.09em', textTransform: 'uppercase', color: 'var(--ink-3)', marginBottom: '10px' }}>
          1. Select defect to inject into PR
        </div>
        <div className="flex flex-wrap gap-2.5" role="group" aria-label="Error type">
          {(['none', 'type', 'lint', 'test', 'runtime'] as ErrorType[]).map(e => (
            <button
              key={e}
              type="button"
              onClick={() => {
                setErrorType(e)
                reset()
              }}
              aria-pressed={errorType === e}
              className={`proof-btn ${errorType === e ? (e === 'none' ? 'proof-btn-primary' : 'proof-btn-signal') : 'proof-btn-ghost'}`}
              style={{
                padding: '8px 16px',
                fontSize: '11px',
                borderColor: errorType === e && e !== 'none' ? 'var(--danger)' : undefined,
                background: errorType === e && e !== 'none' ? 'var(--danger)' : undefined,
              }}
            >
              {e === 'none' ? 'None (Clean)' : e}
            </button>
          ))}
        </div>
        <div
          role="status"
          style={{
            marginTop: '10px',
            fontFamily: 'var(--font-mono)',
            fontSize: '11.5px',
            color: errorType === 'none' ? 'var(--ink-3)' : 'var(--danger)',
            fontWeight: errorType === 'none' ? 400 : 700,
          }}
        >
          {ERROR_LABELS[errorType]}
        </div>
      </div>

      {/* Pipeline gates */}
      <div style={{ maxWidth: '480px', marginBottom: '20px', borderTop: '1px solid var(--wire)' }} role="list" aria-label="Pipeline stages">
        {GATES.map((gate, i) => {
          const result = gateResults[gate.id] ?? 'pending'
          const color =
            result === 'pass'
              ? 'var(--signal)'
              : result === 'fail'
              ? 'var(--danger)'
              : result === 'running'
              ? 'var(--ink)'
              : 'var(--ink-4)'
          const icon =
            result === 'pass'
              ? '✓'
              : result === 'fail'
              ? '✗'
              : result === 'running'
              ? '…'
              : result === 'skipped'
              ? '–'
              : String(i + 1)

          return (
            <div
              key={gate.id}
              role="listitem"
              aria-label={`${gate.label}: ${result}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '12px 0',
                borderBottom: '1px solid var(--wire)',
              }}
            >
              <motion.div
                animate={{ color }}
                style={{ width: '22px', fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: 700, flexShrink: 0, color }}
              >
                {icon}
              </motion.div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 600,
                    fontSize: '14px',
                    color: result === 'pending' || result === 'skipped' ? 'var(--ink-3)' : 'var(--ink)',
                  }}
                >
                  {gate.label}
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--ink-4)' }}>
                  {gate.tool}
                </div>
              </div>
              {result === 'pass' && (
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', color: 'var(--signal)', fontWeight: 700 }}>
                  PASSED
                </span>
              )}
              {result === 'fail' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', color: 'var(--danger)', fontWeight: 700, letterSpacing: '0.06em' }}
                >
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
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            role={allPass ? 'status' : 'alert'}
            aria-live="polite"
            style={{
              padding: '16px 20px',
              border: `1px solid ${allPass ? 'var(--signal)' : 'var(--danger)'}`,
              background: 'var(--paper-2)',
              fontFamily: 'var(--font-sans)',
              fontSize: '14px',
              lineHeight: 1.6,
              color: 'var(--ink-2)',
              maxWidth: '480px',
              marginBottom: '20px',
            }}
          >
            {allPass ? (
              <strong style={{ color: 'var(--signal)' }}>All 4 gates passed. Build artifact verified for deployment.</strong>
            ) : (
              <>
                <strong style={{ color: 'var(--danger)' }}>Blocked at gate: {caughtGate?.label} ({caughtGate?.tool})</strong>
                <br />
                <span>
                  {errorType === 'type'
                    ? 'Caught in 4 seconds at compile time rather than causing NaN billing errors in production.'
                    : errorType === 'test'
                    ? 'Integration test suite blocked a concurrency regression that static types could not see.'
                    : errorType === 'lint'
                    ? 'Static analysis caught dead state before code review.'
                    : 'Production bundle verification halted an unresolvable runtime module.'}
                </span>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={done ? reset : runPipeline}
          disabled={running}
          className="proof-btn proof-btn-primary"
          aria-busy={running}
        >
          {running ? 'Running CI gates…' : done ? 'Reset pipeline' : 'Run pipeline'}
        </button>
      </div>
    </div>
  )
}
