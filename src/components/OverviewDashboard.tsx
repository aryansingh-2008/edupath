'use client';

import React, { useState } from 'react';
import { useEduPath } from '../store/useEduPathStore';
import {
  ArrowRight,
  Clock,
  AlertCircle,
  HelpCircle,
  RefreshCw,
  Zap,
  FolderGit2
} from 'lucide-react';

export const OverviewDashboard: React.FC = () => {
  const {
    profile,
    roadmap,
    bottleneckDetected,
    learningDebtRebalanced,
    rebalanceLearningDebt,
    setActiveTab,
    simulateTaskCompletion,
    setIsWhyPlanChangedModalOpen
  } = useEduPath();

  const [showWhyThis, setShowWhyThis] = useState(false);

  // Derive active mission
  const activeMilestone = roadmap.find(m => m.status === 'active') || roadmap[0];
  const nextTask = activeMilestone?.tasks.find(t => !t.done) || activeMilestone?.tasks[0];

  return (
    <div className="space-y-6">
      {/* GREETING & STATUS BANNER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-blue-950/40 via-indigo-950/20 to-slate-900/40 p-6 rounded-2xl border border-blue-500/20">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
              Active Career Path
            </span>
            <span className="text-xs text-slate-400">&bull; Goal: {profile.targetRole}</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            Welcome back, {profile.name}
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            EduPath is actively monitoring your skill trajectory. Your next critical milestone is mastering relational query structures.
          </p>
        </div>

        {/* CAREER READINESS SUMMARY GAUGE */}
        <div className="flex items-center gap-4 bg-black/40 p-4 rounded-xl border border-slate-800 self-start md:self-auto">
          <div className="relative w-16 h-16 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-slate-800"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-blue-500 transition-all duration-1000 ease-out"
                strokeDasharray={`${profile.readinessPercentage}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <span className="absolute font-bold text-sm text-white">{profile.readinessPercentage}%</span>
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Role Readiness</span>
            <span className="text-sm font-bold text-blue-400">Full Stack Target</span>
            <button
              onClick={() => setActiveTab('readiness')}
              className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1 mt-0.5 transition"
            >
              View Breakdown &rarr;
            </button>
          </div>
        </div>
      </div>

      {/* BOTTLENECK ACTIVE CALLOUT */}
      {bottleneckDetected && (
        <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-950/60 to-rose-950/60 border border-amber-500/50 shadow-lg shadow-amber-950/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-white text-sm">Learning Bottleneck Detected: SQL JOINs</h3>
                <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase">
                  Adaptive Recalibration
                </span>
              </div>
              <p className="text-xs text-amber-200/80 mt-1 max-w-2xl leading-relaxed">
                You experienced difficulty with 2 recent multi-table query questions. EduPath automatically inserted an interactive recovery module to solidify this prerequisite before proceeding to backend APIs.
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsWhyPlanChangedModalOpen(true)}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-xl text-xs transition shrink-0 shadow-md shadow-amber-500/20"
          >
            Why did my plan change?
          </button>
        </div>
      )}

      {/* MAIN 2-COLUMN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* LEFT COLUMN: TODAY'S MISSION & QUICK ACTIONS (7 cols) */}
        <div className="lg:col-span-7 space-y-6">

          {/* TODAY'S MISSION (HIGH LEVERAGE FOCUS) */}
          <div className="bg-[#0f172a] rounded-2xl p-6 border border-slate-800 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-ping"></span>
                <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">
                  Today&apos;s Mission
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <Clock className="w-3.5 h-3.5" />
                <span>{nextTask?.durationMinutes || 25} minutes</span>
              </div>
            </div>

            <h2 className="text-xl md:text-2xl font-bold text-white mb-2 leading-snug">
              {activeMilestone.isRecoveryModule
                ? '⚡ Master SQL JOINs (Recovery Module)'
                : nextTask?.title || 'Practice Lab: INNER, LEFT, and RIGHT JOIN Queries'}
            </h2>

            <p className="text-xs md:text-sm text-slate-400 mb-4 leading-relaxed">
              {activeMilestone.objective}
            </p>

            {/* "WHY THIS?" EXPLAINABILITY ACCORDION */}
            <div className="mb-6">
              <button
                onClick={() => setShowWhyThis(!showWhyThis)}
                className="text-xs font-medium text-indigo-400 hover:text-indigo-300 flex items-center gap-1.5 transition"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Why this task today?</span>
                <span className="text-[10px] text-slate-500">[{showWhyThis ? 'Collapse' : 'Explain'}]</span>
              </button>

              {showWhyThis && (
                <div className="mt-2.5 p-3.5 rounded-xl bg-indigo-950/30 border border-indigo-500/20 text-xs text-indigo-200/90 space-y-2 animate-in fade-in slide-in-from-top-1 duration-200">
                  <div className="flex items-start gap-2">
                    <span className="font-semibold text-indigo-300">1. Target Alignment:</span>
                    <span>Required by 8 of 10 Full Stack Developer benchmarks.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-semibold text-indigo-300">2. Evidence Delta:</span>
                    <span>Your resume demonstrates basic SQLite filtering, but lacks multi-table join validation.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-semibold text-indigo-300">3. Prerequisite Gate:</span>
                    <span>Backend Express REST routes in Week 2 directly query joined user/order tables.</span>
                  </div>
                </div>
              )}
            </div>

            {/* ACTION CTA BUTTONS */}
            <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-slate-800/80">
              <button
                onClick={() => setActiveTab('practice')}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-blue-600/30 transition"
              >
                <span>Start Mission Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => simulateTaskCompletion(nextTask?.id)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition"
              >
                Mark Done (+50 XP)
              </button>

              <button
                onClick={() => setActiveTab('path')}
                className="px-4 py-2.5 text-xs text-slate-400 hover:text-white transition"
              >
                View Full Timeline
              </button>
            </div>
          </div>

          {/* LEARNING DEBT MONITOR */}
          {!learningDebtRebalanced && profile.learningDebt.length > 0 && (
            <div className="bg-[#0f172a] rounded-2xl p-5 border border-slate-800 shadow-lg space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-400" />
                  <h3 className="font-bold text-sm text-white">Learning Debt Monitor</h3>
                </div>
                <span className="text-xs px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 font-semibold border border-amber-500/20">
                  {profile.learningDebt.length} Topics Delayed
                </span>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">
                You postponed <strong>SQL Indexing</strong> and <strong>Dockerfile Multi-stage Builds</strong>. If postponed further, subsequent architectural milestones will suffer.
              </p>

              <div className="space-y-2">
                {profile.learningDebt.map(debt => (
                  <div key={debt.skillId} className="flex items-center justify-between p-2.5 rounded-lg bg-black/20 border border-slate-800 text-xs">
                    <div>
                      <span className="font-semibold text-slate-200 block">{debt.name}</span>
                      <span className="text-[11px] text-slate-500">Postponed {debt.daysDelayed} days &bull; Needed for {debt.prerequisiteFor.join(', ')}</span>
                    </div>
                    <span className="text-amber-400 font-bold text-[11px]">Delayed</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={rebalanceLearningDebt}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 text-xs font-semibold transition"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Rebalance Learning Plan
                </button>
              </div>
            </div>
          )}

          {learningDebtRebalanced && (
            <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-xs text-emerald-300 flex items-center justify-between">
              <span>✓ Learning debt successfully rebalanced into Week 1 and 2 buffer hours!</span>
              <span className="text-[11px] text-emerald-400 font-bold">Optimal Path</span>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: SKILLS CONSTELLATION PREVIEW & QUICK STATS (5 cols) */}
        <div className="lg:col-span-5 space-y-6">

          {/* TOP SKILL CAPABILITIES & GAPS */}
          <div className="bg-[#0f172a] rounded-2xl p-5 border border-slate-800 shadow-lg space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-white">Skill Capabilities &amp; Gaps</h3>
              <button
                onClick={() => setActiveTab('skills')}
                className="text-xs text-blue-400 hover:text-blue-300 font-semibold"
              >
                View Map &rarr;
              </button>
            </div>

            <div className="space-y-3">
              {profile.skills.slice(0, 5).map(skill => {
                let statusBadge = 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
                let statusLabel = 'Mastered';
                if (skill.status === 'developing') {
                  statusBadge = 'bg-blue-500/20 text-blue-400 border-blue-500/30';
                  statusLabel = 'Developing';
                } else if (skill.status === 'gap') {
                  statusBadge = 'bg-rose-500/20 text-rose-400 border-rose-500/30';
                  statusLabel = 'Critical Gap';
                }

                return (
                  <div key={skill.id} className="p-3 rounded-xl bg-black/20 border border-slate-800/80 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-200">{skill.name}</span>
                      <span className={`px-2 py-0.5 text-[10px] font-bold rounded border ${statusBadge}`}>
                        {statusLabel}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span>You: <strong className="text-white">{Math.round(skill.estimatedLevel * 100)}%</strong></span>
                      <span>Target: <strong className="text-slate-300">{Math.round(skill.targetBenchmark * 100)}%</strong></span>
                    </div>

                    {/* DUAL PROGRESS BAR */}
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden relative">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-700"
                        style={{ width: `${skill.estimatedLevel * 100}%` }}
                      ></div>
                      <div
                        className="absolute top-0 bottom-0 w-0.5 bg-white"
                        style={{ left: `${skill.targetBenchmark * 100}%` }}
                        title="Target Benchmark"
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RECOMMENDED CAPSTONE PROJECT PREVIEW */}
          <div className="bg-[#0f172a] rounded-2xl p-5 border border-slate-800 shadow-lg space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                <FolderGit2 className="w-3.5 h-3.5" />
                Target Capstone Project
              </span>
              <span className="text-[10px] text-slate-400">Closes 3 Gaps</span>
            </div>

            <h4 className="font-bold text-sm text-white">
              Multi-Tenant Expense &amp; Budget API
            </h4>

            <p className="text-xs text-slate-400 leading-relaxed">
              Build a production Express service with PostgreSQL relational schemas, indexed search, and Redis caching.
            </p>

            <div className="flex flex-wrap gap-1.5 pt-1">
              <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px]">Node.js</span>
              <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px]">PostgreSQL</span>
              <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px]">Docker</span>
              <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px]">Redis</span>
            </div>

            <div className="pt-2 border-t border-slate-800">
              <button
                onClick={() => setActiveTab('projects')}
                className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1 transition"
              >
                View Project Specification &rarr;
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
