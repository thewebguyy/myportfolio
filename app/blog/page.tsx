import { Metadata } from 'next'
import Link from 'next/link'
import { blogPosts } from '@/lib/blog'

export const metadata: Metadata = {
  title: 'Blog - Tech Insights',
  description: 'Technical articles on AI, system design, performance optimization, and emerging technologies.',
}

export default function BlogPage() {
  // Sort posts by date descending
  const sortedPosts = [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  return (
    <main className="min-h-screen bg-background border-b-[0.5px] border-border-wire">
      <div className="max-w-[1440px] mx-auto border-x-[0.5px] border-border-wire pt-24">
        
        {/* Back Link */}
        <div className="px-8 lg:px-16 pt-8">
          <Link
            href="/"
            className="font-mono text-[11px] text-text-secondary hover:text-text-accent transition-colors uppercase tracking-widest inline-flex items-center gap-2"
          >
            ← Back to Home
          </Link>
        </div>

        {/* Ledger Header */}
        <div className="border-b-[0.5px] border-border-wire px-8 lg:px-16 py-16">
          <div className="font-mono text-[11px] text-text-accent uppercase tracking-widest mb-6">
            Writing
          </div>
          <h1 className="hero-heading text-[48px] md:text-[64px] lg:text-[76px] leading-[1.05] text-text-primary tracking-tight font-serif">
            The Complete Archive.
          </h1>
          <p className="font-mono text-[14px] text-text-primary/70 max-w-[600px] mt-6 leading-[1.8]">
            Technical investigations, architectural tradeoffs, and performance audits. Use columns to scan details quickly.
          </p>
        </div>

        {/* Documentation List */}
        <div className="flex flex-col">
          {/* Table Header */}
          <div className="hidden md:grid grid-cols-12 border-b-[0.5px] border-border-wire px-8 lg:px-16 py-4 font-mono text-[11px] text-text-accent/60 uppercase tracking-widest bg-surface/30">
            <div className="col-span-2">Date</div>
            <div className="col-span-2">Category</div>
            <div className="col-span-6">Title & Summary</div>
            <div className="col-span-2 text-right">Action</div>
          </div>

          {sortedPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <div className="group grid grid-cols-1 md:grid-cols-12 border-b-[0.5px] border-border-wire px-8 lg:px-16 py-8 transition-colors hover:bg-surface/50 items-start">
                
                {/* Date & Category on Mobile */}
                <div className="flex items-center gap-3 font-mono text-[11px] mb-3 md:hidden">
                  <span className="text-text-primary/60">
                    {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}
                  </span>
                  <span className="text-text-primary/30">•</span>
                  <span className="text-text-accent uppercase tracking-widest">
                    {post.category}
                  </span>
                </div>

                {/* Desktop Date */}
                <div className="hidden md:block md:col-span-2 font-mono text-[13px] text-text-primary/70 pt-1">
                  {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}
                </div>
                
                {/* Desktop Category */}
                <div className="hidden md:block md:col-span-2 font-mono text-[11px] text-text-accent uppercase tracking-widest pt-1">
                  {post.category}
                </div>
                
                {/* Content */}
                <div className="md:col-span-6 pr-8">
                  <h3 className="font-serif text-[24px] text-text-primary leading-tight mb-2 group-hover:text-text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="font-mono text-[13px] text-text-primary/60 leading-[1.6]">
                    {post.excerpt}
                  </p>
                </div>
                
                {/* Action */}
                <div className="hidden md:flex col-span-2 justify-end pt-1">
                  <span className="font-mono text-[11px] text-text-accent/0 group-hover:text-text-accent uppercase tracking-widest transition-colors">
                    Read →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}