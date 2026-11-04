/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar, NavTab } from './components/Navbar';
import { DisclaimerBanner } from './components/DisclaimerBanner';
import { Footer } from './components/Footer';
import { HomeView } from './views/HomeView';
import { RaiseComplaintView } from './views/RaiseComplaintView';
import { TrackComplaintView } from './views/TrackComplaintView';
import { KnowYourRightsView } from './views/KnowYourRightsView';
import { FindLegalHelpView } from './views/FindLegalHelpView';
import { EmergencyHelpView } from './views/EmergencyHelpView';
import { AboutView } from './views/AboutView';
import { AdminView } from './views/AdminView';
import { CategoryKey } from './types';
import { initializeStorage } from './utils/storage';
import { useLanguage } from './context/LanguageContext';

export default function App() {
  const { language, setLanguage } = useLanguage();
  const [currentTab, setCurrentTab] = useState<NavTab>('home');
  const [selectedCategoryForRaise, setSelectedCategoryForRaise] = useState<CategoryKey | undefined>(undefined);
  const [selectedCategoryForRights, setSelectedCategoryForRights] = useState<CategoryKey | undefined>(undefined);
  const [searchQueryForRights, setSearchQueryForRights] = useState<string>('');
  const [trackedComplaintId, setTrackedComplaintId] = useState<string>('');
  const [adminResolveComplaintId, setAdminResolveComplaintId] = useState<string | undefined>(undefined);

  // Initialize storage with realistic seed dockets on startup
  useEffect(() => {
    initializeStorage();
  }, []);

  const handleNavigate = (tab: NavTab, params?: { category?: CategoryKey; search?: string }) => {
    if (params?.category) {
      if (tab === 'raise') {
        setSelectedCategoryForRaise(params.category);
      } else if (tab === 'rights') {
        setSelectedCategoryForRights(params.category);
      }
    }
    if (params?.search) {
      setSearchQueryForRights(params.search);
    }
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToTrack = (complaintId: string) => {
    setTrackedComplaintId(complaintId);
    setCurrentTab('track');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFileComplaintForCategory = (category: CategoryKey) => {
    setSelectedCategoryForRaise(category);
    setCurrentTab('raise');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToAdminResolve = (complaintId: string) => {
    setAdminResolveComplaintId(complaintId);
    setCurrentTab('admin');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Top Disclaimer Banner */}
      <DisclaimerBanner onNavigateEmergency={() => setCurrentTab('emergency')} />

      {/* Main Header / Navigation */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={(tab) => {
          if (tab === 'raise') setSelectedCategoryForRaise(undefined);
          if (tab === 'rights') {
            setSelectedCategoryForRights(undefined);
            setSearchQueryForRights('');
          }
          if (tab !== 'admin') {
            setAdminResolveComplaintId(undefined);
          }
          setCurrentTab(tab);
        }}
        language={language}
        onLanguageChange={setLanguage}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <HomeView onNavigate={handleNavigate} />
        )}

        {currentTab === 'raise' && (
          <RaiseComplaintView
            initialCategory={selectedCategoryForRaise}
            onTrackNavigate={handleNavigateToTrack}
          />
        )}

        {currentTab === 'track' && (
          <TrackComplaintView
            initialComplaintId={trackedComplaintId}
            onNavigateRaise={() => {
              setSelectedCategoryForRaise(undefined);
              setCurrentTab('raise');
            }}
            onNavigateAdminResolve={handleNavigateToAdminResolve}
          />
        )}

        {currentTab === 'rights' && (
          <KnowYourRightsView
            initialCategory={selectedCategoryForRights}
            initialSearch={searchQueryForRights}
            onFileComplaint={handleFileComplaintForCategory}
          />
        )}

        {currentTab === 'legal-help' && (
          <FindLegalHelpView />
        )}

        {currentTab === 'emergency' && (
          <EmergencyHelpView />
        )}

        {currentTab === 'about' && (
          <AboutView />
        )}

        {currentTab === 'admin' && (
          <AdminView
            initialResolveComplaintId={adminResolveComplaintId}
          />
        )}
      </main>

      {/* Authoritative Civic Footer */}
      <Footer onSelectTab={(tab) => setCurrentTab(tab)} />
    </div>
  );
}
