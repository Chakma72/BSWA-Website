import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Award,
  CheckCircle2,
  QrCode,
  Heart,
  HandMetal,
  Plus,
  Compass,
  Sparkles,
  Share2
} from 'lucide-react';
import QRCode from 'qrcode';
import { EventItem } from '../types';
import { BUDDHIST_HOLIDAYS_2026 } from '../data/initialData';

export const EventsView: React.FC = () => {
  const { events, registerForEvent, currentUser, language, activeRole } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past' | 'calendar' | 'volunteers'>('upcoming');

  // Selected event for registration / QR pass modal
  const [activeEventForModal, setActiveEventForModal] = useState<EventItem | null>(null);
  const [qrPassUrl, setQrPassUrl] = useState<string>('');
  const [volunteerName, setVolunteerName] = useState('');
  const [volunteerSkill, setVolunteerSkill] = useState('Decoration & Flowers');
  const [volunteerSuccess, setVolunteerSuccess] = useState(false);

  const categories = [
    { id: 'all', label: 'All Programs' },
    { id: 'buddha_purnima', label: 'Buddha Purnima' },
    { id: 'sanghadana', label: 'Sanghadana' },
    { id: 'kathina_chibar_dana', label: 'Kathina Chibar Dana' },
    { id: 'fresher_reception', label: 'Fresher Reception' },
    { id: 'farewell', label: 'Farewell' },
    { id: 'blood_donation', label: 'Blood Donation' },
  ];

  const filteredEvents = events.filter(e => {
    const matchCategory = selectedCategory === 'all' || e.category === selectedCategory;
    const matchTab = activeTab === 'upcoming' ? e.status === 'upcoming' : activeTab === 'past' ? e.status === 'past' : true;
    return matchCategory && matchTab;
  });

  const handleOpenRegistrationModal = async (event: EventItem) => {
    setActiveEventForModal(event);
    const passPayload = JSON.stringify({
      eventId: event.id,
      eventTitle: event.title,
      attendee: currentUser?.fullName || 'Guest Attendee',
      duetId: currentUser?.duetId || 'GUEST',
      verified: true,
      timestamp: new Date().toISOString()
    });

    try {
      const url = await QRCode.toDataURL(passPayload, {
        width: 180,
        margin: 1,
        color: { dark: '#731326', light: '#ffffff' }
      });
      setQrPassUrl(url);
    } catch (e) {
      console.error(e);
    }
  };

  const handleConfirmRSVP = () => {
    if (activeEventForModal) {
      registerForEvent(activeEventForModal.id);
      alert(`Registration confirmed for ${activeEventForModal.title}! You can save the QR pass.`);
    }
  };

  const handleVolunteerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setVolunteerSuccess(true);
    setTimeout(() => {
      setVolunteerSuccess(false);
      setVolunteerName('');
    }, 4000);
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Page Header */}
      <div className="rounded-3xl bg-gradient-to-r from-[#6b1426] via-[#540d1a] to-[#36050e] text-white p-6 sm:p-10 shadow-lg border border-[#d4af37]/30 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-200 text-xs font-semibold">
            <Calendar className="w-3.5 h-3.5" />
            <span>Religious & Cultural Event Portal</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-4xl font-bold text-amber-100">
            BSWA DUET Events & Ceremonies
          </h1>
          <p className="text-xs sm:text-sm text-amber-100/80 max-w-xl">
            Celebrating sacred Buddhist festivals, welcoming freshers, honoring departing graduates, and saving lives through campus blood donation drives.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('volunteers')}
          className="px-5 py-3 rounded-2xl bg-[#d4af37] text-[#3a0610] font-bold text-xs hover:bg-amber-300 shadow-lg transition-all flex items-center gap-2 flex-shrink-0"
        >
          <HandMetal className="w-4 h-4" />
          <span>Join Event Volunteer Team</span>
        </button>
      </div>

      {/* Navigation Sub-Tabs & Category Filter */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 dark:border-stone-800 pb-3">
          <div className="flex gap-2">
            {[
              { id: 'upcoming', label: 'Upcoming Programs' },
              { id: 'past', label: 'Past Ceremonies Archive' },
              { id: 'calendar', label: 'Buddhist Lunar Calendar' },
              { id: 'volunteers', label: 'Volunteer Management' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'bg-[#731326] text-white shadow-sm'
                    : 'bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Category Filter Pills */}
        {(activeTab === 'upcoming' || activeTab === 'past') && (
          <div className="flex flex-wrap gap-1.5 overflow-x-auto pb-1">
            {categories.map(c => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  selectedCategory === c.id
                    ? 'bg-amber-100 dark:bg-amber-950 text-[#731326] dark:text-amber-300 border border-[#d4af37]'
                    : 'bg-stone-100 dark:bg-stone-900 text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-800'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* TAB: UPCOMING & PAST EVENTS GRID */}
      {(activeTab === 'upcoming' || activeTab === 'past') && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-150">
          {filteredEvents.map(event => (
            <div
              key={event.id}
              className="p-5 rounded-3xl bg-white dark:bg-[#1a0f12] border border-stone-200 dark:border-stone-800 hover:border-amber-400 dark:hover:border-amber-700 shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="relative h-44 rounded-2xl overflow-hidden">
                  <img
                    src={event.bannerUrl}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
                  <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#731326] text-amber-200 border border-[#d4af37]/60 uppercase tracking-wide">
                    {event.category.replace('_', ' ')}
                  </span>
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h3 className="font-serif font-bold text-base text-amber-100">
                      {language === 'bn' && event.titleBn ? event.titleBn : event.title}
                    </h3>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-stone-600 dark:text-stone-400">
                  <div className="flex items-center gap-2 text-stone-800 dark:text-stone-200 font-medium">
                    <Clock className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>{event.date} • {event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>{event.location}</span>
                  </div>
                </div>

                <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed line-clamp-3">
                  {event.description}
                </p>
              </div>

              <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-stone-500 text-[11px]">
                  <Users className="w-3.5 h-3.5" />
                  <span><strong>{event.registeredCount}</strong> / {event.goalAttendees} RSVP'd</span>
                </div>

                <button
                  onClick={() => handleOpenRegistrationModal(event)}
                  className="px-4 py-2 rounded-xl bg-[#731326] hover:bg-[#800020] text-white font-bold text-xs shadow transition-colors flex items-center gap-1.5"
                >
                  <QrCode className="w-3.5 h-3.5" />
                  <span>RSVP & QR Pass</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB: BUDDHIST LUNAR CALENDAR */}
      {activeTab === 'calendar' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          <div className="border-b border-stone-200 dark:border-stone-800 pb-3">
            <h3 className="font-serif font-bold text-lg text-[#731326] dark:text-amber-300">
              Official Buddhist Lunar Calendar (2026 / 2570 Buddha Era)
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Sacred Purnima Tithis and traditional Buddhist holidays observed by BSWA DUET.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {BUDDHIST_HOLIDAYS_2026.map((h, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl bg-white dark:bg-[#1a0f12] border-2 border-amber-300/40 dark:border-amber-800/40 shadow-sm space-y-2"
              >
                <div className="flex items-start justify-between">
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-[#731326] dark:text-amber-300">
                    Sacred Tithi
                  </span>
                  <span className="font-mono text-xs font-bold text-[#800020] dark:text-amber-400">
                    {h.dateStr}
                  </span>
                </div>
                <h4 className="font-serif font-bold text-sm text-[#731326] dark:text-amber-200">
                  {h.name}
                </h4>
                <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                  {h.significance}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB: VOLUNTEER MANAGEMENT */}
      {activeTab === 'volunteers' && (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-150">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Volunteer Sign-up Form */}
            <div className="p-6 rounded-3xl bg-white dark:bg-[#1a0f12] border border-stone-200 dark:border-stone-800 shadow-sm space-y-4">
              <h3 className="font-serif font-bold text-base text-[#731326] dark:text-amber-300 flex items-center gap-2">
                <HandMetal className="w-5 h-5 text-[#d4af37]" />
                <span>Volunteer for Upcoming Programs</span>
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-400">
                Lend your service to organizing Buddha Purnima, Sanghadana dining management, sound systems, stage decoration, or blood donation drives.
              </p>

              {volunteerSuccess ? (
                <div className="p-4 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                  <span>Thank you! The BSWA Organizing Secretary will contact you with task allocations.</span>
                </div>
              ) : (
                <form onSubmit={handleVolunteerSubmit} className="space-y-3 text-xs">
                  <div>
                    <label className="block text-stone-600 dark:text-stone-400 font-semibold mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      value={volunteerName}
                      onChange={e => setVolunteerName(e.target.value)}
                      placeholder="e.g. Sujoy Barua"
                      className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-600 dark:text-stone-400 font-semibold mb-1">Preferred Volunteer Role</label>
                    <select
                      value={volunteerSkill}
                      onChange={e => setVolunteerSkill(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900"
                    >
                      <option value="Decoration & Flowers">Campus & Temple Decoration</option>
                      <option value="Food & Dana Management">Sanghadana & Food Distribution</option>
                      <option value="Stage & Sound Engineering">Stage, Sound & Audio Visuals</option>
                      <option value="Photography & Social Media">Photography, Videography & Live Streaming</option>
                      <option value="First Aid & Blood Donor Coordination">First Aid & Blood Donor Coordination</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-[#731326] hover:bg-[#800020] text-white font-bold transition-colors"
                  >
                    Submit Volunteer Registration
                  </button>
                </form>
              )}
            </div>

            {/* Volunteer Roles Overview */}
            <div className="space-y-3 text-xs">
              <h3 className="font-serif font-bold text-base text-[#731326] dark:text-amber-300">
                Volunteer Service Wings
              </h3>
              <div className="space-y-2">
                {[
                  { title: 'Dhamma & Hospitality Wing', desc: 'Receiving Venerable Bhikkhu Sangha, ceremonial seating, and incense offerings.' },
                  { title: 'Logistics & Safety Wing', desc: 'Managing DUET student center venue setup, projector, and crowd reception.' },
                  { title: 'Blood Donation Wing', desc: 'Coordinating emergency blood donor requests for DUET hospital and Gazipur patients.' },
                  { title: 'Academic Mentorship Wing', desc: 'Tutoring fresher 1st-year Buddhist students during semester examination periods.' },
                ].map((wing, idx) => (
                  <div key={idx} className="p-3 rounded-2xl bg-amber-50/50 dark:bg-stone-900/50 border border-stone-200 dark:border-stone-800">
                    <h4 className="font-bold text-[#731326] dark:text-amber-400">{wing.title}</h4>
                    <p className="text-stone-600 dark:text-stone-400 text-[11px] mt-0.5">{wing.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* QR ATTENDANCE / RSVP MODAL */}
      {activeEventForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="relative w-full max-w-sm bg-white dark:bg-[#1a0f12] rounded-3xl shadow-2xl border-2 border-amber-400/50 p-6 space-y-4 text-center">
            <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full bg-[#731326] text-amber-200">
              BSWA Official Event Pass
            </span>

            <div>
              <h3 className="font-serif font-bold text-base text-[#731326] dark:text-amber-300">
                {activeEventForModal.title}
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                {activeEventForModal.date} • {activeEventForModal.location}
              </p>
            </div>

            {/* QR Code */}
            {qrPassUrl && (
              <div className="p-2 rounded-2xl bg-white border border-stone-200 shadow-sm inline-block">
                <img src={qrPassUrl} alt="Event QR Pass" className="w-40 h-40 mx-auto" />
              </div>
            )}

            <div className="text-[11px] text-stone-600 dark:text-stone-400 space-y-0.5 bg-stone-50 dark:bg-stone-900 p-2.5 rounded-xl">
              <p>Attendee: <strong>{currentUser?.fullName || 'Guest Attendee'}</strong></p>
              <p>DUET ID: {currentUser?.duetId || 'GUEST'}</p>
              <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                ✓ Scan at Gate with Executive QR Scanner
              </p>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={handleConfirmRSVP}
                className="flex-1 py-2 rounded-xl bg-[#731326] hover:bg-[#800020] text-white text-xs font-bold transition-colors"
              >
                Confirm RSVP
              </button>
              <button
                onClick={() => setActiveEventForModal(null)}
                className="py-2 px-4 rounded-xl border border-stone-300 dark:border-stone-700 text-stone-600 dark:text-stone-300 text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
