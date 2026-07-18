export interface Executive {
  id: string;
  name: string;
  role: string;
  avatar: string;
  status: string;
  vote: "Yes" | "No" | "Conditional" | "Flagged" | string;
  confidence: number;
  summary: string;
}

export interface TimelineEvent {
  id: number;
  time: string;
  agent: string;
  name: string;
  avatar: string;
  tag: string;
  tagColor: string;
  message: string;
}

export interface PipelineStep {
  id: number;
  label: string;
  subtext: string;
  time: string;
  status: "completed" | "active" | "warning" | "pending";
  iconName: "FileText" | "TrendingUp" | "Target" | "ShieldAlert" | "Users" | "Award";
}

// 1. Board Executives
export const MOCK_EXECUTIVES: Executive[] = [
  {
    id: "CEO",
    name: "Sarah Jenkins",
    role: "CEO Swarm",
    avatar: "💼",
    status: "Analyzed",
    vote: "Yes",
    confidence: 95,
    summary: "Strategic alignment is strong. Establishing local EU presence outweighs the initial 5% logo churn predicted. Deferring this pivot will lead to market-share stagnation."
  },
  {
    id: "CFO",
    name: "Thomas Wright",
    role: "CFO Agent",
    avatar: "📈",
    status: "Analyzed",
    vote: "Yes",
    confidence: 88,
    summary: "Financial models confirm the стратегическое transition is viable. 2.4x NPV return on capital allocation outweighs GDPR database replica operational costs."
  },
  {
    id: "CTO",
    name: "Dr. Aris Thorne",
    role: "CTO Agent",
    avatar: "🤖",
    status: "Audit Complete",
    vote: "Conditional",
    confidence: 90,
    summary: "Transatlantic latency sync degradation is severe. Frankfurt edge replica clusters must be deployed to bypass database sync latency prior to release."
  },
  {
    id: "CMO",
    name: "Clara Novak",
    role: "CMO Agent",
    avatar: "🎯",
    status: "Analyzed",
    vote: "Yes",
    confidence: 85,
    summary: "EU developer CAC metrics are 12% lower than US benchmarks. This makes marketing leverage high and justifies deferring LATAM pivots."
  },
  {
    id: "CPO",
    name: "Elena Rostova",
    role: "Product Agent",
    avatar: "🎨",
    status: "Analyzed",
    vote: "Yes",
    confidence: 92,
    summary: "German and French language localization packages are mapped. GDPR compliance privacy toggles are pre-integrated into our active layout branch."
  },
  {
    id: "CRO",
    name: "Marcus Vance",
    role: "Risk Agent",
    avatar: "🛡️",
    status: "Flagged Risks",
    vote: "No",
    confidence: 78,
    summary: "Evolving GDPR compliance limits on AI model weights present legal volatile threats. Competitor price copy risks within 6 months are high."
  },
  {
    id: "Audit",
    name: "Swarm Audit Core",
    role: "Auditor Module",
    avatar: "🔍",
    status: "Core Audit",
    vote: "Flagged",
    confidence: 82,
    summary: "No defensive moat protecting our edge latency setup. High risk of competitor price race-to-the-bottom if they match speeds within 6 months."
  }
];

// 2. Detailed Timeline Logs
export const MOCK_TIMELINE_EVENTS: TimelineEvent[] = [
  {
    id: 1,
    time: "10:04 AM",
    agent: "Founder",
    name: "System Core",
    avatar: "⚙️",
    tag: "Proposal Logged",
    tagColor: "bg-slate-900 text-slate-400 border-slate-800",
    message: "Strategic Proposal submitted: Expand SaaS operations to European region in Q3."
  },
  {
    id: 2,
    time: "10:05 AM",
    agent: "CFO Agent",
    name: "Thomas Wright",
    avatar: "📈",
    tag: "Financial Audit",
    tagColor: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    message: "Calculated capital overhead spikes: GDPR compliance hosting adds €14.5K/month. Cash runway falls by 8%."
  },
  {
    id: 3,
    time: "10:07 AM",
    agent: "CTO Agent",
    name: "Dr. Aris Thorne",
    avatar: "🤖",
    tag: "Technical Audit",
    tagColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    message: "Flagged global latency bottleneck: Local EU sync roundtrips add 150ms. Proposed Frankfurt edge-replication node mitigations."
  },
  {
    id: 4,
    time: "10:09 AM",
    agent: "CMO Agent",
    name: "Clara Novak",
    avatar: "🎯",
    tag: "Market Viability",
    tagColor: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    message: "Validated customer acquisition offsets: EU CAC ratios are 12% lower than US benchmarks. Defers LATAM risk tradeoff."
  },
  {
    id: 5,
    time: "10:10 AM",
    agent: "Product Agent",
    name: "Elena Rostova",
    avatar: "🎨",
    tag: "UX Assessment",
    tagColor: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
    message: "Approved onboarding readiness: Localization and GDPR-compliant consent banners pre-mapped for rapid deploy."
  },
  {
    id: 6,
    time: "10:11 AM",
    agent: "Risk Agent",
    name: "Marcus Vance",
    avatar: "🛡️",
    tag: "Risk Flagged",
    tagColor: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    message: "Issued compliance warning: Regulatory volatility of EU data laws might trigger higher client migration churn."
  },
  {
    id: 7,
    time: "10:12 AM",
    agent: "CEO Swarm",
    name: "Sarah Jenkins",
    avatar: "💼",
    tag: "Consensus Resolved",
    tagColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    message: "Updating strategy: Reallocated €8K R&D reserve for Frankfurt node. Consensus reached at 89%. Proposal APPROVED."
  }
];

// 3. High-level pipeline workflow steps
export const MOCK_PIPELINE_STEPS: PipelineStep[] = [
  {
    id: 1,
    label: "CEO received request",
    subtext: "Sarah Jenkins approved initial board proposal parameters and initiated swarm context allocation.",
    time: "10:04 AM",
    status: "completed",
    iconName: "FileText"
  },
  {
    id: 2,
    label: "CFO completed",
    subtext: "Thomas Wright locked unit economic forecasting models, risk ratios, and capital runway allocations.",
    time: "10:05 AM",
    status: "completed",
    iconName: "TrendingUp"
  },
  {
    id: 3,
    label: "Marketing completed",
    subtext: "Clara Novak validated regional market viability and European customer acquisition (CAC) offsets.",
    time: "10:09 AM",
    status: "completed",
    iconName: "Target"
  },
  {
    id: 4,
    label: "Blind Spot detected",
    subtext: "Audit Core flagged competitive latency replication hazards and regulatory GDPR volatility risks.",
    time: "10:11 AM",
    status: "warning",
    iconName: "ShieldAlert"
  },
  {
    id: 5,
    label: "Board voted",
    subtext: "Swarm voted. 6 APPROVED, 1 OPPOSED, 0 ABSTAINS. General board consensus verified at 89%.",
    time: "10:12 AM",
    status: "active",
    iconName: "Users"
  },
  {
    id: 6,
    label: "Recommendation generated",
    subtext: "Compiled board consensus memorandum exported and SHA256 hashed for founder signature.",
    time: "Pending",
    status: "pending",
    iconName: "Award"
  }
];

// 4. Default Proposal Summary
export const MOCK_PROPOSAL = {
  title: "Should we deprecate the legacy on-premise offering and migrate all enterprise clients to the managed cloud tier by next quarter, risking 5% immediate logo churn for 20% higher average contract value?",
  riskAlignment: "BALANCED",
  consensusScore: 89,
  voteCount: "6 YES • 1 NO",
  timestamp: "2026-07-18 10:12 AM GMT"
};
