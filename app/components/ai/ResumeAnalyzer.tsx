'use client'

import React, { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  DocumentArrowUpIcon,
  CheckCircleIcon,
  XCircleIcon,
  LightBulbIcon,
  MagnifyingGlassIcon,
  ShieldCheckIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline'
import { cn } from '@/lib/utils'
import { RiskMeter, InsightCard, DecisionBlock, DataPanel } from '@/app/components/ui/ConsultingUI'

/**
 * Talent Risk & Hiring Intelligence Engine
 * Upgraded from Resume Analyzer for Big 4-level strategic depth.
 */
export function ResumeAnalyzer() {
  const [file, setFile] = useState<File | null>(null)
  const [analysis, setAnalysis] = useState<TalentAnalysis | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [dragActive, setDragActive] = useState(false)
  const [mode, setMode] = useState<'upload' | 'paste'>('upload')
  const [resumeText, setResumeText] = useState('')

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(e.type === 'dragenter' || e.type === 'dragover')
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0])
  }, [])

  const handleFile = (selectedFile: File) => {
    const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain']
    if (!validTypes.includes(selectedFile.type) && !selectedFile.name.endsWith('.txt')) {
      setError('Supported formats: PDF, DOCX, TXT')
      return
    }
    setFile(selectedFile)
    setError(null)
    setAnalysis(null)
  }

  async function analyzeTalent() {
    if (mode === 'upload' && !file) return
    if (mode === 'paste' && !resumeText.trim()) return

    setLoading(true)
    setError(null)

    try {
      let response;
      if (mode === 'upload' && file) {
        const formData = new FormData()
        formData.append('resume', file)
        response = await fetch('/api/analyze-resume', { method: 'POST', body: formData })
      } else {
        response = await fetch('/api/analyze-resume', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ resumeText }),
        })
      }

      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Audit failed')
      setAnalysis(data.analysis)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Strategic audit failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="section bg-secondary">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-12"
        >
          {/* Header */}
          <div className="text-center space-y-4">
            <span className="text-primary text-sm font-black uppercase tracking-[0.3em]">Hiring Intelligence</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Talent Risk & <span className="gradient-text">Hiring Audit</span>
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto font-serif italic">
              Advanced algorithmic assessment of candidate synergy, retention risks, and strategic alignment.
            </p>
          </div>

          {!analysis ? (
            <div className="glass rounded-2xl p-8 lg:p-12 border-primary/10">
              {/* Input Mode Selector */}
              <div className="flex p-1 bg-gray-900 rounded-xl mb-8 max-w-xs mx-auto border border-gray-800">
                <button
                  onClick={() => setMode('upload')}
                  className={cn(
                    'flex-1 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all',
                    mode === 'upload' ? 'bg-primary text-white' : 'text-gray-500 hover:text-gray-300'
                  )}
                >
                  Audit File
                </button>
                <button
                  onClick={() => setMode('paste')}
                  className={cn(
                    'flex-1 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all',
                    mode === 'paste' ? 'bg-primary text-white' : 'text-gray-500 hover:text-gray-300'
                  )}
                >
                  Text Scan
                </button>
              </div>

              {mode === 'upload' ? (
                <div
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  className={cn(
                    'border-2 border-dashed rounded-xl p-16 text-center transition-all',
                    dragActive ? 'border-primary bg-primary/5' : 'border-gray-800 hover:border-gray-700',
                    file && 'bg-gray-900/50 border-primary/40'
                  )}
                >
                  <input
                    type="file"
                    id="talent-upload"
                    accept=".pdf,.docx,.txt"
                    onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                    className="hidden"
                  />
                  {!file ? (
                    <label htmlFor="talent-upload" className="cursor-pointer space-y-4 block">
                      <DocumentArrowUpIcon className="w-16 h-16 mx-auto text-gray-700" />
                      <div>
                        <h3 className="text-lg font-bold text-white uppercase tracking-wider">Initialize Audit</h3>
                        <p className="text-sm text-gray-500">Drop PDF/DOCX candidate file</p>
                      </div>
                      <span className="btn btn-secondary inline-block">Select Document</span>
                    </label>
                  ) : (
                    <div className="flex items-center justify-center gap-4">
                      <ShieldCheckIcon className="w-10 h-10 text-primary" />
                      <div className="text-left">
                        <p className="font-bold text-white uppercase tracking-wide">{file.name}</p>
                        <p className="text-xs text-gray-500 font-mono">{(file.size / 1024).toFixed(1)} KB Readiness</p>
                      </div>
                      <button onClick={() => setFile(null)} className="text-red-500 text-xs uppercase font-black tracking-tighter hover:underline">Reset</button>
                    </div>
                  )}
                </div>
              ) : (
                <textarea
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  placeholder="Paste candidate profile or experience data for strategic scanning..."
                  className="w-full h-64 bg-gray-950 border border-gray-800 rounded-xl p-6 text-white font-mono text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/20 resize-none"
                />
              )}

              {error && (
                <div className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-3">
                  <XCircleIcon className="w-5 h-5 text-red-500" />
                  <p className="text-red-400 text-xs font-bold uppercase tracking-tight">{error}</p>
                </div>
              )}

              <button
                onClick={analyzeTalent}
                disabled={loading || (mode === 'upload' ? !file : !resumeText.trim())}
                className={cn(
                  "w-full mt-8 py-5 rounded-xl font-black uppercase tracking-[0.2em] transition-all",
                  loading || (mode === 'upload' ? !file : !resumeText.trim())
                    ? "bg-gray-800 text-gray-600 cursor-not-allowed"
                    : "bg-primary hover:bg-primary-light text-white shadow-xl shadow-primary/20"
                )}
              >
                {loading ? <span className="flex items-center justify-center gap-2">Running Intelligence Scan...</span> : 'Run Hiring Intelligence Audit'}
              </button>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid lg:grid-cols-3 gap-8"
            >
              {/* Left Column: Metrics & Risks */}
              <div className="space-y-8">
                <DataPanel title="Risk Assessment">
                  <div className="space-y-6">
                    <RiskMeter score={analysis.hiringRiskScore} label="Hiring Viability" minLabel="High Risk" maxLabel="Ideal" />
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-gray-900 rounded-lg border border-gray-800">
                        <div className="text-[10px] text-gray-500 uppercase font-black mb-1">Retention Risk</div>
                        <div className={cn("font-bold text-lg", 
                          analysis.retentionRisk === 'Low' ? 'text-green-500' : analysis.retentionRisk === 'High' ? 'text-red-500' : 'text-yellow-500'
                        )}>{analysis.retentionRisk}</div>
                      </div>
                      <div className="p-4 bg-gray-900 rounded-lg border border-gray-800">
                        <div className="text-[10px] text-gray-500 uppercase font-black mb-1">Skill Gap Severity</div>
                        <div className={cn("font-bold text-lg", 
                          analysis.skillGapSeverity === 'Low' ? 'text-green-500' : analysis.skillGapSeverity === 'High' ? 'text-red-500' : 'text-yellow-500'
                        )}>{analysis.skillGapSeverity}</div>
                      </div>
                    </div>
                  </div>
                </DataPanel>

                <DataPanel title="Strategic Alignment">
                  <div className="space-y-4">
                    {Object.entries(analysis.alignmentSignals).map(([key, value]) => (
                      <div key={key} className="flex gap-3 items-start">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                        <div>
                          <div className="text-[10px] text-gray-500 uppercase font-black">{key}</div>
                          <div className="text-xs text-white leading-relaxed">{value}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </DataPanel>
              </div>

              {/* Middle Column: Opportunities */}
              <div className="lg:col-span-2 space-y-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <InsightCard 
                    title="Executive Match Summary" 
                    value={analysis.hiringRiskScore > 70 ? 'Recommended' : 'Requires Review'} 
                    description={analysis.reasoning}
                    icon={MagnifyingGlassIcon}
                  />
                  <div className="glass p-6 rounded-xl border-primary/20 space-y-6">
                    <h4 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2">
                      <ShieldCheckIcon className="w-5 h-5 text-primary" />
                      Risk Mitigation
                    </h4>
                    <p className="text-sm text-gray-400 font-serif italic">{analysis.riskMitigation}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-black text-white uppercase tracking-[0.3em] mb-4">Strategic Initiatives</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {analysis.collaborationOpportunities.map((opp, i) => (
                      <DecisionBlock 
                        key={i}
                        title={`Initiative 0${i+1}`}
                        action={opp}
                        impact="High Synergy ROI"
                        priority={i === 0 ? 'High' : 'Medium'}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button onClick={() => setAnalysis(null)} className="btn btn-secondary flex-1 uppercase text-xs font-black">Restart Audit</button>
                  <a href="#contact" className="btn btn-primary flex-1 uppercase text-xs font-black text-center">Consult with Olabode</a>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}

function LoadingSpinner() {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
    />
  )
}

interface TalentAnalysis {
  hiringRiskScore: number
  retentionRisk: 'Low' | 'Medium' | 'High'
  skillGapSeverity: 'Low' | 'Medium' | 'High'
  alignmentSignals: {
    cultural: string
    technical: string
    strategic: string
  }
  collaborationOpportunities: string[]
  riskMitigation: string
  reasoning: string
}