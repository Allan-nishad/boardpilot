"use client";

import { motion } from "react";
import { motion as motionElement } from "framer-motion";
import { 
  FileText, 
  TrendingUp, 
  Target, 
  ShieldAlert, 
  Users, 
  Award,
  ArrowDown,
  CheckCircle,
  AlertTriangle,
  Play,
  HelpCircle
} from "lucide-react";
import { MOCK_PIPELINE_STEPS } from "@/lib/mockData";

// Icon mapper for steps
const ICON_MAP = {
  FileText: FileText,
  TrendingUp: TrendingUp,
  Target: Target,
  ShieldAlert: ShieldAlert,
  Users: Users,
  Award: Award
};

export default function ExecutiveTimeline() {
  
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100 } }
  };

  const arrowVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    show: { 
      opacity: [0.3, 0.8, 0.3], 
      scale: 1,
      transition: { 
        repeat: Infinity, 
        duration: 3, 
        ease: "easeInOut" as const
      } 
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <span className="inline-flex items-center gap-1 text-[8px] font-mono font-bold uppercase tracking-wider py-0.5 px-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/10 rounded">
            <CheckCircle className="h-2.5 w-2.5" />
            Done
          </span>
        );
      case "warning":
        return (
          <span className="inline-flex items-center gap-1 text-[8px] font-mono font-bold uppercase tracking-wider py-0.5 px-2 bg-rose-500/10 text-rose-400 border border-rose-500/10 rounded">
            <AlertTriangle className="h-2.5 w-2.5" />
            Audit Flag
          </span>
        );
      case "active":
        return (
          <span className="inline-flex items-center gap-1 text-[8px] font-mono font-bold uppercase tracking-wider py-0.5 px-2 bg-indigo-500/10 text-indigo-400 border border-indigo-500/10 rounded">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-ping" />
            Voting
          </span>
        );
      case "pending":
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[8px] font-mono font-bold uppercase tracking-wider py-0.5 px-2 bg-slate-900 text-slate-500 border border-slate-800 rounded">
            Pending
          </span>
        );
    }
  };

  return (
    <div className="w-full bg-glass rounded-3xl p-5 shadow-2xl border border-slate-900 text-left">
      
      {/* Title Header */}
      <div className="flex items-center gap-2 pb-3.5 border-b border-slate-900 mb-5">
        <Play className="h-4.5 w-4.5 text-indigo-400 rotate-90" />
        <div>
          <h3 className="text-xs uppercase font-mono font-bold text-slate-400 tracking-wider">
            Swarm Progress Timeline
          </h3>
          <p className="text-[10px] text-slate-500">Pipeline resolution steps</p>
        </div>
      </div>

      {/* Steps Pipeline */}
      <motionElement.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="flex flex-col"
      >
        {MOCK_PIPELINE_STEPS.map((step, idx) => {
          // Resolve icon
          const IconComponent = ICON_MAP[step.iconName] || HelpCircle;

          const isCompleted = step.status === "completed";
          const isWarning = step.status === "warning";
          const isActive = step.status === "active";

          const borderColors = isCompleted
            ? "border-emerald-500/25 bg-emerald-950/5"
            : isWarning
            ? "border-rose-500/25 bg-rose-950/5"
            : isActive
            ? "border-indigo-500 bg-indigo-950/10 ring-1 ring-indigo-500/15"
            : "border-slate-900 bg-slate-950/20 opacity-50";

          return (
            <div key={step.id} className="flex flex-col">
              
              {/* Timeline Card */}
              <motionElement.div
                variants={cardVariants}
                className={`rounded-2xl border p-4.5 flex gap-3.5 items-start ${borderColors} transition-all duration-200`}
              >
                {/* Icon Capsule */}
                <div className={`h-8.5 w-8.5 rounded-lg flex items-center justify-center border flex-shrink-0 ${
                  isCompleted
                    ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                    : isWarning
                    ? "bg-rose-500/10 border-rose-500/20 text-rose-400"
                    : isActive
                    ? "bg-indigo-500/10 border-indigo-500/20 text-indigo-400"
                    : "bg-slate-900 border-slate-800 text-slate-550"
                }`}>
                  <IconComponent className="h-4.5 w-4.5" />
                </div>

                <div className="flex-grow flex flex-col gap-0.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white leading-tight">
                      {step.label}
                    </span>
                    {getStatusBadge(step.status)}
                  </div>
                  
                  <p className="text-[10px] text-slate-400 leading-relaxed font-sans mt-1.5">
                    {step.subtext}
                  </p>
                  
                  {step.time !== "Pending" && (
                    <span className="text-[9px] font-mono text-slate-650 mt-1 font-semibold">
                      LOGGED AT: {step.time}
                    </span>
                  )}
                </div>
              </motionElement.div>

              {/* Pulsing down connector arrow between steps */}
              {idx < MOCK_PIPELINE_STEPS.length - 1 && (
                <motionElement.div
                  variants={arrowVariants}
                  className="py-1.5 flex items-center justify-center text-indigo-500/50"
                >
                  <ArrowDown className="h-4.5 w-4.5" />
                </motionElement.div>
              )}

            </div>
          );
        })}
      </motionElement.div>

    </div>
  );
}
