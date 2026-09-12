import React, { useState, useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { BottomNav } from './components/BottomNav';
import { AuthModal } from './components/AuthModal';
import { DigitalIdModal } from './components/DigitalIdModal';
import { GlobalSearchModal } from './components/GlobalSearchModal';

// Views
import { HomeView } from './views/HomeView';
import { OrganizationView } from './views/OrganizationView';
import { AlumniView } from './views/AlumniView';
import { ScholarshipView } from './views/ScholarshipView';
import { EventsView } from './views/EventsView';
import { DonationsView } from './views/DonationsView';
import { FinanceView } from './views/FinanceView';
import { NoticesView } from './views/NoticesView';
import { LeadershipView } from './views/LeadershipView';
import { MediaView } from './views/MediaView';
import { AdminView } from './views/AdminView';

const MainApp: React.FC = () => {
  const { currentUser } = useApp();
  const [currentTab, setCurrentTab] = useState<string>('home');

  // Modals
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authInitialTab, setAuthInitialTab] = useState<'login' | 'register'>('login');
  const [authInitialUserType, setAuthInitialUserType] = useState<'student' | 'alumni'>('student');
  const [digitalIdOpen, setDigitalIdOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const handleOpenAuth = (tab: 'login' | 'register', userType: 'student' | 'alumni' = 'student') => {
    setAuthInitialTab(tab);
    setAuthInitialUserType(userType);
    setAuthModalOpen(true);
  };

  // Keyboard shortcut Ctrl+K / Cmd+K for global search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Scroll to top when tab changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentTab]);

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf9f6] dark:bg-[#12070a] text-stone-900 dark:text-stone-100 selection:bg-[#731326] selection:text-amber-100 transition-colors">
      
      {/* Top Navigation Bar */}
      <Header
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        onOpenAuth={handleOpenAuth}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenDigitalId={() => setDigitalIdOpen(true)}
      />

      {/* Main Content View Switcher */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 pt-6 pb-20 lg:pb-12">
        {currentTab === 'home' && (
          <HomeView
            onSelectTab={setCurrentTab}
            onOpenAuth={handleOpenAuth}
            onOpenDigitalId={() => setDigitalIdOpen(true)}
          />
        )}

        {currentTab === 'organization' && <OrganizationView />}

        {currentTab === 'alumni' && <AlumniView onOpenAuth={handleOpenAuth} />}

        {currentTab === 'scholarship' && <ScholarshipView />}

        {currentTab === 'events' && <EventsView />}

        {currentTab === 'donations' && <DonationsView />}

        {currentTab === 'finance' && <FinanceView />}

        {currentTab === 'notices' && <NoticesView />}

        {currentTab === 'leadership' && <LeadershipView />}

        {currentTab === 'media' && <MediaView />}

        {currentTab === 'admin' && <AdminView />}
      </main>

      {/* Bottom Mobile Navigation */}
      <BottomNav currentTab={currentTab} onSelectTab={setCurrentTab} />

      {/* Footer */}
      <Footer onSelectTab={setCurrentTab} />

      {/* Modals */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialTab={authInitialTab}
        initialUserType={authInitialUserType}
      />

      <DigitalIdModal
        isOpen={digitalIdOpen}
        onClose={() => setDigitalIdOpen(false)}
        user={currentUser}
      />

      <GlobalSearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onNavigateTab={setCurrentTab}
      />

      {/* Vercel Web Analytics */}
      <Analytics />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}
