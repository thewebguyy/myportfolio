'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  DocumentMagnifyingGlassIcon, 
  UserGroupIcon, 
  ShieldCheckIcon,
  ChartPieIcon,
  ArrowDownTrayIcon,
  CpuChipIcon,
  CommandLineIcon
} from '@heroicons/react/24/outline'
import { cn } from '@/lib/utils'
import { DataPanel, InsightCard, RiskMeter, DecisionBlock } from '@/app/components/ui/ConsultingUI'
import { TechnicalDetails } from '@/app/components/ui/TechnicalDetails'

interface OrchestrationStep {
  id: string
  label: string
  status: 'pending' | 'processing' | 'completed' | 'failed'
}

interface AuditMetadata {
  latency: number
  tokens: number
  tier: string
}

export function ResumeAnalyzer() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [analysis, setAnalysis] = useState<TalentAnalysis | null>(null)
  const [steps, setSteps] = useState<OrchestrationStep[]>([])
  const [metadata, setMetadata] = useState<AuditMetadata | null>(null)
  const [resumeText, setResumeText] = useState('')

  async function analyzeResume() {
    if (resumeText.length < 50) return

    setLoading(true)
    setError(null)
    setAnalysis(null)
    setSteps([
      { id: 'extraction', label: 'Semantic Extraction', status: 'processing' },
      { id: 'benchmarking', label: 'Benchmarking...', status: 'pending' },
      { id: 'risk_scoring', label: 'Modeling Risk', status: 'pending' },
    ])

    try {
      const response = await fetch('/api/analyze-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeText }),
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Analysis failed')
      
      setAnalysis(data.analysis)
      setSteps(data.steps)
      setMetadata(data.metadata)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Analysis failed')
    } finally {
      setLoading(false)
    }
  }

  const downloadReport = () => {
    if (!analysis) return
    const content = `
TALENT INTELLIGENCE REPORT
Generated: ${new Date().toLocaleString()}
----------------------------------------
HIRING RISK SCORE: ${analysis.hiringRiskScore}%
RETENTION RISK: ${analysis.retentionRisk}
SKILL GAP SEVERITY: ${analysis.skillGapSeverity}

ALIGNMENT SIGNALS:
- Technical: ${analysis.alignmentSignals.technical}
- Cultural: ${analysis.alignmentSignals.cultural}
- Strategic: ${analysis.alignmentSignals.strategic}

REASONING:
${analysis.reasoning}

SYSTEM METADATA:
- Confidence Score: ${analysis.confidenceScore}%
- Execution Latency: ${metadata?.latency}ms
    `
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `Talent_Intelligence_${Date.now()}.txt`
    a.click()
  }

  return (
    <section className="section bg-gray-950 border-t border-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <span className="text-primary text-sm font-black uppercase tracking-[0.4em]">Talent Engine v2.0</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Talent Risk & <span className="gradient-text">Hiring Intelligence</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto font-serif italic">
            Analyze strategic alignment and hiring risk using multi-step semantic extraction.
          </p>
        </div>

        {!analysis && !loading ? (
          <div className="glass p-8 lg:p-12 rounded-3xl border-primary/10 max-w-4xl mx-auto">
            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <CommandLineIcon className="w-4 h-4 text-primary" />
              Paste Professional Profile / Resume Text
            </label>
            <textarea 
              placeholder="Paste full resume text for deep semantic analysis..."
              className="w-full h-64 bg-gray-900 border border-gray-800 rounded-xl p-6 text-gray-300 font-mono text-xs focus:border-primary focus:outline-none transition-all resize-none"
              value={resumeText}
              onChange={e => setResumeText(e.target.value)}
            />
            
            <div className="mt-8 flex flex-col gap-4">
              <button
                onClick={analyzeResume}
                disabled={loading || resumeText.length < 50}
                className={cn(
                  "w-full py-5 rounded-2xl font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3",
                  resumeText.length < 50 ? "bg-gray-800 text-gray-600 cursor-not-allowed" : "bg-primary hover:bg-primary-light text-white shadow-2xl shadow-primary/30"
                )}
              >
                Execute Talent Audit
                <DocumentMagnifyingGlassIcon className="w-5 h-5" />
              </button>

              <TechnicalDetails 
                flow={['POST /api/analyze-resume', 'Entity Extraction', 'Benchmarking Model', 'Risk Synthesis']}
                prompt="System: Talent Intelligence Orchestrator. Reasoning: Multi-step benchmarking against industry-standard strategic competencies. Output: Semantic JSON."
                logic="Request isolation ensures PII remains in local memory. Latency optimized via concurrent processing steps."
              />
            </div>
          </div>
        ) : loading ? (
          <div className="max-w-4xl mx-auto glass p-12 rounded-3xl border-primary/20 text-center space-y-8">
            <div className="relative w-24 h-24 mx-auto">
               <motion.div 
                 animate={{ rotate: 360 }} 
                 transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                 className="absolute inset-0 border-4 border-primary/10 border-t-primary rounded-full" 
               />
               <div className="absolute inset-0 flex items-center justify-center">
                 <CpuChipIcon className="w-8 h-8 text-primary animate-pulse" />
               </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white uppercase tracking-widest">Orchestrating Talent Model...</h3>
              <div className="flex justify-center gap-3">
                {steps.map((step, i) => (
                  <div key={i} className={cn(
                    "px-3 py-1 rounded border text-[10px] font-black uppercase",
                    step.status === 'completed' ? 'bg-green-500/10 border-green-500/30 text-green-500' :
                    step.status === 'processing' ? 'bg-primary/10 border-primary/30 text-primary animate-pulse' :
                    'bg-gray-900 border-gray-800 text-gray-700'
                  )}>
                    {step.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : analysis && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
            <div className="grid lg:grid-cols-12 gap-8">
              {/* Risk Summary */}
              <div className="lg:col-span-4 space-y-6">
                <DataPanel title="Risk Profile">
                  <div className="space-y-8 py-4">
                    <RiskMeter label="Hiring Risk" score={analysis.hiringRiskScore} />
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-gray-950 rounded-xl border border-gray-800">
                        <div className="text-[10px] text-gray-500 uppercase font-black mb-1">Retention</div>
                        <div className={cn("text-xs font-bold uppercase", analysis.retentionRisk === 'Low' ? 'text-green-500' : 'text-yellow-500')}>
                          {analysis.retentionRisk} Risk
                        </div>
                      </div>
                      <div className="p-4 bg-gray-950 rounded-xl border border-gray-800">
                        <div className="text-[10px] text-gray-500 uppercase font-black mb-1">Skill Gap</div>
                        <div className="text-xs text-white font-bold uppercase">{analysis.skillGapSeverity}</div>
                      </div>
                    </div>
                  </div>
                </DataPanel>
                
                <button 
                  onClick={downloadReport}
                  className="w-full py-4 bg-gray-900 border border-gray-800 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-800 transition-all flex items-center justify-center gap-2"
                >
                  <ArrowDownTrayIcon className="w-4 h-4" />
                  Download Intelligence Report
                </button>
              </div>

              {/* Detailed Analysis */}
              <div className="lg:col-span-8 space-y-6">
                 <div className="grid md:grid-cols-3 gap-4">
                    <InsightCard title="Technical" value={analysis.alignmentSignals.technical} description="Architecture & Implementation" />
                    <InsightCard title="Cultural" value={analysis.alignmentSignals.cultural} description="Soft skills & Collaboration" />
                    <InsightCard title="Strategic" value={analysis.alignmentSignals.strategic} description="Decision making & Vision" />
                 </div>
                 
                 <DataPanel title="Intelligence Summary">
                    <p className="text-gray-400 font-serif italic leading-relaxed text-lg mb-6">
                      &quot;{analysis.reasoning}&quot;
                    </p>
                    <div className="pt-6 border-t border-gray-900 flex justify-between items-center text-[10px] font-black text-gray-600 uppercase">
                       <div className="flex items-center gap-2">
                         <span className="w-2 h-2 rounded-full bg-green-500" />
                         Confidence: {analysis.confidenceScore}%
                       </div>
                       <div>Latency: {metadata?.latency}ms</div>
                    </div>
                 </DataPanel>
              </div>
            </div>

            <div className="flex justify-center pt-8">
              <button 
                onClick={() => setAnalysis(null)}
                className="px-8 py-4 bg-gray-900 border border-gray-800 text-gray-400 hover:text-white rounded-xl uppercase text-xs font-black tracking-widest transition-all"
              >
                New Talent Audit
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}

interface TalentAnalysis {
  hiringRiskScore: number
  retentionRisk: 'Low' | 'Medium' | 'High'
  skillGapSeverity: string
  alignmentSignals: {
    cultural: string
    technical: string
    strategic: string
  }
  reasoning: string
  confidenceScore: number
  assumptions: string[]
}