'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

/**
 * Risk Meter Component
 * Visualizes a score (0-100) with color grading
 */
export function RiskMeter({ score, label, minLabel = 'Low', maxLabel = 'High' }: {
  score: number
  label: string
  minLabel?: string
  maxLabel?: string
}) {
  const getColor = (s: number) => {
    if (s < 30) return 'bg-green-500'
    if (s < 70) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-end">
        <span className="text-sm font-semibold text-gray-400 uppercase tracking-wider">{label}</span>
        <span className="text-2xl font-bold text-white">{score}%</span>
      </div>
      <div className="h-3 w-full bg-gray-800 rounded-full overflow-hidden border border-gray-700">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          className={cn("h-full transition-colors duration-500", getColor(score))}
        />
      </div>
      <div className="flex justify-between text-[10px] text-gray-500 uppercase tracking-tighter">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
    </div>
  )
}

/**
 * Insight Card
 * Displays a structured piece of analytical data
 */
export function InsightCard({ title, value, description, trend, icon: Icon }: {
  title: string
  value: string | number
  description: string
  trend?: { value: string, positive: boolean }
  icon?: React.ElementType
}) {
  return (
    <div className="glass p-6 rounded-xl border-primary/20 hover:border-primary/40 transition-all group">
      <div className="flex justify-between items-start mb-4">
        {Icon && <Icon className="w-6 h-6 text-primary" />}
        {trend && (
          <span className={cn(
            "text-xs font-bold px-2 py-1 rounded",
            trend.positive ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
          )}>
            {trend.positive ? '↑' : '↓'} {trend.value}
          </span>
        )}
      </div>
      <div className="text-sm text-gray-400 font-medium mb-1 uppercase tracking-wider">{title}</div>
      <div className="text-3xl font-bold text-white mb-3 group-hover:text-primary transition-colors">{value}</div>
      <p className="text-xs text-gray-500 leading-relaxed">{description}</p>
    </div>
  )
}

/**
 * Decision Block
 * High-impact recommendation block
 */
export function DecisionBlock({ title, action, impact, priority }: {
  title: string
  action: string
  impact: string
  priority: 'High' | 'Medium' | 'Low'
}) {
  const priorityColor = {
    High: 'text-red-500 border-red-500/30 bg-red-500/5',
    Medium: 'text-yellow-500 border-yellow-500/30 bg-yellow-500/5',
    Low: 'text-green-500 border-green-500/30 bg-green-500/5',
  }

  return (
    <div className={cn("p-5 rounded-lg border-l-4", priorityColor[priority])}>
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-bold text-white uppercase tracking-wide">{title}</h4>
        <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded border border-current">
          {priority} Priority
        </span>
      </div>
      <p className="text-sm text-gray-300 mb-3 font-serif italic">&quot;{action}&quot;</p>
      <div className="flex items-center gap-2 text-xs text-gray-500">
        <span className="font-bold text-primary uppercase">Projected Impact:</span>
        <span>{impact}</span>
      </div>
    </div>
  )
}

/**
 * Data Panel
 * Container for complex data grids
 */
export function DataPanel({ title, children, className }: { title: string, children: React.ReactNode, className?: string }) {
  return (
    <div className={cn("bg-secondary/40 border border-gray-800 rounded-2xl overflow-hidden", className)}>
      <div className="px-6 py-4 border-b border-gray-800 flex justify-between items-center">
        <h3 className="text-sm font-black text-white uppercase tracking-[0.2em]">{title}</h3>
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-red-500/50" />
          <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
          <div className="w-2 h-2 rounded-full bg-green-500/50" />
        </div>
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  )
}
