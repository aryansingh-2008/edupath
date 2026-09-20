// EduPath Core Domain Model & Schema Types

export type SkillStatus = 'mastered' | 'strong' | 'developing' | 'gap' | 'unknown';
export type SkillPriority = 'critical' | 'high' | 'medium' | 'low';
export type MilestoneStatus = 'completed' | 'active' | 'upcoming' | 'delayed';
export type QuestionType = 'mcq' | 'debugging' | 'coding' | 'scenario';
export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';

export interface SkillEvidence {
  source: 'resume' | 'project' | 'practice' | 'certificate' | 'portfolio';
  quote: string;
  verified: boolean;
  timestamp?: string;
}

export interface Skill {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'architecture' | 'devops' | 'ai';
  estimatedLevel: number; // 0.00 to 1.00
  confidence: number;     // 0.00 to 1.00
  targetBenchmark: number;// 0.00 to 1.00
  status: SkillStatus;
  evidence: SkillEvidence[];
  dependencies?: string[];
  lastValidated?: string;
}

export interface SkillGap {
  skillId: string;
  name: string;
  currentLevel: number;
  requiredLevel: number;
  gapDelta: number;
  priority: SkillPriority;
  whyItMatters: string;
  evidenceSummary: string;
  nextAction: string;
}

export interface VerifiedResource {
  id: string;
  title: string;
  url: string;
  source: string;
  type: 'documentation' | 'interactive' | 'video' | 'article' | 'book';
  difficulty: DifficultyLevel;
  estimatedMinutes: number;
  skillId: string;
  whyRecommended: string;
}

export interface RoadmapTask {
  id: string;
  title: string;
  type: 'reading' | 'practice' | 'quiz' | 'mini-project' | 'coding';
  durationMinutes: number;
  done: boolean;
}

export interface ProjectTemplate {
  id: string;
  title: string;
  goal: string;
  skillsTrained: string[];
  requirements: string[];
  techStack: string[];
  evaluationCriteria: string[];
  difficulty: DifficultyLevel;
}

export interface RoadmapMilestone {
  id: string;
  weekNumber: number;
  title: string;
  objective: string;
  skillFocus: string;
  priority: SkillPriority;
  status: MilestoneStatus;
  isRecoveryModule: boolean;
  estimatedMinutes: number;
  tasks: RoadmapTask[];
  resource: VerifiedResource;
  capstoneProject?: ProjectTemplate;
  delayDays?: number;
}

export interface PracticeQuestion {
  id: string;
  skillId: string;
  skillName: string;
  subConcept: string;
  prompt: string;
  codeSnippet?: string;
  type: QuestionType;
  options: string[];
  correctIndex: number;
  explanation: string;
  hint: string;
  difficulty: DifficultyLevel;
}

export interface AdaptiveDecision {
  id: string;
  timestamp: string;
  triggerReason: string;
  evidenceSummary: string;
  decisionText: string;
  actionTaken: string;
  impactSummary: string;
  affectedSkills: string[];
}

export interface LearningDebtItem {
  skillId: string;
  name: string;
  daysDelayed: number;
  reason: string;
  prerequisiteFor: string[];
  severity: 'warning' | 'critical';
}

export interface AgentRunLog {
  id: string;
  agentName: 'Profile Agent' | 'Skill Intelligence Agent' | 'Gap Agent' | 'Roadmap Planner Agent' | 'Resource Agent' | 'Practice Agent' | 'Progress Agent' | 'Adaptive Planner Agent' | 'Mentor Agent';
  status: 'success' | 'running' | 'idle';
  durationMs: number;
  inputSummary: string;
  outputSummary: string;
  confidence: number;
  timestamp: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'mentor';
  text: string;
  timestamp: string;
  suggestedAction?: string;
  referencedSkill?: string;
}

export interface LearnerProfile {
  id: string;
  name: string;
  avatarInitial: string;
  tagline: string;
  targetRole: string;
  careerGoal?: string;
  experienceLevel: string;
  learningPreference: string;
  dailyCommitmentMinutes: number;
  readinessPercentage: number;
  streakDays: number;
  xpPoints: number;
  skills: Skill[];
  learningDebt: LearningDebtItem[];
  resumeParsed: boolean;
  extractedRawProjects: number;
}

export type AppView = 
  | 'overview'
  | 'skills'
  | 'gaps'
  | 'path'
  | 'practice'
  | 'projects'
  | 'mentor'
  | 'readiness'
  | 'progress'
  | 'onboarding'
  | 'landing';
