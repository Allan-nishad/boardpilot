"use client";

import Navbar from "./Navbar";
import Hero from "./Hero";
import { 
  GitMerge, 
  MessageSquareDiff, 
  BarChart3, 
  Scale, 
  ChevronRight
} from "lucide-react";
import { motion } from "framer-motion";

export default function Landing() {
  const features = [
    {
      icon: GitMerge,
      title: "Consensus Swarm Engine",
      description: "Agents don't just reply; they negotiate. Our swarm protocols debate scenario tradeoffs until reaching a strict 85%+ consensus threshold.",
      color: "text-indigo-400",
      borderColor: "hover:border-indigo-500/30"
    },
    {
      icon: MessageSquareDiff,
      title: "Granular Audit Trail",
      description: "Read through direct agent dialogue transcripts. Inspect why the CTO clashed with the CMO, and see how the CFO resolved the budget deficit.",
      color: "text-purple-400",
      borderColor: "hover:border-purple-500/30"
    },
    {
      icon: BarChart3,
      title: "Unit Economic Modeling",
      description: "Connect your core runway metrics. The CFO Agent builds automated mathematical models evaluating gross margins, burn rates, and LTV/CAC ratios.",
      color: "text-cyan-400",
      borderColor: "hover:border-cyan-500/30"
    },
    {
      icon: Scale,
      title: "Risk Hedging Protocols",
      description: "Input any critical strategy—from global expansions to pricing restructuring. The swarm evaluates localized compliance, infrastructure, and user churn hazards.",
      color: "text-emerald-400",
      borderColor: "hover:border-emerald-500/30"
    }
  ];

  return (
    <div className="min-h-screen bg-board-dark text-slate-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow">
        <Hero />

        {/* Feature Highlights Section */}
        <section id="methodology" className="relative py-24 border-t border-slate-900/60 bg-board-dark-gray/30">
          <div className="absolute inset-0 z-0 bg-dot-pattern pointer-events-none" />
          
          <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs uppercase font-mono font-bold tracking-widest text-indigo-400">
                Swarm Architecture
              </span>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mt-3">
                Decide with Certainty. Supported by Autonomous Executives.
              </h2>
              <p className="mt-4 text-slate-400 text-sm md:text-base">
                BoardPilot replaces generic LLM chats with an executive war room simulation. 
                Agents debate constraints, allocate capital, and challenge proposals before reaching consensus.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {features.map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className={`group bg-glass p-8 rounded-3xl transition-all duration-300 ${feature.borderColor} hover:bg-slate-950/70 hover:shadow-xl hover:shadow-indigo-500/5 cursor-default`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center transition-transform group-hover:scale-105">
                        <Icon className={`h-5 w-5 ${feature.color}`} />
                      </div>
                      <h3 className="text-base font-bold text-white group-hover:text-indigo-200 transition-colors">
                        {feature.title}
                      </h3>
                    </div>
                    <p className="mt-4 text-xs md:text-sm text-slate-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Dynamic Methodology Banner */}
        <section id="intelligence" className="relative py-20 border-t border-slate-900/60 overflow-hidden">
          <div className="mx-auto max-w-5xl px-4 md:px-8">
            <div className="rounded-3xl bg-gradient-to-r from-indigo-950/20 to-purple-950/20 border border-slate-900 p-8 md:p-12 relative flex flex-col md:flex-row items-center gap-8 justify-between">
              
              <div className="flex flex-col max-w-xl text-left">
                <span className="text-[10px] font-mono font-bold text-indigo-400 uppercase tracking-wider">
                  Engineered Integrity
                </span>
                <h3 className="text-xl md:text-2xl font-bold text-white mt-2">
                  Not a Chatbot. A Consensus Engine.
                </h3>
                <p className="text-xs md:text-sm text-slate-400 mt-3 leading-relaxed">
                  We built BoardPilot specifically to resolve LLM sycophancy. Instead of agreeing blindly, 
                  our multi-agent board actively queries metrics, flags vulnerabilities, and drafts counter-memos 
                  to reveal blind spots in your business thesis.
                </p>
              </div>

              <div className="flex-shrink-0">
                <a
                  href="/decision"
                  className="group relative inline-flex items-center gap-2 rounded-full bg-slate-950 border border-slate-800 hover:border-indigo-500/40 px-6 py-3.5 text-xs font-bold text-slate-200 hover:text-white transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  Configure Board Setup
                  <ChevronRight className="h-4 w-4 transform group-hover:translate-x-0.5 transition-transform text-indigo-400" />
                </a>
              </div>

            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-900/60 bg-board-dark py-12 relative z-10">
        <div className="mx-auto max-w-7xl px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded bg-indigo-500 flex items-center justify-center">
              <svg
                className="h-3.5 w-3.5 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <polygon points="12 2 2 7 12 12 22 7 12 2" />
                <polyline points="2 17 12 22 22 17" />
              </svg>
            </div>
            <span className="text-xs font-bold tracking-tight text-white font-mono">
              BOARD<span className="text-indigo-400">PILOT</span>
            </span>
          </div>

          <div className="flex gap-6 text-[11px] font-mono text-slate-500">
            <a href="#" className="hover:text-slate-300 transition-colors">Terminals</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Protocols</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Security</a>
            <a href="#" className="hover:text-slate-300 transition-colors">OpenSwarm Integration</a>
          </div>

          <p className="text-[11px] font-mono text-slate-600">
            &copy; 2026 BoardPilot Inc. Think Like a Board. Decide Like a Founder.
          </p>
        </div>
      </footer>
    </div>
  );
}
