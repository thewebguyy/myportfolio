'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChatBubbleLeftRightIcon,
  XMarkIcon,
  PaperAirplaneIcon
} from '@heroicons/react/24/outline'
import { SparklesIcon } from '@heroicons/react/24/solid'

/**
 * Floating Chatbot Component
 * AI-powered assistant for portfolio Q&A
 * Provides instant answers about projects, skills, and availability
 */
export function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi! I'm Olabode's AI assistant. Ask me anything about his projects, skills, or experience!",
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const chatWindowRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const lastActiveElement = useRef<HTMLElement | null>(null)

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Accessibility: Focus trap and restore
  useEffect(() => {
    if (isOpen) {
      lastActiveElement.current = document.activeElement as HTMLElement
      inputRef.current?.focus()

      const handleTab = (e: KeyboardEvent) => {
        if (e.key === 'Tab') {
          const focusableElements = chatWindowRef.current?.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          )
          if (!focusableElements || focusableElements.length === 0) return

          const firstElement = focusableElements[0] as HTMLElement
          const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              lastElement.focus()
              e.preventDefault()
            }
          } else {
            if (document.activeElement === lastElement) {
              firstElement.focus()
              e.preventDefault()
            }
          }
        }
        if (e.key === 'Escape') {
          setIsOpen(false)
        }
      }

      window.addEventListener('keydown', handleTab)
      return () => window.removeEventListener('keydown', handleTab)
    } else {
      lastActiveElement.current?.focus()
    }
  }, [isOpen])

  // Quick action suggestions
  const quickActions = [
    'What projects have you built?',
    'Tell me about your AI experience',
    'What tech stack do you use?',
    'Are you available for hire?',
  ]

  async function sendMessage() {
    if (!input.trim() || loading) return

    const userMessage: Message = { role: 'user', content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setLoading(true)

    // Add a placeholder for the assistant's message that we'll stream into
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
        // If it's a JSON error response (like 429 or 503)
        const contentType = response.headers.get('content-type')
        if (contentType?.includes('application/json')) {
          const data = await response.json()
          setMessages((prev) => {
            const next = [...prev]
            next[next.length - 1].content = data.reply || data.error || 'Failed to get response'
            return next
          })
          return
        }
        throw new Error('Failed to get response')
      }

      // Handle streaming response
      const reader = response.body?.getReader()
      if (!reader) throw new Error('No response body')

      const decoder = new TextDecoder()
      let done = false
      let fullContent = ''

      while (!done) {
        const { value, done: doneReading } = await reader.read()
        done = doneReading
        const chunkValue = decoder.decode(value)
        fullContent += chunkValue

        // Update the last message in the list (the assistant's response)
        setMessages((prev) => {
          const next = [...prev]
          next[next.length - 1].content = fullContent
          return next
        })
      }
    } catch (error) {
      console.error('Chat error:', error)
      setMessages((prev) => {
        const next = [...prev]
        next[next.length - 1].content = "Sorry, I'm having trouble responding right now. Please try again or contact Olabode directly."
        return next
      })
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const handleQuickAction = (action: string) => {
    setInput(action)
  }

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 no-print"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full blur-lg opacity-50 animate-pulse" />
          <div className="relative bg-gradient-to-r from-primary to-secondary p-4 rounded-full shadow-2xl">
            {isOpen ? (
              <XMarkIcon className="w-6 h-6 text-black" />
            ) : (
              <ChatBubbleLeftRightIcon className="w-6 h-6 text-black" />
            )}
          </div>
          {!isOpen && (
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-950"
            />
          )}
        </div>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-24 right-6 w-[380px] h-[600px] glass rounded-2xl shadow-2xl z-50 
                     flex flex-col overflow-hidden border-primary/20 no-print"
            role="dialog"
            aria-label="Chat with Olabode's assistant"
            ref={chatWindowRef}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-secondary p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                    <SparklesIcon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-black" />
                </div>
                <div>
                  <h3 className="font-semibold text-black">Olabode&apos;s Assistant</h3>
                  <p className="text-xs text-black/70">Always online to help</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-black/10 rounded-lg transition-colors"
                aria-label="Close chat"
              >
                <XMarkIcon className="w-5 h-5 text-black" />
              </button>
            </div>

            {/* Messages */}
            <div
              className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-950/50"
              role="log"
              aria-live="polite"
              aria-relevant="additions text"
            >
              {/* Screen reader only announcer for streaming content updates */}
              <div className="sr-only" aria-live="polite" aria-atomic="true">
                {loading ? "Assistant is typing..." : messages[messages.length - 1]?.role === 'assistant' ? "Assistant: " + messages[messages.length - 1].content : ""}
              </div>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-xl ${msg.role === 'user'
                      ? 'bg-primary text-black'
                      : 'bg-gray-800 text-white'
                      }`}
                  >
                    <p className="text-sm leading-relaxed">{msg.content}</p>
                  </div>
                </motion.div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="bg-gray-800 p-3 rounded-xl">
                    <div className="flex gap-1">
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                        className="w-2 h-2 bg-gray-500 rounded-full"
                      />
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                        className="w-2 h-2 bg-gray-500 rounded-full"
                      />
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                        className="w-2 h-2 bg-gray-500 rounded-full"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            {messages.length === 1 && (
              <div className="px-4 py-3 border-t border-gray-800 bg-gray-950/50">
                <p className="text-xs text-gray-400 mb-2">Quick questions:</p>
                <div className="flex flex-wrap gap-2">
                  {quickActions.map((action) => (
                    <button
                      key={action}
                      onClick={() => handleQuickAction(action)}
                      className="px-2 py-1 bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs 
                               rounded-lg transition-colors"
                    >
                      {action}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-gray-800 bg-gray-950/50">
              <div className="flex gap-2">
                <input
                  type="text"
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask Olabode's AI..."
                  disabled={loading}
                  className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm 
                           text-white placeholder-gray-500 focus:border-primary focus:outline-none 
                           focus:ring-2 focus:ring-primary/20 disabled:opacity-50"
                />
                <motion.button
                  onClick={sendMessage}
                  disabled={!input.trim() || loading}
                  whileHover={{ scale: input.trim() && !loading ? 1.05 : 1 }}
                  whileTap={{ scale: input.trim() && !loading ? 0.95 : 1 }}
                  className="bg-primary hover:bg-primary-dark disabled:bg-gray-700 
                           text-black p-2 rounded-lg transition-colors disabled:cursor-not-allowed"
                >
                  <PaperAirplaneIcon className="w-5 h-5" />
                </motion.button>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                Powered by GPT-4 • Responses in ~2s
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

/**
 * Type definitions
 */
interface Message {
  role: 'user' | 'assistant'
  content: string
}