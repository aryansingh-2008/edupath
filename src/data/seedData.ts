// Seed Data & Personas for EduPath Demo Mode

import { LearnerProfile, RoadmapMilestone, PracticeQuestion, AgentRunLog } from '../types/index';

export const INITIAL_ALEX_PROFILE: LearnerProfile = {
  id: 'alex-fullstack',
  name: 'Alex Rivera',
  avatarInitial: 'A',
  tagline: 'Junior Frontend Dev aspiring to Full Stack Engineer',
  targetRole: 'Full Stack Developer',
  careerGoal: 'Transition to a production Full Stack Developer at a high-growth tech company within 4 months.',
  experienceLevel: 'Junior (1.5 yrs)',
  learningPreference: 'Coding & Projects',
  dailyCommitmentMinutes: 30,
  readinessPercentage: 42,
  streakDays: 4,
  xpPoints: 380,
  resumeParsed: true,
  extractedRawProjects: 3,
  skills: [
    {
      id: 'js',
      name: 'JavaScript (ES6+)',
      category: 'frontend',
      estimatedLevel: 0.78,
      confidence: 0.88,
      targetBenchmark: 0.85,
      status: 'strong',
      evidence: [
        { source: 'resume', quote: 'Built responsive client web applications using ES6 async/await, closures, and modular JS.', verified: true },
        { source: 'project', quote: 'GitHub repo: task-tracker-spa with 12 custom DOM manipulation modules.', verified: true }
      ]
    },
    {
      id: 'react',
      name: 'React.js',
      category: 'frontend',
      estimatedLevel: 0.62,
      confidence: 0.82,
      targetBenchmark: 0.80,
      status: 'developing',
      evidence: [
        { source: 'resume', quote: 'Built interactive frontend components utilizing React hooks (useState, useEffect, useContext).', verified: true },
        { source: 'project', quote: 'Deployed personal portfolio with React and client-side routing.', verified: true }
      ]
    },
    {
      id: 'node',
      name: 'Node.js & Express',
      category: 'backend',
      estimatedLevel: 0.41,
      confidence: 0.65,
      targetBenchmark: 0.75,
      status: 'developing',
      evidence: [
        { source: 'resume', quote: 'Created basic Express REST endpoints returning structured JSON data.', verified: false }
      ]
    },
    {
      id: 'sql',
      name: 'SQL & Relational DB',
      category: 'database',
      estimatedLevel: 0.34,
      confidence: 0.70,
      targetBenchmark: 0.80,
      status: 'gap',
      evidence: [
        { source: 'resume', quote: 'Understands basic SELECT and WHERE queries on SQLite.', verified: false },
        { source: 'practice', quote: 'Diagnostic failure: struggles with multi-table JOINs and foreign key constraints.', verified: true }
      ]
    },
    {
      id: 'system-design',
      name: 'System Design & Scalability',
      category: 'architecture',
      estimatedLevel: 0.18,
      confidence: 0.55,
      targetBenchmark: 0.70,
      status: 'gap',
      evidence: [
        { source: 'resume', quote: 'Single-server deployments; no experience with load balancers, caching, or DB replication.', verified: false }
      ]
    },
    {
      id: 'docker',
      name: 'Docker & Containers',
      category: 'devops',
      estimatedLevel: 0.22,
      confidence: 0.60,
      targetBenchmark: 0.65,
      status: 'gap',
      evidence: [
        { source: 'resume', quote: 'Can run pre-built container images locally using Docker Desktop.', verified: false }
      ]
    }
  ],
  learningDebt: [
    {
      skillId: 'sql',
      name: 'SQL Foreign Keys & Indexing',
      daysDelayed: 3,
      reason: 'Postponed database schema design during the initial frontend focus.',
      prerequisiteFor: ['Backend REST APIs', 'User Authentication Flow'],
      severity: 'critical'
    },
    {
      skillId: 'docker',
      name: 'Dockerfile Multi-stage Builds',
      daysDelayed: 1,
      reason: 'Skipped containerization chapter to focus on Express routing.',
      prerequisiteFor: ['Production Cloud Deployment'],
      severity: 'warning'
    }
  ]
};

