'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

/**
 * Performance Meter Component
 */
export function PerformanceMeter({ score, label, minLabel = 'Low', maxLabel = 'High' }: {
  score: number
  label: string
  minLabel?: string
  maxLabel?: string
}) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-end">
        <span className="font-mono text-[10px] text-text-muted uppercase tracking-wider">{label}</span>
        <span className="text-[24px] font-semibold text-white leading-none">{score}%</span>
      </div>
      <div className="h-1.5 w-full bg-surface-2 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${score}%` }}
          viewport={{ once: true }}
          className="h-full bg-primary"
        />
      </div>
      <div className="flex justify-between font-mono text-[9px] text-text-muted uppercase tracking-tighter">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
    </div>
  )
}

/**
 * Technical Insight Card
 */
export function TechnicalInsightCard({ title, value, description, trend, icon: Icon }: {
  title: string
  value: string | number
  description: string
  trend?: { value: string, positive: boolean }
  icon?: React.ElementType
}) {
  return (
    <div className="bg-surface p-6 rounded-[12px] border border-surface-2 hover:border-border-accent hover:shadow-2xl hover:shadow-primary/5 transition-all group">
      <div className="flex justify-between items-start mb-4">
        {Icon && <Icon className="w-5 h-5 text-primary" />}
        {trend && (
          <span className={cn(
            "font-mono text-[10px] font-bold px-2 py-0.5 rounded",
            trend.positive ? "bg-secondary/10 text-secondary" : "bg-red-500/10 text-red-500"
          )}>
            {trend.positive ? '↑' : '↓'} {trend.value}
          </span>
        )}
      </div>
      <div className="font-mono text-[10px] text-text-muted mb-1 uppercase tracking-wider">{title}</div>
      <div className="text-[28px] font-semibold text-white mb-2 group-hover:text-primary transition-colors">{value}</div>
      <p className="text-[13px] text-text-secondary leading-relaxed">{description}</p>
    </div>
  )
}

/**
 * Engineering Decision Block
 */
export function EngineeringDecisionBlock({ title, action, impact, priority }: {
  title: string
  action: string
  impact: string
  priority: 'High' | 'Medium' | 'Low'
}) {
  const priorityColor = {
    High: 'border-primary',
    Medium: 'border-secondary',
    Low: 'border-surface-2',
  }

  return (
    <div className={cn("p-6 rounded-[8px] border-l-2 bg-surface", priorityColor[priority])}>
      <div className="flex justify-between items-center mb-4">
        <h4 className="font-sans font-semibold text-white text-[16px] uppercase tracking-wide">{title}</h4>
        <span className="font-mono text-[9px] uppercase px-2 py-0.5 rounded border border-surface-2 text-text-muted">
          {priority} Priority
        </span>
      </div>
      <p className="font-serif italic text-[15px] text-text-secondary mb-4">&quot;{action}&quot;</p>
      <div className="flex items-center gap-2">
        <span className="font-mono text-[10px] text-primary uppercase">Impact:</span>
        <span className="text-[13px] text-text-muted">{impact}</span>
      </div>
    </div>
  )
}

/**
 * Architecture Panel
 */
export function ArchitecturePanel({ title, children, className }: { title: string, children: React.ReactNode, className?: string }) {
  return (
    <div className={cn("bg-surface border border-surface-2 rounded-[12px] overflow-hidden", className)}>
      <div className="px-6 py-4 border-b border-surface-2 flex justify-between items-center bg-background/50">
        <h3 className="font-mono text-[10px] font-bold text-text-muted uppercase tracking-[0.2em]">{title}</h3>
        <div className="flex gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-surface-2" />
          <div className="w-1.5 h-1.5 rounded-full bg-surface-2" />
          <div className="w-1.5 h-1.5 rounded-full bg-surface-2" />
        </div>
      </div>
      <div className="p-8">
        {children}
      </div>
    </div>
  )
}
