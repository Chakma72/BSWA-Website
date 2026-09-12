import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Shield, Award, Users, Mail, Phone, BookOpen, Quote } from 'lucide-react';
import { Leader } from '../types';

export const LeadershipView: React.FC = () => {
  const { leaders, language } = useApp();
  const [activeTab, setActiveTab] = useState<'current' | 'past' | 'advisors'>('current');

  const currentLeaders = leaders.filter(l => l.type === 'current');
  const pastLeaders = leaders.filter(l => l.type === 'past');
  const advisors = leaders.filter(l => l.type === 'advisor');

  const president = currentLeaders.find(l => l.role === 'President');
  const generalSecretary = currentLeaders.find(l => l.role === 'General Secretary');

  return (
    <div className="space-y-8 pb-16">
      
      {/* Page Header */}
      <div className="rounded-3xl bg-gradient-to-r from-[#6b1426] via-[#540d1a] to-[#36050e] text-white p-6 sm:p-10 shadow-lg border border-[#d4af37]/30 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-200 text-xs font-semibold">
            <Shield className="w-3.5 h-3.5" />
            <span>Governance & Historical Leadership Archive</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-4xl font-bold text-amber-100">
            BSWA DUET Leadership & Advisory
          </h1>
          <p className="text-xs sm:text-sm text-amber-100/80 max-w-xl">
            Honoring the elected Executive Committee, revered Buddhist faculty advisors, and past Presidents and General Secretaries who laid our foundations since 1986.
          </p>
        </div>

        <div className="flex gap-2 flex-shrink-0">
          {[
            { id: 'current', label: 'Current Executive Board' },
            { id: 'past', label: 'Past Leadership Archive' },
            { id: 'advisors', label: 'Advisors & Patrons' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-[#d4af37] text-[#3a0610] font-bold shadow-md'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* TAB 1: CURRENT EXECUTIVE BOARD */}
      {activeTab === 'current' && (
        <div className="space-y-8 animate-in fade-in duration-150">
          
          {/* Key Executive Speeches (President & General Secretary) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {president && (
              <div className="p-6 rounded-3xl bg-white dark:bg-[#1a0f12] border-2 border-[#d4af37]/50 shadow-md space-y-4">
                <div className="flex items-center gap-4">
                  <img
                    src={president.photoUrl}
                    alt={president.name}
                    className="w-20 h-24 object-cover rounded-2xl border-2 border-[#731326] shadow-sm flex-shrink-0"
                  />
                  <div>
                    <span className="text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full bg-[#731326] text-white">
                      President (2025 - 2026)
                    </span>
                    <h3 className="font-serif font-bold text-base text-[#731326] dark:text-amber-300 mt-1">
                      {president.name}
                    </h3>
                    <p className="text-xs text-stone-600 dark:text-stone-400">
                      {president.department}
                    </p>
                  </div>
                </div>

                <div className="relative p-4 rounded-2xl bg-amber-50/50 dark:bg-stone-900/50 border border-stone-200 dark:border-stone-800 text-xs text-stone-700 dark:text-stone-300 leading-relaxed italic">
                  <Quote className="w-5 h-5 text-amber-500/40 absolute top-2 right-2" />
                  "{language === 'bn' && president.messageBn ? president.messageBn : president.message}"
                </div>
              </div>
            )}

            {generalSecretary && (
              <div className="p-6 rounded-3xl bg-white dark:bg-[#1a0f12] border-2 border-[#d4af37]/50 shadow-md space-y-4">
                <div className="flex items-center gap-4">
                  <img
                    src={generalSecretary.photoUrl}
                    alt={generalSecretary.name}
                    className="w-20 h-24 object-cover rounded-2xl border-2 border-amber-600 shadow-sm flex-shrink-0"
                  />
                  <div>
                    <span className="text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full bg-amber-600 text-white">
                      General Secretary (2025 - 2026)
                    </span>
                    <h3 className="font-serif font-bold text-base text-[#731326] dark:text-amber-300 mt-1">
                      {generalSecretary.name}
                    </h3>
                    <p className="text-xs text-stone-600 dark:text-stone-400">
                      {generalSecretary.department}
                    </p>
                  </div>
                </div>

                <div className="relative p-4 rounded-2xl bg-amber-50/50 dark:bg-stone-900/50 border border-stone-200 dark:border-stone-800 text-xs text-stone-700 dark:text-stone-300 leading-relaxed italic">
                  <Quote className="w-5 h-5 text-amber-500/40 absolute top-2 right-2" />
                  "{language === 'bn' && generalSecretary.messageBn ? generalSecretary.messageBn : generalSecretary.message}"
                </div>
              </div>
            )}
          </div>

          {/* Complete Board Members Grid */}
          <div className="space-y-4">
            <h3 className="font-serif font-bold text-lg text-[#731326] dark:text-amber-300">
              Executive Committee Officers (Term 2025 - 2026)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {currentLeaders.map(l => (
                <div
                  key={l.id}
                  className="p-4 rounded-2xl bg-white dark:bg-[#1a0f12] border border-stone-200 dark:border-stone-800 shadow-sm text-center space-y-2"
                >
                  <img
                    src={l.photoUrl}
                    alt={l.name}
                    className="w-20 h-20 rounded-full object-cover mx-auto border-2 border-[#731326]"
                  />
                  <div>
                    <h4 className="font-bold text-xs text-stone-900 dark:text-stone-100">{l.name}</h4>
                    <p className="text-[11px] font-semibold text-[#731326] dark:text-amber-400">{l.role}</p>
                    <p className="text-[10px] text-stone-500">{l.department}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PAST LEADERSHIP ARCHIVE */}
      {activeTab === 'past' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          <div className="border-b border-stone-200 dark:border-stone-800 pb-3">
            <h3 className="font-serif font-bold text-lg text-[#731326] dark:text-amber-300">
              Past Presidents & General Secretaries Roll of Honor
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Honoring former leaders who dedicated their tenure to advancing BSWA DUET.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {pastLeaders.map(p => (
              <div
                key={p.id}
                className="p-5 rounded-3xl bg-white dark:bg-[#1a0f12] border border-stone-200 dark:border-stone-800 shadow-sm flex items-center gap-4"
              >
                <img
                  src={p.photoUrl}
                  alt={p.name}
                  className="w-16 h-20 rounded-xl object-cover border border-stone-300 flex-shrink-0"
                />
                <div className="space-y-1 text-xs">
                  <span className="font-mono text-[10px] font-bold text-[#800020] dark:text-amber-400">
                    Tenure: {p.term}
                  </span>
                  <h4 className="font-bold text-sm text-stone-900 dark:text-stone-100">{p.name}</h4>
                  <p className="font-semibold text-stone-700 dark:text-stone-300">{p.role}</p>
                  <p className="text-[11px] text-stone-500">{p.department}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: ADVISORS & CHIEF PATRONS */}
      {activeTab === 'advisors' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          <div className="border-b border-stone-200 dark:border-stone-800 pb-3">
            <h3 className="font-serif font-bold text-lg text-[#731326] dark:text-amber-300">
              Revered Advisors & Chief Patrons
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Distinguished professors, Bhikkhu Sangha, and senior engineering mentors guiding BSWA DUET.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {advisors.map(adv => (
              <div
                key={adv.id}
                className="p-6 rounded-3xl bg-white dark:bg-[#1a0f12] border-2 border-amber-300/60 dark:border-amber-800/60 shadow-md flex flex-col sm:flex-row items-center sm:items-start gap-5"
              >
                <img
                  src={adv.photoUrl}
                  alt={adv.name}
                  className="w-24 h-28 rounded-2xl object-cover border-2 border-[#731326] shadow-sm flex-shrink-0"
                />
                <div className="space-y-2 text-xs flex-1 text-center sm:text-left">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-[#731326] dark:text-amber-300">
                    {adv.role}
                  </span>
                  <h4 className="font-serif font-bold text-base text-[#731326] dark:text-amber-300 mt-1">
                    {adv.name}
                  </h4>
                  <p className="font-semibold text-stone-700 dark:text-stone-300">{adv.department}</p>
                  <p className="text-stone-600 dark:text-stone-400 leading-relaxed italic">
                    "{adv.message}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
