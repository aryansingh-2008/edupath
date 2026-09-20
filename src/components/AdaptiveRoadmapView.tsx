'use client';

import React, { useState } from 'react';
import { useEduPath } from '../store/useEduPathStore';
import {
  Clock,
  ExternalLink,
  CheckCircle,
  Circle,
  Zap,
  Sparkles,
  RotateCcw,
  HelpCircle,
  CheckCircle2,
  XCircle,
  Award,
  ArrowRight
} from 'lucide-react';
import { COMPREHENSIVE_QUESTION_BANK } from '../data/questionBank';
import { PracticeQuestion, RoadmapMilestone } from '../types';

export const AdaptiveRoadmapView: React.FC = () => {
  const {
    profile,
    roadmap,
    bottleneckDetected,
    latestDecision,
    simulateTaskCompletion,
    simulateSqlStruggle,
    submitQuizAnswer,
    setActiveTab,
    resetDemo,
    setIsWhyPlanChangedModalOpen,
    setIsCustomModalOpen
  } = useEduPath();

  // Inline diagnostic quiz state per milestone
  const [selectedQuizOption, setSelectedQuizOption] = useState<Record<string, number | null>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<Record<string, boolean>>({});
  const [quizFeedback, setQuizFeedback] = useState<Record<string, { isCorrect: boolean; xpAwarded: number; firstTime: boolean }>>({});

  const getMilestoneQuestion = (milestone: RoadmapMilestone, isRecovery: boolean): PracticeQuestion => {
    if (isRecovery) {
      return COMPREHENSIVE_QUESTION_BANK.find(q => q.id === 'q-sql-2') || COMPREHENSIVE_QUESTION_BANK[1];
    }
    const skill = milestone.skillFocus?.toLowerCase() || '';
    if (skill.includes('sql') || skill.includes('database')) {
      return COMPREHENSIVE_QUESTION_BANK.find(q => q.id === 'q-sql-1') || COMPREHENSIVE_QUESTION_BANK[0];
    }
    if (skill.includes('node') || skill.includes('express') || skill.includes('api')) {
      return COMPREHENSIVE_QUESTION_BANK.find(q => q.id === 'q-node-1') || COMPREHENSIVE_QUESTION_BANK[17];
    }
    if (skill.includes('system') || skill.includes('scale') || skill.includes('design')) {
      return COMPREHENSIVE_QUESTION_BANK.find(q => q.id === 'q-sys-1') || COMPREHENSIVE_QUESTION_BANK[24];
    }
    return COMPREHENSIVE_QUESTION_BANK.find(q => q.id === 'q-js-1') || COMPREHENSIVE_QUESTION_BANK[7];
  };

  const handleMilestoneQuizSubmit = (milestoneId: string, question: PracticeQuestion) => {
    const selected = selectedQuizOption[milestoneId];
    if (selected === undefined || selected === null) return;

    const isCorrect = selected === question.correctIndex;
    const result = submitQuizAnswer(question.id, selected, isCorrect, 50);

    setQuizSubmitted(prev => ({ ...prev, [milestoneId]: true }));
    setQuizFeedback(prev => ({ ...prev, [milestoneId]: result }));
  };

  const handleMilestoneQuizReset = (milestoneId: string) => {
    setSelectedQuizOption(prev => ({ ...prev, [milestoneId]: null }));
    setQuizSubmitted(prev => ({ ...prev, [milestoneId]: false }));
    setQuizFeedback(prev => {
      const copy = { ...prev };
      delete copy[milestoneId];
      return copy;
    });
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* LEARNER TRAJECTORY & SUMMARY CARD */}
      <div className="p-5 rounded-2xl bg-[#0b101e] border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Active Career Trajectory
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-xl font-extrabold text-white tracking-tight">
              {profile.name} &bull; <span className="text-blue-400">{profile.targetRole}</span>
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-500/10 text-blue-300 border border-blue-500/30 flex items-center gap-1">
              <Award className="w-3 h-3 text-blue-400" />
              {profile.readinessPercentage}% Ready
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Pacing: {profile.dailyCommitmentMinutes} min/day &bull; Personalized adaptive sequence
          </p>
        </div>

        <button
          onClick={() => setIsCustomModalOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-xs font-bold shadow-lg shadow-blue-500/25 border border-white/20 transition self-start md:self-auto"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
          <span>⚡ Change Profile / Target Role</span>
        </button>
      </div>

      {/* AGENTIC ADAPTATION TESTBED (FOR JUDGES & EVALUATORS) */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-950/40 via-indigo-950/40 to-purple-950/40 border border-blue-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-300">
              Autonomous Agent Adaptation Testbed
            </span>
          </div>
          <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
            EduPath continuously tests knowledge. Click below to simulate a diagnostic struggle and watch the AI agent autonomously adapt the schedule and insert recovery modules in real time.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={simulateSqlStruggle}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition shadow-lg ${
              bottleneckDetected
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/20'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>{bottleneckDetected ? 'Bottleneck Active' : '⚡ Simulate Diagnostic Struggle'}</span>
          </button>
          <button
            onClick={resetDemo}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium border border-slate-700 transition"
            title="Reset to default Alex Rivera baseline"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* REASONING CARD IF BOTTLENECK DETECTED */}
      {latestDecision && (
        <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-950/50 via-indigo-950/60 to-amber-950/50 border border-amber-500/40 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5 uppercase tracking-wider">
              <Zap className="w-4 h-4 text-amber-400" />
              Autonomous Route Adaptation Receipt
            </span>
            <button
              onClick={() => setIsWhyPlanChangedModalOpen(true)}
              className="text-xs text-amber-300 hover:text-amber-200 underline font-semibold transition"
            >
              Inspect Full Decision Receipt &rarr;
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-black/40 border border-amber-500/20 space-y-1">
              <span className="text-[10px] text-amber-300 font-bold uppercase block">1. Trigger</span>
              <p className="text-slate-300 leading-snug">{latestDecision.triggerReason}</p>
            </div>
            <div className="p-3 rounded-xl bg-black/40 border border-amber-500/20 space-y-1">
              <span className="text-[10px] text-amber-300 font-bold uppercase block">2. Evidence</span>
              <p className="text-slate-300 leading-snug">{latestDecision.evidenceSummary}</p>
            </div>
            <div className="p-3 rounded-xl bg-black/40 border border-amber-500/20 space-y-1">
              <span className="text-[10px] text-emerald-300 font-bold uppercase block">3. Action Taken</span>
              <p className="text-emerald-300 font-medium leading-snug">{latestDecision.actionTaken}</p>
            </div>
            <div className="p-3 rounded-xl bg-black/40 border border-amber-500/20 space-y-1">
              <span className="text-[10px] text-amber-300 font-bold uppercase block">4. Schedule Impact</span>
              <p className="text-amber-300 font-medium leading-snug">{latestDecision.impactSummary}</p>
            </div>
          </div>
        </div>
      )}

      
      <div className="space-y-6 relative before:absolute before:inset-0 before:left-6 before:w-0.5 before:bg-slate-800/80 before:hidden md:before:block">
        {roadmap.map((milestone, idx) => {
          const isRecovery = milestone.isRecoveryModule;

          return (
            <div
              key={milestone.id}
              className={`rounded-2xl p-6 border transition-all relative md:ml-12 ${
                isRecovery
                  ? 'bg-[#131b2e] border-amber-500/60 shadow-xl shadow-amber-500/10 ring-1 ring-amber-500/40'
                  : milestone.status === 'active'
                  ? 'bg-[#0f172a] border-blue-500/50 shadow-lg shadow-blue-500/10'
                  : 'bg-[#0f172a] border-slate-800/80 opacity-90'
              }`}
            >
              {/* TIMELINE CIRCLE BADGE (DESKTOP) */}
              <div
                className={`hidden md:flex absolute -left-12 top-6 w-8 h-8 rounded-full items-center justify-center font-bold text-xs -translate-x-1/2 border ${
                  isRecovery
                    ? 'bg-amber-500 text-black border-amber-400'
                    : milestone.status === 'active'
                    ? 'bg-blue-600 text-white border-blue-400'
                    : 'bg-slate-900 text-slate-400 border-slate-700'
                }`}
              >
                {isRecovery ? '⚡' : idx + 1}
              </div>

              
              <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    {milestone.title}
                  </h3>
                  {isRecovery && (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 uppercase animate-pulse">
                      Injected Recovery Module
                    </span>
                  )}
                  {milestone.delayDays && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-amber-400 border border-slate-700">
                      +{milestone.delayDays}d Schedule Shift
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3 text-xs">
                  <span className="flex items-center gap-1 text-slate-400">
                    <Clock className="w-3.5 h-3.5" />
                    {milestone.estimatedMinutes} mins
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    {milestone.skillFocus}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                {milestone.objective}
              </p>

              
              <div className="space-y-2 mb-4 bg-black/30 p-3.5 rounded-xl border border-slate-800/80">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Actionable Steps ({milestone.tasks.filter(t => t.done).length}/{milestone.tasks.length} Completed)
                  </span>
                  <span className="text-[10px] text-slate-500">Click any step to mark complete</span>
                </div>

                {milestone.tasks.map(task => (
                  <div
                    key={task.id}
                    onClick={() => simulateTaskCompletion(task.id)}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5 cursor-pointer text-xs transition select-none"
                  >
                    <div className="flex items-center gap-2.5">
                      {task.done ? (
                        <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                      ) : (
                        <Circle className="w-4 h-4 text-slate-600 shrink-0" />
                      )}
                      <span className={task.done ? 'line-through text-slate-500' : 'text-slate-200'}>
                        {task.title}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono">{task.durationMinutes}m</span>
                  </div>
                ))}
              </div>

              {/* INLINE DIAGNOSTIC CHALLENGE (ON ACTIVE MILESTONE OR RECOVERY MODULE) */}
              {(milestone.status === 'active' || isRecovery) && (() => {
                const q = getMilestoneQuestion(milestone, isRecovery);
                const isSubmitted = quizSubmitted[milestone.id];
                const selected = selectedQuizOption[milestone.id];
                const fb = quizFeedback[milestone.id];

                return (
                  <div className="mb-4 p-4 rounded-2xl bg-blue-950/25 border border-blue-500/30 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <HelpCircle className="w-4 h-4 text-blue-400" />
                        <span className="text-xs font-bold text-white uppercase tracking-wider">
                          Diagnostic Knowledge Check: {q.skillName}
                        </span>
                      </div>
                      <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-bold border border-blue-500/30">
                        {q.difficulty} &bull; +50 XP on Correct Answer
                      </span>
                    </div>

                    <p className="text-xs text-slate-200 font-semibold whitespace-pre-line leading-relaxed">
                      {q.prompt}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {q.options.map((opt, optIdx) => {
                        const isSelected = selected === optIdx;
                        const isCorrect = optIdx === q.correctIndex;

                        let btnStyle = 'border-slate-800 bg-black/40 text-slate-300 hover:border-slate-700 hover:bg-white/5';
                        if (isSubmitted) {
                          if (isCorrect) {
                            btnStyle = 'border-emerald-500 bg-emerald-950/50 text-emerald-200 font-semibold ring-1 ring-emerald-500/50';
                          } else if (isSelected && !isCorrect) {
                            btnStyle = 'border-rose-500 bg-rose-950/50 text-rose-200 ring-1 ring-rose-500/50';
                          } else {
                            btnStyle = 'border-slate-800/60 bg-black/20 text-slate-500 opacity-60';
                          }
                        } else if (isSelected) {
                          btnStyle = 'border-blue-500 bg-blue-950/50 text-white ring-2 ring-blue-500/60 font-medium';
                        }

                        return (
                          <button
                            key={optIdx}
                            disabled={isSubmitted}
                            onClick={() => setSelectedQuizOption(prev => ({ ...prev, [milestone.id]: optIdx }))}
                            className={`p-3 rounded-xl border text-left font-medium transition flex items-start gap-2.5 ${btnStyle}`}
                          >
                            <span className="font-mono text-slate-400 font-bold shrink-0">{String.fromCharCode(65 + optIdx)}.</span>
                            <span className="leading-relaxed">{opt}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* SUBMIT OR FEEDBACK */}
                    {!isSubmitted ? (
                      <div className="flex items-center justify-between pt-1">
                        <span className="text-[10px] text-slate-400">
                          ⚠️ EXP is awarded <strong className="text-emerald-400">strictly on correct answers</strong>.
                        </span>
                        <button
                          onClick={() => handleMilestoneQuizSubmit(milestone.id, q)}
                          disabled={selected === undefined || selected === null}
                          className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white font-bold text-xs transition shadow-md shadow-blue-600/30"
                        >
                          Submit Answer & Verify
                        </button>
                      </div>
                    ) : (
                      <div className="p-3.5 rounded-xl bg-black/50 border border-slate-800 space-y-2 text-xs">
                        {fb?.isCorrect ? (
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                              <span>Correct! {fb.firstTime ? '+50 XP awarded to your profile!' : '(Competency already verified)'}</span>
                            </div>
                            <p className="text-[11px] text-slate-300 pl-6 leading-relaxed">{q.explanation}</p>
                          </div>
                        ) : (
                          <div className="space-y-1.5 text-rose-300">
                            <div className="flex items-center gap-2 font-bold text-xs">
                              <XCircle className="w-4 h-4 shrink-0 text-rose-400" />
                              <span>Incorrect Choice! 0 XP Awarded.</span>
                            </div>
                            <p className="text-[11px] text-slate-300 pl-6 leading-relaxed">
                              <strong className="text-white">Correct Answer: </strong>{q.options[q.correctIndex]}
                            </p>
                            <p className="text-[11px] text-slate-400 pl-6 leading-relaxed">{q.explanation}</p>
                            <p className="text-[11px] text-amber-400 pl-6 font-semibold">
                              ⚠️ The Adaptive Agent detected a conceptual gap and updated your telemetry!
                            </p>
                          </div>
                        )}

                        <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                          <button
                            onClick={() => handleMilestoneQuizReset(milestone.id)}
                            className="text-[11px] text-slate-400 hover:text-white underline"
                          >
                            Try Question Again
                          </button>
                          <button
                            onClick={() => setActiveTab('practice')}
                            className="text-[11px] text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1"
                          >
                            <span>Open 28+ Diagnostic Questions in Lab</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })()}

              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl bg-black/40 border border-slate-800 text-xs gap-3">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">{milestone.resource.title}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 capitalize">
                      {milestone.resource.type}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 block">
                    Source: {milestone.resource.source} &bull; {milestone.resource.whyRecommended}
                  </span>
                </div>
                <a
                  href={milestone.resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 font-semibold text-xs transition border border-blue-500/30 shrink-0 self-start sm:self-auto"
                >
                  <span>Open Official Docs</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
