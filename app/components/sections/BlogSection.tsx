'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { blogPosts } from '@/lib/blog'

export function BlogSection() {
  const featuredPosts = blogPosts.slice(0, 3)

  return (
    <section id="writing" className="section-padding bg-background">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Header */}
        <div className="mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="label mb-4 block"
          >
            Writing
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="h2 text-white mb-4"
          >
            Technical thinking
          </motion.h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredPosts.map((post, index) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="group cursor-pointer relative"
            >
              <Link href={`/blog/${post.slug}`}>
                <div className="flex flex-col h-full">
                  <span className="font-mono text-[10px] uppercase text-secondary tracking-[0.1em] mb-3">
                    {post.category}
                  </span>
                  
                  <h3 className="font-sans font-semibold text-[20px] text-white leading-[1.3] mb-3 line-clamp-2 transition-colors group-hover:text-primary">
                    {post.title}
                  </h3>
                  
                  <p className="text-[14px] text-text-secondary leading-[1.6] mb-6 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="mt-auto pt-6 border-b border-surface-2 group-hover:border-primary transition-colors duration-300 pb-6 flex items-center justify-between">
                    <div className="font-mono text-[11px] text-text-muted">
                      {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} · {post.readTime} min read
                    </div>
                    
                    <div className="text-text-muted transition-all duration-300 group-hover:text-primary group-hover:translate-x-1">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 10H15M15 10L10 5M15 10L10 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
