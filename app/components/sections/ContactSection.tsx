'use client'

import { motion } from 'framer-motion'

export function ContactSection() {
  return (
    <section id="contact" className="section-padding bg-background">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-24">
          {/* Left Column */}
          <div className="md:col-span-6 flex flex-col justify-center">
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[48px] md:text-[64px] font-semibold text-white leading-[1.1] mb-8"
            >
              Let's build something real.
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-[18px] text-text-secondary leading-[1.7] mb-12 max-w-[480px]"
            >
              I'm available for engineering roles and high-impact freelance projects. Based in Lagos, working globally.
            </motion.p>

            {/* Availability Status */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex items-center gap-3"
            >
              <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
              <span className="font-mono text-[12px] text-secondary uppercase tracking-[0.1em]">
                Currently available for work
              </span>
            </motion.div>
          </div>

          {/* Right Column: Form */}
          <div className="md:col-span-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-surface border border-surface-2 rounded-[12px] p-8 md:p-12"
            >
              <form className="space-y-8">
                <div className="space-y-2">
                  <label htmlFor="name" className="block font-mono text-[10px] uppercase text-text-muted tracking-wider">
                    Full name
                  </label>
                  <input 
                    type="text" 
                    id="name"
                    placeholder="Enter your name"
                    className="w-full bg-transparent border-b border-surface-2 py-3 text-[15px] text-white focus:outline-none focus:border-primary transition-colors placeholder:text-text-muted"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="block font-mono text-[10px] uppercase text-text-muted tracking-wider">
                    Email address
                  </label>
                  <input 
                    type="email" 
                    id="email"
                    placeholder="name@company.com"
                    className="w-full bg-transparent border-b border-surface-2 py-3 text-[15px] text-white focus:outline-none focus:border-primary transition-colors placeholder:text-text-muted"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="block font-mono text-[10px] uppercase text-text-muted tracking-wider">
                    Message
                  </label>
                  <textarea 
                    id="message"
                    rows={4}
                    placeholder="What are we building?"
                    className="w-full bg-transparent border-b border-surface-2 py-3 text-[15px] text-white focus:outline-none focus:border-primary transition-colors placeholder:text-text-muted resize-none"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full bg-secondary text-background font-semibold py-4 rounded-[6px] transition-transform hover:scale-[0.98] active:scale-[0.96]"
                >
                  Send message
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}