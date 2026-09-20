'use client';

import React, { useState } from 'react';
import { useEduPath } from '../store/useEduPathStore';
import { generateCustomLearnerProfile, ROLE_BENCHMARKS } from '../lib/agents/customPathGenerator';
import { Sparkles, X, User, Briefcase, Code, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export const CustomProfileModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { setCustomProfileAndRoadmap, setActiveTab } = useEduPath();
  const [userName, setUserName] = useState('');
  const [targetRole, setTargetRole] = useState('Full Stack Developer');
  const [skillsText, setSkillsText] = useState('');
  const [timeCommitment, setTimeCommitment] = useState(30);

  if (!isOpen) return null;

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim()) {
      alert('Please enter your name!');
      return;
    }

    const { profile, roadmap } = generateCustomLearnerProfile(
      userName,
      targetRole,
      skillsText,
      timeCommitment
    );

    // Update global store with custom profile and custom roadmap
    setCustomProfileAndRoadmap(profile, roadmap);
    setActiveTab('overview');

    try {
      confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });
    } catch {}

    onClose();
  };

  const presetExamples = [
    { label: 'Python + SQL Learner', skills: 'Python, SQL, Basic Excel', role: 'Data Scientist' },
    { label: 'Frontend Transitioner', skills: 'HTML, CSS, JavaScript, React', role: 'Full Stack Developer' },
    { label: 'AI/ML Enthusiast', skills: 'Python, Linear Algebra, PyTorch Basics', role: 'AI / ML Engineer' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#0f172a] border border-blue-500/40 rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl space-y-6 relative overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Create YOUR Custom Learning Path</h3>
              <p className="text-[11px] text-slate-400">Enter your actual skills to see EduPath analyze your real gaps.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleGenerate} className="space-y-4 text-xs">
          
          <div className="space-y-1.5">
            <label className="font-semibold text-slate-300 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-blue-400" />
              <span>Your Name</span>
            </label>
            <input
              type="text"
              value={userName}
              onChange={e => setUserName(e.target.value)}
              placeholder="e.g. Pranav / Rahul / Priya"
              className="w-full bg-black/40 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white placeholder:text-slate-600 outline-none focus:border-blue-500 transition text-xs"
              required
            />
          </div>

          
          <div className="space-y-1.5">
            <label className="font-semibold text-slate-300 flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-indigo-400" />
              <span>Target Career Role</span>
            </label>
            <select
              value={targetRole}
              onChange={e => setTargetRole(e.target.value)}
              className="w-full bg-black/40 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-blue-500 transition text-xs"
            >
              {Object.keys(ROLE_BENCHMARKS).map(r => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="font-semibold text-slate-300 flex items-center gap-1.5">
                <Code className="w-3.5 h-3.5 text-emerald-400" />
                <span>Skills You Already Know (Comma-separated)</span>
              </label>
            </div>
            <textarea
              value={skillsText}
              onChange={e => setSkillsText(e.target.value)}
              placeholder="e.g. Python, SQL, Git, HTML, C++"
              rows={3}
              className="w-full bg-black/40 border border-slate-800 rounded-xl p-3 text-white placeholder:text-slate-600 outline-none focus:border-blue-500 transition text-xs leading-relaxed"
            />

            
            <div className="flex flex-wrap gap-1.5 pt-1">
              <span className="text-[10px] text-slate-500 py-0.5">Quick Presets:</span>
              {presetExamples.map((ex, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    setSkillsText(ex.skills);
                    setTargetRole(ex.role);
                  }}
                  className="px-2 py-0.5 rounded bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[10px] text-slate-300 transition"
                >
                  {ex.label}
                </button>
              ))}
            </div>
          </div>

          
          <div className="space-y-1.5">
            <label className="font-semibold text-slate-300 block">Daily Study Time</label>
            <div className="grid grid-cols-3 gap-2">
              {[15, 30, 60].map(mins => (
                <button
                  key={mins}
                  type="button"
                  onClick={() => setTimeCommitment(mins)}
                  className={`py-2 rounded-xl border text-xs font-semibold transition ${
                    timeCommitment === mins
                      ? 'border-blue-500 bg-blue-900/30 text-white'
                      : 'border-slate-800 bg-black/30 text-slate-400 hover:bg-white/5'
                  }`}
                >
                  {mins} min/day
                </button>
              ))}
            </div>
          </div>

          
          <div className="pt-3 border-t border-slate-800">
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition"
            >
              <span>Analyze My Gaps &amp; Build My Path</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
