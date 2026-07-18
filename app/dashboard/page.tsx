"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  Activity, 
  PlusCircle, 
  CheckCircle,
  Users,
  Cpu
} from "lucide-react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import ExecutiveCard from "@/components/ExecutiveCard";
import Timeline from "@/components/Timeline";
import ExecutiveTimeline from "@/components/ExecutiveTimeline";
import VotingMatrix from "@/components/VotingMatrix";
import ExecutiveMemo from "@/components/ExecutiveMemo";
import { MOCK_EXECUTIVES, MOCK_PROPOSAL } from "@/lib/mockData";

export default function DashboardPage() {
  const router = useRouter();
  const [decisionText, setDecisionText] = useState(MOCK_PROPOSAL.title);
  const [riskAlignment, setRiskAlignment] = useState(MOCK_PROPOSAL.riskAlignment);
  const [proposal, setProposal] = useState(MOCK_PROPOSAL);
  const [executives, setExecutives] = useState(MOCK_EXECUTIVES);
  const [selectedExecutiveId, setSelectedExecutiveId] = useState("CEO");
  const [activeTab, setActiveTab] = useState<"memo" | "swarm" | "matrix">("memo");

  // Read custom proposal context from local storage if available
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedDecision = window.localStorage.getItem("boardpilot_decision");
      const savedRisk = window.localStorage.getItem("boardpilot_risk");
      const savedResponse = window.localStorage.getItem("boardpilot_api_response");
      
      if (savedDecision) {
        setDecisionText(savedDecision);
      }
      if (savedRisk) {
        setRiskAlignment(savedRisk.toUpperCase());
      }
      
      if (savedResponse) {
        try {
          const apiData = JSON.parse(savedResponse);
          
          setProposal({
            title: savedDecision || apiData.decision,
            riskAlignment: (savedRisk || "BALANCED").toUpperCase(),
            consensusScore: apiData.confidence,
            voteCount: `${apiData.agents.filter((a: any) => a.vote.toUpperCase() === 'YES' || a.vote.toUpperCase() === 'CONDITIONAL').length} YES • ${apiData.agents.filter((a: any) => a.vote.toUpperCase() === 'NO').length} NO`,
            timestamp: "Just Now"
          });

          // Map agents to executives format
          const mappedExecs = apiData.agents.map((agent: any) => {
            let avatar = "💼";
            if (agent.role === "CFO") avatar = "📈";
            else if (agent.role === "CTO") avatar = "🤖";
            else if (agent.role === "Marketing") avatar = "🎯";
            else if (agent.role === "Risk") avatar = "🛡️";
            else if (agent.role === "Blind Spot") avatar = "🔍";

            return {
              id: agent.role,
              name: agent.name || `${agent.role} Agent`,
              role: `${agent.role} Agent`,
              avatar: avatar,
              status: agent.vote === "No" ? "Flagged Risks" : "Analyzed",
              vote: agent.vote || "Yes",
              confidence: agent.confidence || 85,
              summary: agent.analysis
            };
          });

          // Ensure CEO node is present
          if (!mappedExecs.some((e: any) => e.id === "CEO")) {
            mappedExecs.unshift({
              id: "CEO",
              name: "Sarah Jenkins",
              role: "CEO Swarm",
              avatar: "💼",
              status: "Analyzed",
              vote: "Yes",
              confidence: 95,
              summary: apiData.decision
            });
          }

          setExecutives(mappedExecs);
        } catch (e) {
          console.error("Failed to load live response data", e);
        }
      }
    }
  }, []);

  const handleNewProposal = () => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("boardpilot_decision");
      window.localStorage.removeItem("boardpilot_risk");
      window.localStorage.removeItem("boardpilot_api_response");
    }
    router.push("/decision");
  };

  const selectedExec = executives.find((e: any) => e.id === selectedExecutiveId) || executives[0];

  return (
    <div className="min-h-screen bg-board-dark text-slate-100 flex flex-col font-sans bg-grid-pattern relative">
      
      {/* Premium Sticky Navigation */}
      <Navbar />

      {/* Decorative ambient gradients */}
      <div className="absolute top-0 left-1/4 h-[300px] w-[300px] rounded-full bg-indigo-900/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 h-[350px] w-[350px] rounded-full bg-purple-950/5 blur-[120px] pointer-events-none" />

      {/* Main Container */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 md:px-6 pt-32 pb-16 flex flex-col gap-8 relative z-10 text-left">
        
        {/* 1. Top Decision Summary Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl border border-slate-900 bg-glass p-6 md:p-8 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6"
        >
          <div className="absolute top-0 right-0 h-32 w-32 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none" />

          <div className="flex flex-col gap-2 max-w-3xl text-left">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="text-[9px] font-mono font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 px-2.5 py-0.5 border border-emerald-500/20 rounded-full flex items-center gap-1">
                <CheckCircle className="h-3 w-3" /> Approved
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-slate-800" />
              <span className="text-[9px] font-mono font-bold uppercase text-slate-400">
                Risk Align: <span className="text-indigo-400">{riskAlignment}</span>
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-slate-800" />
              <span className="text-[9px] font-mono font-bold uppercase text-slate-400">
                Consensus: <span className="text-white font-bold">{proposal.consensusScore}% ({proposal.voteCount})</span>
              </span>
            </div>

            <h2 className="text-lg md:text-xl font-black text-white mt-1.5 leading-snug">
              "{decisionText}"
            </h2>
            
            <p className="text-[11px] text-slate-500 font-sans leading-relaxed">
              Swarm debate completed successfully. Consensus locked for validation.
            </p>
          </div>

          {/* Reset Action */}
          <div className="flex-shrink-0">
            <button
              type="button"
              onClick={handleNewProposal}
              className="group flex items-center justify-center gap-1.5 rounded-xl border border-slate-800 hover:border-slate-700 bg-slate-950/80 hover:bg-slate-900 px-5 py-3 text-xs font-bold text-slate-300 hover:text-white transition-all cursor-pointer"
            >
              <PlusCircle className="h-4 w-4 text-indigo-400" />
              New Proposal
            </button>
          </div>
        </motion.div>

        {/* 1.5. Highlighted Recommendation Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-3xl border border-indigo-500/20 bg-indigo-950/10 p-5 md:p-6 text-left"
        >
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-400 block mb-1">
            ⚡ Swipe Swarm Resolution Verdict
          </span>
          <p className="text-xs md:text-sm text-slate-200 font-sans leading-relaxed">
            {proposal.title}
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex gap-1 md:gap-3 border-b border-slate-900/60 pb-px overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab("memo")}
            className={`py-3 px-4 md:px-6 text-xs font-bold font-mono uppercase tracking-wider border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "memo"
                ? "border-indigo-500 text-white"
                : "border-transparent text-slate-500 hover:text-slate-300"
            }`}
          >
            📋 Memo Verdict
          </button>
          <button
            onClick={() => setActiveTab("swarm")}
            className={`py-3 px-4 md:px-6 text-xs font-bold font-mono uppercase tracking-wider border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "swarm"
                ? "border-indigo-500 text-white"
                : "border-transparent text-slate-500 hover:text-slate-300"
            }`}
          >
            👥 Swarm Debate
          </button>
          <button
            onClick={() => setActiveTab("matrix")}
            className={`py-3 px-4 md:px-6 text-xs font-bold font-mono uppercase tracking-wider border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "matrix"
                ? "border-indigo-500 text-white"
                : "border-transparent text-slate-500 hover:text-slate-300"
            }`}
          >
            📊 Voting Matrix
          </button>
        </div>

        {/* 2. Main Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column (2/3 width) - Tab Panels */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {activeTab === "memo" && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="w-full">
                <ExecutiveMemo />
              </motion.div>
            )}

            {activeTab === "matrix" && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="w-full">
                <VotingMatrix />
              </motion.div>
            )}

            {activeTab === "swarm" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-6 w-full">
                {/* Header */}
                <div className="flex items-center justify-between pb-2 border-b border-slate-900/60">
                  <div className="flex items-center gap-2">
                    <Users className="h-4.5 w-4.5 text-indigo-400" />
                    <h3 className="text-xs uppercase font-mono font-bold text-slate-400 tracking-wider">
                      Swarm Agent Reviews
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">
                    Select a card to inspect agent reviews
                  </span>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4.5">
                  {executives.map((exec: any) => (
                    <ExecutiveCard
                      key={exec.id}
                      name={exec.name}
                      icon={exec.avatar}
                      status={exec.status}
                      vote={exec.vote}
                      confidence={exec.confidence}
                      summary={exec.summary}
                      isSelected={selectedExecutiveId === exec.id}
                      onSelect={() => setSelectedExecutiveId(exec.id)}
                    />
                  ))}
                </div>

                {/* Agent Detail Panel */}
                <AnimatePresence mode="wait">
                  {selectedExec && (
                    <motion.div 
                      key={selectedExec.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="rounded-3xl border border-slate-900 bg-glass-intense p-6 relative overflow-hidden flex flex-col gap-4 mt-2"
                    >
                      <div className="absolute top-0 right-0 h-32 w-32 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none" />
                      
                      <div className="flex items-center justify-between border-b border-slate-900 pb-4">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{selectedExec.avatar}</span>
                          <div>
                            <h4 className="text-sm font-bold text-white leading-tight">{selectedExec.name}</h4>
                            <span className="text-[10px] font-mono text-slate-500">{selectedExec.role}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="flex flex-col items-end">
                            <span className="text-[9px] uppercase font-mono text-slate-500">Vote</span>
                            <span className={`text-xs font-bold uppercase font-mono ${
                              selectedExec.vote.toUpperCase() === "YES" ? "text-emerald-400" : selectedExec.vote.toUpperCase() === "NO" ? "text-rose-400" : "text-amber-400"
                            }`}>{selectedExec.vote}</span>
                          </div>
                          <div className="flex flex-col items-end border-l border-slate-900 pl-4">
                            <span className="text-[9px] uppercase font-mono text-slate-500">Confidence</span>
                            <span className="text-xs font-bold text-indigo-400 font-mono">{selectedExec.confidence}%</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <span className="text-[9px] uppercase font-mono text-slate-500 font-bold tracking-wider">Detailed Agent Insights:</span>
                        <p className="text-xs text-slate-300 leading-relaxed font-sans bg-slate-950/40 p-4 rounded-xl border border-slate-900/60 whitespace-pre-wrap">
                          {selectedExec.summary}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

          </div>

          {/* Right Column (1/3 width) - Timelines */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            
            {/* 1. Workflow Pipeline */}
            <div className="w-full">
              <ExecutiveTimeline />
            </div>

            {/* 2. Detailed Logs */}
            <div className="w-full">
              <Timeline />
            </div>

          </div>

        </div>

      </main>

    </div>
  );
}
