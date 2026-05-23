'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  DocumentMagnifyingGlassIcon, 
  CpuChipIcon,
  CommandLineIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline'
import { cn } from '@/lib/utils'
import { ArchitecturePanel, TechnicalInsightCard, PerformanceMeter } from '@/app/components/ui/EngineeringUI'

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

export function CandidateScreener() {
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [analysis, setAnalysis] = useState<TalentAnalysis | null>(null)
  const [steps, setSteps] = useState<OrchestrationStep[]>([])
  const [metadata, setMetadata] = useState<AuditMetadata | null>(null)
  const [resumeText, setResumeText] = useState('')

  async function analyzeResume() {
    if (resumeText.length < 50) return

    setLoading(true)
    setErrorMsg(null)
    setAnalysis(null)
    setSteps([
      { id: 'extraction', label: 'Processing...', status: 'processing' },
      { id: 'benchmarking', label: 'Mapping skills...', status: 'pending' },
      { id: 'risk_scoring', label: 'Analyzing fit...', status: 'pending' },
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
      setErrorMsg(err instanceof Error ? err.message : 'Analysis failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="candidate-screener" className="bg-background py-24 border-t border-surface-2">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="text-center space-y-4 mb-16">
          <span className="label">Demo</span>
          <h2 className="h2 text-white">
            Resume Analyzer
          </h2>
          <p className="body max-w-2xl mx-auto">
            Analyze technical alignment and engineering fit using multi-step semantic extraction.
          </p>
        </div>

        {!analysis && !loading ? (
          <div className="bg-surface p-8 lg:p-12 rounded-[12px] border border-surface-2 max-w-4xl mx-auto">
            <label className="block font-mono text-[10px] text-text-muted uppercase tracking-widest mb-6 flex items-center gap-2">
              <CommandLineIcon className="w-4 h-4 text-primary" />
              Paste Profile / Resume Data
            </label>
            <textarea 
              placeholder="Paste text for technical analysis..."
              className="w-full h-64 bg-background border border-surface-2 rounded-[8px] p-6 text-white font-mono text-[13px] focus:border-primary focus:outline-none transition-all resize-none"
              value={resumeText}
              onChange={e => setResumeText(e.target.value)}
            />
            
            <div className="mt-8">
              <button
                onClick={analyzeResume}
                disabled={loading || resumeText.length < 50}
                className={cn(
                  "w-full py-4 rounded-[6px] font-semibold uppercase tracking-[0.1em] transition-all flex items-center justify-center gap-3 text-[12px]",
                  resumeText.length < 50 ? "bg-surface-2 text-text-muted cursor-not-allowed" : "bg-primary hover:scale-[0.98] text-background"
                )}
              >
                Analyze Resume
                <DocumentMagnifyingGlassIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : loading ? (
          <div className="max-w-4xl mx-auto bg-surface p-16 rounded-[12px] border border-surface-2 text-center space-y-10">
            <div className="relative w-16 h-16 mx-auto">
               <motion.div 
                 animate={{ rotate: 360 }} 
                 transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                 className="absolute inset-0 border-2 border-surface-2 border-t-primary rounded-full" 
               />
               <div className="absolute inset-0 flex items-center justify-center">
                 <CpuChipIcon className="w-6 h-6 text-primary animate-pulse" />
               </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-mono text-[11px] text-white uppercase tracking-widest">Orchestrating Model...</h3>
              <div className="flex justify-center gap-3">
                {steps.map((step, i) => (
                  <div key={i} className={cn(
                    "px-3 py-1 rounded-[4px] border text-[9px] font-mono uppercase tracking-wider",
                    step.status === 'completed' ? 'border-secondary/30 text-secondary' :
                    step.status === 'processing' ? 'border-primary/30 text-primary animate-pulse' :
                    'border-surface-2 text-text-muted'
                  )}>
                    {step.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : analysis && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
            <div className="grid lg:grid-cols-12 gap-12">
              {/* Profile Summary */}
              <div className="lg:col-span-4 space-y-8">
                <ArchitecturePanel title="Engineering Fit">
                  <div className="space-y-8 py-4">
                    <PerformanceMeter label="Overall Alignment" score={analysis.matchScore} />
                    <div className="grid grid-cols-1 gap-4">
                      <div className="p-4 bg-background rounded-[8px] border border-surface-2">
                        <div className="font-mono text-[10px] text-text-muted uppercase mb-1">Skill Gap Analysis</div>
                        <div className={cn("font-sans font-semibold uppercase text-[13px]", analysis.skillGap === 'Low' ? 'text-secondary' : 'text-primary')}>
                          {analysis.skillGap} Probability
                        </div>
                      </div>
                      <div className="p-4 bg-background rounded-[8px] border border-surface-2">
                        <div className="font-mono text-[10px] text-text-muted uppercase mb-1">Domain Gap</div>
                        <div className="font-sans font-semibold text-white uppercase text-[13px]">{analysis.skillGapSeverity}</div>
                      </div>
                    </div>
                  </div>
                </ArchitecturePanel>
              </div>

              {/* Detailed Analysis */}
              <div className="lg:col-span-8 space-y-8">
                 <div className="grid md:grid-cols-3 gap-6">
                    <TechnicalInsightCard title="Technical" value={analysis.alignmentSignals.technical} description="Architecture & Stack" />
                    <TechnicalInsightCard title="Cultural" value={analysis.alignmentSignals.cultural} description="Soft skills & Product mind" />
                    <TechnicalInsightCard title="Vision" value={analysis.alignmentSignals.strategic} description="Engineering leadership" />
                 </div>
                 
                 <ArchitecturePanel title="Reasoning Summary">
                    <p className="font-serif italic text-[20px] text-text-secondary leading-relaxed mb-8">
                      &quot;{analysis.reasoning}&quot;
                    </p>
                    <div className="pt-6 border-t border-surface-2 flex justify-between items-center font-mono text-[10px] text-text-muted uppercase tracking-widest">
                       {errorMsg && (
                        <div className="text-red-400 text-sm">{errorMsg}</div>
                       )}
                       <div className="flex items-center gap-2">
                         <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                         Confidence: {analysis.confidenceScore}%
                       </div>
                       <div>Latency: {metadata?.latency}ms</div>
                    </div>
                 </ArchitecturePanel>
              </div>
            </div>

            <div className="flex justify-center pt-8">
              <button 
                onClick={() => setAnalysis(null)}
                className="flex items-center gap-2 font-mono text-[10px] text-text-muted uppercase tracking-widest hover:text-white transition-all"
              >
                <ArrowPathIcon className="w-4 h-4" />
                New Analysis
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}

interface TalentAnalysis {
  matchScore: number
  skillGap: 'Low' | 'Medium' | 'High'
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