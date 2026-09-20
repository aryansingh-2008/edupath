'use client';

import React from 'react';
import {
  Compass,
  ArrowRight,
  Sparkles,
  Zap,
  MapPin,
  Bot,
  UserPlus
} from 'lucide-react';

export const LandingPage: React.FC<{ onEnterApp: (mode?: 'signin' | 'signup') => void }> = ({ onEnterApp }) => {
  return (
    <div className="min-h-screen bg-[#080c16] text-slate-100 selection:bg-blue-600 selection:text-white font-sans">
      
      <header className="border-b border-slate-900 bg-[#0b101e]/90 backdrop-blur-md sticky top-0 z-40 px-6 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/25 border border-white/20">
              <Compass className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight text-white">EduPath <span className="text-blue-400">AI</span></span>
              <p className="text-[10px] text-slate-400 font-medium hidden sm:block">Agentic Career Learning OS</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onEnterApp('signin')}
              className="text-xs font-semibold text-slate-300 hover:text-white px-3 py-1.5 rounded-lg transition"
            >
              Sign In
            </button>

            <button
              onClick={() => onEnterApp('signup')}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-xs transition shadow-lg shadow-blue-600/30 flex items-center gap-1.5"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Create Account</span>
            </button>
          </div>
        </div>
      </header>

      
      <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-28 px-6">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none"></div>

        <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
          <div className="inline-flex flex-wrap items-center justify-center gap-2 px-4 py-2 rounded-2xl bg-blue-950/60 border border-blue-500/40 text-blue-200 text-xs shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span className="font-semibold text-slate-200">Autonomous AI Career Learning Platform</span>
            <span className="text-slate-500">&bull;</span>
            <span className="text-blue-300 font-medium">Dynamic Closed-Loop Replanning</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.1]">
            Stop guessing what to learn next.
          </h1>

          <p className="text-base sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            EduPath is an Autonomous AI Agent that evaluates your skills today, identifies your critical career gaps, and <span className="text-white font-bold">autonomously adapts your learning path</span> as you grow.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
            <button
              onClick={() => onEnterApp('signup')}
              className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-sm transition shadow-xl shadow-blue-600/30 flex items-center gap-2"
            >
              <UserPlus className="w-4 h-4" />
              <span>Create Free Account</span>
            </button>
            <button
              onClick={() => onEnterApp('signin')}
              className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold text-sm border border-slate-800 transition flex items-center gap-2"
            >
              <span>Sign In</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* VISUAL TRAJECTORY DIAGRAM */}
          <div className="pt-12 max-w-4xl mx-auto">
            <div className="p-6 md:p-8 rounded-3xl bg-[#0f172a]/90 border border-slate-800 shadow-2xl backdrop-blur-xl">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-4">
                The Adaptive Career Trajectory (5 Connected Steps)
              </span>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-left">
                <div className="p-3.5 rounded-xl bg-black/40 border border-slate-800/80 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-blue-400 block">1. Profile</span>
                  <span className="text-xs font-bold text-white block">Current Skills</span>
                  <span className="text-[11px] text-slate-400">Intake &amp; verified evidence</span>
                </div>
                <div className="p-3.5 rounded-xl bg-black/40 border border-slate-800/80 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-rose-400 block">2. Gaps</span>
                  <span className="text-xs font-bold text-white block">Prioritized Delta</span>
                  <span className="text-[11px] text-slate-400">Target role benchmark</span>
                </div>
                <div className="p-3.5 rounded-xl bg-black/40 border border-slate-800/80 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-amber-400 block">3. Roadmap</span>
                  <span className="text-xs font-bold text-white block">Daily Missions</span>
                  <span className="text-[11px] text-slate-400">Topological DAG schedule</span>
                </div>
                <div className="p-3.5 rounded-xl bg-black/40 border border-slate-800/80 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-purple-400 block">4. Practice</span>
                  <span className="text-xs font-bold text-white block">Diagnostic Check</span>
                  <span className="text-[11px] text-slate-400">Detects bottlenecks</span>
                </div>
                <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/40 space-y-1 col-span-2 md:col-span-1">
                  <span className="text-[10px] uppercase font-bold text-emerald-400 block">5. Readiness</span>
                  <span className="text-xs font-bold text-white block">Verified Proof</span>
                  <span className="text-[11px] text-emerald-200">Interview ready</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CORE DIFFERENTIATOR: ADAPTIVE REPLANNING */}
      <section className="py-16 px-6 border-t border-slate-900 bg-[#050811]">
        <div className="max-w-5xl mx-auto space-y-10">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">
              The Agentic Difference
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              A Learning Path That Recalculates When You Struggle
            </h2>
            <p className="text-sm text-slate-400 max-w-2xl mx-auto">
              Static courses keep moving forward even when you fail prerequisites. EduPath detects diagnostic struggles, recalculates the schedule, and inserts focused recovery modules.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
              <span className="text-xs font-bold text-slate-400 uppercase">Static Courses (Coursera, Udemy)</span>
              <div className="space-y-2.5 text-xs text-slate-400">
                <div className="p-3 rounded-lg bg-black/30 border border-slate-800">Week 1: SQL Basics (Rigid playlist)</div>
                <div className="p-3 rounded-lg bg-black/30 border border-slate-800">Week 2: Backend APIs (Learner stuck, but course continues)</div>
                <div className="p-3 rounded-lg bg-black/30 border border-slate-800">Week 3: System Design &rarr; 85% Drop-off Rate</div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-950/40 to-blue-950/40 border border-blue-500/30 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-400 uppercase">EduPath Autonomous Replanning</span>
                <span className="text-[10px] font-bold text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">Active Agent</span>
              </div>
              <div className="space-y-2.5 text-xs">
                <div className="p-3 rounded-lg bg-black/40 border border-slate-800 text-slate-300">Week 1: SQL Foundations</div>
                <div className="p-3 rounded-lg bg-amber-950/40 border border-amber-500/40 text-amber-200">
                  ⚡ <strong>Struggle Detected:</strong> Injected &ldquo;SQL JOIN Recovery Module (+45m)&rdquo;
                </div>
                <div className="p-3 rounded-lg bg-black/40 border border-slate-800 text-slate-300">Week 2: Backend APIs (Shifted +2d to protect prerequisites)</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THREE SOLID PILLARS */}
      <section className="py-16 px-6 border-t border-slate-900">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">
              Core Architecture
            </span>
            <h2 className="text-3xl font-bold text-white">
              Three Powerful Pillars
            </h2>
            <p className="text-xs text-slate-400">Unified into one seamless, rock-solid experience</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-5 rounded-2xl bg-[#0f172a] border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">1. Adaptive Roadmap</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Step-by-step weekly missions with checkable tasks, vetted official documentation, and inline diagnostic quizzes.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#0f172a] border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-600/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">2. Skill Gap Intelligence</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Quantified delta between what you know and what hiring managers expect, complete with career readiness percentage gauge.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#0f172a] border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
                <Bot className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">3. Contextual AI Mentor</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                A 24/7 conversational mentor aware of your active target role, knowledge gaps, and why any roadmap items were adapted.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA & FOOTER */}
      <section className="py-20 px-6 border-t border-slate-900 text-center space-y-6 bg-gradient-to-b from-transparent to-[#04070e]">
        <h2 className="text-3xl sm:text-4xl font-bold text-white">Ready to Experience EduPath?</h2>
        <p className="text-sm text-slate-400 max-w-lg mx-auto">
          Sign in to your account or create your personalized career learning profile.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => onEnterApp('signup')}
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-sm transition shadow-xl shadow-blue-600/30 flex items-center gap-2"
          >
            <UserPlus className="w-4 h-4" />
            <span>Create Your Free Account &rarr;</span>
          </button>
          <button
            onClick={() => onEnterApp('signin')}
            className="px-8 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold text-sm border border-slate-800 transition flex items-center gap-2"
          >
            <span>Sign In to Existing Account</span>
          </button>
        </div>
      </section>

      
      <footer className="border-t border-slate-900 bg-[#04060d] px-6 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>EduPath &bull; Autonomous Career Upskilling &amp; Adaptive Learning Agent</span>
          <span>&copy; 2026 EduPath. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
};
