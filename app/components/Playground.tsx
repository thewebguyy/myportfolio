'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  PlayIcon, 
  CodeBracketIcon,
  LightBulbIcon,
  ArrowPathIcon 
} from '@heroicons/react/24/outline'

/**
 * Interactive Playground Component
 * Quick engagement feature demonstrating technical skills
 * Allows visitors to test API endpoints or run code snippets
 */
export function Playground() {
  const [activeTab, setActiveTab] = useState<'api' | 'code'>('api')
  const [apiEndpoint, setApiEndpoint] = useState('/api/recommend-project')
  const [apiBody, setApiBody] = useState('{\n  "interest": "real-time systems"\n}')
  const [apiResponse, setApiResponse] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  // Predefined API examples
  const apiExamples = [
    {
      name: 'Project Recommender',
      endpoint: '/api/recommend-project',
      method: 'POST',
      body: '{\n  "interest": "real-time systems"\n}',
    },
    {
      name: 'Resume Analyzer',
      endpoint: '/api/analyze-resume',
      method: 'POST',
      body: '{\n  "resumeText": "5 years React, Node.js..."\n}',
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
      setApiResponse(JSON.stringify(data, null, 2))
    } catch (error) {
      setApiResponse(JSON.stringify({ error: 'Request failed' }, null, 2))
    } finally {
      setLoading(false)
    }
  }

  const resetPlayground = () => {
    setApiResponse(null)
    setApiBody(apiExamples[0].body)
  }

  return (
    <section className="section bg-gradient-to-b from-gray-950 to-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
            <LightBulbIcon className="w-5 h-5 text-primary" />
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">
              Interactive Demo
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Try the <span className="gradient-text">AI APIs</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Test the AI-powered features directly in your browser. No authentication required 
            for demo purposes.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl overflow-hidden"
        >
          {/* Tab Navigation */}
          <div className="flex border-b border-gray-800 bg-gray-900/50">
            <button
              onClick={() => setActiveTab('api')}
              className={`flex-1 px-6 py-4 font-semibold transition-colors ${
                activeTab === 'api'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              <CodeBracketIcon className="w-5 h-5 inline-block mr-2" />
              API Tester
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`flex-1 px-6 py-4 font-semibold transition-colors ${
                activeTab === 'code'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              <PlayIcon className="w-5 h-5 inline-block mr-2" />
              Code Sandbox
            </button>
          </div>

          {/* API Tester Tab */}
          {activeTab === 'api' && (
            <div className="p-6 lg:p-8">
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Left: Configuration */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">
                      API Endpoint
                    </label>
                    <select
                      value={apiEndpoint}
                      onChange={(e) => {
                        const example = apiExamples.find(ex => ex.endpoint === e.target.value)
                        if (example) {
                          setApiEndpoint(example.endpoint)
                          setApiBody(example.body)
                          setApiResponse(null)
                        }
                      }}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 
                               text-white focus:border-primary focus:outline-none focus:ring-2 
                               focus:ring-primary/20"
                    >
                      {apiExamples.map((example) => (
                        <option key={example.endpoint} value={example.endpoint}>
                          {example.method} {example.endpoint}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">
                      Request Body (JSON)
                    </label>
                    <textarea
                      value={apiBody}
                      onChange={(e) => setApiBody(e.target.value)}
                      rows={10}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 
                               text-white font-mono text-sm focus:border-primary focus:outline-none 
                               focus:ring-2 focus:ring-primary/20 resize-none"
                      placeholder="Enter JSON payload..."
                    />
                  </div>

                  <div className="flex gap-3">
                    <motion.button
                      onClick={testAPI}
                      disabled={loading}
                      whileHover={{ scale: loading ? 1 : 1.02 }}
                      whileTap={{ scale: loading ? 1 : 0.98 }}
                      className="flex-1 btn btn-primary flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <>
                          <LoadingSpinner />
                          Sending...
                        </>
                      ) : (
                        <>
                          <PlayIcon className="w-5 h-5" />
                          Test API
                        </>
                      )}
                    </motion.button>
                    <motion.button
                      onClick={resetPlayground}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="btn btn-secondary flex items-center gap-2"
                    >
                      <ArrowPathIcon className="w-5 h-5" />
                      Reset
                    </motion.button>
                  </div>
                </div>

                {/* Right: Response */}
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    API Response
                  </label>
                  <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 h-[400px] overflow-auto">
                    {apiResponse ? (
                      <pre className="text-sm text-green-400 font-mono whitespace-pre-wrap">
                        {apiResponse}
                      </pre>
                    ) : (
                      <div className="h-full flex items-center justify-center text-gray-500">
                        <div className="text-center">
                          <CodeBracketIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
                          <p>Response will appear here</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Info Box */}
              <div className="mt-6 bg-primary/10 border border-primary/30 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <LightBulbIcon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-gray-300">
                    <p className="font-semibold text-white mb-1">About This Demo</p>
                    <p>
                      These are live API endpoints powered by <strong>GPT-4</strong>. 
                      The Project Recommender uses semantic matching to suggest relevant work, 
                      while the Resume Analyzer identifies collaboration opportunities. 
                      Both demonstrate practical AI integration in production applications.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Code Sandbox Tab */}
          {activeTab === 'code' && (
            <div className="p-6 lg:p-8">
              <div className="text-center py-20">
                <PlayIcon className="w-16 h-16 mx-auto mb-4 text-gray-600" />
                <h3 className="text-2xl font-bold mb-2 text-white">Code Sandbox</h3>
                <p className="text-gray-400 mb-6 max-w-md mx-auto">
                  Interactive code playground coming soon! This will allow you to test JavaScript 
                  snippets and see live results.
                </p>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg text-sm text-gray-400">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
                  Feature in development
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Technical Details */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-gray-500">
            💻 Built with Next.js 14 App Router, OpenAI GPT-4, and TypeScript
          </p>
        </motion.div>
      </div>
    </section>
  )
}

/**
 * Loading Spinner Component
 */
function LoadingSpinner() {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      className="w-5 h-5 border-2 border-black border-t-transparent rounded-full"
    />
  )
}