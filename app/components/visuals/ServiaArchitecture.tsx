'use client'

import React from 'react'

/**
 * Servia Concurrency & Transaction Isolation Flow Diagram
 * Represents the Postgres SERIALIZABLE booking lifecycle, conflict detection, and client retry handler.
 */
export default function ServiaArchitecture() {
  return (
    <div className="w-full mt-12 mb-16 p-8 glass rounded-3xl border border-white/10 overflow-hidden bg-surface/20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h3 className="text-2xl font-bold text-white mb-2">Servia Booking Concurrency Flow</h3>
          <p className="text-gray-400 text-sm">PostgreSQL SERIALIZABLE Isolation vs. Concurrent Write Conflicts (ErrorCode P2034)</p>
        </div>
        <div className="flex gap-4 font-mono text-[11px]">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-secondary rounded-full" />
            <span className="text-gray-400">Transaction Abort / 409</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-emerald-500 rounded-full" />
            <span className="text-gray-400">Success / 201</span>
          </div>
        </div>
      </div>

      <div className="relative w-full aspect-[16/10] max-w-5xl mx-auto border border-white/5 rounded-2xl bg-black/40 p-4 overflow-x-auto">
        <svg viewBox="0 0 850 520" className="w-full min-w-[800px] h-auto">
          {/* Definitions */}
          <defs>
            <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
              <path d="M0,0 L0,6 L9,3 z" fill="#8F8174" />
            </marker>
            <linearGradient id="gradientSuccess" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#10b981', stopOpacity: 0.15 }} />
              <stop offset="100%" style={{ stopColor: '#059669', stopOpacity: 0.05 }} />
            </linearGradient>
            <linearGradient id="gradientAbort" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#ef4444', stopOpacity: 0.15 }} />
              <stop offset="100%" style={{ stopColor: '#dc2626', stopOpacity: 0.05 }} />
            </linearGradient>
          </defs>

          {/* Grid Columns Titles */}
          <text x="120" y="25" className="fill-text-muted text-[10px] font-mono font-bold uppercase tracking-widest text-center" textAnchor="middle">1. Client Tier (React SPA)</text>
          <text x="425" y="25" className="fill-text-muted text-[10px] font-mono font-bold uppercase tracking-widest text-center" textAnchor="middle">2. Application Tier (Express + Prisma)</text>
          <text x="730" y="25" className="fill-text-muted text-[10px] font-mono font-bold uppercase tracking-widest text-center" textAnchor="middle">3. Database Tier (PostgreSQL 15)</text>

          {/* Vertical Separator Lines */}
          <line x1="270" y1="40" x2="270" y2="480" stroke="rgba(245,240,235,0.06)" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="580" y1="40" x2="580" y2="480" stroke="rgba(245,240,235,0.06)" strokeWidth="1" strokeDasharray="4 4" />

          {/* Steps Flow */}

          {/* Client initiates booking */}
          <g transform="translate(40, 50)">
            <rect x="0" y="0" width="160" height="60" rx="8" className="fill-gray-950 stroke-gray-800" strokeWidth="1.5" />
            <text x="80" y="26" textAnchor="middle" className="fill-white text-[12px] font-bold font-sans">Submit Booking</text>
            <text x="80" y="44" textAnchor="middle" className="fill-text-muted text-[9px] font-mono">POST /api/reservations</text>
          </g>

          {/* Arrow Client -> Express */}
          <path d="M200,80 L320,80" stroke="#8F8174" strokeWidth="1.5" fill="none" markerEnd="url(#arrow)" />
          <text x="260" y="70" textAnchor="middle" className="fill-text-secondary text-[9px] font-mono">JSON Payload</text>

          {/* Express opens SERIALIZABLE transaction */}
          <g transform="translate(325, 50)">
            <rect x="0" y="0" width="200" height="70" rx="8" className="fill-gray-950 stroke-blue-500/30" strokeWidth="1.5" />
            <text x="100" y="26" textAnchor="middle" className="fill-white text-[12px] font-bold font-sans">Express Controller</text>
            <text x="100" y="44" textAnchor="middle" className="fill-blue-400 text-[9px] font-mono">prisma.$transaction(...,</text>
            <text x="100" y="56" textAnchor="middle" className="fill-blue-400 text-[9px] font-mono">&#123; isolationLevel: &apos;Serializable&apos; &#125;)</text>
          </g>

          {/* Arrow Express -> Postgres Read */}
          <path d="M525,85 L630,85" stroke="#8F8174" strokeWidth="1.5" fill="none" markerEnd="url(#arrow)" />
          <text x="578" y="75" textAnchor="middle" className="fill-text-secondary text-[9px] font-mono">1. Read Capacity</text>

          {/* Postgres calculates current slot seats */}
          <g transform="translate(640, 50)">
            <rect x="0" y="0" width="180" height="70" rx="8" className="fill-gray-950 stroke-gray-800" strokeWidth="1.5" />
            <text x="90" y="26" textAnchor="middle" className="fill-white text-[12px] font-bold font-sans">Capacity Check</text>
            <text x="90" y="44" textAnchor="middle" className="fill-text-muted text-[9px] font-mono">SELECT SUM(partySize)</text>
            <text x="90" y="56" textAnchor="middle" className="fill-text-muted text-[9px] font-mono">WHERE time = target_slot</text>
          </g>

          {/* Arrow Postgres -> Express response */}
          <path d="M640,110 L525,110" stroke="#8F8174" strokeWidth="1" strokeDasharray="3 3" fill="none" markerEnd="url(#arrow)" />
          <text x="578" y="125" textAnchor="middle" className="fill-text-secondary text-[8px] font-mono">Returns Current Sum</text>

          {/* Express validates sum */}
          <g transform="translate(325, 145)">
            <rect x="0" y="0" width="200" height="50" rx="8" className="fill-gray-950 stroke-gray-800" strokeWidth="1.5" />
            <text x="100" y="24" textAnchor="middle" className="fill-white text-[11px] font-sans">Evaluate Capacity Limit</text>
            <text x="100" y="40" textAnchor="middle" className="fill-text-muted text-[9px] font-mono">Sum + Party Size &lt;= 50</text>
          </g>

          {/* Arrow Express -> Postgres Write */}
          <path d="M525,170 L630,170" stroke="#8F8174" strokeWidth="1.5" fill="none" markerEnd="url(#arrow)" />
          <text x="578" y="160" textAnchor="middle" className="fill-text-secondary text-[9px] font-mono">2. Write Rows</text>

          {/* Postgres inserts reservation row and checks conflicts */}
          <g transform="translate(640, 145)">
            <rect x="0" y="0" width="180" height="90" rx="8" className="fill-gray-950 stroke-blue-500/40" strokeWidth="1.5" />
            <text x="90" y="26" textAnchor="middle" className="fill-white text-[12px] font-bold font-sans">PostgreSQL MVCC</text>
            <text x="90" y="44" textAnchor="middle" className="fill-text-muted text-[9px] font-mono">INSERT INTO reservation</text>
            <text x="90" y="60" textAnchor="middle" className="fill-blue-300 text-[9px] font-mono font-semibold">Track Read-Write Set</text>
            <text x="90" y="74" textAnchor="middle" className="fill-blue-300/80 text-[8px] font-mono">Monitor concurrent commits</text>
          </g>

          {/* Decision Node: Conflict Detected? */}
          <g transform="translate(680, 270)">
            <polygon points="50,0 100,30 50,60 0,30" className="fill-gray-900 stroke-gray-700" strokeWidth="1.5" />
            <text x="50" y="34" textAnchor="middle" className="fill-white text-[9px] font-mono uppercase tracking-wider">Conflict?</text>
          </g>
          <path d="M730,235 L730,270" stroke="#8F8174" strokeWidth="1" fill="none" markerEnd="url(#arrow)" />

          {/* Path A: Success */}
          <path d="M680,300 L500,300" stroke="#10b981" strokeWidth="1.8" fill="none" markerEnd="url(#arrow)" />
          <text x="590" y="290" textAnchor="middle" className="fill-emerald-400 text-[9px] font-mono font-bold">No (Commit Success)</text>

          {/* Path B: Serialization Abort */}
          <path d="M730,330 L730,370" stroke="#ef4444" strokeWidth="1.8" fill="none" markerEnd="url(#arrow)" />
          <text x="780" y="350" textAnchor="middle" className="fill-red-400 text-[9px] font-mono font-bold">Yes (Abort Conflict)</text>

          {/* Abort block in Postgres */}
          <g transform="translate(640, 370)">
            <rect x="0" y="0" width="180" height="60" rx="8" className="fill-red-950/20 stroke-red-500/40" strokeWidth="1.5" />
            <text x="90" y="26" textAnchor="middle" className="fill-red-400 text-[12px] font-bold font-sans">Transaction Aborted</text>
            <text x="90" y="44" textAnchor="middle" className="fill-red-400/80 text-[9px] font-mono">ErrorCode P2034</text>
          </g>

          {/* Success return to Express */}
          <g transform="translate(325, 275)">
            <rect x="0" y="0" width="175" height="50" rx="6" className="fill-emerald-950/10 stroke-emerald-500/30" strokeWidth="1" />
            <text x="87" y="24" textAnchor="middle" className="fill-emerald-400 text-[11px] font-bold font-sans">Success Handler</text>
            <text x="87" y="38" textAnchor="middle" className="fill-text-muted text-[9px] font-mono">Returns Created Booking</text>
          </g>

          {/* Arrow Success -> Client 201 */}
          <path d="M325,300 L120,300 L120,240" stroke="#10b981" strokeWidth="1.5" fill="none" markerEnd="url(#arrow)" />
          <text x="210" y="315" textAnchor="middle" className="fill-emerald-400 text-[9px] font-mono font-semibold">201 Created (Confirmed)</text>

          {/* Client Success Display */}
          <g transform="translate(40, 180)">
            <rect x="0" y="0" width="160" height="60" rx="8" className="fill-emerald-950/20 stroke-emerald-500/40" strokeWidth="1" />
            <text x="80" y="26" textAnchor="middle" className="fill-emerald-400 text-[12px] font-bold font-sans">Confirmed</text>
            <text x="80" y="44" textAnchor="middle" className="fill-text-muted text-[9px] font-mono">Optimistic UI Resolves</text>
          </g>

          {/* Abort return to Express */}
          <path d="M640,400 L525,400" stroke="#ef4444" strokeWidth="1.5" fill="none" markerEnd="url(#arrow)" />
          <text x="580" y="390" textAnchor="middle" className="fill-red-400 text-[9px] font-mono font-bold">Throws P2034</text>

          {/* Express catches abort, throws 409 */}
          <g transform="translate(325, 370)">
            <rect x="0" y="0" width="200" height="70" rx="8" className="fill-red-950/20 stroke-red-500/50" strokeWidth="1.5" />
            <text x="100" y="26" textAnchor="middle" className="fill-white text-[12px] font-bold font-sans">Express Catch Block</text>
            <text x="100" y="44" textAnchor="middle" className="fill-red-400 text-[9px] font-mono">Maps P2034 → 409 Conflict</text>
            <text x="100" y="58" textAnchor="middle" className="fill-text-muted text-[8px] font-mono">Informs client to retry</text>
          </g>

          {/* Arrow Express -> Client 409 */}
          <path d="M325,410 L120,410 L120,440" stroke="#ef4444" strokeWidth="1.5" fill="none" markerEnd="url(#arrow)" />
          <text x="210" y="425" textAnchor="middle" className="fill-red-400 text-[9px] font-mono font-semibold">409 Concurrency Conflict</text>

          {/* Client Retry Handler */}
          <g transform="translate(40, 440)">
            <rect x="0" y="0" width="160" height="60" rx="8" className="fill-red-950/20 stroke-red-500/40" strokeWidth="1.5" />
            <text x="80" y="26" textAnchor="middle" className="fill-red-400 text-[12px] font-bold font-sans">Automatic Retry</text>
            <text x="80" y="44" textAnchor="middle" className="fill-text-muted text-[8px] font-mono">Triggers immediate re-submit</text>
          </g>

          {/* Arrow Client Retry -> Submit Booking (Loop) */}
          <path d="M40,470 L20,470 L20,80 L40,80" stroke="#ef4444" strokeWidth="1.2" strokeDasharray="3 3" fill="none" markerEnd="url(#arrow)" />
          <text x="45" y="475" textAnchor="start" className="fill-red-400 text-[8px] font-mono">Client Loop Retry</text>

        </svg>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 border-t border-white/5 pt-8">
        <div>
          <h4 className="text-white font-bold text-sm mb-2 font-sans tracking-tight">1. Client Request & Retry</h4>
          <p className="text-xs text-gray-400 font-sans leading-relaxed">
            The Next.js client submits booking parameters. In case of database conflict, the API returns a 409 status code, prompting the client UI to immediately re-fire the transaction.
          </p>
        </div>
        <div>
          <h4 className="text-white font-bold text-sm mb-2 font-sans tracking-tight">2. Serializable Context</h4>
          <p className="text-xs text-gray-400 font-sans leading-relaxed">
            Prisma wraps the capacity check and creation in a transaction block set to SERIALIZABLE. Rather than placing row locks, it registers the read/write constraints.
          </p>
        </div>
        <div>
          <h4 className="text-white font-bold text-sm mb-2 font-sans tracking-tight">3. Conflict Detection (P2034)</h4>
          <p className="text-xs text-gray-400 font-sans leading-relaxed">
            If PostgreSQL detects a concurrent transaction has inserted a record that changes the capacity sum since this transaction started, it aborts, throws Error P2034, and avoids overbooking.
          </p>
        </div>
      </div>
    </div>
  )
}
