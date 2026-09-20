'use client';

import React from 'react';
import { useEduPath } from '../store/useEduPathStore';
import { FolderGit2, ShieldCheck, Code2 } from 'lucide-react';

export const ProjectBuilderView: React.FC = () => {
  const { profile } = useEduPath();

  const projects = [
    {
      id: 'proj-1',
      title: 'Multi-Tenant Expense & Budget REST API',
      targetGap: 'SQL & Relational DB + Node.js',
      skillsTrained: ['SQL & Relational DB', 'Node.js & Express', 'System Design & Scalability'],
      goal: 'Build an authenticated REST service with PostgreSQL schema constraints, multi-table JOIN spend aggregations, and Redis query caching.',
      evidenceOutcome: 'Validates SQL queries and Express routing as DEMONSTRATED capabilities.',
      techStack: ['Node.js', 'Express', 'PostgreSQL', 'Docker', 'Redis'],
      requirements: [
        'Relational schema with Users, Organizations, and Expenses tables',
        'Complex SQL queries for category spend aggregations using JOINs and GROUP BY',
        'Parameterized inputs to eliminate SQL injection vulnerabilities',
        'Docker-compose file launching API, Postgres, and Redis'
      ],
      evaluationCriteria: [
        'Demonstrated query execution under 20ms using EXPLAIN ANALYZE',
        'Foreign key CASCADE and ON DELETE RESTRICT rules enforced',
        'Comprehensive Postman/Newman automated integration tests'
      ],
      difficulty: 'Intermediate'
    },
    {
      id: 'proj-2',
      title: 'High-Throughput Rate-Limited Microservice',
      targetGap: 'System Design & Scalability',
      skillsTrained: ['System Design & Scalability', 'Docker & Containers'],
      goal: 'Design a sliding-window rate limiter service using Redis token buckets capable of handling 5,000 requests/sec.',
      evidenceOutcome: 'Validates distributed systems concurrency and cache invalidation.',
      techStack: ['Node.js', 'Redis', 'Docker', 'k6 Load Testing'],
      requirements: [
        'Sliding-window counter algorithm implemented in Redis Lua scripts',
        'Graceful 429 Too Many Requests HTTP responses with Retry-After header',
        'Automated load testing verification via k6'
      ],
      evaluationCriteria: [
        'Zero race conditions under concurrent async traffic',
        'P99 latency under 15ms at 2,000 concurrent virtual users'
      ],
      difficulty: 'Advanced'
    }
  ];

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <FolderGit2 className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">
              Skill-to-Project Evidence Loop
            </span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Target Capstone Projects
          </h2>
          <p className="text-xs text-slate-400">
            Converting self-reported skills into verifiable portfolio proof of work for <strong>{profile.targetRole}</strong>.
          </p>
        </div>

        {/* EVIDENCE BADGE */}
        <div className="flex items-center gap-2 bg-black/40 px-3.5 py-2 rounded-xl border border-slate-800 text-xs">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span className="text-slate-300">
            Proof Paradigm: <strong className="text-white">Claimed &rarr; Demonstrated</strong>
          </span>
        </div>
      </div>

      {/* PROJECT CARDS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {projects.map(proj => (
          <div
            key={proj.id}
            className="p-6 rounded-2xl bg-[#0f172a] border border-slate-800 shadow-xl space-y-5 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                  Target Gap: {proj.targetGap}
                </span>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  {proj.difficulty}
                </span>
              </div>

              <h3 className="text-lg font-bold text-white leading-snug">{proj.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{proj.goal}</p>

              {/* TECH STACK CHIPS */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {proj.techStack.map((tech, i) => (
                  <span key={i} className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] font-mono">
                    {tech}
                  </span>
                ))}
              </div>

              {/* REQUIREMENTS */}
              <div className="p-3.5 rounded-xl bg-black/20 border border-slate-800/80 space-y-1.5 text-xs">
                <span className="font-bold text-slate-300 block mb-1">Architecture Requirements:</span>
                {proj.requirements.map((req, i) => (
                  <div key={i} className="flex items-start gap-2 text-slate-400 text-[11px]">
                    <span className="text-blue-400 font-bold">&bull;</span>
                    <span>{req}</span>
                  </div>
                ))}
              </div>

              {/* EVIDENCE OUTCOME */}
              <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-xs text-emerald-300 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Portfolio Evidence:</strong> {proj.evidenceOutcome}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400">Estimated Duration: ~6-8 hours</span>
              <button
                onClick={() => alert(`Starting setup for "${proj.title}". Scaffold generated!`)}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition shadow-md shadow-blue-600/30 flex items-center gap-1.5"
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>Start Project</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
