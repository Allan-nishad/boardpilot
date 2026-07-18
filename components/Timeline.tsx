"use client";

import { motion } from "framer-motion";
import { Terminal, ShieldAlert } from "lucide-react";
import { MOCK_TIMELINE_EVENTS } from "@/lib/mockData";

export default function Timeline() {
  
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 10 },
    show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <div className="w-full bg-glass rounded-3xl p-5 shadow-2xl border border-slate-900 text-left">
      
      {/* Sidebar Header */}
      <div className="flex items-center gap-2 pb-3.5 border-b border-slate-900 mb-5">
        <Terminal className="h-4.5 w-4.5 text-indigo-400" />
        <div>
          <h3 className="text-xs uppercase font-mono font-bold text-slate-400 tracking-wider">
            Swarm Debate Log
          </h3>
          <p className="text-[10px] text-slate-500">Chronological agent telemetry</p>
        </div>
      </div>

      {/* Logs Flow list */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="flex flex-col gap-4 relative pl-4 border-l border-slate-900"
      >
        {MOCK_TIMELINE_EVENTS.map((event, idx) => (
          <motion.div
            key={event.id}
            variants={itemVariants}
            className="relative flex flex-col gap-1.5"
          >
            {/* Timeline connection bullet */}
            <div className="absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full border border-slate-950 bg-slate-900 group-hover:bg-indigo-500 transition-colors" />

            {/* Event Timestamp and Tag */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[9px] font-mono text-slate-500">{event.time}</span>
              <span className={`text-[8px] font-mono font-bold px-2 py-0.5 rounded border ${event.tagColor}`}>
                {event.tag}
              </span>
            </div>

            {/* Event Content card */}
            <div className="bg-slate-950/20 hover:bg-slate-950/40 border border-slate-900 rounded-xl p-3 flex gap-2.5 items-start transition-all">
              <div className="h-6 w-6 rounded-lg bg-slate-900 flex items-center justify-center text-sm flex-shrink-0 border border-slate-850">
                {event.avatar}
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] font-bold text-white leading-tight">
                  {event.name}
                </span>
                <p className="text-[10px] text-slate-450 leading-relaxed font-sans mt-1">
                  {event.message}
                </p>
              </div>
            </div>

          </motion.div>
        ))}
      </motion.div>

      {/* Lock alert notice */}
      <div className="mt-5 pt-3 border-t border-slate-900/60 flex items-center gap-2 text-[9px] text-slate-650 font-mono">
        <ShieldAlert className="h-3.5 w-3.5 text-indigo-500/40" />
        <span>Telemetry channel encryption locked. SHA256 verified.</span>
      </div>

    </div>
  );
}
