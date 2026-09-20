# EduPath - Setup & Local Development Guide

This guide walks through setting up and running **EduPath** locally or deploying to production.

---

## Prerequisites

- **Node.js**: v18.0.0 or higher (v20+ recommended)
- **npm**: v9.0.0 or higher
- *(Optional)* **PostgreSQL with pgvector**: For live production database persistence
- *(Optional)* **API Keys**: OpenAI or Google Gemini API key for live inference (app runs fully in Demo Mode without any keys!)

---

## Quick Start (Demo Mode - Zero Configuration)

1. **Clone or Navigate to the Repository**:
   ```bash
   cd c:\Users\dell\Desktop\edupath
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run Development Server**:
   ```bash
   npm run dev
   ```

4. **Open in Browser**:
   Navigate to [http://localhost:3000](http://localhost:3000).

5. **Interact with the Demo Control Bar**:
   - The app launches with **Demo Mode enabled** by default.
   - Use the bottom-right floating **Demo Control Bar** to:
     - Simulate Alex's SQL Struggle (triggers real-time bottleneck detection & roadmap mutation)
     - Simulate Task Completion (+XP, streak, and proficiency increase)
     - Trigger AI Adaptation
     - Inspect Agent Swarm Activity logs

---

## Production Setup (With Live Database & LLMs)

1. **Configure Environment Variables**:
   Copy the `.env.example` template:
   ```bash
   cp .env.example .env.local
   ```

2. **Set Values in `.env.local`**:
   ```env
   # LLM Provider Keys
   OPENAI_API_KEY=sk-...
   GEMINI_API_KEY=AIza...

   # Database Connection (Supabase or Local Postgres)
   DATABASE_URL=postgresql://postgres:password@localhost:5432/edupath

   # App Settings
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   NEXT_PUBLIC_ENABLE_DEMO_MODE=true
   ```

3. **Run Database Migrations**:
   Execute the migration script against your PostgreSQL instance:
   ```bash
   # Using psql or Supabase SQL Editor
   psql $DATABASE_URL -f docs/schema.sql
   ```

4. **Build and Start Production Server**:
   ```bash
   npm run build
   npm run start
   ```

---

## Verification & Test Commands

- Run TypeScript type checks:
  ```bash
  npm run type-check
  ```
- Run ESLint:
  ```bash
  npm run lint
  ```