export const INITIAL_ROADMAP_ALEX: RoadmapMilestone[] = [
  {
    id: 'm1',
    weekNumber: 1,
    title: 'Week 1: SQL Foundations & Relational Schemas',
    objective: 'Master relational table structure, foreign keys, normalization, and elementary filtering.',
    skillFocus: 'SQL & Relational DB',
    priority: 'critical',
    status: 'active',
    isRecoveryModule: false,
    estimatedMinutes: 120,
    tasks: [
      { id: 't1', title: 'PostgreSQL Architecture & Schema Constraints', type: 'reading', durationMinutes: 25, done: true },
      { id: 't2', title: 'Practice Lab: INNER, LEFT, and RIGHT JOIN Queries', type: 'quiz', durationMinutes: 25, done: false },
      { id: 't3', title: 'Mini-Challenge: E-Commerce Schema Design', type: 'coding', durationMinutes: 40, done: false }
    ],
    resource: {
      id: 'r1',
      title: 'PostgreSQL Tutorial for Beginners',
      url: 'https://www.postgresql.org/docs/current/tutorial.html',
      source: 'Official PostgreSQL Documentation',
      type: 'documentation',
      difficulty: 'beginner',
      estimatedMinutes: 45,
      skillId: 'sql',
      whyRecommended: 'Industry standard documentation with zero third-party bias.'
    },
    capstoneProject: {
      id: 'proj-sql-1',
      title: 'E-Commerce Relational Data Ledger',
      goal: 'Design a 3NF normalized multi-table database schema with Users, Orders, LineItems, and Products, implementing complex SQL JOIN analytical queries.',
      skillsTrained: ['SQL & Relational DB', 'Database Normalization', 'Query Optimization'],
      requirements: [
        'Multi-table relational schema with foreign key cascades',
        'Complex JOIN queries calculating monthly spend aggregations',
        'Parameterization to prevent SQL injection vulnerabilities',
        'EXPLAIN ANALYZE verification ensuring index usage'
      ],
      techStack: ['PostgreSQL', 'Docker', 'DBeaver / pgAdmin'],
      evaluationCriteria: [
        '100% data integrity with valid constraints',
        'Sub-15ms query execution speed on 10,000 synthetic rows',
        'Clear normalization documentation'
      ],
      difficulty: 'beginner'
    }
  },
  {
    id: 'm2',
    weekNumber: 2,
    title: 'Week 2: Backend APIs with Node & Express',
    objective: 'Wire relational database queries into production Express middleware and parameterized queries.',
    skillFocus: 'Node.js & Express',
    priority: 'high',
    status: 'upcoming',
    isRecoveryModule: false,
    estimatedMinutes: 140,
    tasks: [
      { id: 't4', title: 'Building REST Endpoints with Express Router', type: 'reading', durationMinutes: 30, done: false },
      { id: 't5', title: 'Connecting pg node-postgres to Node Service', type: 'coding', durationMinutes: 45, done: false },
      { id: 't6', title: 'JWT Authentication Middleware', type: 'quiz', durationMinutes: 30, done: false }
    ],
    resource: {
      id: 'r2',
      title: 'Express Routing & Middleware Guide',
      url: 'https://expressjs.com/en/guide/routing.html',
      source: 'Express Official Docs',
      type: 'documentation',
      difficulty: 'intermediate',
      estimatedMinutes: 35,
      skillId: 'node',
      whyRecommended: 'Canonical guide for structuring maintainable server-side endpoints.'
    },
    capstoneProject: {
      id: 'proj-node-2',
      title: 'Secure Multi-Tenant Auth & REST Microservice',
      goal: 'Construct an authenticated Express API backed by PostgreSQL connection pooling, JWT tokens, and automated integration tests.',
      skillsTrained: ['Node.js & Express', 'REST Architecture', 'JWT Authentication'],
      requirements: [
        'User registration and login endpoints with bcrypt password hashing',
        'JWT bearer token verification middleware with role-based access',
        'PostgreSQL connection pool handling concurrent queries',
        'Modular routes, controllers, and centralized error handler'
      ],
      techStack: ['Node.js', 'Express', 'PostgreSQL', 'Jest', 'Supertest'],
      evaluationCriteria: [
        'Passing automated integration tests for all status codes (200, 400, 401, 404)',
        'Zero leaked stack traces in production error handler',
        'Graceful connection pool shutdown'
      ],
      difficulty: 'intermediate'
    }
  },
  {
    id: 'm3',
    weekNumber: 3,
    title: 'Week 3: System Design & Caching Architecture',
    objective: 'Implement Redis caching, indexing strategies, and understand horizontal vs vertical scaling.',
    skillFocus: 'System Design & Scalability',
    priority: 'high',
    status: 'upcoming',
    isRecoveryModule: false,
    estimatedMinutes: 160,
    tasks: [
      { id: 't7', title: 'Database Indexing (B-Tree vs Hash) Performance', type: 'reading', durationMinutes: 40, done: false },
      { id: 't8', title: 'System Design Primer: Scalable Web Architectures', type: 'reading', durationMinutes: 50, done: false }
    ],
    resource: {
      id: 'r3',
      title: 'System Design Primer by Donne Martin',
      url: 'https://github.com/donnemartin/system-design-primer',
      source: 'GitHub / Open Source',
      type: 'article',
      difficulty: 'advanced',
      estimatedMinutes: 60,
      skillId: 'system-design',
      whyRecommended: 'The gold standard open-source guide for software architecture.'
    },
    capstoneProject: {
      id: 'proj-fullstack',
      title: 'Multi-Tenant Expense & Budget API',
      goal: 'Build an authenticated REST service with PostgreSQL persistence, complex SQL JOIN aggregations, and Redis query caching.',
      skillsTrained: ['SQL & Relational DB', 'Node.js & Express', 'System Design & Scalability'],
      requirements: [
        'Relational schema with Users, Organizations, and Expenses tables',
        'Complex SQL queries for category spend aggregations using JOINs and GROUP BY',
        'Parameterized inputs to eliminate SQL injection risks',
        'Docker-compose file launching API, Postgres, and Redis containers'
      ],
      techStack: ['Node.js', 'Express', 'PostgreSQL', 'Docker', 'Redis'],
      evaluationCriteria: [
        'Correct foreign key cascading rules',
        'Demonstrated query execution times under 20ms using EXPLAIN ANALYZE',
        'Passing integration test suite'
      ],
      difficulty: 'intermediate'
    }
  }
];

