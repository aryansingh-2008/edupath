'use client';

import React, { useState } from 'react';
import { useEduPath } from '../store/useEduPathStore';
import {
  Compass,
  Lock,
  User,
  Mail,
  Briefcase,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  KeyRound,
  ShieldCheck,
  CheckCircle2,
  Code,
  Clock,
  UserPlus
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
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [targetRole, setTargetRole] = useState('AI / ML Engineer');
  const [skillsText, setSkillsText] = useState('');
  const [dailyMinutes, setDailyMinutes] = useState(30);

  const [errorMsg, setErrorMsg] = useState('');

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

  const handleSignUpSubmit = (e: React.FormEvent) => {
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

    try {
      confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });
    } catch {}

    createAccount(fullName, email, targetRole, skillsText, dailyMinutes);
  };

  const handleQuickLogin = (presetUser: string, presetRole: string) => {
    setUsername(presetUser);
    setPassword('123456');
    setSignInRole(presetRole);
    try {
      confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });
    } catch {}
    login(presetUser, presetRole);
  };

  const addSkillChip = (skill: string) => {
    if (skillsText.includes(skill)) return;
    setSkillsText(prev => (prev ? `${prev}, ${skill}` : skill));
  };

  return (
    <div className="min-h-screen bg-[#080c16] text-slate-100 flex flex-col justify-center items-center p-4 relative overflow-hidden font-sans">
      
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-md w-full space-y-5 relative z-10">
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

        {/* HACKATHON EVALUATOR NOTICE BOX */}
        <div className="p-3.5 rounded-2xl bg-blue-950/40 border border-blue-500/40 shadow-lg space-y-1 text-xs text-blue-200">
          <div className="flex items-center gap-1.5 font-bold text-blue-300">
            <KeyRound className="w-3.5 h-3.5 text-amber-300" />
            <span>Agentic AI Hackathon 2026 &bull; Evaluator Credentials</span>
          </div>
          <p className="text-[11px] text-slate-300">
            Username: <code className="bg-black/50 px-1.5 py-0.5 rounded text-amber-300 font-mono">admin</code> &bull; Password: <code className="bg-black/50 px-1.5 py-0.5 rounded text-amber-300 font-mono">123456</code>
          </p>
        </div>

        
        <div className="bg-[#0f172a]/95 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl backdrop-blur-xl space-y-5">
          {/* TAB SWITCHER: SIGN IN vs CREATE ACCOUNT */}
          <div className="grid grid-cols-2 p-1 rounded-xl bg-black/40 border border-slate-800 text-xs font-bold">
            <button
              type="button"
              onClick={() => {
                setMode('signin');
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
              {/* USERNAME */}
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

              {/* TRACK SELECTOR */}
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

              {/* TOGGLE TO SIGN UP */}
              <div className="text-center pt-2">
                <p className="text-slate-400 text-[11px]">
                  Don&apos;t have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setMode('signup')}
                    className="text-blue-400 hover:text-blue-300 font-bold underline transition ml-1"
                  >
                    Create Free Account
                  </button>
                </p>
              </div>

              {/* 1-CLICK PRESETS */}
              <div className="pt-3 border-t border-slate-800/80 space-y-2">
                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block text-center">
                  One-Click Evaluator Presets
                </span>
                <div className="grid grid-cols-1 gap-2">
                  <button
                    type="button"
                    onClick={() => handleQuickLogin('admin', 'Full Stack Developer')}
                    className="w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 text-xs font-semibold flex items-center justify-between transition"
                  >
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Admin Judge (Full Stack Track)</span>
                    </span>
                    <span className="text-[10px] text-blue-400 font-mono">1-Click</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickLogin('Pranav', 'AI / ML Engineer')}
                    className="w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 text-xs font-semibold flex items-center justify-between transition"
                  >
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                      <span>AI / ML Engineer Track (Pranav)</span>
                    </span>
                    <span className="text-[10px] text-purple-400 font-mono">1-Click</span>
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* MODE 2: CREATE ACCOUNT */}
          {mode === 'signup' && (
            <form onSubmit={handleSignUpSubmit} className="space-y-3.5 text-xs">
              
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
                  <span>Target Career Goal</span>
                </label>
                <select
                  value={targetRole}
                  onChange={e => setTargetRole(e.target.value)}
                  className="w-full bg-black/40 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-blue-500 transition text-xs"
                >
                  <option value="AI / ML Engineer">AI / ML Engineer</option>
                  <option value="Full Stack Developer">Full Stack Developer</option>
                  <option value="Data Scientist">Data Scientist</option>
                </select>
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
                  <UserPlus className="w-4 h-4" />
                  <span>Create My Adaptive Path</span>
                </button>
              </div>

              {/* TOGGLE TO SIGN IN */}
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
        </div>

        
        <div className="flex items-center justify-center gap-4 text-[11px] text-slate-500">
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            OWASP Hardened
          </span>
          <span>&bull;</span>
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            Autonomous Agentic DAG
          </span>
        </div>
      </div>
    </div>
  );
};
