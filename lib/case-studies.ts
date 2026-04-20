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
  financialImpact: string
  efficiencyGain: string
  riskReduction: string
  beforeState: string
  afterState: string
}

export const flagshipCaseStudies: CaseStudy[] = [
  {
    id: 'cost-optimization-audit',
    title: 'Operational Cost Reduction Strategy',
    client: 'Lagos Logistics SME',
    category: 'Operational',
    goal: 'Identify and eliminate operational leakages in last-mile delivery.',
    context: 'The client faced a 25% margin erosion due to unoptimized routing and fuel theft.',
    problem: 'Manual dispatching led to 40% idle time and zero visibility into driver behavior.',
    solution: 'Implemented real-time GPS orchestration and automated fuel ledger auditing.',
    financialImpact: '₦4.2M saved monthly',
    efficiencyGain: '32% increase in deliveries/day',
    riskReduction: '90% drop in unauthorized stops',
    beforeState: 'Manual dispatch, opaque fuel costs, 65% delivery success.',
    afterState: 'Automated routing, real-time auditing, 94% delivery success.',
    outcomes: [
      { label: 'Monthly Savings', value: '₦4.2M', subValue: '25% Net Margin Increase' },
      { label: 'Fleet Efficiency', value: '+32%', subValue: 'Optimized Routing' },
      { label: 'Audit Accuracy', value: '100%', subValue: 'Zero Fuel Leakage' }
    ],
    metrics: [
      { label: 'ROI', value: '412%' },
      { label: 'Payback', value: '3 Months' }
    ],
    analysis: [
      { 
        step: 'Data Ingestion', 
        description: 'Analyzed 6 months of historical fuel receipts against GPS logs.', 
        finding: '15% of fuel spend was geographically decoupled from fleet coordinates.' 
      },
      { 
        step: 'Routing Audit', 
        description: 'Simulated 1,000 deliveries using automated clustering.', 
        finding: 'Current routes overlapped by 22%, causing redundant mileage.' 
      }
    ],
    recommendations: [
      { title: 'Automated Ledger Sync', impact: 'Direct bottom-line impact', priority: 'High' },
      { title: 'Predictive Maintenance', impact: 'Prevents fleet downtime', priority: 'Medium' }
    ],
    assumptions: ['Stable fuel prices', 'Internet availability for GPS tracking']
  },
  {
    id: 'risk-audit-fintech',
    title: 'Strategic Risk & Fraud Audit',
    client: 'Regional Fintech Provider',
    category: 'Risk & Audit',
    goal: 'Mitigate transaction fraud and ensure regulatory compliance.',
    context: 'Expanding to 100k+ users introduced significant exposure to account takeover attacks.',
    problem: 'Legacy fraud detection was rule-based and failing to catch sophisticated patterns.',
    solution: 'Designed a multi-layered behavioral analysis system with automated risk-flagging.',
    financialImpact: '$120k fraud prevention/yr',
    efficiencyGain: '85% faster audit cycles',
    riskReduction: '70% reduction in successful ATAs',
    beforeState: 'Reactive fraud team, high manual review load, rule-based detection.',
    afterState: 'Proactive orchestration, automated risk scoring, 15ms detection latency.',
    outcomes: [
      { label: 'Loss Prevention', value: '$120K+', subValue: 'Annual Savings' },
      { label: 'Compliance Score', value: 'A+', subValue: 'Audit Ready' },
      { label: 'Detection Speed', value: '15ms', subValue: 'Real-time Mitigation' }
    ],
    metrics: [
      { label: 'Risk Score', value: 'Low' },
      { label: 'Uptime', value: '99.99%' }
    ],
    analysis: [
      { 
        step: 'Pattern Recognition', 
        description: 'Applied clustering to 500k historical transactions.', 
        finding: '3% of accounts showed synthetic ID characteristics.' 
      },
      { 
        step: 'System Stress Test', 
        description: 'Simulated 10,000 concurrent bot login attempts.', 
        finding: 'Rate limiting was bypassed by distributed residential proxies.' 
      }
    ],
    recommendations: [
      { title: 'Biometric MFA', impact: 'Hardens account security', priority: 'High' },
      { title: 'Behavioral Fingerprinting', impact: 'Early fraud detection', priority: 'High' }
    ],
    assumptions: ['Cloud provider stability', 'Regulatory consistency']
  }
]
