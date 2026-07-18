"use client";

import { motion } from "framer-motion";
import { Cpu, Users, UserCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import DecisionInput from "@/components/DecisionInput";

export default function DecisionPage() {
  
  const boardMembers = [
    {
      name: "Sarah Jenkins",
      role: "CEO Swarm",
      avatar: "💼",
      status: "Awaiting Proposal",
      statusColor: "text-indigo-400 bg-indigo-500/10",
      description: "Aligns strategic choices with company mission, target velocity, and vision validation."
    },
    {
      name: "Thomas Wright",
      role: "CFO Agent",
      avatar: "📈",
      status: "Awaiting Metrics",
      statusColor: "text-amber-400 bg-amber-500/10",
      description: "Audits unit economic models, pricing offsets, runway impacts, and capital overhead."
    },
    {
      name: "Dr. Aris Thorne",
      role: "CTO Agent",
      avatar: "🤖",
      status: "Awaiting Tech Specs",
      statusColor: "text-cyan-400 bg-cyan-500/10",
      description: "Evaluates implementation scale bottlenecks, latency risk thresholds, and compliance constraints."
    },
    {
      name: "Clara Novak",
      role: "CMO Agent",
      avatar: "🎯",
      status: "Awaiting Market Scope",
      statusColor: "text-purple-400 bg-purple-500/10",
      description: "Evaluates customer churn margins, competitor positioning, and customer acquisition (CAC) viability."
    }
  ];

  return (
    <div className="min-h-screen bg-board-dark text-slate-100 flex flex-col font-sans bg-grid-pattern relative">
      
      {/* Premium Sticky Navigation */}
      <Navbar />

      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/4 h-[300px] w-[300px] rounded-full bg-indigo-900/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 h-[350px] w-[350px] rounded-full bg-purple-950/5 blur-[120px] pointer-events-none" />

      {/* Workspace Content Grid */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 md:px-6 pt-32 pb-16 grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        
        {/* Sidebar - Board Assembly Status */}
        <div className="lg:col-span-4 flex flex-col gap-6 lg:sticky lg:top-32 h-fit">
          
          <div className="rounded-3xl border border-slate-900 bg-glass p-5 flex flex-col gap-4">
            
            <div className="flex items-center gap-2 pb-3 border-b border-slate-900">
              <UserCheck className="h-4.5 w-4.5 text-indigo-400" />
              <h3 className="text-xs uppercase font-mono font-bold text-slate-400 tracking-wider">
                Executive Assembly
              </h3>
            </div>

            <div className="flex flex-col gap-4">
              {boardMembers.map((member) => (
                <div 
                  key={member.name}
                  className="group bg-slate-950/40 border border-slate-900/60 rounded-2xl p-4 transition-all duration-200 hover:border-slate-800"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="h-7.5 w-7.5 rounded-lg bg-slate-900 flex items-center justify-center border border-slate-850 text-md">
                        {member.avatar}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-white group-hover:text-indigo-200 transition-colors">
                          {member.name}
                        </span>
                        <span className="text-[9px] font-mono text-slate-500 uppercase font-semibold">
                          {member.role}
                        </span>
                      </div>
                    </div>
                    <span className={`text-[8px] font-mono font-bold px-2 py-0.5 rounded border border-slate-850/10 ${member.statusColor}`}>
                      {member.status}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 leading-normal mt-2.5">
                    {member.description}
                  </p>
                </div>
              ))}
            </div>

          </div>

          {/* Prompt Guidelines box */}
          <div className="rounded-2xl border border-dashed border-slate-800 bg-slate-950/20 p-4 flex gap-3 text-slate-500 items-start">
            <Cpu className="h-5 w-5 text-indigo-400/80 flex-shrink-0 mt-0.5" />
            <div className="flex flex-col gap-1 text-left">
              <span className="text-[10px] uppercase font-mono font-bold text-slate-400">Swarm Protocol</span>
              <p className="text-[10px] leading-relaxed">
                Provide financial projections or GDPR scope details. The agents cross-reference credentials and perform automated runway simulations before voting.
              </p>
            </div>
          </div>

        </div>

        {/* Main Panel - Decision Input Form */}
        <div className="lg:col-span-8">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <DecisionInput />
          </motion.div>
        </div>

      </main>

    </div>
  );
}
