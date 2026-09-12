import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { OfficialLogo } from './OfficialLogo';
import {
  Sun,
  Moon,
  CreditCard,
  Menu,
  X,
  LogOut,
  Shield,
  ChevronDown,
  Home,
  GraduationCap,
  Users,
  Landmark,
  Calendar,
  Award,
  Building2,
  Megaphone
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
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const navItems = [
    { id: 'home', labelEn: 'Home', labelBn: 'হোম', icon: Home },
    { id: 'scholarship', labelEn: 'Scholarship', labelBn: 'বৃত্তি', icon: GraduationCap },
    { id: 'alumni', labelEn: 'Alumni', labelBn: 'অ্যালামনাই', icon: Users },
    { id: 'finance', labelEn: 'Finance & Accounts', labelBn: 'আয়-ব্যয়', icon: Landmark },
    { id: 'events', labelEn: 'Events', labelBn: 'অনুষ্ঠান', icon: Calendar },
    { id: 'leadership', labelEn: 'Leadership Archive', labelBn: 'নেতৃত্ব', icon: Award },
    { id: 'organization', labelEn: 'About BSWA', labelBn: 'সংগঠন', icon: Building2 },
    { id: 'notices', labelEn: 'Notices', labelBn: 'বিজ্ঞপ্তি', icon: Megaphone },
  ];

  const roleOptions: { role: UserRole; title: string; badge: string; desc: string }[] = [
    { role: 'admin', title: 'Super Admin', badge: 'Full Control', desc: 'Manage users, finance, approvals & settings' },
    { role: 'executive', title: 'Executive Committee', badge: 'Committee', desc: 'Events, notices, member verifications' },
    { role: 'student', title: 'Running Student', badge: 'DUET Student', desc: 'Apply scholarship, register events, ID card' },
    { role: 'alumni', title: 'Alumni Member', badge: 'DUET Alumni', desc: 'Directory, donate, mentor students' },
    { role: 'guest', title: 'Public Guest', badge: 'View Only', desc: 'Public information, statistics & activities' },
  ];

  const activeRoleOption = roleOptions.find(r => r.role === activeRole);

  return (
    <header className="sticky top-0 z-40 shadow-md transition-colors">

      {/* Top Bar: Branding + Controls */}
      <div className="bg-gradient-to-r from-[#6b1426] via-[#540d1a] to-[#3a0610] border-b border-[#d4af37]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">

          {/* Branding */}
          <div
            onClick={() => onSelectTab('home')}
            className="flex items-center gap-3 cursor-pointer select-none min-w-0"
          >
            <OfficialLogo size="md" showText={false} />
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-serif font-extrabold text-lg sm:text-xl text-white tracking-wide leading-none">
                  BSWA DUET
                </span>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-[#d4af37] text-[#3a0610] tracking-wide">
                  22 YRS
                </span>
              </div>
              <span className="hidden sm:block text-[11px] text-amber-200/80 font-medium mt-0.5 truncate">
                Buddhist Students Welfare Association, DUET
              </span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">

            {/* Role Switcher */}
            <div className="relative hidden sm:block">
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#34040d]/70 hover:bg-[#2a0309] border border-[#d4af37]/50 text-amber-200 text-xs font-semibold transition-colors"
                title="Switch active role"
              >
                <Shield className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>{activeRoleOption?.title} ({activeRoleOption?.badge})</span>
                <ChevronDown className="w-3.5 h-3.5 text-amber-300" />
              </button>

              {roleDropdownOpen && (
                <div
                  className="absolute right-0 mt-1.5 w-64 bg-white dark:bg-[#1a0f12] text-stone-900 dark:text-stone-100 rounded-xl shadow-2xl border border-amber-900/30 dark:border-amber-700/40 p-1.5 z-50"
                  onClick={() => setRoleDropdownOpen(false)}
                >
                  <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#731326] dark:text-amber-400 border-b border-stone-200 dark:border-stone-800">
                    Switch Active Role
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
              className="px-2.5 py-1.5 rounded-lg border border-[#d4af37]/50 text-amber-200 text-xs font-bold hover:bg-white/10 transition-colors"
              title="Toggle Bangla / English"
            >
              {language === 'en' ? 'বাংলা' : 'EN'}
            </button>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-lg text-amber-200 hover:bg-white/10 transition-colors"
              title="Toggle Dark / Light mode"
            >
              {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-amber-300" />}
            </button>

            {/* Digital Card */}
            <button
              onClick={onOpenDigitalId}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#e5b53c] to-[#b38600] text-[#3a0610] text-xs font-bold shadow hover:brightness-105 transition-all"
              title="View your BSWA Digital Membership Card"
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>Digital Card</span>
            </button>

            {/* Auth */}
            {currentUser ? (
              <button
                onClick={logoutUser}
                className="p-1.5 rounded-lg text-amber-200 hover:text-rose-300 hover:bg-white/10 transition-colors"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => onOpenAuth('login')}
                className="hidden md:block px-3 py-1.5 rounded-lg text-xs font-bold text-amber-100 border border-white/20 hover:bg-white/10 transition-colors"
              >
                Login
              </button>
            )}

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 rounded-lg text-amber-100 hover:bg-white/10"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="hidden lg:block bg-[#4a0a17] dark:bg-[#2a0309] border-b border-[#d4af37]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center gap-1 py-1">
          {navItems.map(item => {
            const isActive = currentTab === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`px-3 py-2.5 text-xs font-semibold transition-all flex items-center gap-1.5 relative ${
                  isActive
                    ? 'text-[#f0c04a]'
                    : 'text-amber-100/70 hover:text-amber-100'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{language === 'en' ? item.labelEn : item.labelBn}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#f0c04a] rounded-full" />
                )}
              </button>
            );
          })}

          {(activeRole === 'admin' || activeRole === 'executive') && (
            <button
              onClick={() => onSelectTab('admin')}
              className={`px-3 py-2.5 text-xs font-bold transition-all flex items-center gap-1.5 ${
                currentTab === 'admin' ? 'text-[#f0c04a]' : 'text-[#e0b64a] hover:text-[#f0c04a]'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Admin Panel</span>
            </button>
          )}
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#3a0610] border-b border-[#d4af37]/20 px-4 py-3 space-y-2">
          <div className="grid grid-cols-2 gap-1.5 pb-3 border-b border-white/10">
            {navItems.map(item => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`p-2 rounded-lg text-xs font-semibold text-left flex items-center gap-2 ${
                    currentTab === item.id
                      ? 'bg-white/10 text-[#f0c04a]'
                      : 'text-amber-100/80 hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{language === 'en' ? item.labelEn : item.labelBn}</span>
                </button>
              );
            })}
            {(activeRole === 'admin' || activeRole === 'executive') && (
              <button
                onClick={() => {
                  onSelectTab('admin');
                  setMobileMenuOpen(false);
                }}
                className="col-span-2 p-2 rounded-lg text-xs font-bold bg-[#d4af37] text-[#3a0610] text-center flex items-center justify-center gap-1.5"
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Admin Panel</span>
              </button>
            )}
          </div>

          <button
            onClick={() => {
              onOpenDigitalId();
              setMobileMenuOpen(false);
            }}
            className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-[#e5b53c] to-[#b38600] text-[#3a0610] text-xs font-bold flex items-center justify-center gap-2"
          >
            <CreditCard className="w-4 h-4" />
            <span>Digital Card</span>
          </button>
        </div>
      )}
    </header>
  );
};
