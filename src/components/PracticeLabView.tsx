'use client';

import React, { useState, useMemo } from 'react';
import { useEduPath } from '../store/useEduPathStore';
import { COMPREHENSIVE_QUESTION_BANK } from '../data/questionBank';
import {
  FileCode2,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  ArrowLeft,
  Zap,
  RotateCcw,
  Award,
  Filter,
  Check,
  X
} from 'lucide-react';

export const PracticeLabView: React.FC = () => {
  const {
    submitQuizAnswer,
    setActiveTab,
    simulateSqlStruggle
  } = useEduPath();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; xpAwarded: number; firstTime: boolean } | null>(null);
  const [answersMap, setAnswersMap] = useState<Record<string, { selected: number; isCorrect: boolean }>>({});

  // Filter questions based on category
  const filteredQuestions = useMemo(() => {
    if (selectedCategory === 'all') return COMPREHENSIVE_QUESTION_BANK;
    return COMPREHENSIVE_QUESTION_BANK.filter(q => q.skillId === selectedCategory);
  }, [selectedCategory]);

  const currentQ = filteredQuestions[questionIndex] || filteredQuestions[0];

  // Calculate session accuracy
  const totalAttempted = Object.keys(answersMap).length;
  const totalCorrect = Object.values(answersMap).filter(a => a.isCorrect).length;
  const accuracyPercentage = totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 0;

  const handleSelectCategory = (cat: string) => {
    setSelectedCategory(cat);
    setQuestionIndex(0);
    setSelectedOption(null);
    setSubmitted(false);
    setShowHint(false);
    setFeedback(null);
  };

  const handleSelectQuestion = (idx: number) => {
    setQuestionIndex(idx);
    const q = filteredQuestions[idx];
    if (answersMap[q.id]) {
      setSelectedOption(answersMap[q.id].selected);
      setSubmitted(true);
      const isCorrect = answersMap[q.id].isCorrect;
      setFeedback({
        isCorrect,
        xpAwarded: isCorrect ? 50 : 0,
        firstTime: false
      });
    } else {
      setSelectedOption(null);
      setSubmitted(false);
      setFeedback(null);
    }
    setShowHint(false);
  };

  const handleSubmit = () => {
    if (selectedOption === null || !currentQ) return;

    const isCorrect = selectedOption === currentQ.correctIndex;
    const xpAmount = currentQ.difficulty === 'advanced' ? 70 : currentQ.difficulty === 'intermediate' ? 50 : 30;

    // Call store method which enforces: ONLY awards XP if isCorrect!
    const result = submitQuizAnswer(currentQ.id, selectedOption, isCorrect, xpAmount);
    setFeedback(result);
    setSubmitted(true);

    setAnswersMap(prev => ({
      ...prev,
      [currentQ.id]: { selected: selectedOption, isCorrect }
    }));
  };

  const handleNext = () => {
    if (questionIndex < filteredQuestions.length - 1) {
      handleSelectQuestion(questionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (questionIndex > 0) {
      handleSelectQuestion(questionIndex - 1);
    }
  };

  const handleRetake = () => {
    setSubmitted(false);
    setSelectedOption(null);
    setFeedback(null);
    setShowHint(false);
  };

  const categories = [
    { id: 'all', label: `All Topics (${COMPREHENSIVE_QUESTION_BANK.length})` },
    { id: 'sql', label: 'SQL & Database' },
    { id: 'react', label: 'React.js' },
    { id: 'js', label: 'JavaScript' },
    { id: 'node', label: 'Node.js & APIs' },
    { id: 'typescript', label: 'TypeScript' },
    { id: 'system-design', label: 'System Design' }
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* HEADER & QUICK STATS */}
      <div className="p-6 rounded-3xl bg-[#0b101e] border border-slate-800 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <FileCode2 className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">
              Diagnostic Knowledge Lab
            </span>
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">
            Verified Skill Evaluations
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Answer technical questions to validate your competencies. EXP is awarded <strong className="text-emerald-400">strictly on correct answers</strong>. Incorrect attempts alert the Adaptive Agent to calibrate your roadmap.
          </p>
        </div>

        {/* LIVE QUIZ SCOREBOARD */}
        <div className="grid grid-cols-3 gap-2.5 sm:gap-3 bg-black/40 p-3 rounded-2xl border border-slate-800/80 text-center shrink-0">
          <div className="px-3 py-1.5">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Answered</span>
            <span className="text-lg font-black text-white">{totalAttempted}/{COMPREHENSIVE_QUESTION_BANK.length}</span>
          </div>
          <div className="px-3 py-1.5 border-x border-slate-800">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Accuracy</span>
            <span className={`text-lg font-black ${accuracyPercentage >= 70 ? 'text-emerald-400' : totalAttempted === 0 ? 'text-slate-400' : 'text-amber-400'}`}>
              {accuracyPercentage}%
            </span>
          </div>
          <div className="px-3 py-1.5">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Correct</span>
            <span className="text-lg font-black text-emerald-400">{totalCorrect}</span>
          </div>
        </div>
      </div>

      {/* CATEGORY FILTER PILLS */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold px-2">
          <Filter className="w-3.5 h-3.5" />
          <span>Category:</span>
        </div>
        {categories.map(cat => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => handleSelectCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                isSelected
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800 hover:bg-slate-800'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* QUESTION NAVIGATOR PILLS */}
      <div className="p-3.5 rounded-2xl bg-[#0f172a]/60 border border-slate-800/80 flex items-center gap-1.5 overflow-x-auto">
        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mr-2 shrink-0">
          Questions:
        </span>
        {filteredQuestions.map((q, idx) => {
          const isCurrent = idx === questionIndex;
          const answer = answersMap[q.id];
          const isSolved = answer?.isCorrect === true;
          const isFailed = answer?.isCorrect === false;

          let pillClass = 'bg-black/40 text-slate-400 border-slate-800 hover:border-slate-700';
          if (isCurrent) {
            pillClass = 'ring-2 ring-blue-500 bg-blue-950/60 text-white font-bold border-blue-400';
          } else if (isSolved) {
            pillClass = 'bg-emerald-950/50 text-emerald-300 border-emerald-500/40 font-bold';
          } else if (isFailed) {
            pillClass = 'bg-rose-950/50 text-rose-300 border-rose-500/40 font-bold';
          }

          return (
            <button
              key={q.id}
              onClick={() => handleSelectQuestion(idx)}
              className={`w-7 h-7 rounded-lg border text-xs flex items-center justify-center transition shrink-0 ${pillClass}`}
              title={`Question ${idx + 1}: ${q.subConcept}`}
            >
              {isSolved ? <Check className="w-3.5 h-3.5" /> : isFailed ? <X className="w-3.5 h-3.5" /> : idx + 1}
            </button>
          );
        })}
      </div>

      {/* QUESTION CARD */}
      <div className="bg-[#0f172a] rounded-3xl p-6 md:p-8 border border-slate-800 shadow-2xl space-y-6">
        {/* QUESTION META HEADER */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
          <div className="flex items-center gap-2.5">
            <span className="px-2.5 py-1 rounded-lg bg-blue-600/10 text-blue-400 border border-blue-500/20 text-xs font-bold font-mono">
              Q{questionIndex + 1} of {filteredQuestions.length}
            </span>
            <span className="text-xs text-slate-300 font-semibold">{currentQ.skillName}</span>
            <span className="text-slate-600">&bull;</span>
            <span className="text-xs text-slate-400">{currentQ.subConcept}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className={`text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full border ${
              currentQ.difficulty === 'advanced'
                ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                : currentQ.difficulty === 'intermediate'
                ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
            }`}>
              {currentQ.difficulty}
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20 text-xs font-bold flex items-center gap-1">
              <Award className="w-3 h-3 text-amber-400" />
              {currentQ.difficulty === 'advanced' ? '+70 XP' : currentQ.difficulty === 'intermediate' ? '+50 XP' : '+30 XP'}
            </span>
          </div>
        </div>

        {/* PROMPT */}
        <div className="space-y-3">
          <h3 className="text-base sm:text-lg font-semibold text-white leading-relaxed whitespace-pre-line">
            {currentQ.prompt}
          </h3>
        </div>

        {/* OPTIONS */}
        <div className="space-y-3">
          {currentQ.options.map((opt, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrectAnswer = idx === currentQ.correctIndex;

            let optionStyle = 'border-slate-800 bg-black/20 text-slate-200 hover:border-slate-700 hover:bg-white/5';

            if (submitted) {
              if (isCorrectAnswer) {
                optionStyle = 'border-emerald-500 bg-emerald-950/40 text-emerald-200 ring-2 ring-emerald-500/50 font-medium';
              } else if (isSelected && !isCorrectAnswer) {
                optionStyle = 'border-rose-500 bg-rose-950/40 text-rose-200 ring-2 ring-rose-500/50 font-medium';
              } else {
                optionStyle = 'border-slate-800/80 bg-black/10 text-slate-500 opacity-50';
              }
            } else if (isSelected) {
              optionStyle = 'border-blue-500 bg-blue-950/40 text-white font-medium ring-2 ring-blue-500/60';
            }

            return (
              <div
                key={idx}
                onClick={() => !submitted && setSelectedOption(idx)}
                className={`p-4 rounded-2xl border text-xs sm:text-sm cursor-pointer transition-all flex items-start gap-3.5 select-none ${optionStyle}`}
              >
                <span className={`w-6 h-6 rounded-xl border flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                  submitted && isCorrectAnswer
                    ? 'bg-emerald-500 border-emerald-400 text-black'
                    : submitted && isSelected && !isCorrectAnswer
                    ? 'bg-rose-500 border-rose-400 text-white'
                    : isSelected
                    ? 'bg-blue-600 border-blue-400 text-white'
                    : 'bg-slate-900 border-slate-700 text-slate-400'
                }`}>
                  {['A', 'B', 'C', 'D'][idx]}
                </span>
                <div className="flex-1 leading-relaxed">
                  <span>{opt}</span>
                  {submitted && isCorrectAnswer && (
                    <span className="ml-2 inline-flex items-center text-[10px] font-bold text-emerald-400 uppercase tracking-wider bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      ✓ Correct Answer
                    </span>
                  )}
                  {submitted && isSelected && !isCorrectAnswer && (
                    <span className="ml-2 inline-flex items-center text-[10px] font-bold text-rose-400 uppercase tracking-wider bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                      ✕ Your Choice (Incorrect)
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* HINT DRAWER */}
        {showHint && !submitted && (
          <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/40 text-xs text-amber-200 flex items-start gap-2.5 animate-in fade-in duration-200">
            <HelpCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold text-amber-300">Technical Hint: </strong>
              <span>{currentQ.hint}</span>
            </div>
          </div>
        )}

        {/* POST-SUBMISSION FEEDBACK BANNER */}
        {submitted && feedback && (
          <div
            className={`p-5 rounded-2xl border text-xs space-y-2 animate-in fade-in duration-200 ${
              feedback.isCorrect
                ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
                : 'bg-rose-950/40 border-rose-500/50 text-rose-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-bold">
                {feedback.isCorrect ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span className="text-emerald-300">
                      Correct Answer! {feedback.firstTime ? `+${feedback.xpAwarded} XP Earned` : '(Competency Already Verified)'}
                    </span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                    <span className="text-rose-300">Incorrect! 0 XP Earned</span>
                  </>
                )}
              </div>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase font-bold ${
                feedback.isCorrect ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
              }`}>
                {feedback.isCorrect ? 'Competency Verified' : 'Gaps Logged'}
              </span>
            </div>

            <div className="space-y-1.5 pt-1 text-slate-300 leading-relaxed pl-7">
              <p><strong className="text-white">Explanation: </strong>{currentQ.explanation}</p>
              {!feedback.isCorrect && (
                <p className="text-[11px] text-amber-300/90 font-medium">
                  ⚠️ The Adaptive Planner tracks wrong answers to calibrate your curriculum. If you struggle repeatedly, a targeted recovery module will be added to your Roadmap.
                </p>
              )}
            </div>
          </div>
        )}

        {/* ACTION CONTROLS */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevious}
              disabled={questionIndex === 0}
              className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-30 text-slate-300 text-xs font-semibold border border-slate-800 transition flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>

            <button
              onClick={handleNext}
              disabled={questionIndex === filteredQuestions.length - 1}
              className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-30 text-slate-300 text-xs font-semibold border border-slate-800 transition flex items-center gap-1.5"
            >
              <span>Next</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-center gap-2.5">
            {!submitted ? (
              <>
                <button
                  onClick={() => setShowHint(!showHint)}
                  className="text-xs text-amber-400 hover:text-amber-300 font-semibold px-3 py-2 rounded-xl hover:bg-amber-500/10 transition flex items-center gap-1.5"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>{showHint ? 'Hide Hint' : 'View Hint'}</span>
                </button>

                <button
                  onClick={handleSubmit}
                  disabled={selectedOption === null}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 disabled:opacity-40 text-white font-bold text-xs transition shadow-lg shadow-blue-600/30 flex items-center gap-2"
                >
                  <span>Submit Answer</span>
                  <CheckCircle2 className="w-4 h-4" />
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleRetake}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-800 transition flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Try Again</span>
                </button>

                {questionIndex < filteredQuestions.length - 1 ? (
                  <button
                    onClick={handleNext}
                    className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition shadow-lg shadow-blue-600/30 flex items-center gap-2"
                  >
                    <span>Next Challenge</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={() => setActiveTab('path')}
                    className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition shadow-lg shadow-emerald-600/30 flex items-center gap-2"
                  >
                    <span>Back to Roadmap</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* ADAPTIVE PLANNER NOTICE CARD */}
      <div className="p-4 rounded-2xl bg-[#0b101e] border border-slate-800 flex items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-white block">Struggle Detection &amp; Adaptive Replanning</span>
            <span className="text-slate-400">Repeated incorrect answers automatically trigger the Adaptive Planner to inject targeted recovery modules into your roadmap.</span>
          </div>
        </div>

        <button
          onClick={simulateSqlStruggle}
          className="px-3.5 py-1.5 rounded-xl bg-rose-950/60 hover:bg-rose-900/60 border border-rose-500/40 text-rose-300 text-xs font-bold transition whitespace-nowrap shrink-0"
        >
          Simulate Struggle (Demo)
        </button>
      </div>
    </div>
  );
};
