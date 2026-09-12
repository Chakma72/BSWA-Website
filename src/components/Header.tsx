import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { OfficialLogo } from './OfficialLogo';
import {
  Search,
  Sun,
  Moon,
  Globe,
  UserCheck,
  CreditCard,
  Bell,
  Menu,
  X,
  LogOut,
  Shield,
  Award,
  ChevronDown
} from 'lucide-react';
import { UserRole } from '../types';

interface HeaderProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  onOpenAuth: (tab: 'login' | 'register') => void;
  onOpenSearch: () => void;
  onOpenDigitalId: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  onOpenAuth,
  onOpenSearch,
  onOpenDigitalId,
}) => {
  const {
    currentUser,
    activeRole,
    switchRole,
    theme,
    toggleTheme,
    language,
    toggleLanguage,
    logoutUser,
    notifications,
    markNotificationAsRead
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);

  const unreadNotifs = notifications.filter(n => !n.read);

  const navItems = [
    { id: 'home', labelEn: 'Home', labelBn: 'হোম' },
    { id: 'organization', labelEn: 'Organization', labelBn: 'সংগঠন' },
    { id: 'alumni', labelEn: 'Alumni Network', labelBn: 'অ্যালামনাই' },
    { id: 'scholarship', labelEn: 'Merit Scholarship', labelBn: 'মেধাবৃত্তি' },
    { id: 'events', labelEn: 'Events', labelBn: 'অনুষ্ঠান' },
    { id: 'donations', labelEn: 'Donations', labelBn: 'দান তহবিল' },
    { id: 'finance', labelEn: 'Finance', labelBn: 'আয়-ব্যয়' },
    { id: 'notices', labelEn: 'Notices', labelBn: 'বিজ্ঞপ্তি' },
    { id: 'leadership', labelEn: 'Leadership', labelBn: 'নেতৃত্ব' },
    { id: 'media', labelEn: 'Gallery', labelBn: 'গ্যালারি' },
  ];

  const roleOptions: { role: UserRole; title: string; badge: string; desc: string }[] = [
    { role: 'admin', title: 'Super Admin', badge: 'Full Control', desc: 'Manage users, finance, approvals & settings' },
    { role: 'executive', title: 'Executive Committee', badge: 'Committee', desc: 'Events, notices, member verifications' },
    { role: 'student', title: 'Running Student', badge: 'DUET Student', desc: 'Apply scholarship, register events, ID card' },
    { role: 'alumni', title: 'Alumni Member', badge: 'DUET Alumni', desc: 'Directory, donate, mentor students' },
    { role: 'guest', title: 'Public Guest', badge: 'View Only', desc: 'Public information, statistics & activities' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#180c10]/95 backdrop-blur-md border-b border-[#731326]/15 dark:border-amber-700/20 shadow-sm transition-colors">
      
      {/* Top Banner with Buddhist Benediction & Role Switcher Bar */}
      <div className="bg-gradient-to-r from-[#6b1426] via-[#540d1a] to-[#400712] text-amber-100 text-xs px-3 sm:px-6 py-1.5 flex flex-wrap items-center justify-between border-b border-[#d4af37]/40">
        
        {/* Sacred Buddhist Greeting */}
        <div className="flex items-center gap-2 text-[11px]">
          <span className="text-[#ffd700] text-sm">☸</span>
          <span className="font-serif tracking-wider hidden md:inline">
            {language === 'en'
              ? 'Namo Tassa Bhagavato Arahato Samma Sambuddhassa • Buddham Saranam Gacchami'
              : 'নমো তস্স ভগবতো অরহতো সম্মাসম্বুদ্ধস্স • সবার উপরে শান্তি ও মৈত্রী'}
          </span>
          <span className="font-serif tracking-wide md:hidden font-medium">
            BSWA • DUET Gazipur
          </span>
        </div>

        {/* Quick Role & Environment Controls */}
        <div className="flex items-center gap-2 sm:gap-3 text-[11px]">
          {/* Role Switcher Pill */}
          <div className="relative">
            <button
              onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
              className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#34040d]/80 hover:bg-[#200207] border border-[#d4af37]/60 text-amber-200 font-semibold shadow-inner transition-colors"
              title="Switch role for instant simulation of role permissions"
            >
              <Shield className="w-3 h-3 text-[#d4af37]" />
              <span className="capitalize">{roleOptions.find(r => r.role === activeRole)?.title}</span>
              <ChevronDown className="w-3 h-3 text-amber-300" />
            </button>

            {roleDropdownOpen && (
              <div
                className="absolute right-0 mt-1 w-64 bg-white dark:bg-[#1a0f12] text-stone-900 dark:text-stone-100 rounded-xl shadow-2xl border border-amber-900/30 dark:border-amber-700/40 p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150"
                onClick={() => setRoleDropdownOpen(false)}
              >
                <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#731326] dark:text-amber-400 border-b border-stone-200 dark:border-stone-800">
                  Switch Active Role (RBAC Demo)
                </div>
                <div className="space-y-1 mt-1">
                  {roleOptions.map(opt => (
                    <button
                      key={opt.role}
                      onClick={() => switchRole(opt.role)}
                      className={`w-full text-left p-2 rounded-lg text-xs transition-colors flex items-start justify-between ${
                        activeRole === opt.role
                          ? 'bg-amber-100 dark:bg-amber-950/60 text-[#731326] dark:text-amber-200 font-bold'
                          : 'hover:bg-stone-100 dark:hover:bg-stone-800/80 text-stone-700 dark:text-stone-300'
                      }`}
                    >
                      <div>
                        <div className="font-semibold">{opt.title}</div>
                        <div className="text-[10px] text-stone-500 dark:text-stone-400">{opt.desc}</div>
                      </div>
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-mono">
                        {opt.badge}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Language toggle */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1 px-2 py-0.5 rounded hover:bg-white/10 text-amber-200 transition-colors"
            title="Toggle Bangla / English"
          >
            <Globe className="w-3 h-3" />
            <span className="font-bold">{language === 'en' ? 'বাংলা' : 'EN'}</span>
          </button>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="p-1 rounded hover:bg-white/10 text-amber-200 transition-colors"
            title="Toggle Dark / Light mode"
          >
            {theme === 'light' ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5 text-amber-300" />}
          </button>
        </div>
      </div>

      {/* Main Navigation Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
        
        {/* Official Emblem & Branding */}
        <div
          onClick={() => onSelectTab('home')}
          className="cursor-pointer select-none"
        >
          <OfficialLogo size="md" showText={true} />
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map(item => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all relative ${
                  isActive
                    ? 'text-[#731326] dark:text-amber-400 bg-amber-50 dark:bg-[#28131a] shadow-xs'
                    : 'text-stone-600 dark:text-stone-300 hover:text-[#731326] dark:hover:text-amber-300 hover:bg-stone-50 dark:hover:bg-stone-900/60'
                }`}
              >
                {language === 'en' ? item.labelEn : item.labelBn}
                {isActive && (
                  <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#731326] dark:bg-amber-400 rounded-full" />
                )}
              </button>
            );
          })}

          {/* Admin Dashboard Tab (prominently displayed for committee & admin) */}
          {(activeRole === 'admin' || activeRole === 'executive') && (
            <button
              onClick={() => onSelectTab('admin')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                currentTab === 'admin'
                  ? 'bg-[#731326] text-white shadow-sm'
                  : 'bg-amber-100 dark:bg-amber-950/60 text-[#731326] dark:text-amber-300 hover:bg-[#731326] hover:text-white'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Admin Center</span>
            </button>
          )}
        </nav>

        {/* Right Action Icons & Auth Profile */}
        <div className="flex items-center gap-2">
          
          {/* Global Search Trigger */}
          <button
            onClick={onOpenSearch}
            className="p-2 rounded-xl text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors border border-transparent hover:border-stone-200 dark:hover:border-stone-700"
            title="Search BSWA (Ctrl+K)"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
              className="relative p-2 rounded-xl text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadNotifs.length > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-600 ring-2 ring-white dark:ring-stone-900" />
              )}
            </button>

            {notifDropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-80 bg-white dark:bg-[#1a0f12] rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 p-3 z-50"
                onClick={() => setNotifDropdownOpen(false)}
              >
                <div className="flex items-center justify-between pb-2 border-b border-stone-100 dark:border-stone-800 text-xs font-bold text-[#731326] dark:text-amber-400">
                  <span>Announcements & Alerts ({notifications.length})</span>
                </div>
                <div className="divide-y divide-stone-100 dark:divide-stone-800 max-h-60 overflow-y-auto">
                  {notifications.map(n => (
                    <div
                      key={n.id}
                      onClick={() => {
                        markNotificationAsRead(n.id);
                        if (n.linkTab) onSelectTab(n.linkTab);
                      }}
                      className={`p-2.5 text-xs hover:bg-stone-50 dark:hover:bg-stone-900 cursor-pointer rounded-lg transition-colors ${
                        !n.read ? 'bg-amber-50/60 dark:bg-amber-950/20' : ''
                      }`}
                    >
                      <div className="font-semibold text-stone-800 dark:text-stone-100 flex items-center justify-between">
                        <span>{n.title}</span>
                        <span className="text-[10px] text-stone-400">{n.date}</span>
                      </div>
                      <p className="text-[11px] text-stone-600 dark:text-stone-400 mt-1">{n.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Digital ID Card (when logged in as student, alumni, or admin) */}
          {currentUser && (
            <button
              onClick={onOpenDigitalId}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#d4af37]/80 bg-amber-50 dark:bg-amber-950/40 text-[#731326] dark:text-amber-300 hover:bg-amber-100 text-xs font-bold transition-all shadow-xs"
              title="View your official BSWA Digital Membership Card"
            >
              <CreditCard className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Digital ID</span>
            </button>
          )}

          {/* User Profile / Auth Button */}
          {currentUser ? (
            <div className="flex items-center gap-2 pl-1">
              <div
                onClick={onOpenDigitalId}
                className="flex items-center gap-2 cursor-pointer p-1 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                title="Your Profile"
              >
                <img
                  src={currentUser.photoUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
                  alt={currentUser.fullName}
                  className="w-8 h-8 rounded-full object-cover border border-[#731326]"
                />
                <div className="hidden xl:block text-left text-xs leading-tight">
                  <div className="font-bold text-stone-800 dark:text-stone-100 truncate max-w-[110px]">
                    {currentUser.fullName}
                  </div>
                  <div className="text-[10px] text-stone-500 capitalize">{currentUser.role}</div>
                </div>
              </div>

              <button
                onClick={logoutUser}
                className="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => onOpenAuth('login')}
                className="px-3 py-1.5 rounded-xl text-xs font-bold text-[#731326] dark:text-amber-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              >
                Login
              </button>
              <button
                onClick={() => onOpenAuth('register')}
                className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-[#731326] to-[#540d1a] hover:from-[#800020] text-white shadow-sm transition-all"
              >
                Register
              </button>
            </div>
          )}

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-[#180c10] border-b border-stone-200 dark:border-stone-800 px-4 py-3 space-y-2 animate-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-2 gap-1.5 pb-3 border-b border-stone-100 dark:border-stone-800">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  onSelectTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`p-2 rounded-lg text-xs font-semibold text-left ${
                  currentTab === item.id
                    ? 'bg-amber-100 dark:bg-amber-950/70 text-[#731326] dark:text-amber-300'
                    : 'text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-900'
                }`}
              >
                {language === 'en' ? item.labelEn : item.labelBn}
              </button>
            ))}
            {(activeRole === 'admin' || activeRole === 'executive') && (
              <button
                onClick={() => {
                  onSelectTab('admin');
                  setMobileMenuOpen(false);
                }}
                className="col-span-2 p-2 rounded-lg text-xs font-bold bg-[#731326] text-white text-center flex items-center justify-center gap-1.5"
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Executive & Admin Dashboard</span>
              </button>
            )}
          </div>

          {currentUser && (
            <button
              onClick={() => {
                onOpenDigitalId();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2 px-3 rounded-xl border border-[#d4af37] bg-amber-50 dark:bg-amber-950/40 text-[#731326] dark:text-amber-300 text-xs font-bold flex items-center justify-center gap-2"
            >
              <CreditCard className="w-4 h-4 text-[#d4af37]" />
              <span>View Digital Membership ID</span>
            </button>
          )}
        </div>
      )}
    </header>
  );
};
