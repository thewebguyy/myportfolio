import { Metadata } from 'next'
import Link from 'next/link'
import { blogPosts } from '@/lib/blog'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Writing',
  description: 'Technical writing from Olabode Olusegun — production incidents, architectural decisions, and engineering tradeoffs.',
}

export default function BlogPage() {
  const sortedPosts = [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  return (
    <div className="min-h-screen" style={{ background: 'var(--paper)' }}>
      <div
        className="max-w-[1440px] mx-auto"
        style={{ borderLeft: '1px solid var(--wire)', borderRight: '1px solid var(--wire)', minHeight: '100vh' }}
      >
        {/* Header */}
        <section
          className="pt-32 pb-16 px-[var(--page-gutter)]"
          style={{ borderBottom: '1px solid var(--wire)' }}
        >
          <Link href="/" className="blog-nav-back inline-flex items-center gap-2 mb-10 block">
            ← Back to home
          </Link>
          <div className="type-label mb-6" style={{ color: 'var(--ink-4)' }}>Writing</div>
          <h1
            style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 700,
              fontSize: 'clamp(40px, 6vw, 80px)',
              lineHeight: 0.96,
              letterSpacing: '-0.04em',
              color: 'var(--ink)',
            }}
          >
            Long-form.
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '14px',
              lineHeight: 1.78,
              color: 'var(--ink-2)',
              maxWidth: '52ch',
              marginTop: '24px',
            }}
          >
            Technical writing derived from production systems — incidents, architectural decisions, and what each system forced me to understand.
          </p>
        </section>

        {/* Post list */}
        <div>
          {sortedPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col md:flex-row md:items-start gap-4 md:gap-10 px-[var(--page-gutter)] py-10"
              style={{ borderBottom: '1px solid var(--wire)', background: 'var(--paper)', transition: 'background 0.2s ease' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--paper-3)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'var(--paper)')}
            >
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: 'var(--ink-4)',
                  flexShrink: 0,
                  paddingTop: '4px',
                  minWidth: '100px',
                }}
              >
                {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}
              </div>
              <div className="flex-1">
                <div
                  className="type-label mb-3"
                  style={{ color: 'var(--signal)' }}
                >
                  {post.category}
                </div>
                <h2
                  className="mb-3 group-hover:text-[var(--signal)]"
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 600,
                    fontSize: 'clamp(18px, 2.2vw, 26px)',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.15,
                    color: 'var(--ink)',
                    transition: 'color 0.15s',
                  }}
                >
                  {post.title}
                </h2>
                <p
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '13px',
                    lineHeight: 1.72,
                    color: 'var(--ink-3)',
                  }}
                >
                  {post.excerpt}
                </p>
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--ink-4)',
                  flexShrink: 0,
                  paddingTop: '4px',
                  transition: 'color 0.15s',
                }}
                className="group-hover:text-[var(--signal)]"
              >
                Read →
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
