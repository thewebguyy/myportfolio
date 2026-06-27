import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'

import { blogPosts, getBlogPostBySlug } from '@/lib/blog'

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({
  params
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const post = getBlogPostBySlug(params.slug)
  if (!post) return { title: 'Post Not Found' }
  return { title: post.title, description: post.excerpt }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getBlogPostBySlug(params.slug)
  if (!post) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { '@type': 'Person', name: 'Olabode Olusegun' }
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--paper)' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Nav strip */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 h-[56px]"
        style={{ background: 'var(--paper)', borderBottom: '1px solid var(--wire)' }}
      >
        <Link href="/blog" className="blog-nav-back flex items-center gap-2">
          ← All writing
        </Link>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--signal)' }}>
          Writing
        </span>
      </nav>

      <article className="pt-28 pb-24 px-6">
        <div className="max-w-[720px] mx-auto">

          {/* Header */}
          <header className="mb-16" style={{ borderBottom: '1px solid var(--wire)', paddingBottom: '40px' }}>
            <div className="flex items-center gap-3 mb-6">
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--signal)', border: '1px solid var(--signal)', padding: '2px 10px' }}>
                {post.category}
              </span>
            </div>

            <h1 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 'clamp(30px, 5vw, 52px)', letterSpacing: '-0.03em', lineHeight: 1.05, color: 'var(--ink)', marginBottom: '20px' }}>
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4" style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--ink-3)' }}>
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </time>
              <span style={{ color: 'var(--ink-4)' }}>·</span>
              <span>{post.readTime} min read</span>
            </div>
          </header>

          {/* Content */}
          <div className="prose max-w-none">
            <BlogContent slug={post.slug} />
          </div>

          {/* Footer */}
          <footer className="mt-16 pt-8 flex items-center justify-between" style={{ borderTop: '1px solid var(--wire)' }}>
            <div>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--ink-3)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Written by</p>
              <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '15px', color: 'var(--ink)' }}>Olabode Olusegun</p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--ink-3)' }}>Full-Stack Engineer</p>
            </div>
            <Link href="/#contact" className="btn-primary">Get in Touch</Link>
          </footer>
        </div>
      </article>
    </div>
  )
}

function BlogContent({ slug }: { slug: string }) {
  if (slug === 'websocket-matching-layer') {
    return (
      <>
        <p>
          The initial version of ServiceBridge relied on HTTP short-polling for match notifications. Under load, this caused database connection pool exhaustion and 5+ second notification latency. Here is why I rewrote the matching layer with WebSockets.
        </p>

        <h2>The Problem: Stateless Polling at Scale</h2>
        <p>
          In a multi-sided marketplace, timing is everything. When a homeowner posts a job, the platform must notify nearby tradespeople immediately. The MVP used HTTP polling: clients pinged the server every 5 seconds asking, <em>&quot;Any new jobs?&quot;</em>
        </p>
        <p>
          This worked fine at low scale. As concurrent active users grew, the architecture buckled. Every poll required an authentication check, a database query, and a JSON response.
        </p>
        <ul>
          <li><strong>Database Exhaustion:</strong> Thousands of queries per minute to return <code>[]</code> (no new matches).</li>
          <li><strong>Latency:</strong> A match could take up to 5 seconds to surface on the client, creating a race condition where users felt the app was unresponsive.</li>
          <li><strong>Wasted Bandwidth:</strong> High HTTP header overhead for empty payloads.</li>
        </ul>

        <h2>The Decision: Persistent Stateful Connections</h2>
        <p>
          I migrated from stateless HTTP polling to persistent stateful connections using WebSockets via Socket.io.
        </p>
        <pre>
          <code>{`// WebSocket event architecture
export const setupMatchingGateway = (io: Server) => {
  io.on('connection', (socket) => {
    // Authenticate and join location-based room
    socket.join(\`zone_\${socket.user.serviceArea}\`);

    socket.on('job_accepted', async (data) => {
      await handleJobAcceptance(socket.user.id, data.jobId);
    });
  });
}`}</code>
        </pre>
        <p>
          Instead of clients asking the server if anything happened, the server pushes the event to the client the millisecond a match occurs. Result: sub-100ms dispatch notifications.
        </p>

        <h2>The Tradeoffs</h2>
        <p>
          The performance gains were immediate. But this came at the cost of infrastructure complexity: sticky sessions at the load balancer, mobile reconnection logic for users driving through dead zones, and a Redis Pub/Sub adapter so an event on Node A would reach a user connected to Node B.
        </p>

        <blockquote>
          <p>
            <strong>Hindsight:</strong> I would have evaluated Server-Sent Events before committing to full bidirectional WebSockets. In the ServiceBridge architecture, client-to-server traffic was low relative to server-to-client push volume. SSE over HTTP/2 might have delivered the same latency benefits without the sticky-session complexity.
          </p>
        </blockquote>
      </>
    )
  }

  return (
    <p style={{ color: 'var(--ink-2)', fontFamily: 'var(--font-mono)', fontSize: '14px', lineHeight: 1.8 }}>
      Article not found.
    </p>
  )
}
