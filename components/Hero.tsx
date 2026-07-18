"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, 
  Play, 
  ShieldCheck, 
  TrendingUp, 
  Terminal, 
  Sparkles, 
  Scale, 
  Users, 
  ChevronRight
} from "lucide-react";

// Mock Board debate cycle data
interface Dialogue {
  id: number;
  agent: "CEO" | "CFO" | "CTO" | "CMO";
  name: string;
  avatar: string;
  color: string;
  message: string;
}

const DEBATE_STREAM: Dialogue[] = [
  {
    id: 1,
    agent: "CEO",
    name: "Sarah Jenkins",
    avatar: "💼",
    color: "from-blue-500 to-indigo-500",
    message: "Initiating proposal review: Expand SaaS operations to European region in Q3.",
  },
  {
    id: 2,
    agent: "CTO",
    name: "Dr. Aris Thorne",
    avatar: "🤖",
    color: "from-cyan-400 to-teal-500",
    message: "Compliance audit: EU database hosting requires GDPR-compliant local replica nodes. Adds 150ms sync latency.",
  },
  {
    id: 3,
    agent: "CFO",
    name: "Thomas Wright",
    avatar: "📈",
    color: "from-amber-500 to-orange-600",
    message: "Capital overhead will rise by €14.5K/month. Projected NPV remains positive at 2.4x target return.",
  },
  {
    id: 4,
    agent: "CMO",
    name: "Clara Novak",
    avatar: "🎯",
    color: "from-purple-500 to-pink-500",
    message: "EU customer acquisition costs are 12% lower than US. LATAM expansion should be deferred.",
  },
  {
    id: 5,
    agent: "CTO",
    name: "Dr. Aris Thorne",
    avatar: "🤖",
    color: "from-cyan-400 to-teal-500",
    message: "Proposed fix: Deploy Edge-clusters in Frankfurt to bypass database roundtrips. Latency drops to <25ms.",
  },
  {
    id: 6,
    agent: "CFO",
    name: "Thomas Wright",
    avatar: "📈",
    color: "from-amber-500 to-orange-600",
    message: "Adjusting budget allocation: Sourcing €8K from latent R&D reserves. Net impact within safety thresholds.",
  },
  {
    id: 7,
    agent: "CEO",
    name: "Sarah Jenkins",
    avatar: "💼",
    color: "from-blue-500 to-indigo-500",
    message: "All parameters aligned. consensus updated to 94%. Locking strategy for final founder signature.",
  }
];

