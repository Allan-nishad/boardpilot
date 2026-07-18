"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, Cpu, Layout, HelpCircle, GitBranch } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Board Room", href: "#board-preview", icon: Layout },
    { name: "Methodology", href: "#methodology", icon: GitBranch },
    { name: "Intelligence", href: "#intelligence", icon: Cpu },
    { name: "Support", href: "#support", icon: HelpCircle },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 py-4 md:px-8">
      <nav className="mx-auto max-w-7xl rounded-full bg-glass bg-opacity-70 px-6 py-3.5 shadow-xl transition-all duration-300 hover:border-slate-800">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/20 transition-transform group-hover:scale-105">
              <div className="absolute inset-0.5 rounded-[10px] bg-slate-950 flex items-center justify-center">
                <svg
                  className="h-5 w-5 text-indigo-400 group-hover:text-indigo-300 transition-colors"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="12 2 2 7 12 12 22 7 12 2" />
                  <polyline points="2 17 12 22 22 17" />
                  <polyline points="2 12 12 17 22 12" />
                </svg>
              </div>
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 opacity-0 blur-sm group-hover:opacity-40 transition-opacity" />
            </div>
            <div className="flex flex-col">
              <span className="text-md font-bold tracking-tight text-white group-hover:text-indigo-200 transition-colors">
                Board<span className="text-indigo-400">Pilot</span>
              </span>
              <span className="text-[9px] uppercase tracking-wider text-slate-500 -mt-1 font-semibold font-mono">
                AI Executive Swarm
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1.5">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className="group relative flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors duration-200"
                >
                  <Icon className="h-3.5 w-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
                  {link.name}
                  {/* Subtle hover background pill */}
                  <span className="absolute inset-0 -z-10 rounded-full bg-slate-800/0 group-hover:bg-slate-800/40 transition-colors duration-200" />
                </a>
              );
            })}
          </div>

          {/* Call to Action Button */}
          <div className="hidden md:block">
            <a
              href="/decision"
              className="group relative inline-flex items-center justify-center gap-1.5 overflow-hidden rounded-full bg-slate-900 border border-slate-800 px-5 py-2 text-xs font-bold text-slate-200 shadow-md transition-all duration-200 hover:border-indigo-500/50 hover:text-white hover:shadow-indigo-500/10"
            >
              <span className="relative z-10 flex items-center gap-1">
                Enter Boardroom
                <ArrowUpRight className="h-3.5 w-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-800 bg-slate-900/50 text-slate-400 hover:text-white"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-20 left-4 right-4 z-40 rounded-3xl bg-glass-intense p-6 shadow-2xl md:hidden"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 rounded-xl p-3 text-sm font-semibold text-slate-300 hover:bg-slate-900/60 hover:text-white transition-colors"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 border border-slate-800">
                      <Icon className="h-4 w-4 text-indigo-400" />
                    </div>
                    {link.name}
                  </a>
                );
              })}
              <hr className="border-slate-800/80 my-1" />
              <a
                href="/decision"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 py-3.5 text-center text-sm font-bold text-white shadow-lg shadow-indigo-500/25 hover:from-indigo-600 hover:to-purple-700 transition-all"
              >
                Enter Boardroom
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
