import React from 'react'

/**
 * ServiceBridge Architecture Diagram Component
 * Warm editorial paper & ink schematic faithfully depicting the verified
 * Socket.io + Redis Pub/Sub + PostgreSQL Advisory Lock + Paystack/Flutterwave architecture.
 */
export default function ServiceBridgeArchitecture() {
  return (
    <div
      className="w-full max-w-full min-w-0 p-4 sm:p-8 overflow-hidden"
      style={{ background: 'var(--paper-2)', border: '1px solid var(--wire)' }}
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 pb-5" style={{ borderBottom: '1px solid var(--wire)' }}>
        <div className="min-w-0">
          <div className="type-label mb-1" style={{ color: 'var(--signal)' }}>
            System Architecture · Real-Time Dispatch &amp; Network Resilience
          </div>
          <h3 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 'clamp(18px, 2vw, 22px)', color: 'var(--ink)', letterSpacing: '-0.02em' }}>
            ServiceBridge Event-Driven Marketplace Topology
          </h3>
        </div>
        <div className="flex flex-wrap gap-4" style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--ink-3)' }}>
          <div className="flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 flex-shrink-0" style={{ background: 'var(--signal)' }} />
            <span>WebSocket / Redis Pub/Sub (&lt;100ms)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 flex-shrink-0" style={{ background: 'var(--ink)' }} />
            <span>Transactional Lock &amp; Settlement</span>
          </div>
        </div>
      </div>

      {/* Responsive SVG Schematic */}
      <div
        className="w-full max-w-full overflow-x-auto"
        style={{ background: 'var(--paper)', border: '1px solid var(--wire)', WebkitOverflowScrolling: 'touch' }}
        tabIndex={0}
        role="region"
        aria-label="Scrollable ServiceBridge event-driven marketplace architecture diagram"
      >
        <svg
          viewBox="0 0 840 420"
          className="w-full min-w-[640px] h-auto block"
          role="img"
          aria-label="ServiceBridge architecture diagram showing mobile clients with adaptive 3G/4G payloads, NGINX load balancer, Node.js and Socket.io matching servers, Redis Pub/Sub fan-out, and PostgreSQL advisory locks"
        >
          <defs>
            <marker id="sb-arrow-ink" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
              <path d="M0,1 L7,4 L0,7 Z" fill="#262422" />
            </marker>
            <marker id="sb-arrow-signal" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
              <path d="M0,1 L7,4 L0,7 Z" fill="#c83605" />
            </marker>
          </defs>

          {/* Header Bar */}
          <rect x="0" y="0" width="840" height="36" fill="#edeae4" />
          <line x1="0" y1="36" x2="840" y2="36" stroke="rgba(13,13,13,0.16)" strokeWidth="1" />
          <line x1="250" y1="0" x2="250" y2="420" stroke="rgba(13,13,13,0.14)" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="555" y1="0" x2="555" y2="420" stroke="rgba(13,13,13,0.14)" strokeWidth="1" strokeDasharray="4 4" />

          <text x="125" y="23" textAnchor="middle" fill="#4d4843" fontSize="10" fontFamily="monospace" letterSpacing="1.2">
            01 · CLIENTS (3G / 4G / OFFLINE)
          </text>
          <text x="402" y="23" textAnchor="middle" fill="#4d4843" fontSize="10" fontFamily="monospace" letterSpacing="1.2">
            02 · GATEWAY &amp; NODE.JS / SOCKET.IO TIER
          </text>
          <text x="698" y="23" textAnchor="middle" fill="#4d4843" fontSize="10" fontFamily="monospace" letterSpacing="1.2">
            03 · REDIS PUB/SUB &amp; POSTGRESQL TIER
          </text>

          {/* Clients */}
          <g transform="translate(28, 60)">
            <rect x="0" y="0" width="194" height="72" fill="#f5f2ed" stroke="#0d0d0d" strokeWidth="1.25" />
            <text x="14" y="23" fill="#0d0d0d" fontSize="12" fontWeight="700" fontFamily="sans-serif">
              Homeowners (React Web)
            </text>
            <text x="14" y="42" fill="#4d4843" fontSize="10" fontFamily="monospace">
              Job request + Idempotency key
            </text>
            <text x="14" y="57" fill="#635d57" fontSize="9.5" fontFamily="monospace">
              Adaptive payload shaping (4G→3G)
            </text>
          </g>

          <g transform="translate(28, 166)">
            <rect x="0" y="0" width="194" height="76" fill="#f5f2ed" stroke="#c83605" strokeWidth="1.5" />
            <text x="14" y="23" fill="#0d0d0d" fontSize="12" fontWeight="700" fontFamily="sans-serif">
              Tradespeople (Mobile WS)
            </text>
            <text x="14" y="42" fill="#c83605" fontSize="10" fontWeight="700" fontFamily="monospace">
              Persistent Socket.io Room
            </text>
            <text x="14" y="58" fill="#635d57" fontSize="9.5" fontFamily="monospace">
              Auto-reconnect + cached session
            </text>
          </g>

          <g transform="translate(28, 282)">
            <rect x="0" y="0" width="194" height="84" fill="#edeae4" stroke="#0d0d0d" strokeWidth="1.25" />
            <text x="14" y="23" fill="#0d0d0d" fontSize="12" fontWeight="700" fontFamily="sans-serif">
              Paystack / Flutterwave
            </text>
            <text x="14" y="42" fill="#4d4843" fontSize="10" fontFamily="monospace">
              Async payment webhooks
            </text>
            <text x="14" y="58" fill="#635d57" fontSize="9.5" fontFamily="monospace">
              Bank window timeout guard +
            </text>
            <text x="14" y="72" fill="#635d57" fontSize="9.5" fontFamily="monospace">
              Wallet fallback ledger
            </text>
          </g>

          {/* Tier 2: NGINX + Node Instances */}
          <g transform="translate(286, 60)">
            <rect x="0" y="0" width="232" height="68" fill="#edeae4" stroke="#0d0d0d" strokeWidth="1.25" />
            <text x="14" y="23" fill="#0d0d0d" fontSize="12" fontWeight="700" fontFamily="sans-serif">
              NGINX Reverse Proxy &amp; API
            </text>
            <text x="14" y="42" fill="#262422" fontSize="10" fontFamily="monospace">
              Bandwidth header inspection
            </text>
            <text x="14" y="56" fill="#635d57" fontSize="9.5" fontFamily="monospace">
              Omits heavy fields on slow links
            </text>
          </g>

          <g transform="translate(286, 160)">
            <rect x="0" y="0" width="232" height="88" fill="#f5f2ed" stroke="#c83605" strokeWidth="1.5" />
            <text x="14" y="23" fill="#0d0d0d" fontSize="12" fontWeight="700" fontFamily="sans-serif">
              Node.js + Socket.io Cluster
            </text>
            <text x="14" y="42" fill="#c83605" fontSize="10" fontWeight="700" fontFamily="monospace">
              Zone rooms (zone_lagos_*)
            </text>
            <text x="14" y="58" fill="#4d4843" fontSize="10" fontFamily="monospace">
              Acceptance-weighted matching
            </text>
            <text x="14" y="74" fill="#635d57" fontSize="9.5" fontFamily="monospace">
              Zero idle DB polling connections
            </text>
          </g>

          <g transform="translate(286, 282)">
            <rect x="0" y="0" width="232" height="84" fill="#f5f2ed" stroke="#0d0d0d" strokeWidth="1.25" />
            <text x="14" y="23" fill="#0d0d0d" fontSize="12" fontWeight="700" fontFamily="sans-serif">
              Booking &amp; Settlement Worker
            </text>
            <text x="14" y="42" fill="#262422" fontSize="10" fontFamily="monospace">
              Verifies webhook before dispatch
            </text>
            <text x="14" y="58" fill="#4d4843" fontSize="9.5" fontFamily="monospace">
              Reconciles pending bank transfers
            </text>
          </g>

          {/* Tier 3: Redis & Postgres */}
          <g transform="translate(588, 60)">
            <rect x="0" y="0" width="224" height="112" fill="#f5f2ed" stroke="#c83605" strokeWidth="1.5" />
            <text x="14" y="24" fill="#c83605" fontSize="12" fontWeight="700" fontFamily="sans-serif">
              Redis Pub/Sub &amp; Cache Tier
            </text>
            <text x="14" y="45" fill="#262422" fontSize="10" fontFamily="monospace">
              1. Multi-node WS event fan-out
            </text>
            <text x="14" y="62" fill="#262422" fontSize="10" fontFamily="monospace">
              2. Hot availability &amp; fare cache
            </text>
            <text x="14" y="79" fill="#262422" fontSize="10" fontFamily="monospace">
              3. Reconnection session state
            </text>
            <text x="14" y="98" fill="#635d57" fontSize="9.5" fontFamily="monospace">
              Sub-100ms cross-instance broadcast
            </text>
          </g>

          <g transform="translate(588, 212)">
            <rect x="0" y="0" width="224" height="154" fill="#edeae4" stroke="#0d0d0d" strokeWidth="1.25" />
            <text x="14" y="24" fill="#0d0d0d" fontSize="12" fontWeight="700" fontFamily="sans-serif">
              PostgreSQL Primary + Replica
            </text>
            <text x="14" y="46" fill="#262422" fontSize="10" fontWeight="700" fontFamily="monospace">
              pg_advisory_xact_lock(slot)
            </text>
            <text x="14" y="64" fill="#4d4843" fontSize="10" fontFamily="monospace">
              Prevents concurrent double-booking
            </text>
            <text x="14" y="80" fill="#4d4843" fontSize="10" fontFamily="monospace">
              of artisan Saturday slots
            </text>
            <line x1="14" y1="96" x2="210" y2="96" stroke="rgba(13,13,13,0.14)" strokeWidth="1" />
            <text x="14" y="116" fill="#262422" fontSize="10" fontFamily="monospace">
              Idempotent booking &amp; wallet
            </text>
            <text x="14" y="132" fill="#262422" fontSize="10" fontFamily="monospace">
              settlement ledger (ACID)
            </text>
          </g>

          {/* Connectors */}
          <line x1="222" y1="94" x2="286" y2="94" stroke="#262422" strokeWidth="1.25" markerEnd="url(#sb-arrow-ink)" />
          <line x1="286" y1="204" x2="222" y2="204" stroke="#c83605" strokeWidth="1.5" markerEnd="url(#sb-arrow-signal)" />
          <text x="254" y="195" textAnchor="middle" fill="#c83605" fontSize="9" fontWeight="700" fontFamily="monospace">&lt;100ms</text>

          <line x1="222" y1="324" x2="286" y2="324" stroke="#262422" strokeWidth="1.25" markerEnd="url(#sb-arrow-ink)" />
          <line x1="402" y1="128" x2="402" y2="160" stroke="#262422" strokeWidth="1.25" markerEnd="url(#sb-arrow-ink)" />
          <line x1="518" y1="185" x2="588" y2="125" stroke="#c83605" strokeWidth="1.5" markerEnd="url(#sb-arrow-signal)" />
          <line x1="518" y1="225" x2="588" y2="265" stroke="#262422" strokeWidth="1.25" markerEnd="url(#sb-arrow-ink)" />
          <line x1="518" y1="324" x2="588" y2="324" stroke="#262422" strokeWidth="1.25" markerEnd="url(#sb-arrow-ink)" />
        </svg>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 pt-6" style={{ borderTop: '1px solid var(--wire)' }}>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, color: 'var(--ink)', marginBottom: '4px' }}>
            01 · WebSocket + Redis Pub/Sub
          </div>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '13.5px', lineHeight: 1.6, color: 'var(--ink-3)' }}>
            Replaced 5-second HTTP polling (which exhausted PostgreSQL connections at ~60 users) with persistent Socket.io rooms and Redis Pub/Sub fan-out.
          </p>
        </div>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, color: 'var(--ink)', marginBottom: '4px' }}>
            02 · Bandwidth-Aware Payloads
          </div>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '13.5px', lineHeight: 1.6, color: 'var(--ink-3)' }}>
            Dynamically strips non-essential fields on degraded 3G/slow connections and serves core session state from multi-layer Redis cache.
          </p>
        </div>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, color: 'var(--ink)', marginBottom: '4px' }}>
            03 · Advisory Locks &amp; Settlement Guard
          </div>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '13.5px', lineHeight: 1.6, color: 'var(--ink-3)' }}>
            PostgreSQL advisory locks prevent concurrent slot double-booking, while wallet fallback + async reconciliation handle bank maintenance delays.
          </p>
        </div>
      </div>
    </div>
  )
}