export default function Hero() {
  const [activeSpeechIdx, setActiveSpeechIdx] = useState(0);
  const [consensusScore, setConsensusScore] = useState(65);
  const [dialogueLog, setDialogueLog] = useState<Dialogue[]>([DEBATE_STREAM[0]]);

  // Cycle through board debate statements
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSpeechIdx((prev) => {
        const nextIdx = (prev + 1) % DEBATE_STREAM.length;
        
        // Append dialogue to scroll logs, cap at 4 items
        setDialogueLog((prevLog) => {
          const updated = [...prevLog, DEBATE_STREAM[nextIdx]];
          if (updated.length > 3) updated.shift();
          return updated;
        });

        // Adjust consensus score based on the debate step
        if (nextIdx === 0) setConsensusScore(65);
        else if (nextIdx === DEBATE_STREAM.length - 1) setConsensusScore(94);
        else setConsensusScore((p) => Math.min(92, p + Math.floor(Math.random() * 8) + 2));

        return nextIdx;
      });
    }, 5500);

    return () => clearInterval(interval);
  }, []);

  const activeSpeaker = DEBATE_STREAM[activeSpeechIdx];

  // Helper to check if a specific agent is speaking
  const isSpeaking = (agent: string) => activeSpeaker.agent === agent;

  return (
    <section className="relative overflow-hidden pt-32 pb-24 md:pt-40 md:pb-36 bg-grid-pattern">
      {/* Background gradients and glowing orbs */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-indigo-900/10 blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 h-[350px] w-[350px] rounded-full bg-purple-950/15 blur-[90px] pointer-events-none animate-pulse-ring" />
        <div className="absolute bottom-10 right-10 h-[400px] w-[400px] rounded-full bg-blue-950/10 blur-[100px] pointer-events-none" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8 flex flex-col items-center">
        
        {/* Top Announcement Pill */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-950/20 px-3.5 py-1.5 text-xs font-semibold text-indigo-300 backdrop-blur-md mb-8 hover:border-indigo-500/40 transition-colors"
        >
          <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
          <span>Introducing BoardPilot 1.0</span>
          <span className="h-1 w-1 rounded-full bg-indigo-500" />
          <span className="text-slate-400 font-normal">AI Executive Swarm</span>
          <ChevronRight className="h-3 w-3 text-indigo-400" />
        </motion.div>

        {/* Headline / Tagline */}
        <div className="text-center max-w-4xl flex flex-col items-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl leading-tight"
          >
            Think Like a Board.
            <br />
            <span className="text-gradient-indigo">Decide Like a Founder.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-base text-slate-400 md:text-xl max-w-2xl leading-relaxed"
          >
            An AI Executive Board that analyzes, debates, and validates your biggest business decisions.
          </motion.p>
        </div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-sm sm:max-w-none"
        >
          <a
            href="/decision"
            className="group relative flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-indigo-500/25 hover:from-indigo-600 hover:to-purple-700 transition-all hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto"
          >
            Start Board Meeting
            <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
            <div className="absolute -inset-1 rounded-full bg-indigo-500 opacity-0 blur-md group-hover:opacity-40 transition-opacity -z-10" />
          </a>
          <a
            href="#demo"
            className="group flex items-center justify-center gap-2 rounded-full border border-slate-800 bg-slate-950/60 hover:bg-slate-900/50 backdrop-blur-md px-8 py-4 text-sm font-bold text-slate-300 hover:text-white transition-all hover:border-slate-700 active:scale-[0.98] w-full sm:w-auto"
          >
            <Play className="h-3.5 w-3.5 fill-slate-400 text-slate-400 group-hover:fill-white group-hover:text-white transition-colors" />
            Watch Demo
          </a>
        </motion.div>

        {/* Core Value Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 max-w-4xl text-center text-xs text-slate-500 font-semibold uppercase tracking-wider font-mono"
        >
          <div className="flex items-center gap-2 justify-center">
            <ShieldCheck className="h-4 w-4 text-indigo-500" />
            <span>Multi-Agent Swarm</span>
          </div>
          <div className="flex items-center gap-2 justify-center">
            <TrendingUp className="h-4 w-4 text-indigo-500" />
            <span>Runway Modeling</span>
          </div>
          <div className="flex items-center gap-2 justify-center">
            <Scale className="h-4 w-4 text-indigo-500" />
            <span>Consensus Engine</span>
          </div>
          <div className="flex items-center gap-2 justify-center">
            <Terminal className="h-4 w-4 text-indigo-500" />
            <span>Interactive Audit</span>
          </div>
        </motion.div>

        {/* Dashboard Preview - The Boardroom War Room */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 w-full max-w-5xl rounded-3xl bg-glass p-1 md:p-2 shadow-2xl relative"
        >
          {/* Glass dashboard frame header */}
          <div className="rounded-[22px] bg-board-dark-gray/90 border border-slate-900 overflow-hidden flex flex-col">
            
            {/* Workspace Header Tab */}
            <div className="flex items-center justify-between border-b border-slate-900 bg-board-dark px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-slate-800" />
                  <div className="h-3 w-3 rounded-full bg-slate-800" />
                  <div className="h-3 w-3 rounded-full bg-slate-800" />
                </div>
                <div className="h-4 w-px bg-slate-900 mx-1" />
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-indigo-400" />
                  <span className="text-xs font-bold text-slate-300 font-mono">WAR_ROOM // DECISION_matrix_v1</span>
                  <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-400 border border-emerald-500/15">
                    Live Debate
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-3 text-xs">
                <span className="text-slate-500 font-mono">Consensus Required:</span>
                <span className="font-bold text-slate-300 font-mono">85%</span>
              </div>
            </div>

            {/* Dashboard Contents Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[440px]">
              
              {/* Left Side: The Interactive Swarm Network */}
              <div className="col-span-1 lg:col-span-7 border-b lg:border-b-0 lg:border-r border-slate-900 p-8 flex flex-col justify-between relative overflow-hidden bg-radial-glow">
                
                <div className="absolute top-4 left-4 z-10 flex flex-col gap-1">
                  <span className="text-[10px] uppercase font-mono font-bold text-indigo-400">Swarm Layout</span>
                  <span className="text-xs text-slate-400">Collaborative Executive Swarm topology</span>
                </div>

                {/* Central consensus visual & nodes */}
                <div className="relative h-[280px] w-full flex items-center justify-center mt-6">
                  
                  <div className="absolute h-56 w-56 rounded-full border border-dashed border-indigo-500/20 animate-pulse-ring" />
                  <div className="absolute h-40 w-40 rounded-full border border-indigo-500/10" />

                  {/* SVG glowing cables connecting board members to the center */}
                  <svg className="absolute inset-0 h-full w-full pointer-events-none" viewBox="0 0 400 280">
                    <line x1="200" y1="50" x2="200" y2="140" 
                      stroke={isSpeaking("CEO") ? "#6366f1" : "#1e293b"} 
                      strokeWidth={isSpeaking("CEO") ? "3" : "1.5"} 
                      strokeDasharray={isSpeaking("CEO") ? "6,4" : "0"}
                      className="transition-all duration-500" 
                    />
                    <line x1="80" y1="140" x2="200" y2="140" 
                      stroke={isSpeaking("CTO") ? "#2dd4bf" : "#1e293b"} 
                      strokeWidth={isSpeaking("CTO") ? "3" : "1.5"} 
                      strokeDasharray={isSpeaking("CTO") ? "6,4" : "0"}
                      className="transition-all duration-500" 
                    />
                    <line x1="200" y1="230" x2="200" y2="140" 
                      stroke={isSpeaking("CFO") ? "#f59e0b" : "#1e293b"} 
                      strokeWidth={isSpeaking("CFO") ? "3" : "1.5"} 
                      strokeDasharray={isSpeaking("CFO") ? "6,4" : "0"}
                      className="transition-all duration-500" 
                    />
                    <line x1="320" y1="140" x2="200" y2="140" 
                      stroke={isSpeaking("CMO") ? "#ec4899" : "#1e293b"} 
                      strokeWidth={isSpeaking("CMO") ? "3" : "1.5"} 
                      strokeDasharray={isSpeaking("CMO") ? "6,4" : "0"}
                      className="transition-all duration-500" 
                    />
                  </svg>

                  {/* Central Consensus Gauge */}
                  <div className="absolute z-20 h-28 w-28 rounded-full bg-slate-950/90 border border-slate-800 shadow-2xl flex flex-col items-center justify-center transition-all duration-300 group hover:border-indigo-500/50">
                    <span className="text-[10px] uppercase font-semibold text-slate-500 font-mono tracking-wider">Consensus</span>
                    <span className="text-2xl font-black font-mono text-white mt-0.5">{consensusScore}%</span>
                    <span className="text-[9px] text-emerald-400 font-bold tracking-tight mt-0.5 flex items-center gap-0.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      {consensusScore >= 85 ? "Valid" : "Resolving"}
                    </span>
                  </div>

                  {/* CEO NODE (Top) */}
                  <div className={`absolute top-4 flex flex-col items-center transition-all duration-500 ${isSpeaking("CEO") ? "scale-110" : "opacity-80"}`}>
                    <div className={`h-12 w-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 p-0.5 shadow-lg ${isSpeaking("CEO") ? "ring-4 ring-indigo-500/20" : ""}`}>
                      <div className="h-full w-full rounded-full bg-slate-950 flex items-center justify-center text-lg">💼</div>
                    </div>
                    <span className="text-[10px] font-bold text-white mt-1.5">CEO Swarm</span>
                    <span className="text-[8px] text-indigo-400 font-semibold font-mono">Sarah</span>
                  </div>

                  {/* CTO NODE (Left) */}
                  <div className={`absolute left-4 flex flex-col items-center transition-all duration-500 ${isSpeaking("CTO") ? "scale-110" : "opacity-80"}`}>
                    <div className={`h-12 w-12 rounded-full bg-gradient-to-br from-cyan-400 to-teal-500 p-0.5 shadow-lg ${isSpeaking("CTO") ? "ring-4 ring-teal-500/20" : ""}`}>
                      <div className="h-full w-full rounded-full bg-slate-950 flex items-center justify-center text-lg">🤖</div>
                    </div>
                    <span className="text-[10px] font-bold text-white mt-1.5">CTO Agent</span>
                    <span className="text-[8px] text-cyan-400 font-semibold font-mono">Aris</span>
                  </div>

                  {/* CFO NODE (Bottom) */}
                  <div className={`absolute bottom-4 flex flex-col items-center transition-all duration-500 ${isSpeaking("CFO") ? "scale-110" : "opacity-80"}`}>
                    <div className={`h-12 w-12 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 p-0.5 shadow-lg ${isSpeaking("CFO") ? "ring-4 ring-amber-500/20" : ""}`}>
                      <div className="h-full w-full rounded-full bg-slate-950 flex items-center justify-center text-lg">📈</div>
                    </div>
                    <span className="text-[10px] font-bold text-white mt-1.5">CFO Agent</span>
                    <span className="text-[8px] text-amber-500 font-semibold font-mono">Thomas</span>
                  </div>

                  {/* CMO NODE (Right) */}
                  <div className={`absolute right-4 flex flex-col items-center transition-all duration-500 ${isSpeaking("CMO") ? "scale-110" : "opacity-80"}`}>
                    <div className={`h-12 w-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 p-0.5 shadow-lg ${isSpeaking("CMO") ? "ring-4 ring-pink-500/20" : ""}`}>
                      <div className="h-full w-full rounded-full bg-slate-950 flex items-center justify-center text-lg">🎯</div>
                    </div>
                    <span className="text-[10px] font-bold text-white mt-1.5">CMO Agent</span>
                    <span className="text-[8px] text-purple-400 font-semibold font-mono">Clara</span>
                  </div>

                </div>

                <div className="rounded-xl border border-slate-900 bg-slate-950/80 px-4 py-3 text-[11px] text-slate-400 flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-indigo-500" />
                  <span>The boardroom evaluates and cross-references feedback autonomously in background threads.</span>
                </div>

              </div>

              {/* Right Side: Active Board Debate Log */}
              <div className="col-span-1 lg:col-span-5 p-8 flex flex-col justify-between bg-slate-950/40">
                <div className="flex flex-col gap-5 h-full justify-between">
                  
                  <div className="rounded-xl border border-slate-900 bg-slate-950/80 p-4">
                    <span className="text-[10px] font-bold uppercase font-mono text-slate-500">Active Strategic Proposal</span>
                    <h3 className="text-sm font-bold text-white mt-1">EU Market Expansion & Latency Optimization</h3>
                    <div className="flex gap-2 mt-3">
                      <span className="text-[9px] bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded font-semibold font-mono">Runway: €380K</span>
                      <span className="text-[9px] bg-slate-900 text-slate-400 px-2 py-0.5 rounded font-semibold font-mono">Risk Level: Moderate</span>
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col justify-end gap-3.5 my-4 min-h-[190px]">
                    <span className="text-[9px] uppercase font-mono font-bold text-slate-500 tracking-wider flex items-center gap-1.5">
                      <Terminal className="h-3 w-3 text-indigo-400" /> Consensus Logs
                    </span>
                    
                    <div className="flex flex-col gap-3.5 overflow-hidden">
                      <AnimatePresence mode="popLayout">
                        {dialogueLog.map((log, index) => {
                          const isNewest = index === dialogueLog.length - 1;
                          return (
                            <motion.div
                              key={log.id + "-" + index}
                              initial={{ opacity: 0, x: 20, y: 10 }}
                              animate={{ opacity: isNewest ? 1 : 0.6, x: 0, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ duration: 0.4 }}
                              className={`flex gap-3 items-start p-3 rounded-lg border ${
                                isNewest ? "border-slate-800 bg-slate-950/80" : "border-slate-950/20 bg-transparent"
                              }`}
                            >
                              <div className={`h-7 w-7 rounded-lg bg-gradient-to-br ${log.color} flex items-center justify-center text-sm flex-shrink-0 shadow`}>
                                {log.avatar}
                              </div>
                              <div className="flex flex-col gap-0.5 overflow-hidden">
                                <div className="flex items-center gap-1.5">
                                  <span className="text-xs font-bold text-white leading-none">{log.name}</span>
                                  <span className="text-[9px] uppercase font-bold text-slate-500 font-mono leading-none">{log.agent}</span>
                                </div>
                                <p className="text-[11px] text-slate-300 leading-normal mt-1">{log.message}</p>
                              </div>
                            </motion.div>
                          );
                        })}
                      </AnimatePresence>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-2 border-t border-slate-900">
                    <span className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-indigo-500 animate-ping" />
                      Swarm Status: Running
                    </span>
                    <span>Consensus Score: {consensusScore}/100</span>
                  </div>

                </div>
              </div>

            </div>

          </div>
          
          <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 opacity-30 blur-md -z-10 pointer-events-none" />
        </motion.div>

      </div>
    </section>
  );
}
