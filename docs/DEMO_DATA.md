# EduPath - Seed Data & Demo Personas Reference

This document describes the canonical seed datasets, personas, target role taxonomies, and verified learning resources powering EduPath's deterministic demo mode.

---

## 1. Primary Demo Persona: Alex Rivera

- **Background**: Junior Web Developer, 22 years old
- **Target Role**: Full Stack Developer
- **Commitment**: 30 minutes / day
- **Preferred Style**: Hands-on coding & video tutorials
- **Extracted Skills & Capabilities**:

| Skill Name | Estimated Level | Confidence | Target Benchmark | Status | Verbatim Evidence Source |
| :--- | :---: | :---: | :---: | :---: | :--- |
| **JavaScript (ES6+)** | 0.78 (78%) | 0.88 | 0.85 | Strong | *"Built responsive web applications utilizing ES6 async/await and array methods."* |
| **React** | 0.62 (62%) | 0.82 | 0.80 | Developing | *"Developed frontend state management components with hooks (useState, useEffect)."* |
| **Node.js** | 0.41 (41%) | 0.65 | 0.75 | Developing | *"Built basic Express REST endpoints for user authentication."* |
| **SQL & Relational DB** | 0.34 (34%) | 0.70 | 0.80 | **Critical Gap** | *"Basic SELECT queries with SQLite; no foreign keys or indexing demonstrated."* |
| **System Design** | 0.18 (18%) | 0.55 | 0.70 | **Critical Gap** | *"Monolithic single-server deployment; no caching or load balancing."* |

---

## 2. Canonical Target Role Taxonomy: Full Stack Developer

Industry benchmark frequencies and prerequisite dependencies:

- **Frontend Core**: JavaScript (Weight: 0.90), React (Weight: 0.85), CSS/Tailwind (Weight: 0.75)
- **Backend Core**: Node.js/Express (Weight: 0.80), REST APIs (Weight: 0.85)
- **Database & Persistence**: SQL/PostgreSQL (Weight: 0.90), ORM/Prisma (Weight: 0.70)
- **Architecture & DevOps**: System Design (Weight: 0.75), Docker (Weight: 0.65), CI/CD (Weight: 0.60)

---

## 3. Verified Seed Resources (Zero Broken Links)

| Skill | Resource Title | Verified URL | Type | Difficulty | Est. Time |
| :--- | :--- | :--- | :--- | :--- | :---: |
| **SQL** | PostgreSQL Tutorial for Beginners | `https://www.postgresql.org/docs/current/tutorial.html` | Docs | Beginner | 45m |
| **SQL** | SQL JOINs Explained Visually | `https://mode.com/sql-tutorial/sql-joins/` | Interactive | Intermediate | 30m |
| **React** | React.dev - Preserving and Resetting State | `https://react.dev/learn/preserving-and-resetting-state` | Official Docs | Intermediate | 35m |
| **Node.js** | Express Routing & Middleware Guide | `https://expressjs.com/en/guide/routing.html` | Docs | Intermediate | 40m |
| **System Design** | System Design Primer (Donne Martin) | `https://github.com/donnemartin/system-design-primer` | Guide | Advanced | 60m |

---

## 4. Adaptive Replanning Simulation Scenario

- **Initial State**: Roadmap shows Week 1 (SQL Foundations) $\to$ Week 2 (Backend APIs) $\to$ Week 3 (System Design).
- **Struggle Trigger**: Alex takes the SQL Practice Quiz and fails questions on `INNER JOIN` vs `LEFT OUTER JOIN`.
- **Adaptive Action**:
  - `Adaptive Planner Agent` detects failure rate $>60\%$ on relational join sub-concepts.
  - Injects new recovery module: **"SQL JOIN Recovery & Visual Query Challenge"** (25 minutes).
  - Postpones Week 2 Backend APIs by 2 days to protect prerequisite mastery.
  - Generates the transparent "Why did my plan change?" explanation card.
