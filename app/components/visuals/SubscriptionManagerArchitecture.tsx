import React from 'react'

/**
 * Subscription Manager Architecture Diagram Component
 * Depicts only what the public repository contains: a Python/Flask app whose
 * routes wrap the Seerbit subscription SDK. No database, queue, idempotency
 * ledger, Stripe adapter, or reconciliation worker is implied.
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
            System Architecture · Public SDK Demo
          </div>
          <h3 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 'clamp(18px, 2vw, 22px)', color: 'var(--ink)', letterSpacing: '-0.02em' }}>
            Seerbit Subscription SDK Demonstration
          </h3>
        </div>
        <div className="flex flex-wrap gap-4" style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--ink-3)' }}>
          <div className="flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 flex-shrink-0" style={{ background: 'var(--ink)' }} />
            <span>HTTP request</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 flex-shrink-0" style={{ background: 'var(--signal)' }} />
            <span>Seerbit SDK call</span>
          </div>
        </div>
      </div>

      <div
        className="w-full max-w-full overflow-x-auto"
        style={{ background: 'var(--paper)', border: '1px solid var(--wire)', WebkitOverflowScrolling: 'touch' }}
        tabIndex={0}
        role="region"
        aria-label="Scrollable Subscription Manager public Flask SDK demonstration diagram"
      >
        <svg
          viewBox="0 0 840 410"
          className="w-full min-w-[640px] h-auto block"
          role="img"
          aria-label="Subscription Manager public demo diagram showing an HTTP client, a Flask app with six Seerbit subscription routes, the Seerbit SDK, and the remote Seerbit API. No database or reconciliation worker is present."
        >
          <defs>
            <marker id="sm-arrow-ink" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
              <path d="M0,1 L7,4 L0,7 Z" fill="#262422" />
            </marker>
            <marker id="sm-arrow-signal" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
              <path d="M0,1 L7,4 L0,7 Z" fill="#c83605" />
            </marker>
          </defs>

          {/* Header band */}
          <rect x="0" y="0" width="840" height="36" fill="#edeae4" />
          <line x1="0" y1="36" x2="840" y2="36" stroke="rgba(13,13,13,0.16)" strokeWidth="1" />
          <text x="28" y="23" fill="#4d4843" fontSize="10" fontFamily="monospace" letterSpacing="1.2">
            01 · PUBLIC DEMO ROUTE FLOW
          </text>
          <text x="812" y="23" textAnchor="end" fill="#c83605" fontSize="10" fontFamily="monospace" letterSpacing="1.2">
            PYTHON / FLASK
          </text>

          {/* Client */}
          <g transform="translate(28, 132)">
            <rect x="0" y="0" width="150" height="132" fill="#f5f2ed" stroke="#0d0d0d" strokeWidth="1.25" />
            <text x="14" y="26" fill="#0d0d0d" fontSize="12" fontWeight="700" fontFamily="sans-serif">
              HTTP Client
            </text>
            <text x="14" y="48" fill="#4d4843" fontSize="10" fontFamily="monospace">
              endpoint request
            </text>
            <text x="14" y="66" fill="#4d4843" fontSize="10" fontFamily="monospace">
              placeholder IDs
            </text>
            <text x="14" y="96" fill="#635d57" fontSize="9.5" fontFamily="monospace">
              No auth layer
            </text>
            <text x="14" y="112" fill="#635d57" fontSize="9.5" fontFamily="monospace">
              documented here
            </text>
          </g>

          <line x1="178" y1="198" x2="220" y2="198" stroke="#262422" strokeWidth="1.25" markerEnd="url(#sm-arrow-ink)" />

          {/* Flask app */}
          <g transform="translate(222, 92)">
            <rect x="0" y="0" width="250" height="212" fill="#f5f2ed" stroke="#0d0d0d" strokeWidth="1.4" />
            <rect x="0" y="0" width="250" height="34" fill="#edeae4" />
            <text x="14" y="22" fill="#0d0d0d" fontSize="12" fontWeight="700" fontFamily="sans-serif">
              Flask app · subscriptions.py
            </text>
            <text x="14" y="58" fill="#262422" fontSize="10.5" fontFamily="monospace">
              POST /create-subscription
            </text>
            <text x="14" y="78" fill="#262422" fontSize="10.5" fontFamily="monospace">
              POST /charge-subscription
            </text>
            <text x="14" y="98" fill="#262422" fontSize="10.5" fontFamily="monospace">
              GET  /get-customer-subscriptions
            </text>
            <text x="14" y="118" fill="#262422" fontSize="10.5" fontFamily="monospace">
              PUT  /update-customer-subscriptions
            </text>
            <text x="14" y="138" fill="#262422" fontSize="10.5" fontFamily="monospace">
              POST /validate-otp
            </text>
            <text x="14" y="158" fill="#262422" fontSize="10.5" fontFamily="monospace">
              GET  /get-merchant-subscriptions
            </text>
            <line x1="14" y1="172" x2="236" y2="172" stroke="rgba(13,13,13,0.14)" strokeWidth="1" />
            <text x="14" y="194" fill="#635d57" fontSize="9.5" fontFamily="monospace">
              One route → one SDK call
            </text>
          </g>

          <line x1="472" y1="198" x2="514" y2="198" stroke="#c83605" strokeWidth="1.5" markerEnd="url(#sm-arrow-signal)" />

          {/* Seerbit SDK */}
          <g transform="translate(516, 146)">
            <rect x="0" y="0" width="130" height="104" fill="#f5f2ed" stroke="#c83605" strokeWidth="1.4" />
            <text x="14" y="26" fill="#c83605" fontSize="12" fontWeight="700" fontFamily="sans-serif">
              Seerbit SDK
            </text>
            <text x="14" y="48" fill="#4d4843" fontSize="10" fontFamily="monospace">
              seerbit.*
            </text>
            <text x="14" y="66" fill="#4d4843" fontSize="10" fontFamily="monospace">
              subscription
            </text>
            <text x="14" y="84" fill="#4d4843" fontSize="10" fontFamily="monospace">
              calls
            </text>
          </g>

          <line x1="646" y1="198" x2="688" y2="198" stroke="#c83605" strokeWidth="1.5" markerEnd="url(#sm-arrow-signal)" />

          {/* Seerbit API */}
          <g transform="translate(690, 146)">
            <rect x="0" y="0" width="124" height="104" fill="#f5f2ed" stroke="#0d0d0d" strokeWidth="1.25" />
            <text x="14" y="26" fill="#0d0d0d" fontSize="12" fontWeight="700" fontFamily="sans-serif">
              Seerbit API
            </text>
            <text x="14" y="48" fill="#4d4843" fontSize="10" fontFamily="monospace">
              remote
            </text>
            <text x="14" y="66" fill="#4d4843" fontSize="10" fontFamily="monospace">
              gateway
            </text>
          </g>

          {/* Scope note */}
          <rect x="28" y="330" width="786" height="48" fill="#edeae4" stroke="rgba(13,13,13,0.14)" strokeWidth="1" />
          <text x="44" y="350" fill="#262422" fontSize="10.5" fontWeight="700" fontFamily="monospace">
            PUBLIC DEMO ONLY
          </text>
          <text x="44" y="368" fill="#4d4843" fontSize="10" fontFamily="monospace">
            No database, queue, idempotency ledger, Stripe adapter, webhook verifier, or reconciliation worker.
          </text>
        </svg>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 pt-6" style={{ borderTop: '1px solid var(--wire)' }}>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, color: 'var(--ink)', marginBottom: '4px' }}>
            01 · Six HTTP Routes
          </div>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '13.5px', lineHeight: 1.6, color: 'var(--ink-3)' }}>
            Create, charge, update, OTP, customer query, and merchant query endpoints.
          </p>
        </div>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, color: 'var(--ink)', marginBottom: '4px' }}>
            02 · SDK Boundary
          </div>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '13.5px', lineHeight: 1.6, color: 'var(--ink-3)' }}>
            Each Flask route maps to a Seerbit SDK call. Credentials are placeholders.
          </p>
        </div>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, color: 'var(--ink)', marginBottom: '4px' }}>
            03 · Evidence Scope
          </div>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '13.5px', lineHeight: 1.6, color: 'var(--ink-3)' }}>
            The public repository is an integration reference, not a production billing engine.
          </p>
        </div>
      </div>
    </div>
  )
}
