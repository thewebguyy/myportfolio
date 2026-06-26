import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeftIcon, ClockIcon, CalendarIcon } from '@heroicons/react/24/outline'

/**
 * Individual Blog Post Page
 * Displays full article content with proper formatting
 */

import { blogPosts, getBlogPostBySlug } from '@/lib/blog'

// Generate static params
export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}

// Generate metadata
export async function generateMetadata({
  params
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const post = getBlogPostBySlug(params.slug)

  if (!post) {
    return { title: 'Post Not Found' }
  }

  return {
    title: post.title,
    description: post.excerpt,
  }
}

export default function BlogPostPage({
  params
}: {
  params: { slug: string }
}) {
  const post = getBlogPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: {
      '@type': 'Person',
      name: 'Olabode Olusegun'
    }
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--paper)' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Nav strip */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 h-[56px]"
        style={{ background: 'var(--paper)', borderBottom: '1px solid var(--wire)' }}
      >
        <Link
          href="/#writing"
          className="flex items-center gap-2 transition-colors"
          style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-3)' }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--signal)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--ink-3)')}
        >
          <ArrowLeftIcon className="w-4 h-4" />
          Back to writing
        </Link>
        <span
          style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--signal)' }}
        >
          Writing
        </span>
      </nav>

      <article className="pt-28 pb-24 px-6">
        <div className="max-w-[720px] mx-auto">

          {/* Header */}
          <header className="mb-16" style={{ borderBottom: '1px solid var(--wire)', paddingBottom: '40px' }}>
            <div className="flex items-center gap-3 mb-6">
              <span
                style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--signal)', border: '1px solid var(--signal)', padding: '2px 10px' }}
              >
                {post.category}
              </span>
            </div>

            <h1
              style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 'clamp(30px, 5vw, 52px)', letterSpacing: '-0.03em', lineHeight: 1.05, color: 'var(--ink)', marginBottom: '20px' }}
            >
              {post.title}
            </h1>

            <div
              className="flex flex-wrap items-center gap-4"
              style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--ink-3)' }}
            >
              <time dateTime={post.date} className="flex items-center gap-2">
                <CalendarIcon className="w-4 h-4" />
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
              <span className="flex items-center gap-2">
                <ClockIcon className="w-4 h-4" />
                {post.readTime} min read
              </span>
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

/**
 * Blog Content Component
 * Dynamic content based on slug
 */
