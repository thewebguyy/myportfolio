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
  if (slug === 'campus-revival-engineering') {
    return (
      <>
        <p>
          <em>By Olabode Olusegun (Lead Engineer) | June 2026 | Status: V3 Live in Production</em>
        </p>
        <p>
          Every software project starts with a delusion. For me, it was thinking that the Campus Revival Movement (what we internally call CRM-Platform) would just be a &quot;simple website.&quot;
        </p>
        <p>
          The premise was straightforward: create a map of UK university campuses and let users click a button to say, &quot;I&apos;m praying for this campus.&quot; A classic CRUD app. Spin up Next.js, add a database, throw some Tailwind on the frontend, and call it a weekend.
        </p>
        <p>
          But as the movement grew, the requirements mutated. A simple map turned into a nationwide coordination platform. &quot;Praying for a campus&quot; evolved into an adoption workflow involving leader verification, hierarchical workspaces, team permissions, and real-time activity feeds. Suddenly, we needed multi-factor authentication (MFA), role-based access control (RBAC), rate limiting, event-driven background jobs, and a comprehensive search architecture.
        </p>
        <p>
          Over six months, the project morphed from a brochure site into a complete Operating System for a movement. Today, the platform supports <strong>over 250 verified campuses and ~4,000 active registered users</strong>.
        </p>
        <p>
          This is the story of how that happened. It is an honest, deeply technical look at the architectural decisions, the painful production incidents, and the hidden engineering work required to build a system capable of scaling without collapsing under its own weight.
        </p>

        <hr />

        <h2>1. The Original Problem &amp; The Stakes</h2>
        <p>
          The Campus Revival Movement needed a digital home. The initial requirement was to give visibility to the movement: show which universities were being prayed for, who was leading the charge, and what was happening on the ground.
        </p>
        <p>
          At first glance, a Content Management System (CMS) like WordPress or Strapi seemed sufficient. However, a CMS models <em>content</em>, not <em>behavior</em>. CRM-Platform wasn’t about publishing articles; it was about facilitating workflows.
        </p>
        <p>
          I also considered off-the-shelf Customer Relationship Management (CRM) tools like Salesforce or HubSpot. (Yes, the acronym collision between Campus Revival Movement and Customer Relationship Management haunted us from day one). But trying to shoehorn deeply specific workflows—like &quot;spiritual adoption,&quot; &quot;journal entries,&quot; and &quot;prayer requests&quot;—into a generic &quot;Lead to Opportunity&quot; sales pipeline would result in a brittle, unmaintainable mess.
        </p>
        <p>
          We needed a bespoke system because the stakes were uniquely high. When a campus hits the &quot;Revival Threshold&quot; (50 registered adopters), it isn&apos;t just a gamification metric—it triggers real-world logistics. The core movement leadership team physically visits that campus to host an event. If our data was wrong, we would be sending a team across the country based on a ghost metric. The domain model had to perfectly mirror the reality of the movement.
        </p>

        <hr />

        <h2>2. The Scope Creep: From Website to Operating System</h2>
        <p>
          The evolution from website to operating system didn&apos;t happen overnight.
        </p>
        <ul>
          <li><strong>Month 1:</strong> Just a map and user accounts.</li>
          <li><strong>Month 2:</strong> Users need to submit journal entries and prayer requests, but only for campuses they&apos;ve adopted.</li>
          <li><strong>Month 3:</strong> Campus leaders need to verify themselves to prevent misrepresentation and fraud. They need administrative control over their campus page.</li>
          <li><strong>Month 4:</strong> We need a global activity feed to show momentum.</li>
        </ul>
        <p>
          As the requirements compounded, the initial architecture—a messy tangle of Next.js Server Actions calling the database directly—began to crack. I found myself writing the same authorization checks in five different places. The UI became sluggish; <strong>p95 latency was hovering around ~3.1–3.4 seconds</strong> because single requests were doing too much synchronous work.
        </p>

        <img src="/blog/crm_dashboard_mockup.png" alt="The CRM-Platform Dashboard: Glassmorphic UI, real-time activity feeds, and adoption metrics." />
        <p>
          <em>The CRM-Platform Dashboard: Glassmorphic UI, real-time activity feeds, and adoption metrics.</em>
        </p>

        <hr />

        <h2>3. The Architecture Evolution</h2>
        <p>
          To prevent the codebase from becoming an unmaintainable &quot;Big Ball of Mud,&quot; I had to draw hard boundaries.
        </p>
        <h3>Why Vertical Slice Architecture?</h3>
        <p>
          Initially, I organized the code by technical concerns: <code>components/</code>, <code>api/</code>, <code>models/</code>. When I needed to add a feature to the &quot;Adoption&quot; workflow, I had to touch five different folders.
        </p>
        <p>
          I transitioned towards a <strong>Vertical Slice Architecture</strong>. Instead of organizing by <em>technology</em>, I organized by <em>feature</em>. Everything related to &quot;Campus Adoption&quot;—the database model, the business logic, the API route, and the DTOs—lived together.
        </p>
        <pre>
          <code>{`graph TD
    subgraph Layered Architecture (The Old Way)
        Controllers --> Services
        Services --> Repositories
        Repositories --> DB[(Database)]
    end

    subgraph Vertical Slice (The New Way)
        FeatureA[Campus Adoption] --> DB2[(Database)]
        FeatureB[Prayer Requests] --> DB2
        FeatureC[Auth] --> DB2
    end`}</code>
        </pre>
        <h3>The Repository Pattern</h3>
        <p>
          I chose MongoDB because the schema for &quot;activity feeds&quot; and &quot;journal entries&quot; was highly polymorphic in the early days. However, I made a critical rule: <strong>No Next.js API route or Server Component was allowed to import Mongoose models directly.</strong>
        </p>
        <p>
          Instead, I implemented the <strong>Repository Pattern</strong>. By wrapping database calls in a Repository interface, I decoupled the business logic from the persistence layer, making unit testing actually feasible.
        </p>

        <hr />

        <h2>4. Auth, Privacy, and Capability-Based RBAC</h2>
        <p>
          Authentication and privacy are where faith-based platforms face unique challenges. Prayer requests and journal entries are deeply personal, sensitive data. Furthermore, verifying real campus leaders is critical to prevent spiritual misrepresentation on a campus.
        </p>

        <h3>Capability-Based Permissions (Not Roles)</h3>
        <p>
          The biggest mistake I made early on was role-based checks (<code>{`if (user.role === 'ADMIN')`}</code>). The moment we needed a <code>CAMPUS_LEADER</code> role, the entire codebase broke.
        </p>
        <p>
          I refactored the system to use <strong>Capability-based permissions</strong>. The API doesn&apos;t ask &quot;Are you an admin?&quot; It asks, &quot;Do you have the capability to delete this journal entry?&quot;
        </p>
        <pre>
          <code>{`// The old way (Fragile)
if (user.role !== 'ADMIN' && entry.authorId !== user.id) {
  throw new UnauthorizedError();
}

// The new way (Robust)
const capabilities = getCapabilitiesForUser(user, entry);
if (!capabilities.canDeleteJournal) {
  throw new UnauthorizedError('Missing required capability: canDeleteJournal');
}`}</code>
        </pre>

        <h3>Data Privacy &amp; GDPR</h3>
        <p>Because we operate in the UK, GDPR compliance was non-negotiable.</p>
        <ul>
          <li><strong>Retention:</strong> Prayer requests are auto-deleted after 90 days via a background cron job.</li>
          <li><strong>Encryption:</strong> Highly sensitive journal entries are encrypted at rest using AES-256-GCM. Even the database administrator cannot read them. They are only decrypted just-in-time at the application layer if <code>capabilities.canReadJournal</code> evaluates to true.</li>
          <li><strong>Right to Erasure:</strong> We built a dedicated background workflow for user-initiated account deletions. When a user requests erasure, an Inngest worker scrubs their PII, destroys their encryption keys (crypto-shredding their journal entries), and anonymizes their public activity log so that aggregate campus metrics aren&apos;t corrupted by the deletion.</li>
        </ul>

        <hr />

        <h2>5. Background Jobs: Entering the Event Bus</h2>
        <p>When a user adopted a campus, the system had to:</p>
        <ol>
          <li>Update the database.</li>
          <li>Check if the campus hit the 50-adopter Revival Threshold.</li>
          <li>Generate an Activity Timeline event.</li>
          <li>Send an email to the campus leader.</li>
        </ol>
        <p>
          Doing this synchronously took well over 3 seconds. It was fragile; if the email provider failed, the user saw an error.
        </p>
        <p>
          I integrated <strong>Inngest</strong> to build an <strong>Event Bus</strong> directly into the Next.js application.
        </p>
        <pre>
          <code>{`// The API Route just fires an event and immediately returns
await inngest.send({
  name: "campus/adopted",
  data: { userId, schoolId }
});
return Response.json({ success: true });`}</code>
        </pre>
        <p>
          This decoupled architecture dropped our p95 latency from ~3.1–3.4s down to a steady 100–150ms.
        </p>

        <hr />

        <h2>6. The Command Palette &amp; Search Architecture</h2>
        <p>
          A movement operating system needs to be fast. I realized that users were spending too much time clicking through menus to find their university or specific users.
        </p>
        <p>
          I built a global Command Palette (<code>Cmd + K</code>) powered by a robust <strong>Search Provider</strong> architecture.
        </p>
        <p>
          Rather than writing a monolithic, terrifying MongoDB aggregation pipeline that searched everything at once, I built independent Search Providers.
        </p>
        <pre>
          <code>{`graph LR
    User[Command Palette] --> SearchAggregator[Search Aggregator]
    SearchAggregator --> ProviderA[School Provider]
    SearchAggregator --> ProviderB[User Provider]
    SearchAggregator --> ProviderC[Journal Provider]
    ProviderA --> Mongo
    ProviderB --> Mongo
    ProviderC --> Mongo`}</code>
        </pre>
        <p>
          Each provider implements a simple interface <code>executeSearch(query)</code>. The aggregator fires them all in parallel using <code>Promise.allSettled</code>, merges the results, and normalizes them into a standard DTO for the frontend. Adding a new search domain (e.g., &quot;Sermons&quot;) is now as simple as registering a new provider class.
        </p>

        <hr />

        <h2>7. The 2AM Incident: Phusion Passenger &amp; The Memory Leak</h2>
        <p>
          Here is where the &quot;modern frontend&quot; dream crashed into reality.
        </p>
        <p>
          Vercel is amazing, but with heavy database polling and edge functions, our projected Vercel bill at scale was north of $150/mo. The movement had a tight budget. We acquired an 8-core, 16GB RAM Namecheap VPS (cPanel) for ~$25/mo.
        </p>
        <p>
          Deploying a modern Next.js App Router application to a traditional cPanel/VPS environment using Phusion Passenger is brutal.
        </p>
        <p>
          <strong>The Incident: June 12th, 2:15 AM.</strong>
          <br />
          Sentry triggered a critical alert: the Next.js production server was repeatedly restarting with <code>FATAL ERROR: Ineffective mark-compacts near heap limit Allocation failed - JavaScript heap out of memory</code>.
        </p>
        <p>
          <strong>The Cause:</strong> Namecheap&apos;s Phusion Passenger manages Node processes aggressively. When our cron job hit an endpoint to generate the global activity feed, it triggered a massive, un-paginated MongoDB <code>$lookup</code> aggregation joining 4 collections. Because Passenger caches memory per-thread, this single request bloated the Node process heap to 1.5GB, crashing the instance and taking the entire site offline.
        </p>
        <p>
          <strong>The Fix:</strong>
        </p>
        <ol>
          <li>I SSH&apos;d into the VPS and manually restarted the Passenger instance using <code>touch tmp/restart.txt</code> to restore immediate service.</li>
          <li>I ripped out the MongoDB <code>$lookup</code> pipeline entirely. We denormalized the Activity Feed schema so reads were flat (<code>O(1)</code> index scans).</li>
          <li>We offloaded all heavy aggregation tasks to Inngest background workers, ensuring the main Next.js request threads were never blocked by heavy compute.</li>
        </ol>
        <p>We haven&apos;t had an OOM crash since.</p>

        <hr />

        <h2>8. Testing, CI, and Observability</h2>
        <p>You can&apos;t maintain an operating system without a safety net.</p>
        <h3>The CI Pipeline</h3>
        <p>Every Pull Request to <code>main</code> triggers our GitHub Actions pipeline (<code>ci.yml</code>).</p>
        <ol>
          <li><strong>Vitest</strong> runs our unit and integration tests. We spin up an ephemeral <code>mongo:6.0</code> service container in the runner so the Repository layer is tested against a real database, not mocks.</li>
          <li><strong>Playwright</strong> runs End-to-End (E2E) tests. It boots the Next.js dev server, seeds the ephemeral database, and visually navigates the Adoption and Login workflows.</li>
        </ol>
        <p>
          If Playwright fails, the deploy is blocked. This exact pipeline caught a bug where our JWT signing secret validation was failing in edge environments before it reached production.
        </p>
        <h3>Observability &amp; Rate Limiting</h3>
        <p>Because we manage our own VPS, we lack Vercel&apos;s beautiful dashboard.</p>
        <ul>
          <li><strong>Sentry</strong> captures all unhandled exceptions and React boundary errors, piping them directly to our developer Slack.</li>
          <li><strong>Upstash Redis</strong> provides telemetry and strict rate-limiting. To prevent brute-force attacks and abuse, we implemented a global <code>100 requests / 15 minutes</code> limit per IP, with a much stricter <code>5 requests / 15 minutes</code> limit on the <code>/api/auth/login</code> and MFA endpoints.</li>
        </ul>

        <hr />

        <h2>9. What Building Campus Revival Taught Me</h2>
        <p>Building the Campus Revival Movement Operating System was a masterclass in pragmatism.</p>
        <p>
          When you read engineering blogs from Stripe or GitHub, it’s easy to get seduced by microservices and Kafka. But when you are a solo engineer or a small team building a system from scratch, those technologies are a death sentence.
        </p>
        <p>
          The biggest lesson I learned is the <strong>Power of Bounded Complexity</strong>.
        </p>
        <p>
          I didn&apos;t use microservices, but I strictly separated my modules using Vertical Slice Architecture. I didn&apos;t use Kafka, but I achieved resilient background processing using Inngest. I didn&apos;t use an Enterprise API Gateway, but I secured my routes with comprehensive Middleware and Redis rate limiting.
        </p>
        <p>
          Good architecture is about delaying decisions until you absolutely have to make them, and building interfaces that allow you to change your mind later without rewriting the world.
        </p>

        <hr />

        <h2>Appendix</h2>
        <h3>A. Tech Stack</h3>
        <ul>
          <li><strong>Frontend:</strong> Next.js 14 (App Router), React, TailwindCSS</li>
          <li><strong>Backend:</strong> Node.js, Next.js Server Actions &amp; API Routes</li>
          <li><strong>Database:</strong> MongoDB (Atlas) via Mongoose</li>
          <li><strong>Caching &amp; Rate Limiting:</strong> Upstash Redis</li>
          <li><strong>Background Jobs:</strong> Inngest</li>
          <li><strong>CI/Testing:</strong> GitHub Actions, Vitest, Playwright</li>
          <li><strong>Deployment:</strong> Namecheap cPanel VPS (Next.js Standalone mode)</li>
          <li><strong>Observability:</strong> Sentry</li>
        </ul>

        <h3>B. Advice to Engineers Building Systems That Outgrow Their Scope</h3>
        <ol>
          <li><strong>Stop writing <code>{`if (role === 'admin')`}</code></strong>: Adopt capability-based permissions on day one. It saves 100 hours of refactoring later.</li>
          <li><strong>Never return raw DB objects</strong>: Enforce DTOs at the network boundary. You <em>will</em> accidentally leak a password hash if you don&apos;t.</li>
          <li><strong>Embrace the Event Bus early</strong>: The moment a user action triggers more than one side effect, move it to a background job. Keep your main request thread lightning fast.</li>
          <li><strong>Test against real databases in CI</strong>: Mocking a database hides your worst queries. Spin up a Docker container in GitHub Actions and test reality.</li>
        </ol>
      </>
    )
  }

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
