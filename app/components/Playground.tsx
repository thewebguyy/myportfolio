'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  PlayIcon, 
  CodeBracketIcon,
  LightBulbIcon,
  ArrowPathIcon,
  ServerIcon,
  CpuChipIcon
} from '@heroicons/react/24/outline'

/**
 * Enterprise API Playground
 * Advanced tester for system orchestration endpoints.
 */
export function Playground() {
  const [activeTab, setActiveTab] = useState<'api' | 'code'>('api')
  const [apiEndpoint, setApiEndpoint] = useState('/api/consult')
  const [apiBody, setApiBody] = useState('{\n  "businessType": "Fintech",\n  "revenueEstimate": "$5M",\n  "challenge": "Scaling payment infrastructure for 50k users."\n}')
  const [apiResponse, setApiResponse] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const apiExamples = [
    {
      name: 'Strategic Audit Engine',
      endpoint: '/api/consult',
      method: 'POST',
      body: '{\n  "businessType": "Fintech",\n  "revenueEstimate": "$5M",\n  "challenge": "Scaling payment infrastructure for 50k users."\n}',
    },
    {
      name: 'Talent Intelligence',
      endpoint: '/api/analyze-resume',
      method: 'POST',
      body: '{\n  "resumeText": "5 years experience in distributed systems and AI orchestration..."\n}',
    },
  ]

  async function testAPI() {
    setLoading(true)
    setApiResponse(null)

    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: apiBody,
      })

      const data = await response.json()
      setApiResponse(data)
    } catch (error) {
      setApiResponse({ error: 'System orchestration failed' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="section bg-secondary relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-primary text-xs font-black uppercase tracking-[0.4em] mb-4 block">API Sandbox</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            System <span className="gradient-text">Playground</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto font-serif italic">
            Directly interface with the system orchestration layer. 
            Test live endpoints and observe multi-step reasoning outputs.
          </p>
        </motion.div>

        <div className="glass rounded-3xl overflow-hidden border-primary/10">
          {/* Header */}
          <div className="flex border-b border-gray-900 bg-gray-950/50">
            <button
              onClick={() => setActiveTab('api')}
              className={`flex-1 px-6 py-5 font-black uppercase text-[10px] tracking-widest transition-all ${
                activeTab === 'api' ? 'text-primary bg-primary/5' : 'text-gray-500 hover:text-white'
              }`}
            >
              API Gateway
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`flex-1 px-6 py-5 font-black uppercase text-[10px] tracking-widest transition-all ${
                activeTab === 'code' ? 'text-primary bg-primary/5' : 'text-gray-500 hover:text-white'
              }`}
            >
              Logic Explorer
            </button>
          </div>

          {activeTab === 'api' ? (
            <div className="p-8">
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-2 block">Select Pipeline</label>
                    <select
                      value={apiEndpoint}
                      onChange={(e) => {
                        const ex = apiExamples.find(x => x.endpoint === e.target.value)
                        if (ex) {
                          setApiEndpoint(ex.endpoint)
                          setApiBody(ex.body)
                          setApiResponse(null)
                        }
                      }}
                      className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-white text-xs font-mono focus:border-primary focus:outline-none"
                    >
                      {apiExamples.map(ex => (
                        <option key={ex.endpoint} value={ex.endpoint}>POST {ex.endpoint}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-2 block">Payload Buffer</label>
                    <textarea
                      value={apiBody}
                      onChange={(e) => setApiBody(e.target.value)}
                      rows={8}
                      className="w-full bg-gray-950 border border-gray-800 rounded-xl p-4 text-primary font-mono text-xs focus:border-primary focus:outline-none resize-none"
                    />
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={testAPI}
                      disabled={loading}
                      className="flex-1 py-4 bg-primary text-white rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-primary-light transition-all flex items-center justify-center gap-2"
                    >
                      {loading ? 'Orchestrating...' : <><PlayIcon className="w-4 h-4" /> Execute Request</>}
                    </button>
                    <button
                      onClick={() => setApiResponse(null)}
                      className="p-4 bg-gray-900 border border-gray-800 text-gray-500 rounded-xl hover:text-white transition-all"
                    >
                      <ArrowPathIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-6">
                   <label className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-2 block">Response Header & Body</label>
                   <div className="bg-gray-950 border border-gray-800 rounded-xl p-6 h-[340px] overflow-auto custom-scrollbar">
                      {apiResponse ? (
                        <div className="space-y-6">
                           {apiResponse.metadata && (
                             <div className="flex gap-4 border-b border-gray-900 pb-4">
                                <div className="text-center">
                                   <div className="text-[8px] text-gray-600 uppercase font-black">Latency</div>
                                   <div className="text-xs text-green-500 font-bold">{apiResponse.metadata.latency}ms</div>
                                </div>
                                <div className="text-center">
                                   <div className="text-[8px] text-gray-600 uppercase font-black">Tokens</div>
                                   <div className="text-xs text-blue-500 font-bold">{apiResponse.metadata.tokens}</div>
                                </div>
                                <div className="text-center">
                                   <div className="text-[8px] text-gray-600 uppercase font-black">Status</div>
                                   <div className="text-xs text-white font-bold">200 OK</div>
                                </div>
                             </div>
                           )}
                           <pre className="text-xs text-gray-400 font-mono whitespace-pre-wrap italic">
                             {JSON.stringify(apiResponse, null, 2)}
                           </pre>
                        </div>
                      ) : (
                        <div className="h-full flex flex-col items-center justify-center text-gray-700 opacity-30">
                           <ServerIcon className="w-12 h-12 mb-4" />
                           <span className="text-[10px] font-black uppercase tracking-widest">Awaiting System Trigger</span>
                        </div>
                      )}
                   </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-20 text-center space-y-6 bg-gray-950/50">
              <CpuChipIcon className="w-16 h-16 text-gray-800 mx-auto animate-pulse" />
              <h3 className="text-xl font-bold text-white uppercase tracking-widest">Logic Explorer</h3>
              <p className="text-gray-500 text-sm font-serif italic max-w-md mx-auto">
                Deconstructing the AI reasoning pipeline. Observe how system constraints are applied to raw LLM outputs.
              </p>
              <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded text-primary text-[10px] font-black uppercase tracking-widest">
                Under System Review
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}