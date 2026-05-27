'use client'

import { motion } from 'framer-motion'

export function About() {
  return (
    <section id="about" className="border-b-[0.5px] border-border-wire bg-background">
      <div className="max-w-[1440px] mx-auto border-x-[0.5px] border-border-wire px-8 lg:px-16 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column / Header */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-mono text-[11px] text-text-accent uppercase tracking-widest mb-6"
            >
              About
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[40px] md:text-[56px] text-text-primary font-serif tracking-tight leading-[1.1]"
            >
              Background
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-12 space-y-6"
            >
              <div className="flex flex-wrap gap-2">
                <span className="pill-tag px-3 py-1 text-[10px]">TypeScript</span>
                <span className="pill-tag px-3 py-1 text-[10px]">React / Next.js</span>
                <span className="pill-tag px-3 py-1 text-[10px]">Node.js</span>
                <span className="pill-tag px-3 py-1 text-[10px]">PostgreSQL</span>
                <span className="pill-tag px-3 py-1 text-[10px]">Redis</span>
                <span className="pill-tag px-3 py-1 text-[10px]">AWS</span>
              </div>
              <div className="flex items-center gap-4 pt-4">
                <a href="https://linkedin.com/in/thewebguyy" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-text-primary transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                  </svg>
                  <span className="sr-only">LinkedIn</span>
                </a>
                <a href="https://github.com/thewebguyy" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-text-primary transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                  <span className="sr-only">GitHub</span>
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right Column / Body */}
          <div className="lg:col-span-7 font-mono text-[14px] text-text-primary/80 leading-[1.8] space-y-8 mt-2 lg:mt-0">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              I&apos;ve spent the last five years writing code that handles real money, real users, and real failure modes. My work spans fintech loan infrastructure, payment checkout systems, health data platforms, and marketplace products — mostly as the sole engineer, which means I&apos;ve owned the architecture, the security decisions, and the 2am incidents.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              I&apos;m based in Lagos. Most of my work is for Nigerian or diaspora-facing products, which means the constraints are real: flaky networks, payment provider inconsistencies, users who don&apos;t have the luxury of a fast connection. Those constraints made me a better engineer than any greenfield project could have.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="pt-8 mt-8 border-t-[0.5px] border-border-wire"
            >
              <p className="font-semibold text-text-primary">
                Right now I&apos;m looking for a senior or founding engineer role where the problems are hard and the codebase is something to be proud of. I&apos;m most useful on teams that need someone who can move fast without leaving a mess behind.
              </p>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}
