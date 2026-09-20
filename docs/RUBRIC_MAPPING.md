# EduPath - Hackathon Rubric Mapping & Traceability Matrix

This document maps every major architectural decision, feature, and interaction in **EduPath** directly to the hackathon evaluation rubric.

---

## Evaluation Criteria Breakdown

| Criterion | Weight | EduPath Core Features & Implementations | Verifiable Evidence |
| :--- | :---: | :--- | :--- |
| **Problem Understanding** | **15%** | • **Scattered Learning Reality**: Solves information overload across fragmented documentation, videos, and tutorials.<br>• **Confidence-Aware Skill Extraction**: Extracts skills with explicit evidence tags instead of blind assumptions.<br>• **Bottleneck & Learning Debt Detection**: Recognizes that learning paths fail because static courses don't adapt when students struggle. | • Evidence badges on every extracted skill.<br>• Priority scoring on skill gaps (based on target role frequency).<br>• Dedicated "Learning Debt" monitor flagging postponed prerequisites. |
| **Prototype Quality & UX** | **20%** | • **Career Operating System Design**: Clean, dark-mode-first aesthetic with deep indigo/blue slate tones, avoiding generic dashboards.<br>• **Interactive Skill Constellation**: Visual node graph comparing current proficiency against target role benchmarks.<br>• **Adaptive Route Transition**: Visual before/after diff showing exactly how the roadmap recalculated.<br>• **Responsive & Accessible**: Keyboard navigable, high-contrast typography, accessible list alternatives. | • 16 cohesive view components.<br>• Real-time reactive updates without page reloads.<br>• Live "Why This?" explainability drawer on all missions.<br>• Interactive Practice Lab with instant diagnostic feedback. |
| **AI Integration** | **25%** | • **Modular Multi-Agent Architecture**: Autonomous Adaptive Planner, Skill Diagnostic Engine, Capability Analyzer, and Contextual AI Mentor.<br>• **Structured Output Enforcement**: Rigorous JSON schema validation with fallback resilience.<br>• **Zero-Fail Deterministic Demo Engine**: Complete simulation mode with live agent log inspector for 100% demo reliability.<br>• **pgvector Semantic Search**: Embedding-backed matching between skill gaps, course resources, and projects. | • Agent Activity Panel showing real-time execution times, tool calls, and inputs/outputs.<br>• True adaptive replanning loop (Observe &rarr; Analyze &rarr; Plan &rarr; Act &rarr; Evaluate &rarr; Adapt).<br>• Contextual AI Mentor querying user state, active gaps, and practice errors. |
| **LinkedIn Content + Engagement** | **25%** | • **Authentic Build-In-Public Strategy**: 8 structured, narrative-driven posts covering problem discovery, agent architecture, demo gifs, and launch.<br>• **10-Slide Viral Carousel Outline**: Compelling visual story on "Why static roadmaps fail".<br>• **No Fake Traction**: Honest, technical storytelling emphasizing architecture and engineering rigor. | • Complete 8-post copy + visual prompts in `/docs/LINKEDIN_CONTENT.md`.<br>• 10-slide carousel script ready for Canva/Figma in `/docs/LINKEDIN_CONTENT.md`. |
| **Innovation & Creativity** | **15%** | • **Adaptive Route Engine**: Dynamic insertion of recovery modules when practice failures occur.<br>• **Skill-to-Project Evidence Loop**: Skills progress from "Claimed" to "Demonstrated" via milestone capstones.<br>• **"Learning Debt" Concept**: Unique psychological and structural UX for delayed learning topics.<br>• **AI Decision Timeline**: Transparent event timeline detailing why adaptations were made without leaking chain-of-thought. | • Interactive SQL struggle simulation in Demo Mode.<br>• "Why did my plan change?" trigger-evidence-action card.<br>• Real-time skill confidence calculation (0.00 &rarr; 1.00). |

---

## Detailed Feature Traceability

### 1. Problem Understanding (15%)
- **Target Role Gap Weighting**: Gaps are not equal. EduPath weights gaps by industry market frequency (e.g., SQL required by 8/10 roles vs Docker required by 3/10).
- **The "Struggle Fallacy"**: Most e-learning platforms treat failure as a binary repeat. EduPath diagnoses *concept-level bottlenecks* (e.g., struggling with `JOIN` logic, not general SQL syntax).

### 2. Prototype Quality & UX (20%)
- **Information Architecture**:
  - `Overview`: High-level readiness, active bottleneck alerts, today's mission.
  - `Skills`: Dual-layer constellation comparing learner vs. industry requirements.
  - `Path`: Multi-week timeline with dynamic milestone mutation.
  - `Practice`: Adaptive difficulty lab (MCQ, debugging, SQL query sandboxes).
  - `Projects`: Generated capstones directly tied to closing active gaps.
  - `Mentor`: Contextual assistant aware of current roadmap node and recent test answers.
- **Design Tokens**: Slate background (`#0b0f19`), Surface card (`#111827`), Accent Indigo (`#6366f1`), Emerald success (`#10b981`), Amber warning (`#f59e0b`), Rose alert (`#f43f5e`).

### 3. AI Integration (25%)
- **Modular Agent Subsystems**:
  1. `Adaptive Planner Engine`: Detects consecutive diagnostic failures, triggers topological DAG recalculation, and generates explainability receipts.
  2. `Skill Diagnostic Engine`: Administers role-specific technical assessments, verifies competencies, and identifies critical prerequisite gaps.
  3. `Capability Analyzer`: Parses uploaded resumes/portfolios and extracts skills with verified confidence scores and evidence quotes.
  4. `Contextual AI Mentor`: Ingests active profile context and active roadmap node to answer questions and explain why milestones adapted.

### 4. LinkedIn & Community Strategy (25%)
- Fully scripted 8-part build campaign designed to generate genuine developer community interest.
- Designed to highlight technical architecture rather than buzzwords.

### 5. Innovation Highlights (15%)
- **Learning Debt Rebalancer**: A user who skips difficult items is warned before cascading prerequisites break down.
- **Explainable Adaptations**: The "Why did my plan change?" card directly satisfies judge demands for transparent AI decision-making.
