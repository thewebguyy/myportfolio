export interface CaseStudy {
  id: string
  title: string
  client: string
  category: string
  goal: string
  context: string
  problem: string
  solution: string
  outcomes: {
    label: string
    value: string
    subValue: string
  }[]
  metrics: {
    label: string
    value: string
  }[]
  analysis: {
    step: string
    description: string
    finding: string
  }[]
  recommendations: {
    title: string
    impact: string
    priority: 'High' | 'Medium'
  }[]
  assumptions: string[]
  systemImpact: string
  efficiencyGain: string
  riskReduction: string
  beforeState: string
  afterState: string
}


