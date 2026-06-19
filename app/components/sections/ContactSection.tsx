'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'

export function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '', website: '' })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'submitted' | 'error' | 'formspreeUnconfigured'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')
    setErrorMessage('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (res.status === 503) {
        setStatus('formspreeUnconfigured')
        return
      }

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to send message.')
      }

      setStatus('submitted')
      setFormData({ name: '', email: '', message: '', website: '' })
    } catch (err: unknown) {
      setStatus('error')
      setErrorMessage(err instanceof Error ? err.message : 'An unexpected error occurred.')
    }
  }

  return (
    <section id="contact" className="section-padding bg-background border-b-[0.5px] border-border-wire">
      <div className="max-w-[1440px] mx-auto border-x-[0.5px] border-border-wire px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Copy + Engagement Specs */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[40px] md:text-[56px] text-text-primary font-display font-semibold tracking-tight leading-[1.1] mb-8"
            >
              Let&apos;s build something real.
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-mono text-[14px] text-text-secondary leading-[1.7] mb-8 max-w-[480px]"
            >
              I&apos;m available for senior engineering roles and high-impact contract engagements. Based in Lagos, working globally.
            </motion.p>

            {/* How I Engage Spec Grid */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="border-t-[0.5px] border-l-[0.5px] border-border-wire bg-surface/30 font-mono text-[11px] mb-8"
            >
              <div className="grid grid-cols-3 border-b-[0.5px] border-r-[0.5px] border-border-wire">
                <div className="p-3 text-text-accent font-semibold uppercase tracking-wider border-r-[0.5px] border-border-wire">Response</div>
                <div className="p-3 text-text-secondary col-span-2">24h weekdays</div>
              </div>
              <div className="grid grid-cols-3 border-b-[0.5px] border-r-[0.5px] border-border-wire">
                <div className="p-3 text-text-accent font-semibold uppercase tracking-wider border-r-[0.5px] border-border-wire">Timezone</div>
                <div className="p-3 text-text-secondary col-span-2">WAT (UTC+1)</div>
              </div>
              <div className="grid grid-cols-3 border-b-[0.5px] border-r-[0.5px] border-border-wire">
                <div className="p-3 text-text-accent font-semibold uppercase tracking-wider border-r-[0.5px] border-border-wire">Open To</div>
                <div className="p-3 text-text-secondary col-span-2">Full-time · Contract</div>
              </div>
              <div className="grid grid-cols-3 border-b-[0.5px] border-r-[0.5px] border-border-wire">
                <div className="p-3 text-text-accent font-semibold uppercase tracking-wider border-r-[0.5px] border-border-wire">Process</div>
                <div className="p-3 text-text-secondary col-span-2">Scope → RFC → Build → Uptime</div>
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex items-center gap-6 font-mono text-[11px] text-text-accent uppercase tracking-widest"
            >
              <a href="https://linkedin.com/in/thewebguyy" target="_blank" rel="noopener noreferrer" className="hover:text-text-primary transition-colors">
                LinkedIn ↗
              </a>
              <a href="https://github.com/thewebguyy" target="_blank" rel="noopener noreferrer" className="hover:text-text-primary transition-colors">
                GitHub ↗
              </a>
              <a href="https://x.com/BodeBillions" target="_blank" rel="noopener noreferrer" className="hover:text-text-primary transition-colors">
                Twitter ↗
              </a>
            </motion.div>
          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-7 w-full">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-surface/20 border border-border-wire p-8 md:p-12 relative"
            >
              <div aria-live="polite">
                {status === 'submitted' ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
                    <div className="w-12 h-12 bg-primary/10 border border-primary/20 flex items-center justify-center mb-2">
                      <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-[20px] font-display font-semibold text-text-primary">Message Received.</h3>
                    <p className="text-[13px] text-text-secondary font-mono">I respond within 24 hours on weekdays.</p>
                  </div>
                ) : status === 'formspreeUnconfigured' ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center space-y-4 font-mono">
                     <p className="text-[13px] text-text-secondary">Contact endpoint unconfigured.</p>
                     <p className="text-[13px] text-text-secondary">Please reach out via <a href="https://linkedin.com/in/thewebguyy" className="text-text-accent hover:underline">LinkedIn</a>.</p>
                  </div>
                ) : (
                  <form className="space-y-8" onSubmit={handleSubmit}>
                    <input 
                      type="text" 
                      name="website" 
                      aria-hidden="true" 
                      style={{display:'none'}} 
                      tabIndex={-1} 
                      value={formData.website}
                      onChange={e => setFormData({...formData, website: e.target.value})}
                    />

                    <div className="space-y-2">
                      <label htmlFor="name" className="block font-mono text-[10px] uppercase text-text-muted tracking-wider">
                        Full name
                      </label>
                      <input 
                        type="text" 
                        id="name"
                        required
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-transparent border-b border-border-wire py-3 text-[14px] font-mono text-white focus:outline-none focus:border-primary transition-colors placeholder:text-text-muted"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="block font-mono text-[10px] uppercase text-text-muted tracking-wider">
                        Email address
                      </label>
                      <input 
                        type="email" 
                        id="email"
                        required
                        placeholder="name@company.com"
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-transparent border-b border-border-wire py-3 text-[14px] font-mono text-white focus:outline-none focus:border-primary transition-colors placeholder:text-text-muted"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="block font-mono text-[10px] uppercase text-text-muted tracking-wider">
                        Message
                      </label>
                      <textarea 
                        id="message"
                        required
                        rows={4}
                        maxLength={2000}
                        placeholder="What are we building?"
                        value={formData.message}
                        onChange={e => setFormData({...formData, message: e.target.value})}
                        className="w-full bg-transparent border-b border-border-wire py-3 text-[14px] font-mono text-white focus:outline-none focus:border-primary transition-colors placeholder:text-text-muted resize-none"
                      />
                      <div className="flex justify-between items-center mt-1">
                        <span />
                        <span className={`font-mono text-[10px] ${formData.message.length > 1800 ? 'text-primary' : 'text-text-muted'}`}>
                          {formData.message.length}/2000
                        </span>
                      </div>
                    </div>

                    {status === 'error' && (
                      <p className="text-red-500 font-mono text-[12px]" aria-live="assertive">{errorMessage}</p>
                    )}

                    <button 
                      type="submit"
                      disabled={status === 'submitting'}
                      className="w-full bg-primary text-white font-mono text-[11px] uppercase tracking-widest py-4 transition-colors duration-200 border-[0.5px] border-primary hover:bg-primary-light hover:border-primary-light disabled:opacity-50"
                    >
                      {status === 'submitting' ? 'Sending…' : 'Send message'}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}