export interface CaseStudy {
  id: string
  title: string
  client: string
  goal: string
  context: string
  problem: string
  assumptions: string[]
  analysis: {
    step: string
    description: string
    finding: string
  }[]
  recommendations: {
    title: string
    impact: string
    priority: 'High' | 'Medium' | 'Low'
  }[]
  metrics: {
    label: string
    value: string
  }[]
  category: 'Consulting' | 'Audit' | 'Strategy'
}

export const flagshipCaseStudies: CaseStudy[] = [
  {
    id: 'cost-reduction-lagos-sme',
    title: 'Operational Cost Reduction Strategy',
    client: 'Lagos-based Logistics SME',
    goal: 'Reduce operational expenditure by 25% within 12 months',
    category: 'Consulting',
    context: 'A mid-sized logistics firm in Lagos facing rising fuel costs, inefficient routing, and high administrative overhead.',
    problem: 'Operating margins compressed to <5% due to inflationary pressures and manual dispatch processes.',
    assumptions: [
      'Stable regulatory environment for the next 12 months',
      'Fuel prices remain within a 15% variance',
      'Staff turnover remains below 10%',
    ],
    analysis: [
      {
        step: 'Data Audit',
        description: 'Analyzed 24 months of fuel consumption and maintenance logs.',
        finding: '18% of fuel spend was unaccounted for, suggesting massive siphoning and idling.',
      },
      {
        step: 'Process Mapping',
        description: 'Shadowed dispatchers and drivers for 2 weeks.',
        finding: 'Redundant routes and empty backhauls were costing ~$4,000/month.',
      },
    ],
    recommendations: [
      {
        title: 'Digital Fleet Management',
        impact: 'Estimated 15% reduction in fuel theft',
        priority: 'High',
      },
      {
        title: 'Backhaul Optimization',
        impact: 'Increased asset utilization by 22%',
        priority: 'High',
      },
    ],
    metrics: [
      { label: 'Target Savings', value: '25%' },
      { label: 'Realized ROI', value: '310%' },
      { label: 'Process Efficiency', value: '+40%' },
    ],
  },
  {
    id: 'risk-audit-analysis',
    title: 'Enterprise Risk & Control Audit',
    client: 'Regional Fintech Provider',
    goal: 'Identify and mitigate operational and financial fraud risks',
    category: 'Audit',
    context: 'Rapidly growing fintech experiencing unexplained variance in daily reconciliation reports.',
    problem: 'Weak internal controls and manual approval overrides leading to high operational risk.',
    assumptions: [
      'Existing ledger data is 95% accurate',
      'Management is committed to implementing control changes',
    ],
    analysis: [
      {
        step: 'Internal Control Review',
        description: 'Audited user access levels and approval hierarchies.',
        finding: '4 senior managers had global override permissions with no audit trail.',
      },
      {
        step: 'Transaction Analysis',
        description: 'Algorithmic scan of 1M+ transactions.',
        finding: 'Identified 3 potential fraud patterns worth $120k in annual leakages.',
      },
    ],
    recommendations: [
      {
        title: 'Multi-Sig Approval Workflows',
        impact: 'Eliminated unauthorized overrides',
        priority: 'High',
      },
      {
        title: 'Automated Reconciliation',
        impact: 'Reduced reporting errors by 90%',
        priority: 'High',
      },
    ],
    metrics: [
      { label: 'Risk Exposure Mitigated', value: '$250K/yr' },
      { label: 'Compliance Score', value: '98%' },
      { label: 'Audit Trail Coverage', value: '100%' },
    ],
  },
  {
    id: 'fx-volatility-impact',
    title: 'FX Volatility Strategic Response',
    client: 'Import-Dependent Manufacturing Group',
    goal: 'Protect margins against NGN devaluation',
    category: 'Strategy',
    context: 'Manufacturer relying on imported raw materials facing 40% cost increase due to currency instability.',
    problem: 'Inability to pass full costs to consumers without losing market share.',
    assumptions: [
      'NGN continues to face downward pressure',
      'Alternative local sourcing is partially viable',
    ],
    analysis: [
      {
        step: 'Exposure Mapping',
        description: 'Quantified total USD-linked liability across supply chain.',
        finding: '75% of COGS is currency-sensitive.',
      },
      {
        step: 'Scenario Modeling',
        description: 'Stress-tested margins against 50%, 100%, and 200% devaluation.',
        finding: 'Company would become insolvent at 80% devaluation without intervention.',
      },
    ],
    recommendations: [
      {
        title: 'Local Content Substitution',
        impact: 'Reduced FX exposure by 30%',
        priority: 'High',
      },
      {
        title: 'Forward Contract Hedging',
        impact: 'Stabilized pricing for 6-month cycles',
        priority: 'Medium',
      },
    ],
    metrics: [
      { label: 'Margin Protected', value: '12%' },
      { label: 'Supply Chain Resilience', value: 'High' },
      { label: 'FX Exposure reduction', value: '30%' },
    ],
  },
]
