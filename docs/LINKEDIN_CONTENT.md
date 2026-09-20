# EduPath - LinkedIn Content & Build-In-Public Strategy

> **Evaluation Weight: 25% of Hackathon Score**  
> This campaign is designed to demonstrate authentic, technical build-in-public execution. It avoids hype and fake vanity metrics, focusing instead on real engineering challenges, architecture diagrams, UX decisions, and demo videos.

---

## 8-Part Build-In-Public Post Campaign

### Post 1: The Problem Discovery
**Hook**: Why do 85% of self-taught developers abandon their roadmaps in month two?
**The Insight**: It’s not a lack of content. The internet has 100,000 hours of free tutorials. The problem is that learning roadmaps are **static lists in a dynamic world**. When a student struggles on day 14, Coursera doesn't care. YouTube doesn't care. They just keep recommending the next video.
**The Question**: What if your learning path could observe your mistakes, detect bottlenecks, and recalculate its route like Google Maps for your career?
**Visual**: Split image: A 50-item rigid checklist vs. an adaptive GPS rerouting graphic.
**CTA**: "We're building this for the hackathon this week. What's the #1 skill you've struggled to self-teach? Let me know in the comments."
**Hashtags**: `#BuildInPublic #AI #EdTech #SoftwareEngineering #CareerGrowth`

---

### Post 2: Why Existing Learning Systems Fail
**Hook**: The biggest lie in online education is that everyone needs the same 12-week syllabus.
**The Problem**: 
1. Senior devs switching to AI waste time relearning basic Python loops.
2. Junior devs skip SQL indexing, hit a wall in backend development, and blame themselves.
3. Platforms evaluate "completion" (videos watched), not "demonstrated competency".
**Our Architecture**: We are building **EduPath**—a multi-agent career navigation agent that differentiates between "Skill Claimed" (on your resume) and "Skill Demonstrated" (in practice and code).
**Visual**: Conceptual diagram showing the "Evidence Loop" (Resume &rarr; Diagnostic Practice &rarr; Verified Capstone).
**CTA**: "Have you ever abandoned a course because it was too slow or suddenly hit a topic you couldn't grasp?"
**Hashtags**: `#Developers #CodingBootcamp #Upskilling #ProductDesign`

---

### Post 3: The EduPath Concept Reveal
**Hook**: Stop guessing what to learn next. Meet EduPath.
**Tagline**: *"Your skills today. Your career tomorrow. One adaptive path."*
**What We Built Today**:
- **Profile Agent**: Ingests resumes/portfolios and extracts skills with confidence scores and evidence quotes.
- **Skill Intelligence Agent**: Maps your skills against canonical industry benchmarks.
- **Gap Agent**: Computes the exact delta between who you are and who hiring managers want.
**Visual**: High-res UI screenshot of the **Skill Constellation** comparing current proficiency vs. target requirements.
**CTA**: "Check out the screenshot below. What do you think of this visual approach to skill mapping?"
**Hashtags**: `#UIUX #Nextjs #TailwindCSS #DesignSystem #WebDevelopment`

---

### Post 4: The UX/UI System Reveal
**Hook**: Can a developer dashboard feel calm, futuristic, and actionable without drowning in dark-mode glassmorphism?
**The UX Philosophy**: We designed EduPath as a "Career Operating System":
- **Today's Mission**: One high-leverage 25-minute task instead of 40 unread tabs.
- **Why This? Drawer**: Every single recommendation explains why it was selected.
- **Learning Debt**: A visual indicator showing postponed skills before prerequisites break down.
**Visual**: Carousel of 3 UI screens: (1) Today's Mission Card, (2) The "Why This?" Explainability drawer, (3) Learning Debt alert.
**CTA**: "Designers and engineers: which micro-interaction here would help you stay disciplined?"
**Hashtags**: `#ProductEngineering #Frontend #UXDesign #FramerMotion`

---

### Post 5: The Multi-Agent Backend Architecture
**Hook**: How do 9 specialized AI agents collaborate without hallucinating or slowing down the UI?
**The Technical Stack**:
- Next.js 14 App Router + TypeScript
- Specialized Agents: Profile, Gap, Roadmap, Practice, and Adaptive Planner
- Structured JSON output schemas validated with Zod
- PostgreSQL + pgvector for semantic ontology matching
- Deterministic Demo Engine with sub-100ms offline fallback
**Key Lesson**: Do not let an LLM output uncontrolled prose. Enforce strict schemas or the state machine crashes.
**Visual**: Mermaid architecture diagram showing the Orchestrator, Agent Swarm, and pgvector storage.
**CTA**: "How are you handling LLM schema validation in production? Let's geek out in the comments."
**Hashtags**: `#SystemDesign #MultiAgent #LLM #SoftwareArchitecture #TypeScript`

---

