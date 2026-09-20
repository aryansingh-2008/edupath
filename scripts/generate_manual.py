import os
import subprocess
import shutil

HTML_CONTENT = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>EduPath - Official User Manual & Operational Guide</title>
<style>
  @page {
    size: A4;
    margin: 16mm 14mm 16mm 14mm;
    @bottom-right {
      content: counter(page);
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      font-size: 8pt;
      color: #64748b;
    }
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    color: #1e293b;
    background-color: #ffffff;
    line-height: 1.55;
    font-size: 10pt;
  }

  /* COVER PAGE */
  .cover {
    page-break-after: always;
    height: 96vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 40px 20px;
    background: linear-gradient(145deg, #0b1329 0%, #1e1b4b 50%, #0f172a 100%);
    color: #ffffff;
    border-radius: 12px;
  }

  .cover-top {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .cover-logo {
    width: 48px;
    height: 48px;
    background: linear-gradient(135deg, #3b82f6, #8b5cf6);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 900;
    font-size: 22px;
    color: white;
    box-shadow: 0 10px 25px rgba(59, 130, 246, 0.4);
  }

  .cover-brand {
    font-size: 22pt;
    font-weight: 800;
    letter-spacing: -0.5px;
    color: #ffffff;
  }

  .cover-center {
    margin-top: 60px;
  }

  .cover-badge {
    display: inline-block;
    background: rgba(59, 130, 246, 0.2);
    border: 1px solid rgba(147, 197, 253, 0.3);
    color: #93c5fd;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 9pt;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 16px;
  }

  .cover-title {
    font-size: 32pt;
    font-weight: 900;
    line-height: 1.15;
    margin-bottom: 14px;
    background: linear-gradient(to right, #ffffff, #93c5fd);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .cover-subtitle {
    font-size: 13pt;
    color: #cbd5e1;
    max-width: 550px;
    line-height: 1.5;
    margin-bottom: 24px;
  }

  .cover-tagline {
    font-size: 11pt;
    font-style: italic;
    color: #38bdf8;
    border-left: 3px solid #38bdf8;
    padding-left: 12px;
  }

  .cover-bottom {
    border-top: 1px solid rgba(255, 255, 255, 0.15);
    padding-top: 20px;
    display: flex;
    justify-content: space-between;
    font-size: 8.5pt;
    color: #94a3b8;
  }

  /* HEADINGS & TYPOGRAPHY */
  h1 {
    font-size: 18pt;
    font-weight: 800;
    color: #0f172a;
    border-bottom: 2px solid #e2e8f0;
    padding-bottom: 6px;
    margin-top: 24px;
    margin-bottom: 12px;
    page-break-after: avoid;
  }

  h2 {
    font-size: 13pt;
    font-weight: 700;
    color: #1e3a8a;
    margin-top: 16px;
    margin-bottom: 8px;
    page-break-after: avoid;
  }

  h3 {
    font-size: 11pt;
    font-weight: 600;
    color: #334155;
    margin-top: 12px;
    margin-bottom: 6px;
    page-break-after: avoid;
  }

  p {
    margin-bottom: 8px;
    color: #334155;
  }

  strong {
    color: #0f172a;
  }

  ul, ol {
    margin-left: 18px;
    margin-bottom: 10px;
    color: #334155;
  }

  li {
    margin-bottom: 4px;
  }

  .page-break {
    page-break-before: always;
  }

  /* CALLOUTS */
  .callout {
    border-radius: 8px;
    padding: 10px 14px;
    margin: 12px 0;
    font-size: 9pt;
    page-break-inside: avoid;
  }

  .callout-info {
    background-color: #eff6ff;
    border-left: 4px solid #3b82f6;
    color: #1e40af;
  }

  .callout-success {
    background-color: #f0fdf4;
    border-left: 4px solid #22c55e;
    color: #15803d;
  }

  .callout-warning {
    background-color: #fffbeb;
    border-left: 4px solid #f59e0b;
    color: #92400e;
  }

  /* TABLES */
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 12px 0;
    font-size: 8.5pt;
    page-break-inside: avoid;
  }

  th {
    background-color: #f1f5f9;
    color: #0f172a;
    font-weight: 700;
    text-align: left;
    padding: 7px 10px;
    border: 1px solid #cbd5e1;
  }

  td {
    padding: 6px 10px;
    border: 1px solid #e2e8f0;
    color: #334155;
  }

  tr:nth-child(even) td {
    background-color: #f8fafc;
  }

  /* CARDS & GRIDS */
  .card-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin: 10px 0;
    page-break-inside: avoid;
  }

  .card {
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 10px 12px;
    background: #ffffff;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  }

  .card-title {
    font-weight: 700;
    font-size: 9.5pt;
    color: #1e40af;
    margin-bottom: 4px;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .badge {
    display: inline-block;
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 7.5pt;
    font-weight: 700;
    text-transform: uppercase;
  }

  .badge-blue { background: #dbeafe; color: #1e40af; }
  .badge-green { background: #dcfce7; color: #166534; }
  .badge-purple { background: #f3e8ff; color: #6b21a8; }
  .badge-amber { background: #fef3c7; color: #92400e; }

  .step-num {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: #2563eb;
    color: white;
    font-size: 8pt;
    font-weight: bold;
    margin-right: 6px;
  }

  code {
    background-color: #f1f5f9;
    padding: 1px 4px;
    border-radius: 3px;
    font-family: Consolas, Monaco, "Courier New", monospace;
    font-size: 8.5pt;
    color: #0f172a;
  }

  .footer-note {
    font-size: 8pt;
    color: #94a3b8;
    text-align: center;
    margin-top: 30px;
    border-top: 1px solid #e2e8f0;
    padding-top: 10px;
  }
</style>
</head>
<body>

<!-- COVER PAGE -->
<div class="cover">
  <div class="cover-top">
    <div class="cover-logo">E</div>
    <div class="cover-brand">EduPath</div>
  </div>

  <div class="cover-center">
    <div class="cover-badge">Official Product Documentation &bull; v1.0</div>
    <div class="cover-title">User Manual & Operational Guide</div>
    <div class="cover-subtitle">
      Comprehensive operational handbook for EduPath: An Autonomous AI-Powered Career Upskilling & Adaptive Learning Platform.
    </div>
    <div class="cover-tagline">
      "Your skills today. Your career tomorrow. One adaptive path."
    </div>
  </div>

  <div class="cover-bottom">
    <div><strong>Prepared For:</strong> Students, Engineers, Career Switchers & Hackathon Evaluators</div>
    <div><strong>Target Systems:</strong> Windows, macOS, Linux &bull; Next.js 14 App Router</div>
    <div><strong>Date:</strong> September 2026</div>
  </div>
</div>

<!-- TABLE OF CONTENTS -->
<h1>Table of Contents</h1>
<ol style="line-height: 1.8; font-size: 10.5pt; margin-top: 14px;">
  <li><strong>Executive Summary & System Purpose</strong> &mdash; What EduPath is and why it exists</li>
  <li><strong>Quick Start Guide</strong> &mdash; 1-click launch instructions and URLs</li>
  <li><strong>System Architecture: The 9 Live AI Agents</strong> &mdash; Detailed breakdown of multi-agent roles</li>
  <li><strong>Core Application Views & Features</strong>
    <ul>
      <li>4.1 "⚡ Try YOUR Profile" (Custom Path Engine)</li>
      <li>4.2 Career Overview Dashboard & Metrics</li>
      <li>4.3 Interactive Skills Map & Evidence Quotes</li>
      <li>4.4 Skill Gap Analysis & Target Benchmarks</li>
      <li>4.5 Adaptive Directed Acyclic Graph (DAG) Roadmap</li>
      <li>4.6 Practice Lab, Diagnostic Telemetry & Quizzes</li>
      <li>4.7 Bottleneck Detection & Autonomous Replanning</li>
      <li>4.8 "Why Plan Changed" Explainability Receipts</li>
      <li>4.9 Context-Aware AI Mentor Assistant</li>
      <li>4.10 Project Builder & Milestone Deliverables</li>
      <li>4.11 Career Readiness Gauge & Radar Visualization</li>
      <li>4.12 Live Agent Activity Drawer & Execution Logs</li>
    </ul>
  </li>
  <li><strong>Live Demonstration Scenarios (Step-by-Step)</strong> &mdash; Proven demo flows for judges</li>
  <li><strong>Technical Specifications & Security Posture</strong> &mdash; Stack, RLS, and security headers</li>
  <li><strong>Troubleshooting & Frequently Asked Questions (FAQ)</strong></li>
</ol>

<div class="callout callout-info" style="margin-top: 24px;">
  <strong>Note for Hackathon Judges & Reviewers:</strong> EduPath is not a static UI mockup or generic LLM wrapper. It is a deterministic, event-driven autonomous learning agent engine with real state persistence, dynamic gap calculations, and adaptive schedule recovery loops.
</div>

<!-- CHAPTER 1 -->
<div class="page-break"></div>
<h1>1. Executive Summary & System Purpose</h1>

<p>
  In modern software engineering and technology fields, learners frequently know the target career role they aspire to achieve (e.g., <em>Full Stack Developer</em>, <em>Data Scientist</em>, <em>AI/ML Engineer</em>), but face three systemic barriers:
</p>

<ol>
  <li><strong>Invisible Baseline:</strong> Learners struggle to objectively map what skills they already possess versus what the industry requires.</li>
  <li><strong>Generic Curricula:</strong> Existing courses offer one-size-fits-all 40-hour video playlists that do not adapt when a learner struggles or excels.</li>
  <li><strong>Learning Debt Accumulation:</strong> When a learner fails to grasp a prerequisite (e.g., SQL JOINs), traditional platforms keep marching forward, causing cascading frustration and abandonment.</li>
</ol>

<p>
  <strong>EduPath</strong> solves this by functioning as an <strong>Autonomous Career Learning Operating System</strong>. It ingests the learner's profile, calculates quantified skill gaps against industry benchmarks, synthesizes a personalized weekly roadmap with curated resources, and continually monitors practice telemetry. When a learning bottleneck is detected, it autonomously rewrites the roadmap, inserts recovery modules, and explains every decision via human-readable explainability receipts.
</p>

<h2>Key Platform Pillars</h2>
<div class="card-grid">
  <div class="card">
    <div class="card-title"><span class="badge badge-blue">Dynamic</span> Profile Customization</div>
    <p style="font-size: 8.5pt;">Enter your own name, select any target role, and type your actual skills to generate a 100% custom roadmap and gap analysis.</p>
  </div>
  <div class="card">
    <div class="card-title"><span class="badge badge-green">Closed-Loop</span> Adaptive Replanning</div>
    <p style="font-size: 8.5pt;">Diagnostic quiz failures trigger real-time graph rebalancing, schedule pushouts, and recovery module injections.</p>
  </div>
  <div class="card">
    <div class="card-title"><span class="badge badge-purple">Zero Black Box</span> Explainability</div>
    <p style="font-size: 8.5pt;">Every schedule change produces an audit receipt showing trigger cause, confidence score, trade-offs, and affected milestones.</p>
  </div>
  <div class="card">
    <div class="card-title"><span class="badge badge-amber">Curated</span> High-Yield Resources</div>
    <p style="font-size: 8.5pt;">Directly links official documentation (PostgreSQL, FastAPI, Scikit-Learn) rather than generic fluff.</p>
  </div>
</div>

<!-- CHAPTER 2 -->
<h1>2. Quick Start Guide</h1>

<p>EduPath is packaged for immediate local execution on Windows with zero external service dependencies required for core functionality.</p>

<h2>Launching the Platform in 1 Click</h2>
<ol>
  <li>Navigate to your Windows Desktop and locate the shortcut file: <code>Start_EduPath.bat</code>.</li>
  <li>Double-click the batch file. A terminal window will open, verifying dependencies and starting the Next.js development server.</li>
  <li>Open your preferred web browser (Google Chrome, Microsoft Edge, Brave) and navigate to:
    <br/><strong style="color: #2563eb; font-size: 11pt;">http://localhost:3000</strong>
  </li>
</ol>

<div class="callout callout-success">
  <strong>Live Status Check:</strong> If the server is active, accessing <code>http://localhost:3000</code> will render either the high-impact Landing Page or the Career OS Shell directly.
</div>

<h2>Command Line Alternative</h2>
<p>If you prefer running commands in PowerShell or Command Prompt:</p>
<pre style="background: #0f172a; color: #f8fafc; padding: 8px 12px; border-radius: 6px; font-size: 8.5pt; margin-bottom: 10px;">
cd c:\Users\dell\Desktop\edupath
npm run dev
</pre>

<!-- CHAPTER 3 -->
<div class="page-break"></div>
<h1>3. System Architecture: The 9 Live AI Agents</h1>

<p>
  EduPath is engineered around a collaborative <strong>Multi-Agent Architecture</strong> where each specialized agent executes distinct responsibilities across the learning lifecycle:
</p>

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Agent Name</th>
      <th style="width: 25%;">Primary Responsibility</th>
      <th style="width: 25%;">Inputs</th>
      <th style="width: 25%;">Outputs Produced</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>1. Profile Agent</strong></td>
      <td>Extracts structured skills and verified evidence from intake and resumes.</td>
      <td>User input, resume text, project summaries</td>
      <td>Normalized skill list with verified quotes and proficiencies</td>
    </tr>
    <tr>
      <td><strong>2. Skill Intelligence Agent</strong></td>
      <td>Normalizes terminology and benchmarks proficiencies against industry roles.</td>
      <td>Extracted skills, role taxonomy</td>
      <td>Scored proficiencies (0.0 to 1.0) and confidence intervals</td>
    </tr>
    <tr>
      <td><strong>3. Gap Agent</strong></td>
      <td>Calculates exact competency deltas and classifies urgency (Critical / High / Medium).</td>
      <td>Learner skill matrix, target role benchmark</td>
      <td>Prioritized skill gap inventory with rationale</td>
    </tr>
    <tr>
      <td><strong>4. Roadmap Planner Agent</strong></td>
      <td>Generates a sequential Directed Acyclic Graph (DAG) of weekly milestones and tasks.</td>
      <td>Skill gap list, time budget (min/day)</td>
      <td>Chronological roadmap with prerequisites</td>
    </tr>
    <tr>
      <td><strong>5. Resource Agent</strong></td>
      <td>Matches high-yield documentation, tutorials, and interactive exercises to gaps.</td>
      <td>Skill objectives, preferred modality</td>
      <td>Curated resource links with source attribution</td>
    </tr>
    <tr>
      <td><strong>6. Practice Agent</strong></td>
      <td>Generates diagnostic MCQs and coding challenges with sub-concept tracking.</td>
      <td>Target skill, difficulty level</td>
      <td>Diagnostic questions, answer keys, explanations</td>
    </tr>
    <tr>
      <td><strong>7. Progress Agent</strong></td>
      <td>Tracks learner velocity, completed missions, daily streak, and awarded XP.</td>
      <td>Task completions, diagnostic results</td>
      <td>Telemetry metrics, streak updates, readiness %</td>
    </tr>
    <tr>
      <td><strong>8. Adaptive Planner Agent</strong></td>
      <td>Detects repeated diagnostic struggles and autonomously rewrites the schedule.</td>
      <td>Diagnostic failure signals</td>
      <td>Recovery modules, date shifts, decision receipts</td>
    </tr>
    <tr>
      <td><strong>9. AI Mentor Agent</strong></td>
      <td>Provides conversational coaching, answers learner questions, and explains changes.</td>
      <td>Learner queries, context state, decisions</td>
      <td>Contextual chat responses with actionable recommendations</td>
    </tr>
  </tbody>
</table>

<div class="callout callout-info">
  <strong>Auditability:</strong> Click the <span class="badge badge-green">Agents (9)</span> button in the top navigation header at any time to open the <strong>Live Agent Activity Drawer</strong>, showing real-time execution logs, latency benchmarks, and payload summaries for all 9 agents.
</div>

<!-- CHAPTER 4 -->
<div class="page-break"></div>
<h1>4. Core Application Views & Features</h1>

<h2>4.1 "⚡ Try YOUR Profile" (Custom Path Engine)</h2>
<p>
  Located conspicuously in the top-right header, this modal allows any user to transition away from the pre-scripted demo and generate a 100% personalized learning plan in seconds:
</p>
<ul>
  <li><strong>Your Name:</strong> Personalizes all mentor greetings and milestone headers (e.g., <em>Pranav</em> or <em>Rahul</em>).</li>
  <li><strong>Target Career Role:</strong> Select from <em>Full Stack Developer</em>, <em>Data Scientist</em>, or <em>AI / ML Engineer</em>.</li>
  <li><strong>Skills You Already Know:</strong> Enter comma-separated skills (e.g., <code>Python, SQL, Git, HTML</code>). Quick presets are provided for one-click testing.</li>
  <li><strong>Daily Commitment:</strong> Set available daily study time (15, 30, or 60 min/day).</li>
</ul>
<p>
  Upon submission, the engine dynamically recalculates the learner's readiness percentage, identifies exact gaps against role benchmarks, generates a custom weekly roadmap, logs an agent execution event, and triggers a congratulatory confetti animation.
</p>

<h2>4.2 Career Overview Dashboard</h2>
<p>The central command hub displaying high-level performance indicators:</p>
<ul>
  <li><strong>Top KPI Cards:</strong> Career Readiness %, Active Skill Gaps, Completed Tasks, and Learning Debt counter.</li>
  <li><strong>Target Role Banner:</strong> Displays learner name, target trajectory, daily commitment, and quick links.</li>
  <li><strong>Active Milestone Mission:</strong> The immediate next actionable task with direct links to official documentation.</li>
  <li><strong>Quick Diagnostic Teaser:</strong> Fast check to test foundational knowledge.</li>
</ul>

<h2>4.3 Interactive Skills Map</h2>
<p>
  Provides transparency into how the AI evaluates the learner's abilities:
</p>
<ul>
  <li><strong>Proficiency Breakdown:</strong> Visual bars comparing learner mastery against industry benchmark thresholds (e.g., 68% vs 80% benchmark).</li>
  <li><strong>Evidence Extraction Citations:</strong> Quotes demonstrating where and how the skill was verified (e.g., "Extracted from GitHub repo: express-microservice").</li>
  <li><strong>Confidence Rating:</strong> AI confidence metric (e.g., 90% confidence) based on evidence density.</li>
</ul>

<h2>4.4 Skill Gap Analysis</h2>
<p>
  Categorizes skill deficits by urgency:
</p>
<ul>
  <li><span class="badge badge-amber">Critical Gaps:</span> Blocker competencies required for entry-level hiring (e.g., SQL JOINs for Backend).</li>
  <li><span class="badge badge-blue">High & Medium Gaps:</span> Important secondary skills (e.g., Docker, Redis caching).</li>
  <li><strong>Rationale:</strong> Plain-language explanations detailing <em>why</em> the specific skill is mandatory for the role.</li>
</ul>

<!-- CHAPTER 4 CONTINUED -->
<div class="page-break"></div>
<h2>4.5 Adaptive Directed Acyclic Graph (DAG) Roadmap</h2>
<p>
  The chronological learning schedule structured into sequential weekly milestones:
</p>
<ul>
  <li><strong>Sequential Milestones:</strong> Week 1 (Active), Week 2 (Upcoming), Week 3 (Future).</li>
  <li><strong>Task Checklists:</strong> Interactive checkboxes allowing learners to complete tasks. Checking off tasks increases XP and plays celebratory feedback.</li>
  <li><strong>Curated Resource Cards:</strong> Direct links to vetted industry documentation (PostgreSQL official docs, Express.js guides, LangChain docs) with estimated completion time.</li>
  <li><strong>Recovery Module Indicators:</strong> Special amber cards injected when an adaptive intervention occurs.</li>
</ul>

<h2>4.6 Practice Lab, Diagnostic Telemetry & Quizzes</h2>
<p>
  The diagnostic engine that validates whether a learner actually understands what they study:
</p>
<ul>
  <li><strong>Sub-Concept Tagging:</strong> Questions are tagged with granular concepts (e.g., <em>SQL &rarr; Multi-Table JOINs</em>).</li>
  <li><strong>Instant Feedback:</strong> Selecting an answer provides instant correctness feedback, detailed technical explanations, and hints.</li>
  <li><strong>Struggle Telemetry:</strong> Answering multiple questions incorrectly on a concept automatically alerts the <strong>Adaptive Planner Agent</strong>.</li>
</ul>

<h2>4.7 Bottleneck Detection & Autonomous Replanning</h2>
<p>
  The crown jewel of EduPath's intelligence. When the system detects repeated errors:
</p>
<ol>
  <li>A persistent top amber alert bar activates: <em>"Learning Bottleneck Detected: Repeated difficulty with SQL JOINs."</em></li>
  <li>The <strong>Adaptive Planner Agent</strong> modifies the roadmap graph in real-time.</li>
  <li>A focused <strong>45-minute SQL Recovery Module</strong> is inserted into Week 1.</li>
  <li>Downstream complex milestones (e.g., Week 2 Backend APIs) are automatically shifted by 2 days to protect learner cognitive load.</li>
  <li>The <strong>"Why Did My Plan Change?"</strong> modal automatically surfaces to explain the rationale.</li>
</ol>

<h2>4.8 "Why Plan Changed" Explainability Receipts</h2>
<p>
  Prevents the learner from feeling confused or disoriented by automated changes:
</p>
<ul>
  <li><strong>Trigger Cause:</strong> Specific failure telemetry (e.g., "2 consecutive diagnostic failures on SQL JOIN queries").</li>
  <li><strong>Action Taken:</strong> Specific modifications made (e.g., "+45 min recovery module injected; Week 2 postponed 2 days").</li>
  <li><strong>AI Confidence Score:</strong> Evaluated certainty of the intervention (e.g., 94% confidence).</li>
  <li><strong>Trade-Off Disclosure:</strong> Clearly states that graduation date moves out by 2 days to ensure foundational mastery.</li>
</ul>

<h2>4.9 Context-Aware AI Mentor Assistant</h2>
<p>
  Accessible via the "AI Mentor" tab. The mentor is fully aware of:
</p>
<ul>
  <li>The learner's current target role, name, and readiness score.</li>
  <li>Whether an active bottleneck exists.</li>
  <li>The latest adaptive replanning decision.</li>
  <li>Learners can ask for code examples, concept explanations, or career advice.</li>
</ul>

<!-- CHAPTER 5 & 6 -->
<div class="page-break"></div>
<h1>5. Live Demonstration Scenarios (For Judges & Evaluators)</h1>

<p>
  When presenting EduPath in a hackathon demo or live review, execute these three scripted sequences for maximum impact:
</p>

<h2>Scenario A: The Personalized Custom Path (2 Minutes)</h2>
<ol>
  <li>Open <code>http://localhost:3000</code>.</li>
  <li>Click the top-right button: <strong>"⚡ Try YOUR Profile"</strong>.</li>
  <li>Type your name (e.g. <em>Pranav</em>), choose <strong>AI / ML Engineer</strong>, and click the preset chip <strong>"AI/ML Enthusiast"</strong>.</li>
  <li>Click <strong>"Analyze My Gaps & Build My Path"</strong>.</li>
  <li><strong>Highlight to Audience:</strong> Point out how the entire platform transformed into an AI/ML engineering curriculum with Vector Databases (pgvector), RAG Pipelines, and FastAPI serving tasks.</li>
</ol>

<h2>Scenario B: The Adaptive Replanning Loop (2 Minutes)</h2>
<ol>
  <li>Look at the bottom floating toolbar (<strong>Demo Control Bar</strong>).</li>
  <li>Click the red button: <strong>"⚡ Simulate Diagnostic Struggle"</strong>.</li>
  <li><strong>Highlight to Audience:</strong> Point out the top bottleneck banner, the automatic popup of the <strong>"Why Plan Changed"</strong> receipt, and how Week 1 roadmap now includes a focused 45-minute Recovery Module.</li>
  <li>Open the <strong>AI Mentor</strong> tab to show the mentor coaching the learner on relational joins.</li>
</ol>

<h2>Scenario C: Rebalancing Learning Debt (1 Minute)</h2>
<ol>
  <li>In the bottom Demo Control Bar, click <strong>"🔄 Rebalance Learning Debt"</strong>.</li>
  <li>Show the green confirmation banner explaining how overdue tasks were redistributed without overwhelming the daily schedule.</li>
</ol>

<h1>6. Technical Specifications & Security Posture</h1>

<table>
  <thead>
    <tr>
      <th>Layer</th>
      <th>Technologies Used</th>
      <th>Key Features & Architecture</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Frontend</strong></td>
      <td>Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS</td>
      <td>Server & Client Components, Responsive layout, Zero layout shifts</td>
    </tr>
    <tr>
      <td><strong>Visuals & Motion</strong></td>
      <td>Lucide Icons, Recharts, Framer Motion, Canvas Confetti</td>
      <td>Radar charts, proficiency progress meters, celebratory micro-interactions</td>
    </tr>
    <tr>
      <td><strong>Agent Engine</strong></td>
      <td>Modular TypeScript Agent Pipeline, DAG Rebalancing Engine</td>
      <td>Deterministic state machines, telemetry logging, confidence scoring</td>
    </tr>
    <tr>
      <td><strong>Database Schema</strong></td>
      <td>Supabase PostgreSQL with <code>pgvector</code> extension</td>
      <td>Row Level Security (RLS) policies, HNSW vector cosine distance indexing</td>
    </tr>
    <tr>
      <td><strong>Security</strong></td>
      <td>OWASP Hardened HTTP Headers, Zod Payload Validation</td>
      <td><code>X-Content-Type-Options: nosniff</code>, <code>X-Frame-Options: SAMEORIGIN</code>, disabled <code>X-Powered-By</code></td>
    </tr>
  </tbody>
</table>

<!-- CHAPTER 7 -->
<div class="page-break"></div>
<h1>7. Troubleshooting & Frequently Asked Questions</h1>

<h2>Q: How do I reset the platform back to the initial demo state?</h2>
<p>
  Click the <strong>"Reset Demo State"</strong> button in the bottom floating Demo Control Bar. This instantly restores the default Alex Rivera profile, clears all simulated bottlenecks, and resets the roadmap.
</p>

<h2>Q: The terminal says "Port 3000 is already in use". How do I resolve this?</h2>
<p>
  Next.js will automatically fall back to port 3001, or you can terminate existing Node processes in PowerShell by running:
</p>
<pre style="background: #0f172a; color: #f8fafc; padding: 8px 12px; border-radius: 6px; font-size: 8.5pt;">
Get-Process -Name node | Stop-Process -Force
</pre>

<h2>Q: Can I run EduPath without an internet connection?</h2>
<p>
  Yes! All core agent logic, profile generators, diagnostic quizzes, and state rebalancers run locally inside the Next.js runtime. External resource links (e.g. to PostgreSQL documentation) simply open official docs in a new tab when clicked.
</p>

<h2>Q: Where are the database schema files stored?</h2>
<p>
  The complete hardened PostgreSQL schema with Row Level Security (RLS) policies and pgvector embedding definitions is located at:
  <br/><code>c:\Users\dell\Desktop\edupath\docs\schema.sql</code>.
</p>

<div class="footer-note">
  EduPath Official User Manual &bull; Built with pride for autonomous career learning &bull; &copy; 2026 EduPath Team
</div>

</body>
</html>
"""

def generate_pdf():
    docs_dir = r"c:\Users\dell\Desktop\edupath\docs"
    os.makedirs(docs_dir, exist_ok=True)
    
    html_path = os.path.join(docs_dir, "USER_MANUAL.html")
    with open(html_path, "w", encoding="utf-8") as f:
        f.write(HTML_CONTENT)
    print(f"✓ Saved HTML manual to: {html_path}")

    # Output PDF paths
    desktop_pdf = r"c:\Users\dell\Desktop\EduPath_User_Manual.pdf"
    edupath_pdf = r"c:\Users\dell\Desktop\edupath\EduPath_User_Manual.pdf"

    # Chrome or Edge executable
    chrome_path = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
    edge_path = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
    
    browser_bin = chrome_path if os.path.exists(chrome_path) else edge_path
    if not os.path.exists(browser_bin):
        print("Error: Chrome/Edge not found for PDF generation.")
        return False

    cmd = [
        browser_bin,
        "--headless",
        "--disable-gpu",
        "--no-pdf-header-footer",
        f"--print-to-pdf={desktop_pdf}",
        html_path
    ]

    print(f"Executing headless browser command to print PDF...")
    result = subprocess.run(cmd, capture_output=True, text=True)
    
    if os.path.exists(desktop_pdf) and os.path.getsize(desktop_pdf) > 1000:
        shutil.copyfile(desktop_pdf, edupath_pdf)
        print(f"🎉 PDF successfully generated at:\n  1. {desktop_pdf}\n  2. {edupath_pdf}")
        print(f"File size: {os.path.getsize(desktop_pdf):,} bytes")
        return True
    else:
        print("Failed to generate PDF. Return code:", result.returncode)
        print("Stderr:", result.stderr)
        return False

if __name__ == "__main__":
    generate_pdf()
