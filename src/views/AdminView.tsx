import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldCheck,
  Users,
  Award,
  Bell,
  Scale,
  Calendar,
  Activity,
  CheckCircle,
  XCircle,
  UserCheck,
  Trash2,
  PlusCircle,
  Search,
  Download,
  AlertTriangle
} from 'lucide-react';
import { UserRole, User, EventItem, Notice } from '../types';

export const AdminView: React.FC = () => {
  const {
    users,
    activeRole,
    currentUser,
    events,
    notices,
    financeRecords,
    scholarshipApplications,
    updateScholarshipStatus,
    addNotice,
    deleteNotice,
    addEvent,
    deleteEvent,
    auditLogs
  } = useApp();

  const [adminTab, setAdminTab] = useState<'users' | 'scholarships' | 'events' | 'notices' | 'logs'>('users');
  const [userSearch, setUserSearch] = useState('');

  // Local state for adding an event
  const [showEventModal, setShowEventModal] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventCategory, setNewEventCategory] = useState<any>('buddha_purnima');
  const [newEventDate, setNewEventDate] = useState('2026-05-30');
  const [newEventTime, setNewEventTime] = useState('09:00 AM');
  const [newEventLocation, setNewEventLocation] = useState('DUET Campus Auditorium');
  const [newEventDesc, setNewEventDesc] = useState('');

  // Local state for user updates
  const [localUsers, setLocalUsers] = useState<User[]>(users);

  const handleRoleChange = (userId: string, newRole: UserRole) => {
    setLocalUsers(prev =>
      prev.map(u => (u.id === userId ? { ...u, role: newRole } : u))
    );
  };

  const handleVerificationToggle = (userId: string) => {
    setLocalUsers(prev =>
      prev.map(u => (u.id === userId ? { ...u, isVerified: !u.isVerified } : u))
    );
  };

  const handleDeleteUser = (userId: string) => {
    if (confirm('Are you sure you want to remove this user from the directory?')) {
      setLocalUsers(prev => prev.filter(u => u.id !== userId));
    }
  };

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEventTitle) return;

    addEvent({
      title: newEventTitle,
      category: newEventCategory,
      date: newEventDate,
      time: newEventTime,
      location: newEventLocation,
      description: newEventDesc || 'Official program organized by BSWA DUET.',
      bannerUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
      registeredCount: 0,
      goalAttendees: 150,
      status: 'upcoming'
    });

    setShowEventModal(false);
    setNewEventTitle('');
    setNewEventDesc('');
  };

  const filteredUsers = localUsers.filter(u =>
    !userSearch.trim() ||
    u.fullName.toLowerCase().includes(userSearch.toLowerCase()) ||
    (u.duetId && u.duetId.toLowerCase().includes(userSearch.toLowerCase())) ||
    u.email.toLowerCase().includes(userSearch.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-16">
      
      {/* Admin Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-[#500c19] via-[#36050e] to-[#1f0208] text-white p-6 sm:p-10 shadow-xl border-2 border-[#d4af37]/60 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-200 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
            <span>Master Administration Console</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-4xl font-bold text-amber-100">
            BSWA Executive Control Center
          </h1>
          <p className="text-xs sm:text-sm text-amber-100/80 max-w-xl">
            Logged in as <strong className="text-amber-300">{currentUser?.fullName || 'Super Admin'}</strong> ({activeRole.toUpperCase()}). Overseeing member verifications, scholarships, financial ledgers, and events.
          </p>
        </div>

        {/* Quick Stats Capsule */}
        <div className="flex gap-3 text-center text-xs">
          <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
            <div className="font-bold text-lg text-amber-300">{localUsers.length}</div>
            <div className="text-[10px] text-stone-300">Registered Users</div>
          </div>
          <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
            <div className="font-bold text-lg text-amber-300">{scholarshipApplications.length}</div>
            <div className="text-[10px] text-stone-300">Applications</div>
          </div>
          <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
            <div className="font-bold text-lg text-amber-300">{events.length}</div>
            <div className="text-[10px] text-stone-300">Total Events</div>
          </div>
        </div>
      </div>

      {/* Admin Module Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-stone-200 dark:border-stone-800 pb-3">
        {[
          { id: 'users', label: `User Management (${localUsers.length})`, icon: Users },
          { id: 'scholarships', label: `Scholarship Reviews (${scholarshipApplications.length})`, icon: Award },
          { id: 'events', label: `Event Manager (${events.length})`, icon: Calendar },
          { id: 'notices', label: `Notice Desk (${notices.length})`, icon: Bell },
          { id: 'logs', label: `System & Audit Logs (${auditLogs.length})`, icon: Activity },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = adminTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setAdminTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
                isActive
                  ? 'bg-[#731326] text-white shadow-md'
                  : 'bg-white dark:bg-[#1a0f12] border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:border-amber-400'
              }`}
            >
              <Icon className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* SUB-MODULE 1: USER MANAGEMENT */}
      {adminTab === 'users' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-2xl bg-white dark:bg-[#1a0f12] border border-stone-200 dark:border-stone-800 shadow-sm">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-stone-400" />
              <input
                type="text"
                value={userSearch}
                onChange={e => setUserSearch(e.target.value)}
                placeholder="Search user by name, DUET ID, or email..."
                className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900"
              />
            </div>
            <div className="text-xs text-stone-500 flex-shrink-0">
              Showing <strong>{filteredUsers.length}</strong> active records
            </div>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1a0f12] shadow-sm">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-stone-100 dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-300">
                  <th className="p-3.5 font-bold">Member Name</th>
                  <th className="p-3.5 font-bold">DUET ID / Dept</th>
                  <th className="p-3.5 font-bold">User Type</th>
                  <th className="p-3.5 font-bold">Assigned Role (RBAC)</th>
                  <th className="p-3.5 font-bold">Verification</th>
                  <th className="p-3.5 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
                {filteredUsers.map(user => (
                  <tr key={user.id} className="hover:bg-amber-50/40 dark:hover:bg-amber-950/20 transition-colors">
                    <td className="p-3.5">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={user.photoUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
                          alt={user.fullName}
                          className="w-8 h-8 rounded-full object-cover border border-[#731326]"
                        />
                        <div>
                          <span className="font-bold text-stone-900 dark:text-stone-100 block">{user.fullName}</span>
                          <span className="text-[10px] text-stone-400">{user.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-3.5">
                      <div className="font-mono text-stone-800 dark:text-stone-200 font-bold">{user.duetId || 'Alumni/Guest'}</div>
                      <div className="text-[10px] text-stone-500">{user.department}</div>
                    </td>
                    <td className="p-3.5 capitalize font-medium text-stone-700 dark:text-stone-300">
                      {user.userType}
                    </td>
                    <td className="p-3.5">
                      <select
                        value={user.role}
                        onChange={e => handleRoleChange(user.id, e.target.value as UserRole)}
                        className="p-1.5 rounded-lg text-xs font-semibold border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 text-[#731326] dark:text-amber-300"
                      >
                        <option value="admin">Super Admin</option>
                        <option value="executive">Executive Committee</option>
                        <option value="student">Running Student</option>
                        <option value="alumni">Alumni</option>
                        <option value="guest">Guest</option>
                      </select>
                    </td>
                    <td className="p-3.5">
                      <button
                        onClick={() => handleVerificationToggle(user.id)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 transition-colors ${
                          user.isVerified
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                            : 'bg-stone-200 text-stone-600 dark:bg-stone-800 dark:text-stone-400'
                        }`}
                      >
                        {user.isVerified ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                        <span>{user.isVerified ? 'Verified' : 'Unverified'}</span>
                      </button>
                    </td>
                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                        title="Remove member record"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUB-MODULE 2: SCHOLARSHIPS REVIEW */}
      {adminTab === 'scholarships' && (
        <div className="space-y-4 animate-in fade-in duration-150">
          <div className="flex items-center justify-between">
            <h3 className="font-serif font-bold text-base text-[#731326] dark:text-amber-300">
              Pending & Processed Scholarship Applications
            </h3>
            <span className="text-xs text-stone-500">
              {scholarshipApplications.filter(a => a.status === 'pending').length} Pending Decisions
            </span>
          </div>

          <div className="space-y-4">
            {scholarshipApplications.map(app => (
              <div
                key={app.id}
                className="p-5 rounded-2xl bg-white dark:bg-[#1a0f12] border border-stone-200 dark:border-stone-800 shadow-sm space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 dark:border-stone-800 pb-2.5">
                  <div>
                    <h4 className="font-bold text-sm text-stone-900 dark:text-stone-100">
                      {app.applicantName} (DUET ID: {app.duetId})
                    </h4>
                    <p className="text-xs text-stone-500">
                      {app.department} • {app.semester} • Applied on {app.appliedAt}
                    </p>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                    app.status === 'approved'
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950'
                      : app.status === 'rejected'
                      ? 'bg-rose-100 text-rose-800 dark:bg-rose-950'
                      : 'bg-amber-100 text-amber-800 dark:bg-amber-950'
                  }`}>
                    {app.status.toUpperCase()}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div>
                    <span className="text-stone-400 block text-[10px]">CGPA</span>
                    <span className="font-bold text-emerald-700 dark:text-emerald-400">{app.cgpa.toFixed(2)}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px]">Monthly Family Income</span>
                    <span className="font-bold">৳ {app.familyMonthlyIncome.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px]">Scholarship Category</span>
                    <span className="font-bold text-[#731326] dark:text-amber-300">{app.scholarshipType}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px]">Documentation</span>
                    <span className="text-emerald-600 font-semibold">✓ Marksheet & ID Verified</span>
                  </div>
                </div>

                <p className="text-xs text-stone-600 dark:text-stone-300 italic p-3 rounded-xl bg-stone-50 dark:bg-stone-900">
                  "{app.reasonForApplying}"
                </p>

                {app.status === 'pending' && (
                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={() => updateScholarshipStatus(app.id, 'approved', 20000)}
                      className="flex-1 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs"
                    >
                      Approve & Grant BDT 20,000
                    </button>
                    <button
                      onClick={() => updateScholarshipStatus(app.id, 'rejected')}
                      className="py-2 px-4 rounded-xl bg-rose-700 hover:bg-rose-800 text-white font-bold text-xs"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-MODULE 3: EVENT MANAGEMENT */}
      {adminTab === 'events' && (
        <div className="space-y-4 animate-in fade-in duration-150">
          <div className="flex items-center justify-between">
            <h3 className="font-serif font-bold text-base text-[#731326] dark:text-amber-300">
              Manage Events & Ceremonies
            </h3>
            <button
              onClick={() => setShowEventModal(true)}
              className="px-4 py-2 rounded-xl bg-[#731326] hover:bg-[#800020] text-white text-xs font-bold flex items-center gap-1.5"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Create New Event</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {events.map(event => (
              <div
                key={event.id}
                className="p-4 rounded-2xl bg-white dark:bg-[#1a0f12] border border-stone-200 dark:border-stone-800 shadow-sm flex items-start justify-between gap-4"
              >
                <div className="space-y-1 text-xs">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200">
                    {event.category}
                  </span>
                  <h4 className="font-bold text-sm text-stone-900 dark:text-stone-100">{event.title}</h4>
                  <p className="text-stone-500">{event.date} • {event.location}</p>
                  <p className="text-stone-600 dark:text-stone-400 line-clamp-2 mt-1">{event.description}</p>
                  <div className="text-[10px] font-semibold text-emerald-600 pt-1">
                    {event.registeredCount} attendees registered
                  </div>
                </div>

                <button
                  onClick={() => deleteEvent(event.id)}
                  className="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50"
                  title="Delete event"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* New Event Modal */}
          {showEventModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
              <form
                onSubmit={handleCreateEvent}
                className="w-full max-w-md bg-white dark:bg-[#1a0f12] rounded-3xl p-6 border-2 border-[#731326] shadow-2xl space-y-3 text-xs"
              >
                <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-2">
                  <h4 className="font-bold text-sm text-[#731326] dark:text-amber-300">Create Event</h4>
                  <button type="button" onClick={() => setShowEventModal(false)}>✕</button>
                </div>

                <div>
                  <label className="block font-semibold mb-1">Event Title *</label>
                  <input
                    type="text"
                    required
                    value={newEventTitle}
                    onChange={e => setNewEventTitle(e.target.value)}
                    className="w-full p-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-semibold mb-1">Category</label>
                    <select
                      value={newEventCategory}
                      onChange={e => setNewEventCategory(e.target.value)}
                      className="w-full p-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900"
                    >
                      <option value="buddha_purnima">Buddha Purnima</option>
                      <option value="sanghadana">Sanghadana</option>
                      <option value="kathina_chibar_dana">Kathina Chibar Dana</option>
                      <option value="fresher_reception">Fresher Reception</option>
                      <option value="farewell">Farewell</option>
                      <option value="blood_donation">Blood Donation</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold mb-1">Date</label>
                    <input
                      type="date"
                      value={newEventDate}
                      onChange={e => setNewEventDate(e.target.value)}
                      className="w-full p-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold mb-1">Location</label>
                  <input
                    type="text"
                    value={newEventLocation}
                    onChange={e => setNewEventLocation(e.target.value)}
                    className="w-full p-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">Description</label>
                  <textarea
                    rows={3}
                    value={newEventDesc}
                    onChange={e => setNewEventDesc(e.target.value)}
                    className="w-full p-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900"
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <button type="submit" className="flex-1 py-2 rounded-xl bg-[#731326] text-white font-bold">
                    Save Event
                  </button>
                  <button type="button" onClick={() => setShowEventModal(false)} className="py-2 px-3 rounded-xl border">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}

      {/* SUB-MODULE 4: NOTICE MANAGEMENT */}
      {adminTab === 'notices' && (
        <div className="space-y-4 animate-in fade-in duration-150">
          <h3 className="font-serif font-bold text-base text-[#731326] dark:text-amber-300">
            Official Notices Directory & Administrative Controls
          </h3>

          <div className="space-y-3">
            {notices.map(notice => (
              <div
                key={notice.id}
                className="p-4 rounded-2xl bg-white dark:bg-[#1a0f12] border border-stone-200 dark:border-stone-800 shadow-sm flex items-start justify-between gap-4 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    {notice.pinned && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-800">
                        PINNED
                      </span>
                    )}
                    <span className="px-2 py-0.5 rounded text-[10px] bg-amber-100 text-amber-900 font-semibold">
                      {notice.category}
                    </span>
                    <span className="text-stone-400 font-mono">{notice.date}</span>
                  </div>
                  <h4 className="font-bold text-sm text-stone-900 dark:text-stone-100">{notice.title}</h4>
                  <p className="text-stone-600 dark:text-stone-400 line-clamp-2">{notice.content}</p>
                </div>

                <button
                  onClick={() => deleteNotice(notice.id)}
                  className="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50"
                  title="Delete notice"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-MODULE 5: SYSTEM & AUDIT LOGS */}
      {adminTab === 'logs' && (
        <div className="space-y-4 animate-in fade-in duration-150">
          <div className="flex items-center justify-between">
            <h3 className="font-serif font-bold text-base text-[#731326] dark:text-amber-300 flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-500" />
              <span>Real-Time Audit Trail & Security Logs</span>
            </h3>
            <span className="text-[10px] text-stone-500">Immutable chronological activity logging</span>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1a0f12] shadow-sm">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-stone-100 dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-300">
                  <th className="p-3 font-bold">Timestamp</th>
                  <th className="p-3 font-bold">Actor</th>
                  <th className="p-3 font-bold">Action</th>
                  <th className="p-3 font-bold">Details</th>
                  <th className="p-3 font-bold">IP / Device</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 dark:divide-stone-800 font-mono text-[11px]">
                {auditLogs.map(log => (
                  <tr key={log.id} className="hover:bg-amber-50/40 dark:hover:bg-amber-950/20">
                    <td className="p-3 text-stone-500">{log.timestamp}</td>
                    <td className="p-3 font-bold text-stone-800 dark:text-stone-200">{log.user}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 dark:bg-amber-950 text-[#731326] dark:text-amber-300">
                        {log.action}
                      </span>
                    </td>
                    <td className="p-3 text-stone-600 dark:text-stone-400 font-sans">{log.details}</td>
                    <td className="p-3 text-stone-400">{log.ipAddress || 'DUET Gateway'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
