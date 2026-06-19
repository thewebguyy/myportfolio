'use client'

import { motion } from 'framer-motion'

export function Manifesto() {
  return (
    <section id="manifesto" className="border-b-[0.5px] border-border-wire bg-background">
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
              How I work
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[40px] md:text-[56px] text-text-primary font-display font-semibold tracking-tight leading-[1.1]"
            >
              Build it right. Ship it fast.<br />
              <span className="opacity-70">Keep it running.</span>
            </motion.h2>
          </div>

          {/* Right Column / Body */}
          <div className="lg:col-span-7 font-mono text-[14px] text-text-primary/80 leading-[1.8] space-y-8 mt-2 lg:mt-0">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Good software is specific. The engineers I respect most can tell you exactly which edge case kept them up at night, what the fix was, and why the naive solution would have failed in three months. Vague confidence is easy. Specific knowledge is earned.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              I believe the job is closer to infrastructure than craft. Your code will be read by strangers, run on machines you don&apos;t control, and stressed by users who don&apos;t behave the way you expected. That&apos;s the real specification. Everything else is prototype.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 }}
            >
              I also believe in finishing things. Shipped and imperfect beats polished and theoretical. The only way to know if something actually works is to let it meet production.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="pt-6 mt-6 border-t-[0.5px] border-border-wire"
            >
              <a href="#contact" className="inline-flex items-center gap-3 text-text-primary hover:text-text-accent transition-colors duration-300 uppercase tracking-widest text-[13px]">
                <span className="w-2 h-2 bg-text-accent inline-block"></span>
                Get in touch
              </a>
            </motion.div>
          </div>

        </div>

        {/* Engineering Principles Section */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-24 pt-16 border-t-[0.5px] border-border-wire"
        >
          <h3 className="font-mono text-[11px] uppercase tracking-widest text-text-accent mb-10">Engineering Principles</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 border-t-[0.5px] border-l-[0.5px] border-border-wire bg-surface/20">
            {[
              { num: '01', title: 'Reliability before scale' },
              { num: '02', title: 'Measure before optimizing' },
              { num: '03', title: 'Automate repetitive work' },
              { num: '04', title: 'Prefer simple systems' },
              { num: '05', title: 'Ship, observe, improve' }
            ].map((pr, idx) => (
              <div key={idx} className="p-8 border-r-[0.5px] border-b-[0.5px] border-border-wire font-mono flex flex-col justify-between min-h-[160px]">
                <div className="text-[36px] font-display font-bold text-text-accent/30 leading-none">{pr.num}</div>
                <div className="text-[13px] font-medium text-text-primary uppercase tracking-wider mt-6">{pr.title}</div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}
