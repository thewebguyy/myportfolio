'use client'

import React from 'react'
import { principles } from '@/lib/principles'

const SIM_LABELS: Record<string, string> = {
  observe: 'Sim 01 · P50 vs P99 Tail Latency',
  model: 'Sim 02 · Shared Schema Contract',
  isolate: 'Sim 03 · Read Committed vs Serializable',
  stress: 'Sim 04 · 500 Crash vs 409 Conflict',
  recover: 'Sim 05 · Idempotent Payment Retry',
  constrain: 'Sim 06 · 3G Bandwidth Payload Shaping',
  ship: 'Sim 07 · 4-Stage CI Gate Injector',
  evolve: 'Sim 08 · Initial Plan vs Production Reality',
}

export function EngineeringIntro() {
  return (
    <section
      id="engineering"
      aria-label="Engineering Philosophy Index"
      style={{ background: 'var(--paper-2)', borderBottom: '1px solid var(--wire)' }}
    >
      <div
        className="max-w-[1440px] mx-auto px-[var(--page-gutter)] py-16 lg:py-24"
        style={{ borderLeft: '1px solid var(--wire)', borderRight: '1px solid var(--wire)' }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-10 mb-10" style={{ borderBottom: '1px solid var(--wire)' }}>
          <div className="lg:col-span-7 min-w-0">
            <div className="type-label mb-3" style={{ color: 'var(--signal)' }}>
              Engineering Philosophy &amp; Interactive Proofs · Chapters 01 — 08
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-sans)',
                fontWeight: 700,
                fontSize: 'clamp(32px, 4.8vw, 60px)',
                lineHeight: 0.98,
                letterSpacing: '-0.035em',
                color: 'var(--ink)',
              }}
            >
              Eight Principles Extracted From Production Incidents
            </h2>
          </div>
          <div className="lg:col-span-5 min-w-0 flex flex-col sm:flex-row lg:flex-col items-start sm:items-end lg:items-end justify-between gap-4">
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '15px',
                lineHeight: 1.62,
                color: 'var(--ink-2)',
                maxWidth: '46ch',
              }}
            >
              Optional technical deep dive. Every chapter pairs an engineering incident with an interactive simulation so you can test the system behavior directly in the browser.
            </p>
            <a href="#contact" className="btn-secondary">
              Skip to contact ↓
            </a>
          </div>
        </div>

        {/* 8-Principle Interactive Directory Grid */}
        <div className="type-label mb-4">
          Select any chapter to jump to its incident analysis &amp; interactive proof
        </div>
        <ul
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px m-0 p-0 list-none"
          style={{ background: 'var(--wire)', border: '1px solid var(--wire)' }}
          aria-label="Eight engineering principles directory"
        >
          {principles.map(p => (
            <li key={p.id} className="min-w-0" style={{ background: 'var(--paper)' }}>
              <a
                href={`#${p.id}`}
                className="group flex flex-col justify-between h-full p-5 transition-colors hover:bg-[var(--paper-3)]"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '11px',
                        fontWeight: 700,
                        color: 'var(--signal)',
                        letterSpacing: '0.08em',
                      }}
                    >
                      {p.index}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '10px',
                        color: 'var(--ink-4)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                      }}
                    >
                      {p.question}
                    </span>
                  </div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontWeight: 700,
                      fontSize: '22px',
                      letterSpacing: '-0.025em',
                      color: 'var(--ink)',
                      marginBottom: '6px',
                    }}
                    className="group-hover:text-[var(--signal)] transition-colors"
                  >
                    {p.word}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '13.5px',
                      lineHeight: 1.55,
                      color: 'var(--ink-2)',
                      marginBottom: '14px',
                    }}
                  >
                    {p.thesis}
                  </p>
                </div>

                <div
                  className="pt-3 flex items-center justify-between gap-2 min-w-0"
                  style={{ borderTop: '1px solid var(--wire)', fontFamily: 'var(--font-mono)', fontSize: '10.5px', color: 'var(--ink-3)' }}
                >
                  <span className="truncate min-w-0 flex-1">{SIM_LABELS[p.id]}</span>
                  <span style={{ color: 'var(--signal)', flexShrink: 0 }}>↓</span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
