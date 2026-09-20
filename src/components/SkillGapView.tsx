'use client';

import React from 'react';
import { useEduPath } from '../store/useEduPathStore';
import { AlertTriangle, ArrowRight, CheckCircle2, Sparkles, Award } from 'lucide-react';
import { SkillGap } from '../types';

export const SkillGapView: React.FC = () => {
  const { profile, setActiveTab, setIsCustomModalOpen } = useEduPath();

  // Compute gaps
  const gaps: SkillGap[] = profile.skills
    .filter(s => s.targetBenchmark > s.estimatedLevel)
    .map(s => {
      const gapDelta = s.targetBenchmark - s.estimatedLevel;
      let priority: SkillGap['priority'] = 'medium';
      let why = 'Relevant for general engineering workflows.';
      let nextAction = 'Review documentation and solve introductory exercises.';

      if (s.name.toLowerCase().includes('sql')) {
        priority = 'critical';
        why = 'Required by 8 of 10 competency frameworks. Blocker for backend persistence, joins, and authentication.';
        nextAction = 'Complete Week 1 SQL Foundations & JOINs Roadmap Module';
      } else if (s.name.toLowerCase().includes('system design')) {
        priority = 'critical';
        why = 'Required for scalability interviews, Redis caching, and production cloud architecture.';
        nextAction = 'Study System Design Primer & Caching Strategies';
      } else if (s.name.toLowerCase().includes('vector') || s.name.toLowerCase().includes('deep learning')) {
        priority = 'critical';
        why = 'Core technical pillar for AI/ML engineering, embeddings, and RAG architectures.';
        nextAction = 'Complete pgvector & Semantic Search milestones';
      } else if (s.name.toLowerCase().includes('pandas') || s.name.toLowerCase().includes('machine learning')) {
        priority = 'critical';
        why = 'Primary foundation for statistical modeling and predictive pipelines.';
        nextAction = 'Complete Week 1 Pandas Data Wrangling module';
      } else if (s.name.toLowerCase().includes('node') || s.name.toLowerCase().includes('api')) {
        priority = 'high';
        why = 'Essential for server-side business logic and RESTful endpoints.';
        nextAction = 'Build backend Express router and database connection pool.';
      } else if (s.name.toLowerCase().includes('docker')) {
        priority = 'medium';
        why = 'Ensures local development consistency and containerized deployment.';
        nextAction = 'Containerize local service stack with Docker Compose.';
      }

      return {
        skillId: s.id,
        name: s.name,
        currentLevel: Math.round(s.estimatedLevel * 100),
        requiredLevel: Math.round(s.targetBenchmark * 100),
        gapDelta: Math.round(gapDelta * 100),
        priority,
        whyItMatters: why,
        evidenceSummary: s.evidence.map(e => e.quote).join(' '),
        nextAction
      };
    })
    .sort((a, b) => {
      const priorityWeights: Record<SkillGap['priority'], number> = {
        critical: 0,
        high: 1,
        medium: 2,
        low: 3
      };
      return priorityWeights[a.priority] - priorityWeights[b.priority] || b.gapDelta - a.gapDelta;
    });

  const verifiedSkills = profile.skills.filter(s => s.estimatedLevel >= 0.50);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
              Skill Intelligence &amp; Readiness
            </span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Skill Gaps &amp; Career Readiness
          </h2>
          <p className="text-xs text-slate-400">
            Evaluating your current skills against industry hiring benchmarks for <strong>{profile.targetRole}</strong>.
          </p>
        </div>

        <button
          onClick={() => setIsCustomModalOpen(true)}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition shadow-md shadow-blue-600/20 self-start sm:self-auto"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Edit Skills / Target Role</span>
        </button>
      </div>

      {/* OVERALL READINESS SCORE CARD */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#0f172a] via-[#131d36] to-[#0f172a] border border-blue-500/30 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
              <Award className="w-4 h-4 text-blue-400" />
              Overall Career Readiness Score
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-extrabold text-white tracking-tight">
                {profile.readinessPercentage}%
              </span>
              <span className="text-xs text-slate-400 font-medium">/ 100% Industry Benchmark</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-3 py-2 rounded-xl bg-black/40 border border-slate-800 text-center">
              <span className="text-[10px] text-slate-500 uppercase font-bold block">Critical Gaps</span>
              <span className="text-base font-bold text-amber-400">
                {gaps.filter(g => g.priority === 'critical').length}
              </span>
            </div>
            <div className="px-3 py-2 rounded-xl bg-black/40 border border-slate-800 text-center">
              <span className="text-[10px] text-slate-500 uppercase font-bold block">Verified Skills</span>
              <span className="text-base font-bold text-emerald-400">
                {verifiedSkills.length}
              </span>
            </div>
          </div>
        </div>

        {/* PROGRESS BAR */}
        <div className="w-full bg-slate-900 h-3 rounded-full overflow-hidden border border-slate-800">
          <div
            className="h-full bg-gradient-to-r from-blue-600 via-indigo-500 to-emerald-500 transition-all duration-500"
            style={{ width: `${profile.readinessPercentage}%` }}
          ></div>
        </div>

        <p className="text-xs text-slate-300">
          EduPath has generated a personalized weekly roadmap to close your remaining {gaps.length} skill gaps and boost your readiness to 90%+.
        </p>
      </div>

      {/* TWO COLUMNS: GAPS VS VERIFIED SKILLS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* COLUMN 1: SKILL GAPS (WHAT YOU NEED) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>Skills You Need ({gaps.length} Gaps)</span>
            </h3>
            <span className="text-[11px] text-slate-500 font-medium">Ranked by hiring priority</span>
          </div>

          <div className="space-y-3">
            {gaps.map((gap, idx) => {
              const isCritical = gap.priority === 'critical';

              return (
                <div
                  key={idx}
                  className={`p-4 rounded-xl border text-xs space-y-2.5 transition ${
                    isCritical
                      ? 'bg-amber-950/20 border-amber-500/40 shadow-sm'
                      : 'bg-[#0f172a] border-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-white">{gap.name}</span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        isCritical
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                      }`}
                    >
                      {gap.priority}
                    </span>
                  </div>

                  {/* PROFICIENCY COMPARISON */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] text-slate-400">
                      <span>Current: {gap.currentLevel}%</span>
                      <span>Target: {gap.requiredLevel}%</span>
                    </div>
                    <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${isCritical ? 'bg-amber-500' : 'bg-blue-500'}`}
                        style={{ width: `${gap.currentLevel}%` }}
                      ></div>
                    </div>
                  </div>

                  <p className="text-slate-300 leading-snug">{gap.whyItMatters}</p>

                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                    <span className="text-blue-400 font-medium">Next: {gap.nextAction}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* COLUMN 2: VERIFIED SKILLS (WHAT YOU HAVE) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Skills You Already Have ({verifiedSkills.length})</span>
            </h3>
            <span className="text-[11px] text-slate-500 font-medium">Verified baseline</span>
          </div>

          <div className="space-y-3">
            {verifiedSkills.map((skill, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-[#0f172a] border border-slate-800 text-xs space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-white">{skill.name}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {Math.round(skill.estimatedLevel * 100)}% Mastered
                  </span>
                </div>

                <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500"
                    style={{ width: `${Math.round(skill.estimatedLevel * 100)}%` }}
                  ></div>
                </div>

                {skill.evidence[0] && (
                  <p className="text-slate-400 italic text-[11px]">
                    &ldquo;{skill.evidence[0].quote}&rdquo;
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* ROADMAP ACTION CARD */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-900/30 via-indigo-900/20 to-transparent border border-blue-500/30 space-y-3 mt-6">
            <h4 className="font-bold text-white text-sm">Ready to close your skill gaps?</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Your weekly roadmap has prioritized your critical gaps into digestible daily missions with verified documentation links.
            </p>
            <button
              onClick={() => setActiveTab('path')}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition shadow-md shadow-blue-600/25"
            >
              <span>Go to My Learning Roadmap</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
