'use client';

import React, { useState } from 'react';
import { useEduPath } from '../store/useEduPathStore';
import { Zap, CheckCircle2, RotateCcw, Activity, UserPlus, ChevronUp, ChevronDown, Sliders } from 'lucide-react';

export const DemoControlBar: React.FC = () => {
  const {
    simulateSqlStruggle,
    simulateTaskCompletion,
    resetDemo,
    isAgentDrawerOpen,
    setIsAgentDrawerOpen,
    setIsOnboardingOpen,
    bottleneckDetected
  } = useEduPath();

  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <aside
      aria-label="Demo Control Panel"
      className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-2 font-sans"
    >
      
      {isExpanded ? (
        <div className="bg-[#0b101e]/95 border border-indigo-500/40 rounded-2xl p-3 shadow-2xl backdrop-blur-md space-y-2.5 max-w-xs animate-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2 gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-[11px] font-bold text-slate-200 uppercase tracking-wider">
                Hackathon Demo Bar
              </span>
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-slate-400 hover:text-white p-0.5 rounded hover:bg-white/5 transition"
              title="Minimize Demo Bar"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-1.5 text-xs">
            
            <button
              onClick={simulateSqlStruggle}
              className={`w-full py-2 px-3 rounded-xl flex items-center justify-between font-bold text-xs transition border ${
                bottleneckDetected
                  ? 'bg-amber-500/20 border-amber-500/40 text-amber-300 hover:bg-amber-500/30'
                  : 'bg-rose-950/60 border-rose-500/40 text-rose-300 hover:bg-rose-900/60'
              }`}
            >
              <span className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-rose-400" />
                <span>Simulate SQL Struggle</span>
              </span>
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-black/40">
                WOW Moment
              </span>
            </button>

            
            <button
              onClick={() => simulateTaskCompletion()}
              className="w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-xs transition flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Simulate Task Done (+50 XP)</span>
            </button>

            
            <button
              onClick={() => setIsOnboardingOpen(true)}
              className="w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 font-medium text-xs transition flex items-center gap-1.5"
            >
              <UserPlus className="w-3.5 h-3.5 text-blue-400" />
              <span>Re-run Onboarding &amp; Resume</span>
            </button>

            
            <button
              onClick={() => setIsAgentDrawerOpen(!isAgentDrawerOpen)}
              className="w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 font-medium text-xs transition flex items-center justify-between"
            >
              <span className="flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-emerald-400" />
                <span>Inspect 9 AI Agents</span>
              </span>
              <span className="text-[10px] text-emerald-400 font-mono">Live</span>
            </button>

            {/* RESET DEMO */}
            <button
              onClick={resetDemo}
              className="w-full py-1.5 px-3 rounded-xl hover:bg-white/5 text-slate-400 hover:text-slate-200 text-[11px] font-medium transition flex items-center justify-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset to Clean Persona (Alex)</span>
            </button>
          </div>
        </div>
      ) : (
        /* MINIMIZED BUTTON */
        <button
          onClick={() => setIsExpanded(true)}
          className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-xl shadow-indigo-600/30 border border-indigo-400/40 transition"
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Demo Controls</span>
          <ChevronUp className="w-3.5 h-3.5" />
        </button>
      )}
    </aside>
  );
};
