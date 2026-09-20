'use client';

import React from 'react';
import { EduPathProvider, useEduPath } from '../store/useEduPathStore';
import { CareerOSShell } from '../components/CareerOSShell';
import { SkillGapView } from '../components/SkillGapView';
import { AdaptiveRoadmapView } from '../components/AdaptiveRoadmapView';
import { AIMentorView } from '../components/AIMentorView';
import { LandingPage } from '../components/LandingPage';
import { WhyPlanChangedModal } from '../components/WhyPlanChangedModal';
import { AgentActivityDrawer } from '../components/AgentActivityDrawer';
import { OnboardingModal } from '../components/OnboardingModal';
import { DemoControlBar } from '../components/DemoControlBar';
import { CustomProfileModal } from '../components/CustomProfileModal';
import { LoginPage } from '../components/LoginPage';
import { PracticeLabView } from '../components/PracticeLabView';
import { OverviewDashboard } from '../components/OverviewDashboard';
import { ProgressReportView } from '../components/ProgressReportView';
import { CapabilityAnalyzerModal } from '../components/CapabilityAnalyzerModal';

function EduPathAppContent() {
  const { isAuthenticated, activeTab, setActiveTab, isCustomModalOpen, setIsCustomModalOpen } = useEduPath();
  const [showLogin, setShowLogin] = React.useState(false);
  const [authMode, setAuthMode] = React.useState<'signin' | 'signup'>('signin');

  if (!isAuthenticated) {
    if (showLogin) {
      return (
        <LoginPage
          initialMode={authMode}
          onBackToLanding={() => setShowLogin(false)}
        />
      );
    }
    return (
      <LandingPage
        onEnterApp={(mode = 'signin') => {
          setAuthMode(mode);
          setShowLogin(true);
        }}
      />
    );
  }

  if (activeTab === 'landing') {
    return <LandingPage onEnterApp={() => setActiveTab('overview')} />;
  }

  return (
    <CareerOSShell>
      {activeTab === 'overview' && <OverviewDashboard />}
      {activeTab === 'path' && <AdaptiveRoadmapView />}
      {(activeTab === 'gaps' || activeTab === 'skills' || activeTab === 'readiness') && <SkillGapView />}
      {activeTab === 'practice' && <PracticeLabView />}
      {activeTab === 'progress' && <ProgressReportView />}
      {activeTab === 'mentor' && <AIMentorView />}

      <WhyPlanChangedModal />
      <AgentActivityDrawer />
      <OnboardingModal />
      <CapabilityAnalyzerModal />
      <CustomProfileModal isOpen={isCustomModalOpen} onClose={() => setIsCustomModalOpen(false)} />
      <DemoControlBar />
    </CareerOSShell>
  );
}

export default function Page() {
  return (
    <EduPathProvider>
      <EduPathAppContent />
    </EduPathProvider>
  );
}
