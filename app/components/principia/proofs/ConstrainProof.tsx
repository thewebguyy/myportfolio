'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type NetworkQuality = '4g' | '3g' | 'slow' | 'offline'

const QUALITIES: NetworkQuality[] = ['4g', '3g', 'slow', 'offline']
const QUALITY_LABELS: Record<NetworkQuality, string> = {
  '4g': '4G · 20 Mbps', '3g': '3G · 1.5 Mbps', 'slow': 'Slow · 50 Kbps', 'offline': 'Offline',
}

interface ResponseField {
  key: string
  value: string
  includedOn: NetworkQuality[] // qualities where this field IS included
}

const RESPONSE_FIELDS: ResponseField[] = [
  { key: 'id',            value: '"match_83hGx"',               includedOn: ['4g', '3g', 'slow', 'offline'] },
  { key: 'status',        value: '"MATCHED"',                   includedOn: ['4g', '3g', 'slow', 'offline'] },
  { key: 'matchedAt',     value: '"2024-11-14T09:33:12Z"',      includedOn: ['4g', '3g', 'slow', 'offline'] },
  { key: 'fare',          value: '{ "amount": 2400, "currency": "NGN" }', includedOn: ['4g', '3g', 'slow'] },
  { key: 'driver',        value: '{ "id": "drv_22", "name": "Emeka A." }', includedOn: ['4g', '3g', 'slow'] },
  { key: 'eta',           value: '"4 mins"',                    includedOn: ['4g', '3g'] },
  { key: 'driverLocation',value: '{ "lat": 6.52, "lng": 3.38 }', includedOn: ['4g', '3g'] },
  { key: 'vehiclePhoto',  value: '"https://cdn.../vehicle.jpg"', includedOn: ['4g'] },
  { key: 'driverRating',  value: '4.87',                        includedOn: ['4g'] },
  { key: 'routePolyline', value: '"encoded_polyline_string…"',  includedOn: ['4g'] },
]

function qualityIndex(q: NetworkQuality) { return QUALITIES.indexOf(q) }

export function ConstrainProof() {
  const [quality, setQuality] = useState<NetworkQuality>('4g')

  const visibleFields = RESPONSE_FIELDS.filter(f => f.includedOn.includes(quality))
  const hiddenCount = RESPONSE_FIELDS.length - visibleFields.length

  return (
    <div style={{ borderTop: '1px solid var(--wire)', paddingTop: '48px', marginTop: '48px' }}>
      <div className="type-label mb-4" style={{ color: 'var(--ink-4)' }}>
        Interactive Proof · 06
      </div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.08em', color: 'var(--ink-4)', marginBottom: '4px' }}>
        FROM: <span style={{ color: 'var(--signal)' }}>ServiceBridge</span> · Marketplace Engine · 2023
      </div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--ink-3)', marginBottom: '32px' }}>
        Move the slider. Watch the response narrow its claims.
      </div>

      {/* Network slider */}
      <div style={{ marginBottom: '32px', maxWidth: '480px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          {QUALITIES.map(q => (
            <span
              key={q}
              style={{
                fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.08em',
                textTransform: 'uppercase', cursor: 'pointer',
                color: quality === q ? 'var(--signal)' : 'var(--ink-4)',
                fontWeight: quality === q ? 700 : 400, transition: 'color 0.15s',
              }}
              onClick={() => setQuality(q)}
              role="button"
              tabIndex={0}
              aria-pressed={quality === q}
              onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && setQuality(q)}
            >
              {q === 'offline' ? 'Offline' : q.toUpperCase()}
            </span>
          ))}
        </div>
        <input
          type="range"
          min={0}
          max={3}
          value={qualityIndex(quality)}
          onChange={e => setQuality(QUALITIES[Number(e.target.value)])}
          aria-label="Network quality"
          aria-valuetext={QUALITY_LABELS[quality]}
          style={{ width: '100%', accentColor: 'var(--signal)', cursor: 'pointer' }}
        />
        <div
          aria-live="polite"
          aria-atomic="true"
          style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: quality === 'offline' ? '#d63030' : 'var(--ink-3)', marginTop: '6px' }}
        >
          {QUALITY_LABELS[quality]}
        </div>
      </div>

      {/* Response panel — fixed height container, fields animate in/out */}
      <div style={{ background: 'var(--paper-2)', border: '1px solid var(--wire)', padding: '20px', maxWidth: '420px' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-4)', marginBottom: '16px' }}>
          API Response
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', lineHeight: 1.8 }} role="region" aria-live="polite" aria-label="API response fields">
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
                      transition={{ duration: 0.2 }}
                      style={{ overflow: 'hidden' }}
                    >
                      <span style={{ color: 'var(--ink-3)' }}>&quot;{field.key}&quot;</span>
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
          <div style={{ marginTop: '12px', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--ink-4)', borderTop: '1px solid var(--wire)', paddingTop: '10px' }}>
            {hiddenCount} field{hiddenCount > 1 ? 's' : ''} omitted for this connection
          </div>
        )}
        {quality === 'offline' && (
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#d63030', marginTop: '6px' }}>
            Serving from cache — essential fields only
          </div>
        )}
      </div>

      <div style={{ marginTop: '20px', fontFamily: 'var(--font-mono)', fontSize: '12px', lineHeight: 1.75, color: 'var(--ink-3)', maxWidth: '420px' }}>
        {quality === 'offline'
          ? <span style={{ color: 'var(--ink-2)' }}>The system still works. It just says less.</span>
          : quality === 'slow'
          ? 'Rich data costs bandwidth. On constrained connections, every byte is a decision.'
          : quality === '3g'
          ? 'Location and ETA: high value, small payload. Vehicle photos: nice to have, not essential.'
          : 'Full fidelity on fast connections. The constraint is invisible — until the network changes.'}
      </div>
    </div>
  )
}
