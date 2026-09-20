'use client';

import React from 'react';
import { useEduPath } from '../store/useEduPathStore';
import { Activity, X, CheckCircle2, ShieldCheck } from 'lucide-react';

export const AgentActivityDrawer: React.FC = () => {
  const { isAgentDrawerOpen, setIsAgentDrawerOpen, agentRuns } = useEduPath();

  if (!isAgentDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-xl bg-[#0b101e] border-l border-slate-800 h-full p-6 flex flex-col shadow-2xl space-y-5 overflow-y-auto">
        
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white tracking-tight">AI Agent Swarm Inspector</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  9 Specialized Agents
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Live execution telemetry &amp; structured output validation logs.
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsAgentDrawerOpen(false)}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="p-3 rounded-xl bg-black/30 border border-slate-800">
            <span className="text-xs text-slate-400 block">Active Agents</span>
            <span className="text-lg font-bold text-emerald-400">9 / 9</span>
          </div>
          <div className="p-3 rounded-xl bg-black/30 border border-slate-800">
            <span className="text-xs text-slate-400 block">Avg Execution</span>
            <span className="text-lg font-bold text-blue-400">315ms</span>
          </div>
          <div className="p-3 rounded-xl bg-black/30 border border-slate-800">
            <span className="text-xs text-slate-400 block">Schema Integrity</span>
            <span className="text-lg font-bold text-purple-400">100% Zod</span>
          </div>
        </div>

        
        <div className="space-y-3 flex-1 overflow-y-auto pr-1">
          {agentRuns.map(run => (
            <div
              key={run.id}
              className="p-4 rounded-xl bg-slate-900/90 border border-slate-800/90 space-y-2 text-xs hover:border-slate-700 transition"
            >
              <div className="flex items-center justify-between border-b border-slate-800/60 pb-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="font-bold text-white text-xs">{run.agentName}</span>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono">
                  <span>{run.durationMs}ms</span>
                  <span>&bull;</span>
                  <span>{run.timestamp}</span>
                </div>
              </div>

              
              <div className="space-y-0.5">
                <span className="text-[10px] uppercase font-bold text-slate-500">Input Telemetry:</span>
                <p className="text-slate-300 font-mono text-[11px] leading-snug">{run.inputSummary}</p>
              </div>

              
              <div className="space-y-0.5">
                <span className="text-[10px] uppercase font-bold text-emerald-400">Structured Output:</span>
                <p className="text-emerald-300/90 font-mono text-[11px] leading-snug">{run.outputSummary}</p>
              </div>

              <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-800/40">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-blue-400" /> Output Schema Validated
                </span>
                <span>Confidence: <strong>{Math.round(run.confidence * 100)}%</strong></span>
              </div>
            </div>
          ))}
        </div>

        
        <div className="pt-2 border-t border-slate-800 text-center">
          <button
            onClick={() => setIsAgentDrawerOpen(false)}
            className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition border border-slate-700"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