export const ADAPTED_ROADMAP_ALEX: RoadmapMilestone[] = [
  {
    id: 'm-recovery',
    weekNumber: 1,
    title: '⚡ Recovery Module: SQL JOIN Mastery & Visual Queries',
    objective: 'Reinforce relational joins (INNER, LEFT, RIGHT, FULL) with visual Venn diagrams and targeted interactive query challenges.',
    skillFocus: 'SQL & Relational DB',
    priority: 'critical',
    status: 'active',
    isRecoveryModule: true,
    estimatedMinutes: 45,
    tasks: [
      { id: 'rec-t1', title: 'Visual Breakdown of Relational JOIN Types (Interactive)', type: 'reading', durationMinutes: 15, done: false },
      { id: 'rec-t2', title: 'Interactive Join Sandbox: 3 Progressive Query Fixes', type: 'practice', durationMinutes: 20, done: false },
      { id: 'rec-t3', title: 'JOIN Recovery Diagnostic Quiz', type: 'quiz', durationMinutes: 10, done: false }
    ],
    resource: {
      id: 'r-rec',
      title: 'SQL JOINs Explained Visually',
      url: 'https://mode.com/sql-tutorial/sql-joins/',
      source: 'Mode Analytics Academy',
      type: 'interactive',
      difficulty: 'beginner',
      estimatedMinutes: 25,
      skillId: 'sql',
      whyRecommended: 'Visual diagrammatic breakdown proven to resolve JOIN confusion quickly.'
    }
  },
  {
    id: 'm1',
    weekNumber: 1,
    title: 'Week 1: SQL Foundations & Relational Schemas',
    objective: 'Master relational table structure, foreign keys, normalization, and elementary filtering.',
    skillFocus: 'SQL & Relational DB',
    priority: 'critical',
    status: 'active',
    isRecoveryModule: false,
    estimatedMinutes: 120,
    tasks: [
      { id: 't1', title: 'PostgreSQL Architecture & Schema Constraints', type: 'reading', durationMinutes: 25, done: true },
      { id: 't2', title: 'Practice Lab: INNER, LEFT, and RIGHT JOIN Queries', type: 'quiz', durationMinutes: 25, done: true },
      { id: 't3', title: 'Mini-Challenge: E-Commerce Schema Design', type: 'coding', durationMinutes: 40, done: false }
    ],
    resource: {
      id: 'r1',
      title: 'PostgreSQL Tutorial for Beginners',
      url: 'https://www.postgresql.org/docs/current/tutorial.html',
      source: 'Official PostgreSQL Documentation',
      type: 'documentation',
      difficulty: 'beginner',
      estimatedMinutes: 45,
      skillId: 'sql',
      whyRecommended: 'Industry standard documentation with zero third-party bias.'
    }
  },
  {
    id: 'm2',
    weekNumber: 2,
    title: 'Week 2: Backend APIs with Node & Express',
    objective: 'Wire relational database queries into production Express middleware and parameterized queries.',
    skillFocus: 'Node.js & Express',
    priority: 'high',
    status: 'upcoming',
    isRecoveryModule: false,
    estimatedMinutes: 140,
    delayDays: 2,
    tasks: [
      { id: 't4', title: 'Building REST Endpoints with Express Router', type: 'reading', durationMinutes: 30, done: false },
      { id: 't5', title: 'Connecting pg node-postgres to Node Service', type: 'coding', durationMinutes: 45, done: false },
      { id: 't6', title: 'JWT Authentication Middleware', type: 'quiz', durationMinutes: 30, done: false }
    ],
    resource: {
      id: 'r2',
      title: 'Express Routing & Middleware Guide',
      url: 'https://expressjs.com/en/guide/routing.html',
      source: 'Express Official Docs',
      type: 'documentation',
      difficulty: 'intermediate',
      estimatedMinutes: 35,
      skillId: 'node',
      whyRecommended: 'Canonical guide for structuring maintainable server-side endpoints.'
    }
  },
  {
    id: 'm3',
    weekNumber: 3,
    title: 'Week 3: System Design & Caching Architecture',
    objective: 'Implement Redis caching, indexing strategies, and understand horizontal vs vertical scaling.',
    skillFocus: 'System Design & Scalability',
    priority: 'high',
    status: 'upcoming',
    isRecoveryModule: false,
    estimatedMinutes: 160,
    delayDays: 2,
    tasks: [
      { id: 't7', title: 'Database Indexing (B-Tree vs Hash) Performance', type: 'reading', durationMinutes: 40, done: false },
      { id: 't8', title: 'System Design Primer: Scalable Web Architectures', type: 'reading', durationMinutes: 50, done: false }
    ],
    resource: {
      id: 'r3',
      title: 'System Design Primer by Donne Martin',
      url: 'https://github.com/donnemartin/system-design-primer',
      source: 'GitHub / Open Source',
      type: 'article',
      difficulty: 'advanced',
      estimatedMinutes: 60,
      skillId: 'system-design',
      whyRecommended: 'The gold standard open-source guide for software architecture.'
    }
  }
];

