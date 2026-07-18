"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
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
  const [selectedExecutiveId, setSelectedExecutiveId] = useState("CEO");

  // Read custom proposal context from local storage if available
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedDecision = window.localStorage.getItem("boardpilot_decision");
      const savedRisk = window.localStorage.getItem("boardpilot_risk");
      if (savedDecision) {
        setDecisionText(savedDecision);
      }
      if (savedRisk) {
        setRiskAlignment(savedRisk.toUpperCase());
      }
    }
  }, []);

  const handleNewProposal = () => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("boardpilot_decision");
      window.localStorage.removeItem("boardpilot_risk");
    }
    router.push("/decision");
  };

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
                Consensus: <span className="text-white font-bold">{MOCK_PROPOSAL.consensusScore}% ({MOCK_PROPOSAL.voteCount})</span>
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

        {/* 2. Main Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column (2/3 width) - Grid, Matrix, Memo */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            
            {/* Executive Cards Header */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-900/60">
              <div className="flex items-center gap-2">
                <Users className="h-4.5 w-4.5 text-indigo-400" />
                <h3 className="text-xs uppercase font-mono font-bold text-slate-400 tracking-wider">
                  Executive Swarm breakdown
                </h3>
              </div>
              <span className="text-[10px] font-mono text-slate-500">
                Click cards to review alignment
              </span>
            </div>

            {/* Grid of 7 Cards */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4.5"
            >
              {MOCK_EXECUTIVES.map((exec) => (
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
              
              {/* Visual space filler card to balance grid */}
              <div className="hidden lg:flex items-center justify-center border border-dashed border-slate-900/40 rounded-2xl p-5 text-center min-h-[190px] opacity-40">
                <span className="text-[10px] font-mono text-slate-655 uppercase">
                  OpenSwarm Core
                </span>
              </div>
            </motion.div>

            {/* Voting Matrix Table */}
            <div className="w-full">
              <VotingMatrix />
            </div>

            {/* Compiled Executive Memo */}
            <div className="w-full">
              <ExecutiveMemo />
            </div>

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
