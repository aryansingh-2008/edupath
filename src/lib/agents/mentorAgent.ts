// EduPath Contextual AI Mentor Agent

import { LearnerProfile, RoadmapMilestone, AdaptiveDecision } from '../../types/index';

export function getContextualMentorResponse(
  userQuery: string,
  profile: LearnerProfile,
  roadmap: RoadmapMilestone[],
  latestDecision: AdaptiveDecision | null,
  bottleneckActive: boolean
): { reply: string; suggestedAction?: string; referencedSkill?: string } {
  const query = userQuery.toLowerCase().trim();

  // 1. "Why did my plan change?" or "Why did my roadmap adapt?"
  if (query.includes('change') || query.includes('adapt') || query.includes('why did my plan')) {
    if (latestDecision) {
      return {
        reply: `Your roadmap adapted because our Adaptive Planner detected repeated difficulty with **SQL JOIN queries** (2 out of 3 attempts were missed).\n\nRather than letting you hit a wall in Week 2's Express API chapter, EduPath injected a **45-minute SQL Recovery Module** focusing on visual query mental models and shifted downstream deadlines by 2 days. This ensures your fundamentals are solid!`,
        suggestedAction: 'Start SQL Recovery Module',
        referencedSkill: 'SQL & Relational DB'
      };
    }
    return {
      reply: `Your roadmap is currently on its baseline track. If you struggle during Practice Lab diagnostics, I will automatically detect the bottleneck and adapt your schedule with extra reinforcement.`,
      suggestedAction: 'Go to Practice Lab'
    };
  }

  // 2. "What should I learn today?" or "What's my mission?"
  if (query.includes('today') || query.includes('mission') || query.includes('next') || query.includes('what should i learn')) {
    if (bottleneckActive) {
      return {
        reply: `Today's #1 priority is your **SQL JOIN Recovery Module** (25 minutes). You'll review visual Venn diagrams of INNER vs. LEFT joins and solve 3 targeted repair queries. Completing this will clear your active bottleneck!`,
        suggestedAction: 'Start Today\'s Mission',
        referencedSkill: 'SQL & Relational DB'
      };
    }
    return {
      reply: `Today's mission is **SQL Foundations: Schema Constraints & Basic JOINs** (30 mins). You have already finished the PostgreSQL architecture reading, so the next step is the Practice Lab!`,
      suggestedAction: 'Start Today\'s Mission',
      referencedSkill: 'SQL & Relational DB'
    };
  }

  // 3. "Why is SQL important?" or "Why SQL?"
  if (query.includes('sql') || query.includes('database')) {
    return {
      reply: `For your target role as a **Full Stack Developer**, relational data persistence is non-negotiable. 8 out of 10 target competency profiles require SQL. While your resume showed basic SELECT queries, modern full-stack APIs require joining across relational entities (Users, Orders, Transactions) with zero data loss.`,
      suggestedAction: 'View SQL Gaps in Skills Map',
      referencedSkill: 'SQL & Relational DB'
    };
  }

  // 4. "Can I skip React?" or "Can I skip..."
  if (query.includes('skip') && query.includes('react')) {
    return {
      reply: `You already have strong frontend fundamentals (React at 62%, JavaScript at 78%). Your primary bottleneck is backend persistence and system design, not React. In fact, your current roadmap minimizes redundant React tutorials so you can focus 80% of your time on SQL and Express!`,
      suggestedAction: 'Review Skill Map',
      referencedSkill: 'React.js'
    };
  }

  // 5. "What project should I build?"
  if (query.includes('project') || query.includes('build')) {
    return {
      reply: `I recommend the **Multi-Tenant Expense & Budget API** capstone. It uses Node.js, Express, and PostgreSQL. Building this will convert your SQL and backend skills from "Claimed" to "Demonstrated" in your Career Readiness portfolio.`,
      suggestedAction: 'View Capstone Project',
      referencedSkill: 'SQL & Relational DB'
    };
  }

  // 6. Default intelligent response
  return {
    reply: `I'm tracking your progress toward **${profile.targetRole}**. You're currently at **${profile.readinessPercentage}% readiness**. Your current highest-leverage focus is closing your **SQL & Relational DB** gap before tackling backend services.\n\nAsk me anytime about why your plan changed, what project to build, or why a specific skill matters!`,
    suggestedAction: 'Open Roadmap',
    referencedSkill: 'SQL & Relational DB'
  };
}
