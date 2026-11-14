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
  try {
    return JSON.parse(raw)
  } catch {
    return null
  }
}

function validateAgainstSchema(payload: Record<string, unknown>): { field: string; error: string } | null {
  if (typeof payload.amount !== 'number') return { field: 'amount', error: 'Expected number, got string' }
  if (typeof payload.userId !== 'string') return { field: 'userId', error: 'Expected string' }
  if (typeof payload.currency !== 'string') return { field: 'currency', error: 'Expected string' }
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
    <div className="proof-shell">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div className="type-label" style={{ color: 'var(--ink-2)', fontWeight: 700 }}>
          Interactive Proof · 02 — Shared Domain &amp; Boundary Validation
        </div>
        <span className="pill-tag">Simulated Model · Servia &amp; Subscription Manager</span>
      </div>

      <div className="proof-guide">
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, color: 'var(--signal)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '4px' }}>
          What to observe
        </div>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', lineHeight: 1.55, color: 'var(--ink-2)', margin: 0 }}>
          Compare <strong>Diverged types</strong> (where the frontend sends <code>&quot;amount&quot;: &quot;100&quot;</code> as a string) against <strong>Shared schema</strong> (where <code>@packages/shared</code> and Zod enforce <code>number</code>). You can also edit the JSON payload directly and click <strong>Send to server</strong>.
        </p>
      </div>

      {/* Mode toggle */}
      <div className="flex flex-wrap gap-3 mb-6" role="group" aria-label="Schema mode">
        <button
          type="button"
          onClick={() => {
            setMode('diverged')
            setSubmitted(false)
          }}
          aria-pressed={mode === 'diverged'}
          className={`proof-btn ${mode === 'diverged' ? 'proof-btn-primary' : 'proof-btn-ghost'}`}
        >
          Diverged types
        </button>
        <button
          type="button"
          onClick={() => {
            setMode('shared')
            setSubmitted(false)
          }}
          aria-pressed={mode === 'shared'}
          className={`proof-btn ${mode === 'shared' ? 'proof-btn-signal' : 'proof-btn-ghost'}`}
        >
          Shared schema
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6" style={{ maxWidth: '680px' }}>
        <div>
          <label
            htmlFor="model-proof-payload"
            style={{
              display: 'block',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--ink-3)',
              marginBottom: '8px',
            }}
          >
            {mode === 'diverged' ? 'Client payload (untyped string amount)' : 'Shared payload (@packages/shared)'}
          </label>
          <textarea
            id="model-proof-payload"
            value={activePayload}
            onChange={e => (mode === 'diverged' ? setClientPayload(e.target.value) : setServerPayload(e.target.value))}
            spellCheck={false}
            rows={6}
            aria-label="JSON payload"
            style={{
              width: '100%',
              padding: '14px',
              fontFamily: 'var(--font-mono)',
              fontSize: '12.5px',
              lineHeight: 1.6,
              background: 'var(--paper-2)',
              border: `1px solid ${validationError || parseError ? 'var(--danger)' : 'var(--wire-strong)'}`,
              color: 'var(--ink)',
              resize: 'vertical',
            }}
          />
        </div>
        <div>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--ink-3)',
              marginBottom: '8px',
            }}
          >
            Schema (Zod contract at API boundary)
          </div>
          <pre
            aria-label="Expected schema"
            style={{
              padding: '14px',
              fontFamily: 'var(--font-mono)',
              fontSize: '12.5px',
              lineHeight: 1.6,
              background: 'var(--paper-2)',
              border: '1px solid var(--wire)',
              color: 'var(--ink-2)',
              margin: 0,
              overflow: 'auto',
              minHeight: '150px',
            }}
          >
            {SCHEMA}
          </pre>
        </div>
      </div>

      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            role={valid ? 'status' : 'alert'}
            aria-live="polite"
            style={{
              padding: '16px 20px',
              border: `1px solid ${valid ? 'var(--signal)' : 'var(--danger)'}`,
              background: 'var(--paper-2)',
              marginBottom: '20px',
              maxWidth: '680px',
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              lineHeight: 1.65,
            }}
          >
            {parseError && <span style={{ color: 'var(--danger)', fontWeight: 700 }}>Parse error: {parseError}</span>}
            {validationError && !parseError && (
              <>
                <span style={{ color: 'var(--danger)', fontWeight: 700 }}>
                  Validation failed at <code>{validationError.field}</code>: {validationError.error}
                </span>
                {mode === 'diverged' && (
                  <div style={{ marginTop: '6px', color: 'var(--ink-2)', fontFamily: 'var(--font-sans)', fontSize: '14px' }}>
                    The client sent a string. The server expected a number. Without a shared schema, this produces silent <code>NaN</code> in billing calculations.
                  </div>
                )}
              </>
            )}
            {valid && (
              <span style={{ color: 'var(--signal)', fontWeight: 700 }}>
                Valid contract. Both client and API enforce the identical type shape at build and runtime.
              </span>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-wrap gap-3">
        <button type="button" onClick={() => setSubmitted(true)} className="proof-btn proof-btn-primary">
          Send to server
        </button>
        {submitted && (
          <button type="button" onClick={reset} className="proof-btn proof-btn-ghost">
            Reset
          </button>
        )}
      </div>
    </div>
  )
}
