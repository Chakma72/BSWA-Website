import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import {
  Users,
  Search,
  Filter,
  Briefcase,
  MapPin,
  Mail,
  Phone,
  Award,
  BarChart3,
  UserPlus,
  Building,
  GraduationCap,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { User } from '../types';

interface AlumniViewProps {
  onOpenAuth: (tab: 'login' | 'register', type?: 'student' | 'alumni') => void;
}

export const AlumniView: React.FC<AlumniViewProps> = ({ onOpenAuth }) => {
  const { users, language } = useApp();
  const [activeSubTab, setActiveSubTab] = useState<'directory' | 'distinguished' | 'statistics'>('directory');

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBatch, setSelectedBatch] = useState('all');
  const [selectedDept, setSelectedDept] = useState('all');
  const [selectedProfession, setSelectedProfession] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');

  // Only alumni users
  const alumniList: User[] = useMemo(() => {
    return users.filter(u => u.userType === 'alumni' || u.role === 'alumni');
  }, [users]);

  // Unique batches, depts, professions, locations for filters
  const batches = useMemo(() => {
    const set = new Set<string>();
    alumniList.forEach(a => {
      if (a.graduationBatch) set.add(a.graduationBatch);
    });
    return Array.from(set).sort();
  }, [alumniList]);

  const departments = useMemo(() => {
    const set = new Set<string>();
    alumniList.forEach(a => {
      if (a.department) set.add(a.department);
    });
    return Array.from(set).sort();
  }, [alumniList]);

  const professions = useMemo(() => {
    const set = new Set<string>();
    alumniList.forEach(a => {
      if (a.currentProfession) set.add(a.currentProfession);
    });
    return Array.from(set).sort();
  }, [alumniList]);

  const locations = useMemo(() => {
    const set = new Set<string>();
    alumniList.forEach(a => {
      if (a.currentLocation) set.add(a.currentLocation);
    });
    return Array.from(set).sort();
  }, [alumniList]);

  // Filtered Alumni
  const filteredAlumni = useMemo(() => {
    return alumniList.filter(a => {
      const matchSearch =
        !searchQuery.trim() ||
        a.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (a.company && a.company.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (a.currentProfession && a.currentProfession.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (a.duetId && a.duetId.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchBatch = selectedBatch === 'all' || a.graduationBatch === selectedBatch;
      const matchDept = selectedDept === 'all' || a.department === selectedDept;
      const matchProfession = selectedProfession === 'all' || a.currentProfession === selectedProfession;
      const matchLocation = selectedLocation === 'all' || a.currentLocation === selectedLocation;

      return matchSearch && matchBatch && matchDept && matchProfession && matchLocation;
    });
  }, [alumniList, searchQuery, selectedBatch, selectedDept, selectedProfession, selectedLocation]);

  // Sample Distinguished Alumni
  const distinguishedAlumni = [
    {
      name: 'Dr. Bodhi Prakash Barua',
      batch: '08th Batch',
      dept: 'Mechanical Engineering',
      role: 'Professor & Energy Specialist',
      org: 'DUET / International Solar Energy Council',
      achievement: 'Pioneered renewable thermal research in Bangladesh; established the BSWA Annual Scholarship Fund.',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'
    },
    {
      name: 'Engr. Amitava Tanchangya',
      batch: '14th Batch',
      dept: 'Electrical & Electronic Engineering',
      role: 'Senior Electrical Engineer',
      org: 'Bangladesh Power Development Board (BPDB)',
      achievement: 'Overseeing national grid substation modernization; dedicated monthly contributor to merit scholarships.',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80'
    },
    {
      name: 'Engr. Binoy Bhushan Chakma',
      batch: '10th Batch',
      dept: 'Civil Engineering',
      role: 'Project Director',
      org: 'Roads & Highways Department (RHD)',
      achievement: 'Supervised mega expressway bridge construction; lifetime advisor of BSWA DUET.',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80'
    }
  ];

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-[#6b1426] via-[#540d1a] to-[#36050e] text-white p-6 sm:p-10 shadow-lg border border-[#d4af37]/30 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-200 text-xs font-semibold">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>DUET Buddhist Alumni Global Association</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-4xl font-bold text-amber-100">
            Alumni Network & Directory
          </h1>
          <p className="text-xs sm:text-sm text-amber-100/80 max-w-xl">
            Connecting over 350+ Buddhist engineering graduates of DUET Gazipur worldwide. Mentoring the next generation of engineers and funding welfare initiatives.
          </p>
        </div>

        <button
          onClick={() => onOpenAuth('register', 'alumni')}
          className="px-5 py-3 rounded-2xl bg-[#d4af37] text-[#3a0610] font-bold text-xs hover:bg-amber-300 shadow-lg transition-all flex items-center gap-2 flex-shrink-0"
        >
          <UserPlus className="w-4 h-4" />
          <span>Register as Alumni</span>
        </button>
      </div>

      {/* Main Layout with Sidebar & Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Sidebar Container */}
        <aside className="lg:col-span-1 space-y-4">
          <div className="p-4 rounded-2xl bg-white dark:bg-[#1a0f12] border border-stone-200 dark:border-stone-800 shadow-sm space-y-2">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#731326] dark:text-amber-400 px-2 py-1">
              Alumni Navigation
            </div>

            <button
              onClick={() => setActiveSubTab('directory')}
              className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center justify-between ${
                activeSubTab === 'directory'
                  ? 'bg-amber-100 dark:bg-amber-950/70 text-[#731326] dark:text-amber-200 font-bold'
                  : 'text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800'
              }`}
            >
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[#d4af37]" />
                <span>Alumni Directory</span>
              </div>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-200/50 dark:bg-amber-900/50">
                {alumniList.length}
              </span>
            </button>

            <button
              onClick={() => onOpenAuth('register', 'alumni')}
              className="w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 transition-all flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <UserPlus className="w-4 h-4 text-[#d4af37]" />
                <span>Alumni Registration</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
            </button>

            <button
              onClick={() => setActiveSubTab('distinguished')}
              className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center justify-between ${
                activeSubTab === 'distinguished'
                  ? 'bg-amber-100 dark:bg-amber-950/70 text-[#731326] dark:text-amber-200 font-bold'
                  : 'text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800'
              }`}
            >
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#d4af37]" />
                <span>Distinguished Alumni</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            </button>

            <button
              onClick={() => setActiveSubTab('statistics')}
              className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center justify-between ${
                activeSubTab === 'statistics'
                  ? 'bg-amber-100 dark:bg-amber-950/70 text-[#731326] dark:text-amber-200 font-bold'
                  : 'text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800'
              }`}
            >
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-[#d4af37]" />
                <span>Alumni Statistics</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            </button>
          </div>

          {/* Quick Support Callout */}
          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/40 text-xs space-y-2">
            <h4 className="font-bold text-[#731326] dark:text-amber-300">
              Alumni Mentorship Program
            </h4>
            <p className="text-stone-600 dark:text-stone-400 text-[11px] leading-relaxed">
              Are you interested in offering career counseling, industrial training, or project guidance to current DUET students? Connect with the Executive Board!
            </p>
            <div className="text-[11px] font-mono text-[#731326] dark:text-amber-400 font-bold">
              alumni@bswa-duet.org
            </div>
          </div>
        </aside>

        {/* Content Area */}
        <main className="lg:col-span-3 space-y-6">
          
          {/* TAB 1: DIRECTORY */}
          {activeSubTab === 'directory' && (
            <div className="space-y-6">
              
              {/* Search & Multi-Filters Toolbar */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#1a0f12] border border-stone-200 dark:border-stone-800 shadow-sm space-y-3">
                <div className="relative">
                  <Search className="absolute left-3.5 top-3 w-4 h-4 text-stone-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search by name, company, profession, or DUET ID..."
                    className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 outline-none focus:ring-2 focus:ring-[#731326]"
                  />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                  {/* Filter: Batch */}
                  <div>
                    <label className="block text-[10px] font-semibold text-stone-500 mb-1">Batch</label>
                    <select
                      value={selectedBatch}
                      onChange={e => setSelectedBatch(e.target.value)}
                      className="w-full p-2 text-xs rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 text-stone-800 dark:text-stone-200"
                    >
                      <option value="all">All Batches</option>
                      {batches.map(b => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                  </div>

                  {/* Filter: Department */}
                  <div>
                    <label className="block text-[10px] font-semibold text-stone-500 mb-1">Department</label>
                    <select
                      value={selectedDept}
                      onChange={e => setSelectedDept(e.target.value)}
                      className="w-full p-2 text-xs rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 text-stone-800 dark:text-stone-200 truncate"
                    >
                      <option value="all">All Departments</option>
                      {departments.map(d => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>

                  {/* Filter: Profession */}
                  <div>
                    <label className="block text-[10px] font-semibold text-stone-500 mb-1">Profession</label>
                    <select
                      value={selectedProfession}
                      onChange={e => setSelectedProfession(e.target.value)}
                      className="w-full p-2 text-xs rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 text-stone-800 dark:text-stone-200 truncate"
                    >
                      <option value="all">All Professions</option>
                      {professions.map(p => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                  </div>

                  {/* Filter: Location */}
                  <div>
                    <label className="block text-[10px] font-semibold text-stone-500 mb-1">Location</label>
                    <select
                      value={selectedLocation}
                      onChange={e => setSelectedLocation(e.target.value)}
                      className="w-full p-2 text-xs rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 text-stone-800 dark:text-stone-200"
                    >
                      <option value="all">All Locations</option>
                      {locations.map(l => (
                        <option key={l} value={l}>{l}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-stone-500 pt-1">
                  <span>Showing <strong>{filteredAlumni.length}</strong> alumni profiles</span>
                  {(searchQuery || selectedBatch !== 'all' || selectedDept !== 'all' || selectedProfession !== 'all' || selectedLocation !== 'all') && (
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedBatch('all');
                        setSelectedDept('all');
                        setSelectedProfession('all');
                        setSelectedLocation('all');
                      }}
                      className="text-[#731326] dark:text-amber-400 hover:underline font-semibold"
                    >
                      Reset Filters
                    </button>
                  )}
                </div>
              </div>

              {/* Alumni Profile Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredAlumni.map(alumnus => (
                  <div
                    key={alumnus.id}
                    className="p-5 rounded-2xl bg-white dark:bg-[#1a0f12] border border-stone-200 dark:border-stone-800 hover:border-amber-400 dark:hover:border-amber-700 shadow-sm transition-all space-y-4"
                  >
                    <div className="flex gap-4 items-start">
                      <img
                        src={alumnus.photoUrl || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80'}
                        alt={alumnus.fullName}
                        className="w-16 h-16 rounded-xl object-cover border border-[#731326] flex-shrink-0"
                      />

                      <div className="flex-1 min-w-0">
                        <h3 className="font-serif font-bold text-sm text-[#731326] dark:text-amber-300 truncate">
                          {alumnus.fullName}
                        </h3>
                        <p className="text-xs font-semibold text-stone-700 dark:text-stone-300 flex items-center gap-1 mt-0.5">
                          <Briefcase className="w-3 h-3 text-[#d4af37]" />
                          <span className="truncate">{alumnus.currentProfession || 'Engineer'}</span>
                        </p>
                        <p className="text-[11px] text-stone-500 dark:text-stone-400 flex items-center gap-1">
                          <Building className="w-3 h-3 text-stone-400" />
                          <span className="truncate">{alumnus.company || 'Engineering Sector'}</span>
                        </p>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-stone-100 dark:border-stone-800/80 space-y-1 text-xs text-stone-600 dark:text-stone-400">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-medium text-stone-700 dark:text-stone-300">{alumnus.department}</span>
                        <span className="px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950/60 text-[#731326] dark:text-amber-300 font-mono font-bold">
                          {alumnus.graduationBatch || 'Alumni'}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-[11px]">
                        <MapPin className="w-3 h-3 text-[#d4af37]" />
                        <span>{alumnus.currentLocation || 'Dhaka, Bangladesh'}</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-dashed border-stone-200 dark:border-stone-800 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1 text-stone-500 text-[11px]">
                        <Mail className="w-3 h-3" />
                        <span className="truncate max-w-[150px]">{alumnus.email}</span>
                      </div>
                      {alumnus.phone && (
                        <div className="flex items-center gap-1 text-stone-500 text-[11px]">
                          <Phone className="w-3 h-3" />
                          <span>{alumnus.phone}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: DISTINGUISHED ALUMNI */}
          {activeSubTab === 'distinguished' && (
            <div className="space-y-6">
              <div className="border-b border-stone-200 dark:border-stone-800 pb-3">
                <h3 className="font-serif font-bold text-lg text-[#731326] dark:text-amber-300">
                  Distinguished DUET Buddhist Alumni
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  Honoring seniors who have achieved remarkable heights in engineering leadership, research, and humanitarian service.
                </p>
              </div>

              <div className="space-y-4">
                {distinguishedAlumni.map((alum, i) => (
                  <div
                    key={i}
                    className="p-6 rounded-3xl bg-white dark:bg-[#1a0f12] border-2 border-amber-300/40 dark:border-amber-800/40 shadow-sm flex flex-col sm:flex-row items-center sm:items-start gap-5"
                  >
                    <img
                      src={alum.photo}
                      alt={alum.name}
                      className="w-24 h-24 rounded-2xl object-cover border-2 border-[#731326] shadow-sm flex-shrink-0"
                    />
                    <div className="space-y-2 text-xs flex-1 text-center sm:text-left">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <h4 className="font-serif font-bold text-base text-[#731326] dark:text-amber-300">
                          {alum.name}
                        </h4>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-mono">
                          {alum.dept} • {alum.batch}
                        </span>
                      </div>
                      <p className="font-semibold text-stone-800 dark:text-stone-200">
                        {alum.role} — <span className="text-[#800020] dark:text-amber-400">{alum.org}</span>
                      </p>
                      <p className="text-stone-600 dark:text-stone-400 leading-relaxed italic">
                        "{alum.achievement}"
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: ALUMNI STATISTICS */}
          {activeSubTab === 'statistics' && (
            <div className="space-y-6">
              <div className="border-b border-stone-200 dark:border-stone-800 pb-3">
                <h3 className="font-serif font-bold text-lg text-[#731326] dark:text-amber-300">
                  Alumni Community Demographics & Insights
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  Distribution of DUET Buddhist engineers across sectors, locations, and decades.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-white dark:bg-[#1a0f12] border border-stone-200 dark:border-stone-800 text-center space-y-1">
                  <div className="text-3xl font-serif font-bold text-[#731326] dark:text-amber-300">
                    350+
                  </div>
                  <div className="text-xs font-semibold text-stone-700 dark:text-stone-300">
                    Total Graduated Alumni
                  </div>
                  <p className="text-[10px] text-stone-500">From 1st to 20th Batch of DUET</p>
                </div>

                <div className="p-4 rounded-2xl bg-white dark:bg-[#1a0f12] border border-stone-200 dark:border-stone-800 text-center space-y-1">
                  <div className="text-3xl font-serif font-bold text-[#731326] dark:text-amber-300">
                    12+ Countries
                  </div>
                  <div className="text-xs font-semibold text-stone-700 dark:text-stone-300">
                    Global Footprint
                  </div>
                  <p className="text-[10px] text-stone-500">Bangladesh, USA, Australia, Japan, Canada, EU</p>
                </div>

                <div className="p-4 rounded-2xl bg-white dark:bg-[#1a0f12] border border-stone-200 dark:border-stone-800 text-center space-y-1">
                  <div className="text-3xl font-serif font-bold text-[#731326] dark:text-amber-300">
                    ৳ 12.5 Lakhs
                  </div>
                  <div className="text-xs font-semibold text-stone-700 dark:text-stone-300">
                    Alumni Scholarship Contributions
                  </div>
                  <p className="text-[10px] text-stone-500">Endowed for DUET student welfare</p>
                </div>
              </div>

              {/* Sector breakdown bar visualization */}
              <div className="p-6 rounded-3xl bg-white dark:bg-[#1a0f12] border border-stone-200 dark:border-stone-800 space-y-4">
                <h4 className="font-serif font-bold text-sm text-[#731326] dark:text-amber-300">
                  Top Industrial Engineering Sectors
                </h4>

                <div className="space-y-3 text-xs">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="font-semibold text-stone-700 dark:text-stone-300">Power, Energy & Utilities (BPDB, PGCB, DESCO)</span>
                      <span className="font-mono text-stone-500">32%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
                      <div className="h-full bg-[#731326] rounded-full" style={{ width: '32%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="font-semibold text-stone-700 dark:text-stone-300">Information Technology & Software Engineering</span>
                      <span className="font-mono text-stone-500">28%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
                      <div className="h-full bg-amber-600 rounded-full" style={{ width: '28%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="font-semibold text-stone-700 dark:text-stone-300">Civil Infrastructure, Mega-Projects & RHD</span>
                      <span className="font-mono text-stone-500">24%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
                      <div className="h-full bg-[#d4af37] rounded-full" style={{ width: '24%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="font-semibold text-stone-700 dark:text-stone-300">Textile & Manufacturing Industrial Plants</span>
                      <span className="font-mono text-stone-500">16%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
                      <div className="h-full bg-rose-700 rounded-full" style={{ width: '16%' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
