'use client';

import React, { useState } from 'react';
import { useEduPath } from '../store/useEduPathStore';
import { SQL_PRACTICE_QUESTIONS } from '../data/seedData';
import {
  FileCode2,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  ArrowRight,
  Zap,
  RotateCcw
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const PracticeLabView: React.FC = () => {
  const {
    simulateSqlStruggle,
    simulateTaskCompletion,
    bottleneckDetected,
    setIsWhyPlanChangedModalOpen
  } = useEduPath();

  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [sessionSummary, setSessionSummary] = useState<boolean>(false);
  const [resultsHistory, setResultsHistory] = useState<Array<{ id: string; correct: boolean }>>([]);

  const currentQ = SQL_PRACTICE_QUESTIONS[questionIndex] || SQL_PRACTICE_QUESTIONS[0];

  const handleSubmit = () => {
    if (selectedOption === null) return;
    setSubmitted(true);

    const isCorrect = selectedOption === currentQ.correctIndex;
    setResultsHistory(prev => [...prev, { id: currentQ.id, correct: isCorrect }]);

    if (isCorrect) {
      try {
        confetti({ particleCount: 50, spread: 50, origin: { y: 0.7 } });
      } catch {}
      simulateTaskCompletion();
    } else {
      // If user fails twice, trigger real-time adaptive bottleneck
      const failedCount = resultsHistory.filter(r => !r.correct).length + 1;
      if (failedCount >= 2 && !bottleneckDetected) {
        simulateSqlStruggle();
      }
    }
  };

  const handleNext = () => {
    if (questionIndex < SQL_PRACTICE_QUESTIONS.length - 1) {
      setQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setSubmitted(false);
      setShowHint(false);
    } else {
      setSessionSummary(true);
    }
  };

  const resetPractice = () => {
    setQuestionIndex(0);
    setSelectedOption(null);
    setSubmitted(false);
    setShowHint(false);
    setSessionSummary(false);
    setResultsHistory([]);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <FileCode2 className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">
              Diagnostic Practice Lab
            </span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Adaptive Skill Validation
          </h2>
          <p className="text-xs text-slate-400">
            Interactive diagnostic evaluations calibrate difficulty to your zone of proximal development.
          </p>
        </div>

        {/* DEMO STRUGGLE SIMULATOR BUTTON */}
        <button
          onClick={simulateSqlStruggle}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-950/60 hover:bg-rose-900/60 border border-rose-500/40 text-rose-300 text-xs font-bold transition shadow-sm self-start sm:self-auto"
          title="Simulate 2 failed attempts to trigger Adaptive Planner instantly"
        >
          <Zap className="w-3.5 h-3.5 text-rose-400" />
          <span>Simulate SQL Struggle (Demo)</span>
        </button>
      </div>

      {!sessionSummary ? (
        /* QUESTION CARD */
        <div className="bg-[#0f172a] rounded-2xl p-6 md:p-8 border border-slate-800 shadow-2xl space-y-6">
          {/* STEP & DIFFICULTY INDICATOR */}
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                Question {questionIndex + 1} of {SQL_PRACTICE_QUESTIONS.length}
              </span>
              <span className="text-xs text-slate-500">&bull;</span>
              <span className="text-xs text-slate-400 font-medium">Domain: {currentQ.skillName}</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                {currentQ.difficulty}
              </span>
              <span className="text-xs text-amber-400 font-semibold">+50 XP</span>
            </div>
          </div>

          {/* QUESTION PROMPT */}
          <div className="space-y-3">
            <h3 className="text-base md:text-lg font-semibold text-white leading-relaxed whitespace-pre-line">
              {currentQ.prompt}
            </h3>
          </div>

          {/* OPTIONS LIST */}
          <div className="space-y-3">
            {currentQ.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              let optionStyle = 'border-slate-800 bg-black/20 text-slate-200 hover:border-slate-700 hover:bg-white/5';

              if (submitted) {
                if (idx === currentQ.correctIndex) {
                  optionStyle = 'border-emerald-500 bg-emerald-950/40 text-emerald-200 font-semibold';
                } else if (isSelected && idx !== currentQ.correctIndex) {
                  optionStyle = 'border-rose-500 bg-rose-950/40 text-rose-200';
                } else {
                  optionStyle = 'border-slate-800 bg-black/10 text-slate-500 opacity-60';
                }
              } else if (isSelected) {
                optionStyle = 'border-blue-500 bg-blue-900/30 text-white font-medium ring-1 ring-blue-500/40';
              }

              return (
                <div
                  key={idx}
                  onClick={() => !submitted && setSelectedOption(idx)}
                  className={`p-4 rounded-xl border text-xs md:text-sm cursor-pointer transition-all flex items-start gap-3 ${optionStyle}`}
                >
                  <span className="w-5 h-5 rounded-full border border-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-400 mt-0.5 shrink-0">
                    {['A', 'B', 'C', 'D'][idx]}
                  </span>
                  <span className="leading-relaxed">{opt}</span>
                </div>
              );
            })}
          </div>

          {/* HINT DRAWER */}
          {showHint && !submitted && (
            <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/30 text-xs text-amber-200/90 flex items-start gap-2 animate-in fade-in duration-200">
              <HelpCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span><strong>Hint:</strong> {currentQ.hint}</span>
            </div>
          )}

          {/* POST-SUBMISSION FEEDBACK */}
          {submitted && (
            <div
              className={`p-4 rounded-xl border text-xs space-y-1.5 ${
                selectedOption === currentQ.correctIndex
                  ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                  : 'bg-rose-950/30 border-rose-500/40 text-rose-200'
              }`}
            >
              <div className="flex items-center gap-2 font-bold text-sm">
                {selectedOption === currentQ.correctIndex ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Correct Analysis!</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 text-rose-400" />
                    <span>Incorrect Choice</span>
                  </>
                )}
              </div>
              <p className="leading-relaxed text-slate-300">{currentQ.explanation}</p>
            </div>
          )}

          {/* FOOTER ACTIONS */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-800">
            {!submitted ? (
              <>
                <button
                  onClick={() => setShowHint(!showHint)}
                  className="text-xs text-amber-400 hover:text-amber-300 font-medium flex items-center gap-1"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>{showHint ? 'Hide Hint' : 'Need a Hint?'}</span>
                </button>

                <button
                  onClick={handleSubmit}
                  disabled={selectedOption === null}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold text-xs transition shadow-lg shadow-blue-600/30"
                >
                  Submit &amp; Verify
                </button>
              </>
            ) : (
              <>
                <span className="text-xs text-slate-400">Diagnostic telemetry recorded</span>
                <button
                  onClick={handleNext}
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition shadow-lg shadow-blue-600/30"
                >
                  <span>{questionIndex < SQL_PRACTICE_QUESTIONS.length - 1 ? 'Next Challenge' : 'Complete Session'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        </div>
      ) : (
        /* PRACTICE SESSION AI SUMMARY REPORT */
        <div className="bg-[#0f172a] rounded-2xl p-6 md:p-8 border border-slate-800 shadow-2xl space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Diagnostic Session Debrief</h3>
              <p className="text-xs text-slate-400">AI Telemetry generated by Practice Agent &amp; Progress Agent</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-1">
              <span className="font-bold text-emerald-400 uppercase block">1. What You Demonstrated</span>
              <p className="text-slate-300 leading-relaxed">
                Clear understanding of React 18 automatic batching and fundamental asynchronous event loop mechanics.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-1">
              <span className="font-bold text-rose-400 uppercase block">2. What You Struggled With</span>
              <p className="text-slate-300 leading-relaxed">
                Preserving unmatched records across relational queries (INNER vs LEFT JOIN semantics and aggregations).
              </p>
            </div>
            <div className="p-4 rounded-xl bg-blue-950/20 border border-blue-500/30 space-y-1">
              <span className="font-bold text-blue-400 uppercase block">3. What to Practice Next</span>
              <p className="text-slate-300 leading-relaxed">
                Visual Venn diagram query challenges in the injected SQL Recovery Module.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <button
              onClick={resetPractice}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retry Diagnostic Lab</span>
            </button>
            <button
              onClick={() => setIsWhyPlanChangedModalOpen(true)}
              className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold transition shadow-md shadow-amber-500/20"
            >
              View Route Recalculation &rarr;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
