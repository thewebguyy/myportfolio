'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChatBubbleLeftRightIcon,
  XMarkIcon,
  PaperAirplaneIcon,
  ShieldCheckIcon,
  AcademicCapIcon
} from '@heroicons/react/24/outline'
import { SparklesIcon } from '@heroicons/react/24/solid'

/**
 * AI Business Advisor
 * Advanced consulting interface for strategic Q&A.
 */
export function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Welcome to the Strategic Audit Interface. I am your AI Business Advisor. How can I assist with your operational or technical strategy today?",
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const chatWindowRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const quickActions = [
    'Analyze my business model',
    'Audit technical risk',
    'Evaluate ROI potential',
    'Strategic frameworks',
  ]

  async function sendMessage() {
    if (!input.trim() || loading) return

    const userMessage: Message = { role: 'user', content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput('')
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
        next[next.length - 1].content = "Strategic advisory currently unavailable. Please reach out via formal channels."
        return next
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 no-print"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="relative">
          <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
          <div className="relative bg-secondary border border-primary/40 p-4 rounded-full shadow-2xl">
            {isOpen ? <XMarkIcon className="w-6 h-6 text-primary" /> : <ShieldCheckIcon className="w-6 h-6 text-primary" />}
          </div>
        </div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 w-[420px] h-[650px] bg-secondary border border-primary/20 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden no-print"
            ref={chatWindowRef}
          >
            {/* Header */}
            <div className="bg-gray-900 border-b border-gray-800 p-5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-primary/10 border border-primary/30 rounded flex items-center justify-center">
                  <AcademicCapIcon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-white uppercase tracking-[0.2em]">Strategy Advisor</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    <span className="text-[10px] text-gray-500 uppercase font-bold tracking-tighter">Analytical Mode Active</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-white transition-colors">
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-secondary/80 custom-scrollbar">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[90%] p-4 rounded-lg text-sm leading-relaxed ${msg.role === 'user'
                      ? 'bg-primary/20 text-white border border-primary/30 ml-8'
                      : 'bg-gray-900 text-gray-300 border border-gray-800 mr-8 font-serif italic'
                      }`}
                  >
                    {msg.content.split('\n').map((line, idx) => (
                      <p key={idx} className={line.startsWith('**') ? 'font-bold text-white mt-2' : ''}>
                        {line}
                      </p>
                    ))}
                  </div>
                </motion.div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-gray-900 p-4 rounded-lg border border-gray-800">
                    <div className="flex gap-1.5">
                      <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: 0 }} className="w-1.5 h-1.5 bg-primary rounded-full" />
                      <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: 0.2 }} className="w-1.5 h-1.5 bg-primary rounded-full" />
                      <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: 0.4 }} className="w-1.5 h-1.5 bg-primary rounded-full" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input & Quick Actions */}
            <div className="p-5 bg-gray-900 border-t border-gray-800">
              {messages.length === 1 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {quickActions.map((action) => (
                    <button
                      key={action}
                      onClick={() => setInput(action)}
                      className="px-2 py-1 bg-gray-800 hover:bg-primary/20 text-gray-400 hover:text-primary text-[10px] font-black uppercase rounded border border-gray-700 transition-all"
                    >
                      {action}
                    </button>
                  ))}
                </div>
              )}
              <div className="flex gap-3">
                <input
                  type="text"
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Inquire about strategy or audit..."
                  className="flex-1 bg-gray-950 border border-gray-800 rounded px-4 py-3 text-xs text-white placeholder-gray-600 focus:border-primary focus:outline-none transition-all"
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || loading}
                  className="bg-primary text-white p-3 rounded hover:bg-primary-light transition-all disabled:opacity-50"
                >
                  <PaperAirplaneIcon className="w-5 h-5" />
                </button>
              </div>
              <div className="mt-3 flex justify-between items-center text-[9px] font-black uppercase text-gray-600 tracking-widest">
                <span>Enterprise Strategy Engine</span>
                <span>ROI Focused</span>
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