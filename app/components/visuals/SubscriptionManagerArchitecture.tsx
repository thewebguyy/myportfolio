import React from 'react'

/**
 * Subscription Manager Architecture Diagram Component
 * Illustrates the atomic PostgreSQL idempotency lock, Zod boundary validation,
 * Seerbit/Stripe gateway dispatch, and asynchronous webhook reconciliation pipeline.
 */
export default function SubscriptionManagerArchitecture() {
  return (
    <div
      className="w-full max-w-full min-w-0 p-4 sm:p-8 overflow-hidden"
      style={{ background: 'var(--paper-2)', border: '1px solid var(--wire)' }}
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 pb-5" style={{ borderBottom: '1px solid var(--wire)' }}>
        <div className="min-w-0">
          <div className="type-label mb-1" style={{ color: 'var(--signal)' }}>
            System Architecture · Idempotency &amp; Webhook Reconciliation
          </div>
          <h3 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 'clamp(18px, 2vw, 22px)', color: 'var(--ink)', letterSpacing: '-0.02em' }}>
            Subscription Manager Atomic Payment &amp; Retry Pipeline
          </h3>
        </div>
        <div className="flex flex-wrap gap-4" style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--ink-3)' }}>
          <div className="flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 flex-shrink-0" style={{ background: 'var(--ink)' }} />
            <span>First Charge Execution</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 flex-shrink-0" style={{ background: 'var(--signal)' }} />
            <span>Idempotent Replay / Reconciliation</span>
          </div>
        </div>
      </div>

      <div
        className="w-full max-w-full overflow-x-auto"
        style={{ background: 'var(--paper)', border: '1px solid var(--wire)', WebkitOverflowScrolling: 'touch' }}
        tabIndex={0}
        role="region"
        aria-label="Scrollable Subscription Manager atomic payment and retry pipeline diagram"
      >
        <svg
          viewBox="0 0 840 410"
          className="w-full min-w-[640px] h-auto block"
          role="img"
          aria-label="Subscription Manager architecture diagram showing Zod schema boundary, PostgreSQL atomic idempotency lock, Seerbit and Stripe gateway dispatch, and webhook reconciliation worker"
        >
          <defs>
            <marker id="sm-arrow-ink" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
              <path d="M0,1 L7,4 L0,7 Z" fill="#262422" />
            </marker>
            <marker id="sm-arrow-signal" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
              <path d="M0,1 L7,4 L0,7 Z" fill="#c83605" />
            </marker>
          </defs>

          {/* Header Bar */}
          <rect x="0" y="0" width="840" height="36" fill="#edeae4" />
          <line x1="0" y1="36" x2="840" y2="36" stroke="rgba(13,13,13,0.16)" strokeWidth="1" />
          <line x1="255" y1="0" x2="255" y2="410" stroke="rgba(13,13,13,0.14)" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="555" y1="0" x2="555" y2="410" stroke="rgba(13,13,13,0.14)" strokeWidth="1" strokeDasharray="4 4" />

          <text x="128" y="23" textAnchor="middle" fill="#4d4843" fontSize="10" fontFamily="monospace" letterSpacing="1.2">
            01 · INGRESS &amp; ZOD BOUNDARY
          </text>
          <text x="405" y="23" textAnchor="middle" fill="#4d4843" fontSize="10" fontFamily="monospace" letterSpacing="1.2">
            02 · ATOMIC IDEMPOTENCY LEDGER
          </text>
          <text x="698" y="23" textAnchor="middle" fill="#4d4843" fontSize="10" fontFamily="monospace" letterSpacing="1.2">
            03 · GATEWAYS &amp; RECONCILIATION
          </text>

          {/* Column 1 */}
          <g transform="translate(28, 62)">
            <rect x="0" y="0" width="198" height="72" fill="#f5f2ed" stroke="#0d0d0d" strokeWidth="1.25" />
            <text x="14" y="23" fill="#0d0d0d" fontSize="12" fontWeight="700" fontFamily="sans-serif">
              Renewal / Charge Request
            </text>
            <text x="14" y="42" fill="#c83605" fontSize="10" fontWeight="700" fontFamily="monospace">
              Idempotency-Key: idem_7x9
            </text>
            <text x="14" y="58" fill="#635d57" fontSize="9.5" fontFamily="monospace">
              Client retry or billing cron
            </text>
          </g>

          <line x1="127" y1="134" x2="127" y2="168" stroke="#262422" strokeWidth="1.25" markerEnd="url(#sm-arrow-ink)" />

          <g transform="translate(28, 172)">
            <rect x="0" y="0" width="198" height="72" fill="#edeae4" stroke="#0d0d0d" strokeWidth="1.25" />
            <text x="14" y="23" fill="#0d0d0d" fontSize="12" fontWeight="700" fontFamily="sans-serif">
              Zod Contract Validator
            </text>
            <text x="14" y="42" fill="#262422" fontSize="10" fontFamily="monospace">
              Strict schema parse at edge
            </text>
            <text x="14" y="58" fill="#635d57" fontSize="9.5" fontFamily="monospace">
              Rejects malformed payloads (400)
            </text>
          </g>

          <g transform="translate(28, 280)">
            <rect x="0" y="0" width="198" height="84" fill="#f5f2ed" stroke="#c83605" strokeWidth="1.5" />
            <text x="14" y="23" fill="#c83605" fontSize="12" fontWeight="700" fontFamily="sans-serif">
              Cached Response Replay
            </text>
            <text x="14" y="42" fill="#262422" fontSize="10" fontFamily="monospace">
              Returns original 200 payload
            </text>
            <text x="14" y="58" fill="#4d4843" fontSize="9.5" fontFamily="monospace">
              100% duplicate retry safety
            </text>
            <text x="14" y="72" fill="#635d57" fontSize="9.5" fontFamily="monospace">
              Zero new gateway calls
            </text>
          </g>

          {/* Column 2 */}
          <line x1="226" y1="208" x2="290" y2="124" stroke="#262422" strokeWidth="1.25" markerEnd="url(#sm-arrow-ink)" />

          <g transform="translate(294, 62)">
            <rect x="0" y="0" width="224" height="96" fill="#f5f2ed" stroke="#0d0d0d" strokeWidth="1.25" />
            <text x="14" y="24" fill="#0d0d0d" fontSize="12" fontWeight="700" fontFamily="sans-serif">
              PostgreSQL Atomic Key Check
            </text>
            <text x="14" y="44" fill="#262422" fontSize="10" fontFamily="monospace">
              INSERT INTO idempotency_keys
            </text>
            <text x="14" y="60" fill="#262422" fontSize="10" fontFamily="monospace">
              ON CONFLICT (key) DO NOTHING
            </text>
            <text x="14" y="80" fill="#c83605" fontSize="9.5" fontWeight="700" fontFamily="monospace">
              Executed BEFORE gateway network I/O
            </text>
          </g>

          {/* Duplicate Key Branch */}
          <path d="M294,135 L258,135 L258,322 L226,322" stroke="#c83605" strokeWidth="1.5" fill="none" markerEnd="url(#sm-arrow-signal)" />
          <text x="275" y="265" textAnchor="middle" fill="#c83605" fontSize="9" fontWeight="700" fontFamily="monospace" transform="rotate(-90 275 265)">
            KEY EXISTS
          </text>

          {/* New Key Branch */}
          <line x1="518" y1="110" x2="588" y2="110" stroke="#262422" strokeWidth="1.25" markerEnd="url(#sm-arrow-ink)" />
          <text x="553" y="102" textAnchor="middle" fill="#262422" fontSize="9" fontWeight="700" fontFamily="monospace">
            NEW KEY
          </text>

          <g transform="translate(294, 240)">
            <rect x="0" y="0" width="224" height="124" fill="#edeae4" stroke="#0d0d0d" strokeWidth="1.25" />
            <text x="14" y="24" fill="#0d0d0d" fontSize="12" fontWeight="700" fontFamily="sans-serif">
              Subscription State Ledger
            </text>
            <text x="14" y="45" fill="#262422" fontSize="10" fontFamily="monospace">
              INITIATED → PENDING → ACTIVE
            </text>
            <text x="14" y="63" fill="#4d4843" fontSize="10" fontFamily="monospace">
              Stores gateway reference +
            </text>
            <text x="14" y="78" fill="#4d4843" fontSize="10" fontFamily="monospace">
              serialized response snapshot
            </text>
            <line x1="14" y1="92" x2="210" y2="92" stroke="rgba(13,13,13,0.14)" strokeWidth="1" />
            <text x="14" y="110" fill="#635d57" fontSize="9.5" fontFamily="monospace">
              Lock &amp; verify overhead: &lt;250ms
            </text>
          </g>

          {/* Column 3 */}
          <g transform="translate(592, 62)">
            <rect x="0" y="0" width="220" height="96" fill="#f5f2ed" stroke="#0d0d0d" strokeWidth="1.25" />
            <text x="14" y="24" fill="#0d0d0d" fontSize="12" fontWeight="700" fontFamily="sans-serif">
              Seerbit &amp; Stripe Adapters
            </text>
            <text x="14" y="44" fill="#262422" fontSize="10" fontFamily="monospace">
              Dispatches single charge call
            </text>
            <text x="14" y="60" fill="#4d4843" fontSize="10" fontFamily="monospace">
              Automatic wallet fallback on
            </text>
            <text x="14" y="76" fill="#4d4843" fontSize="10" fontFamily="monospace">
              upstream bank rail failure
            </text>
          </g>

          <line x1="702" y1="158" x2="702" y2="236" stroke="#c83605" strokeWidth="1.5" markerEnd="url(#sm-arrow-signal)" />
          <text x="752" y="200" textAnchor="middle" fill="#635d57" fontSize="9" fontFamily="monospace">
            Async / Late
          </text>

          <g transform="translate(592, 240)">
            <rect x="0" y="0" width="220" height="124" fill="#f5f2ed" stroke="#c83605" strokeWidth="1.5" />
            <text x="14" y="24" fill="#c83605" fontSize="12" fontWeight="700" fontFamily="sans-serif">
              Webhook + Reconciliation
            </text>
            <text x="14" y="45" fill="#262422" fontSize="10" fontFamily="monospace">
              1. HMAC + Zod webhook ingest
            </text>
            <text x="14" y="63" fill="#262422" fontSize="10" fontFamily="monospace">
              2. Deduplicates repeat callbacks
            </text>
            <text x="14" y="81" fill="#262422" fontSize="10" fontFamily="monospace">
              3. Polls stuck PENDING charges
            </text>
            <text x="14" y="104" fill="#635d57" fontSize="9.5" fontFamily="monospace">
              Survives 40s+ bank window delays
            </text>
          </g>

          <line x1="592" y1="302" x2="518" y2="302" stroke="#c83605" strokeWidth="1.5" markerEnd="url(#sm-arrow-signal)" />
        </svg>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 pt-6" style={{ borderTop: '1px solid var(--wire)' }}>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, color: 'var(--ink)', marginBottom: '4px' }}>
            01 · Database-First Idempotency
          </div>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '13.5px', lineHeight: 1.6, color: 'var(--ink-3)' }}>
            Idempotency keys are locked atomically in PostgreSQL before any outbound gateway request is sent, preventing race conditions across Node instances.
          </p>
        </div>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, color: 'var(--ink)', marginBottom: '4px' }}>
            02 · Zod Edge Contracts
          </div>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '13.5px', lineHeight: 1.6, color: 'var(--ink-3)' }}>
            Every inbound renewal request and gateway webhook is parsed through strict Zod schemas so malformed payloads fail loudly at the edge.
          </p>
        </div>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, color: 'var(--ink)', marginBottom: '4px' }}>
            03 · Deterministic Convergence
          </div>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '13.5px', lineHeight: 1.6, color: 'var(--ink-3)' }}>
            Whether a webhook arrives twice or drops during a bank maintenance window, the reconciliation pipeline converges the ledger to a single charge.
          </p>
        </div>
      </div>
    </div>
  )
}
