'use client';

import React from 'react';
import { useEduPath } from '../store/useEduPathStore';
import {
  Compass,
  LayoutDashboard,
  MapPin,
  FileCode2,
  AlertTriangle,
  BarChart3,
  Bot,
  Sparkles,
  Flame,
  LogOut,
  ShieldCheck,
  Zap,
  UploadCloud
} from 'lucide-react';
import { AppView } from '../types';

export const CareerOSShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {
    profile,
    activeTab,
    setActiveTab,
    bottleneckDetected,
    setIsCustomModalOpen,
    setIsAnalyzerOpen,
    isJudgeMode,
    toggleJudgeMode,
    simulateSqlStruggle,
    logout
  } = useEduPath();

  const navItems: { id: AppView; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'path', label: 'Roadmap', icon: MapPin },
    { id: 'practice', label: 'Diagnostic Quiz', icon: FileCode2 },
    { id: 'gaps', label: 'Skill Gaps', icon: AlertTriangle },
    { id: 'progress', label: 'Progress Report', icon: BarChart3 },
    { id: 'mentor', label: 'AI Mentor', icon: Bot }
  ];

  return (
    <div className="min-h-screen bg-[#080c16] text-slate-100 flex flex-col font-sans">
      {/* TOP NOTIFICATION / BOTTLENECK ALERT BAR */}
      {bottleneckDetected && (
        <div className="bg-gradient-to-r from-amber-950/80 via-rose-950/80 to-amber-950/80 border-b border-amber-500/40 px-4 py-2 text-xs flex items-center justify-between text-amber-200">
          <div className="flex items-center gap-2 max-w-4xl mx-auto">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            <span className="font-semibold text-white">Learning Bottleneck Detected:</span>
            <span>Repeated difficulty with SQL JOINs detected. Adaptive Planner has modified your roadmap with a focused recovery module.</span>
          </div>
          <button
            onClick={() => setActiveTab('path')}
            className="px-2.5 py-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-medium rounded border border-amber-500/30 transition text-xs whitespace-nowrap"
          >
            Inspect Route Change &rarr;
          </button>
        </div>
      )}

      {/* JUDGE / EVALUATOR MODE CONTROL BAR */}
      {isJudgeMode && (
        <div className="bg-gradient-to-r from-amber-950/80 via-slate-900/90 to-indigo-950/80 border-b border-amber-500/40 px-4 py-2 text-xs flex flex-wrap items-center justify-between gap-3 shadow-lg">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40 text-[10px] uppercase tracking-wider flex items-center gap-1 shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              Judge Mode Active
            </span>
            <span className="text-slate-300 text-xs hidden lg:inline">
              Evaluator Fast Controls:
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={simulateSqlStruggle}
              className="px-2.5 py-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 font-semibold rounded-lg border border-amber-500/40 transition text-[11px] flex items-center gap-1"
              title="Simulate learner failing 2 diagnostic questions on SQL JOINs"
            >
              <Zap className="w-3 h-3 text-amber-400" />
              <span>⚡ Test Replanning (Trigger Struggle)</span>
            </button>

            <button
              onClick={() => setIsAnalyzerOpen(true)}
              className="px-2.5 py-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-200 font-semibold rounded-lg border border-blue-500/30 transition text-[11px] flex items-center gap-1"
              title="Upload / Paste resume to test capability extraction"
            >
              <UploadCloud className="w-3 h-3 text-blue-400" />
              <span>📄 Test Resume Ingestion</span>
            </button>

            <button
              onClick={() => setActiveTab('progress')}
              className="px-2.5 py-1 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-200 font-semibold rounded-lg border border-emerald-500/30 transition text-[11px] flex items-center gap-1"
            >
              <BarChart3 className="w-3 h-3 text-emerald-400" />
              <span>📊 View Progress Report</span>
            </button>

            <button
              onClick={toggleJudgeMode}
              className="px-1.5 py-1 text-slate-400 hover:text-white rounded transition text-[10px]"
              title="Close Judge Mode Bar"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* HEADER BAR */}
      <header className="sticky top-0 z-40 bg-[#0b101e]/90 backdrop-blur-md border-b border-slate-800/80 px-4 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('overview')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/20 border border-blue-400/30">
              <Compass className="w-5 h-5 text-white animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-white">EduPath</span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  AI Agent
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium hidden sm:block">
                Adaptive Career Learning Platform
              </p>
            </div>
          </div>

          
          <nav className="hidden md:flex items-center gap-1.5 bg-[#111827]/80 p-1 rounded-xl border border-slate-800">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive =
                activeTab === item.id ||
                (item.id === 'gaps' && (activeTab === 'skills' || activeTab === 'readiness'));

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/30 font-bold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          
          <div className="flex items-center gap-2.5">
            
            <div className="flex items-center gap-1.5 bg-slate-900/90 border border-slate-800 px-2.5 py-1 rounded-lg text-xs" title="Daily Learning Streak">
              <Flame className="w-4 h-4 text-amber-500" />
              <span className="font-bold text-amber-300">{profile.streakDays}d</span>
            </div>

            
            <div className="hidden sm:flex items-center gap-1.5 bg-slate-900/90 border border-slate-800 px-2.5 py-1 rounded-lg text-xs" title="Experience Points">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span className="font-bold text-indigo-300">{profile.xpPoints} XP</span>
            </div>

            {/* ANALYZE RESUME / CAPABILITIES BUTTON */}
            <button
              onClick={() => setIsAnalyzerOpen(true)}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold transition"
              title="Upload resume, portfolio, or project descriptions to extract capabilities"
            >
              <UploadCloud className="w-3.5 h-3.5 text-blue-400" />
              <span>Analyze Resume</span>
            </button>

            {/* TRY YOUR PROFILE / CUSTOM GENERATOR BUTTON */}
            <button
              onClick={() => setIsCustomModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-xs font-bold shadow-md shadow-blue-500/20 border border-white/20 transition-all hover:scale-105"
              title="Enter your real name, custom target role, and actual skills"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
              <span>⚡ Change Profile</span>
            </button>

            {/* USER PROFILE CHIP & LOGOUT */}
            <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
              <div
                onClick={() => setIsCustomModalOpen(true)}
                className="flex items-center gap-2 cursor-pointer group"
                title="Click to edit profile"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 text-white font-bold flex items-center justify-center text-xs border border-white/20">
                  {profile.avatarInitial}
                </div>
                <div className="hidden xl:block text-left">
                  <span className="text-xs font-semibold text-slate-200 block group-hover:text-blue-400 transition">
                    {profile.name}
                  </span>
                  <span className="text-[10px] text-slate-500 block leading-tight">
                    {profile.targetRole}
                  </span>
                </div>
              </div>

              <button
                onClick={logout}
                className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-950/30 rounded-lg transition"
                title="Log Out to Login Portal"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        
        <div className="md:hidden flex items-center gap-1 overflow-x-auto pt-2.5 scrollbar-none">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive =
              activeTab === item.id ||
              (item.id === 'path' && activeTab === 'overview') ||
              (item.id === 'gaps' && (activeTab === 'skills' || activeTab === 'readiness'));
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'text-slate-400 bg-slate-900/50'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {item.label}
              </button>
            );
          })}
        </div>
      </header>

      
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 lg:p-8">
        {children}
      </main>

      
      <footer className="border-t border-slate-900 bg-[#050811] px-4 py-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>EduPath &bull; The Adaptive Career Learning Agent</span>
          <span className="text-slate-600">Built for the AI Agent Hackathon &bull; Sub-100ms Adaptive Replanning</span>
        </div>
      </footer>
    </div>
  );
};
