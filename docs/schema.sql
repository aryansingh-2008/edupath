-- EduPath Production Database Migration Schema (PostgreSQL 16 + pgvector)
-- Security Hardened: Row-Level Security (RLS) + Foreign Key Indexes + HNSW Vector Index

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "vector";

-- 1. Users & Profiles
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    target_role VARCHAR(100) NOT NULL,
    experience_level VARCHAR(50) NOT NULL,
    preferred_learning_style VARCHAR(50) DEFAULT 'mixed',
    daily_time_minutes INT DEFAULT 30 CHECK (daily_time_minutes > 0 AND daily_time_minutes <= 480),
    readiness_percentage INT DEFAULT 0 CHECK (readiness_percentage >= 0 AND readiness_percentage <= 100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON profiles(user_id);

-- 2. Skills & Verifiable Evidence
CREATE TABLE IF NOT EXISTS skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    estimated_level FLOAT NOT NULL CHECK (estimated_level >= 0.0 AND estimated_level <= 1.0),
    confidence FLOAT NOT NULL CHECK (confidence >= 0.0 AND confidence <= 1.0),
    target_benchmark FLOAT NOT NULL CHECK (target_benchmark >= 0.0 AND target_benchmark <= 1.0),
    status VARCHAR(50) NOT NULL,
    category VARCHAR(50) DEFAULT 'technical',
    last_validated TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_skills_user_id ON skills(user_id);

CREATE TABLE IF NOT EXISTS skill_evidence (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    skill_id UUID REFERENCES skills(id) ON DELETE CASCADE,
    source_type VARCHAR(50) NOT NULL,
    quote_or_description TEXT NOT NULL,
    verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_skill_evidence_skill_id ON skill_evidence(skill_id);

-- 3. Dynamic Learning Plans & Roadmap Milestones
CREATE TABLE IF NOT EXISTS learning_plans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    version INT DEFAULT 1,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_learning_plans_user_id ON learning_plans(user_id);

CREATE TABLE IF NOT EXISTS roadmap_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    plan_id UUID REFERENCES learning_plans(id) ON DELETE CASCADE,
    week_number INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    objective TEXT NOT NULL,
    skill_focus VARCHAR(100) NOT NULL,
    priority VARCHAR(50) DEFAULT 'medium',
    status VARCHAR(50) DEFAULT 'upcoming',
    is_recovery_module BOOLEAN DEFAULT FALSE,
    estimated_minutes INT DEFAULT 45,
    sort_order INT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_roadmap_items_plan_id ON roadmap_items(plan_id);

-- 4. Practice Attempts & Diagnostic Outcomes
CREATE TABLE IF NOT EXISTS practice_attempts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    skill VARCHAR(100) NOT NULL,
    sub_concept VARCHAR(100) NOT NULL,
    question_prompt TEXT NOT NULL,
    selected_option INT NOT NULL,
    is_correct BOOLEAN NOT NULL,
    difficulty VARCHAR(50) NOT NULL,
    attempt_timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_practice_attempts_user_id ON practice_attempts(user_id);

-- 5. Explainable Roadmap Changes
CREATE TABLE IF NOT EXISTS roadmap_changes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    trigger_reason TEXT NOT NULL,
    evidence_summary TEXT NOT NULL,
    decision_text TEXT NOT NULL,
    action_taken TEXT NOT NULL,
    impact_summary TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_roadmap_changes_user_id ON roadmap_changes(user_id);

-- 6. Curated Seed Resources with Embeddings
CREATE TABLE IF NOT EXISTS resources (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    url VARCHAR(500) NOT NULL,
    resource_type VARCHAR(50) NOT NULL,
    skill VARCHAR(100) NOT NULL,
    difficulty VARCHAR(50) NOT NULL,
    estimated_minutes INT NOT NULL,
    embedding vector(1536)
);
-- HNSW Index for sub-50ms vector cosine similarity queries
CREATE INDEX IF NOT EXISTS idx_resources_embedding ON resources USING hnsw (embedding vector_cosine_ops);

-- 7. Multi-Agent Audit Log
CREATE TABLE IF NOT EXISTS agent_runs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    agent_name VARCHAR(100) NOT NULL,
    status VARCHAR(50) NOT NULL,
    duration_ms INT NOT NULL,
    input_summary TEXT,
    output_summary TEXT,
    confidence FLOAT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 8. Row-Level Security (RLS) Policies (for multi-tenant isolation)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE skill_evidence ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE roadmap_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE practice_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE roadmap_changes ENABLE ROW LEVEL SECURITY;

-- Base RLS user access policy: Users can only read & write their own records
CREATE POLICY user_isolation_profiles ON profiles FOR ALL USING (user_id = auth.uid());
CREATE POLICY user_isolation_skills ON skills FOR ALL USING (user_id = auth.uid());
CREATE POLICY user_isolation_plans ON learning_plans FOR ALL USING (user_id = auth.uid());
CREATE POLICY user_isolation_attempts ON practice_attempts FOR ALL USING (user_id = auth.uid());
CREATE POLICY user_isolation_changes ON roadmap_changes FOR ALL USING (user_id = auth.uid());
