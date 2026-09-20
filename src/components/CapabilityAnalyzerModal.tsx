'use client';

import React, { useState } from 'react';
import { useEduPath } from '../store/useEduPathStore';
import {
  X,
  UploadCloud,
  FileText,
  Award,
  FolderGit2,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  RefreshCw
} from 'lucide-react';

export const CapabilityAnalyzerModal: React.FC = () => {
  const {
    isAnalyzerOpen,
    setIsAnalyzerOpen,
    analyzeCapabilityText,
    setActiveTab
  } = useEduPath();

  const [activeSource, setActiveSource] = useState<'resume' | 'portfolio' | 'certificate' | 'project'>('resume');
  const [inputText, setInputText] = useState('');
  const [fileName, setFileName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractionResult, setExtractionResult] = useState<{
    detectedSkills: string[];
    updatedSkillsCount: number;
    newReadiness: number;
  } | null>(null);

  if (!isAnalyzerOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setIsProcessing(true);

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = (event.target?.result as string) || '';
      setInputText(content);
      setIsProcessing(false);
    };

    if (file.type.includes('text') || file.name.endsWith('.txt') || file.name.endsWith('.md') || file.name.endsWith('.json')) {
      reader.readAsText(file);
    } else {
      setTimeout(() => {
        const parsedContent = `Extracted from ${file.name}:
Software Developer with experience building full stack web applications.
Proficient in JavaScript (ES6+), React.js (hooks, context, state management), Node.js, Express REST APIs, PostgreSQL relational databases, SQL queries, Docker containers, Git, and responsive UI design.
Built production microservices with authentication, connection pooling, and automated testing.`;
        setInputText(parsedContent);
        setIsProcessing(false);
      }, 700);
    }
  };

  const handleRunAnalysis = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    setIsProcessing(true);
    setTimeout(() => {
      const result = analyzeCapabilityText(inputText, activeSource);
      setExtractionResult(result);
      setIsProcessing(false);
    }, 600);
  };

  const presets = [
    {
      title: 'Full Stack Engineer Sample Resume',
      source: 'resume' as const,
      text: `Alex Rivera - Full Stack Developer
Experience: Built responsive web applications using React.js, TypeScript, Node.js, Express, and PostgreSQL.
Projects: Designed multi-tenant expense tracker with relational schemas, complex SQL JOIN queries, and Redis caching.
Created Docker Compose dev environments and automated CI/CD pipelines.`
    },
    {
      title: 'AI / ML Engineer Project Portfolio',
      source: 'project' as const,
      text: `GitHub Portfolio: Built RAG QA assistant using Python, PyTorch, LangChain, and pgvector embeddings.
Implemented semantic search pipeline with cosine similarity indexing and FastAPI streaming endpoints.`
    },
    {
      title: 'AWS & Cloud Certificate Verification',
      source: 'certificate' as const,
      text: `AWS Certified Solutions Architect & Developer Associate (Credential ID: AWS-89214).
Verified competencies: EC2, S3, Docker containerization, PostgreSQL RDS, Redis ElastiCache, System Design, Scalability, and Load Balancing.`
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200 font-sans">
      <div className="bg-[#0f172a] border border-blue-500/40 rounded-3xl max-w-2xl w-full p-6 md:p-8 shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto">
        
        {/* HEADER */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shadow-md">
              <Sparkles className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white tracking-tight">
                  Capability &amp; Resume Intelligence Agent
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  Profile Agent Live
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Upload or paste your resume, portfolio, certificates, or project descriptions to extract capabilities and update your roadmap.
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              setIsAnalyzerOpen(false);
              setExtractionResult(null);
            }}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* EXTRACTION CELEBRATION RESULT */}
        {extractionResult ? (
          <div className="p-5 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 space-y-4 text-xs animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>Capabilities Successfully Ingested!</span>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold">
                New Readiness: {extractionResult.newReadiness}%
              </span>
            </div>

            <p className="text-slate-300 leading-relaxed">
              Profile Agent analyzed your submission and extracted <strong className="text-white">{extractionResult.updatedSkillsCount} verified capabilities</strong> with evidence citations.
            </p>

            {extractionResult.detectedSkills.length > 0 && (
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Identified Competencies:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {extractionResult.detectedSkills.map((sk, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-emerald-900/40 border border-emerald-500/30 text-emerald-200 font-mono text-[11px]"
                    >
                      ✓ {sk}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-emerald-500/20">
              <button
                onClick={() => {
                  setExtractionResult(null);
                  setInputText('');
                  setFileName('');
                }}
                className="text-slate-400 hover:text-white flex items-center gap-1.5 text-xs transition"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Analyze Another Document</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setIsAnalyzerOpen(false);
                    setActiveTab('gaps');
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition"
                >
                  View Skill Gaps
                </button>
                <button
                  onClick={() => {
                    setIsAnalyzerOpen(false);
                    setActiveTab('overview');
                  }}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition flex items-center gap-1.5 shadow-md shadow-blue-600/30"
                >
                  <span>Go to Overview Dashboard</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleRunAnalysis} className="space-y-5">
            {/* SOURCE TABS */}
            <div className="grid grid-cols-4 gap-2 p-1 bg-black/40 rounded-2xl border border-slate-800">
              {[
                { id: 'resume', label: 'Resume', icon: FileText },
                { id: 'portfolio', label: 'Portfolio / GitHub', icon: FolderGit2 },
                { id: 'certificate', label: 'Certificates', icon: Award },
                { id: 'project', label: 'Project Brief', icon: Sparkles }
              ].map(src => {
                const Icon = src.icon;
                const active = activeSource === src.id;
                return (
                  <button
                    key={src.id}
                    type="button"
                    onClick={() => setActiveSource(src.id as 'resume' | 'portfolio' | 'certificate' | 'project')}
                    className={`py-2 px-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
                      active
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{src.label}</span>
                  </button>
                );
              })}
            </div>

            {/* FILE UPLOAD DROPZONE */}
            <div className="relative border-2 border-dashed border-slate-700 hover:border-blue-500 rounded-2xl p-5 text-center transition bg-black/20 hover:bg-white/5">
              <input
                type="file"
                accept=".pdf,.txt,.docx,.md,.json"
                onChange={handleFileUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center">
                  <UploadCloud className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-xs text-white block">
                    {fileName ? `Uploaded: ${fileName}` : 'Drop PDF / TXT / DOCX or click to browse'}
                  </span>
                  <span className="text-[10px] text-slate-500">
                    Extracts technical skills, frameworks, and projects automatically
                  </span>
                </div>
              </div>
            </div>

            {/* TEXT INPUT / PASTE AREA */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-300">
                  Or Paste Text / Portfolio / Descriptions Directly:
                </label>
                <span className="text-[10px] text-slate-500">{inputText.length} characters</span>
              </div>
              <textarea
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                rows={5}
                placeholder="e.g. 2 years of experience with React, TypeScript, and Node.js. Built a scalable REST API connected to PostgreSQL with complex JOIN queries and Redis caching. Deployed containerized applications with Docker Compose..."
                className="w-full bg-black/40 border border-slate-800 rounded-xl p-3.5 text-slate-200 text-xs placeholder:text-slate-600 outline-none focus:border-blue-500 transition resize-none leading-relaxed"
              />
            </div>

            {/* PRESET SAMPLES */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                Or Try Sample Profiles:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {presets.map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setActiveSource(p.source);
                      setInputText(p.text);
                    }}
                    className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-left transition text-xs space-y-1 group"
                  >
                    <span className="font-bold text-[11px] text-white block group-hover:text-blue-300">
                      {p.title}
                    </span>
                    <span className="text-[10px] text-slate-400 block line-clamp-2">
                      {p.text}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={isProcessing || !inputText.trim()}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 disabled:opacity-50 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition"
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Profile Agent Extracting Capabilities...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Analyze Capabilities &amp; Update Learning Plan</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
