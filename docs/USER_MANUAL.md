# EduPath &mdash; Official User Manual & Operational Guide
**Autonomous AI-Powered Career Upskilling & Adaptive Learning Platform**  
*Version 1.0 &bull; September 2026*  
*"Your skills today. Your career tomorrow. One adaptive path."*

---

## 📌 Executive Summary
EduPath is an Autonomous Career Learning Operating System that addresses the 3 fundamental dilemmas learners face when pursuing a tech role:
1. **The Invisible Baseline:** Learners do not know what they currently know vs. what the industry requires.
2. **The Generic Curriculum:** 40-hour static playlists do not adapt when a learner excels or struggles.
3. **The Learning Debt Trap:** Struggling with a prerequisite (e.g., SQL JOINs) creates cascading failure and abandonment.

EduPath calculates quantified skill gaps, synthesizes a sequential Directed Acyclic Graph (DAG) roadmap, validates understanding through diagnostic telemetry, and **autonomously adapts the schedule** with transparent decision receipts when bottlenecks are detected.

---

## 🚀 Quick Start Guide (1-Click Launch)

### Step 1: Launch the Platform
- On your Windows Desktop, double-click the **`Start_EduPath.bat`** shortcut.
- Alternatively, run from PowerShell:
  ```powershell
  cd c:\Users\dell\Desktop\edupath
  npm run dev
  ```

### Step 2: Open in Browser
Navigate to:  
👉 **`http://localhost:3000`**

---

## 🤖 The 9 Autonomous AI Agents

| Agent Name | Role & Responsibility | Key Output |
| :--- | :--- | :--- |
| **1. Profile Agent** | Extracts verified skills and evidence from intake and resumes | Verified skill proficiencies and evidence quotes |
| **2. Skill Intelligence Agent** | Normalizes terminology and benchmarks against industry roles | Scored proficiencies (0.0 to 1.0) with confidence intervals |
| **3. Gap Agent** | Quantifies competency deltas and classifies urgency | Prioritized gaps (Critical / High / Medium) |
| **4. Roadmap Planner Agent** | Generates sequential weekly milestone DAGs and tasks | Chronological milestone schedule with prerequisites |
| **5. Resource Agent** | Pairs official documentation with skill gaps | Curated official links (PostgreSQL, FastAPI, Scikit-Learn) |
| **6. Practice Agent** | Generates diagnostic MCQs with sub-concept tracking | Diagnostic assessments and instant answer feedback |
| **7. Progress Agent** | Monitors velocity, completed missions, streak, and XP | Performance telemetry and career readiness % |
| **8. Adaptive Planner Agent** | Detects bottlenecks and autonomously rewrites schedules | Recovery modules, date adjustments, decision receipts |
| **9. AI Mentor Agent** | Conversational coaching and plan explainability | Real-time chat guidance and actionable tips |

> **Audit Drawer:** Click the **`Agents (9)`** button in the top navigation header anytime to view live execution logs and latency metrics.

---

## 💻 Core Application Views & Features

### 1. "⚡ Try YOUR Profile" (Custom Path Engine)
- Click the shiny **`⚡ Try YOUR Profile`** button in the top-right header.
- **Your Name:** Personalizes mentor interactions and roadmaps.
- **Target Career Role:** Choose between *Full Stack Developer*, *Data Scientist*, or *AI / ML Engineer*.
- **Skills You Already Know:** Type your existing skills (e.g., `Python, SQL, Git, HTML`).
- **Submit:** Generates your custom skill gaps, tailored milestones, official documentation links, and updates your career readiness score in real time.

### 2. Career Overview Dashboard
- High-level KPIs: Career Readiness %, Active Skill Gaps, Tasks Completed, and Learning Debt counter.
- Active Next Mission with direct official documentation links.

### 3. Interactive Skills Map
- Visual progress bars comparing learner mastery against industry benchmark thresholds.
- Verified evidence citations explaining where each skill was derived.

### 4. Skill Gap Analysis
- Priority-ranked competency deficits (Critical, High, Medium) with plain-language business rationales.

### 5. Adaptive DAG Roadmap
- Chronological weekly milestones with interactive task checkboxes.
- Checking off tasks awards XP and triggers celebration confetti.
- Directly links vetted official documentation for every milestone.

### 6. Practice Lab & Diagnostic Telemetry
- Sub-concept tagged diagnostic MCQs with instant feedback, explanations, and hints.
- Diagnostic failures signal the Adaptive Planner to assess whether intervention is needed.

### 7. Bottleneck Detection & Autonomous Replanning
- Triggered automatically when diagnostic struggle is detected.
- Persistent alert bar displays the detected bottleneck.
- Injects a **45-minute focused Recovery Module** into Week 1.
- Shifts downstream complex milestones by 2 days to protect cognitive load.

### 8. "Why Plan Changed" Explainability Receipts
- Transparent audit card detailing:
  - **Trigger Cause:** Specific failure telemetry.
  - **Action Taken:** Schedule adjustments and module injections.
  - **AI Confidence Score:** Evaluated certainty percentage.
  - **Trade-Offs:** Impact on graduation timeline.

### 9. Context-Aware AI Mentor
- Live chat assistant aware of your profile, active bottleneck, and latest decisions.

---

## 🎯 Step-by-Step Hackathon Demonstration Scenarios

### Scenario 1: Custom Profile Intake (2 Minutes)
1. Open `http://localhost:3000`.
2. Click **`⚡ Try YOUR Profile`** in the header.
3. Enter your name, select **AI / ML Engineer**, click preset chip **"AI/ML Enthusiast"**, and submit.
4. Show how the curriculum dynamically updates with Vector Databases, RAG, and FastAPI.

### Scenario 2: Adaptive Replanning Simulation (2 Minutes)
1. In the bottom floating **Demo Control Bar**, click **`⚡ Simulate Diagnostic Struggle`**.
2. Point out the top bottleneck banner, the **"Why Plan Changed"** receipt modal, and the injected Week 1 Recovery Module.
3. Switch to the **AI Mentor** tab to show live coaching.

### Scenario 3: Learning Debt Rebalancing (1 Minute)
1. In the bottom Demo Control Bar, click **`🔄 Rebalance Learning Debt`**.
2. Demonstrate how overdue tasks are redistributed without overwhelming the daily schedule.

---

## 🔒 Technical Stack & Security Posture
- **Framework:** Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS.
- **Visuals:** Lucide Icons, Recharts, Framer Motion, Canvas Confetti.
- **Security Headers:** Hardened with `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, disabled `X-Powered-By`.
- **Database Architecture:** Supabase PostgreSQL with `pgvector` HNSW vector cosine distance indexing and Row Level Security (RLS) policies.

---

## ❓ Troubleshooting & FAQ
- **Port Conflict:** If port 3000 is occupied, kill stale node processes via:
  ```powershell
  Get-Process -Name node | Stop-Process -Force
  ```
- **Reset State:** Click **`Reset Demo State`** in the bottom Demo Control Bar anytime to restore defaults.
- **PDF Location:** The printable PDF manual is located at `C:\Users\dell\Desktop\EduPath_User_Manual.pdf`.
