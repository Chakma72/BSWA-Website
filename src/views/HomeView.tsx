import React from 'react';
import { useApp } from '../context/AppContext';
import {
  GraduationCap,
  HandCoins,
  Users,
  QrCode,
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
    <div className="space-y-8 pb-16 pt-2">

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
