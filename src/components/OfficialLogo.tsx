import React from 'react';

interface OfficialLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  showText?: boolean;
  className?: string;
  watermark?: boolean;
  downloadable?: boolean;
}

export const OfficialLogo: React.FC<OfficialLogoProps> = ({
  size = 'md',
  showText = true,
  className = '',
  watermark = false,
  downloadable = false,
}) => {
  const dimensionMap = {
    xs: 'w-8 h-8',
    sm: 'w-10 h-10',
    md: 'w-14 h-14',
    lg: 'w-20 h-20',
    xl: 'w-28 h-28',
    '2xl': 'w-40 h-40',
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    const link = document.createElement('a');
    link.href = '/assets/bswa-logo.svg';
    link.download = 'BSWA_DUET_Official_Logo.svg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (watermark) {
    return (
      <div className={`pointer-events-none select-none flex items-center justify-center opacity-10 ${className}`}>
        <img
          src="/assets/bswa-logo.svg"
          alt="BSWA DUET Watermark"
          className="w-full max-w-[320px] aspect-square object-contain"
          referrerPolicy="no-referrer"
        />
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Official High-Resolution Logo Vector / SVG */}
      <div
        className={`${dimensionMap[size]} relative flex-shrink-0 rounded-full shadow-md overflow-hidden bg-white p-0.5 border-2 border-[#d4af37] flex items-center justify-center group`}
        title="বৌদ্ধ ছাত্র কল্যাণ পরিষদ, ডুয়েট, গাজীপুর। স্থাপিত - ২০০৪ইং"
      >
        <img
          src="/assets/bswa-logo.svg"
          alt="Buddhist Students Welfare Association (BSWA), DUET"
          className="w-full h-full object-contain transform transition-transform group-hover:scale-105 duration-300"
          referrerPolicy="no-referrer"
        />
      </div>

      {showText && (
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-base sm:text-lg text-[#731326] dark:text-[#f8d794] tracking-wide leading-tight">
              BSWA, DUET
            </span>
            <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] font-semibold bg-[#fef3c7] text-[#800020] border border-[#d4af37]/50">
              ESTD 2004
            </span>
          </div>
          <span className="text-[11px] sm:text-xs text-stone-600 dark:text-stone-300 font-medium leading-tight">
            Buddhist Students Welfare Association
          </span>
          <span className="text-[10px] text-amber-700 dark:text-amber-400 font-medium">
            বৌদ্ধ ছাত্র কল্যাণ পরিষদ • ডুয়েট, গাজীপুর
          </span>
        </div>
      )}

      {downloadable && (
        <button
          onClick={handleDownload}
          title="Download High-Resolution Official Logo"
          className="text-xs px-2.5 py-1 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 transition-colors flex items-center gap-1 shadow-sm"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          <span>Logo</span>
        </button>
      )}
    </div>
  );
};
