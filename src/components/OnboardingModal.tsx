'use client';

import React, { useState } from 'react';
import { useEduPath } from '../store/useEduPathStore';
import { generateCustomLearnerProfile } from '../lib/agents/customPathGenerator';
import {
  X,
  ArrowRight,
  ArrowLeft,
  UploadCloud,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export const OnboardingModal: React.FC = () => {
  const { profile, isOnboardingOpen, setIsOnboardingOpen, setActiveTab, setCustomProfileAndRoadmap } = useEduPath();

  const [step, setStep] = useState<number>(1);
  const [targetRole, setTargetRole] = useState<string>('Full Stack Developer');
  const [experienceLevel, setExperienceLevel] = useState<string>('Junior (1-2 yrs)');
  const [learningStyle, setLearningStyle] = useState<string>('Coding & Projects');
  const [timeCommitment, setTimeCommitment] = useState<string>('30 min/day');
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisFinished, setAnalysisFinished] = useState<boolean>(false);

  if (!isOnboardingOpen) return null;

  const roles = [
    'Full Stack Developer',
    'Frontend Developer',
    'Data Scientist',
    'AI / ML Engineer',
    'Cloud Solutions Architect',
    'DevOps Engineer'
  ];

  const experienceOptions = [
    'Student / Final Year',
    'Junior (1-2 yrs)',
    'Mid-Level Professional',
    'Career Switcher'
  ];

  const styleOptions = [
    'Coding & Projects',
    'Video Walkthroughs',
    'Official Documentation',
    'Mixed Adaptive'
  ];

  const timeOptions = [
    '15 min/day',
    '30 min/day',
    '1 hour/day',
    '2 hours/day'
  ];

  const handleSimulateUpload = () => {
    setIsAnalyzing(true);
    setUploadProgress(10);

    setTimeout(() => setUploadProgress(35), 400);
    setTimeout(() => setUploadProgress(70), 800);
    setTimeout(() => {
      setUploadProgress(100);
      setIsAnalyzing(false);
      setAnalysisFinished(true);
    }, 1200);
  };

  const handleFinish = () => {
    const { profile: newProfile, roadmap: newRoadmap } = generateCustomLearnerProfile(
      profile.name || 'Learner',
      targetRole,
      '',
      parseInt(timeCommitment) || 30
    );
    newProfile.experienceLevel = experienceLevel;
    newProfile.learningPreference = learningStyle;
    setCustomProfileAndRoadmap(newProfile, newRoadmap);
    setIsOnboardingOpen(false);
    setActiveTab('overview');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#0f172a] border border-slate-800 rounded-2xl max-w-xl w-full p-6 md:p-8 shadow-2xl space-y-6 relative overflow-hidden">
        
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">
              Step {step} of 5
            </span>
            <span className="text-slate-600">&bull;</span>
            <span className="text-xs text-slate-400">Career Onboarding Wizard</span>
          </div>
          <button
            onClick={() => setIsOnboardingOpen(false)}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* STEP 1: TARGET ROLE */}
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white tracking-tight">
              What role are you working toward?
            </h3>
            <p className="text-xs text-slate-400">
              EduPath will benchmark your current skills against industry competencies for this target.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
              {roles.map(r => (
                <button
                  key={r}
                  onClick={() => setTargetRole(r)}
                  className={`p-3.5 rounded-xl border text-xs font-semibold text-left transition ${
                    targetRole === r
                      ? 'border-blue-500 bg-blue-900/30 text-white ring-1 ring-blue-500/40'
                      : 'border-slate-800 bg-black/20 text-slate-300 hover:bg-white/5'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: EXPERIENCE LEVEL */}
        {step === 2 && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white tracking-tight">
              Where are you right now in your journey?
            </h3>
            <p className="text-xs text-slate-400">
              Helps calibrate the initial difficulty and pacing of your roadmap.
            </p>

            <div className="space-y-2.5 pt-2">
              {experienceOptions.map(exp => (
                <button
                  key={exp}
                  onClick={() => setExperienceLevel(exp)}
                  className={`w-full p-3.5 rounded-xl border text-xs font-semibold text-left transition flex items-center justify-between ${
                    experienceLevel === exp
                      ? 'border-blue-500 bg-blue-900/30 text-white ring-1 ring-blue-500/40'
                      : 'border-slate-800 bg-black/20 text-slate-300 hover:bg-white/5'
                  }`}
                >
                  <span>{exp}</span>
                  {experienceLevel === exp && <CheckCircle2 className="w-4 h-4 text-blue-400" />}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 3: LEARNING PREFERENCE */}
        {step === 3 && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white tracking-tight">
              How do you absorb information best?
            </h3>
            <p className="text-xs text-slate-400">
              Resource recommendations will prioritize your preferred medium.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
              {styleOptions.map(style => (
                <button
                  key={style}
                  onClick={() => setLearningStyle(style)}
                  className={`p-3.5 rounded-xl border text-xs font-semibold text-left transition ${
                    learningStyle === style
                      ? 'border-blue-500 bg-blue-900/30 text-white ring-1 ring-blue-500/40'
                      : 'border-slate-800 bg-black/20 text-slate-300 hover:bg-white/5'
                  }`}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 4: TIME COMMITMENT */}
        {step === 4 && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white tracking-tight">
              How much time can you realistically commit?
            </h3>
            <p className="text-xs text-slate-400">
              EduPath sizes daily missions so you make steady progress without burnout.
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2">
              {timeOptions.map(time => (
                <button
                  key={time}
                  onClick={() => setTimeCommitment(time)}
                  className={`p-4 rounded-xl border text-xs font-semibold text-center transition ${
                    timeCommitment === time
                      ? 'border-blue-500 bg-blue-900/30 text-white ring-1 ring-blue-500/40'
                      : 'border-slate-800 bg-black/20 text-slate-300 hover:bg-white/5'
                  }`}
                >
                  <span className="text-base font-bold block text-white mb-1">{time}</span>
                  <span className="text-[10px] text-slate-400">Sustainable Pace</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 5: RESUME INTAKE & AGENT ANALYSIS */}
        {step === 5 && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white tracking-tight">
              Upload Resume or Portfolio
            </h3>
            <p className="text-xs text-slate-400">
              Profile Agent will parse your capabilities and extract evidence quotes.
            </p>

            {!analysisFinished ? (
              <div
                onClick={handleSimulateUpload}
                className="border-2 border-dashed border-slate-700 hover:border-blue-500 rounded-2xl p-8 text-center cursor-pointer transition bg-black/20 hover:bg-white/5 space-y-3"
              >
                <div className="w-12 h-12 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center mx-auto">
                  <UploadCloud className="w-6 h-6" />
                </div>
                <div>
                  <span className="font-bold text-sm text-white block">
                    {isAnalyzing ? 'Analyzing Resume...' : 'Drop your resume or click to upload'}
                  </span>
                  <span className="text-xs text-slate-500">PDF, DOCX, or TXT supported (Max 5MB)</span>
                </div>

                {isAnalyzing && (
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mt-3">
                    <div
                      className="bg-blue-600 h-full transition-all duration-300 rounded-full"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/40 space-y-3 text-xs">
                <div className="flex items-center gap-2 font-bold text-emerald-300">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Profile Agent: Extraction Completed!</span>
                </div>
                <div className="space-y-1 text-slate-300 font-mono text-[11px]">
                  <div>✓ 6 Core Skills Extracted with Evidence</div>
                  <div>✓ Target Role: {targetRole}</div>
                  <div>✓ Critical Gaps Flagged: SQL, System Design</div>
                  <div>✓ Baseline Roadmap DAG Generated</div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* FOOTER NAVIGATION */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-800">
          {step > 1 ? (
            <button
              onClick={() => setStep(prev => prev - 1)}
              className="flex items-center gap-1 text-xs font-semibold text-slate-400 hover:text-white transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>
          ) : (
            <div></div>
          )}

          {step < 5 ? (
            <button
              onClick={() => setStep(prev => prev + 1)}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition shadow-md shadow-blue-600/30"
            >
              <span>Next</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleFinish}
              className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition shadow-md shadow-emerald-600/30"
            >
              <Sparkles className="w-4 h-4" />
              <span>Launch Learning Path</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