### Post 6: The "WOW" Moment — Live Adaptive Replanning
**Hook**: What happens when a student fails a quiz three times in a row? Watch this.
**The Demo Video**: 
1. Alex takes a diagnostic test on SQL JOINs and fails 2 questions.
2. EduPath triggers: *"Learning Bottleneck Detected"*.
3. The **Adaptive Planner Agent** analyzes the error patterns.
4. Instead of forcing Alex to re-read everything, the roadmap inserts a dedicated 20-minute visual JOIN recovery module and adjusts downstream deadlines.
5. A transparent **Decision Receipt** explains the reasoning.
**Visual**: 30-second screen recording / GIF of the roadmap dynamically rearranging itself.
**CTA**: "Watch the roadmap adapt in real time in the clip below &darr;"
**Hashtags**: `#AIagents #AdaptiveLearning #EdTech #Innovation`

---

### Post 7: Before vs. After — The Adaptive Roadmap
**Hook**: A static roadmap vs. an adaptive roadmap after 14 days of real learning.
**The Comparison**:
- *Static Roadmap*: Still shows "Day 14: Advanced Microservices" even though the student hasn't mastered SQL indexing. Result: frustration and churn.
- *EduPath Dynamic Route*: Observed the struggle, reinforced the foundation, scheduled a real PostgreSQL capstone, and raised skill readiness from 34% to 68%.
**The Philosophy**: Learning is not a straight line. It's an intelligent trajectory.
**Visual**: Side-by-side graphic showing the Rigid Plan vs. the Dynamic Adaptive Route.
**CTA**: "Would you prefer a rigid schedule or an adaptive roadmap that evolves with your performance?"
**Hashtags**: `#EngineeringCulture #CareerAdvice #TechCareers`

---

### Post 8: Final Hackathon Launch
**Hook**: After 72 hours of hacking, EduPath is live! 🚀
**The Milestone**: We set out to prove that AI shouldn't just summarize courses—it should navigate careers.
**What's Included in the Open-Source Repo**:
- Full Next.js + Tailwind web application
- Multi-agent orchestrator with 9 specialized agents
- Complete interactive demo scenario featuring Alex (Full Stack Developer)
- Full documentation and seed datasets
**Link**: GitHub repo link + live demo link.
**CTA**: "Try the live demo mode, simulate an SQL struggle, and see the route recalculate. Feedback is warmly welcomed!"
**Hashtags**: `#Hackathon #OpenSource #Launch #Nextjs #AIProduct`

---

## 10-Slide LinkedIn Carousel Outline

### Slide 1: Cover
- **Headline**: Your learning plan shouldn't stay the same when you do.
- **Subhead**: Why static roadmaps fail self-taught developers—and what an adaptive path looks like.
- **Visual**: Minimal dark slate card with glowing trajectory line and EduPath mark.

### Slide 2: The Silent Churn
- **Headline**: The 14-Day Drop-Off
- **Body**: 85% of online learners quit within 30 days. It's not laziness. It's because static curriculums cannot adapt when you hit a conceptual wall.
- **Visual**: Declining retention curve graphic.

### Slide 3: The 3 Flaws of Generic Roadmaps
- **Bullet 1**: They assume you know nothing (repeating basics you already have).
- **Bullet 2**: They don't detect when you're stuck (pushing you forward unprepared).
- **Bullet 3**: They measure videos watched instead of skills demonstrated.

### Slide 4: Meet EduPath
- **Headline**: A Career Navigation System
- **Body**: EduPath doesn't sell courses. It ingests your current proof of work, identifies gaps against industry standards, and continuously recalibrates your route.
- **Visual**: Product overview mockup with clean metrics.

### Slide 5: Confidence-Aware Skill Profiling
- **Headline**: No More Keyword Guessing
- **Body**: EduPath evaluates your resume with confidence scoring and evidence sources. "React — Intermediate" backed by 2 production projects, not just an unverified claim.

### Slide 6: The Skill Constellation
- **Headline**: What You Know vs. What You Need
- **Body**: Dual-layer visual mapping showing high-priority gaps, dependent prerequisites, and market demand weights.

### Slide 7: The Core Breakthrough: Adaptive Replanning
- **Headline**: When You Struggle, EduPath Recalculates
- **Body**: Fail two questions in the Practice Lab? The Adaptive Agent automatically injects diagnostic recovery and adjusts your timeline with full explainability.
- **Visual**: Diagram showing: Observe &rarr; Analyze &rarr; Plan &rarr; Act &rarr; Evaluate &rarr; Adapt.

### Slide 8: From Claimed to Demonstrated
- **Headline**: The Skill-to-Project Loop
- **Body**: Close your gaps with dynamically generated mini-projects that add verifiable evidence to your portfolio.

### Slide 9: The Multi-Agent Swarm
- **Headline**: Built on Rigorous Engineering
- **Body**: 9 specialized agents orchestrating profile extraction, gap analysis, practice synthesis, and timeline mutation with strict schema validation.

### Slide 10: Call to Action
- **Headline**: Build Your Adaptive Career Path
- **Body**: Explore the open-source code and live demo.
- **Footer**: Link in post comments &bull; Created for the Hackathon.
