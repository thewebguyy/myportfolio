import React from 'react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { projects, getProjectById } from '@/lib/projects'
import { flagshipCaseStudies } from '@/lib/case-studies'
import { ArrowLeftIcon, ShieldCheckIcon, ChartBarIcon, MagnifyingGlassIcon, LightBulbIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline'
import { RiskMeter, InsightCard, DataPanel } from '@/app/components/ui/ConsultingUI'
import { cn } from '@/lib/utils'

// Generate static params for all projects and flagship studies
export async function generateStaticParams() {
  const projectIds = projects.map(p => ({ slug: p.id }))
  const flagshipIds = flagshipCaseStudies.map(s => ({ slug: s.id }))
  return [...projectIds, ...flagshipIds]
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const project = getProjectById(params.slug) || flagshipCaseStudies.find(s => s.id === params.slug)
  if (!project) return { title: 'Audit Not Found' }
  
  return {
    title: `${project.title} - Strategic Audit`,
    description: 'context' in project ? project.context : project.longDescription,
  }
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const study = flagshipCaseStudies.find(s => s.id === params.slug)
  const project = getProjectById(params.slug)

  if (!study && !project) notFound()

  // If it's a flagship study, use the new consulting layout
  if (study) {
    return (
      <main className="min-h-screen bg-secondary selection:bg-primary/30">
        {/* Navigation Header */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-secondary/80 backdrop-blur-md border-b border-gray-900 px-6 py-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <Link href="/case-studies" className="text-gray-500 hover:text-white transition-all text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
              <ArrowLeftIcon className="w-4 h-4" />
              Strategic Archive
            </Link>
            <div className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">Outcome-Driven Strategic Audit</div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="pt-32 pb-20 px-6">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/30 rounded text-primary text-[10px] font-black uppercase tracking-widest">
                <ShieldCheckIcon className="w-4 h-4" />
                {study.category} Audit
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-white leading-[1.1]">{study.title}</h1>
              <p className="text-xl text-gray-400 font-serif italic leading-relaxed">{study.context}</p>
              
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-900">
                 <OutcomeMiniMetric label="Financial" value={study.financialImpact} color="green" />
                 <OutcomeMiniMetric label="Efficiency" value={study.efficiencyGain} color="blue" />
                 <OutcomeMiniMetric label="Risk" value={study.riskReduction} color="red" />
              </div>
            </div>

            <div className="relative">
               <div className="absolute inset-0 bg-primary/10 blur-[100px] rounded-full" />
               <div className="grid gap-6 relative z-10">
                  <DataPanel title="Before State">
                     <p className="text-sm text-gray-400 font-serif italic italic leading-relaxed">
                        {study.beforeState}
                     </p>
                  </DataPanel>
                  <DataPanel title="After State" className="border-primary/30">
                     <p className="text-sm text-white font-serif italic leading-relaxed">
                        {study.afterState}
                     </p>
                  </DataPanel>
               </div>
            </div>
          </div>
        </section>

        {/* Sticky Content Section */}
        <section className="px-6 pb-32">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12">
            {/* Sticky Sidebar */}
            <aside className="lg:col-span-4 h-fit lg:sticky lg:top-32 space-y-8">
              <DataPanel title="Outcome Metrics">
                 <div className="space-y-6">
                    {study.outcomes.map((o, i) => (
                       <div key={i} className="flex justify-between items-end border-b border-gray-800 pb-2">
                          <div>
                             <div className="text-[10px] text-gray-500 uppercase font-black">{o.label}</div>
                             <div className="text-[9px] text-primary uppercase font-black">{o.subValue}</div>
                          </div>
                          <div className="text-2xl font-bold text-white">{o.value}</div>
                       </div>
                    ))}
                 </div>
              </DataPanel>

              <DataPanel title="Audit Controls">
                <div className="space-y-6">
                  {study.recommendations.map((rec, i) => (
                    <div key={i} className="space-y-2">
                       <div className="flex justify-between items-center">
                         <span className="text-[10px] text-gray-500 uppercase font-black">Strategy 0{i+1}</span>
                         <span className={cn("text-[8px] font-black uppercase px-1.5 py-0.5 rounded border", 
                            rec.priority === 'High' ? 'border-red-500/50 text-red-500' : 'border-yellow-500/50 text-yellow-500'
                         )}>{rec.priority} Priority</span>
                       </div>
                       <div className="text-xs text-white font-bold">{rec.title}</div>
                    </div>
                  ))}
                </div>
              </DataPanel>

              <div className="p-6 bg-gray-900/50 rounded-2xl border border-gray-800">
                 <h4 className="text-[10px] text-gray-500 uppercase font-black mb-4">Assumptions Buffer</h4>
                 <ul className="space-y-3">
                   {study.assumptions.map((ass, i) => (
                     <li key={i} className="text-[10px] text-gray-400 flex gap-2">
                       <span className="text-primary font-bold">»</span>
                       {ass}
                     </li>
                   ))}
                 </ul>
              </div>
            </aside>

            {/* Scrollable Main Content */}
            <div className="lg:col-span-8 space-y-24">
              {study.analysis.map((step, i) => (
                <div key={i} className="space-y-8">
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 rounded-full border border-primary/40 flex items-center justify-center text-primary font-black text-xl">
                      {i + 1}
                    </div>
                    <div>
                      <h3 className="text-xs font-black text-gray-500 uppercase tracking-[0.3em]">Analysis Node 0{i+1}</h3>
                      <h2 className="text-3xl font-bold text-white">{step.step}</h2>
                    </div>
                  </div>
                  <div className="p-8 bg-gray-950 rounded-3xl border border-gray-900 shadow-2xl">
                    <p className="text-xl text-gray-400 font-serif italic mb-8 leading-relaxed">
                      {step.description}
                    </p>
                    <div className="bg-primary/5 border border-primary/20 p-6 rounded-2xl flex gap-4">
                      <MagnifyingGlassIcon className="w-6 h-6 text-primary flex-shrink-0" />
                      <div>
                        <h4 className="text-[10px] text-primary uppercase font-black mb-1">Analytical Result</h4>
                        <p className="text-sm text-white font-bold leading-relaxed">{step.finding}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Recommendation Grid */}
              <div className="space-y-12 pt-12 border-t border-gray-900">
                 <div className="text-center space-y-2">
                   <h2 className="text-4xl font-bold text-white">Strategic Execution</h2>
                   <p className="text-gray-500 text-sm font-serif italic">High-fidelity recommendations based on audited findings.</p>
                 </div>
                 <div className="grid md:grid-cols-2 gap-6">
                    {study.recommendations.map((rec, i) => (
                      <InsightCard 
                        key={i}
                        title={rec.title}
                        value={rec.impact}
                        description="Projected outcome and margin shift upon successful execution."
                        trend={{ value: 'Impact High', positive: true }}
                      />
                    ))}
                 </div>
              </div>

              {/* Footer CTA */}
              <div className="p-12 bg-primary rounded-[3rem] text-center space-y-6 shadow-2xl shadow-primary/20">
                <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter">Ready for Outcome Simulation?</h2>
                <p className="text-white/80 font-serif italic text-lg max-w-xl mx-auto">
                  Run your business parameters through the Decision Simulator to project real-world impact.
                </p>
                <div className="flex justify-center gap-4 pt-4">
                  <Link href="/#contact" className="px-8 py-4 bg-white text-primary rounded-2xl font-black uppercase tracking-widest hover:bg-gray-100 transition-all">Book Consultation</Link>
                  <Link href="/case-studies" className="px-8 py-4 bg-secondary text-white rounded-2xl font-black uppercase tracking-widest hover:bg-black transition-all">Back to Archive</Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    )
  }

  // Fallback to existing project view if it's a legacy project
  if (project) {
    return (
      <main className="min-h-screen bg-secondary">
         <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto space-y-12">
            <Link href="/case-studies" className="text-xs font-black text-gray-500 uppercase tracking-widest flex items-center gap-2 hover:text-primary transition-all">
              <ArrowLeftIcon className="w-4 h-4" />
              Back to Archive
            </Link>
            <div className="space-y-4">
              <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">{project.category} Implementation</span>
              <h1 className="text-5xl font-bold text-white">{project.title}</h1>
              <p className="text-xl text-gray-400 font-serif italic leading-relaxed">{project.longDescription}</p>
            </div>
            <div className="relative h-[400px] rounded-3xl overflow-hidden border border-gray-800">
               <Image src={project.image} alt={project.title} fill className="object-cover grayscale hover:grayscale-0 transition-all duration-700" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
               {Object.entries(project.metrics || {}).map(([key, val]) => (
                 <div key={key} className="p-4 bg-gray-950 rounded-xl border border-gray-800">
                   <div className="text-[10px] text-gray-500 uppercase font-black mb-1">{key}</div>
                   <div className="text-xl font-bold text-primary">{val}</div>
                 </div>
               ))}
            </div>
         </div>
      </main>
    )
  }

  return notFound()
}

function OutcomeMiniMetric({ label, value, color }: { label: string, value: string, color: 'green' | 'blue' | 'red' }) {
  const colors = {
    green: 'text-green-500',
    blue: 'text-blue-500',
    red: 'text-red-500'
  }
  return (
    <div>
      <div className="text-[10px] text-gray-600 uppercase font-black mb-1">{label}</div>
      <div className={cn("text-xl font-bold", colors[color])}>{value}</div>
    </div>
  )
}