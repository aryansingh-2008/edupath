'use client';

import React, { createContext, useContext, useState } from 'react';
import {
  LearnerProfile,
  RoadmapMilestone,
  AdaptiveDecision,
  AgentRunLog,
  ChatMessage,
  AppView
} from '../types';
import {
  INITIAL_ALEX_PROFILE,
  INITIAL_ROADMAP_ALEX,
  INITIAL_AGENT_RUNS
} from '../data/seedData';
import { executeAdaptiveReplanning } from '../lib/agents/adaptiveAgent';
import { getContextualMentorResponse } from '../lib/agents/mentorAgent';
import { generateCustomLearnerProfile } from '../lib/agents/customPathGenerator';
import confetti from 'canvas-confetti';

interface EduPathContextType {
  isAuthenticated: boolean;
  login: (username: string, role?: string, skillsInput?: string, dailyMinutes?: number) => void;
  createAccount: (fullName: string, email: string, role: string, skillsInput?: string, dailyMinutes?: number) => void;
  logout: () => void;
  profile: LearnerProfile;
  activeTab: AppView;
  roadmap: RoadmapMilestone[];
  bottleneckDetected: boolean;
  latestDecision: AdaptiveDecision | null;
  agentRuns: AgentRunLog[];
  chatMessages: ChatMessage[];
  practiceAttempts: Array<{ questionId: string; isCorrect: boolean; timestamp: string }>;
  learningDebtRebalanced: boolean;
  isAgentDrawerOpen: boolean;
  isWhyPlanChangedModalOpen: boolean;
  isOnboardingOpen: boolean;
  activeMissionModal: boolean;
  setActiveTab: (tab: AppView) => void;
  simulateSqlStruggle: () => void;
  simulateTaskCompletion: (taskId?: string) => void;
  resetDemo: () => void;
  rebalanceLearningDebt: () => void;
  sendChatMessage: (text: string) => void;
  setIsAgentDrawerOpen: (open: boolean) => void;
  setIsWhyPlanChangedModalOpen: (open: boolean) => void;
  setIsOnboardingOpen: (open: boolean) => void;
  isCustomModalOpen: boolean;
  setIsCustomModalOpen: (open: boolean) => void;
  updateProfile: (updates: Partial<LearnerProfile>) => void;
  setActiveMissionModal: (open: boolean) => void;
  setCustomProfileAndRoadmap: (newProfile: LearnerProfile, newRoadmap: RoadmapMilestone[]) => void;
}

const EduPathContext = createContext<EduPathContextType | undefined>(undefined);

