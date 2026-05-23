'use client'

import React, { useState, useEffect } from 'react'
import { sysStorage, SystemReport } from '@/lib/storage'
import { BoltIcon } from '@heroicons/react/24/outline'

/**
 * System Activity Feed
 * Displays live simulated/stored activity to signal active system usage.
 */
export function SystemActivityFeed() {
  const [activities, setActivities] = useState<SystemReport[]>([])

  useEffect(() => {
    // Load initial from storage
    const stored = sysStorage.getReports()
    setActivities(stored)

    // Simulate real-time updates every 15-30s if storage is empty or low
    if (stored.length < 5) {
       const mockActivity: SystemReport = {
         id: crypto.randomUUID(),
         type: 'audit',
         timestamp: new Date().toISOString(),
         input: { businessType: 'Manufacturing', challenge: 'Supply Chain Audit' },
         output: { auditResult: { currentState: 'Processing legacy logs.' } },
         metadata: { latency: 1240, userId: 'sim-user' }
       }
       setActivities(prev => [mockActivity, ...prev])
    }
  }, [])

  return (
    <div className="w-full bg-gray-950 border-b border-gray-900 py-3 overflow-hidden whitespace-nowrap relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-8">
        <div className="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-[0.2em] flex-shrink-0">
          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
          Live Activity Feed
        </div>
        
        <div className="flex-1 flex gap-12 animate-marquee hover:pause-marquee">
          {activities.length > 0 ? activities.map((act, _i) => (
            <ActivityItem key={act.id} report={act} />
          )) : (
            <span className="text-[10px] text-gray-700 uppercase font-black">Scanning System Nodes...</span>
          )}
          {/* Double for continuous scroll effect */}
          {activities.map((act, _i) => (
            <ActivityItem key={`${act.id}-clone`} report={act} />
          ))}
        </div>
      </div>

      <style jsx>{`
        .animate-marquee {
          display: flex;
          animation: marquee 40s linear infinite;
        }
        .pause-marquee {
          animation-play-state: paused;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}

function ActivityItem({ report }: { report: SystemReport }) {
  const time = new Date(report.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  const business = (report.input.businessType as string) || 'Enterprise'
  
  return (
    <div className="flex items-center gap-4 text-[10px] text-gray-400 font-mono">
      <span className="text-gray-600">[{time}]</span>
      <span className="text-white font-bold uppercase tracking-tighter">{report.type === 'audit' ? 'Audit' : 'Strategy'} Generated</span>
      <span className="text-primary">{business}</span>
      <span className="text-gray-700 px-2">|</span>
      <span className="flex items-center gap-1">
        <BoltIcon className="w-3 h-3" />
        {report.metadata.latency}ms
      </span>
    </div>
  )
}
