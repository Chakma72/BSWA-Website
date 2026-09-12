import React from 'react';
import { useApp } from '../context/AppContext';
import { OfficialLogo } from '../components/OfficialLogo';
import {
  GraduationCap,
  HandCoins,
  Users,
  QrCode,
  Heart,
  Quote,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { BUDDHIST_HOLIDAYS_2026 } from '../data/initialData';

interface HomeViewProps {
  onSelectTab: (tab: string) => void;
  onOpenAuth: (tab: 'login' | 'register', type?: 'student' | 'alumni') => void;
  onOpenDigitalId: () => void;
}

const compactDate = (str: string): string => {
  const first = str.split('-')[0].trim();
  const m = first.match(/([A-Za-z]+)\s+(\d+)/);
  const year = str.match(/(\d{4})/);
  if (m) {
    return `${m[2]} ${m[1].slice(0, 3).toUpperCase()} ${year ? year[1] : ''}`.trim();
  }
  return str;
};

export const HomeView: React.FC<HomeViewProps> = ({ onSelectTab }) => {
  const { language, leaders } = useApp();

  const currentPresident = leaders.find(l => l.role === 'President' && l.type === 'current');
  const currentGS = leaders.find(l => l.role === 'General Secretary' && l.type === 'current');

  const leaderCards = [
    { leader: currentPresident, accent: 'bg-[#731326]', badge: 'PRESIDENT', badgeClass: 'bg-rose-100 text-[#731326]' },
    { leader: currentGS, accent: 'bg-[#c99a2e]', badge: 'GENERAL SECRETARY', badgeClass: 'bg-amber-100 text-amber-800' }
  ].filter(c => c.leader);

  const features = [
    {
      icon: GraduationCap,
      title: 'Merit Scholarship',
      sub: '145+ Awarded All-Time',
      tab: 'scholarship',
      iconBg: 'bg-[#731326]/10 dark:bg-[#731326]/30',
      iconColor: 'text-[#731326] dark:text-amber-300'
    },
    {
      icon: HandCoins,
      title: 'Donation & Relief',
      sub: 'Instant PDF Receipts',
      tab: 'donations',
      iconBg: 'bg-orange-100 dark:bg-orange-950/50',
      iconColor: 'text-orange-600 dark:text-orange-400'
    },
    {
      icon: Users,
      title: 'Alumni Network',
      sub: 'Global Engineering Directory',
      tab: 'alumni',
      iconBg: 'bg-amber-100 dark:bg-amber-950/50',
      iconColor: 'text-amber-700 dark:text-amber-400'
    },
    {
      icon: QrCode,
      title: 'Events & QR Check-in',
      sub: 'Buddha Purnima & Sanghadana',
      tab: 'events',
      iconBg: 'bg-emerald-100 dark:bg-emerald-950/50',
      iconColor: 'text-emerald-700 dark:text-emerald-400'
    }
  ];

  return (
    <div className="space-y-8 pb-16">

      {/* Hero Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#6b1426] via-[#540d1a] to-[#30050e] text-white shadow-xl border border-[#d4af37]/30 p-6 sm:p-8 md:p-10">
        <div className="absolute top-0 right-0 -mt-16 -mr-16 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-6 lg:gap-8">
          {/* Emblem */}
          <div className="flex-shrink-0">
            <OfficialLogo size="lg" showText={false} className="justify-center" />
          </div>

          {/* Title Block */}
          <div className="flex-1 text-center lg:text-left space-y-3">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-[#d4af37]/60 text-amber-200 text-[10px] sm:text-xs font-bold tracking-widest uppercase">
              Established 2004
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-extrabold text-amber-50 leading-tight text-balance">
              Buddhist Students Welfare Association (BSWA), DUET
            </h1>
            <p className="italic text-amber-300 text-sm sm:text-base font-medium">
              {language === 'en'
                ? 'Serving Buddhist Engineering Undergraduates for 22 Glorious Years'
                : '২২ বছর ধরে বৌদ্ধ প্রকৌশল শিক্ষার্থীদের সেবায় নিয়োজিত'}
            </p>
          </div>

          {/* Actions */}
          <div className="flex-shrink-0 flex flex-col sm:flex-row lg:flex-col gap-3 w-full sm:w-auto">
            <button
              onClick={() => onSelectTab('scholarship')}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#e5b53c] to-[#b38600] text-[#3a0610] font-bold text-sm shadow-lg hover:brightness-105 transition-all flex items-center justify-center gap-2"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Apply Scholarship</span>
            </button>
            <button
              onClick={() => onSelectTab('donations')}
              className="px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <Heart className="w-4 h-4" />
              <span>Donate Now</span>
            </button>
          </div>
        </div>
      </section>

      {/* Feature Tiles */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map(f => {
          const Icon = f.icon;
          return (
            <button
              key={f.title}
              onClick={() => onSelectTab(f.tab)}
              className="text-left p-5 rounded-2xl bg-white dark:bg-[#1a0f12] border border-[#ece4d6] dark:border-amber-900/30 shadow-sm hover:shadow-md hover:border-[#d4af37] transition-all"
            >
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${f.iconBg}`}>
                <Icon className={`w-5 h-5 ${f.iconColor}`} />
              </div>
              <h3 className="font-bold text-base text-stone-900 dark:text-stone-100">{f.title}</h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">{f.sub}</p>
            </button>
          );
        })}
      </section>

      {/* Leadership Messages + Observances */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Leadership Messages */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Quote className="w-5 h-5 text-[#731326] dark:text-amber-400" />
              <h2 className="font-bold text-sm sm:text-base tracking-wider uppercase text-[#731326] dark:text-amber-300">
                Current Leadership Messages
              </h2>
            </div>
            <button
              onClick={() => onSelectTab('leadership')}
              className="text-xs font-semibold text-[#731326] dark:text-amber-400 hover:underline flex items-center gap-1"
            >
              <span>View Historical Archive</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-4">
            {leaderCards.map(({ leader, accent, badge, badgeClass }) => (
              <div
                key={leader!.id}
                className="p-5 rounded-2xl bg-white dark:bg-[#1a0f12] border border-[#ece4d6] dark:border-amber-900/30 shadow-sm"
              >
                <div className="flex gap-4 items-start">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-full ${accent} text-white flex items-center justify-center font-serif font-bold text-lg`}>
                    {leader!.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-bold text-base text-stone-900 dark:text-stone-100">
                          {language === 'bn' && leader!.nameBn ? leader!.nameBn : leader!.name}
                        </h3>
                        <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
                          {leader!.department}
                        </p>
                      </div>
                      <span className={`flex-shrink-0 px-2 py-0.5 rounded text-[9px] font-bold tracking-wide ${badgeClass} dark:bg-amber-950/60 dark:text-amber-300`}>
                        {badge} ({leader!.term.replace(/\s/g, '').replace('2025-2026', '2025-26')})
                      </span>
                    </div>
                    <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed italic mt-3 line-clamp-3">
                      "{language === 'bn' && leader!.messageBn ? leader!.messageBn : leader!.message}"
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Buddhist Observances Sidebar */}
        <div className="rounded-2xl bg-white dark:bg-[#1a0f12] border border-[#ece4d6] dark:border-amber-900/30 shadow-sm p-5 h-fit">
          <div className="flex items-center gap-2 pb-3 border-b border-[#ece4d6] dark:border-amber-900/30">
            <span className="text-orange-500 text-xl leading-none">&#9784;</span>
            <h3 className="font-bold text-sm tracking-wider uppercase text-[#731326] dark:text-amber-300">
              Buddhist Observances 2570
            </h3>
          </div>

          <div className="mt-4 space-y-3">
            {BUDDHIST_HOLIDAYS_2026.slice(0, 4).map((holiday, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl border border-[#f0e9dd] dark:border-amber-900/20 hover:border-[#d4af37]/60 transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-bold text-sm text-[#731326] dark:text-amber-300 leading-snug">
                    {language === 'bn' && holiday.nameBn ? holiday.nameBn : holiday.name}
                  </h4>
                  <span className="flex-shrink-0 px-2 py-0.5 rounded bg-orange-500 text-white text-[9px] font-bold tracking-wide whitespace-nowrap">
                    {compactDate(holiday.dateStr)}
                  </span>
                </div>
                <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-1 leading-relaxed line-clamp-2">
                  {language === 'bn' && holiday.significanceBn ? holiday.significanceBn : holiday.significance}
                </p>
              </div>
            ))}
          </div>

          <button
            onClick={() => onSelectTab('events')}
            className="mt-4 w-full text-center text-xs font-semibold text-[#731326] dark:text-amber-400 hover:underline flex items-center justify-center gap-1"
          >
            <span>Full Ceremonial Calendar</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
