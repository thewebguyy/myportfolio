'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  CurrencyDollarIcon, 
  UserGroupIcon, 
  ExclamationTriangleIcon,
  PresentationChartLineIcon,
  BoltIcon,
  ShieldCheckIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline'
import { cn } from '@/lib/utils'
import { DataPanel, InsightCard, RiskMeter, DecisionBlock } from '@/app/components/ui/ConsultingUI'

interface SimulationResult {
  projectedOutcome: string
  financialImpact: string
  tradeOffs: string[]
  scenarios: {
    bestCase: string
    worstCase: string
  }
  trustSignals: {
    whyItWorks: string
    whereItMayFail: string
    confidenceScore: number
  }
  actionSteps: string[]
}

export function DecisionSimulator() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<SimulationResult | null>(null)
  const [formData, setFormData] = useState({
    cost: '',
    revenue: '',
    teamSize: '',
    riskLevel: 'Medium'
  })

  async function runSimulation() {
    setLoading(true)
    try {
      const response = await fetch('/api/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await response.json()
      setResult(data.simulation)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="section bg-secondary relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <span className="text-primary text-sm font-black uppercase tracking-[0.4em]">Decision Engine</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Outcome <span className="gradient-text">Simulator</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto font-serif italic">
            Project real-world impact by modeling financial constraints against operational risks.
          </p>
        </div>

        {!result && !loading ? (
          <div className="glass p-8 lg:p-12 rounded-3xl border-primary/10 max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-6">
                 <div>
                    <label className="text-[10px] text-gray-500 uppercase font-black mb-3 block">Estimated Project Cost</label>
                    <div className="relative">
                      <CurrencyDollarIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600" />
                      <input 
                        type="text" 
                        placeholder="e.g. $50,000"
                        className="w-full bg-gray-950 border border-gray-800 rounded-xl pl-12 pr-4 py-4 text-white focus:border-primary focus:outline-none"
                        value={formData.cost}
                        onChange={e => setFormData({...formData, cost: e.target.value})}
                      />
                    </div>
                 </div>
                 <div>
                    <label className="text-[10px] text-gray-500 uppercase font-black mb-3 block">Target Monthly Revenue</label>
                    <div className="relative">
                      <ChartBarIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600" />
                      <input 
                        type="text" 
                        placeholder="e.g. $20,000"
                        className="w-full bg-gray-950 border border-gray-800 rounded-xl pl-12 pr-4 py-4 text-white focus:border-primary focus:outline-none"
                        value={formData.revenue}
                        onChange={e => setFormData({...formData, revenue: e.target.value})}
                      />
                    </div>
                 </div>
              </div>
              <div className="space-y-6">
                 <div>
                    <label className="text-[10px] text-gray-500 uppercase font-black mb-3 block">Total Team Size</label>
                    <div className="relative">
                      <UserGroupIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600" />
                      <input 
                        type="text" 
                        placeholder="e.g. 5 Engineers"
                        className="w-full bg-gray-950 border border-gray-800 rounded-xl pl-12 pr-4 py-4 text-white focus:border-primary focus:outline-none"
                        value={formData.teamSize}
                        onChange={e => setFormData({...formData, teamSize: e.target.value})}
                      />
                    </div>
                 </div>
                 <div>
                    <label className="text-[10px] text-gray-500 uppercase font-black mb-3 block">Acceptable Risk Level</label>
                    <select 
                      className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-4 text-white focus:border-primary focus:outline-none"
                      value={formData.riskLevel}
                      onChange={e => setFormData({...formData, riskLevel: e.target.value})}
                    >
                      <option>Low</option>
                      <option>Medium</option>
                      <option>High</option>
                    </select>
                 </div>
              </div>
            </div>
            <button 
              onClick={runSimulation}
              className="w-full py-5 bg-primary text-white rounded-2xl font-black uppercase tracking-widest hover:bg-primary-light transition-all flex items-center justify-center gap-3"
            >
              Simulate Strategic Outcome
              <BoltIcon className="w-5 h-5" />
            </button>
          </div>
        ) : loading ? (
          <div className="max-w-4xl mx-auto glass p-20 rounded-3xl border-primary/20 text-center space-y-6">
             <div className="w-16 h-16 border-4 border-primary/10 border-t-primary rounded-full animate-spin mx-auto" />
             <div className="text-xl font-bold text-white uppercase tracking-widest">Running Scenario Models...</div>
             <p className="text-gray-500 font-serif italic italic">Applying FX volatility and inflation vectors.</p>
          </div>
        ) : result && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
            <div className="grid lg:grid-cols-3 gap-8">
              <DataPanel title="Outcome Projection" className="lg:col-span-2">
                 <p className="text-xl text-white font-serif italic leading-relaxed mb-8">
                    &quot;{result.projectedOutcome}&quot;
                 </p>
                 <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-6 bg-gray-950 rounded-2xl border border-gray-800">
                       <h4 className="text-[10px] text-primary uppercase font-black mb-2">Financial Outcome</h4>
                       <div className="text-2xl font-bold text-white">{result.financialImpact}</div>
                    </div>
                    <div className="p-6 bg-gray-950 rounded-2xl border border-gray-800">
                       <h4 className="text-[10px] text-yellow-500 uppercase font-black mb-2">Key Trade-offs</h4>
                       <ul className="space-y-1">
                          {result.tradeOffs.map((t: string, i: number) => (
                            <li key={i} className="text-xs text-gray-400 flex gap-2">
                               <span className="text-yellow-500/50">•</span> {t}
                            </li>
                          ))}
                       </ul>
                    </div>
                 </div>
              </DataPanel>
              
              <div className="space-y-6">
                 <DataPanel title="Scenario Stress Test">
                    <div className="space-y-4">
                       <div className="p-4 bg-green-500/5 border border-green-500/20 rounded-xl">
                          <h5 className="text-[10px] text-green-500 uppercase font-black mb-1">Best Case</h5>
                          <p className="text-[11px] text-gray-400">{result.scenarios.bestCase}</p>
                       </div>
                       <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-xl">
                          <h5 className="text-[10px] text-red-500 uppercase font-black mb-1">Worst Case</h5>
                          <p className="text-[11px] text-gray-400">{result.scenarios.worstCase}</p>
                       </div>
                    </div>
                 </DataPanel>

                 <div className="p-6 bg-primary/10 border border-primary/20 rounded-2xl">
                    <div className="flex justify-between items-center mb-4">
                       <h4 className="text-[10px] text-primary uppercase font-black">Confidence</h4>
                       <span className="text-xl font-bold text-white">{result.trustSignals.confidenceScore}%</span>
                    </div>
                    <div className="space-y-2">
                       <div className="text-[10px] text-gray-500 uppercase font-black">Why it works</div>
                       <p className="text-[11px] text-gray-400 italic">{result.trustSignals.whyItWorks}</p>
                    </div>
                 </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
               {result.actionSteps.map((step: string, i: number) => (
                 <DecisionBlock 
                   key={i} 
                   title={`Execution Step 0${i+1}`}
                   action={step}
                   impact="High Efficiency Gain"
                   priority="High"
                 />
               ))}
            </div>

            <div className="flex justify-center pt-8">
               <button 
                onClick={() => setResult(null)}
                className="px-8 py-4 bg-gray-900 border border-gray-800 text-gray-400 hover:text-white rounded-xl uppercase text-xs font-black tracking-widest transition-all"
               >
                 Re-run Simulation
               </button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
