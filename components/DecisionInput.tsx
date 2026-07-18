"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Zap, 
  ShieldCheck, 
  Lock, 
  UploadCloud, 
  FileText, 
  Trash2, 
  Sparkles,
  ArrowRight,
  Loader2,
  Users,
  Compass,
  AlertCircle
} from "lucide-react";

interface UploadedFile {
  id: string;
  name: string;
  size: string;
  progress: number;
  type: string;
}

export default function DecisionInput() {
  const router = useRouter();
  const [decision, setDecision] = useState("");
  const [risk, setRisk] = useState<"aggressive" | "balanced" | "conservative">("balanced");
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Suggested prompt templates for founders
  const templates = [
    "Should we deprecate the legacy on-premise tier and shift enterprise accounts to SaaS, risking 5% immediate churn for 25% higher ACV?",
    "Should we expand our engineering spend by 18% in Q3 to accelerate the AI core modules, risking runway depletion if sales fail to scale?",
    "Should we switch from flat subscription pricing to a strict credit-based usage model next month to capture developer market share?"
  ];

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const simulateFileUpload = (fileList: FileList) => {
    const newFiles = Array.from(fileList).map((file) => {
      const id = Math.random().toString(36).substring(7);
      
      // Simulate upload progress
      let progress = 0;
      const interval = setInterval(() => {
        setFiles((prev) => 
          prev.map((f) => {
            if (f.id === id) {
              if (f.progress >= 100) {
                clearInterval(interval);
                return { ...f, progress: 100 };
              }
              return { ...f, progress: f.progress + 20 };
            }
            return f;
          })
        );
      }, 200);

      return {
        id,
        name: file.name,
        size: (file.size / 1024 / 1024).toFixed(2) + " MB",
        progress: 0,
        type: file.name.split(".").pop() || "txt"
      };
    });

    setFiles((prev) => [...prev, ...newFiles]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      simulateFileUpload(e.dataTransfer.files);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      simulateFileUpload(e.target.files);
    }
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  // Simulate AI Board Assembly sequence
  const startAnalysis = () => {
    if (!decision.trim()) return;
    setIsAnalyzing(true);
    setAnalysisStep(0);

    const steps = [
      "Establishing connection to OpenSwarm clusters...",
      "Assembling AI Executive board: Sarah (CEO), Thomas (CFO), Aris (CTO), Clara (CMO)...",
      "Injecting Decision Scope parameters into Executive agent context windows...",
      "CTO initiating system architecture risk audit...",
      "CFO running unit economic Cash Flow Runway projections...",
      "CMO evaluating marketing acquisition models & competitor churn offsets...",
      "Consensus protocols locked. Launching active Boardroom debate!"
    ];

    let current = 0;
    const interval = setInterval(() => {
      current++;
      if (current >= steps.length) {
        clearInterval(interval);
        setTimeout(() => {
          setIsAnalyzing(false);
          if (typeof window !== "undefined") {
            window.localStorage.setItem("boardpilot_decision", decision);
            window.localStorage.setItem("boardpilot_risk", risk);
          }
          router.push("/dashboard");
        }, 800);
      } else {
        setAnalysisStep(current);
      }
    }, 1500);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto text-left">
      
      {/* Interactive Swarm Assembly Loading Modal */}
      <AnimatePresence>
        {isAnalyzing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-md bg-slate-950 border border-slate-900 rounded-3xl p-8 flex flex-col items-center text-center shadow-2xl relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-radial-glow opacity-50 pointer-events-none" />

              <div className="relative h-16 w-16 items-center justify-center flex mb-6">
                <Loader2 className="h-12 w-12 text-indigo-500 animate-spin absolute" />
                <Users className="h-6 w-6 text-indigo-300" />
              </div>

              <h3 className="text-lg font-bold text-white font-mono uppercase tracking-wider">Assembling Boardroom</h3>
              <p className="text-xs text-slate-500 mt-1">Multi-Agent Swarm Integration</p>

              {/* Progress steps */}
              <div className="mt-8 w-full bg-slate-900 border border-slate-800 rounded-xl p-4 min-h-[90px] flex items-center justify-center relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={analysisStep}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="text-xs text-slate-300 leading-relaxed font-mono"
                  >
                    {analysisStep === 0 && "Establishing connection to OpenSwarm clusters..."}
                    {analysisStep === 1 && "Assembling AI Executive board: Sarah (CEO), Thomas (CFO), Aris (CTO), Clara (CMO)..."}
                    {analysisStep === 2 && "Injecting Decision Scope parameters into Executive agent context windows..."}
                    {analysisStep === 3 && "CTO initiating system architecture risk audit..."}
                    {analysisStep === 4 && "CFO running unit economic Cash Flow Runway projections..."}
                    {analysisStep === 5 && "CMO evaluating marketing acquisition models & competitor churn offsets..."}
                    {analysisStep === 6 && "Consensus protocols locked. Launching active Boardroom debate!"}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Loader bars */}
              <div className="w-full mt-6 h-1 bg-slate-900 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                  initial={{ width: "0%" }}
                  animate={{ width: `${((analysisStep + 1) / 7) * 100}%` }}
                  transition={{ duration: 1.5 }}
                />
              </div>

              <span className="text-[10px] font-mono text-slate-600 mt-4 uppercase">
                Step {analysisStep + 1} of 7 • Running Consensus Engine
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-glass rounded-3xl p-6 md:p-8 shadow-2xl relative border border-slate-900">
        
        {/* Card background decoration */}
        <div className="absolute top-0 right-0 h-40 w-40 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="flex items-center gap-3 border-b border-slate-900 pb-5 mb-6">
          <div className="h-8 w-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <Sparkles className="h-4.5 w-4.5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Create Strategic Proposal</h2>
            <p className="text-xs text-slate-500">Formulate your decision statement for the executive swarm to debate.</p>
          </div>
        </div>

        {/* 1. Decision Scope Textarea */}
        <div className="flex flex-col gap-2 mb-6">
          <div className="flex justify-between items-center">
            <label className="text-xs font-bold font-mono uppercase tracking-wider text-slate-400">
              1. Decision Scope Statement
            </label>
            <span className="text-[10px] text-slate-600 font-mono">Min 20 characters recommended</span>
          </div>

          <textarea
            value={decision}
            onChange={(e) => setDecision(e.target.value)}
            placeholder="Describe the decision or dilemma in detail. Include what is at stake, costs, and timeline..."
            className="w-full min-h-[140px] bg-slate-950/60 border border-slate-900 rounded-2xl p-4 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-y leading-relaxed"
          />

          {/* Quick template suggestions */}
          <div className="mt-2.5">
            <span className="text-[10px] font-mono text-slate-600 uppercase block mb-1.5">Or use a template:</span>
            <div className="flex flex-col gap-1.5">
              {templates.map((tpl, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setDecision(tpl)}
                  className="text-left text-[11px] text-slate-400 hover:text-indigo-300 hover:bg-indigo-950/20 border border-slate-900/50 hover:border-indigo-500/20 rounded-lg py-1.5 px-3 bg-slate-950/30 transition-all font-sans leading-snug cursor-pointer"
                >
                  {tpl}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 2. Board Risk Tolerance Selector */}
        <div className="flex flex-col gap-3 mb-6">
          <label className="text-xs font-bold font-mono uppercase tracking-wider text-slate-400">
            2. Board Alignment Risk Tolerance
          </label>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* AGGRESSIVE CARD */}
            <button
              type="button"
              onClick={() => setRisk("aggressive")}
              className={`text-left rounded-2xl border p-4 transition-all duration-200 relative overflow-hidden group flex flex-col justify-between cursor-pointer min-h-[150px] ${
                risk === "aggressive" 
                  ? "border-indigo-500 bg-indigo-950/15" 
                  : "border-slate-900 bg-slate-950/30 hover:border-slate-800"
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <div className={`h-8 w-8 rounded-lg flex items-center justify-center border transition-all ${
                  risk === "aggressive" 
                    ? "bg-indigo-500/10 border-indigo-500/30 text-indigo-400" 
                    : "bg-slate-900 border-slate-800 text-slate-500 group-hover:text-slate-400"
                }`}>
                  <Zap className="h-4.5 w-4.5" />
                </div>
                {risk === "aggressive" && (
                  <span className="h-2 w-2 rounded-full bg-indigo-500 shadow shadow-indigo-500" />
                )}
              </div>
              <div className="mt-4">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Aggressive</h4>
                <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">
                  Prioritize raw speed & market share. Accept higher burn rates, infrastructural capacity risk, and low safety thresholds.
                </p>
              </div>
            </button>

            {/* BALANCED CARD */}
            <button
              type="button"
              onClick={() => setRisk("balanced")}
              className={`text-left rounded-2xl border p-4 transition-all duration-200 relative overflow-hidden group flex flex-col justify-between cursor-pointer min-h-[150px] ${
                risk === "balanced" 
                  ? "border-emerald-500 bg-emerald-950/15" 
                  : "border-slate-900 bg-slate-950/30 hover:border-slate-800"
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <div className={`h-8 w-8 rounded-lg flex items-center justify-center border transition-all ${
                  risk === "balanced" 
                    ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" 
                    : "bg-slate-900 border-slate-800 text-slate-500 group-hover:text-slate-400"
                }`}>
                  <Compass className="h-4.5 w-4.5" />
                </div>
                {risk === "balanced" && (
                  <span className="h-2 w-2 rounded-full bg-emerald-500 shadow shadow-emerald-500" />
                )}
              </div>
              <div className="mt-4">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Balanced</h4>
                <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">
                  Optimize for sustained expansion. Balance cash runway with growth margins. Recalculate options based on validated CAC feedback.
                </p>
              </div>
            </button>

            {/* CONSERVATIVE CARD */}
            <button
              type="button"
              onClick={() => setRisk("conservative")}
              className={`text-left rounded-2xl border p-4 transition-all duration-200 relative overflow-hidden group flex flex-col justify-between cursor-pointer min-h-[150px] ${
                risk === "conservative" 
                  ? "border-amber-500 bg-amber-950/15" 
                  : "border-slate-900 bg-slate-950/30 hover:border-slate-800"
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <div className={`h-8 w-8 rounded-lg flex items-center justify-center border transition-all ${
                  risk === "conservative" 
                    ? "bg-amber-500/10 border-amber-500/30 text-amber-400" 
                    : "bg-slate-900 border-slate-800 text-slate-500 group-hover:text-slate-400"
                }`}>
                  <Lock className="h-4.5 w-4.5" />
                </div>
                {risk === "conservative" && (
                  <span className="h-2 w-2 rounded-full bg-amber-500 shadow shadow-amber-500" />
                )}
              </div>
              <div className="mt-4">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Conservative</h4>
                <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">
                  Protect cash reserves and current ARR. Avoid capital expenditure spikes, prioritize net profitability and runway longevity.
                </p>
              </div>
            </button>

          </div>
        </div>

        {/* 3. Optional Evidence Upload */}
        <div className="flex flex-col gap-2 mb-8">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold font-mono uppercase tracking-wider text-slate-400">
              3. Evidence Artifacts (Optional)
            </label>
            <span className="text-[10px] text-slate-600 font-mono">PDF, CSV, XLSX or TXT (Max 5MB)</span>
          </div>

          {/* Upload Drop Zone */}
          <div
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border border-dashed rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition-all duration-200 ${
              dragActive 
                ? "border-indigo-500 bg-indigo-500/5" 
                : "border-slate-900 bg-slate-950/20 hover:border-slate-800 hover:bg-slate-950/40"
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              onChange={handleFileSelect}
              accept=".pdf,.csv,.xlsx,.xls,.txt,.doc,.docx"
              className="hidden"
            />
            <UploadCloud className="h-8 w-8 text-slate-500 mb-2" />
            <p className="text-xs text-slate-300 font-medium text-center">
              Drag and drop files here, or <span className="text-indigo-400">browse files</span>
            </p>
            <p className="text-[10px] text-slate-600 mt-1">Upload metrics sheets, competitor pricing, or pitch decks</p>
          </div>

          {/* Uploaded Files list */}
          {files.length > 0 && (
            <div className="mt-3 flex flex-col gap-2">
              <AnimatePresence>
                {files.map((file) => (
                  <motion.div
                    key={file.id}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex items-center justify-between bg-slate-950/80 border border-slate-900 rounded-xl p-3"
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="h-8 w-8 rounded-lg bg-slate-900 flex items-center justify-center text-slate-400 border border-slate-800 flex-shrink-0">
                        <FileText className="h-4.5 w-4.5 text-indigo-400" />
                      </div>
                      <div className="flex flex-col gap-0.5 overflow-hidden">
                        <span className="text-xs text-slate-200 font-bold truncate max-w-[200px] md:max-w-[400px]">
                          {file.name}
                        </span>
                        <span className="text-[9px] text-slate-600 font-mono">
                          {file.size} • {file.type.toUpperCase()}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {file.progress < 100 ? (
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono text-slate-500">{file.progress}%</span>
                          <div className="h-1.5 w-12 bg-slate-900 rounded-full overflow-hidden">
                            <div className="h-full bg-indigo-500" style={{ width: `${file.progress}%` }} />
                          </div>
                        </div>
                      ) : (
                        <span className="text-[9px] uppercase font-bold bg-emerald-500/10 text-emerald-400 px-2 py-0.5 border border-emerald-500/10 rounded font-mono">
                          Attached
                        </span>
                      )}

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFile(file.id);
                        }}
                        className="h-7 w-7 rounded-lg hover:bg-slate-900 flex items-center justify-center text-slate-500 hover:text-rose-400 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Submit Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-900">
          
          <div className="flex items-start gap-2.5 text-slate-500 max-w-sm sm:max-w-md text-left">
            <AlertCircle className="h-4.5 w-4.5 text-indigo-500/60 mt-0.5 flex-shrink-0" />
            <p className="text-[10px] md:text-[11px] leading-relaxed">
              Assembling the board consumes API credit weights. The agents will draft a debate consensus matrix and register files as context before voting.
            </p>
          </div>

          <button
            type="button"
            onClick={startAnalysis}
            disabled={!decision.trim()}
            className="group relative flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 disabled:from-slate-900 disabled:to-slate-900 disabled:border disabled:border-slate-800 disabled:text-slate-600 border border-transparent hover:from-indigo-600 hover:to-purple-700 px-8 py-3.5 text-xs font-bold text-white shadow-lg disabled:shadow-none hover:shadow-indigo-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto cursor-pointer disabled:cursor-not-allowed"
          >
            Analyze Decision
            <ArrowRight className="h-4 w-4 transform group-hover:translate-x-0.5 transition-transform" />
            {decision.trim() && (
              <div className="absolute -inset-0.5 rounded-xl bg-indigo-500 opacity-0 blur-md group-hover:opacity-40 transition-opacity -z-10" />
            )}
          </button>

        </div>

      </div>
    </div>
  );
}
