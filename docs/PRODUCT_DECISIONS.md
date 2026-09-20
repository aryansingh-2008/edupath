# EduPath - Product Decisions & Strategic Tradeoffs

This document outlines key technical, UX, and architectural decisions made during the development of EduPath.

---

## 1. Why "Career Operating System" instead of a Chatbot or Course Platform?
- **Decision**: Avoided building another ChatGPT wrapper with floating message cards. Instead, designed EduPath as a dashboard-driven **Career Operating System**.
- **Rationale**: Chatbots impose high cognitive overhead for long-term tracking. A career plan requires structured timelines, visual node graphs, and clear daily focus ("Today's Mission"). The conversational AI Mentor is kept as a complementary contextual copilot, not the primary navigation layer.

---

## 2. Adaptive Replanning vs. Rigid Curriculums
- **Decision**: Implemented an automated **Observe $\to$ Analyze $\to$ Plan $\to$ Act $\to$ Evaluate $\to$ Adapt** cycle.
- **Rationale**: In traditional platforms, failing an assessment results in a binary failure badge or an unhelpful message to "try again". EduPath treats failure as diagnostic telemetry. When a student fails 2 SQL JOIN questions, it diagnoses a conceptual bottleneck, automatically schedules a focused recovery module, and shifts downstream milestones while explaining the decision.

---

## 3. Confidence-Aware Skill Profiling & Evidence Tracking
- **Decision**: Prohibit the AI from claiming absolute certainty (e.g. "You know 100% of React"). Every extracted skill carries an **Estimated Proficiency**, a **Confidence Score (0-1)**, and explicit **Evidence Sources** (e.g., verbatim resume quotes, project repositories, or practice attempts).
- **Rationale**: Employers do not trust self-reported keywords. Distinguishing between **Claimed Skills** (from a resume) and **Demonstrated Skills** (from completed diagnostic projects) builds genuine career credibility.

---

## 4. "Learning Debt" UX Concept
- **Decision**: Introduced the psychological and architectural concept of "Learning Debt"—tracking high-priority prerequisite skills that a learner has repeatedly postponed.
- **Rationale**: Just as technical debt causes software instability, postponed fundamentals (like database indexing or authentication) cause learners to hit walls in advanced subjects. The "Rebalance Plan" modal gives users proactive agency to stabilize their trajectory.

---

## 5. Zero-Fail Deterministic Demo Mode
- **Decision**: Created an instant, offline-capable Demo Control Panel featuring pre-seeded data for the primary hackathon persona (**Alex, aspiring Full Stack Developer**) with one-click triggers for the SQL struggle scenario.
- **Rationale**: Live LLM calls during a 3-minute hackathon pitch can suffer from latency, rate limits, or network failures. Having deterministic local fallbacks guarantees a flawless judge demo while preserving live API connectivity when keys are present.

---

## 6. Curated Seeds vs. Arbitrary URL Generation
- **Decision**: Refused to let LLMs invent external URLs. All recommended learning resources are matched against a verified seed dataset of official documentation (React.dev, PostgreSQL docs, MDN, FreeCodeCamp).
- **Rationale**: Broken links and 404s ruin prototype credibility. Using verified seeds ensures 100% link integrity.
