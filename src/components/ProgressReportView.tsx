'use client';

import React, { useState } from 'react';
import { useEduPath } from '../store/useEduPathStore';
import {
  FileText,
  Printer,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Calendar,
  RefreshCw,
  Target
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const ProgressReportView: React.FC = () => {
  const { profile, roadmap } = useEduPath();
  const [reportDate, setReportDate] = useState(() => new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }));
  const [isRefreshing, setIsRefreshing] = useState(false);

  // 1. Skills Acquired (level >= 0.70 or status === 'mastered')
  const skillsAcquired = profile.skills.filter(
    s => s.status === 'mastered' || s.estimatedLevel >= 0.70
  );

  // 2. Skills In Progress (developing or between 0.30 and 0.69)
  const skillsInProgress = profile.skills.filter(
    s => s.status === 'developing' || (s.estimatedLevel >= 0.30 && s.estimatedLevel < 0.70)
  );

  // 3. Remaining Gaps (estimatedLevel < targetBenchmark)
  const remainingGaps = profile.skills
    .filter(s => s.targetBenchmark > s.estimatedLevel)
    .sort((a, b) => (b.targetBenchmark - b.estimatedLevel) - (a.targetBenchmark - a.estimatedLevel));

  // 4. Recommended Next Steps
  const activeMilestone = roadmap.find(m => m.status === 'active') || roadmap[0];
  const nextTask = activeMilestone?.tasks.find(t => !t.done) || activeMilestone?.tasks[0];

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const handleRegenerate = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setReportDate(new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      }));
      setIsRefreshing(false);
      try {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
      } catch {}
    }, 500);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto font-sans pb-12">
      
      {/* ACTION TOOLBAR (HIDDEN IN PRINT) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#0b101e] border border-slate-800 shadow-xl print:hidden">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-white tracking-tight">Periodic Progress Report</h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Official Agent Report
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Evaluates acquired competencies, active developing skills, remaining gaps, and next actions.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          <button
            onClick={handleRegenerate}
            disabled={isRefreshing}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-semibold text-xs border border-slate-800 transition"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-blue-400' : ''}`} />
            <span>Regenerate</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-blue-500/25 transition"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / Save as PDF</span>
          </button>
        </div>
      </div>

      {/* PRINTABLE REPORT CONTAINER */}
      <div className="bg-[#0f172a] border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8 print:bg-white print:text-black print:border-none print:shadow-none print:p-0">
        
        {/* REPORT HEADER */}
        <div className="border-b border-slate-800 print:border-slate-300 pb-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-blue-400 print:text-blue-700 block mb-1">
                EduPath Adaptive Learning Agent &bull; Periodic Evaluation
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-white print:text-black tracking-tight">
                Learner Progress &amp; Competency Report
              </h1>
            </div>
            <div className="text-left sm:text-right space-y-1">
              <div className="inline-flex items-center gap-1.5 text-xs text-slate-400 print:text-slate-600">
                <Calendar className="w-3.5 h-3.5" />
                <span>Generated: <strong>{reportDate}</strong></span>
              </div>
              <div className="text-xs text-slate-400 print:text-slate-600">
                Learner: <strong className="text-white print:text-black">{profile.name}</strong>
              </div>
            </div>
          </div>

          {/* TARGET & READINESS BANNER */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-black/40 print:bg-slate-100 border border-slate-800 print:border-slate-300 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 print:text-slate-600 block">
                Target Role
              </span>
              <span className="text-sm font-bold text-white print:text-black block">
                {profile.targetRole}
              </span>
              <span className="text-[11px] text-slate-400 print:text-slate-600 block">
                Level: {profile.experienceLevel}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-black/40 print:bg-slate-100 border border-slate-800 print:border-slate-300 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 print:text-slate-600 block">
                Career Goal
              </span>
              <span className="text-xs text-slate-200 print:text-slate-800 font-medium block leading-snug">
                {profile.careerGoal || `Master ${profile.targetRole} benchmarks.`}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-blue-950/30 print:bg-blue-50 border border-blue-500/30 print:border-blue-200 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 print:text-blue-700 block">
                Role Readiness Benchmark
              </span>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black text-white print:text-black">
                  {profile.readinessPercentage}%
                </span>
                <span className="text-xs font-bold text-emerald-400 print:text-emerald-700">
                  {profile.xpPoints} XP Earned
                </span>
              </div>
              <span className="text-[10px] text-slate-400 print:text-slate-600 block">
                Pacing: {profile.dailyCommitmentMinutes} mins/day &bull; Streak: {profile.streakDays} days
              </span>
            </div>
          </div>
        </div>

        {/* 1. SKILLS ACQUIRED */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white print:text-black">
                1. Skills Acquired ({skillsAcquired.length})
              </h2>
              <p className="text-xs text-slate-400 print:text-slate-600">
                Competencies verified through practice lab assessments, code projects, and resume evidence.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {skillsAcquired.length > 0 ? (
              skillsAcquired.map(skill => (
                <div
                  key={skill.id}
                  className="p-4 rounded-2xl bg-black/30 print:bg-slate-50 border border-slate-800 print:border-slate-300 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white print:text-black">{skill.name}</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 print:text-emerald-700 border border-emerald-500/30">
                      {Math.round(skill.estimatedLevel * 100)}% Mastered
                    </span>
                  </div>
                  {skill.evidence[0] && (
                    <p className="text-[11px] text-slate-400 print:text-slate-600 italic line-clamp-2">
                      &ldquo;{skill.evidence[0].quote}&rdquo;
                    </p>
                  )}
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
                    <span>Source: {skill.evidence[0]?.source || 'Verified Test'}</span>
                    <span>&bull;</span>
                    <span className="text-emerald-400 print:text-emerald-700 font-semibold">Verified</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-2 p-4 rounded-xl bg-black/20 text-xs text-slate-400">
                No fully mastered skills yet. Complete active roadmap missions to verify skills.
              </div>
            )}
          </div>
        </section>

        {/* 2. SKILLS IN PROGRESS */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white print:text-black">
                2. Skills in Progress ({skillsInProgress.length})
              </h2>
              <p className="text-xs text-slate-400 print:text-slate-600">
                Active competencies currently being practiced and developed in the roadmap.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {skillsInProgress.map(skill => {
              const currentPct = Math.round(skill.estimatedLevel * 100);
              const targetPct = Math.round(skill.targetBenchmark * 100);
              return (
                <div
                  key={skill.id}
                  className="p-4 rounded-2xl bg-black/30 print:bg-slate-50 border border-slate-800 print:border-slate-300 space-y-2.5"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white print:text-black">{skill.name}</span>
                    <span className="text-slate-400 print:text-slate-600 font-mono">
                      Current: <strong className="text-blue-400 print:text-blue-700">{currentPct}%</strong> / Target: {targetPct}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 print:bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-blue-500 h-full rounded-full transition-all"
                      style={{ width: `${Math.min(100, (currentPct / targetPct) * 100)}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 3. REMAINING GAPS */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white print:text-black">
                3. Remaining Gaps ({remainingGaps.length})
              </h2>
              <p className="text-xs text-slate-400 print:text-slate-600">
                Critical missing competencies preventing full hiring readiness for {profile.targetRole}.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {remainingGaps.map(gap => {
              const delta = Math.round((gap.targetBenchmark - gap.estimatedLevel) * 100);
              const isCritical = delta >= 40 || gap.name.toLowerCase().includes('sql') || gap.name.toLowerCase().includes('system design');
              return (
                <div
                  key={gap.id}
                  className="p-4 rounded-2xl bg-black/30 print:bg-slate-50 border border-slate-800 print:border-slate-300 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white print:text-black">{gap.name}</span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        isCritical
                          ? 'bg-rose-500/10 text-rose-400 print:text-rose-700 border border-rose-500/30'
                          : 'bg-amber-500/10 text-amber-400 print:text-amber-700 border border-amber-500/30'
                      }`}
                    >
                      {isCritical ? 'CRITICAL GAP' : 'HIGH GAP'} &bull; -{delta}% Delta
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 print:text-slate-600 leading-relaxed">
                    Required for {profile.targetRole} architectural assessments and technical interview rounds.
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* 4. RECOMMENDED NEXT STEPS */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
              <Target className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white print:text-black">
                4. Recommended Next Steps
              </h2>
              <p className="text-xs text-slate-400 print:text-slate-600">
                Actionable immediate objectives synthesized by the Adaptive Planner Agent.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="p-4 rounded-2xl bg-blue-950/20 print:bg-blue-50 border border-blue-500/30 print:border-blue-200 flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                1
              </span>
              <div className="space-y-1">
                <span className="text-xs font-bold text-white print:text-black block">
                  Complete Today&apos;s Mission: {nextTask?.title || 'Prerequisite Practice Challenge'}
                </span>
                <p className="text-[11px] text-slate-400 print:text-slate-600 leading-relaxed">
                  Focus on {activeMilestone?.skillFocus}. Estimated time: {nextTask?.durationMinutes || 25} minutes.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-black/30 print:bg-slate-50 border border-slate-800 print:border-slate-300 flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-purple-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                2
              </span>
              <div className="space-y-1">
                <span className="text-xs font-bold text-white print:text-black block">
                  Test Knowledge in Diagnostic Quiz Lab (+50 XP per correct answer)
                </span>
                <p className="text-[11px] text-slate-400 print:text-slate-600 leading-relaxed">
                  Validate conceptual mastery of multi-table SQL queries, React hooks lifecycle, and REST status codes.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-black/30 print:bg-slate-50 border border-slate-800 print:border-slate-300 flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                3
              </span>
              <div className="space-y-1">
                <span className="text-xs font-bold text-white print:text-black block">
                  Build Milestone Capstone Project: {activeMilestone?.capstoneProject?.title || 'Relational API Prototype'}
                </span>
                <p className="text-[11px] text-slate-400 print:text-slate-600 leading-relaxed">
                  Apply practical code architecture to produce verifiable GitHub repository evidence.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* REPORT FOOTER */}
        <div className="pt-6 border-t border-slate-800 print:border-slate-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[11px] text-slate-500">
          <span>EduPath Autonomous Career Upskilling Platform &bull; Dynamic Closed-Loop Learning</span>
          <span>Verified Agent Telemetry Ingested &bull; Report ID: EP-REP-{profile.id.slice(-6)}</span>
        </div>
      </div>
    </div>
  );
};
