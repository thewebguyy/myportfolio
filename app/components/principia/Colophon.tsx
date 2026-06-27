'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { blogPosts } from '@/lib/blog'

export function Colophon() {
  const post = blogPosts[0]

  return (
    <section
      id="contact"
      aria-label="Contact and writing"
      style={{ background: 'var(--paper)', borderTop: '1px solid var(--wire)' }}
    >
      <div
        className="max-w-[1440px] mx-auto"
        style={{ borderLeft: '1px solid var(--wire)', borderRight: '1px solid var(--wire)' }}
      >
        {/* Writing */}
        {post && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="px-[var(--page-gutter)] py-12 lg:py-16 grid grid-cols-12 gap-8 lg:gap-12"
            style={{ borderBottom: '1px solid var(--wire)' }}
          >
            <div className="col-span-12 lg:col-span-4">
              <div className="type-label mb-4" style={{ color: 'var(--ink-4)' }}>Long-form</div>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 600,
                  fontSize: 'clamp(20px, 2.4vw, 30px)',
                  lineHeight: 1.15,
                  letterSpacing: '-0.02em',
                  color: 'var(--ink)',
                }}
              >
                One piece<br />worth your time.
              </p>
            </div>
            <div className="col-span-12 lg:col-span-8">
              <Link
                href={`/blog/${post.slug}`}
                className="group flex items-baseline gap-6 py-5 transition-colors"
                style={{ borderTop: '1px solid var(--wire)', borderBottom: '1px solid var(--wire)' }}
              >
                <span
                  className="type-label flex-shrink-0"
                  style={{ color: 'var(--ink-4)', fontVariantNumeric: 'tabular-nums' }}
                >
                  01
                </span>
                <div className="flex-1 min-w-0">
                  <span
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontWeight: 500,
                      fontSize: 'clamp(16px, 1.8vw, 20px)',
                      letterSpacing: '-0.01em',
                      color: 'var(--ink)',
                      transition: 'color 0.15s',
                      display: 'block',
                    }}
                    className="group-hover:text-[var(--signal)]"
                  >
                    {post.title}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '12px',
                      color: 'var(--ink-4)',
                      display: 'block',
                      marginTop: '4px',
                    }}
                  >
                    {post.readTime} min read · {post.category}
                  </span>
                </div>
                <span
                  className="type-label flex-shrink-0 transition-colors"
                  style={{ color: 'var(--ink-4)' }}
                >
                  Read →
                </span>
              </Link>
            </div>
          </motion.div>
        )}

        {/* Contact */}
        <div className="px-[var(--page-gutter)] py-16 lg:py-24 grid grid-cols-12 items-end gap-8 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="col-span-12 lg:col-span-7"
          >
            <div className="type-label mb-6 lg:mb-8" style={{ color: 'var(--ink-4)' }}>
              Available for work · Lagos / Remote
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-sans)',
                fontWeight: 700,
                fontSize: 'clamp(32px, 5.5vw, 76px)',
                lineHeight: 0.96,
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
            transition={{ delay: 0.15, duration: 0.5 }}
            className="col-span-12 lg:col-span-5 space-y-6 lg:space-y-8"
          >
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'clamp(13px, 1.2vw, 14px)',
                lineHeight: 1.78,
                color: 'var(--ink-2)',
                maxWidth: '38ch',
              }}
            >
              Fintech infrastructure, marketplace platforms, systems that need
              to stay correct under concurrency. If you have a hard problem,
              I want to hear about it.
            </p>
            <div>
              <a href="mailto:olabode@mycardglobal.com" className="btn-primary">
                Email Olabode
              </a>
            </div>
            <div
              className="space-y-3"
              style={{ borderTop: '1px solid var(--wire)', paddingTop: '24px' }}
            >
              <div className="type-label" style={{ color: 'var(--ink-4)' }}>Elsewhere</div>
              <div
                className="flex gap-6"
                style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--ink-3)' }}
              >
                <a
                  href="https://github.com/thewebguyy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors"
                  style={{ color: 'inherit' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--ink)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--ink-3)')}
                >
                  GitHub
                </a>
                <a
                  href="https://linkedin.com/in/thewebguyy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors"
                  style={{ color: 'inherit' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--ink)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--ink-3)')}
                >
                  LinkedIn
                </a>
                <a
                  href="https://x.com/BodeBillions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors"
                  style={{ color: 'inherit' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--ink)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--ink-3)')}
                >
                  X
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
