import React from 'react';
import { OfficialLogo } from './OfficialLogo';
import { Mail, Phone, MapPin, Heart, Shield, Award, Calendar, BookOpen, ExternalLink } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface FooterProps {
  onSelectTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  const { language, resetToDemoData } = useApp();

  return (
    <footer className="bg-[#24080e] text-stone-300 border-t-2 border-[#d4af37]/40 pt-12 pb-16 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Upper Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-stone-800">
          
          {/* Col 1: Organization Overview */}
          <div className="space-y-4">
            <OfficialLogo size="md" showText={true} />
            <p className="text-xs text-stone-400 leading-relaxed">
              {language === 'en'
                ? 'The official welfare platform for all Buddhist students and alumni of Dhaka University of Engineering & Technology (DUET), Gazipur. Upholding the noble tenets of peace, scholarship, compassion, and engineering excellence.'
                : 'ঢাকা প্রকৌশল ও প্রযুক্তি বিশ্ববিদ্যালয় (ডুয়েট) গাজীপুরের সকল বৌদ্ধ শিক্ষার্থী ও প্রাক্তন প্রকৌশলীদের ঐক্যবদ্ধ কল্যাণমূলক ডিজিটাল প্ল্যাটফর্ম।'}
            </p>
            <div className="flex items-center gap-2 text-amber-300 text-xs font-serif">
              <span>☸</span>
              <span>Metta • Karuna • Mudita • Upekkha</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="font-serif font-bold text-amber-200 text-sm mb-3 border-b border-amber-900/60 pb-1.5">
              {language === 'en' ? 'Core Portals' : 'প্রয়োজনীয় লিংক'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onSelectTab('scholarship')}
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5"
                >
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  <span>Merit Scholarship 2026</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('alumni')}
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5"
                >
                  <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                  <span>DUET Alumni Directory</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('donations')}
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5"
                >
                  <Heart className="w-3.5 h-3.5 text-amber-400" />
                  <span>Student Welfare Dana Fund</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('events')}
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5"
                >
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  <span>Buddha Purnima & Ceremonies</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('organization')}
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5"
                >
                  <Shield className="w-3.5 h-3.5 text-amber-400" />
                  <span>Constitution & Religious Policy</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Leadership & Governance */}
          <div>
            <h4 className="font-serif font-bold text-amber-200 text-sm mb-3 border-b border-amber-900/60 pb-1.5">
              Leadership & Heritage
            </h4>
            <div className="space-y-2 text-xs text-stone-400">
              <p>
                <strong className="text-amber-100">President:</strong> Ripon Barua (EEE 18th)
              </p>
              <p>
                <strong className="text-amber-100">General Secretary:</strong> Noyon Chakma (CE 19th)
              </p>
              <p>
                <strong className="text-amber-100">Chief Patron:</strong> Ven. Prof. Sudatta Chakma, Ph.D.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => onSelectTab('leadership')}
                  className="text-amber-400 hover:underline flex items-center gap-1"
                >
                  <span>View Historical Leadership Archive</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          {/* Col 4: Official Contact */}
          <div>
            <h4 className="font-serif font-bold text-amber-200 text-sm mb-3 border-b border-amber-900/60 pb-1.5">
              Official Headquarters
            </h4>
            <div className="space-y-2.5 text-xs text-stone-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>
                  BSWA Room, Central Student Center, Dhaka University of Engineering & Technology (DUET), Gazipur-1707, Bangladesh
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>contact@bswa-duet.org</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>+880 1812-987654 / +880 1711-234567</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-stone-800">
              <button
                onClick={resetToDemoData}
                className="text-[10px] text-amber-400/80 hover:text-amber-300 underline"
              >
                Reset Database to Seed State
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Rights & Policy Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-500 gap-3">
          <div>
            © 1986 - {new Date().getFullYear()} Buddhist Students Welfare Association (BSWA), DUET. All Rights Reserved.
          </div>
          <div className="flex flex-wrap gap-4 text-stone-400">
            <button onClick={() => onSelectTab('organization')} className="hover:underline">Constitution</button>
            <button onClick={() => onSelectTab('organization')} className="hover:underline">Buddhist Religious Policy</button>
            <button onClick={() => onSelectTab('organization')} className="hover:underline">Privacy Policy</button>
            <button onClick={() => onSelectTab('organization')} className="hover:underline">Terms of Use</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
