import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { User } from '../types';
import { X, Download, ShieldCheck, Award } from 'lucide-react';
import { OfficialLogo } from './OfficialLogo';

interface DigitalIdModalProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
}

export const DigitalIdModal: React.FC<DigitalIdModalProps> = ({ user, isOpen, onClose }) => {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');

  useEffect(() => {
    if (user && isOpen) {
      const payload = JSON.stringify({
        org: 'BSWA DUET',
        id: user.duetId || user.id,
        name: user.fullName,
        role: user.role,
        blood: user.bloodGroup,
        dept: user.department,
        issued: '2026',
        verifyUrl: `https://bswa-duet.org/verify/${user.id}`
      });

      QRCode.toDataURL(payload, {
        width: 160,
        margin: 1,
        color: {
          dark: '#540d1a',
          light: '#ffffff'
        }
      }).then(url => setQrDataUrl(url)).catch(err => console.error(err));
    }
  }, [user, isOpen]);

  if (!isOpen || !user) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-white dark:bg-[#1a0f12] rounded-3xl shadow-2xl border border-amber-500/30 overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-1.5 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Digital ID Card Preview */}
        <div id="digital-id-card" className="p-6 bg-gradient-to-b from-[#fdfbf7] to-[#f4ebe1] dark:from-[#241217] dark:to-[#170a0e] text-stone-900 dark:text-stone-100">
          
          {/* Card Border & Hologram Strip */}
          <div className="relative rounded-2xl border-2 border-[#d4af37] bg-white/95 dark:bg-[#1f0e13]/95 shadow-xl p-5 overflow-hidden">
            
            {/* Top Emblem Ribbon */}
            <div className="flex items-center justify-between border-b border-amber-900/15 dark:border-amber-500/20 pb-3 mb-4">
              <OfficialLogo size="sm" showText={true} />
              <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-1 rounded bg-[#731326] text-amber-200 border border-[#d4af37]/60">
                {user.role === 'admin' ? 'Super Admin' : user.role === 'executive' ? 'Executive' : user.role === 'alumni' ? 'Alumni' : 'Member'}
              </span>
            </div>

            {/* Photo & Core Information */}
            <div className="flex gap-4 items-center">
              <div className="relative flex-shrink-0">
                <img
                  src={user.photoUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
                  alt={user.fullName}
                  className="w-20 h-24 object-cover rounded-xl border-2 border-[#731326] shadow-sm"
                />
                <div className="absolute -bottom-1 -right-1 bg-amber-500 text-white p-0.5 rounded-full shadow">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-serif font-bold text-base text-[#731326] dark:text-amber-300 truncate">
                  {user.fullName}
                </h3>
                <p className="text-xs font-semibold text-stone-700 dark:text-stone-300">
                  DUET ID: <span className="font-mono text-[#800020] dark:text-amber-200">{user.duetId || 'N/A'}</span>
                </p>
                <p className="text-[11px] text-stone-600 dark:text-stone-400 truncate">
                  {user.department || 'Engineering'}
                </p>
                {user.batch && (
                  <p className="text-[10px] text-stone-500 dark:text-stone-400">
                    Batch: {user.batch} {user.hall ? `• ${user.hall}` : ''}
                  </p>
                )}
                {user.graduationBatch && (
                  <p className="text-[10px] text-stone-500 dark:text-stone-400">
                    Graduation: {user.graduationBatch}
                  </p>
                )}
                <div className="mt-2 flex items-center gap-1.5">
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-200 border border-rose-300">
                    Blood: {user.bloodGroup || 'O+'}
                  </span>
                  <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold flex items-center gap-0.5">
                    <Award className="w-3 h-3" />
                    Verified
                  </span>
                </div>
              </div>
            </div>

            {/* Verifiable QR Code & Security Stamp */}
            <div className="mt-4 pt-3 border-t border-dashed border-stone-300 dark:border-stone-700 flex items-center justify-between">
              <div className="text-[9px] text-stone-500 dark:text-stone-400 space-y-0.5">
                <p className="font-semibold text-stone-700 dark:text-stone-300">Official BSWA Security Token</p>
                <p>Valid for DUET Campus & Welfare Events</p>
                <p className="font-mono text-[8px] text-stone-400">UUID: {user.id.toUpperCase()}</p>
              </div>

              {qrDataUrl && (
                <div className="p-1 rounded-lg bg-white border border-stone-200 shadow-sm flex-shrink-0">
                  <img src={qrDataUrl} alt="Verifiable QR Code" className="w-16 h-16" />
                </div>
              )}
            </div>

            {/* Bottom Golden Ribbon */}
            <div className="mt-3 text-center text-[8px] tracking-wider uppercase font-semibold text-amber-800 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 py-1 rounded">
              Buddhist Students Welfare Association • DUET Gazipur
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="p-4 bg-stone-50 dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800 flex gap-3">
          <button
            onClick={handlePrint}
            className="flex-1 py-2 px-4 rounded-xl bg-[#731326] hover:bg-[#800020] text-white text-xs font-semibold shadow flex items-center justify-center gap-2 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Print / Save Digital Card</span>
          </button>
          <button
            onClick={onClose}
            className="py-2 px-4 rounded-xl border border-stone-300 dark:border-stone-700 text-stone-600 dark:text-stone-300 text-xs font-semibold hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
