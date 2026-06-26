'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SCHEMA = `{
  "userId": "string",
  "amount": "number",
  "currency": "string"
}`

const DEFAULT_CLIENT = `{
  "userId": "usr_42",
  "amount": "100",
  "currency": "NGN"
}`

const DEFAULT_SERVER = `{
  "userId": "usr_42",
  "amount": 100,
  "currency": "NGN"
}`

type SchemaMode = 'diverged' | 'shared'

function parsePayload(raw: string): Record<string, unknown> | null {
  try { return JSON.parse(raw) } catch { return null }
}

function validateAgainstSchema(payload: Record<string, unknown>): { field: string; error: string } | null {
  if (typeof payload.amount !== 'number') return { field: 'amount', error: `Expected number, got string` }
  if (typeof payload.userId !== 'string') return { field: 'userId', error: `Expected string` }
  if (typeof payload.currency !== 'string') return { field: 'currency', error: `Expected string` }
  return null
}

export function ModelProof() {
  const [mode, setMode] = useState<SchemaMode>('diverged')
  const [clientPayload, setClientPayload] = useState(DEFAULT_CLIENT)
  const [serverPayload, setServerPayload] = useState(DEFAULT_SERVER)
  const [submitted, setSubmitted] = useState(false)

  const activePayload = mode === 'diverged' ? clientPayload : serverPayload
  const parsed = parsePayload(activePayload)
  const validationError = submitted && parsed ? validateAgainstSchema(parsed) : null
  const parseError = submitted && !parsed ? 'Invalid JSON' : null
  const valid = submitted && !validationError && !parseError

  const reset = () => {
    setSubmitted(false)
    setClientPayload(DEFAULT_CLIENT)
    setServerPayload(DEFAULT_SERVER)
    setMode('diverged')
  }

  return (
    <div style={{ borderTop: '1px solid var(--wire)', paddingTop: '48px', marginTop: '48px' }}>
      <div className="type-label mb-4" style={{ color: 'var(--ink-4)' }}>
        Interactive Proof · 02
      </div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.08em', color: 'var(--ink-4)', marginBottom: '4px' }}>
        FROM: <span style={{ color: 'var(--signal)' }}>Servia</span> · Operations Platform · 2026
      </div>

      {/* Mode toggle */}
      <div className="flex gap-3 mb-8" role="group" aria-label="Schema mode">
        <button
          type="button"
          onClick={() => { setMode('diverged'); setSubmitted(false) }}
          aria-pressed={mode === 'diverged'}
          className={`proof-btn ${mode === 'diverged' ? 'proof-btn-primary' : 'proof-btn-ghost'}`}
        >
          Diverged types
        </button>
        <button
          type="button"
          onClick={() => { setMode('shared'); setSubmitted(false) }}
          aria-pressed={mode === 'shared'}
          className={`proof-btn ${mode === 'shared' ? 'proof-btn-signal' : 'proof-btn-ghost'}`}
        >
          Shared schema
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-4)', marginBottom: '8px' }}>
            {mode === 'diverged' ? 'Client payload (frontend)' : 'Shared payload (both sides)'}
          </div>
          <textarea
            value={activePayload}
            onChange={e => mode === 'diverged' ? setClientPayload(e.target.value) : setServerPayload(e.target.value)}
            spellCheck={false}
            rows={6}
            aria-label="JSON payload"
            style={{
              width: '100%', padding: '16px',
              fontFamily: 'var(--font-mono)', fontSize: '12px', lineHeight: 1.6,
              background: 'var(--paper-2)',
              border: `1px solid ${(validationError || parseError) ? '#d63030' : 'var(--wire)'}`,
              color: 'var(--ink-2)', resize: 'vertical', outline: 'none',
            }}
          />
        </div>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-4)', marginBottom: '8px' }}>
            Schema (Zod contract)
          </div>
          <pre aria-label="Expected schema" style={{ padding: '16px', fontFamily: 'var(--font-mono)', fontSize: '12px', lineHeight: 1.6, background: 'var(--paper-2)', border: '1px solid var(--wire)', color: 'var(--ink-3)', margin: 0, overflow: 'auto' }}>
            {SCHEMA}
          </pre>
        </div>
      </div>

      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            role={valid ? 'status' : 'alert'}
            aria-live="polite"
            style={{ padding: '16px 20px', border: `1px solid ${valid ? 'var(--signal)' : '#d63030'}`, background: 'var(--paper-2)', marginBottom: '24px', fontFamily: 'var(--font-mono)', fontSize: '12px', lineHeight: 1.65 }}
          >
            {parseError && <span style={{ color: '#d63030' }}>Parse error: {parseError}</span>}
            {validationError && !parseError && (
              <>
                <span style={{ color: '#d63030' }}>
                  Validation failed at <code style={{ fontWeight: 700 }}>{validationError.field}</code>: {validationError.error}
                </span>
                {mode === 'diverged' && (
                  <div style={{ marginTop: '8px', color: 'var(--ink-3)' }}>
                    The client sent a string. The server expected a number.{' '}
                    <span style={{ color: 'var(--ink-2)' }}>This is a runtime bug.</span>
                  </div>
                )}
              </>
            )}
            {valid && (
              <span style={{ color: 'var(--signal)' }}>
                Valid. Both sides agree on the shape.{' '}
                <span style={{ color: 'var(--ink-3)' }}>The schema caught divergence at the boundary.</span>
              </span>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex gap-4">
        {!submitted ? (
          <button type="button" onClick={() => setSubmitted(true)} className="proof-btn proof-btn-primary">
            Send to server
          </button>
        ) : (
          <button type="button" onClick={reset} className="proof-btn proof-btn-ghost">
            Reset
          </button>
        )}
      </div>
    </div>
  )
}
