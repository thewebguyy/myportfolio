'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CodeBracketIcon, ServerIcon, QueueListIcon } from '@heroicons/react/24/outline'
import { cn } from '@/lib/utils'

interface TechnicalDetailsProps {
  flow: string[]
  prompt: string
  logic: string
  className?: string
}

/**
 * Engineering Transparency Component
 * Proves that the system is architected, not just a UI.
 */
export function TechnicalDetails({ flow, prompt, logic, className }: TechnicalDetailsProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={cn("mt-6", className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] hover:text-primary transition-all group"
      >
        <CodeBracketIcon className="w-4 h-4 group-hover:rotate-12 transition-transform" />
        {isOpen ? 'Hide' : 'View'} Technical Implementation
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-4 p-6 bg-gray-950 border border-gray-900 rounded-2xl space-y-6">
              {/* API Flow */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[10px] font-black text-gray-600 uppercase tracking-widest">
                  <ServerIcon className="w-3 h-3" />
                  Orchestration Pipeline
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  {flow.map((step, i) => (
                    <React.Fragment key={i}>
                      <span className="px-2 py-1 bg-gray-900 border border-gray-800 rounded text-[9px] text-gray-400 font-mono">
                        {step}
                      </span>
                      {i < flow.length - 1 && <span className="text-gray-700">→</span>}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Prompt Strategy */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[10px] font-black text-gray-600 uppercase tracking-widest">
                  <QueueListIcon className="w-3 h-3" />
                  Prompt Injection & Context Strategy
                </div>
                <div className="p-4 bg-black/50 border border-gray-800 rounded-lg text-[10px] text-gray-500 font-mono leading-relaxed whitespace-pre-wrap italic">
                  {prompt}
                </div>
              </div>

              {/* Data Handling */}
              <div className="space-y-3">
                <div className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Persistence & Scaling</div>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {logic}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
