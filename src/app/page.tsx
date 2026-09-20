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
    return <LandingPage onEnterApp={() => setActiveTab('path')} />;
  }

  return (
    <CareerOSShell>
      
      {(activeTab === 'path' || activeTab === 'overview') && <AdaptiveRoadmapView />}
      {(activeTab === 'gaps' || activeTab === 'skills' || activeTab === 'readiness') && <SkillGapView />}
      {activeTab === 'mentor' && <AIMentorView />}
      {activeTab === 'practice' && <PracticeLabView />}

      
      <WhyPlanChangedModal />
      <AgentActivityDrawer />
      <OnboardingModal />
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
