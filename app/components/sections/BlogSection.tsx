'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { blogPosts } from '@/lib/blog'

export function BlogSection() {
  const featuredPosts = blogPosts.slice(0, 5)

  return (
    <section id="writing" className="border-b-[0.5px] border-border-wire bg-background">
      <div className="max-w-[1440px] mx-auto border-x-[0.5px] border-border-wire">
        {/* Archive Header */}
        <div className="border-b-[0.5px] border-border-wire px-8 lg:px-16 py-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-mono text-[11px] text-text-accent uppercase tracking-widest mb-6"
          >
            [SYSTEM_LOG: DOCUMENTATION_ARCHIVE]
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[40px] md:text-[56px] text-text-primary font-serif tracking-tight"
          >
            The Archive.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-mono text-[14px] text-text-primary/70 max-w-[600px] mt-6 leading-[1.8]"
          >
            Technical thinking, architectural decisions, and post-mortems. High-density scanning enabled.
          </motion.p>
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

          {featuredPosts.map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link href={`/blog/${post.slug}`}>
                <div className="group grid grid-cols-1 md:grid-cols-12 border-b-[0.5px] border-border-wire px-8 lg:px-16 py-8 transition-colors hover:bg-surface/50 items-start">
                  
                  {/* Date */}
                  <div className="md:col-span-2 font-mono text-[13px] text-text-primary/70 mb-4 md:mb-0 pt-1">
                    {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}
                  </div>
                  
                  {/* Category */}
                  <div className="md:col-span-2 font-mono text-[11px] text-text-accent uppercase tracking-widest mb-4 md:mb-0 pt-1">
                    [{post.category}]
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
                      [READ_DOC]
                    </span>
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
