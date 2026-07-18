"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle, AlertTriangle, ShieldCheck, Scale, Award } from "lucide-react";

interface ExecutiveCardProps {
  name: string;
  icon: string | React.ReactNode;
  status: string;
  vote: "Yes" | "No" | "Conditional" | "Flagged" | string;
  confidence: number;
  summary: string;
  isSelected?: boolean;
  onSelect?: () => void;
}

export default function ExecutiveCard({
  name,
  icon,
  status,
  vote,
  confidence,
  summary,
  isSelected = false,
  onSelect
}: ExecutiveCardProps) {
  
  // Custom styling for vote badges
  const getVoteBadge = (v: string) => {
    const norm = v.toLowerCase();
    if (norm === "yes" || norm === "approve" || norm === "approved") {
      return (
        <span className="inline-flex items-center gap-1 text-[8px] font-mono font-bold tracking-wider uppercase py-0.5 px-2 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/10">
          <CheckCircle2 className="h-2.5 w-2.5" />
          YES
        </span>
      );
    } else if (norm === "no" || norm === "reject" || norm === "rejected" || norm === "opposed") {
      return (
        <span className="inline-flex items-center gap-1 text-[8px] font-mono font-bold tracking-wider uppercase py-0.5 px-2 rounded bg-rose-500/10 text-rose-400 border border-rose-500/10">
          <XCircle className="h-2.5 w-2.5" />
          NO
        </span>
      );
    } else if (norm === "conditional" || norm === "yes with conditions") {
      return (
        <span className="inline-flex items-center gap-1 text-[8px] font-mono font-bold tracking-wider uppercase py-0.5 px-2 rounded bg-amber-500/10 text-amber-400 border border-amber-500/10">
          <AlertTriangle className="h-2.5 w-2.5" />
          CONDITIONAL
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center gap-1 text-[8px] font-mono font-bold tracking-wider uppercase py-0.5 px-2 rounded bg-slate-900 text-slate-400 border border-slate-800">
          {v}
        </span>
      );
    }
  };

  const isPositive = vote.toLowerCase() === "yes";
  const isNeutral = vote.toLowerCase() === "conditional";
  const confidenceColor = isPositive 
    ? "from-emerald-500 to-indigo-500" 
    : isNeutral 
    ? "from-amber-500 to-yellow-500" 
    : "from-rose-500 to-orange-500";

  return (
    <motion.button
      type="button"
      onClick={onSelect}
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`w-full rounded-2xl border text-left flex flex-col justify-between p-4.5 min-h-[190px] relative overflow-hidden transition-all duration-200 cursor-pointer ${
        isSelected
          ? "border-indigo-500 bg-indigo-950/10 shadow-lg shadow-indigo-500/5 ring-1 ring-indigo-500/20"
          : "border-slate-900 bg-slate-950/20 hover:border-slate-800 hover:bg-slate-950/40"
      }`}
    >
      {/* Decorative vertical gradient side bar */}
      <div className={`absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b ${confidenceColor} opacity-70`} />

      <div className="flex flex-col gap-3 w-full">
        {/* Executive Header info */}
        <div className="flex items-start justify-between w-full">
          <div className="flex items-center gap-2.5">
            <div className="h-8.5 w-8.5 rounded-lg bg-slate-950 border border-slate-900 flex items-center justify-center text-lg flex-shrink-0">
              {typeof icon === "string" ? icon : <span className="text-indigo-400">{icon}</span>}
            </div>
            <div className="flex flex-col">
              <h4 className="text-xs font-bold text-white leading-tight">{name}</h4>
              <span className="text-[9px] uppercase font-mono text-slate-500 tracking-wider mt-0.5">
                {status}
              </span>
            </div>
          </div>
          {getVoteBadge(vote)}
        </div>

        {/* Short summary block */}
        <p className="text-[10.5px] text-slate-400 leading-relaxed font-sans line-clamp-3">
          "{summary}"
        </p>
      </div>

      {/* Confidence Index bar (Bottom) */}
      <div className="w-full mt-4 pt-3.5 border-t border-slate-900/60 flex flex-col gap-1.5">
        <div className="flex justify-between items-center text-[9px] font-mono text-slate-500">
          <span>CONFIDENCE INDEX</span>
          <span className="text-slate-300 font-bold">{confidence}%</span>
        </div>
        <div className="h-1 bg-slate-950 rounded-full overflow-hidden w-full">
          <motion.div
            className={`h-full bg-gradient-to-r ${confidenceColor}`}
            initial={{ width: 0 }}
            animate={{ width: `${confidence}%` }}
            transition={{ duration: 0.6 }}
          />
        </div>
      </div>
      
    </motion.button>
  );
}