export const EduPathProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('edupath_auth') === 'true';
    }
    return false;
  });

  const [profile, setProfile] = useState<LearnerProfile>(INITIAL_ALEX_PROFILE);
  const [activeTab, setActiveTab] = useState<AppView>('path');
  const [roadmap, setRoadmap] = useState<RoadmapMilestone[]>(INITIAL_ROADMAP_ALEX);
  const [bottleneckDetected, setBottleneckDetected] = useState<boolean>(false);
  const [latestDecision, setLatestDecision] = useState<AdaptiveDecision | null>(null);
  const [agentRuns, setAgentRuns] = useState<AgentRunLog[]>(INITIAL_AGENT_RUNS);
  const [practiceAttempts, setPracticeAttempts] = useState<Array<{ questionId: string; isCorrect: boolean; timestamp: string }>>([]);
  const [learningDebtRebalanced, setLearningDebtRebalanced] = useState<boolean>(false);
  const [isAgentDrawerOpen, setIsAgentDrawerOpen] = useState<boolean>(false);
  const [isWhyPlanChangedModalOpen, setIsWhyPlanChangedModalOpen] = useState<boolean>(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState<boolean>(false);
  const [isCustomModalOpen, setIsCustomModalOpen] = useState<boolean>(false);
  const [activeMissionModal, setActiveMissionModal] = useState<boolean>(false);

  const login = (
    username: string,
    roleName: string = 'Full Stack Developer',
    skillsInput: string = '',
    dailyMinutes: number = 30
  ) => {
    const cleanName = username.trim() || 'Admin';
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('edupath_auth', 'true');
    }
    setIsAuthenticated(true);

    const isJudge = cleanName.toLowerCase() === 'admin';
    const { profile: customProfile, roadmap: customRoadmap } = generateCustomLearnerProfile(
      isJudge ? 'Admin (Judge)' : cleanName,
      roleName,
      isJudge ? 'JavaScript, React, Node.js' : skillsInput,
      dailyMinutes
    );
    setProfile(customProfile);
    setRoadmap(customRoadmap);
    setBottleneckDetected(false);
    setLatestDecision(null);
    setActiveTab('path');
  };

  const createAccount = (
    fullName: string,
    email: string,
    roleName: string,
    skillsInput: string = '',
    dailyMinutes: number = 30
  ) => {
    login(fullName || email, roleName, skillsInput, dailyMinutes);
  };

  const logout = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('edupath_auth');
    }
    setIsAuthenticated(false);
    resetDemo();
  };

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'm-init',
      sender: 'mentor',
      text: "Hello Alex! I'm your EduPath AI Mentor. I've mapped your background against target Full Stack Developer standards. You have solid JavaScript & React foundations, but SQL and System Design are your primary career gaps. What would you like to work on today?",
      timestamp: 'Just now',
      suggestedAction: 'View Today\'s Mission',
      referencedSkill: 'SQL & Relational DB'
    }
  ]);

  // TRIGGER THE CORE ADAPTIVE REPLANNING LOOP
  const simulateSqlStruggle = () => {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // 1. Record diagnostic failures
    const newAttempts = [
      { questionId: 'q-join-1', isCorrect: false, timestamp: timeStr },
      { questionId: 'q-join-2', isCorrect: false, timestamp: timeStr }
    ];
    setPracticeAttempts(prev => [...prev, ...newAttempts]);
    setBottleneckDetected(true);

    // 2. Run Adaptive Planner Agent
    const result = executeAdaptiveReplanning(profile, roadmap, {
      skillId: 'sql',
      skillName: 'SQL & Relational DB',
      subConcept: 'INNER & LEFT JOIN Queries',
      failedCount: 2,
      totalAttempts: 3
    });

    setRoadmap(result.mutatedRoadmap);
    setLatestDecision(result.decisionReceipt);
    setProfile(result.updatedProfile);

    // 3. Log agent execution run
    const newRun: AgentRunLog = {
      id: `run-${Date.now()}`,
      agentName: 'Adaptive Planner Agent',
      status: 'success',
      durationMs: 340,
      inputSummary: 'Observed 2 consecutive diagnostic failures on SQL JOIN logic.',
      outputSummary: 'Injected 45-min Recovery Module. Postponed Week 2 Backend APIs by 2 days. Generated decision receipt.',
      confidence: 0.94,
      timestamp: timeStr
    };
    setAgentRuns(prev => [newRun, ...prev]);

    // 4. Notify Mentor
    setChatMessages(prev => [
      ...prev,
      {
        id: `msg-${Date.now()}`,
        sender: 'mentor',
        text: '⚠️ **Learning Bottleneck Detected**: You missed 2 multi-table JOIN questions. I have adapted your roadmap to inject a focused 45-minute SQL Recovery Module so you master relational mental models before moving to backend APIs.',
        timestamp: timeStr,
        suggestedAction: 'Why did my plan change?',
        referencedSkill: 'SQL & Relational DB'
      }
    ]);

    // 5. Open the explainability modal
    setIsWhyPlanChangedModalOpen(true);
  };

  // TRIGGER TASK OR MISSION COMPLETION
  const simulateTaskCompletion = (taskId?: string) => {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Trigger celebratory confetti
    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch {
      // safe fallback
    }

    // Update tasks in roadmap
    let markedOne = false;
    setRoadmap(prev =>
      prev.map(milestone => ({
        ...milestone,
        tasks: milestone.tasks.map(t => {
          if (taskId) {
            return t.id === taskId ? { ...t, done: true } : t;
          }
          if (!markedOne && !t.done) {
            markedOne = true;
            return { ...t, done: true };
          }
          return t;
        })
      }))
    );

    // Update Profile Metrics
    setProfile(prev => ({
      ...prev,
      xpPoints: prev.xpPoints + 50,
      readinessPercentage: Math.min(100, prev.readinessPercentage + 4),
      streakDays: prev.streakDays + 1
    }));

    // Log Progress Agent
    const progressRun: AgentRunLog = {
      id: `run-${Date.now()}`,
      agentName: 'Progress Agent',
      status: 'success',
      durationMs: 210,
      inputSummary: `Task ${taskId || 'active mission'} validated as complete.`,
      outputSummary: 'Incremented XP (+50), updated daily streak, recalculated career readiness.',
      confidence: 0.98,
      timestamp: timeStr
    };
    setAgentRuns(prev => [progressRun, ...prev]);
  };

  // RESET DEMO TO CLEAN BASELINE
  const resetDemo = () => {
    setProfile(INITIAL_ALEX_PROFILE);
    setRoadmap(INITIAL_ROADMAP_ALEX);
    setBottleneckDetected(false);
    setLatestDecision(null);
    setAgentRuns(INITIAL_AGENT_RUNS);
    setPracticeAttempts([]);
    setLearningDebtRebalanced(false);
    setIsWhyPlanChangedModalOpen(false);
    setActiveTab('path');
  };

  // REBALANCE LEARNING DEBT
  const rebalanceLearningDebt = () => {
    setLearningDebtRebalanced(true);
    setProfile(prev => ({
      ...prev,
      learningDebt: []
    }));
    const rebalanceRun: AgentRunLog = {
      id: `run-${Date.now()}`,
      agentName: 'Roadmap Planner Agent',
      status: 'success',
      durationMs: 380,
      inputSummary: 'User approved Learning Debt Rebalancing.',
      outputSummary: 'Consolidated postponed SQL & Docker prerequisites into Week 1 buffer hours.',
      confidence: 0.92,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setAgentRuns(prev => [rebalanceRun, ...prev]);
  };

  // SEND CHAT MESSAGE TO MENTOR
  const sendChatMessage = (text: string) => {
    if (!text.trim()) return;

    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: timeStr
    };

    const mentorReply = getContextualMentorResponse(
      text,
      profile,
      roadmap,
      latestDecision,
      bottleneckDetected
    );

    const mentorMsg: ChatMessage = {
      id: `mentor-${Date.now()}`,
      sender: 'mentor',
      text: mentorReply.reply,
      timestamp: timeStr,
      suggestedAction: mentorReply.suggestedAction,
      referencedSkill: mentorReply.referencedSkill
    };

    setChatMessages(prev => [...prev, userMsg, mentorMsg]);
  };

  // UPDATE LEARNER PROFILE
  const updateProfile = (updates: Partial<LearnerProfile>) => {
    setProfile(prev => ({ ...prev, ...updates }));
  };

  // LOAD DYNAMIC CUSTOM PROFILE & ROADMAP
  const setCustomProfileAndRoadmap = (newProfile: LearnerProfile, newRoadmap: RoadmapMilestone[]) => {
    setProfile(newProfile);
    setRoadmap(newRoadmap);
    setBottleneckDetected(false);
    setLatestDecision(null);

    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newRun: AgentRunLog = {
      id: `run-custom-${Date.now()}`,
      agentName: 'Roadmap Planner Agent',
      status: 'success',
      durationMs: 420,
      inputSummary: `Dynamic profile intake for ${newProfile.name}: Target role "${newProfile.targetRole}". Evaluated ${newProfile.skills.length} skills.`,
      outputSummary: `Calculated ${newProfile.readinessPercentage}% career readiness. Generated ${newRoadmap.length}-week adaptive milestone roadmap.`,
      confidence: 0.96,
      timestamp: timeStr
    };
    setAgentRuns(prev => [newRun, ...prev]);

    setChatMessages([
      {
        id: `msg-custom-welcome`,
        sender: 'mentor',
        text: `👋 Welcome **${newProfile.name}**! I have analyzed your skills against industry benchmarks for **${newProfile.targetRole}**.\n\nYour calculated starting readiness is **${newProfile.readinessPercentage}%**. We prioritized your critical skill gaps in Week 1. Let's start by tackling your first mission!`,
        timestamp: timeStr,
        suggestedAction: 'View Week 1 Roadmap'
      }
    ]);
  };

  return (
    <EduPathContext.Provider
      value={{
        isAuthenticated,
        login,
        createAccount,
        logout,
        profile,
        activeTab,
        roadmap,
        bottleneckDetected,
        latestDecision,
        agentRuns,
        chatMessages,
        practiceAttempts,
        learningDebtRebalanced,
        isAgentDrawerOpen,
        isWhyPlanChangedModalOpen,
        isOnboardingOpen,
        activeMissionModal,
        setActiveTab,
        simulateSqlStruggle,
        simulateTaskCompletion,
        resetDemo,
        rebalanceLearningDebt,
        sendChatMessage,
        setIsAgentDrawerOpen,
        setIsWhyPlanChangedModalOpen,
        setIsOnboardingOpen,
        isCustomModalOpen,
        setIsCustomModalOpen,
        updateProfile,
        setActiveMissionModal,
        setCustomProfileAndRoadmap
      }}
    >
      {children}
    </EduPathContext.Provider>
  );
};

export const useEduPath = () => {
  const context = useContext(EduPathContext);
  if (!context) {
    throw new Error('useEduPath must be used within an EduPathProvider');
  }
  return context;
};
