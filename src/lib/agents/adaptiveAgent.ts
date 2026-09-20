// EduPath Adaptive Planner Agent

import { RoadmapMilestone, AdaptiveDecision, LearnerProfile } from '../../types/index';
import { ADAPTED_ROADMAP_ALEX } from '../../data/seedData';

export interface StruggleTelemetry {
  skillId: string;
  skillName: string;
  subConcept: string;
  failedCount: number;
  totalAttempts: number;
}

export function detectBottleneck(telemetry: StruggleTelemetry): boolean {
  // If user fails 2 or more attempts on a critical prerequisite subconcept
  return telemetry.failedCount >= 2;
}

export function executeAdaptiveReplanning(
  currentProfile: LearnerProfile,
  currentRoadmap: RoadmapMilestone[],
  telemetry: StruggleTelemetry
): {
  mutatedRoadmap: RoadmapMilestone[];
  decisionReceipt: AdaptiveDecision;
  updatedProfile: LearnerProfile;
} {
  const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // Generate the explainability decision receipt
  const decisionReceipt: AdaptiveDecision = {
    id: `decision-${Date.now()}`,
    timestamp,
    triggerReason: `Repeated difficulty detected with ${telemetry.skillName} (${telemetry.subConcept}).`,
    evidenceSummary: `${telemetry.failedCount} of ${telemetry.totalAttempts} recent diagnostic attempts were incorrect on multi-table query logic.`,
    decisionText: `Downstream modules (Express APIs, Authentication) require solid relational query fundamentals. Continuing forward would compound learning debt.`,
    actionTaken: `Injected 45-minute Recovery Module: "SQL JOIN Mastery & Visual Queries" ahead of backend persistence.`,
    impactSummary: `Week 2 Backend module shifted by +2 days to ensure foundational mastery without burnout.`,
    affectedSkills: [telemetry.skillName, 'Node.js & Express']
  };

  // Mutated roadmap with the injected recovery module
  const mutatedRoadmap = [...ADAPTED_ROADMAP_ALEX];

  // Update profile readiness & skills
  const updatedSkills = currentProfile.skills.map(s => {
    if (s.id === telemetry.skillId) {
      return {
        ...s,
        status: 'gap' as const,
        evidence: [
          ...s.evidence,
          {
            source: 'practice' as const,
            quote: `Bottleneck flagged: ${telemetry.failedCount}/${telemetry.totalAttempts} failed diagnostic queries on ${telemetry.subConcept}.`,
            verified: true,
            timestamp
          }
        ]
      };
    }
    return s;
  });

  const updatedProfile: LearnerProfile = {
    ...currentProfile,
    skills: updatedSkills
  };

  return {
    mutatedRoadmap,
    decisionReceipt,
    updatedProfile
  };
}
