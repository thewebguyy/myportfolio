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
    } catch (err: unknown) {
      setStatus('error')
      setErrorMessage(err instanceof Error ? err.message : 'An unexpected error occurred.')
    }
  }

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
              Let&apos;s build something real.
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-[18px] text-text-secondary leading-[1.7] mb-12 max-w-[480px]"
            >
              I&apos;m available for engineering roles and high-impact freelance projects. Based in Lagos, working globally.
            </motion.p>

          </div>

          {/* Right Column: Form */}
          <div className="md:col-span-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-surface border border-surface-2 rounded-[12px] p-8 md:p-12 relative"
            >
              <div aria-live="polite">
                {status === 'submitted' ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
                    <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mb-4">
                      <svg className="w-8 h-8 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white">Thanks.</h3>
                    <p className="text-text-secondary">I&apos;ll be in touch within 48 hours.</p>
                  </div>
                ) : status === 'formspreeUnconfigured' ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
                     <p className="text-text-secondary">Contact form is being configured.</p>
                     <p className="text-text-secondary">Please reach out via <a href="https://linkedin.com/in/thewebguyy" className="text-primary hover:underline">LinkedIn</a>.</p>
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
                        required
                        placeholder="name@company.com"
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-transparent border-b border-surface-2 py-3 text-[15px] text-white focus:outline-none focus:border-primary transition-colors placeholder:text-text-muted"
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
                        placeholder="What are we building?"
                        value={formData.message}
                        onChange={e => setFormData({...formData, message: e.target.value})}
                        className="w-full bg-transparent border-b border-surface-2 py-3 text-[15px] text-white focus:outline-none focus:border-primary transition-colors placeholder:text-text-muted resize-none"
                      />
                    </div>

                    {status === 'error' && (
                      <p className="text-red-500 text-sm" aria-live="assertive">{errorMessage}</p>
                    )}

                    <button 
                      type="submit"
                      disabled={status === 'submitting'}
                      className="w-full bg-secondary text-background font-semibold py-4 rounded-[6px] transition-transform hover:scale-[0.98] active:scale-[0.96] disabled:opacity-70 disabled:cursor-not-allowed"
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