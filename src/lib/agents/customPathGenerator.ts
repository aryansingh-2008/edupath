// EduPath Dynamic Custom Path Generator
// Analyzes arbitrary user skills and target roles, calculating real gaps & generating tailored roadmaps.

import { LearnerProfile, RoadmapMilestone, PracticeQuestion, Skill } from '../../types/index';

export interface RoleBenchmark {
  role: string;
  skills: Array<{
    name: string;
    category: 'frontend' | 'backend' | 'database' | 'architecture' | 'devops' | 'ai';
    targetBenchmark: number;
    importance: 'critical' | 'high' | 'medium';
    defaultReason: string;
  }>;
  curatedMilestones: Array<{
    weekNumber: number;
    title: string;
    skillFocus: string;
    objective: string;
    resourceTitle: string;
    resourceUrl: string;
    resourceType: 'documentation' | 'interactive' | 'video';
    source: string;
    tasks: string[];
  }>;
  practiceQuestions: PracticeQuestion[];
}

export const ROLE_BENCHMARKS: Record<string, RoleBenchmark> = {
  'Full Stack Developer': {
    role: 'Full Stack Developer',
    skills: [
      { name: 'JavaScript (ES6+)', category: 'frontend', targetBenchmark: 0.85, importance: 'high', defaultReason: 'Core web browser scripting language.' },
      { name: 'React.js', category: 'frontend', targetBenchmark: 0.80, importance: 'high', defaultReason: 'Primary client-side component architecture.' },
      { name: 'Node.js & Express', category: 'backend', targetBenchmark: 0.75, importance: 'high', defaultReason: 'Server-side API execution and middleware.' },
      { name: 'SQL & Relational DB', category: 'database', targetBenchmark: 0.80, importance: 'critical', defaultReason: 'Relational data persistence, schemas, and indexing.' },
      { name: 'System Design & Scalability', category: 'architecture', targetBenchmark: 0.70, importance: 'critical', defaultReason: 'Caching, horizontal scaling, and architectural patterns.' },
      { name: 'Docker & Containers', category: 'devops', targetBenchmark: 0.65, importance: 'medium', defaultReason: 'Containerized deployment and microservices isolation.' }
    ],
    curatedMilestones: [
      {
        weekNumber: 1,
        title: 'Week 1: SQL Foundations & Relational Schemas',
        skillFocus: 'SQL & Relational DB',
        objective: 'Master PostgreSQL schemas, foreign key constraints, and relational query filtering.',
        resourceTitle: 'PostgreSQL Tutorial for Beginners',
        resourceUrl: 'https://www.postgresql.org/docs/current/tutorial.html',
        resourceType: 'documentation',
        source: 'PostgreSQL Global Development Group',
        tasks: ['PostgreSQL Table Constraints & DDL', 'Solving Multi-table Query JOINs', 'Relational Schema Normalization (3NF)']
      },
      {
        weekNumber: 2,
        title: 'Week 2: Backend REST APIs with Node.js',
        skillFocus: 'Node.js & Express',
        objective: 'Construct production Express routers, authentication middleware, and parameterized SQL queries.',
        resourceTitle: 'Express.js Routing Guide',
        resourceUrl: 'https://expressjs.com/en/guide/routing.html',
        resourceType: 'documentation',
        source: 'Express Official Docs',
        tasks: ['Express Router & Controller Organization', 'JWT Authentication & Password Hashing', 'Database Connection Pooling with pg']
      },
      {
        weekNumber: 3,
        title: 'Week 3: System Design & Caching Architecture',
        skillFocus: 'System Design & Scalability',
        objective: 'Implement Redis caching, database indexing benchmarks, and load balancing.',
        resourceTitle: 'System Design Primer',
        resourceUrl: 'https://github.com/donnemartin/system-design-primer',
        resourceType: 'documentation',
        source: 'Open Source',
        tasks: ['B-Tree Indexing Optimization', 'Redis Cache-Aside Pattern', 'Horizontal Scalability Architecture']
      }
    ],
    practiceQuestions: [
      {
        id: 'fs-q1',
        skillId: 'sql',
        skillName: 'SQL & Relational DB',
        subConcept: 'JOIN Queries',
        prompt: 'Which SQL join returns all records from the left table and only matched records from the right table?',
        type: 'mcq',
        options: ['INNER JOIN', 'LEFT OUTER JOIN', 'FULL JOIN', 'CROSS JOIN'],
        correctIndex: 1,
        explanation: 'LEFT JOIN preserves every row from the primary table even when no foreign key match exists in the joined table.',
        hint: 'Think about preserving the left table rows.',
        difficulty: 'intermediate'
      },
      {
        id: 'fs-q2',
        skillId: 'js',
        skillName: 'JavaScript (ES6+)',
        subConcept: 'Event Loop & Microtasks',
        prompt: 'What is the console output order of the following JavaScript snippet?\n\nconsole.log("1");\nsetTimeout(() => console.log("2"), 0);\nPromise.resolve().then(() => console.log("3"));\nconsole.log("4");',
        type: 'mcq',
        options: ['1, 2, 3, 4', '1, 4, 3, 2', '1, 4, 2, 3', '1, 3, 4, 2'],
        correctIndex: 1,
        explanation: 'Synchronous code runs first ("1", "4"). Microtasks (Promise.then) run before macrotasks (setTimeout), logging "3", then "2".',
        hint: 'Microtasks are processed before the timer macrotask queue.',
        difficulty: 'intermediate'
      },
      {
        id: 'fs-q3',
        skillId: 'react',
        skillName: 'React.js',
        subConcept: 'Automatic Batching (React 18)',
        prompt: 'In React 18, how does automatic batching handle multiple state updates inside async promises and timeouts?',
        type: 'mcq',
        options: [
          'State updates inside async callbacks trigger separate re-renders per update',
          'Multiple state updates are batched together into a single re-render automatically',
          'Automatic batching is disabled unless wrapping state in ReactDOM.flushSync()',
          'State updates are dropped if called outside of synthetic event handlers'
        ],
        correctIndex: 1,
        explanation: 'React 18 automatically batches all state updates across promises, setTimeout, and native events, triggering only one re-render.',
        hint: 'React 18 aims to eliminate unnecessary re-renders everywhere.',
        difficulty: 'intermediate'
      }
    ]
  },
  'Data Scientist': {
    role: 'Data Scientist',
    skills: [
      { name: 'Python Programming', category: 'ai', targetBenchmark: 0.90, importance: 'critical', defaultReason: 'Foundational language for data science and scripting.' },
      { name: 'SQL & Data Extraction', category: 'database', targetBenchmark: 0.85, importance: 'high', defaultReason: 'Querying enterprise data warehouses and ETL pipelines.' },
      { name: 'Pandas & Data Wrangling', category: 'ai', targetBenchmark: 0.85, importance: 'critical', defaultReason: 'Manipulating tabular DataFrames and cleaning nulls.' },
      { name: 'Statistical Modeling & Math', category: 'ai', targetBenchmark: 0.80, importance: 'high', defaultReason: 'Probability distributions, hypothesis testing, and regression.' },
      { name: 'Machine Learning (Scikit-Learn)', category: 'ai', targetBenchmark: 0.80, importance: 'critical', defaultReason: 'Classification, clustering, and cross-validation.' },
      { name: 'Data Storytelling & BI', category: 'frontend', targetBenchmark: 0.70, importance: 'medium', defaultReason: 'Visualizing insights via charts and dashboards.' }
    ],
    curatedMilestones: [
      {
        weekNumber: 1,
        title: 'Week 1: Python for Data Analysis & Pandas',
        skillFocus: 'Pandas & Data Wrangling',
        objective: 'Master Pandas DataFrames, handling missing values, groupby aggregations, and data joins.',
        resourceTitle: 'Pandas User Guide & Tutorials',
        resourceUrl: 'https://pandas.pydata.org/docs/user_guide/index.html',
        resourceType: 'documentation',
        source: 'Pandas Dev Team',
        tasks: ['DataFrame Indexing & Filtering', 'Groupby & Multi-Index Aggregations', 'Handling Outliers and Imputing Missing Values']
      },
      {
        weekNumber: 2,
        title: 'Week 2: Statistical Foundations & Exploratory Data Analysis',
        skillFocus: 'Statistical Modeling & Math',
        objective: 'Conduct hypothesis testing (p-values, t-tests, ANOVA) and feature correlation matrix analysis.',
        resourceTitle: 'Khan Academy Statistics & Probability',
        resourceUrl: 'https://www.khanacademy.org/math/statistics-probability',
        resourceType: 'interactive',
        source: 'Khan Academy',
        tasks: ['Probability Distributions & Z-Scores', 'Hypothesis Testing & Confidence Intervals', 'Feature Correlation Heatmaps with Seaborn']
      },
      {
        weekNumber: 3,
        title: 'Week 3: Machine Learning with Scikit-Learn',
        skillFocus: 'Machine Learning (Scikit-Learn)',
        objective: 'Train supervised models (Random Forest, Logistic Regression, XGBoost) and evaluate using ROC-AUC.',
        resourceTitle: 'Scikit-Learn Official User Guide',
        resourceUrl: 'https://scikit-learn.org/stable/user_guide.html',
        resourceType: 'documentation',
        source: 'Scikit-Learn',
        tasks: ['Feature Scaling & Encoding (OneHotEncoder)', 'Cross-Validation & Hyperparameter Tuning', 'ROC-AUC & Confusion Matrix Evaluation']
      }
    ],
    practiceQuestions: [
      {
        id: 'ds-q1',
        skillId: 'pandas',
        skillName: 'Pandas & Data Wrangling',
        subConcept: 'Missing Data Handling',
        prompt: 'In Pandas, which method is used to fill NaN values with a specific static value or calculated column mean?',
        type: 'mcq',
        options: ['df.dropna()', 'df.fillna()', 'df.replace_null()', 'df.impute()'],
        correctIndex: 1,
        explanation: 'df.fillna() replaces all NA/NaN values with specified values or statistical metrics like mean/median.',
        hint: 'Look for the word "fill".',
        difficulty: 'beginner'
      },
      {
        id: 'ds-q2',
        skillId: 'sql',
        skillName: 'SQL & Data Extraction',
        subConcept: 'HAVING Clause Aggregation',
        prompt: 'Which clause must you use to filter aggregated group results (e.g., groups with COUNT(*) > 5) in an SQL query?',
        type: 'mcq',
        options: ['WHERE', 'HAVING', 'QUALIFY', 'FILTER BY'],
        correctIndex: 1,
        explanation: 'HAVING filters summarized rows after GROUP BY aggregation, whereas WHERE filters individual rows before grouping.',
        hint: 'Applied after GROUP BY in SQL execution order.',
        difficulty: 'intermediate'
      },
      {
        id: 'ds-q3',
        skillId: 'stats',
        skillName: 'Statistical Modeling & Math',
        subConcept: 'Hypothesis Testing & P-Values',
        prompt: 'In hypothesis testing, if the calculated p-value is 0.02 and your significance threshold alpha is 0.05, what is the conclusion?',
        type: 'mcq',
        options: [
          'Fail to reject the null hypothesis',
          'Reject the null hypothesis as evidence of a significant effect',
          'Accept the null hypothesis as proven fact',
          'The sample size is too small to make a conclusion'
        ],
        correctIndex: 1,
        explanation: 'When p-value (0.02) is less than alpha (0.05), we reject the null hypothesis, concluding there is statistically significant evidence.',
        hint: 'If p is low, the null must go.',
        difficulty: 'intermediate'
      }
    ]
  },
  'AI / ML Engineer': {
    role: 'AI / ML Engineer',
    skills: [
      { name: 'Python & OOP', category: 'ai', targetBenchmark: 0.90, importance: 'critical', defaultReason: 'Core implementation language for models and inference pipelines.' },
      { name: 'PyTorch & Deep Learning', category: 'ai', targetBenchmark: 0.85, importance: 'critical', defaultReason: 'Neural network training, autograd, and backpropagation.' },
      { name: 'Vector Databases & Embeddings', category: 'database', targetBenchmark: 0.80, importance: 'high', defaultReason: 'pgvector, semantic similarity search, and RAG architectures.' },
      { name: 'LLM Orchestration & Agents', category: 'ai', targetBenchmark: 0.85, importance: 'critical', defaultReason: 'Prompt engineering, function calling, tool use, and LangChain/LlamaIndex.' },
      { name: 'Model Serving & FastAPI', category: 'backend', targetBenchmark: 0.75, importance: 'high', defaultReason: 'High-throughput async inference endpoints with batching.' }
    ],
    curatedMilestones: [
      {
        weekNumber: 1,
        title: 'Week 1: Vector Embeddings & pgvector Retrieval',
        skillFocus: 'Vector Databases & Embeddings',
        objective: 'Setup PostgreSQL pgvector extension, generate text embeddings, and implement cosine distance similarity search.',
        resourceTitle: 'pgvector Documentation & Usage Guide',
        resourceUrl: 'https://github.com/pgvector/pgvector',
        resourceType: 'documentation',
        source: 'pgvector Open Source',
        tasks: ['Enable pgvector & Create Vector Columns', 'HNSW Indexing for Sub-50ms Retrieval', 'Building Hybrid Semantic Search (BM25 + Dense Vectors)']
      },
      {
        weekNumber: 2,
        title: 'Week 2: RAG Architecture & Multi-Agent Chains',
        skillFocus: 'LLM Orchestration & Agents',
        objective: 'Construct Retrieval-Augmented Generation (RAG) pipelines with contextual compression and function calling tools.',
        resourceTitle: 'LangChain Concept Guides: Retrieval & RAG',
        resourceUrl: 'https://python.langchain.com/docs/concepts/#retrieval',
        resourceType: 'documentation',
        source: 'LangChain Docs',
        tasks: ['Chunking Strategies & Overlap Tuning', 'Contextual Re-ranking with Cross-Encoders', 'Building Autonomous Tool-Calling Agents']
      },
      {
        weekNumber: 3,
        title: 'Week 3: Production Model Serving with FastAPI',
        skillFocus: 'Model Serving & FastAPI',
        objective: 'Deploy low-latency asynchronous model endpoints with GPU batching and streaming SSE responses.',
        resourceTitle: 'FastAPI Official Documentation',
        resourceUrl: 'https://fastapi.tiangolo.com/',
        resourceType: 'documentation',
        source: 'FastAPI',
        tasks: ['Async Request Handling & Pydantic Validation', 'Server-Sent Events (SSE) Streaming Tokens', 'Dockerizing AI Service for Production Cloud']
      }
    ],
    practiceQuestions: [
      {
        id: 'ai-q1',
        skillId: 'vector-db',
        skillName: 'Vector Databases & Embeddings',
        subConcept: 'Cosine Distance Metric',
        prompt: 'In pgvector, which operator calculates the Cosine Distance between two vector embeddings?',
        type: 'mcq',
        options: ['<->', '<#>', '<=>', '<+>'],
        correctIndex: 2,
        explanation: 'In pgvector, <=> computes cosine distance (1 - cosine similarity), <-> computes Euclidean (L2) distance, and <#> computes negative inner product.',
        hint: 'It uses the equals sign between angle brackets.',
        difficulty: 'intermediate'
      },
      {
        id: 'ai-q2',
        skillId: 'pytorch',
        skillName: 'PyTorch & Deep Learning',
        subConcept: 'Gradient Accumulation Reset',
        prompt: 'In PyTorch, why must optimizer.zero_grad() be called before loss.backward() in each training iteration?',
        type: 'mcq',
        options: [
          'To reset model weights to random normal distribution',
          'Because PyTorch accumulates gradients by default, so old gradients must be cleared',
          'To free GPU VRAM allocated by the DataLoader',
          'To switch the neural network from training mode to evaluation mode'
        ],
        correctIndex: 1,
        explanation: 'PyTorch accumulates gradients across backward calls. Without zero_grad(), new gradients would add to old batch gradients.',
        hint: 'PyTorch does not overwrite gradients automatically; it sums them.',
        difficulty: 'intermediate'
      },
      {
        id: 'ai-q3',
        skillId: 'fastapi',
        skillName: 'Model Serving & FastAPI',
        subConcept: 'Async Generator Streaming',
        prompt: 'Why are async def routes with StreamingResponse preferred over sync def routes when streaming LLM tokens in FastAPI?',
        type: 'mcq',
        options: [
          'Async routes allow non-blocking token yielding so concurrent requests are not blocked',
          'FastAPI cannot serialize JSON objects in synchronous functions',
          'Synchronous functions disable HTTPS TLS encryption',
          'Async functions automatically run on the GPU tensor cores'
        ],
        correctIndex: 0,
        explanation: 'Async generator functions stream chunks without blocking FastAPI event loop thread pool, allowing high concurrency.',
        hint: 'Think about event loop non-blocking behavior.',
        difficulty: 'intermediate'
      }
    ]
  }
};

