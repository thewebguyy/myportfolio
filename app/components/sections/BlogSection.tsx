'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { blogPosts } from '@/lib/blog'

export function BlogSection() {
  const featuredPosts = blogPosts.slice(0, 5)

  return (
    <section id="writing" style={{ background: 'var(--paper)', borderBottom: '1px solid var(--wire)' }}>
      <div
        className="max-w-[1440px] mx-auto"
        style={{ borderLeft: '1px solid var(--wire)', borderRight: '1px solid var(--wire)' }}
      >
        {/* Header */}
        <div className="px-8 lg:px-16 py-16" style={{ borderBottom: '1px solid var(--wire)' }}>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--signal)', marginBottom: '16px' }}
          >
            Writing
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 'clamp(32px, 4vw, 52px)', letterSpacing: '-0.03em', color: 'var(--ink)', marginBottom: '16px' }}
          >
            The Archive.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: 'var(--ink-3)', lineHeight: 1.7, maxWidth: '520px' }}
          >
            Technical thinking, architectural decisions, and post-mortems.
          </motion.p>
        </div>

        {/* Column headers */}
        <div
          className="hidden md:grid grid-cols-12 px-8 lg:px-16 py-3"
          style={{ borderBottom: '1px solid var(--wire)', fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-3)' }}
        >
          <div className="col-span-2">Date</div>
          <div className="col-span-2">Category</div>
          <div className="col-span-7">Title</div>
          <div className="col-span-1 text-right">→</div>
        </div>

        {/* Post rows */}
        <div className="flex flex-col">
          {featuredPosts.map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.04 }}
            >
              <Link
                href={`/blog/${post.slug}`}
                className="group block"
              >
                <div
                  className="grid grid-cols-1 md:grid-cols-12 px-8 lg:px-16 py-6 transition-colors duration-150 items-baseline"
                  style={{ borderBottom: '1px solid var(--wire)' }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'var(--paper-2)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  {/* Mobile: date + category inline */}
                  <div
                    className="flex items-center gap-3 md:hidden mb-2"
                    style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink-3)' }}
                  >
                    <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                    <span style={{ color: 'var(--wire)' }}>·</span>
                    <span style={{ color: 'var(--signal)' }}>{post.category}</span>
                  </div>

                  {/* Desktop date */}
                  <div
                    className="hidden md:block md:col-span-2"
                    style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--ink-3)', letterSpacing: '0.04em' }}
                  >
                    {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}
                  </div>

                  {/* Desktop category */}
                  <div
                    className="hidden md:block md:col-span-2"
                    style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--signal)' }}
                  >
                    {post.category}
                  </div>

                  {/* Title + excerpt */}
                  <div className="md:col-span-7">
                    <h3
                      style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 'clamp(16px, 1.5vw, 20px)', letterSpacing: '-0.01em', color: 'var(--ink)', lineHeight: 1.25 }}
                    >
                      {post.title}
                    </h3>
                    <p
                      className="mt-1"
                      style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--ink-3)', lineHeight: 1.6 }}
                    >
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Arrow */}
                  <div
                    className="hidden md:flex col-span-1 justify-end items-center transition-opacity duration-150 opacity-0 group-hover:opacity-100"
                    style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--signal)' }}
                  >
                    →
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
