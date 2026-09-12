import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { OfficialLogo } from '../components/OfficialLogo';
import { BookOpen, Shield, Award, Sparkles, ScrollText, CheckCircle2, Lock, FileText, Info } from 'lucide-react';

export const OrganizationView: React.FC = () => {
  const { language } = useApp();
  const [activeSubTab, setActiveSubTab] = useState<'about' | 'constitution' | 'religious_policy' | 'legal'>('about');

  return (
    <div className="space-y-8 pb-16">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="flex justify-center">
          <OfficialLogo size="lg" showText={false} />
        </div>
        <h1 className="font-serif text-2xl sm:text-4xl font-bold text-[#731326] dark:text-amber-300">
          Buddhist Students Welfare Association (BSWA)
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300">
          Dhaka University of Engineering & Technology (DUET), Gazipur-1707 • Established in 1986
        </p>

        {/* Sub-nav Buttons */}
        <div className="flex flex-wrap justify-center gap-2 pt-4">
          {[
            { id: 'about', label: 'About, History & Mission', icon: BookOpen },
            { id: 'constitution', label: 'Official Constitution', icon: ScrollText },
            { id: 'religious_policy', label: 'Buddhist Religious Policy', icon: Sparkles },
            { id: 'legal', label: 'Copyright, Privacy & Terms', icon: Shield },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
                  isActive
                    ? 'bg-[#731326] text-white shadow-md'
                    : 'bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:border-amber-400'
                }`}
              >
                <Icon className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* SUB-TAB 1: ABOUT, HISTORY, MISSION, VISION & OBJECTIVES */}
      {activeSubTab === 'about' && (
        <div className="space-y-8 max-w-5xl mx-auto animate-in fade-in duration-200">
          
          {/* Mission & Vision Bento */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-3xl bg-gradient-to-br from-[#731326] to-[#500c19] text-white shadow-md space-y-3">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-400/20 text-amber-200 text-[10px] font-bold uppercase tracking-wider">
                <Sparkles className="w-3 h-3 text-amber-300" />
                <span>Our Vision</span>
              </div>
              <h3 className="font-serif font-bold text-xl text-amber-100">
                Enlightened Engineers Serving Humanity
              </h3>
              <p className="text-xs text-amber-100/80 leading-relaxed">
                To cultivate a generation of technically adept, morally upright, and compassionate Buddhist engineers from DUET who illuminate societal progress through mindful leadership, technological innovation, and selfless community service.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-gradient-to-br from-amber-500 to-amber-700 text-white shadow-md space-y-3">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/20 text-amber-100 text-[10px] font-bold uppercase tracking-wider">
                <Award className="w-3 h-3" />
                <span>Our Mission</span>
              </div>
              <h3 className="font-serif font-bold text-xl text-white">
                Welfare, Scholarship & Cultural Harmony
              </h3>
              <p className="text-xs text-amber-50/90 leading-relaxed">
                Provide academic merit scholarships to students in financial hardship, foster lifelong alumni-student mentorship, organize sacred Dhamma ceremonies on campus, and preserve the noble cultural heritage of Buddhist traditions in DUET.
              </p>
            </div>
          </div>

          {/* About BSWA Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#1a0f12] border border-stone-200 dark:border-stone-800 shadow-sm space-y-4">
            <h2 className="font-serif font-bold text-xl text-[#731326] dark:text-amber-300 flex items-center gap-2">
              <Info className="w-5 h-5 text-[#d4af37]" />
              <span>About BSWA, DUET</span>
            </h2>
            <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
              The <strong>Buddhist Students Welfare Association (BSWA)</strong> of Dhaka University of Engineering & Technology (DUET), Gazipur, is a non-political, voluntary, cultural, and student welfare organization representing all Buddhist undergraduate, postgraduate, and diploma-holding engineering students and alumni of DUET.
            </p>
            <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
              Rooted in the university campus at Gazipur-1707, Bangladesh, the association operates under the guidance of respected faculty advisors, distinguished alumni, and Venerable Bhikkhu Sangha.
            </p>
          </div>

          {/* History Timeline */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#1a0f12] border border-stone-200 dark:border-stone-800 shadow-sm space-y-6">
            <h2 className="font-serif font-bold text-xl text-[#731326] dark:text-amber-300 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#d4af37]" />
              <span>Historical Legacy (1986 - Present)</span>
            </h2>

            <div className="space-y-6 border-l-2 border-amber-300 dark:border-amber-800 ml-3 pl-5">
              <div className="relative">
                <span className="absolute -left-[27px] top-1 w-3.5 h-3.5 rounded-full bg-[#731326] ring-4 ring-amber-100 dark:ring-stone-900" />
                <h4 className="font-bold text-xs text-[#731326] dark:text-amber-400">1986 — Foundation at BIT Dhaka</h4>
                <p className="text-xs text-stone-600 dark:text-stone-400 mt-1">
                  Founded by pioneering Buddhist engineering students at the then Bangladesh Institute of Technology (BIT), Dhaka. Started as a mutual welfare circle to assist students coming from remote hill tracts and rural Buddhist communities.
                </p>
              </div>

              <div className="relative">
                <span className="absolute -left-[27px] top-1 w-3.5 h-3.5 rounded-full bg-[#731326] ring-4 ring-amber-100 dark:ring-stone-900" />
                <h4 className="font-bold text-xs text-[#731326] dark:text-amber-400">2003 — University Transition to DUET</h4>
                <p className="text-xs text-stone-600 dark:text-stone-400 mt-1">
                  When BIT was upgraded into Dhaka University of Engineering & Technology (DUET), Gazipur, BSWA was formalized with its official constitution, emblem, and registered student center premises.
                </p>
              </div>

              <div className="relative">
                <span className="absolute -left-[27px] top-1 w-3.5 h-3.5 rounded-full bg-[#731326] ring-4 ring-amber-100 dark:ring-stone-900" />
                <h4 className="font-bold text-xs text-[#731326] dark:text-amber-400">2014 — Establishment of Permanent Merit Scholarship Endowment</h4>
                <p className="text-xs text-stone-600 dark:text-stone-400 mt-1">
                  Honorable alumni members established the BSWA Permanent Scholarship Endowment to ensure no Buddhist student drops out of DUET due to economic vulnerability. Over 145 students have received stipends to date.
                </p>
              </div>

              <div className="relative">
                <span className="absolute -left-[27px] top-1 w-3.5 h-3.5 rounded-full bg-emerald-600 ring-4 ring-emerald-100 dark:ring-stone-900" />
                <h4 className="font-bold text-xs text-emerald-700 dark:text-emerald-400">2026 — Launch of Official Digital Platform</h4>
                <p className="text-xs text-stone-600 dark:text-stone-400 mt-1">
                  Unveiling of the unified cross-platform web system with verified Email OTP authentication, QR digital ID cards, real-time scholarship lifecycle, online donor receipts, and financial audit transparency.
                </p>
              </div>
            </div>
          </div>

          {/* Core Objectives List */}
          <div className="p-6 sm:p-8 rounded-3xl bg-amber-50/50 dark:bg-stone-900/50 border border-amber-200/60 dark:border-stone-800 space-y-4">
            <h2 className="font-serif font-bold text-lg text-[#731326] dark:text-amber-300">
              Core Strategic Objectives
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {[
                'To safeguard welfare, rights, and academic continuity for every Buddhist student at DUET.',
                'To provide non-refundable merit & emergency hardship scholarships each semester.',
                'To celebrate sacred Buddhist events (Buddha Purnima, Sanghadana, Kathina Chibar Dana).',
                'To build an active, collaborative network connecting DUET alumni engineers worldwide.',
                'To organize orientation seminars, technical workshops, and fresher receptions.',
                'To maintain absolute financial transparency and audited accounts accessible to all donors.',
              ].map((obj, i) => (
                <div key={i} className="flex items-start gap-2 p-2.5 rounded-xl bg-white dark:bg-[#1a0f12] border border-stone-200 dark:border-stone-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="text-stone-700 dark:text-stone-300">{obj}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: CONSTITUTION */}
      {activeSubTab === 'constitution' && (
        <div className="max-w-4xl mx-auto p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#1a0f12] border border-stone-200 dark:border-stone-800 shadow-sm space-y-6 text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed animate-in fade-in duration-200">
          <div className="border-b border-amber-900/20 dark:border-amber-700/30 pb-4 text-center">
            <h2 className="font-serif font-bold text-xl text-[#731326] dark:text-amber-300">
              The Constitution of Buddhist Students Welfare Association (BSWA)
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              Dhaka University of Engineering & Technology (DUET), Gazipur • Ratified by the General Body
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-sm text-[#731326] dark:text-amber-400">
              Article I: Name, Emblem & Head Office
            </h3>
            <p>
              <strong>Section 1:</strong> The name of the organization shall be the "Buddhist Students Welfare Association", abbreviated as "BSWA", DUET.
            </p>
            <p>
              <strong>Section 2:</strong> The emblem shall feature the 8-spoked Dharmachakra resting upon the sacred blossoming Lotus within a deep maroon and golden circular rim inscribed with "BSWA DUET".
            </p>
            <p>
              <strong>Section 3:</strong> The central office shall be situated within the DUET Gazipur campus.
            </p>
          </div>

          <div className="space-y-4 border-t border-stone-200 dark:border-stone-800 pt-4">
            <h3 className="font-bold text-sm text-[#731326] dark:text-amber-400">
              Article II: Membership & Categories
            </h3>
            <p>
              <strong>Section 1: General Member (Running Student):</strong> Any practicing Buddhist undergraduate or graduate student duly admitted and registered in any academic department at DUET Gazipur.
            </p>
            <p>
              <strong>Section 2: Alumni Member:</strong> Any Buddhist engineering graduate or former student of DUET/BIT Dhaka who registers in the BSWA alumni registry.
            </p>
            <p>
              <strong>Section 3: Advisory Patron:</strong> Respected Buddhist faculty members of DUET and prominent Sangha members serving as lifetime spiritual guides.
            </p>
          </div>

          <div className="space-y-4 border-t border-stone-200 dark:border-stone-800 pt-4">
            <h3 className="font-bold text-sm text-[#731326] dark:text-amber-400">
              Article III: Executive Committee Structure
            </h3>
            <p>
              The Executive Committee shall be elected/selected annually for a tenure of one year and shall comprise:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>President (Final/Senior Year Student)</li>
              <li>Vice-President (Two Posts)</li>
              <li>General Secretary</li>
              <li>Joint Secretary (Two Posts)</li>
              <li>Treasurer / Finance Secretary</li>
              <li>Organizing & Welfare Secretary</li>
              <li>Religious & Cultural Affairs Secretary</li>
              <li>Publication & Media Secretary</li>
              <li>Alumni Relations Secretary</li>
              <li>Executive Members (One representative per batch/department)</li>
            </ul>
          </div>

          <div className="space-y-4 border-t border-stone-200 dark:border-stone-800 pt-4">
            <h3 className="font-bold text-sm text-[#731326] dark:text-amber-400">
              Article IV: Financial Transparency & Audit
            </h3>
            <p>
              All monetary contributions, donations, membership fees, and expenditure vouchers must be recorded in the digital accounting system. An annual financial report must be presented and certified at the Annual General Meeting (AGM).
            </p>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: BUDDHIST RELIGIOUS POLICY */}
      {activeSubTab === 'religious_policy' && (
        <div className="max-w-4xl mx-auto p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#1a0f12] border border-stone-200 dark:border-stone-800 shadow-sm space-y-6 text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed animate-in fade-in duration-200">
          <div className="border-b border-amber-900/20 dark:border-amber-700/30 pb-4 text-center">
            <h2 className="font-serif font-bold text-xl text-[#731326] dark:text-amber-300">
              BSWA DUET Buddhist Religious & Secular Harmony Policy
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              Guiding Principles of Dhamma, Ahimsa (Non-Violence), and Campus Fraternal Unity
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-bold text-sm text-[#731326] dark:text-amber-400">
              1. The Four Sublime States (Brahmaviharas)
            </h3>
            <p>
              Every member of BSWA DUET is expected to manifest in daily campus life:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900">
                <strong className="text-[#731326] dark:text-amber-300">1. Metta (Loving-Kindness):</strong> Extending unconditional goodwill to all fellow students, university professors, and living beings.
              </div>
              <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900">
                <strong className="text-[#731326] dark:text-amber-300">2. Karuna (Compassion):</strong> Active readiness to alleviate suffering through financial aid, blood donation, and academic tutoring.
              </div>
              <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900">
                <strong className="text-[#731326] dark:text-amber-300">3. Mudita (Sympathetic Joy):</strong> Rejoicing without jealousy in the achievements, high CGPA, and career promotions of our brothers and sisters.
              </div>
              <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900">
                <strong className="text-[#731326] dark:text-amber-300">4. Upekkha (Equanimity):</strong> Maintaining mental poise amidst semester examination pressure, triumphs, and tribulations.
              </div>
            </div>
          </div>

          <div className="space-y-3 border-t border-stone-200 dark:border-stone-800 pt-4">
            <h3 className="font-bold text-sm text-[#731326] dark:text-amber-400">
              2. Strict Non-Political & Secular Character
            </h3>
            <p>
              BSWA DUET strictly abstains from all partisan political activities. The association serves purely as a spiritual, cultural, and welfare sanctuary. Harmony and mutual respect with all faiths in the university community is an inviolable tenet.
            </p>
          </div>

          <div className="space-y-3 border-t border-stone-200 dark:border-stone-800 pt-4">
            <h3 className="font-bold text-sm text-[#731326] dark:text-amber-400">
              3. Respect for Sangha & Monastic Vinaya
            </h3>
            <p>
              During ceremonies like Sanghadana, Buddha Purnima, and Kathina Chibar Dana, students shall accord utmost reverence to Venerable Buddhist Monks according to the monastic disciplinary code (Vinaya).
            </p>
          </div>
        </div>
      )}

      {/* SUB-TAB 4: COPYRIGHT, PRIVACY POLICY & TERMS OF USE */}
      {activeSubTab === 'legal' && (
        <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-200">
          
          {/* Copyright */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#1a0f12] border border-stone-200 dark:border-stone-800 shadow-sm space-y-3 text-xs sm:text-sm">
            <h3 className="font-serif font-bold text-base text-[#731326] dark:text-amber-400 flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#d4af37]" />
              <span>Copyright & Intellectual Property</span>
            </h3>
            <p className="text-stone-600 dark:text-stone-400 leading-relaxed">
              © 1986 - {new Date().getFullYear()} Buddhist Students Welfare Association (BSWA), DUET Gazipur. The official emblem, name, photographic archive, constitution, and digital assets are proprietary properties of BSWA DUET. Unauthorized commercial reproduction is prohibited.
            </p>
          </div>

          {/* Privacy Policy */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#1a0f12] border border-stone-200 dark:border-stone-800 shadow-sm space-y-3 text-xs sm:text-sm">
            <h3 className="font-serif font-bold text-base text-[#731326] dark:text-amber-400 flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#d4af37]" />
              <span>Privacy Policy</span>
            </h3>
            <p className="text-stone-600 dark:text-stone-400 leading-relaxed">
              BSWA DUET values the privacy of its students and alumni. Personal information provided during registration (DUET ID, academic grades, blood group, contact numbers, family income documentation) is accessed strictly by authorized Executive Board members for verifying welfare aid and printing membership credentials. Sensitive scholarship income certificates are encrypted and never disclosed publicly.
            </p>
          </div>

          {/* Terms of Use */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#1a0f12] border border-stone-200 dark:border-stone-800 shadow-sm space-y-3 text-xs sm:text-sm">
            <h3 className="font-serif font-bold text-base text-[#731326] dark:text-amber-400 flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#d4af37]" />
              <span>Terms of Use</span>
            </h3>
            <p className="text-stone-600 dark:text-stone-400 leading-relaxed">
              Users agree to provide accurate and truthful academic credentials. Misrepresentation of DUET student ID, CGPA transcripts, or false donation claim numbers will result in immediate disqualification and revocation of portal access.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