function BlogContent({ slug }: { slug: string }) {
  // In production, this would load MDX content
  // For now, we'll provide sample content for the Edge Computing article

  if (slug === 'websocket-matching-layer') {
    return (
      <>
        <p className="lead text-xl text-text-secondary leading-relaxed">
          The initial version of ServiceBridge relied on HTTP short-polling for match notifications. Under load, this caused database connection pool exhaustion and unacceptable 5+ second latency. Here is why I rewrote the matching layer with WebSockets.
        </p>

        <h2>The Problem: Stateless Polling at Scale</h2>
        <p>
          In a multi-sided marketplace, timing is everything. When a homeowner posts a job, the platform must notify nearby tradespeople immediately. The MVP approach used standard HTTP polling: clients would ping the server every 5 seconds asking, <i>&quot;Any new jobs?&quot;</i>
        </p>
        <p>
          This worked fine for the first hundred users. But as concurrent active users scaled, the architecture buckled. Every poll required an authentication check, a database query, and a JSON response. 
        </p>
        <ul>
          <li><strong>Database Exhaustion:</strong> Thousands of queries per minute just to return <code>[]</code> (no new matches).</li>
          <li><strong>Latency:</strong> A match could take up to 5 seconds to surface on the client, creating a race condition where users felt the app was unresponsive.</li>
          <li><strong>Wasted Bandwidth:</strong> High overhead of HTTP headers for empty payloads.</li>
        </ul>

        <h2>The Decision: Persistent Stateful Connections</h2>
        <p>
          I decided to migrate from stateless HTTP polling to persistent stateful connections using WebSockets via <code>Socket.io</code>. 
        </p>
        <pre className="bg-surface p-4 border border-surface-2 overflow-x-auto">
          <code>{`// Example of the new WebSocket Event Architecture
export const setupMatchingGateway = (io: Server) => {
  io.on('connection', (socket) => {
    // 1. Authenticate and join location-based room
    socket.join(\`zone_\${socket.user.serviceArea}\`);
    
    // 2. Listen for dispatch events directly
    socket.on('job_accepted', async (data) => {
      await handleJobAcceptance(socket.user.id, data.jobId);
    });
  });
}`}</code>
        </pre>
        <p>
          Instead of clients asking the server if anything happened, the server pushes the event to the client the millisecond a match occurs.
        </p>

        <h2>The Tradeoffs</h2>
        <p>
          The performance gains were immediate: <strong>sub-100ms latency</strong> for dispatch notifications. But this came at the cost of significant infrastructure complexity.
        </p>
        <p>
          I now had to manage sticky sessions at the load balancer level. Handling connection drops on mobile devices (e.g., when a user drives through a tunnel) required aggressive client-side reconnection logic and offline-queueing. Most importantly, scaling from one Node.js instance to a fleet required implementing a Redis Pub/Sub adapter so an event published on Node A would reach a user connected to Node B.
        </p>
        <div className="bg-surface p-6 border border-surface-2 my-8">
          <h4 className="text-text-primary mb-2 italic">Hindsight / What I&apos;d do differently:</h4>
          <p className="text-sm text-text-secondary m-0 leading-relaxed">
            I would have evaluated Server-Sent Events (SSE) before committing to full bidirectional WebSockets. In the ServiceBridge architecture, the client-to-server payload volume was relatively low compared to server-to-client notifications. SSE over HTTP/2 might have delivered the same push-latency benefits without the headache of managing sticky WebSocket connections.
          </p>
        </div>
      </>
    )
  }

  if (slug === 'edge-computing-2026') {
    return (
      <>
        <p className="lead text-xl text-text-secondary leading-relaxed">
          Edge computing is no longer a distant future—it&apos;s reshaping how we build web applications
          today. As someone who&apos;s been deploying to edge networks since 2023, I&apos;ve witnessed
          firsthand how this architectural shift enables experiences that were simply impossible
          with traditional cloud-only approaches.
        </p>

        <h2>The Latency Problem</h2>
        <p>
          Traditional cloud architectures route every request through centralized data centers.
          For a user in Lagos accessing a server in Virginia, this means:
        </p>
        <ul>
          <li><strong>High base latency</strong> from geographic distance alone — a user in Lagos hitting a server in Virginia crosses the Atlantic twice per request.</li>
          <li><strong>Database query time</strong> added on top of the network round-trip.</li>
          <li><strong>Unpredictable spikes</strong> during high traffic periods with no regional failover.</li>
        </ul>
        <p>
          For users in regions far from your origin server, this stacks into noticeable delays before they see initial content.
        </p>

        <h2>How Edge Computing Solves This</h2>
        <p>
          Edge networks deploy your code to <strong className="text-primary">hundreds of
            locations worldwide</strong>, serving users from the nearest geographic point. Here&apos;s
          what I&apos;ve achieved in production:
        </p>
        <ul>
          <li><strong>Meaningfully lower P50 latency</strong> — requests served from nearby edge nodes instead of routing across continents.</li>
          <li><strong>Reduced P99 tail latency</strong> — automatic failover removes single-region outage spikes.</li>
          <li><strong>Simpler failure isolation</strong> — a single region going down no longer takes the whole service with it.</li>
        </ul>

        <h2>Real-World Implementation: ServiceBridge</h2>
        <p>
          In my ServiceBridge project, migrating to Vercel Edge Functions measurably reduced API response
          times for users in regions far from the origin server. Here&apos;s the architecture:
        </p>
        <pre className="bg-surface p-4 border border-surface-2 overflow-x-auto">
          <code>{`// Edge function for real-time matching
export const config = { runtime: 'edge' }

export default async function handler(req: Request) {
  const { location, service } = await req.json()
  
  // Query from edge-optimized database
  const providers = await getProvidersNear(location)
  
  // Return in <50ms
  return new Response(JSON.stringify(providers), {
    headers: { 'content-type': 'application/json' }
  })
}`}</code>
        </pre>

        <h2>Key Takeaways for 2026</h2>
        <ol>
          <li>
            <strong>Edge-first architecture</strong> should be the default for user-facing applications
          </li>
          <li>
            <strong>Database replication</strong> at the edge is becoming cost-effective (see Turso, Neon)
          </li>
          <li>
            <strong>Middleware at the edge</strong> enables personalization without backend roundtrips
          </li>
          <li>
            <strong>A/B testing, auth, and routing</strong> all benefit from edge execution
          </li>
        </ol>

        <h2>Resources to Learn More</h2>
        <ul>
          <li><a href="https://vercel.com/docs/concepts/functions/edge-functions" target="_blank">Vercel Edge Functions Documentation</a></li>
          <li><a href="https://developers.cloudflare.com/workers/" target="_blank">Cloudflare Workers</a></li>
          <li><a href="https://deno.com/deploy" target="_blank">Deno Deploy</a></li>
        </ul>

        <div className="bg-primary/10 border-l-4 border-primary p-6 my-8">
          <p className="text-text-secondary leading-relaxed m-0">
            <strong className="text-text-primary">Pro Tip:</strong> Start by moving read-heavy operations
            to the edge first. Profile your application to identify which endpoints have the
            highest latency and migrate those incrementally.
          </p>
        </div>
      </>
    )
  }

  if (slug === 'ai-agents-production') {
    return (
      <>
        <p className="lead text-xl text-text-secondary leading-relaxed">
          AI agents are moving beyond chat boxes and into the core logic of production systems.
          After building several autonomous systems in 2024, I&apos;ve compiled the essential
          lessons for making them reliable, cost-effective, and safe for production use.
        </p>

        <h2>1. The Reliability Gap</h2>
        <p>
          The biggest challenge with AI agents isn&apos;t getting them to work—it&apos;s getting them
          to work <span className="text-primary font-semibold">every single time</span>. LLMs are
          non-deterministic by nature, which is a nightmare for traditional software engineering.
        </p>
        <ul>
          <li><strong>Strict Schema Enforcement:</strong> Use Zod or JSON Mode to ensure outputs are parsesable.</li>
          <li><strong>Retry Logic with Backoff:</strong> AI services fail frequently; handle it gracefully.</li>
          <li><strong>Human-in-the-loop (HITL):</strong> For high-stakes actions, always require approval.</li>
        </ul>

        <h2>2. Optimizing for Latency and Cost</h2>
        <p>
          Running GPT-4 for every minor task is a recipe for bankruptcy and slow UX. I recommend a
          multi-tier approach:
        </p>
        <ol>
          <li><strong>Level 1 (Local/Small):</strong> Use Phi-3 or Llama-3 for basic classification.</li>
          <li><strong>Level 2 (Speed):</strong> Use GPT-3.5 Turbo or Claude Haiku for context extraction.</li>
          <li><strong>Level 3 (Logic):</strong> Reserve GPT-4o or Claude 3.5 Sonnet for complex reasoning.</li>
        </ol>

        <h2>3. Monitoring Agent Health</h2>
        <pre className="bg-surface p-4 border border-surface-2 overflow-x-auto">
          <code>{`// Example LangSmith-style logging
export function traceAgentAction(step: string, data: unknown) {
  const d = data as any; // Cast for demo purposes
  console.log(\`[AI-TRACE] \${step}\`, {
    tokens: d.usage.total_tokens,
    duration: Date.now() - d.startTime,
    is_hallucination: d.validation_failed
  })
}`}</code>
        </pre>

        <div className="bg-primary/10 border-l-4 border-primary p-6 my-8">
          <p className="text-text-secondary leading-relaxed m-0">
            <strong>Key Insight:</strong> An agent is only as good as its context. Spend 80% of your time
            on RAG (Retrieval Augmented Generation) and only 20% on the core prompt.
          </p>
        </div>
      </>
    )
  }

  if (slug === 'green-coding-practices') {
    return (
      <>
        <p className="lead text-xl text-text-secondary leading-relaxed">
          As software engineers, we often forget that code has a physical footprint. In 2026,
          efficiency isn&apos;t just about speed—it&apos;s about sustainability. Green coding
          is a set of practices designed to minimize the energy consumption of software.
        </p>

        <h2>The Three Pillars of Sustainable Code</h2>
        <ul>
          <li><strong>Compute Efficiency:</strong> Reducing the CPU cycles required for a task.</li>
          <li><strong>Data Efficiency:</strong> Minimizing the amount of data transferred over the wire.</li>
          <li><strong>Lifecycle Efficiency:</strong> Designing software for longevity and minimal updates.</li>
        </ul>

        <h2>Practical Optimization Wins</h2>
        <p>
          In a recent project, I reduced measurable page weight and server CPU usage by applying these changes:
        </p>
        <ul>
          <li>Migrating from heavy client-side rendering to <strong>React Server Components</strong>.</li>
          <li>Implementing <strong>aggressive caching</strong> at the edge to reduce database heat.</li>
          <li>Using <strong>WebP/AVIF</strong> instead of PNGs for hero assets.</li>
        </ul>

        <div className="bg-surface p-6 border border-surface-2 my-8">
          <h4 className="text-text-primary mb-2 italic">Why it matters:</h4>
          <p className="text-sm text-text-secondary m-0 leading-relaxed">
            The ICT sector is responsible for an estimated 2-4% of global greenhouse gas emissions—on
            par with the aviation industry. Every KB saved and every ms of CPU time reduced adds up.
          </p>
        </div>
      </>
    )
  }

  // Default content for other posts
  return (
    <div className="bg-surface border border-surface-2 p-8">
      <p className="text-text-secondary leading-relaxed">
        Full article content coming soon. This post is part of my ongoing series on modern
        web development practices and emerging technologies for 2026.
      </p>
      <p className="text-text-secondary leading-relaxed mt-4">
        Want to discuss this topic? <Link href="/#contact" className="text-primary hover:underline">
          Get in touch</Link> or connect with me on <a href="https://x.com/BodeBillions"
            target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
          X</a>.
      </p>
    </div>
  )
}