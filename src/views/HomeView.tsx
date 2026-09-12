import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  GraduationCap,
  HandCoins,
  Users,
  QrCode,
  Quote,
  ChevronRight,
  ArrowRight,
  Pencil,
  Check,
  X
} from 'lucide-react';
import { BUDDHIST_HOLIDAYS_2026 } from '../data/initialData';

const BANNER_STORAGE_KEY = 'bswa_temple_banner_v1';

interface BannerContent {
  title: string;
  subtitle: string;
}

const DEFAULT_BANNER: BannerContent = {
  title: 'A Spiritual Refuge for Every Buddhist Engineer',
  subtitle: 'Rooted in the compassionate teachings of Lord Buddha, BSWA DUET nurtures wisdom, unity, and service across generations.'
};

const loadBanner = (): BannerContent => {
  try {
    const saved = localStorage.getItem(BANNER_STORAGE_KEY);
    return saved ? { ...DEFAULT_BANNER, ...JSON.parse(saved) } : DEFAULT_BANNER;
  } catch {
    return DEFAULT_BANNER;
  }
};

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
  const { language, leaders, activeRole } = useApp();

  const canEditBanner = activeRole === 'admin' || activeRole === 'executive';
  const [banner, setBanner] = useState<BannerContent>(loadBanner);
  const [isEditingBanner, setIsEditingBanner] = useState(false);
  const [draftBanner, setDraftBanner] = useState<BannerContent>(banner);

  const startEditBanner = () => {
    setDraftBanner(banner);
    setIsEditingBanner(true);
  };

  const saveBanner = () => {
    setBanner(draftBanner);
    localStorage.setItem(BANNER_STORAGE_KEY, JSON.stringify(draftBanner));
    setIsEditingBanner(false);
  };

  const cancelEditBanner = () => {
    setDraftBanner(banner);
    setIsEditingBanner(false);
  };

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

      {/* Editable Buddhist Temple Banner */}
      <section className="relative overflow-hidden rounded-2xl border border-[#ece4d6] dark:border-amber-900/30 shadow-sm">
        <img
          src="/images/buddhist-temple.png"
          alt="Golden Buddhist temple at dawn"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#4a0d18]/95 via-[#731326]/85 to-[#731326]/40" />

        <div className="relative p-6 sm:p-10 min-h-[220px] flex flex-col justify-center">
          {isEditingBanner ? (
            <div className="max-w-2xl space-y-3">
              <input
                value={draftBanner.title}
                onChange={e => setDraftBanner(d => ({ ...d, title: e.target.value }))}
                className="w-full rounded-lg bg-white/95 text-stone-900 font-serif font-bold text-xl px-3 py-2 outline-none focus:ring-2 focus:ring-[#d4af37]"
                placeholder="Banner title"
              />
              <textarea
                value={draftBanner.subtitle}
                onChange={e => setDraftBanner(d => ({ ...d, subtitle: e.target.value }))}
                rows={3}
                className="w-full rounded-lg bg-white/95 text-stone-800 text-sm px-3 py-2 outline-none focus:ring-2 focus:ring-[#d4af37] resize-none"
                placeholder="Banner subtitle"
              />
              <div className="flex gap-2">
                <button
                  onClick={saveBanner}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-[#d4af37] px-4 py-2 text-sm font-semibold text-[#4a0d18] hover:bg-[#c99a2e] transition-colors"
                >
                  <Check className="w-4 h-4" /> Save
                </button>
                <button
                  onClick={cancelEditBanner}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-white/20 px-4 py-2 text-sm font-semibold text-white hover:bg-white/30 transition-colors"
                >
                  <X className="w-4 h-4" /> Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="max-w-2xl">
              <h2 className="font-serif font-bold text-2xl sm:text-3xl text-white leading-tight text-balance">
                {banner.title}
              </h2>
              <p className="mt-3 text-sm sm:text-base text-amber-100/90 leading-relaxed text-pretty">
                {banner.subtitle}
              </p>
            </div>
          )}

          {canEditBanner && !isEditingBanner && (
            <button
              onClick={startEditBanner}
              className="absolute top-4 right-4 inline-flex items-center gap-1.5 rounded-lg bg-white/15 backdrop-blur px-3 py-1.5 text-xs font-semibold text-white hover:bg-white/25 transition-colors"
            >
              <Pencil className="w-3.5 h-3.5" /> Edit Banner
            </button>
          )}
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
