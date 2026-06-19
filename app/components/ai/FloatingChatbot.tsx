'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  XMarkIcon,
  PaperAirplaneIcon,
  CodeBracketIcon
} from '@heroicons/react/24/outline'

/**
 * Engineering Assistant — Q&A about projects, stack choices, and AI integrations.
 */
export function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "I'm Olabode's assistant, configured with context about his stack and engineering approach. Ask me about rate limiting, systems design, or his project architecture. For contract inquiries, use the contact form.",
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const chatWindowRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Monitor document body class list for mobile-menu-open
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsMobileMenuOpen(document.body.classList.contains('mobile-menu-open'))
    })
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] })
    setIsMobileMenuOpen(document.body.classList.contains('mobile-menu-open'))
    return () => observer.disconnect()
  }, [])

  // Auto focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 150)
    }
  }, [isOpen])

  // Close chatbot when mobile menu opens
  useEffect(() => {
    if (isMobileMenuOpen) {
      setIsOpen(false)
    }
  }, [isMobileMenuOpen])

  // Focus trap and Escape key behavior when chatbot is open
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false)
        return
      }

      if (e.key !== 'Tab') return

      const container = chatWindowRef.current
      if (!container) return

      const focusables = container.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])'
      )
      if (focusables.length === 0) return

      const first = focusables[0]
      const last = focusables[focusables.length - 1]

      if (e.shiftKey) {
        if (document.activeElement === first) {
          last.focus()
          e.preventDefault()
        }
      } else {
        if (document.activeElement === last) {
          first.focus()
          e.preventDefault()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  const quickActions = [
    'How do you handle rate limiting?',
    "What's your stack?",
  ]

  async function executeChatStream(userMessage: Message) {
    setMessages((prev) => [...prev, userMessage])
    setLoading(true)

    const assistantMessagePlaceholder: Message = { role: 'assistant', content: '' }
    setMessages((prev) => [...prev, assistantMessagePlaceholder])

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        setMessages((prev) => {
          const next = [...prev]
          next[next.length - 1].content = data.reply || data.error || 'Advisory service interrupted.'
          return next
        })
        return
      }

      const reader = response.body?.getReader()
      if (!reader) throw new Error('No response stream')

      const decoder = new TextDecoder()
      let done = false
      let fullContent = ''

      while (!done) {
        const { value, done: doneReading } = await reader.read()
        done = doneReading
        const chunkValue = decoder.decode(value)
        fullContent += chunkValue

        setMessages((prev) => {
          const next = [...prev]
          next[next.length - 1].content = fullContent
          return next
        })
      }
    } catch (error) {
      setMessages((prev) => {
        const next = [...prev]
        next[next.length - 1].content = "Assistant currently unavailable. Please reach out via LinkedIn."
        return next
      })
    } finally {
      setLoading(false)
    }
  }

  async function sendMessage() {
    if (!input.trim() || loading) return

    const userMessage: Message = { role: 'user', content: input }
    setInput('')
    await executeChatStream(userMessage)
  }

  async function handleQuickAction(actionText: string) {
    if (loading) return

    const userMessage: Message = { role: 'user', content: actionText }
    await executeChatStream(userMessage)
  }

  if (isMobileMenuOpen) return null

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 no-print"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        aria-label={isOpen ? "Close chat assistant" : "Open chat assistant"}
      >
        <div className="relative">
          <div className="absolute inset-0 bg-primary/10 blur-md" />
          <div className="relative bg-surface border border-border-wire p-4 shadow-xl flex items-center justify-center text-text-accent">
            {isOpen ? <XMarkIcon className="w-5 h-5" /> : <CodeBracketIcon className="w-5 h-5" />}
          </div>
        </div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.98 }}
            className="fixed bottom-24 right-6 w-[calc(100vw-48px)] sm:w-[380px] h-[calc(100vh-160px)] sm:h-[540px] bg-surface border border-border-wire shadow-2xl z-50 flex flex-col overflow-hidden no-print"
            ref={chatWindowRef}
          >
            {/* Header */}
            <div className="bg-surface-2 border-b border-border-wire p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary/10 border border-border-wire flex items-center justify-center">
                  <CodeBracketIcon className="w-5 h-5 text-text-accent" />
                </div>
                <div>
                  <h3 className="text-[11px] font-mono font-semibold text-text-primary uppercase tracking-wider">Engineering Assistant</h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span className="text-[8px] text-text-secondary uppercase font-bold tracking-widest">Active</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="text-text-muted hover:text-text-primary transition-colors"
                aria-label="Close chat"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-surface/50 scrollbar-hide">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-4 text-[12px] leading-relaxed font-mono ${msg.role === 'user'
                      ? 'bg-primary/10 text-text-primary border border-border-wire ml-6'
                      : 'bg-surface-2 text-text-primary/95 border border-border-wire mr-6'
                      }`}
                  >
                    {msg.content.split('\n').map((line, idx) => (
                      <p key={idx} className={line.startsWith('**') ? 'font-semibold text-text-accent mt-2' : ''}>
                        {line}
                      </p>
                    ))}
                  </div>
                </motion.div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-surface-2 p-4 border border-border-wire">
                    <div className="flex gap-1.5">
                      <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: 0 }} className="w-1.5 h-1.5 bg-text-accent rounded-full" />
                      <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: 0.2 }} className="w-1.5 h-1.5 bg-text-accent rounded-full" />
                      <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: 0.4 }} className="w-1.5 h-1.5 bg-text-accent rounded-full" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input & Quick Actions */}
            <div className="p-4 bg-surface border-t border-border-wire">
              {messages.length === 1 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {quickActions.map((action) => (
                    <button
                      key={action}
                      onClick={() => handleQuickAction(action)}
                      className="px-2 py-1.5 bg-surface-2 hover:bg-primary/10 text-text-secondary hover:text-text-accent text-[9px] font-mono uppercase border border-border-wire transition-all"
                    >
                      {action}
                    </button>
                  ))}
                </div>
              )}
              <div className="flex gap-2">
                <input
                  type="text"
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Ask about architecture or systems..."
                  className="flex-1 bg-background border border-border-wire px-3 py-2 text-[12px] font-mono text-white placeholder-text-muted focus:border-primary focus:outline-none transition-all"
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || loading}
                  className="bg-primary text-white p-2 hover:bg-primary-light transition-all disabled:opacity-50 border border-primary"
                >
                  <PaperAirplaneIcon className="w-4 h-4" />
                </button>
              </div>
              <div className="mt-2.5 flex justify-between items-center text-[8px] font-mono uppercase text-text-muted tracking-widest">
                <span>Claude · Anthropic</span>
                <span>streaming</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

interface Message {
  role: 'user' | 'assistant'
  content: string
}