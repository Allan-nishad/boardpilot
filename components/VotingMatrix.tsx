"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle, AlertCircle, Scale, Award, ShieldCheck } from "lucide-react";
import { MOCK_EXECUTIVES } from "@/lib/mockData";

export default function VotingMatrix() {
  const [voters, setVoters] = useState<any[]>(MOCK_EXECUTIVES);
  const [verdictText, setVerdictText] = useState("PASSED (5 YES • 1 NO • 1 COND • 1 FLGD)");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedResponse = window.localStorage.getItem("boardpilot_api_response");
      if (savedResponse) {
        try {
          const apiData = JSON.parse(savedResponse);
          
          // Map agents to voters structure
          const mappedVoters = apiData.agents.map((agent: any) => {
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
              vote: agent.vote || "Yes",
              confidence: agent.confidence || 85
            };
          });

          // Ensure CEO node is present
          if (!mappedVoters.some((v: any) => v.id === "CEO")) {
            mappedVoters.unshift({
              id: "CEO",
              name: "Sarah Jenkins",
              role: "CEO Swarm",
              avatar: "💼",
              vote: "Yes",
              confidence: 95
            });
          }

          setVoters(mappedVoters);

          // Calculate vote tallies
          const yesCount = mappedVoters.filter((v: any) => v.vote.toUpperCase() === "YES").length;
          const noCount = mappedVoters.filter((v: any) => v.vote.toUpperCase() === "NO").length;
          const condCount = mappedVoters.filter((v: any) => v.vote.toUpperCase() === "CONDITIONAL" || v.vote.toUpperCase() === "COND").length;
          const flaggedCount = mappedVoters.filter((v: any) => v.vote.toUpperCase() === "FLAGGED").length;

          setVerdictText(`PASSED (${yesCount} YES • ${noCount} NO ${condCount > 0 ? `• ${condCount} COND` : ''}${flaggedCount > 0 ? `• ${flaggedCount} FLGD` : ''})`);
        } catch (e) {
          console.error("Failed to parse boardpilot_api_response in matrix", e);
        }
      }
    }
  }, []);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100 } }
  };

  const getVoteBadge = (vote: string) => {
    const norm = vote.toLowerCase();
    if (norm === "yes") {
      return (
        <span className="inline-flex items-center gap-1 text-[9px] font-mono font-bold uppercase py-1 px-3.5 rounded-full border bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-sm shadow-emerald-500/5">
          <CheckCircle2 className="h-3 w-3" />
          YES
        </span>
      );
    } else if (norm === "no") {
      return (
        <span className="inline-flex items-center gap-1 text-[9px] font-mono font-bold uppercase py-1 px-3.5 rounded-full border bg-rose-500/10 text-rose-400 border-rose-500/20 shadow-sm shadow-rose-500/5">
          <XCircle className="h-3 w-3" />
          NO
        </span>
      );
    } else if (norm === "flagged") {
      return (
        <span className="inline-flex items-center gap-1 text-[9px] font-mono font-bold uppercase py-1 px-3.5 rounded-full border bg-indigo-500/10 text-indigo-400 border-indigo-500/20 shadow-sm shadow-indigo-500/5">
          <AlertCircle className="h-3 w-3" />
          FLAGGED
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center gap-1 text-[9px] font-mono font-bold uppercase py-1 px-3.5 rounded-full border bg-amber-500/10 text-amber-400 border-amber-500/20 shadow-sm shadow-amber-500/5">
          <AlertCircle className="h-3 w-3" />
          YES WITH CONDITIONS
        </span>
      );
    }
  };

  const getConfidenceBar = (conf: number, vote: string) => {
    const norm = vote.toLowerCase();
    const color = norm === "no" 
      ? "from-rose-500 to-orange-500" 
      : norm === "conditional"
      ? "from-amber-500 to-yellow-500"
      : "from-indigo-500 to-purple-500";

    return (
      <div className="w-full flex items-center gap-3">
        <div className="h-1.5 bg-slate-950 rounded-full flex-grow overflow-hidden max-w-[120px] md:max-w-none">
          <motion.div 
            className={`h-full bg-gradient-to-r ${color}`}
            initial={{ width: 0 }}
            animate={{ width: `${conf}%` }}
            transition={{ duration: 0.6, delay: 0.2 }}
          />
        </div>
        <span className="text-[10px] font-mono font-bold text-slate-300 w-8 text-right">{conf}%</span>
      </div>
    );
  };

  return (
    <div className="w-full bg-glass rounded-3xl p-6 shadow-2xl border border-slate-900 relative text-left">
      
      {/* Decorative gradient */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />
      <div className="absolute top-0 left-0 h-28 w-28 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none" />

      {/* Aggregate Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-900 mb-6">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <Scale className="h-4.5 w-4.5" />
          </div>
          <div>
            <h3 className="text-xs uppercase font-mono font-bold text-slate-400 tracking-wider">
              Consensus Voting Matrix
            </h3>
            <p className="text-[10px] text-slate-500">Official Swarm Tally Resolution</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[9px] font-mono text-slate-500 uppercase">Board Verdict:</span>
          <span className="text-[10px] font-mono font-black bg-emerald-500/10 text-emerald-400 py-1 px-3 border border-emerald-500/20 rounded-lg flex items-center gap-1.5 uppercase shadow">
            <Award className="h-3.5 w-3.5 text-emerald-400" />
            {verdictText}
          </span>
        </div>
      </div>

      {/* Matrix Table */}
      <div className="w-full overflow-hidden">
        
        {/* Desktop Header row (Hidden on Mobile) */}
        <div className="hidden md:grid grid-cols-12 gap-4 px-4 py-2 text-[10px] uppercase font-mono font-bold text-slate-500 border-b border-slate-900/60 pb-3">
          <div className="col-span-5">Executive Node</div>
          <div className="col-span-4">Vote Tally</div>
          <div className="col-span-3 text-right">Confidence Level</div>
        </div>

        {/* Voting Rows */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex flex-col mt-2"
        >
          {voters.map((voter) => (
            <motion.div
              key={voter.id}
              variants={rowVariants}
              className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 items-center px-4 py-3.5 bg-slate-950/20 hover:bg-slate-950/60 border border-slate-900/40 md:border-transparent md:border-b md:border-slate-900/40 md:hover:border-slate-800 rounded-2xl md:rounded-none mb-3 md:mb-0 transition-all duration-150 relative group"
            >
              {/* Executive Column */}
              <div className="col-span-1 md:col-span-5 flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-slate-950 border border-slate-900 flex items-center justify-center text-md group-hover:scale-105 transition-transform flex-shrink-0">
                  {voter.avatar}
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-bold text-white leading-tight group-hover:text-indigo-200 transition-colors">
                    {voter.name}
                  </span>
                  <span className="text-[9px] uppercase font-mono tracking-wider font-semibold text-slate-500 -mt-0.5">
                    {voter.role}
                  </span>
                </div>
              </div>

              {/* Vote Column */}
              <div className="col-span-1 md:col-span-4 flex items-center text-left">
                {getVoteBadge(voter.vote)}
              </div>

              {/* Confidence Column */}
              <div className="col-span-1 md:col-span-3 flex justify-end">
                {getConfidenceBar(voter.confidence, voter.vote)}
              </div>

            </motion.div>
          ))}
        </motion.div>

      </div>

      {/* Footer warning */}
      <div className="mt-6 pt-4 border-t border-slate-900/80 flex items-center gap-2 text-[10px] text-slate-500 font-mono">
        <ShieldCheck className="h-4 w-4 text-indigo-400" />
        <span>Voters require 100% computational integrity metrics before lock resolution.</span>
      </div>

    </div>
  );
}
