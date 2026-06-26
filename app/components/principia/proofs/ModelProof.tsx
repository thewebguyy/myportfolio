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
  if (typeof payload.amount !== 'number') return { field: 'amount', error: `Expected number, got "${typeof payload.amount}"` }
  if (typeof payload.userId !== 'string') return { field: 'userId', error: `Expected string, got "${typeof payload.userId}"` }
  if (typeof payload.currency !== 'string') return { field: 'currency', error: `Expected string, got "${typeof payload.currency}"` }
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

  const handleSubmit = () => setSubmitted(true)
  const handleReset = () => {
    setSubmitted(false)
    setClientPayload(DEFAULT_CLIENT)
    setServerPayload(DEFAULT_SERVER)
    setMode('diverged')
  }

  return (
    <div style={{ borderTop: '1px solid var(--wire)', paddingTop: '48px', marginTop: '48px' }}>
      <div className="type-label mb-8" style={{ color: 'var(--ink-4)' }}>
        Interactive Proof · 02
      </div>

      {/* Schema toggle */}
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={() => { setMode('diverged'); setSubmitted(false) }}
          style={{
            fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.08em',
            textTransform: 'uppercase', padding: '8px 16px',
            background: mode === 'diverged' ? 'var(--ink)' : 'transparent',
            color: mode === 'diverged' ? 'var(--paper)' : 'var(--ink-3)',
            border: '1px solid var(--wire)', cursor: 'pointer',
          }}
        >
          Diverged types
        </button>
        <button
          onClick={() => { setMode('shared'); setSubmitted(false) }}
          style={{
            fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.08em',
            textTransform: 'uppercase', padding: '8px 16px',
            background: mode === 'shared' ? 'var(--signal)' : 'transparent',
            color: mode === 'shared' ? 'var(--paper)' : 'var(--ink-3)',
            border: `1px solid ${mode === 'shared' ? 'var(--signal)' : 'var(--wire)'}`, cursor: 'pointer',
          }}
        >
          Shared schema
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Packet editor */}
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-4)', marginBottom: '8px' }}>
            {mode === 'diverged' ? 'Client payload (frontend)' : 'Shared payload (both sides)'}
          </div>
          <textarea
            value={activePayload}
            onChange={e => mode === 'diverged' ? setClientPayload(e.target.value) : setServerPayload(e.target.value)}
            spellCheck={false}
            rows={6}
            style={{
              width: '100%', padding: '16px',
              fontFamily: 'var(--font-mono)', fontSize: '12px', lineHeight: 1.6,
              background: 'var(--paper-2)', border: `1px solid ${(validationError || parseError) ? '#d63030' : 'var(--wire)'}`,
              color: 'var(--ink-2)', resize: 'vertical', outline: 'none',
            }}
          />
        </div>

        {/* Schema */}
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-4)', marginBottom: '8px' }}>
            Schema (Zod contract)
          </div>
          <pre style={{
            padding: '16px', fontFamily: 'var(--font-mono)', fontSize: '12px', lineHeight: 1.6,
            background: 'var(--paper-2)', border: '1px solid var(--wire)', color: 'var(--ink-3)', margin: 0, overflow: 'auto',
          }}>
            {SCHEMA}
          </pre>
        </div>
      </div>

      {/* Validation result */}
      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{
              padding: '16px 20px',
              border: `1px solid ${(validationError || parseError) ? '#d63030' : 'var(--signal)'}`,
              background: 'var(--paper-2)',
              marginBottom: '24px',
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              lineHeight: 1.65,
            }}
          >
            {parseError && (
              <span style={{ color: '#d63030' }}>Parse error: {parseError}</span>
            )}
            {validationError && !parseError && (
              <>
                <span style={{ color: '#d63030' }}>
                  Validation failed at <code style={{ fontWeight: 700 }}>{validationError.field}</code>:{' '}
                  {validationError.error}
                </span>
                {mode === 'diverged' && (
                  <div style={{ marginTop: '8px', color: 'var(--ink-3)' }}>
                    The server rejected it. The client never knew it sent the wrong type.
                    {' '}<span style={{ color: 'var(--ink-2)' }}>This is a runtime bug.</span>
                  </div>
                )}
              </>
            )}
            {!validationError && !parseError && (
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
          <button
            onClick={handleSubmit}
            style={{
              fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.1em',
              textTransform: 'uppercase', padding: '12px 28px',
              background: 'var(--ink)', color: 'var(--paper)',
              border: '1px solid var(--ink)', cursor: 'pointer',
            }}
          >
            Send to server
          </button>
        ) : (
          <button
            onClick={handleReset}
            style={{
              fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.1em',
              textTransform: 'uppercase', padding: '12px 28px',
              background: 'transparent', color: 'var(--ink-3)',
              border: '1px solid var(--wire)', cursor: 'pointer',
            }}
          >
            Reset
          </button>
        )}
      </div>
    </div>
  )
}
