'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type NetworkQuality = '4g' | '3g' | 'slow' | 'offline'

const QUALITIES: NetworkQuality[] = ['4g', '3g', 'slow', 'offline']
const QUALITY_LABELS: Record<NetworkQuality, string> = {
  '4g': '4G · 20 Mbps (10/10 fields)',
  '3g': '3G · 1.5 Mbps (7/10 fields)',
  'slow': 'Slow · 50 Kbps (5/10 fields)',
  'offline': 'Offline Cache (3/10 core fields)',
}

interface ResponseField {
  key: string
  value: string
  includedOn: NetworkQuality[]
}

const RESPONSE_FIELDS: ResponseField[] = [
  { key: 'id',             value: '"match_83hGx"',                        includedOn: ['4g', '3g', 'slow', 'offline'] },
  { key: 'status',         value: '"MATCHED"',                            includedOn: ['4g', '3g', 'slow', 'offline'] },
  { key: 'matchedAt',      value: '"2023-11-14T09:33:12Z"',               includedOn: ['4g', '3g', 'slow', 'offline'] },
  { key: 'fare',           value: '{ "amount": 2400, "currency": "NGN" }',includedOn: ['4g', '3g', 'slow'] },
  { key: 'driver',         value: '{ "id": "drv_22", "name": "Emeka A." }',includedOn: ['4g', '3g', 'slow'] },
  { key: 'eta',            value: '"4 mins"',                             includedOn: ['4g', '3g'] },
  { key: 'driverLocation', value: '{ "lat": 6.52, "lng": 3.38 }',         includedOn: ['4g', '3g'] },
  { key: 'vehiclePhoto',   value: '"https://cdn.../vehicle.jpg"',         includedOn: ['4g'] },
  { key: 'driverRating',   value: '4.87',                                 includedOn: ['4g'] },
  { key: 'routePolyline',  value: '"encoded_polyline_string…"',           includedOn: ['4g'] },
]

function qualityIndex(q: NetworkQuality) {
  return QUALITIES.indexOf(q)
}

export function ConstrainProof() {
  const [quality, setQuality] = useState<NetworkQuality>('4g')

  const visibleFields = RESPONSE_FIELDS.filter(f => f.includedOn.includes(quality))
  const hiddenCount = RESPONSE_FIELDS.length - visibleFields.length

  return (
    <div className="proof-shell">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div className="type-label" style={{ color: 'var(--ink-2)', fontWeight: 700 }}>
          Interactive Proof · 06 — Bandwidth-Adaptive API Payload Shaping
        </div>
        <span className="pill-tag">Simulated Model · ServiceBridge (2023)</span>
      </div>

      <div className="proof-guide">
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, color: 'var(--signal)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '4px' }}>
          What to observe
        </div>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', lineHeight: 1.55, color: 'var(--ink-2)', margin: 0 }}>
          Select a network profile (<strong>4G</strong>, <strong>3G</strong>, <strong>Slow</strong>, or <strong>Offline</strong>) or drag the slider. Observe how the API progressively strips non-essential fields (<code>vehiclePhoto</code>, <code>routePolyline</code>) to guarantee core match delivery under bandwidth constraints.
        </p>
      </div>

      {/* Accessible 44px touch-target buttons + range slider */}
      <div style={{ marginBottom: '24px', maxWidth: '520px' }}>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4" role="group" aria-label="Network quality presets">
          {QUALITIES.map(q => {
            const active = quality === q
            return (
              <button
                key={q}
                type="button"
                onClick={() => setQuality(q)}
                aria-pressed={active}
                className={`proof-btn w-full ${active ? 'proof-btn-signal' : 'proof-btn-ghost'}`}
                style={{ padding: '8px 10px', fontSize: '11px' }}
              >
                {q === 'offline' ? 'Offline' : q.toUpperCase()}
              </button>
            )
          })}
        </div>

        <input
          type="range"
          min={0}
          max={3}
          value={qualityIndex(quality)}
          onChange={e => setQuality(QUALITIES[Number(e.target.value)])}
          aria-label="Network quality slider"
          aria-valuetext={QUALITY_LABELS[quality]}
          style={{ width: '100%', accentColor: 'var(--signal)', cursor: 'pointer', height: '24px' }}
        />
        <div
          aria-live="polite"
          aria-atomic="true"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11.5px',
            fontWeight: 700,
            color: quality === 'offline' ? 'var(--danger)' : 'var(--ink-2)',
            marginTop: '4px',
          }}
        >
          Active Profile: {QUALITY_LABELS[quality]}
        </div>
      </div>

      {/* Response panel */}
      <div style={{ background: 'var(--paper-2)', border: '1px solid var(--wire)', padding: '20px', maxWidth: '520px', overflowX: 'auto' }}>
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-3)', fontWeight: 700 }}>
            API Response Payload
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', color: 'var(--signal)' }}>
            {visibleFields.length} of {RESPONSE_FIELDS.length} fields
          </span>
        </div>

        <div
          style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', lineHeight: 1.75, overflowWrap: 'anywhere' }}
          role="region"
          aria-live="polite"
          aria-label="API response fields"
        >
          <span style={{ color: 'var(--ink-4)' }}>{'{'}</span>
          <div style={{ paddingLeft: '16px' }}>
            {RESPONSE_FIELDS.map(field => {
              const visible = field.includedOn.includes(quality)
              return (
                <AnimatePresence key={field.key}>
                  {visible && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.18 }}
                      style={{ overflow: 'hidden' }}
                    >
                      <span style={{ color: 'var(--ink)' }}>&quot;{field.key}&quot;</span>
                      <span style={{ color: 'var(--ink-4)' }}>: </span>
                      <span style={{ color: 'var(--ink-2)' }}>{field.value}</span>
                      <span style={{ color: 'var(--ink-4)' }}>,</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              )
            })}
          </div>
          <span style={{ color: 'var(--ink-4)' }}>{'}'}</span>
        </div>

        {hiddenCount > 0 && (
          <div
            style={{
              marginTop: '12px',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'var(--ink-3)',
              borderTop: '1px solid var(--wire)',
              paddingTop: '10px',
            }}
          >
            {hiddenCount} non-critical field{hiddenCount > 1 ? 's' : ''} omitted to preserve sub-200ms delivery.
          </div>
        )}
        {quality === 'offline' && (
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, color: 'var(--danger)', marginTop: '6px' }}>
            Serving from local &amp; Redis session cache — essential match identity preserved.
          </div>
        )}
      </div>

      <p
        style={{
          marginTop: '16px',
          fontFamily: 'var(--font-sans)',
          fontSize: '14.5px',
          lineHeight: 1.65,
          color: 'var(--ink-2)',
          maxWidth: '520px',
        }}
      >
        {quality === 'offline'
          ? 'Even during a brief mobile dropout, the cached match state prevents the user from losing their active dispatch.'
          : quality === 'slow'
          ? 'At 50 Kbps, every kilobyte matters: fare and driver identity arrive intact while map polylines are deferred.'
          : quality === '3g'
          ? 'On 3G (1.5 Mbps), live coordinates and ETA are retained while high-resolution vehicle photos are omitted.'
          : 'On 4G, the client receives the complete 10-field payload including imagery and encoded route polylines.'}
      </p>
    </div>
  )
}
