import { Metadata } from 'next'
import Link from 'next/link'
import { ClockIcon, ArrowRightIcon } from '@heroicons/react/24/outline'

/**
 * Blog Listing Page
 * Digital garden showcasing thought leadership on 2026 tech trends
 */
export const metadata: Metadata = {
  title: 'Blog - Tech Insights & Trends',
  description: 'Technical articles on AI, system design, performance optimization, and emerging 2026 technologies.',
}

// Blog posts data (in production, this would come from MDX files or CMS)
const blogPosts = [
  {
    slug: 'edge-computing-2026',
    title: 'Why Edge Computing Will Define Web Development in 2026',
    excerpt: 'Exploring how edge computing is transforming application architecture, reducing latency, and enabling new use cases for distributed systems.',
    date: '2024-12-15',
    readTime: 8,
    category: 'System Design',
    featured: true,
  },
  {
    slug: 'ai-agents-production',
    title: 'Building Production-Ready AI Agents: Lessons Learned',
    excerpt: 'A practical guide to integrating AI agents into web applications, covering prompt engineering, error handling, and cost optimization.',
    date: '2024-11-28',
    readTime: 12,
    category: 'AI/ML',
    featured: true,
  },
  {
    slug: 'green-coding-practices',
    title: 'Green Coding: Writing Sustainable Software for 2026',
    excerpt: 'How to measure and reduce the carbon footprint of your applications through efficient algorithms, optimized queries, and smart caching.',
    date: '2024-10-10',
    readTime: 10,
    category: 'Performance',
    featured: false,
  },
]

export default function BlogPage() {
  const featuredPosts = blogPosts.filter(post => post.featured)
  const regularPosts = blogPosts.filter(post => !post.featured)

  return (
    <main className="min-h-screen bg-gray-950">
      {/* Header */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-primary 
                     transition-colors mb-8"
          >
            ← Back to Home
          </Link>

          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Tech <span className="gradient-text">Insights</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl">
            Thoughts on system design, AI integration, performance optimization, and the future 
            of web development. Updated regularly with lessons from building production systems.
          </p>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-white">Featured Articles</h2>
            <div className="space-y-8">
              {featuredPosts.map((post) => (
                <FeaturedPostCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Regular Posts */}
      {regularPosts.length > 0 && (
        <section className="pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-white">All Articles</h2>
            <div className="space-y-6">
              {regularPosts.map((post) => (
                <RegularPostCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}

/**
 * Featured Post Card Component
 */
function FeaturedPostCard({ post }: { post: any }) {
  return (
    <article className="glass rounded-2xl overflow-hidden hover:border-primary/50 transition-all group">
      <div className="p-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="px-3 py-1 bg-primary/20 text-primary text-sm font-semibold rounded-full">
            FEATURED
          </span>
          <span className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded-full">
            {post.category}
          </span>
        </div>

        <Link href={`/blog/${post.slug}`}>
          <h3 className="text-3xl font-bold mb-4 text-white group-hover:text-primary transition-colors">
            {post.title}
          </h3>
        </Link>

        <p className="text-gray-400 mb-6 leading-relaxed text-lg">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
            <span className="flex items-center gap-1">
              <ClockIcon className="w-4 h-4" />
              {post.readTime} min read
            </span>
          </div>

          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center gap-2 text-primary hover:text-primary-light 
                     font-semibold transition-colors group/link"
          >
            Read More
            <ArrowRightIcon className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </article>
  )
}

/**
 * Regular Post Card Component
 */
function RegularPostCard({ post }: { post: any }) {
  return (
    <article className="glass rounded-xl p-6 hover:border-primary/50 transition-all group">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded">
              {post.category}
            </span>
          </div>

          <Link href={`/blog/${post.slug}`}>
            <h3 className="text-xl font-bold mb-2 text-white group-hover:text-primary transition-colors">
              {post.title}
            </h3>
          </Link>

          <p className="text-gray-400 text-sm mb-3 line-clamp-2">
            {post.excerpt}
          </p>

          <div className="flex items-center gap-4 text-xs text-gray-500">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
            </time>
            <span className="flex items-center gap-1">
              <ClockIcon className="w-3 h-3" />
              {post.readTime} min
            </span>
          </div>
        </div>

        <Link
          href={`/blog/${post.slug}`}
          className="btn btn-secondary text-sm whitespace-nowrap self-start md:self-center"
        >
          Read Article
        </Link>
      </div>
    </article>
  )
}