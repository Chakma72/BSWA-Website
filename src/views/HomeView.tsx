import React from 'react';
import { useApp } from '../context/AppContext';
import { OfficialLogo } from '../components/OfficialLogo';
import {
  Award,
  Heart,
  Calendar,
  Bell,
  Users,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  Clock,
  Sparkles,
  Compass,
  FileText
} from 'lucide-react';
import { BUDDHIST_HOLIDAYS_2026 } from '../data/initialData';

interface HomeViewProps {
  onSelectTab: (tab: string) => void;
  onOpenAuth: (tab: 'login' | 'register', type?: 'student' | 'alumni') => void;
  onOpenDigitalId: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onSelectTab,
  onOpenAuth,
  onOpenDigitalId
}) => {
  const {
    language,
    currentUser,
    activeRole,
    notices,
    events,
    campaigns,
    scholarshipRecipients,
    scholarshipDonors,
    leaders
  } = useApp();

  const currentPresident = leaders.find(l => l.role === 'President' && l.type === 'current');
  const currentGS = leaders.find(l => l.role === 'General Secretary' && l.type === 'current');

  const activeCampaign = campaigns.find(c => c.status === 'active') || campaigns[0];
  const upcomingEvents = events.filter(e => e.status === 'upcoming').slice(0, 2);
  const pinnedNotices = notices.filter(n => n.pinned).concat(notices.filter(n => !n.pinned)).slice(0, 3);

  // Scholarship counters
  const totalScholarshipsCount = 145 + scholarshipRecipients.length - 5;
  const currentYearScholarshipsCount = 18;

  return (
    <div className="space-y-12 pb-16">
      
      {/* Welcome Hero Banner with Buddhist Aesthetic */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#6b1426] via-[#540d1a] to-[#30050e] text-white shadow-xl border border-[#d4af37]/40 p-6 sm:p-10 md:p-12">
        
        {/* Subtle Decorative Buddhist Lotus & Mandala Elements */}
        <div className="absolute top-0 right-0 -mt-16 -mr-16 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-20 w-80 h-80 rounded-full bg-rose-900/40 blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl text-center lg:text-left">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-[#d4af37]/60 text-amber-200 text-xs font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>
                {language === 'en'
                  ? 'Official Digital Platform • BSWA DUET Gazipur'
                  : 'অফিসিয়াল ডিজিটাল পোর্টাল • বিএসডব্লিউএ ডুয়েট গাজীপুর'}
              </span>
            </div>

            <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl font-extrabold text-amber-100 tracking-tight leading-tight">
              Buddhist Students Welfare Association
              <span className="block text-amber-400 text-xl sm:text-2xl md:text-3xl font-medium mt-1 font-sans">
                Dhaka University of Engineering & Technology (DUET)
              </span>
            </h1>

            <p className="text-xs sm:text-sm text-amber-100/80 leading-relaxed max-w-xl">
              {language === 'en'
                ? 'Empowering Buddhist engineering students through academic excellence, merit scholarships, fraternal unity, and timeless Dhamma mindfulness since 1986.'
                : '১৯৮৬ সাল থেকে ডুয়েটের সকল বৌদ্ধ প্রকৌশলী শিক্ষার্থীদের জ্ঞান, মেধা, ভাতৃত্ব এবং মৈত্রীময় চেতনায় ঐক্যবদ্ধ রাখার দীর্ঘমেয়াদী প্রতিষ্ঠান।'}
            </p>

            {/* Quick Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs font-semibold">
              <button
                onClick={() => onSelectTab('scholarship')}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#e5a93c] to-[#b38600] text-[#3a0610] font-bold shadow-lg hover:shadow-amber-500/20 hover:scale-105 transition-all flex items-center gap-2"
              >
                <Award className="w-4 h-4" />
                <span>Apply for Merit Scholarship</span>
              </button>

              <button
                onClick={() => onSelectTab('donations')}
                className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-amber-300/40 text-amber-100 backdrop-blur-sm transition-all flex items-center gap-2"
              >
                <Heart className="w-4 h-4 text-rose-400" />
                <span>Donate to Welfare Fund</span>
              </button>

              <button
                onClick={() => onSelectTab('alumni')}
                className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/15 border border-white/20 text-stone-200 transition-all flex items-center gap-1.5"
              >
                <Users className="w-4 h-4 text-amber-300" />
                <span>Alumni Network</span>
              </button>
            </div>
          </div>

          {/* Right Emblem Showcase Card */}
          <div className="flex-shrink-0 text-center bg-white/10 dark:bg-black/20 backdrop-blur-md p-6 rounded-3xl border border-amber-300/30 shadow-2xl">
            <OfficialLogo size="xl" showText={false} className="justify-center mx-auto" />
            <div className="mt-3 font-serif font-bold text-amber-200 text-lg">
              BSWA, DUET
            </div>
            <div className="text-[11px] text-amber-200/70 font-mono tracking-widest uppercase">
              Established 1986
            </div>
            <div className="mt-3 pt-3 border-t border-amber-300/20 flex justify-center gap-3 text-[10px] text-amber-200">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                Verified
              </span>
              <span>•</span>
              <span>Gazipur-1707</span>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights & Statistical Metric Strip */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div
          onClick={() => onSelectTab('scholarship')}
          className="cursor-pointer p-4 rounded-2xl bg-white dark:bg-[#1a0f12] border border-amber-900/15 dark:border-amber-700/30 shadow-sm hover:border-amber-400 transition-all"
        >
          <div className="flex items-center justify-between text-amber-700 dark:text-amber-400 mb-2">
            <Award className="w-5 h-5" />
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950/60">
              All-Time
            </span>
          </div>
          <div className="text-2xl font-bold font-serif text-[#731326] dark:text-amber-300">
            {totalScholarshipsCount} Students
          </div>
          <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
            Total Merit Scholarships Awarded
          </p>
        </div>

        <div
          onClick={() => onSelectTab('scholarship')}
          className="cursor-pointer p-4 rounded-2xl bg-white dark:bg-[#1a0f12] border border-amber-900/15 dark:border-amber-700/30 shadow-sm hover:border-amber-400 transition-all"
        >
          <div className="flex items-center justify-between text-[#731326] dark:text-amber-400 mb-2">
            <Sparkles className="w-5 h-5" />
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950/60">
              2026 Batch
            </span>
          </div>
          <div className="text-2xl font-bold font-serif text-[#731326] dark:text-amber-300">
            {currentYearScholarshipsCount} Scholars
          </div>
          <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
            Current Year Awarded & Active
          </p>
        </div>

        <div
          onClick={() => onSelectTab('alumni')}
          className="cursor-pointer p-4 rounded-2xl bg-white dark:bg-[#1a0f12] border border-amber-900/15 dark:border-amber-700/30 shadow-sm hover:border-amber-400 transition-all"
        >
          <div className="flex items-center justify-between text-[#731326] dark:text-amber-400 mb-2">
            <Users className="w-5 h-5" />
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950/60">
              Network
            </span>
          </div>
          <div className="text-2xl font-bold font-serif text-[#731326] dark:text-amber-300">
            350+ Engineers
          </div>
          <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
            DUET Buddhist Alumni Across Globe
          </p>
        </div>

        <div
          onClick={() => onSelectTab('donations')}
          className="cursor-pointer p-4 rounded-2xl bg-white dark:bg-[#1a0f12] border border-amber-900/15 dark:border-amber-700/30 shadow-sm hover:border-amber-400 transition-all"
        >
          <div className="flex items-center justify-between text-rose-600 dark:text-rose-400 mb-2">
            <Heart className="w-5 h-5" />
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-rose-100 dark:bg-rose-950/60">
              Welfare Fund
            </span>
          </div>
          <div className="text-2xl font-bold font-serif text-[#731326] dark:text-amber-300">
            ৳ {activeCampaign.raisedAmount.toLocaleString()}
          </div>
          <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
            Raised for 2026 Student Welfare
          </p>
        </div>
      </section>

      {/* Leadership Showcase: Current President & General Secretary */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#731326] dark:text-amber-300">
              Current Executive Leadership (2025 - 2026)
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Messages from the President and General Secretary of BSWA, DUET
            </p>
          </div>
          <button
            onClick={() => onSelectTab('leadership')}
            className="text-xs font-semibold text-[#731326] dark:text-amber-400 hover:underline flex items-center gap-1"
          >
            <span>View Full Leadership Archive</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* President Card */}
          {currentPresident && (
            <div className="p-6 rounded-3xl bg-white dark:bg-[#1a0f12] border-2 border-[#d4af37]/30 shadow-md flex flex-col sm:flex-row gap-5 items-start">
              <div className="flex-shrink-0 text-center sm:text-left">
                <img
                  src={currentPresident.photoUrl}
                  alt={currentPresident.name}
                  className="w-24 h-28 object-cover rounded-2xl border-2 border-[#731326] shadow-sm mx-auto"
                />
                <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#731326] text-white">
                  President
                </span>
              </div>

              <div className="flex-1 space-y-2 text-xs">
                <div>
                  <h3 className="font-serif font-bold text-base text-[#731326] dark:text-amber-300">
                    {currentPresident.name}
                  </h3>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400">
                    {currentPresident.department} • Term: {currentPresident.term}
                  </p>
                </div>
                <p className="text-stone-700 dark:text-stone-300 leading-relaxed line-clamp-4 italic">
                  "{language === 'bn' && currentPresident.messageBn ? currentPresident.messageBn : currentPresident.message}"
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => onSelectTab('leadership')}
                    className="text-[11px] font-semibold text-[#731326] dark:text-amber-400 hover:underline"
                  >
                    Read Complete Presidential Address →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* General Secretary Card */}
          {currentGS && (
            <div className="p-6 rounded-3xl bg-white dark:bg-[#1a0f12] border-2 border-[#d4af37]/30 shadow-md flex flex-col sm:flex-row gap-5 items-start">
              <div className="flex-shrink-0 text-center sm:text-left">
                <img
                  src={currentGS.photoUrl}
                  alt={currentGS.name}
                  className="w-24 h-28 object-cover rounded-2xl border-2 border-[#731326] shadow-sm mx-auto"
                />
                <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-600 text-white">
                  General Secretary
                </span>
              </div>

              <div className="flex-1 space-y-2 text-xs">
                <div>
                  <h3 className="font-serif font-bold text-base text-[#731326] dark:text-amber-300">
                    {currentGS.name}
                  </h3>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400">
                    {currentGS.department} • Term: {currentGS.term}
                  </p>
                </div>
                <p className="text-stone-700 dark:text-stone-300 leading-relaxed line-clamp-4 italic">
                  "{language === 'bn' && currentGS.messageBn ? currentGS.messageBn : currentGS.message}"
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => onSelectTab('leadership')}
                    className="text-[11px] font-semibold text-[#731326] dark:text-amber-400 hover:underline"
                  >
                    Read General Secretary's Report →
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Main Center Grid: Latest Notices, Upcoming Events & Active Donation Campaign */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Col 1 & 2: Notices & Events */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Latest Notices */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-[#731326] dark:text-amber-400" />
                <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-100">
                  {language === 'en' ? 'Latest Official Notices' : 'সর্বশেষ নোটিশ'}
                </h3>
              </div>
              <button
                onClick={() => onSelectTab('notices')}
                className="text-xs font-semibold text-[#731326] dark:text-amber-400 hover:underline flex items-center gap-0.5"
              >
                <span>All Notices</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {pinnedNotices.map(notice => (
                <div
                  key={notice.id}
                  onClick={() => onSelectTab('notices')}
                  className="p-4 rounded-2xl bg-white dark:bg-[#1a0f12] border border-stone-200 dark:border-stone-800 hover:border-amber-400 dark:hover:border-amber-600 shadow-xs cursor-pointer transition-all space-y-2"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      {notice.pinned && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300">
                          Pinned
                        </span>
                      )}
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
                        {notice.category}
                      </span>
                    </div>
                    <span className="text-[10px] text-stone-400 font-mono">{notice.date}</span>
                  </div>

                  <h4 className="text-sm font-bold text-[#731326] dark:text-amber-300 hover:underline">
                    {language === 'bn' && notice.titleBn ? notice.titleBn : notice.title}
                  </h4>

                  <p className="text-xs text-stone-600 dark:text-stone-300 line-clamp-2 leading-relaxed">
                    {notice.content}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#731326] dark:text-amber-400" />
                <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-100">
                  {language === 'en' ? 'Upcoming Programs & Ceremonies' : 'আসন্ন অনুষ্ঠান ও ধর্মীয় কর্মসূচি'}
                </h3>
              </div>
              <button
                onClick={() => onSelectTab('events')}
                className="text-xs font-semibold text-[#731326] dark:text-amber-400 hover:underline flex items-center gap-0.5"
              >
                <span>View Event Calendar</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {upcomingEvents.map(event => (
                <div
                  key={event.id}
                  className="rounded-2xl bg-white dark:bg-[#1a0f12] border border-stone-200 dark:border-stone-800 overflow-hidden shadow-sm flex flex-col justify-between"
                >
                  <div className="relative h-36">
                    <img
                      src={event.bannerUrl}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <span className="absolute top-3 left-3 px-2 py-0.5 rounded text-[10px] font-bold bg-[#731326] text-amber-100 uppercase tracking-wider">
                      {event.category}
                    </span>
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <div className="text-[11px] text-amber-300 font-medium flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{event.date} • {event.time}</span>
                      </div>
                      <h4 className="text-sm font-bold truncate">
                        {language === 'bn' && event.titleBn ? event.titleBn : event.title}
                      </h4>
                    </div>
                  </div>

                  <div className="p-4 space-y-3 flex-1 flex flex-col justify-between text-xs">
                    <p className="text-stone-600 dark:text-stone-300 line-clamp-2 leading-relaxed">
                      {event.description}
                    </p>

                    <div className="pt-2 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
                      <span className="text-[11px] text-stone-500 dark:text-stone-400 font-medium">
                        {event.registeredCount} / {event.goalAttendees} Attending
                      </span>
                      <button
                        onClick={() => onSelectTab('events')}
                        className="px-3 py-1.5 rounded-lg bg-[#731326] hover:bg-[#800020] text-white font-semibold text-xs transition-colors"
                      >
                        Register / RSVP
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Col 3: Sidebar with Buddhist Calendar & Active Donation Campaign */}
        <div className="space-y-6">
          
          {/* Active Fundraising Campaign Widget */}
          <div className="p-5 rounded-3xl bg-gradient-to-b from-amber-50 to-orange-50/40 dark:from-[#241318] dark:to-[#170a0e] border-2 border-amber-300/80 dark:border-amber-800/60 shadow-md space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#731326] text-amber-200">
                Active Dana Campaign
              </span>
              <span className="text-[10px] text-stone-500 font-mono">
                Deadline: {activeCampaign.deadline}
              </span>
            </div>

            <div>
              <h3 className="font-serif font-bold text-base text-[#731326] dark:text-amber-300">
                {language === 'bn' && activeCampaign.titleBn ? activeCampaign.titleBn : activeCampaign.title}
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-300 mt-1 line-clamp-3">
                {activeCampaign.description}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#731326] dark:text-amber-300">
                  ৳ {activeCampaign.raisedAmount.toLocaleString()} Raised
                </span>
                <span className="text-stone-500 font-mono">
                  Goal: ৳ {activeCampaign.goalAmount.toLocaleString()}
                </span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-stone-200 dark:bg-stone-800 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#731326] via-amber-600 to-[#d4af37] rounded-full transition-all"
                  style={{ width: `${Math.min(100, Math.round((activeCampaign.raisedAmount / activeCampaign.goalAmount) * 100))}%` }}
                />
              </div>
              <div className="text-[10px] text-stone-500 flex justify-between">
                <span>{Math.round((activeCampaign.raisedAmount / activeCampaign.goalAmount) * 100)}% Funded</span>
                <span>{activeCampaign.donorsCount} Donors</span>
              </div>
            </div>

            <button
              onClick={() => onSelectTab('donations')}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#731326] to-[#540d1a] hover:from-[#800020] text-white text-xs font-bold shadow transition-all flex items-center justify-center gap-2"
            >
              <Heart className="w-4 h-4 text-rose-400" />
              <span>Contribute Dana & Get Instant Receipt</span>
            </button>
          </div>

          {/* Buddhist Calendar & Upcoming Purnima Widget */}
          <div className="p-5 rounded-3xl bg-white dark:bg-[#1a0f12] border border-stone-200 dark:border-stone-800 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-stone-100 dark:border-stone-800">
              <Compass className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <h4 className="font-serif font-bold text-sm text-[#731326] dark:text-amber-300">
                {language === 'en' ? 'Sacred Buddhist Calendar (2570 B.E.)' : 'বৌদ্ধ বর্ষপঞ্জি ও তিথি'}
              </h4>
            </div>

            <div className="space-y-3">
              {BUDDHIST_HOLIDAYS_2026.slice(0, 3).map((holiday, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200/50 dark:border-amber-900/40 text-xs">
                  <div className="flex items-center justify-between font-bold text-[#731326] dark:text-amber-300">
                    <span>{holiday.name}</span>
                    <span className="text-[10px] text-amber-800 dark:text-amber-400 font-mono font-normal">
                      {holiday.dateStr}
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-600 dark:text-stone-400 mt-1 leading-relaxed">
                    {holiday.significance}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-2 text-center">
              <button
                onClick={() => onSelectTab('events')}
                className="text-[11px] font-semibold text-[#731326] dark:text-amber-400 hover:underline"
              >
                View Full Festival Ceremonial Calendar →
              </button>
            </div>
          </div>

          {/* Merit Scholarship Spotlight */}
          <div className="p-5 rounded-3xl bg-gradient-to-br from-[#731326] to-[#400712] text-white shadow-md space-y-3">
            <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider">
              <Award className="w-4 h-4" />
              <span>BSWA Merit Scholarship Program</span>
            </div>
            <h4 className="font-serif font-bold text-base text-amber-100">
              Supporting Deserving DUET Engineers
            </h4>
            <p className="text-xs text-amber-100/80 leading-relaxed">
              Stipends of BDT 15,000 - 25,000 awarded based on academic distinction (CGPA 3.25+) and hardship verification.
            </p>
            <div className="pt-1 flex gap-2">
              <button
                onClick={() => onSelectTab('scholarship')}
                className="flex-1 py-2 px-3 rounded-xl bg-[#d4af37] text-[#3a0610] font-bold text-xs hover:bg-amber-300 transition-colors text-center"
              >
                Apply Online
              </button>
              <button
                onClick={() => onSelectTab('scholarship')}
                className="py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-colors"
              >
                Recipients List
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
