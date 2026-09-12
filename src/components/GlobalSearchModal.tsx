import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Search, X, Users, GraduationCap, Award, HeartHandshake, Calendar, Bell, Shield } from 'lucide-react';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateTab: (tab: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onNavigateTab,
}) => {
  const {
    users,
    scholarshipRecipients,
    scholarshipDonors,
    events,
    notices,
    leaders,
  } = useApp();

  const [query, setQuery] = useState('');

  const searchResults = useMemo(() => {
    if (!query.trim()) return null;
    const q = query.toLowerCase();

    // 1. Members
    const matchedMembers = users.filter(u =>
      u.fullName.toLowerCase().includes(q) ||
      (u.duetId && u.duetId.toLowerCase().includes(q)) ||
      (u.department && u.department.toLowerCase().includes(q)) ||
      (u.email && u.email.toLowerCase().includes(q))
    );

    // 2. Scholarship Recipients
    const matchedRecipients = scholarshipRecipients.filter(r =>
      r.name.toLowerCase().includes(q) ||
      r.department.toLowerCase().includes(q) ||
      r.scholarshipType.toLowerCase().includes(q) ||
      r.year.toString().includes(q)
    );

    // 3. Donors
    const matchedDonors = scholarshipDonors.filter(d =>
      d.donorName.toLowerCase().includes(q) ||
      (d.profession && d.profession.toLowerCase().includes(q)) ||
      d.tier.toLowerCase().includes(q)
    );

    // 4. Events
    const matchedEvents = events.filter(e =>
      e.title.toLowerCase().includes(q) ||
      (e.titleBn && e.titleBn.toLowerCase().includes(q)) ||
      e.location.toLowerCase().includes(q) ||
      e.description.toLowerCase().includes(q)
    );

    // 5. Notices
    const matchedNotices = notices.filter(n =>
      n.title.toLowerCase().includes(q) ||
      (n.titleBn && n.titleBn.toLowerCase().includes(q)) ||
      n.content.toLowerCase().includes(q)
    );

    // 6. Leaders
    const matchedLeaders = leaders.filter(l =>
      l.name.toLowerCase().includes(q) ||
      l.role.toLowerCase().includes(q) ||
      l.term.toLowerCase().includes(q)
    );

    const totalCount =
      matchedMembers.length +
      matchedRecipients.length +
      matchedDonors.length +
      matchedEvents.length +
      matchedNotices.length +
      matchedLeaders.length;

    return {
      members: matchedMembers,
      recipients: matchedRecipients,
      donors: matchedDonors,
      events: matchedEvents,
      notices: matchedNotices,
      leaders: matchedLeaders,
      totalCount,
    };
  }, [query, users, scholarshipRecipients, scholarshipDonors, events, notices, leaders]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#1a0f12] rounded-2xl shadow-2xl border border-amber-900/20 dark:border-amber-700/30 overflow-hidden">
        
        {/* Search Bar Input */}
        <div className="p-4 border-b border-stone-200 dark:border-stone-800 flex items-center gap-3 bg-stone-50 dark:bg-[#150a0d]">
          <Search className="w-5 h-5 text-[#731326] dark:text-amber-400" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search DUET students, alumni, scholarships, donors, events, notices..."
            className="flex-1 bg-transparent text-sm text-stone-900 dark:text-stone-100 placeholder-stone-400 outline-none font-medium"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 text-xs px-2 py-1"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 rounded-full text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="max-h-[70vh] overflow-y-auto p-4 space-y-5">
          {!query.trim() ? (
            <div className="text-center py-12 text-stone-400">
              <Search className="w-8 h-8 mx-auto mb-2 opacity-30 text-[#731326]" />
              <p className="text-xs">Type anything to search across the entire BSWA DUET registry</p>
              <div className="mt-4 flex flex-wrap justify-center gap-2 text-[11px]">
                {['Buddha Purnima', 'Scholarship', 'CSE', '19th Batch', 'Amitava', 'Donor', 'Sanghadana'].map(tag => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-2.5 py-1 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-amber-100 dark:hover:bg-amber-950/40 hover:text-[#731326] transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : searchResults && searchResults.totalCount === 0 ? (
            <div className="text-center py-12 text-stone-500">
              <p className="text-sm font-semibold">No records found for "{query}"</p>
              <p className="text-xs text-stone-400 mt-1">Try searching by department name, batch, or event keywords.</p>
            </div>
          ) : (
            searchResults && (
              <div className="space-y-4 text-xs">
                {/* 1. Members / Alumni */}
                {searchResults.members.length > 0 && (
                  <div>
                    <div className="flex items-center gap-1.5 font-bold text-[#731326] dark:text-amber-400 mb-2 uppercase text-[10px] tracking-wider">
                      <Users className="w-3.5 h-3.5" />
                      <span>Members & Alumni ({searchResults.members.length})</span>
                    </div>
                    <div className="space-y-1.5">
                      {searchResults.members.map(u => (
                        <div
                          key={u.id}
                          onClick={() => {
                            onNavigateTab(u.userType === 'alumni' ? 'alumni' : 'members');
                            onClose();
                          }}
                          className="p-2.5 rounded-xl border border-stone-200 dark:border-stone-800 hover:border-amber-400 dark:hover:border-amber-600 bg-stone-50/50 dark:bg-stone-900/40 cursor-pointer flex items-center justify-between transition-colors"
                        >
                          <div>
                            <span className="font-semibold text-stone-800 dark:text-stone-100">{u.fullName}</span>
                            <span className="text-stone-500 dark:text-stone-400 ml-2">
                              {u.duetId ? `DUET ID: ${u.duetId}` : ''} • {u.department}
                            </span>
                          </div>
                          <span className="px-2 py-0.5 rounded text-[10px] bg-amber-100 dark:bg-amber-950 text-[#731326] dark:text-amber-300 capitalize font-medium">
                            {u.userType}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 2. Scholarship Recipients */}
                {searchResults.recipients.length > 0 && (
                  <div>
                    <div className="flex items-center gap-1.5 font-bold text-[#731326] dark:text-amber-400 mb-2 uppercase text-[10px] tracking-wider">
                      <Award className="w-3.5 h-3.5" />
                      <span>Scholarship Recipients ({searchResults.recipients.length})</span>
                    </div>
                    <div className="space-y-1.5">
                      {searchResults.recipients.map(r => (
                        <div
                          key={r.id}
                          onClick={() => {
                            onNavigateTab('scholarship');
                            onClose();
                          }}
                          className="p-2.5 rounded-xl border border-stone-200 dark:border-stone-800 hover:border-amber-400 bg-stone-50/50 dark:bg-stone-900/40 cursor-pointer flex items-center justify-between"
                        >
                          <div>
                            <span className="font-semibold text-stone-800 dark:text-stone-100">{r.name}</span>
                            <span className="text-stone-500 dark:text-stone-400 ml-2">
                              {r.department} • {r.batch} • {r.year}
                            </span>
                          </div>
                          <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-medium">
                            {r.scholarshipType}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. Donors */}
                {searchResults.donors.length > 0 && (
                  <div>
                    <div className="flex items-center gap-1.5 font-bold text-[#731326] dark:text-amber-400 mb-2 uppercase text-[10px] tracking-wider">
                      <HeartHandshake className="w-3.5 h-3.5" />
                      <span>Scholarship Donors ({searchResults.donors.length})</span>
                    </div>
                    <div className="space-y-1.5">
                      {searchResults.donors.map(d => (
                        <div
                          key={d.id}
                          onClick={() => {
                            onNavigateTab('scholarship');
                            onClose();
                          }}
                          className="p-2.5 rounded-xl border border-stone-200 dark:border-stone-800 hover:border-amber-400 bg-stone-50/50 dark:bg-stone-900/40 cursor-pointer flex items-center justify-between"
                        >
                          <div>
                            <span className="font-semibold text-stone-800 dark:text-stone-100">{d.donorName}</span>
                            <span className="text-stone-500 dark:text-stone-400 ml-2">{d.profession}</span>
                          </div>
                          <span className="px-2 py-0.5 rounded text-[10px] bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 font-medium">
                            {d.tier} Donor
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 4. Events */}
                {searchResults.events.length > 0 && (
                  <div>
                    <div className="flex items-center gap-1.5 font-bold text-[#731326] dark:text-amber-400 mb-2 uppercase text-[10px] tracking-wider">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Events & Ceremonies ({searchResults.events.length})</span>
                    </div>
                    <div className="space-y-1.5">
                      {searchResults.events.map(e => (
                        <div
                          key={e.id}
                          onClick={() => {
                            onNavigateTab('events');
                            onClose();
                          }}
                          className="p-2.5 rounded-xl border border-stone-200 dark:border-stone-800 hover:border-amber-400 bg-stone-50/50 dark:bg-stone-900/40 cursor-pointer flex items-center justify-between"
                        >
                          <div>
                            <span className="font-semibold text-stone-800 dark:text-stone-100">{e.title}</span>
                            <span className="text-stone-500 dark:text-stone-400 ml-2">{e.date} • {e.location}</span>
                          </div>
                          <span className="px-2 py-0.5 rounded text-[10px] bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-200 capitalize">
                            {e.category}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 5. Notices */}
                {searchResults.notices.length > 0 && (
                  <div>
                    <div className="flex items-center gap-1.5 font-bold text-[#731326] dark:text-amber-400 mb-2 uppercase text-[10px] tracking-wider">
                      <Bell className="w-3.5 h-3.5" />
                      <span>Official Notices ({searchResults.notices.length})</span>
                    </div>
                    <div className="space-y-1.5">
                      {searchResults.notices.map(n => (
                        <div
                          key={n.id}
                          onClick={() => {
                            onNavigateTab('notices');
                            onClose();
                          }}
                          className="p-2.5 rounded-xl border border-stone-200 dark:border-stone-800 hover:border-amber-400 bg-stone-50/50 dark:bg-stone-900/40 cursor-pointer flex items-center justify-between"
                        >
                          <div>
                            <span className="font-semibold text-stone-800 dark:text-stone-100">{n.title}</span>
                            <span className="text-stone-500 dark:text-stone-400 ml-2">{n.date}</span>
                          </div>
                          <span className="px-2 py-0.5 rounded text-[10px] bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                            {n.category}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 6. Leadership */}
                {searchResults.leaders.length > 0 && (
                  <div>
                    <div className="flex items-center gap-1.5 font-bold text-[#731326] dark:text-amber-400 mb-2 uppercase text-[10px] tracking-wider">
                      <Shield className="w-3.5 h-3.5" />
                      <span>Leaders & Committee ({searchResults.leaders.length})</span>
                    </div>
                    <div className="space-y-1.5">
                      {searchResults.leaders.map(l => (
                        <div
                          key={l.id}
                          onClick={() => {
                            onNavigateTab('leadership');
                            onClose();
                          }}
                          className="p-2.5 rounded-xl border border-stone-200 dark:border-stone-800 hover:border-amber-400 bg-stone-50/50 dark:bg-stone-900/40 cursor-pointer flex items-center justify-between"
                        >
                          <div>
                            <span className="font-semibold text-stone-800 dark:text-stone-100">{l.name}</span>
                            <span className="text-stone-500 dark:text-stone-400 ml-2">{l.role} ({l.term})</span>
                          </div>
                          <span className="px-2 py-0.5 rounded text-[10px] bg-red-100 dark:bg-red-950 text-red-900 dark:text-red-300 font-medium">
                            {l.type === 'current' ? 'Current Board' : 'Former Leader'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};
