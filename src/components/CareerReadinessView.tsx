'use client';

import React from 'react';
import { useEduPath } from '../store/useEduPathStore';
import { Award, ShieldCheck, AlertTriangle, ArrowRight } from 'lucide-react';

export const CareerReadinessView: React.FC = () => {
  const { profile, setActiveTab } = useEduPath();

  const skillCoverage = Math.round(
    (profile.skills.filter(s => s.estimatedLevel >= s.targetBenchmark).length / profile.skills.length) * 100
  );

  const evidenceCoverage = Math.round(
    (profile.skills.filter(s => s.evidence.some(e => e.verified)).length / profile.skills.length) * 100
  );

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Award className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">
              Career Readiness Radar
            </span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Transparent Role Competency Scorecard
          </h2>
          <p className="text-xs text-slate-400">
            Empirical evidence breakdown toward <strong>{profile.targetRole}</strong> hiring thresholds.
          </p>
        </div>

        <span className="px-3 py-1.5 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-semibold self-start sm:self-auto">
          Audit: Evidence-Backed Model
        </span>
      </div>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#0f172a] border border-slate-800 shadow-lg space-y-2">
          <span className="text-xs font-semibold text-slate-400 uppercase">Overall Readiness</span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-white">{profile.readinessPercentage}%</span>
            <span className="text-xs text-emerald-400 font-bold">+12% this week</span>
          </div>
          <p className="text-[11px] text-slate-500">Composite score of verified skills, practice accuracy, and projects.</p>
        </div>

        <div className="p-5 rounded-2xl bg-[#0f172a] border border-slate-800 shadow-lg space-y-2">
          <span className="text-xs font-semibold text-slate-400 uppercase">Skill Coverage</span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-blue-400">{skillCoverage}%</span>
            <span className="text-xs text-slate-400">of core role criteria</span>
          </div>
          <p className="text-[11px] text-slate-500">Skills meeting or exceeding the industry target benchmark.</p>
        </div>

        <div className="p-5 rounded-2xl bg-[#0f172a] border border-slate-800 shadow-lg space-y-2">
          <span className="text-xs font-semibold text-slate-400 uppercase">Evidence Coverage</span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-indigo-400">{evidenceCoverage}%</span>
            <span className="text-xs text-slate-400">verified proof</span>
          </div>
          <p className="text-[11px] text-slate-500">Claims substantiated by code repositories or passed diagnostic quizzes.</p>
        </div>

        <div className="p-5 rounded-2xl bg-[#0f172a] border border-slate-800 shadow-lg space-y-2">
          <span className="text-xs font-semibold text-slate-400 uppercase">Remaining Gaps</span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-rose-400">2</span>
            <span className="text-xs text-rose-300 font-semibold">Critical blockers</span>
          </div>
          <p className="text-[11px] text-slate-500">SQL &amp; Relational DB, System Design &amp; Scalability.</p>
        </div>
      </div>

      
      <div className="bg-[#0f172a] rounded-2xl p-6 border border-slate-800 shadow-xl space-y-4">
        <h3 className="font-bold text-base text-white">Capability Verification Ledger</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400">
                <th className="pb-3 font-semibold">Skill Requirement</th>
                <th className="pb-3 font-semibold">Your Level</th>
                <th className="pb-3 font-semibold">Target Benchmark</th>
                <th className="pb-3 font-semibold">Evidence Status</th>
                <th className="pb-3 font-semibold">Hiring Impact</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {profile.skills.map(s => (
                <tr key={s.id} className="hover:bg-white/5 transition">
                  <td className="py-3.5 font-bold text-white">{s.name}</td>
                  <td className="py-3.5 font-semibold text-blue-400">{Math.round(s.estimatedLevel * 100)}%</td>
                  <td className="py-3.5 text-slate-300">{Math.round(s.targetBenchmark * 100)}%</td>
                  <td className="py-3.5">
                    {s.evidence.some(e => e.verified) ? (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 flex items-center gap-1 w-fit">
                        <ShieldCheck className="w-3 h-3" /> Demonstrated
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-400 w-fit">
                        Claimed (Unverified)
                      </span>
                    )}
                  </td>
                  <td className="py-3.5">
                    {s.status === 'gap' ? (
                      <span className="text-rose-400 font-bold flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" /> Critical Blocker
                      </span>
                    ) : (
                      <span className="text-emerald-400 font-medium">Ready</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pt-3 border-t border-slate-800 flex justify-end">
          <button
            onClick={() => setActiveTab('path')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition shadow-md shadow-blue-600/30"
          >
            <span>Execute Next Roadmap Mission</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