export interface DiagnosticSubmission {
  skillName: string;
  isCorrect: boolean;
}

export function getDiagnosticQuestions(targetRoleName: string): PracticeQuestion[] {
  const benchmark = ROLE_BENCHMARKS[targetRoleName] || ROLE_BENCHMARKS['Full Stack Developer'];
  return benchmark.practiceQuestions;
}

export function generateCustomLearnerProfile(
  userName: string,
  targetRoleName: string,
  userSkillsInput: string,
  dailyCommitment: number = 30,
  experienceLevel: string = 'Junior (1-2 yrs)',
  careerGoal: string = '',
  diagnosticSubmissions?: DiagnosticSubmission[]
): {
  profile: LearnerProfile;
  roadmap: RoadmapMilestone[];
  practiceQuestions: PracticeQuestion[];
} {
  const benchmark = ROLE_BENCHMARKS[targetRoleName] || ROLE_BENCHMARKS['Full Stack Developer'];
  const userSkillList = userSkillsInput
    .toLowerCase()
    .split(/[,;\n]+/)
    .map(s => s.trim())
    .filter(s => s.length > 0);

  // Compute skill proficiencies based on DIAGNOSTIC CHECK or self-report
  const skills: Skill[] = benchmark.skills.map((bench, idx) => {
    // Check if evaluated in the initial diagnostic check
    const diagMatch = diagnosticSubmissions?.find(sub => {
      const benchTokens = bench.name.toLowerCase().split(/[\s&/(),]+/);
      return benchTokens.some(t => t.length > 2 && sub.skillName.toLowerCase().includes(t));
    });

    let estimatedLevel = 0.20;
    let confidence = 0.60;
    let status: Skill['status'] = 'gap';
    let evidenceQuote = `Self-reported initial baseline for ${bench.name}.`;
    let evidenceSource: Skill['evidence'][0]['source'] = 'resume';
    let verified = false;

    if (diagMatch) {
      if (diagMatch.isCorrect) {
        estimatedLevel = 0.88;
        confidence = 0.98;
        status = 'mastered';
        evidenceQuote = `Demonstrated verified proficiency in initial technical diagnostic check (100% correct answer).`;
        evidenceSource = 'practice';
        verified = true;
      } else {
        estimatedLevel = 0.18;
        confidence = 0.92;
        status = 'gap';
        evidenceQuote = `Diagnostic check identified critical prerequisite gap in ${bench.name}. Prioritized for immediate remediation.`;
        evidenceSource = 'practice';
        verified = false;
      }
    } else {
      const match = userSkillList.some(userSkill =>
        bench.name.toLowerCase().includes(userSkill) || userSkill.includes(bench.name.toLowerCase().split(' ')[0])
      );

      if (match) {
        estimatedLevel = 0.70 + Math.random() * 0.15;
        confidence = 0.85;
        status = estimatedLevel >= bench.targetBenchmark ? 'mastered' : 'developing';
        evidenceQuote = `Verified via profile intake: learner identified proficiency in ${bench.name}.`;
        verified = true;
      }
    }

    return {
      id: `skill-${idx}`,
      name: bench.name,
      category: bench.category,
      estimatedLevel: Math.round(estimatedLevel * 100) / 100,
      confidence: Math.round(confidence * 100) / 100,
      targetBenchmark: bench.targetBenchmark,
      status,
      evidence: [
        {
          source: evidenceSource,
          quote: evidenceQuote,
          verified
        }
      ]
    };
  });

  // Calculate overall readiness based on tested skills and benchmarks
  const totalScore = skills.reduce((acc, s) => acc + (s.estimatedLevel / s.targetBenchmark), 0);
  const readinessPercentage = Math.min(95, Math.round((totalScore / skills.length) * 100 * 0.75));

  // Determine if a critical diagnostic failure occurred and prioritize it in Week 1
  const failedDiag = diagnosticSubmissions?.find(s => !s.isCorrect);

  // Build tailored roadmap with level-based Capstone Projects
  const roadmap: RoadmapMilestone[] = benchmark.curatedMilestones.map((m, idx) => {
    const isBeginner = experienceLevel.toLowerCase().includes('student') || experienceLevel.toLowerCase().includes('junior');
    const capstoneDifficulty = isBeginner ? 'beginner' : 'intermediate';

    // If milestone matches failed diagnostic skill, make it Week 1 priority
    const isDiagnosedGap = failedDiag && m.skillFocus.toLowerCase().includes(failedDiag.skillName.toLowerCase().split(' ')[0]);

    return {
      id: `m-custom-${idx + 1}`,
      weekNumber: m.weekNumber,
      title: isDiagnosedGap ? `⚡ ${m.title} (Diagnosed Prerequisite Gap)` : m.title,
      objective: isDiagnosedGap
        ? `Remediate tested diagnostic difficulty in ${m.skillFocus} with focused foundation and interactive query practice.`
        : m.objective,
      skillFocus: m.skillFocus,
      priority: idx === 0 || isDiagnosedGap ? 'critical' : 'high',
      status: idx === 0 ? 'active' : 'upcoming',
      isRecoveryModule: Boolean(isDiagnosedGap && idx === 0),
      estimatedMinutes: dailyCommitment * 4,
      tasks: m.tasks.map((taskTitle, tIdx) => ({
        id: `task-c-${idx}-${tIdx}`,
        title: taskTitle,
        type: tIdx === 1 ? 'quiz' : tIdx === 2 ? 'coding' : 'reading',
        durationMinutes: Math.round(dailyCommitment * 0.7),
        done: idx === 0 && tIdx === 0
      })),
      resource: {
        id: `res-c-${idx}`,
        title: m.resourceTitle,
        url: m.resourceUrl,
        source: m.source,
        type: m.resourceType,
        difficulty: idx === 0 ? 'beginner' : 'intermediate',
        estimatedMinutes: dailyCommitment,
        skillId: `skill-${idx}`,
        whyRecommended: `Essential industry standard resource to close your ${m.skillFocus} gap.`
      },
      capstoneProject: {
        id: `proj-custom-${idx + 1}`,
        title: `${m.skillFocus} Production Capstone`,
        goal: `Construct an industry-standard solution applying ${m.skillFocus} to solve real-world problems in ${targetRoleName}.`,
        skillsTrained: [m.skillFocus, targetRoleName],
        requirements: [
          `Architect core modular components for ${m.skillFocus}`,
          'Implement unit test assertions validating business edge cases',
          'Optimize execution latency and adhere to production security standards'
        ],
        techStack: [targetRoleName.includes('AI') || targetRoleName.includes('Data') ? 'Python' : 'Node.js / React', 'Git', 'Docker'],
        evaluationCriteria: [
          'Passes automated test assertions with zero runtime exceptions',
          'Clean modular architectural separation',
          'Documented README with setup and verification steps'
        ],
        difficulty: capstoneDifficulty
      }
    };
  });

  const profile: LearnerProfile = {
    id: `user-${Date.now()}`,
    name: userName.trim() || 'Learner',
    avatarInitial: (userName.trim()[0] || 'U').toUpperCase(),
    tagline: `Targeting: ${targetRoleName}`,
    targetRole: targetRoleName,
    careerGoal: careerGoal || `Master ${targetRoleName} competencies and transition to a high-impact role.`,
    experienceLevel: experienceLevel || 'Junior (1-2 yrs)',
    learningPreference: 'Hands-on Coding & Interactive',
    dailyCommitmentMinutes: dailyCommitment,
    readinessPercentage,
    streakDays: 1,
    xpPoints: diagnosticSubmissions ? diagnosticSubmissions.filter(s => s.isCorrect).length * 50 : 100,
    resumeParsed: true,
    extractedRawProjects: 2,
    skills,
    learningDebt: []
  };

  return {
    profile,
    roadmap,
    practiceQuestions: benchmark.practiceQuestions
  };
}
