"use client";

import { motion } from "framer-motion";
import { 
  FileText, 
  ShieldAlert, 
  CheckSquare, 
  TrendingUp, 
  HelpCircle, 
  Lock, 
  Scale, 
  AlertTriangle,
  ClipboardList,
  Sparkles,
  Download
} from "lucide-react";
import React from "react";

export default function ExecutiveMemo() {
  
  const sectionsVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100 } }
  };

  return (
    <div className="w-full bg-glass-intense rounded-3xl p-6 md:p-8 shadow-2xl border border-slate-900 relative overflow-hidden font-sans text-left">
      
      {/* Visual report stamp decoration */}
      <div className="absolute top-0 right-0 h-44 w-44 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />

      {/* Report Header Metadata */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-900 pb-6 mb-8 text-left">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-slate-950 flex items-center justify-center border border-slate-900 text-indigo-400">
            <FileText className="h-5 w-5" />
          </div>
          <div>
            <span className="text-[9px] uppercase font-mono font-bold tracking-widest text-indigo-400 block">
              Joint Swarm Resolution
            </span>
            <h2 className="text-lg font-black text-white uppercase tracking-tight mt-0.5">
              Executive Board Memorandum
            </h2>
          </div>
        </div>

        {/* Monospaced Meta Block */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-[9px] font-mono text-slate-500 border-l md:border-l border-slate-900 pl-0 md:pl-6">
          <div>DOC INDEX:</div>
          <div className="text-white font-bold">BP-MEMO-2026-92A</div>
          <div>TIMESTAMP:</div>
          <div className="text-slate-400">2026-07-18 10:12 GMT</div>
          <div>SWARM ENGINE:</div>
          <div className="text-slate-400">OpenSwarm Core v1.0</div>
          <div>SECURITY LOCK:</div>
          <div className="text-indigo-400/90 font-bold">SHA256://8a2c41f9e80b</div>
        </div>
      </div>

      {/* Memo Sections Grid */}
      <motion.div 
        variants={sectionsVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left"
      >
        
        {/* Left Column (2/3 width) - Recommendation, Risks, Next Actions */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          
          {/* 1. Recommendation */}
          <motion.div variants={itemVariants} className="flex flex-col gap-2">
            <span className="text-[10px] uppercase font-mono font-bold text-slate-500 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-indigo-400" />
              1. Recommendation Verdict
            </span>
            <div className="rounded-2xl border border-slate-900 bg-slate-950/40 p-4.5">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 px-2 py-0.5 border border-emerald-500/20 rounded">
                Consensus APPROVED (89%)
              </span>
              <p className="text-xs text-slate-300 leading-relaxed font-sans mt-3">
                The Board strongly recommends proceeding with the **European Union regional expansion in Q3**. Latency and data residency constraints are addressed by directing capital reserves toward localized Frankfurt edge-replication database replica nodes, bypassing transatlantic overhead.
              </p>
            </div>
          </motion.div>

          {/* 2. Risks */}
          <motion.div variants={itemVariants} className="flex flex-col gap-2">
            <span className="text-[10px] uppercase font-mono font-bold text-slate-500 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-rose-400" />
              2. Evaluated Risk Vectors
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-950/20 border border-slate-900 rounded-xl p-3.5 flex items-start gap-2.5">
                <Lock className="h-4 w-4 text-rose-400 flex-shrink-0 mt-0.5" />
                <div className="flex flex-col gap-0.5">
                  <h4 className="text-[11px] font-bold text-slate-200">Compliance Volatility</h4>
                  <p className="text-[10px] text-slate-500 leading-relaxed">
                    Evolving GDPR AI data weight processing boundaries may force localized model siloing.
                  </p>
                </div>
              </div>
              <div className="bg-slate-950/20 border border-slate-900 rounded-xl p-3.5 flex items-start gap-2.5">
                <TrendingUp className="h-4 w-4 text-rose-400 flex-shrink-0 mt-0.5" />
                <div className="flex flex-col gap-0.5">
                  <h4 className="text-[11px] font-bold text-slate-200">Runway Compression</h4>
                  <p className="text-[10px] text-slate-500 leading-relaxed">
                    Overhead increases by €14.5K/month, compressing runway from 18 to 16.5 months.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 3. Next Actions */}
          <motion.div variants={itemVariants} className="flex flex-col gap-2">
            <span className="text-[10px] uppercase font-mono font-bold text-slate-500 flex items-center gap-2">
              <ClipboardList className="h-4 w-4 text-indigo-400" />
              3. Proposed Next Actions
            </span>
            <div className="rounded-2xl border border-slate-900 bg-slate-950/20 p-4.5 flex flex-col gap-3">
              <div className="flex items-start gap-3">
                <input 
                  type="checkbox" 
                  defaultChecked 
                  disabled
                  className="h-4 w-4 rounded border-slate-800 bg-slate-900 text-indigo-500 focus:ring-0 mt-0.5 accent-indigo-500" 
                />
                <div className="flex flex-col">
                  <span className="text-xs text-slate-300 font-bold leading-tight">Configure Frankfurt Sync Nodes</span>
                  <p className="text-[10px] text-slate-500 mt-0.5">CTO to initiate database read-replicas cluster deployment to resolve the latency bottleneck.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <input 
                  type="checkbox" 
                  defaultChecked 
                  disabled
                  className="h-4 w-4 rounded border-slate-800 bg-slate-900 text-indigo-500 focus:ring-0 mt-0.5 accent-indigo-500" 
                />
                <div className="flex flex-col">
                  <span className="text-xs text-slate-300 font-bold leading-tight">Amortize R&D Capital Reserve</span>
                  <p className="text-[10px] text-slate-500 mt-0.5">CFO to transfer €8K from latent R&D capital arrays to fund initial edge cluster server overhead.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <input 
                  type="checkbox" 
                  className="h-4 w-4 rounded border-slate-850 bg-slate-900 text-indigo-500 focus:ring-0 mt-0.5 accent-indigo-500 cursor-pointer" 
                />
                <div className="flex flex-col">
                  <span className="text-xs text-slate-300 font-bold leading-tight">Initiate Closed Pilot onboarding</span>
                  <p className="text-[10px] text-slate-550 mt-0.5">CPO/CMO to onboard initial 14 DACH pilot accounts under GDPR data-consent transparency gates.</p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Right Column (1/3 width) - Confidence, Votes, Blind Spot */}
        <div className="lg:col-span-4 flex flex-col gap-8">
          
          {/* 4. Confidence Index (Circular Gauge) */}
          <motion.div variants={itemVariants} className="flex flex-col gap-2">
            <span className="text-[10px] uppercase font-mono font-bold text-slate-500">
              Confidence Index
            </span>
            <div className="rounded-2xl border border-slate-900 bg-slate-950/40 p-4.5 flex flex-col items-center justify-center text-center relative overflow-hidden">
              <div className="relative h-28 w-28 flex items-center justify-center mb-2">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="40" 
                    stroke="rgba(255,255,255,0.02)" 
                    strokeWidth="8" 
                    fill="transparent" 
                  />
                  <motion.circle 
                    cx="50" 
                    cy="50" 
                    r="40" 
                    stroke="url(#indigoGrad2)" 
                    strokeWidth="8" 
                    fill="transparent" 
                    strokeDasharray="251.2"
                    initial={{ strokeDashoffset: 251.2 }}
                    animate={{ strokeDashoffset: 251.2 - (251.2 * 89) / 100 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                  <defs>
                    <linearGradient id="indigoGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#6366f1" />
                      <stop offset="100%" stopColor="#a855f7" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute flex flex-col items-center justify-center">
                  <span className="text-2xl font-black font-mono text-white leading-none">89%</span>
                  <span className="text-[8px] uppercase tracking-wider font-mono text-slate-500 mt-1 font-bold">Consensus</span>
                </div>
              </div>
              <p className="text-[10px] text-slate-500 leading-normal max-w-[190px]">
                Low variance. Agents reached high alignment on operational parameters.
              </p>
            </div>
          </motion.div>

          {/* 5. Board Votes Tally */}
          <motion.div variants={itemVariants} className="flex flex-col gap-2">
            <span className="text-[10px] uppercase font-mono font-bold text-slate-500">
              Board Votes Tally
            </span>
            <div className="rounded-2xl border border-slate-900 bg-slate-950/40 p-4.5 flex flex-col gap-2.5 text-xs font-mono">
              <div className="flex justify-between items-center text-[10px] text-slate-500 border-b border-slate-900/60 pb-1.5 font-bold">
                <span>EXECUTIVE NODE</span>
                <span>VOTE</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">CEO Jenkins</span>
                <span className="text-emerald-400 font-bold">YES</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">CFO Wright</span>
                <span className="text-emerald-400 font-bold">YES</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">CTO Thorne</span>
                <span className="text-amber-400 font-bold">CONDITIONAL</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">CMO Novak</span>
                <span className="text-emerald-400 font-bold">YES</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">CPO Rostova</span>
                <span className="text-emerald-400 font-bold">YES</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">CRO Vance</span>
                <span className="text-rose-400 font-bold">NO</span>
              </div>
            </div>
          </motion.div>

          {/* 6. Blind Spot */}
          <motion.div variants={itemVariants} className="flex flex-col gap-2">
            <span className="text-[10px] uppercase font-mono font-bold text-slate-500 flex items-center gap-1">
              <ShieldAlert className="h-4 w-4 text-indigo-400" />
              Strategic Blind Spot
            </span>
            <div className="rounded-2xl border border-indigo-500/20 bg-indigo-950/10 p-4.5">
              <p className="text-[10px] text-slate-300 leading-relaxed font-sans">
                **Defensive Moat Risk**: Frankfurt edge nodes address latency, but do not protect against competitor duplication. Competitors replicating this setup within 6 months could prompt pricing compression.
              </p>
            </div>
          </motion.div>

        </div>

      </motion.div>

      {/* Report Footer actions */}
      <div className="mt-10 pt-5 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        <div className="flex items-center gap-2 text-[10px] text-slate-500 font-mono text-left">
          <Scale className="h-4 w-4 text-indigo-400/80" />
          <span>Swarm compliance lock validated. Strategist audit signature registered.</span>
        </div>

        <button
          type="button"
          onClick={() => alert("Consensus Memorandum downloaded. (Hashed copy registered to IPFS)")}
          className="group flex items-center justify-center gap-2 rounded-xl border border-slate-800 hover:border-slate-700 bg-slate-950 hover:bg-slate-900 px-5 py-2.5 text-xs font-bold text-slate-300 hover:text-white transition-all cursor-pointer w-full sm:w-auto"
        >
          <Download className="h-4 w-4 text-indigo-400" />
          Export Memo
        </button>

      </div>

    </div>
  );
}