import { COMPREHENSIVE_QUESTION_BANK } from './questionBank';

export const SQL_PRACTICE_QUESTIONS: PracticeQuestion[] = COMPREHENSIVE_QUESTION_BANK;

export const INITIAL_AGENT_RUNS: AgentRunLog[] = [
  {
    id: 'log-1',
    agentName: 'Profile Agent',
    status: 'success',
    durationMs: 420,
    inputSummary: 'Parsed resume: Alex_Rivera_Software_Resume.pdf (1,480 tokens)',
    outputSummary: 'Extracted 6 verified skills, 3 projects, 1 education credential. Calculated average confidence: 0.74.',
    confidence: 0.88,
    timestamp: 'Just now'
  },
  {
    id: 'log-2',
    agentName: 'Skill Intelligence Agent',
    status: 'success',
    durationMs: 280,
    inputSummary: 'Normalized extracted entities against canonical Full Stack Developer taxonomy.',
    outputSummary: 'Matched 6 ontology nodes: JS (ES6), React, Node, SQL, Docker, System Design.',
    confidence: 0.95,
    timestamp: 'Just now'
  },
  {
    id: 'log-3',
    agentName: 'Gap Agent',
    status: 'success',
    durationMs: 310,
    inputSummary: 'Compared Alex (current: 42%) vs Full Stack benchmark vector.',
    outputSummary: 'Flagged 2 Critical Gaps (SQL: delta 0.46, System Design: delta 0.52).',
    confidence: 0.91,
    timestamp: 'Just now'
  },
  {
    id: 'log-4',
    agentName: 'Roadmap Planner Agent',
    status: 'success',
    durationMs: 510,
    inputSummary: 'Constructed 3-week learning DAG for 30 min/day commitment.',
    outputSummary: 'Generated 3 milestones, 8 tasks, and 1 verified capstone project.',
    confidence: 0.89,
    timestamp: 'Just now'
  }
];
