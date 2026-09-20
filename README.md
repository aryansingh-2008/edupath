# EduPath — Autonomous AI Career Learning Platform

[![EduPath CI/CD](https://github.com/aryansingh-2008/edupath/actions/workflows/ci.yml/badge.svg)](https://github.com/aryansingh-2008/edupath/actions/workflows/ci.yml)
[![Vercel Deployment](https://img.shields.io/badge/Vercel-Live%20Demo-brightgreen?logo=vercel)](https://edupath-tawny.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

> **"Your skills today. Your career tomorrow. One adaptive path."**  
> EduPath is an autonomous career learning and skill gap agent that replaces rigid, static course playlists with dynamic, closed-loop adaptive curriculum sequencing.

---

## 🌐 Live Production Application

- **Live URL**: [https://edupath-tawny.vercel.app](https://edupath-tawny.vercel.app)
- **GitHub Repository**: [https://github.com/aryansingh-2008/edupath](https://github.com/aryansingh-2008/edupath)

---

## ⚡ Quick Evaluation Access

For judges, evaluators, and peer reviewers:
- **Live Demo Link**: [https://edupath-tawny.vercel.app](https://edupath-tawny.vercel.app)
- **Demo Account**:
  - **Username / Email**: `admin`
  - **Password**: `123456`
- **Offline PDF Manual**: Detailed documentation is included in [`EduPath_User_Manual.pdf`](./EduPath_User_Manual.pdf).

---

## 🌟 Core Pillars

EduPath focuses on three rock-solid, production-grade pillars:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        PUBLIC LANDING PAGE                             │
│                  Curriculum Showcase & Auth Gate                       │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
                                   ▼
┌────────────────────────────────────────────────────────────────────────┐
│                    LOGIN & CREATE ACCOUNT PORTAL                       │
│                   Evaluator 1-Click Credentials                        │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
                                   ▼
┌────────────────────────────────────────────────────────────────────────┐
│                   CAREER OPERATING SYSTEM DASHBOARD                    │
├───────────────────────┬────────────────────────┬───────────────────────┤
│    ADAPTIVE ROADMAP   │  SKILL GAPS & READINESS│       AI MENTOR       │
│  Topological DAG with │  Market benchmark delta│ Context-aware agent   │
│  dynamic recovery     │  radar & readiness     │ with explainable      │
│  milestones           │  telemetry             │ decision receipts     │
└───────────────────────┴────────────────────────┴───────────────────────┘
```

### 1. Dynamic Adaptive Roadmap
- **Topological Dependency DAG**: Enforces mastery of prerequisites before moving to advanced topics.
- **Closed-Loop Replanning**: When diagnostic assessment detects an obstacle (e.g., SQL `JOIN` failure), the agent mutates the active roadmap in real time—injecting a focused recovery sprint and adjusting timeline estimates.
- **Transparent Decision Receipts**: Every plan mutation produces an explainable receipt (Trigger, Evidence, Decision, Action, Impact).

### 2. Skill Gaps & Career Readiness
- **Market Alignment Benchmark**: Vector-calculated distance between claimed skills and industry role benchmarks.
- **Multi-Vector Radar Telemetry**: Visualizes strength distribution across Core Frontend, Backend Systems, Cloud Infrastructure, and Testing.
- **Verified Competency Tracking**: Separates claimed skills from demonstrated competencies verified via diagnostic tests.

### 3. Contextual AI Mentor
- **Profile-Aware Guidance**: Answers questions with full context of the learner's active projects, current bottlenecks, and career targets.
- **Actionable Remediation**: Generates tailored code snippets, conceptual architectural analogies, and guided debugging exercises.

---

## 🛠️ Architecture & Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, Server & Client Components)
- **Language**: [TypeScript 5.x](https://www.typescriptlang.org/) (Strict Type Safety)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + Lucide React Icons
- **State Management**: Zustand with persistent telemetry store
- **Multi-Agent Engine**: 9 specialized agents with deterministic demo fallback
- **CI/CD**: GitHub Actions workflow verifying typecheck, lint, and test suites
- **Deployment**: Zero-configuration Vercel deployment ready

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.x or 20.x LTS
- npm 9.x or higher

### 1. Clone the Repository
```bash
git clone https://github.com/aryansingh-2008/edupath.git
cd edupath
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Launch Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Verification & Testing

EduPath includes an automated test suite verifying core system invariants:

```bash
# Run TypeScript type safety check
npx tsc --noEmit

# Run ESLint check
npm run lint

# Run automated tests
npm test

# Build production bundle
npm run build
```

### Verified Test Suites:
- `Alex Rivera Invariant Checks`: Baseline profile data integrity.
- `Roadmap DAG Topological Validation`: Prerequisite resolution without cyclic dependencies.
- `Adaptive Replanning State Machine`: Real-time bottleneck injection and receipt generation.
- `Diagnostic & Readiness Telemetry`: Mathematical correctness of score calculations.

---

## ☁️ Deployment (Vercel)

Deploying EduPath takes less than 2 minutes:

### Option 1: Vercel CLI
```bash
npx vercel
```

### Option 2: GitHub Integration
1. Push your repository to GitHub.
2. Import the project in the [Vercel Dashboard](https://vercel.com/new).
3. Framework Preset: **Next.js**.
4. Click **Deploy**. No additional environment variables required for Demo Mode!

---

## 📄 Documentation

For full design documents and technical specifications:
- [`EduPath_User_Manual.pdf`](./EduPath_User_Manual.pdf) — Comprehensive 10-page User & Technical Manual
- [`docs/TECHNICAL_ARCHITECTURE.md`](docs/TECHNICAL_ARCHITECTURE.md) — Multi-agent system specifications & data flows
- [`docs/PRODUCT_DECISIONS.md`](docs/PRODUCT_DECISIONS.md) — Design tradeoffs and UX decisions
- [`docs/RUBRIC_MAPPING.md`](docs/RUBRIC_MAPPING.md) — Evaluation criteria alignment matrix

---

## 👤 Author & License

Developed by **Aryan Singh** ([@aryansingh-2008](https://github.com/aryansingh-2008))  
License: [MIT](LICENSE)
