'use client'

import React, { useState, useEffect } from 'react'
import { CpuChipIcon, CubeTransparentIcon, GlobeAltIcon, BoltIcon } from '@heroicons/react/24/outline'

/**
 * System Status Dashboard
 * Simulates real-time system performance indicators.
 * Signals "Production Readiness" and "Observability" expertise.
 */
export function SystemStatus() {
  const [metrics, setMetrics] = useState({
    load: 42,
    latency: 184,
    uptime: '99.998%',
    requests: 2405
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        load: Math.floor(Math.random() * (48 - 38) + 38),
        latency: Math.floor(Math.random() * (195 - 175) + 175),
        requests: prev.requests + Math.floor(Math.random() * 2)
      }))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-950 border-y border-gray-900 overflow-hidden relative">
      {/* Decorative pulse */}
      <div className="absolute inset-0 bg-primary/2 opacity-[0.02] animate-pulse" />
      
      <StatusItem 
        icon={CpuChipIcon} 
        label="System Load" 
        value={`${metrics.load}%`} 
        color="primary"
      />
      <StatusItem 
        icon={BoltIcon} 
        label="Avg Latency" 
        value={`${metrics.latency}ms`} 
        color="yellow"
      />
      <StatusItem 
        icon={CubeTransparentIcon} 
        label="Request Queue" 
        value="Healthy" 
        color="green"
      />
      <StatusItem 
        icon={GlobeAltIcon} 
        label="Active Nodes" 
        value="03 / 03" 
        color="blue"
      />
    </div>
  )
}

function StatusItem({ icon: Icon, label, value, color }: { icon: React.ElementType, label: string, value: string, color: string }) {
  const colorMap: Record<string, string> = {
    primary: 'text-primary border-primary/20 bg-primary/5',
    yellow: 'text-yellow-500 border-yellow-500/20 bg-yellow-500/5',
    green: 'text-green-500 border-green-500/20 bg-green-500/5',
    blue: 'text-blue-500 border-blue-500/20 bg-blue-500/5'
  }

  return (
    <div className="flex items-center gap-3 px-4 py-2">
      <div className={`p-2 rounded border ${colorMap[color]}`}>
        <Icon className="w-3 h-3" />
      </div>
      <div>
        <div className="text-[8px] font-black text-gray-600 uppercase tracking-widest">{label}</div>
        <div className="text-[10px] font-black text-white uppercase tabular-nums">{value}</div>
      </div>
    </div>
  )
}
