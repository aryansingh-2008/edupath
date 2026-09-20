'use client';

import React, { useState } from 'react';
import { useEduPath } from '../store/useEduPathStore';
import { Skill } from '../types';
import {
  Layers,
  FileCheck,
  ShieldCheck,
  Info,
  Table as TableIcon
} from 'lucide-react';

export const SkillMapView: React.FC = () => {
  const { profile, setActiveTab } = useEduPath();
  const [selectedSkill, setSelectedSkill] = useState<Skill>(profile.skills[3]); // Default to SQL
  const [viewMode, setViewMode] = useState<'constellation' | 'list'>('constellation');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const filteredSkills = profile.skills.filter(s => {
    if (filterCategory === 'all') return true;
    return s.category === filterCategory;
  });

  return (
    <div className="space-y-6">
      {/* HEADER CONTROLS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Layers className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">
              Skill Constellation &amp; Capability Map
            </span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Dual-Layer Competency Topology
          </h2>
          <p className="text-xs text-slate-400">
            Comparing verified capabilities against target benchmark for <strong>{profile.targetRole}</strong>.
          </p>
        </div>

        {/* CONTROLS */}
        <div className="flex items-center gap-2">
          {/* CATEGORY FILTER */}
          <select
            value={filterCategory}
            onChange={e => setFilterCategory(e.target.value)}
            className="bg-[#111827] border border-slate-800 text-xs text-slate-300 rounded-xl px-3 py-2 outline-none focus:border-blue-500"
          >
            <option value="all">All Domains</option>
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="database">Database</option>
            <option value="architecture">Architecture</option>
            <option value="devops">DevOps</option>
          </select>

          {/* VIEW MODE TOGGLE */}
          <div className="flex items-center bg-[#111827] border border-slate-800 p-1 rounded-xl">
            <button
              onClick={() => setViewMode('constellation')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                viewMode === 'constellation' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Constellation
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-1 ${
                viewMode === 'list' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              <TableIcon className="w-3 h-3" />
              List
            </button>
          </div>
        </div>
      </div>

      {/* CONSTELLATION GRAPH & DETAIL MODAL SPLIT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* LEFT / TOP: INTERACTIVE MAP OR LIST (8 cols) */}
        <div className="lg:col-span-8 bg-[#0f172a] rounded-2xl p-6 border border-slate-800 shadow-xl flex flex-col justify-between min-h-[480px]">

          {viewMode === 'constellation' ? (
            <div className="space-y-6 flex-1 flex flex-col justify-between">
              {/* TOP LEGEND */}
              <div className="flex flex-wrap items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-3 gap-2">
                <span className="font-semibold text-slate-300">Constellation Nodes:</span>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                    <span>Strong (&gt;75%)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                    <span>Developing</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                    <span>Critical Gap</span>
                  </div>
                </div>
              </div>

              {/* INTERACTIVE NODES GRID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-auto py-4">
                {filteredSkills.map(skill => {
                  const isSelected = selectedSkill.id === skill.id;
                  let colorClass = 'border-emerald-500/40 bg-emerald-950/20 text-emerald-300';
                  let glowBadge = 'bg-emerald-500';

                  if (skill.status === 'developing') {
                    colorClass = 'border-blue-500/40 bg-blue-950/20 text-blue-300';
                    glowBadge = 'bg-blue-500';
                  } else if (skill.status === 'gap') {
                    colorClass = 'border-rose-500/40 bg-rose-950/20 text-rose-300';
                    glowBadge = 'bg-rose-500 animate-pulse';
                  }

                  return (
                    <div
                      key={skill.id}
                      onClick={() => setSelectedSkill(skill)}
                      className={`cursor-pointer p-4 rounded-xl border transition-all relative overflow-hidden ${
                        isSelected
                          ? 'border-blue-400 bg-blue-900/30 ring-2 ring-blue-500/50 shadow-lg shadow-blue-500/20 scale-[1.02]'
                          : `${colorClass} hover:border-slate-600 hover:bg-white/5`
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-white">{skill.name}</span>
                        <span className={`w-2 h-2 rounded-full ${glowBadge}`}></span>
                      </div>

                      <div className="space-y-1 text-[11px] text-slate-400">
                        <div className="flex justify-between">
                          <span>Learner Level</span>
                          <span className="font-bold text-white">{Math.round(skill.estimatedLevel * 100)}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Target Required</span>
                          <span className="font-bold text-slate-300">{Math.round(skill.targetBenchmark * 100)}%</span>
                        </div>
                      </div>

                      {/* PROGRESS BAR */}
                      <div className="mt-3 w-full h-1.5 rounded-full bg-slate-800 overflow-hidden relative">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                          style={{ width: `${skill.estimatedLevel * 100}%` }}
                        ></div>
                        <div
                          className="absolute top-0 bottom-0 w-0.5 bg-white"
                          style={{ left: `${skill.targetBenchmark * 100}%` }}
                        ></div>
                      </div>

                      <div className="mt-2.5 flex items-center justify-between text-[10px] text-slate-500">
                        <span>Confidence: {Math.round(skill.confidence * 100)}%</span>
                        <span className="text-blue-400 font-medium">Inspect &rarr;</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* FOOTER NOTE */}
              <div className="p-3 rounded-xl bg-black/30 border border-slate-800/80 text-xs text-slate-400 flex items-center gap-2">
                <Info className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Click any node to review evidence excerpts, confidence breakdown, and targeted roadmap actions.</span>
              </div>
            </div>
          ) : (
            /* ACCESSIBLE TABLE VIEW */
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="pb-3 font-semibold">Skill Name</th>
                    <th className="pb-3 font-semibold">Category</th>
                    <th className="pb-3 font-semibold">Current</th>
                    <th className="pb-3 font-semibold">Required</th>
                    <th className="pb-3 font-semibold">Status</th>
                    <th className="pb-3 font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredSkills.map(skill => (
                    <tr
                      key={skill.id}
                      onClick={() => setSelectedSkill(skill)}
                      className="hover:bg-white/5 cursor-pointer transition"
                    >
                      <td className="py-3 font-bold text-white">{skill.name}</td>
                      <td className="py-3 text-slate-400 capitalize">{skill.category}</td>
                      <td className="py-3 font-semibold text-blue-400">{Math.round(skill.estimatedLevel * 100)}%</td>
                      <td className="py-3 text-slate-300">{Math.round(skill.targetBenchmark * 100)}%</td>
                      <td className="py-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          skill.status === 'gap' ? 'bg-rose-500/20 text-rose-300' : 'bg-blue-500/20 text-blue-300'
                        }`}>
                          {skill.status}
                        </span>
                      </td>
                      <td className="py-3 text-blue-400 font-medium">Inspect</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </div>

        {/* RIGHT: EVIDENCE INSPECTOR DRAWER (4 cols) */}
        <div className="lg:col-span-4 bg-[#0f172a] rounded-2xl p-6 border border-slate-800 shadow-xl space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Skill Evidence Card
            </span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
              Confidence {Math.round(selectedSkill.confidence * 100)}%
            </span>
          </div>

          <div>
            <h3 className="text-xl font-bold text-white">{selectedSkill.name}</h3>
            <span className="text-xs text-slate-400 capitalize">Domain: {selectedSkill.category}</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-black/20 border border-slate-800">
              <span className="text-[10px] text-slate-500 block">Learner Capability</span>
              <span className="text-lg font-bold text-white">{Math.round(selectedSkill.estimatedLevel * 100)}%</span>
            </div>
            <div className="p-3 rounded-xl bg-black/20 border border-slate-800">
              <span className="text-[10px] text-slate-500 block">Role Benchmark</span>
              <span className="text-lg font-bold text-blue-400">{Math.round(selectedSkill.targetBenchmark * 100)}%</span>
            </div>
          </div>

          {/* VERBATIM EVIDENCE LOG */}
          <div className="space-y-2.5">
            <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <FileCheck className="w-3.5 h-3.5 text-emerald-400" />
              Verifiable Evidence Sources
            </span>

            <div className="space-y-2">
              {selectedSkill.evidence.map((ev, i) => (
                <div key={i} className="p-3 rounded-xl bg-black/30 border border-slate-800/80 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold text-slate-400">{ev.source}</span>
                    {ev.verified ? (
                      <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-semibold">
                        <ShieldCheck className="w-3 h-3" /> Verified
                      </span>
                    ) : (
                      <span className="text-[10px] text-amber-400 font-semibold">Self-Reported</span>
                    )}
                  </div>
                  <p className="text-slate-300 italic text-[11px] leading-relaxed">&ldquo;{ev.quote}&rdquo;</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA TO WORK ON THIS SKILL */}
          <div className="pt-3 border-t border-slate-800 space-y-2">
            <button
              onClick={() => setActiveTab('path')}
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition shadow-md shadow-blue-600/30"
            >
              View Roadmap Milestones for {selectedSkill.name}
            </button>
            <button
              onClick={() => setActiveTab('practice')}
              className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-xs transition border border-slate-700"
            >
              Launch Practice Quiz
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
