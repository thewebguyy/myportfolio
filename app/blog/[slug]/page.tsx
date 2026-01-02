import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeftIcon, ClockIcon, CalendarIcon } from '@heroicons/react/24/outline'

/**
 * Individual Blog Post Page
 * Displays full article content with proper formatting
 */

// Blog posts data (matches blog/page.tsx)
const blogPosts = [
  {
    slug: 'edge-computing-2026',
    title: 'Why Edge Computing Will Define Web Development in 2026',
    excerpt: 'Exploring how edge computing is transforming application architecture, reducing latency, and enabling new use cases for distributed systems.',
    date: '2024-12-15',
    readTime: 8,
    category: 'System Design',
  },
  {
    slug: 'ai-agents-production',
    title: 'Building Production-Ready AI Agents: Lessons Learned',
    excerpt: 'A practical guide to integrating AI agents into web applications, covering prompt engineering, error handling, and cost optimization.',
    date: '2024-11-28',
    readTime: 12,
    category: 'AI/ML',
  },
  {
    slug: 'green-coding-practices',
    title: 'Green Coding: Writing Sustainable Software for 2026',
    excerpt: 'How to measure and reduce the carbon footprint of your applications through efficient algorithms, optimized queries, and smart caching.',
    date: '2024-10-10',
    readTime: 10,
    category: 'Performance',
  },
]

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
  const post = blogPosts.find(p => p.slug === params.slug)
  
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
  const post = blogPosts.find(p => p.slug === params.slug)

  if (!post) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-gray-950">
      <article className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Back Link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-primary 
                     transition-colors mb-8"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Back to Blog
          </Link>

          {/* Header */}
          <header className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded-full">
                {post.category}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
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
          <div className="prose prose-invert prose-primary max-w-none">
            <BlogContent slug={post.slug} />
          </div>

          {/* Footer */}
          <footer className="mt-16 pt-8 border-t border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-2">Written by</p>
                <p className="font-semibold text-white">Olabode Olusegun</p>
                <p className="text-sm text-gray-500">Full-Stack Engineer</p>
              </div>

              <Link href="#contact" className="btn btn-primary text-sm">
                Get in Touch
              </Link>
            </div>
          </footer>
        </div>
      </article>
    </main>
  )
}

/**
 * Blog Content Component
 * Dynamic content based on slug
 */
function BlogContent({ slug }: { slug: string }) {
  // In production, this would load MDX content
  // For now, we'll provide sample content for the Edge Computing article
  
  if (slug === 'edge-computing-2026') {
    return (
      <>
        <p className="lead text-xl text-gray-300 leading-relaxed">
          Edge computing is no longer a distant future—it's reshaping how we build web applications 
          today. As someone who's been deploying to edge networks since 2023, I've witnessed 
          firsthand how this architectural shift enables experiences that were simply impossible 
          with traditional cloud-only approaches.
        </p>

        <h2>The Latency Problem</h2>
        <p>
          Traditional cloud architectures route every request through centralized data centers. 
          For a user in Lagos accessing a server in Virginia, this means:
        </p>
        <ul>
          <li><strong>~150ms</strong> base latency just from geographic distance</li>
          <li><strong>Additional 50-100ms</strong> for database queries and processing</li>
          <li><strong>Unpredictable spikes</strong> during high traffic periods</li>
        </ul>
        <p>
          This adds up to a <strong className="text-primary">200-300ms delay</strong> before 
          users even see initial content. In 2026, where users expect sub-100ms interactions, 
          this is unacceptable.
        </p>

        <h2>How Edge Computing Solves This</h2>
        <p>
          Edge networks deploy your code to <strong className="text-primary">hundreds of 
          locations worldwide</strong>, serving users from the nearest geographic point. Here's 
          what I've achieved in production:
        </p>
        <ul>
          <li><strong>P50 latency: 45ms</strong> (down from 180ms)</li>
          <li><strong>P99 latency: 120ms</strong> (down from 450ms)</li>
          <li><strong>99.99% uptime</strong> through automatic failover</li>
        </ul>

        <h2>Real-World Implementation: ServiceBridge</h2>
        <p>
          In my ServiceBridge project, migrating to Vercel Edge Functions reduced API response 
          times by <strong className="text-primary">60%</strong>. Here's the architecture:
        </p>
        <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
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

        <div className="bg-primary/10 border-l-4 border-primary p-6 rounded-r-lg my-8">
          <p className="text-gray-300 leading-relaxed m-0">
            <strong className="text-white">Pro Tip:</strong> Start by moving read-heavy operations 
            to the edge first. Profile your application to identify which endpoints have the 
            highest latency and migrate those incrementally.
          </p>
        </div>
      </>
    )
  }

  // Default content for other posts
  return (
    <div className="glass rounded-2xl p-8">
      <p className="text-gray-300 leading-relaxed">
        Full article content coming soon. This post is part of my ongoing series on modern 
        web development practices and emerging technologies for 2026.
      </p>
      <p className="text-gray-300 leading-relaxed mt-4">
        Want to discuss this topic? <Link href="#contact" className="text-primary hover:underline">
        Get in touch</Link> or connect with me on <a href="https://twitter.com/thewebguyy" 
        target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
        Twitter</a>.
      </p>
    </div>
  )
}