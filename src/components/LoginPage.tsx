'use client';

import React, { useState } from 'react';
import { useEduPath } from '../store/useEduPathStore';
import { getDiagnosticQuestions } from '../lib/agents/customPathGenerator';
import {
  Compass,
  Lock,
  User,
  Mail,
  Briefcase,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Code,
  Clock,
  Zap,
  AlertTriangle,
  Sparkles,
  Check,
  X,
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const LoginPage: React.FC<{
  onBackToLanding?: () => void;
  initialMode?: 'signin' | 'signup';
}> = ({ onBackToLanding, initialMode = 'signin' }) => {
  const { login, createAccount } = useEduPath();
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);

  // Sign In Form States
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('123456');
  const [signInRole, setSignInRole] = useState('Full Stack Developer');

  // Sign Up Form States
  const [signUpStep, setSignUpStep] = useState<1 | 2>(1);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [targetRole, setTargetRole] = useState('AI / ML Engineer');
  const [careerGoal, setCareerGoal] = useState('Land an engineering role within 4 months');
  const [experienceLevel, setExperienceLevel] = useState('Junior (1-2 yrs)');
  const [skillsText, setSkillsText] = useState('');
  const [dailyMinutes, setDailyMinutes] = useState(30);

  // Diagnostic Assessment States
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [diagnosticAnswers, setDiagnosticAnswers] = useState<
    Record<string, { selectedIndex: number; isCorrect: boolean }>
  >({});

  const [errorMsg, setErrorMsg] = useState('');

  const diagnosticQuestions = getDiagnosticQuestions(targetRole);
  const currentQuestion = diagnosticQuestions[currentQuestionIndex] || diagnosticQuestions[0];

  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) {
      setErrorMsg('Please enter your username or email.');
      return;
    }
    if (!password.trim()) {
      setErrorMsg('Please enter your password.');
      return;
    }

    try {
      confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });
    } catch {}

    login(username, signInRole);
  };

  const handleProceedToDiagnostic = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!email.trim()) {
      setErrorMsg('Please enter your email address.');
      return;
    }
    if (!signUpPassword.trim()) {
      setErrorMsg('Please create a password.');
      return;
    }

    setErrorMsg('');
    setSignUpStep(2);
    setCurrentQuestionIndex(0);
  };

  const handleSelectOption = (optionIndex: number) => {
    if (!currentQuestion) return;
    const isCorrect = optionIndex === currentQuestion.correctIndex;
    setDiagnosticAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: {
        selectedIndex: optionIndex,
        isCorrect
      }
    }));

    if (isCorrect) {
      try {
        confetti({ particleCount: 35, spread: 45, origin: { y: 0.7 } });
      } catch {}
    }
  };

  const handleCompleteSignUp = (skipDiagnostic: boolean = false) => {
    try {
      confetti({ particleCount: 75, spread: 70, origin: { y: 0.6 } });
    } catch {}

    const submissions = skipDiagnostic
      ? undefined
      : diagnosticQuestions.map(q => {
          const ans = diagnosticAnswers[q.id];
          return {
            skillName: q.skillName,
            isCorrect: ans ? ans.isCorrect : false
          };
        });

    createAccount(
      fullName,
      email,
      targetRole,
      skillsText,
      dailyMinutes,
      experienceLevel,
      careerGoal,
      submissions
    );
  };

  const addSkillChip = (skill: string) => {
    if (skillsText.includes(skill)) return;
    setSkillsText(prev => (prev ? `${prev}, ${skill}` : skill));
  };

  const answeredCount = Object.keys(diagnosticAnswers).length;
  const verifiedCount = diagnosticQuestions.filter(q => diagnosticAnswers[q.id]?.isCorrect).length;
  const diagnosedScorePreview = answeredCount > 0
    ? Math.min(92, Math.round((verifiedCount / diagnosticQuestions.length) * 80 + 15))
    : null;

  return (
    <div className="min-h-screen bg-[#080c16] text-slate-100 flex flex-col justify-center items-center p-4 relative overflow-hidden font-sans">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className={`w-full space-y-5 relative z-10 transition-all duration-300 ${mode === 'signup' && signUpStep === 2 ? 'max-w-xl' : 'max-w-md'}`}>
        {onBackToLanding && (
          <button
            onClick={onBackToLanding}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Public Website</span>
          </button>
        )}

        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center mx-auto shadow-xl shadow-blue-500/25 border border-white/20">
            <Compass className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            EduPath <span className="text-blue-400">AI</span>
          </h1>
          <p className="text-xs text-slate-400 font-medium">
            Autonomous Career Learning &amp; Skill Gap Agent
          </p>
        </div>

        <div className="bg-[#0f172a]/95 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl backdrop-blur-xl space-y-5">
          {/* TAB SWITCHER: SIGN IN vs CREATE ACCOUNT */}
          <div className="grid grid-cols-2 p-1 rounded-xl bg-black/40 border border-slate-800 text-xs font-bold">
            <button
              type="button"
              onClick={() => {
                setMode('signin');
                setSignUpStep(1);
                setErrorMsg('');
              }}
              className={`py-2 rounded-lg transition-all ${
                mode === 'signin'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('signup');
                setErrorMsg('');
              }}
              className={`py-2 rounded-lg transition-all ${
                mode === 'signup'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Create Account
            </button>
          </div>

          {errorMsg && (
            <div className="p-2.5 rounded-xl bg-rose-950/50 border border-rose-500/40 text-rose-300 text-xs">
              {errorMsg}
            </div>
          )}

          {/* MODE 1: SIGN IN */}
          {mode === 'signin' && (
            <form onSubmit={handleSignInSubmit} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-blue-400" />
                  <span>Username / Email</span>
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  placeholder="admin or your name"
                  className="w-full bg-black/40 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white placeholder:text-slate-600 outline-none focus:border-blue-500 transition text-xs"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Password</span>
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="123456"
                  className="w-full bg-black/40 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white placeholder:text-slate-600 outline-none focus:border-blue-500 transition text-xs"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300 flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Target Career Track</span>
                </label>
                <select
                  value={signInRole}
                  onChange={e => setSignInRole(e.target.value)}
                  className="w-full bg-black/40 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-blue-500 transition text-xs"
                >
                  <option value="Full Stack Developer">Full Stack Developer</option>
                  <option value="AI / ML Engineer">AI / ML Engineer</option>
                  <option value="Data Scientist">Data Scientist</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition"
                >
                  <span>Sign In to Career OS</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="text-center pt-2">
                <p className="text-slate-400 text-[11px]">
                  Don&apos;t have an account?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setMode('signup');
                      setSignUpStep(1);
                    }}
                    className="text-blue-400 hover:text-blue-300 font-bold underline transition ml-1"
                  >
                    Create Free Account
                  </button>
                </p>
              </div>
            </form>
          )}

          {/* MODE 2 - STEP 1: ACCOUNT INTAKE FORM */}
          {mode === 'signup' && signUpStep === 1 && (
            <form onSubmit={handleProceedToDiagnostic} className="space-y-3.5 text-xs">
              <div className="flex items-center justify-between pb-1 border-b border-slate-800">
                <span className="text-[11px] font-semibold text-slate-400">Step 1 of 2: Profile &amp; Role Intake</span>
                <span className="text-[11px] text-blue-400 font-medium">Diagnostic Check Next ⚡</span>
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-blue-400" />
                  <span>Full Name</span>
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  placeholder="e.g. Pranav Sharma"
                  className="w-full bg-black/40 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white placeholder:text-slate-600 outline-none focus:border-blue-500 transition text-xs"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Email Address</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-black/40 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white placeholder:text-slate-600 outline-none focus:border-blue-500 transition text-xs"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-purple-400" />
                  <span>Create Password</span>
                </label>
                <input
                  type="password"
                  value={signUpPassword}
                  onChange={e => setSignUpPassword(e.target.value)}
                  placeholder="Choose a password"
                  className="w-full bg-black/40 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white placeholder:text-slate-600 outline-none focus:border-blue-500 transition text-xs"
                  required
                />
              </div>

              {/* TARGET CAREER TRACK */}
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300 flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Target Career Role</span>
                </label>
                <select
                  value={targetRole}
                  onChange={e => {
                    setTargetRole(e.target.value);
                    setDiagnosticAnswers({});
                    setCurrentQuestionIndex(0);
                  }}
                  className="w-full bg-black/40 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-blue-500 transition text-xs"
                >
                  <option value="AI / ML Engineer">AI / ML Engineer</option>
                  <option value="Full Stack Developer">Full Stack Developer</option>
                  <option value="Data Scientist">Data Scientist</option>
                </select>
              </div>

              {/* EXPERIENCE LEVEL & CAREER GOAL */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-300">Experience Level</label>
                  <select
                    value={experienceLevel}
                    onChange={e => setExperienceLevel(e.target.value)}
                    className="w-full bg-black/40 border border-slate-800 rounded-xl px-3 py-2 text-white outline-none focus:border-blue-500 transition text-xs"
                  >
                    <option value="Student / Final Year">Student / Final Year</option>
                    <option value="Junior (1-2 yrs)">Junior (1-2 yrs)</option>
                    <option value="Mid-Level Professional">Mid-Level Professional</option>
                    <option value="Career Switcher">Career Switcher</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-300">Career Goal</label>
                  <input
                    type="text"
                    value={careerGoal}
                    onChange={e => setCareerGoal(e.target.value)}
                    placeholder="e.g. Land a job in 4 months"
                    className="w-full bg-black/40 border border-slate-800 rounded-xl px-3 py-2 text-white placeholder:text-slate-600 outline-none focus:border-blue-500 transition text-xs"
                  />
                </div>
              </div>

              {/* KNOWN SKILLS (QUICK TAGS) */}
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300 flex items-center gap-1.5">
                  <Code className="w-3.5 h-3.5 text-amber-400" />
                  <span>Skills You Know (Optional)</span>
                </label>
                <input
                  type="text"
                  value={skillsText}
                  onChange={e => setSkillsText(e.target.value)}
                  placeholder="e.g. Python, SQL, React"
                  className="w-full bg-black/40 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white placeholder:text-slate-600 outline-none focus:border-blue-500 transition text-xs"
                />
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="text-[10px] text-slate-500">Quick add:</span>
                  {['Python', 'SQL', 'React', 'Git', 'JavaScript', 'PyTorch'].map(sk => (
                    <button
                      key={sk}
                      type="button"
                      onClick={() => addSkillChip(sk)}
                      className="px-2 py-0.5 rounded bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[10px] text-slate-300 transition"
                    >
                      +{sk}
                    </button>
                  ))}
                </div>
              </div>

              {/* DAILY COMMITMENT */}
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-blue-400" />
                  <span>Daily Study Pace</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[15, 30, 60].map(mins => (
                    <button
                      key={mins}
                      type="button"
                      onClick={() => setDailyMinutes(mins)}
                      className={`py-1.5 rounded-xl border text-xs font-semibold transition ${
                        dailyMinutes === mins
                          ? 'border-blue-500 bg-blue-900/30 text-white'
                          : 'border-slate-800 bg-black/30 text-slate-400 hover:bg-white/5'
                      }`}
                    >
                      {mins}m / day
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition"
                >
                  <Zap className="w-4 h-4 text-amber-300" />
                  <span>Proceed to Skill Diagnostic Check (3 Qs)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-[10px] text-slate-500 text-center mt-1.5">
                  AI will check your baseline skills before calculating your personalized curriculum.
                </p>
              </div>

              <div className="text-center pt-1">
                <p className="text-slate-400 text-[11px]">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setMode('signin')}
                    className="text-blue-400 hover:text-blue-300 font-bold underline transition ml-1"
                  >
                    Sign In
                  </button>
                </p>
              </div>
            </form>
          )}

          {/* MODE 2 - STEP 2: TECHNICAL BASELINE DIAGNOSTIC ASSESSMENT */}
          {mode === 'signup' && signUpStep === 2 && currentQuestion && (
            <div className="space-y-4 text-xs">
              {/* STEP HEADER */}
              <div className="space-y-1.5 pb-2 border-b border-slate-800">
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setSignUpStep(1)}
                    className="text-slate-400 hover:text-white flex items-center gap-1 text-[11px] transition"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back to Intake</span>
                  </button>
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-[10px] font-semibold">
                    {targetRole}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                      <Zap className="w-4 h-4 text-amber-400" />
                      <span>Baseline Technical Diagnostic</span>
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      Checking real skills to calculate tested readiness &amp; prioritize Week 1 gaps.
                    </p>
                  </div>
                  {diagnosedScorePreview !== null && (
                    <div className="text-right">
                      <div className="text-[10px] text-slate-400">Calibrated Readiness</div>
                      <div className="text-sm font-bold text-emerald-400">{diagnosedScorePreview}%</div>
                    </div>
                  )}
                </div>
              </div>

              {/* QUESTION TABS SELECTOR */}
              <div className="grid grid-cols-3 gap-2">
                {diagnosticQuestions.map((q, qIdx) => {
                  const ans = diagnosticAnswers[q.id];
                  const isCurrent = qIdx === currentQuestionIndex;
                  return (
                    <button
                      key={q.id}
                      type="button"
                      onClick={() => setCurrentQuestionIndex(qIdx)}
                      className={`py-2 px-2 rounded-xl border text-left transition text-xs flex items-center justify-between ${
                        isCurrent
                          ? 'border-blue-500 bg-blue-950/40 text-white shadow-sm ring-1 ring-blue-500'
                          : ans !== undefined
                          ? ans.isCorrect
                            ? 'border-emerald-600/50 bg-emerald-950/20 text-emerald-300'
                            : 'border-amber-600/50 bg-amber-950/20 text-amber-300'
                          : 'border-slate-800 bg-black/30 text-slate-400 hover:text-white'
                      }`}
                    >
                      <span className="font-semibold text-[11px] truncate">
                        Q{qIdx + 1}: {q.skillName.split(' ')[0]}
                      </span>
                      {ans !== undefined ? (
                        ans.isCorrect ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 ml-1" />
                        ) : (
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 ml-1" />
                        )
                      ) : (
                        <span className="w-2 h-2 rounded-full bg-slate-700 shrink-0 ml-1"></span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* CURRENT QUESTION CARD */}
              <div className="bg-black/40 border border-slate-800 rounded-2xl p-4 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-indigo-950 border border-indigo-500/40 text-indigo-300 text-[10px] font-bold">
                      {currentQuestion.skillName}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {currentQuestion.subConcept}
                    </span>
                  </div>
                  <span className="text-[10px] uppercase font-semibold text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded">
                    {currentQuestion.difficulty}
                  </span>
                </div>

                {/* PROMPT FORMATTING (SPLIT CODE IF PRESENT) */}
                <div className="space-y-2">
                  {(() => {
                    const parts = currentQuestion.prompt.split('\n\n');
                    const text = parts[0];
                    const code = parts.length > 1 ? parts.slice(1).join('\n\n') : null;
                    return (
                      <>
                        <p className="text-slate-200 font-medium leading-snug">{text}</p>
                        {code && (
                          <pre className="bg-black/70 border border-slate-800 rounded-xl p-3 text-xs font-mono text-cyan-300 overflow-x-auto whitespace-pre">
                            <code>{code}</code>
                          </pre>
                        )}
                      </>
                    );
                  })()}
                </div>

                {/* OPTIONS LIST */}
                <div className="space-y-2 pt-1">
                  {currentQuestion.options.map((opt, optIdx) => {
                    const currentAnswer = diagnosticAnswers[currentQuestion.id];
                    const isSelected = currentAnswer?.selectedIndex === optIdx;
                    const hasAnswered = currentAnswer !== undefined;
                    const isThisCorrect = optIdx === currentQuestion.correctIndex;

                    let btnClass = 'border-slate-800 bg-black/25 text-slate-200 hover:bg-white/5 hover:border-slate-700';

                    if (hasAnswered) {
                      if (isSelected && isThisCorrect) {
                        btnClass = 'border-2 border-emerald-500 bg-emerald-950/40 text-emerald-100 font-medium';
                      } else if (isSelected && !isThisCorrect) {
                        btnClass = 'border-2 border-rose-500 bg-rose-950/40 text-rose-100 font-medium';
                      } else if (!isSelected && isThisCorrect) {
                        btnClass = 'border border-emerald-500/60 bg-emerald-950/20 text-emerald-300';
                      } else {
                        btnClass = 'border-slate-900 bg-black/20 text-slate-500 opacity-50 cursor-default';
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        type="button"
                        onClick={() => handleSelectOption(optIdx)}
                        className={`w-full p-3 rounded-xl border text-left text-xs transition flex items-start gap-2.5 ${btnClass}`}
                      >
                        <span className="w-5 h-5 rounded-full border border-slate-700 flex items-center justify-center shrink-0 text-[10px] font-bold mt-0.5">
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span className="flex-1 leading-snug">{opt}</span>
                        {hasAnswered && isSelected && isThisCorrect && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-1" />
                        )}
                        {hasAnswered && isSelected && !isThisCorrect && (
                          <X className="w-4 h-4 text-rose-400 shrink-0 ml-1" />
                        )}
                        {hasAnswered && !isSelected && isThisCorrect && (
                          <Check className="w-4 h-4 text-emerald-400 shrink-0 ml-1" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* DIAGNOSTIC EXPLANATION & AGENT ACTION */}
                {diagnosticAnswers[currentQuestion.id] && (
                  <div className={`p-3 rounded-xl border text-xs space-y-1 ${
                    diagnosticAnswers[currentQuestion.id].isCorrect
                      ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                      : 'bg-amber-950/30 border-amber-500/40 text-amber-200'
                  }`}>
                    <div className="flex items-center gap-1.5 font-bold">
                      {diagnosticAnswers[currentQuestion.id].isCorrect ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span className="text-emerald-300">Skill Verified: Mastered (+50 XP)</span>
                        </>
                      ) : (
                        <>
                          <AlertTriangle className="w-4 h-4 text-amber-400" />
                          <span className="text-amber-300">Gap Diagnosed: Placed in Week 1 Priority Remediation</span>
                        </>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      {currentQuestion.explanation}
                    </p>
                  </div>
                )}
              </div>

              {/* BOTTOM NAVIGATION / SUBMISSION CONTROLS */}
              <div className="pt-2 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  {currentQuestionIndex > 0 && (
                    <button
                      type="button"
                      onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
                      className="px-3.5 py-2.5 rounded-xl border border-slate-800 bg-black/40 hover:bg-white/5 text-slate-300 font-semibold text-xs flex items-center gap-1.5 transition"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Prev</span>
                    </button>
                  )}

                  {currentQuestionIndex < diagnosticQuestions.length - 1 ? (
                    <button
                      type="button"
                      onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                      className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-blue-600/30 transition"
                    >
                      <span>Next Question</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleCompleteSignUp(false)}
                      className="flex-1 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Generate Diagnosed Learning Path 🚀</span>
                    </button>
                  )}
                </div>

                {/* IF NOT ON LAST QUESTION BUT USER ANSWERED SOME, ALLOW DIRECT LAUNCH */}
                {currentQuestionIndex < diagnosticQuestions.length - 1 && answeredCount > 0 && (
                  <button
                    type="button"
                    onClick={() => handleCompleteSignUp(false)}
                    className="py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-blue-300 text-[11px] font-semibold transition text-center"
                  >
                    Launch Path with {answeredCount}/{diagnosticQuestions.length} Diagnosed Skills ➔
                  </button>
                )}

                {/* SKIP DIAGNOSTIC FALLBACK */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-[11px]">
                  <button
                    type="button"
                    onClick={() => setSignUpStep(1)}
                    className="text-slate-400 hover:text-white transition flex items-center gap-1"
                  >
                    <ArrowLeft className="w-3 h-3" />
                    <span>Edit Profile Details</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleCompleteSignUp(true)}
                    className="text-slate-500 hover:text-slate-300 transition underline"
                  >
                    Skip Diagnostic (Self-Reported)
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-center gap-4 text-[11px] text-slate-500">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            Active Diagnostic Verification
          </span>
          <span>&bull;</span>
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            Prerequisite Remediation DAG
          </span>
        </div>
      </div>
    </div>
  );
};
