'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { blogPosts } from '@/lib/blog'

export function Colophon() {
  // Only show posts directly tied to Olabode's production work
  const recentPosts = blogPosts.filter(p =>
    p.slug === 'websocket-matching-layer'
  )

  return (
    <section
      id="contact"
      aria-label="Colophon and contact"
      style={{ background: 'var(--paper)', borderTop: '1px solid var(--wire)' }}
    >
      <div
        className="max-w-[1440px] mx-auto"
        style={{ borderLeft: '1px solid var(--wire)', borderRight: '1px solid var(--wire)' }}
      >
        {/* Writing — the evidence that thinking is ongoing */}
        <div
          className="px-[var(--page-gutter)] py-16"
          style={{ borderBottom: '1px solid var(--wire)' }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-12 gap-12"
          >
            <div className="col-span-12 lg:col-span-4">
              <div className="type-label mb-6" style={{ color: 'var(--ink-4)' }}>Further Reading</div>
              <h2 className="type-section" style={{ fontSize: 'clamp(24px, 3vw, 36px)' }}>
                The thinking<br />continues.
              </h2>
            </div>
            <div className="col-span-12 lg:col-span-8">
              <div className="space-y-0">
                {recentPosts.map((post, i) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group flex items-baseline gap-6 py-5 transition-colors"
                    style={{ borderBottom: '1px solid var(--wire)' }}
                  >
                    <span
                      className="type-label flex-shrink-0"
                      style={{ color: 'var(--ink-4)', fontVariantNumeric: 'tabular-nums' }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontWeight: 500,
                        fontSize: 'clamp(16px, 1.8vw, 20px)',
                        letterSpacing: '-0.01em',
                        color: 'var(--ink)',
                        transition: 'color 0.15s',
                      }}
                      className="group-hover:text-[var(--signal)]"
                    >
                      {post.title}
                    </span>
                  </Link>
                ))}
              </div>
              <div className="pt-6">
                <Link
                  href="/blog"
                  className="type-label"
                  style={{ color: 'var(--signal)' }}
                >
                  All writing →
                </Link>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Contact — the call */}
        <div className="px-[var(--page-gutter)] py-24 grid grid-cols-12 items-end gap-12">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="col-span-12 lg:col-span-7"
          >
            <div className="type-label mb-8" style={{ color: 'var(--ink-4)' }}>
              Available for work · Lagos / Remote
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-sans)',
                fontWeight: 700,
                fontSize: 'clamp(36px, 6vw, 80px)',
                lineHeight: 0.95,
                letterSpacing: '-0.04em',
                color: 'var(--ink)',
              }}
            >
              Let&apos;s talk<br />
              about the<br />
              hard problem.
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="col-span-12 lg:col-span-5 space-y-8"
          >
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '14px',
                lineHeight: 1.75,
                color: 'var(--ink-2)',
              }}
            >
              Fintech infrastructure, marketplace platforms, systems that need
              to stay correct under concurrency. If you have a hard problem,
              I want to hear about it.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="mailto:support@mycardglobal.com" className="btn-primary">Email Olabode</a>
            </div>
            <div
              className="pt-6 space-y-2"
              style={{ borderTop: '1px solid var(--wire)' }}
            >
              <div className="type-label" style={{ color: 'var(--ink-4)' }}>Elsewhere</div>
              <div
                style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--ink-3)' }}
              >
                <a href="https://github.com/thewebguyy" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--ink)] transition-colors mr-6">GitHub</a>
                <a href="https://linkedin.com/in/thewebguyy" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--ink)] transition-colors mr-6">LinkedIn</a>
                <a href="https://x.com/BodeBillions" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--ink)] transition-colors">X</a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
