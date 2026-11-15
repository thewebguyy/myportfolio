import React from 'react'

/**
 * Servia Concurrency & Transaction Isolation Flow Diagram
 * Warm editorial paper & ink schematic matching the Principia design system.
 */
export default function ServiaArchitecture() {
  return (
    <div
      className="w-full max-w-full min-w-0 p-4 sm:p-8 overflow-hidden"
      style={{ background: 'var(--paper-2)', border: '1px solid var(--wire)' }}
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 pb-5" style={{ borderBottom: '1px solid var(--wire)' }}>
        <div className="min-w-0">
          <div className="type-label mb-1" style={{ color: 'var(--signal)' }}>
            System Architecture · Concurrency &amp; Isolation
          </div>
          <h3 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 'clamp(18px, 2vw, 22px)', color: 'var(--ink)', letterSpacing: '-0.02em' }}>
            Servia Reservation Transaction Flow (PostgreSQL SERIALIZABLE)
          </h3>
        </div>
        <div className="flex flex-wrap gap-4" style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--ink-3)' }}>
          <div className="flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 flex-shrink-0" style={{ background: 'var(--ink)' }} />
            <span>Commit Path (201)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 flex-shrink-0" style={{ background: 'var(--signal)' }} />
            <span>P2034 Conflict → 409 Retry</span>
          </div>
        </div>
      </div>

      {/* Responsive SVG Schematic */}
      <div
        className="w-full max-w-full overflow-x-auto"
        style={{ background: 'var(--paper)', border: '1px solid var(--wire)', WebkitOverflowScrolling: 'touch' }}
        tabIndex={0}
        role="region"
        aria-label="Scrollable Servia reservation transaction flow diagram"
      >
        <svg
          viewBox="0 0 840 430"
          className="w-full min-w-[640px] h-auto block"
          role="img"
          aria-label="Servia architecture diagram showing Next.js client, Express and Prisma SERIALIZABLE transaction layer, and PostgreSQL 15 MVCC conflict detection"
        >
          <defs>
            <marker id="servia-arrow-ink" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
              <path d="M0,1 L7,4 L0,7 Z" fill="#262422" />
            </marker>
            <marker id="servia-arrow-signal" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
              <path d="M0,1 L7,4 L0,7 Z" fill="#c83605" />
            </marker>
          </defs>

          {/* Column Headers */}
          <rect x="0" y="0" width="840" height="36" fill="#edeae4" />
          <line x1="0" y1="36" x2="840" y2="36" stroke="rgba(13,13,13,0.16)" strokeWidth="1" />
          <line x1="255" y1="0" x2="255" y2="430" stroke="rgba(13,13,13,0.14)" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="555" y1="0" x2="555" y2="430" stroke="rgba(13,13,13,0.14)" strokeWidth="1" strokeDasharray="4 4" />

          <text x="128" y="23" textAnchor="middle" fill="#4d4843" fontSize="10" fontFamily="monospace" letterSpacing="1.2">
            01 · CLIENT (NEXT.JS + SHARED TYPES)
          </text>
          <text x="405" y="23" textAnchor="middle" fill="#4d4843" fontSize="10" fontFamily="monospace" letterSpacing="1.2">
            02 · API TIER (EXPRESS + PRISMA ORM)
          </text>
          <text x="698" y="23" textAnchor="middle" fill="#4d4843" fontSize="10" fontFamily="monospace" letterSpacing="1.2">
            03 · DATA TIER (POSTGRESQL 15 + REDIS)
          </text>

          {/* Step 1: Client Submit */}
          <g transform="translate(32, 62)">
            <rect x="0" y="0" width="190" height="64" fill="#f5f2ed" stroke="#0d0d0d" strokeWidth="1.25" />
            <text x="14" y="24" fill="#0d0d0d" fontSize="12" fontWeight="700" fontFamily="sans-serif">
              POST /api/reservations
            </text>
            <text x="14" y="42" fill="#4d4843" fontSize="10" fontFamily="monospace">
              Idempotency-Key + Shared DTO
            </text>
            <text x="14" y="55" fill="#635d57" fontSize="9.5" fontFamily="monospace">
              @packages/shared contract
            </text>
          </g>

          <line x1="222" y1="94" x2="292" y2="94" stroke="#262422" strokeWidth="1.25" markerEnd="url(#servia-arrow-ink)" />
          <text x="257" y="86" textAnchor="middle" fill="#635d57" fontSize="9" fontFamily="monospace">JSON</text>

          {/* Step 2: Express + Prisma Transaction */}
          <g transform="translate(296, 56)">
            <rect x="0" y="0" width="220" height="76" fill="#edeae4" stroke="#0d0d0d" strokeWidth="1.25" />
            <text x="14" y="22" fill="#0d0d0d" fontSize="12" fontWeight="700" fontFamily="sans-serif">
              Begin Serializable Tx
            </text>
            <text x="14" y="41" fill="#262422" fontSize="10" fontFamily="monospace">
              prisma.$transaction(fn, &#123;
            </text>
            <text x="14" y="55" fill="#c83605" fontSize="10" fontWeight="700" fontFamily="monospace">
              {'  isolationLevel: "Serializable"'}
            </text>
            <text x="14" y="68" fill="#262422" fontSize="10" fontFamily="monospace">
              &#125;)
            </text>
          </g>

          <line x1="516" y1="94" x2="588" y2="94" stroke="#262422" strokeWidth="1.25" markerEnd="url(#servia-arrow-ink)" />
          <text x="552" y="86" textAnchor="middle" fill="#635d57" fontSize="9" fontFamily="monospace">1. Read</text>

          {/* Step 3: Postgres Capacity Aggregate */}
          <g transform="translate(592, 56)">
            <rect x="0" y="0" width="216" height="76" fill="#f5f2ed" stroke="#0d0d0d" strokeWidth="1.25" />
            <text x="14" y="22" fill="#0d0d0d" fontSize="12" fontWeight="700" fontFamily="sans-serif">
              SIREAD Predicate Lock
            </text>
            <text x="14" y="41" fill="#4d4843" fontSize="10" fontFamily="monospace">
              SELECT SUM(party_size)
            </text>
            <text x="14" y="55" fill="#4d4843" fontSize="10" fontFamily="monospace">
              WHERE slot = $1
            </text>
            <text x="14" y="68" fill="#635d57" fontSize="9.5" fontFamily="monospace">
              Registers dependency in MVCC
            </text>
          </g>

          {/* Step 4: Evaluate & Insert */}
          <line x1="700" y1="132" x2="700" y2="168" stroke="#262422" strokeWidth="1.25" markerEnd="url(#servia-arrow-ink)" />
          <g transform="translate(592, 172)">
            <rect x="0" y="0" width="216" height="72" fill="#edeae4" stroke="#0d0d0d" strokeWidth="1.25" />
            <text x="14" y="22" fill="#0d0d0d" fontSize="12" fontWeight="700" fontFamily="sans-serif">
              Concurrent Write Check
            </text>
            <text x="14" y="41" fill="#262422" fontSize="10" fontFamily="monospace">
              Did another tx commit to slot
            </text>
            <text x="14" y="56" fill="#262422" fontSize="10" fontFamily="monospace">
              since our snapshot began?
            </text>
          </g>

          {/* Branch A: No Conflict -> Commit 201 */}
          <path d="M592,208 L516,208" stroke="#262422" strokeWidth="1.25" fill="none" markerEnd="url(#servia-arrow-ink)" />
          <text x="554" y="200" textAnchor="middle" fill="#262422" fontSize="9" fontWeight="700" fontFamily="monospace">
            NO CONFLICT
          </text>

          <g transform="translate(296, 176)">
            <rect x="0" y="0" width="220" height="64" fill="#f5f2ed" stroke="#0d0d0d" strokeWidth="1.25" />
            <text x="14" y="24" fill="#0d0d0d" fontSize="12" fontWeight="700" fontFamily="sans-serif">
              Commit Reservation
            </text>
            <text x="14" y="43" fill="#4d4843" fontSize="10" fontFamily="monospace">
              Serializable commit → 201 Created
            </text>
          </g>

          <line x1="296" y1="208" x2="222" y2="208" stroke="#262422" strokeWidth="1.25" markerEnd="url(#servia-arrow-ink)" />
          <g transform="translate(32, 176)">
            <rect x="0" y="0" width="190" height="64" fill="#f5f2ed" stroke="#0d0d0d" strokeWidth="1.25" />
            <text x="14" y="24" fill="#0d0d0d" fontSize="12" fontWeight="700" fontFamily="sans-serif">
              201 Booking Confirmed
            </text>
            <text x="14" y="43" fill="#4d4843" fontSize="10" fontFamily="monospace">
              Capacity check passed
            </text>
          </g>

          {/* Branch B: Conflict -> P2034 -> HTTP 409 */}
          <line x1="700" y1="244" x2="700" y2="304" stroke="#c83605" strokeWidth="1.5" markerEnd="url(#servia-arrow-signal)" />
          <text x="748" y="278" textAnchor="middle" fill="#c83605" fontSize="9.5" fontWeight="700" fontFamily="monospace">
            RW CONFLICT
          </text>

          <g transform="translate(592, 308)">
            <rect x="0" y="0" width="216" height="72" fill="#f5f2ed" stroke="#c83605" strokeWidth="1.5" />
            <text x="14" y="24" fill="#c83605" fontSize="12" fontWeight="700" fontFamily="sans-serif">
              Serialization Abort
            </text>
            <text x="14" y="43" fill="#262422" fontSize="10" fontFamily="monospace">
              Postgres rollback → Prisma P2034
            </text>
            <text x="14" y="58" fill="#635d57" fontSize="9.5" fontFamily="monospace">
              Conflicting write is aborted
            </text>
          </g>

          <line x1="592" y1="344" x2="516" y2="344" stroke="#c83605" strokeWidth="1.5" markerEnd="url(#servia-arrow-signal)" />
          <g transform="translate(296, 308)">
            <rect x="0" y="0" width="220" height="72" fill="#f5f2ed" stroke="#c83605" strokeWidth="1.5" />
            <text x="14" y="24" fill="#0d0d0d" fontSize="12" fontWeight="700" fontFamily="sans-serif">
              Boundary Error Mapper
            </text>
            <text x="14" y="43" fill="#c83605" fontSize="10" fontWeight="700" fontFamily="monospace">
              Maps P2034 → HTTP 409 Conflict
            </text>
            <text x="14" y="58" fill="#4d4843" fontSize="9.5" fontFamily="monospace">
              code: &quot;CONCURRENCY_CONFLICT&quot;
            </text>
          </g>

          <line x1="296" y1="344" x2="222" y2="344" stroke="#c83605" strokeWidth="1.5" markerEnd="url(#servia-arrow-signal)" />
          <g transform="translate(32, 308)">
            <rect x="0" y="0" width="190" height="72" fill="#f5f2ed" stroke="#c83605" strokeWidth="1.5" />
            <text x="14" y="24" fill="#c83605" fontSize="12" fontWeight="700" fontFamily="sans-serif">
              Client Receives 409
            </text>
            <text x="14" y="43" fill="#262422" fontSize="10" fontFamily="monospace">
              Can retry or choose a slot
            </text>
            <text x="14" y="58" fill="#635d57" fontSize="9.5" fontFamily="monospace">
              No double-booking committed
            </text>
          </g>
        </svg>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 pt-6" style={{ borderTop: '1px solid var(--wire)' }}>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, color: 'var(--ink)', marginBottom: '4px' }}>
            01 · Shared Contract Boundary
          </div>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '13.5px', lineHeight: 1.6, color: 'var(--ink-3)' }}>
            Request and response types are shared through <code>@servia/shared</code>; the capacity check runs inside the transaction.
          </p>
        </div>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, color: 'var(--ink)', marginBottom: '4px' }}>
            02 · Predicate Dependency Tracking
          </div>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '13.5px', lineHeight: 1.6, color: 'var(--ink-3)' }}>
            PostgreSQL <code>SERIALIZABLE</code> isolation monitors the aggregate seat sum query so concurrent writes to the same dining slot cannot both commit stale reads.
          </p>
        </div>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, color: 'var(--ink)', marginBottom: '4px' }}>
            03 · Deterministic Conflict Recovery
          </div>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '13.5px', lineHeight: 1.6, color: 'var(--ink-3)' }}>
            Racing writes surface as <code>P2034</code> and map to structured HTTP <code>409</code> responses. No load-test rate is claimed because the public repository does not include the artifacts.
          </p>
        </div>
      </div>
    </div>
  )
}
