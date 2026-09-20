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

  const decisionReceipt: AdaptiveDecision = {
    id: `decision-${Date.now()}`,
    timestamp,
    triggerReason: `Repeated difficulty detected with ${telemetry.skillName} (${telemetry.subConcept}).`,
    evidenceSummary: `${telemetry.failedCount} of ${telemetry.totalAttempts} recent diagnostic attempts were incorrect on ${telemetry.subConcept || 'foundational'} logic.`,
    decisionText: `Downstream competencies require solid relational and conceptual fundamentals in ${telemetry.skillName}. Continuing forward without remediation increases cognitive load.`,
    actionTaken: `Injected 45-minute Recovery Module for "${telemetry.skillName}" ahead of downstream modules.`,
    impactSummary: `Subsequent milestones shifted by +2 days to ensure prerequisite mastery without burnout.`,
    affectedSkills: [telemetry.skillName]
  };

  let mutatedRoadmap: RoadmapMilestone[];
  if (currentProfile.id === 'alex-rivera-1') {
    mutatedRoadmap = [...ADAPTED_ROADMAP_ALEX];
  } else {
    mutatedRoadmap = currentRoadmap.map((m, idx) => {
      const isTarget = m.skillFocus.toLowerCase().includes(telemetry.skillName.toLowerCase().split(' ')[0]) || idx === 0;
      if (isTarget) {
        return {
          ...m,
          title: m.title.includes('Recovery') ? m.title : `⚡ ${m.title} (Recovery Module)`,
          isRecoveryModule: true,
          priority: 'critical' as const,
          estimatedMinutes: m.estimatedMinutes + 45,
          tasks: [
            {
              id: `recovery-${Date.now()}`,
              title: `Remediation Drill: ${telemetry.subConcept || telemetry.skillName}`,
              type: 'quiz' as const,
              durationMinutes: 30,
              done: false
            },
            ...m.tasks
          ]
        };
      }
      if (idx === 1) {
        return {
          ...m,
          delayDays: (m.delayDays || 0) + 2
        };
      }
      return m;
    });
  }

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
