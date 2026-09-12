import React, { useState } from 'react';
import { Camera, Video, Sparkles, Calendar, Play, Maximize2, X } from 'lucide-react';

export const MediaView: React.FC = () => {
  const [mediaType, setMediaType] = useState<'photos' | 'videos'>('photos');
  const [selectedTag, setSelectedTag] = useState('all');
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const photos = [
    {
      id: 1,
      title: 'Grand Buddha Purnima Celebrations 2025',
      year: '2025',
      category: 'Buddha Purnima',
      url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
      caption: 'DUET Buddhist students and faculty offering morning flowers and lighting thousands of candles.'
    },
    {
      id: 2,
      title: 'Sacred Sanghadana Ceremony & Pindapata',
      year: '2025',
      category: 'Sanghadana',
      url: 'https://images.unsplash.com/photo-1609137144822-08577514a600?auto=format&fit=crop&w=800&q=80',
      caption: 'Revering 15 Venerable Bhikkhus invited from International Buddhist Monastery, Dhaka.'
    },
    {
      id: 3,
      title: 'Fresher Reception & Cultural Night (23rd Batch)',
      year: '2025',
      category: 'Fresher Reception',
      url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
      caption: 'Welcoming newly admitted Buddhist undergraduate engineering scholars at DUET auditorium.'
    },
    {
      id: 4,
      title: 'BSWA Merit Scholarship Award Ceremony',
      year: '2024',
      category: 'Scholarship',
      url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
      caption: 'Stipend certificates handed over by Chief Patron Dr. Sudatta Chakma.'
    },
    {
      id: 5,
      title: 'Emergency Blood Donation Camp at DUET Medical Center',
      year: '2024',
      category: 'Blood Donation',
      url: 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=800&q=80',
      caption: '85 bags of blood collected for patients of Gazipur Sadar Hospital and DUET community.'
    },
    {
      id: 6,
      title: 'Alumni Reunion & Career Mentorship Summit',
      year: '2024',
      category: 'Alumni',
      url: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=800&q=80',
      caption: 'Senior DUET graduates guiding final year students in job preparations.'
    }
  ];

  const videos = [
    {
      id: 1,
      title: 'Documentary: 40 Years of BSWA DUET History & Service (1986-2026)',
      duration: '18:45',
      thumbnail: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
      source: 'Official BSWA DUET Documentary'
    },
    {
      id: 2,
      title: 'Sacred Buddha Purnima Chanting & Dhamma Desana Highlights',
      duration: '12:30',
      thumbnail: 'https://images.unsplash.com/photo-1609137144822-08577514a600?auto=format&fit=crop&w=800&q=80',
      source: 'Ven. Sanghanayaka Bhikkhu Dhamma Lecture'
    },
    {
      id: 3,
      title: 'Annual Cultural Performance: Traditional Dance & Songs',
      duration: '24:10',
      thumbnail: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
      source: 'DUET Central Auditorium'
    }
  ];

  const filteredPhotos = photos.filter(p => selectedTag === 'all' || p.category === selectedTag);

  return (
    <div className="space-y-8 pb-16">
      
      {/* Page Header */}
      <div className="rounded-3xl bg-gradient-to-r from-[#6b1426] via-[#540d1a] to-[#36050e] text-white p-6 sm:p-10 shadow-lg border border-[#d4af37]/30 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-200 text-xs font-semibold">
            <Camera className="w-3.5 h-3.5" />
            <span>Visual Archive & Memories</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-4xl font-bold text-amber-100">
            Media & Historical Gallery
          </h1>
          <p className="text-xs sm:text-sm text-amber-100/80 max-w-xl">
            Cherished photographic and video chronicles of ceremonies, fresher receptions, and scholarship disbursements across decades.
          </p>
        </div>

        <div className="flex gap-2 flex-shrink-0">
          <button
            onClick={() => setMediaType('photos')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${
              mediaType === 'photos'
                ? 'bg-[#d4af37] text-[#3a0610] shadow-md'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <Camera className="w-4 h-4" />
            <span>Photo Gallery ({photos.length})</span>
          </button>

          <button
            onClick={() => setMediaType('videos')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${
              mediaType === 'videos'
                ? 'bg-[#d4af37] text-[#3a0610] shadow-md'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <Video className="w-4 h-4" />
            <span>Video Gallery ({videos.length})</span>
          </button>
        </div>
      </div>

      {/* Category Pills (for Photos) */}
      {mediaType === 'photos' && (
        <div className="flex flex-wrap gap-1.5 border-b border-stone-200 dark:border-stone-800 pb-3">
          {['all', 'Buddha Purnima', 'Sanghadana', 'Fresher Reception', 'Scholarship', 'Blood Donation', 'Alumni'].map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold capitalize transition-all ${
                selectedTag === tag
                  ? 'bg-[#731326] text-white shadow-sm'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {/* PHOTO GALLERY */}
      {mediaType === 'photos' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 animate-in fade-in duration-150">
          {filteredPhotos.map(p => (
            <div
              key={p.id}
              onClick={() => setLightboxImage(p.url)}
              className="group cursor-pointer rounded-3xl overflow-hidden bg-white dark:bg-[#1a0f12] border border-stone-200 dark:border-stone-800 shadow-sm hover:shadow-xl transition-all"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={p.url}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Maximize2 className="w-8 h-8 text-white drop-shadow-md" />
                </div>
                <span className="absolute top-3 left-3 px-2 py-0.5 rounded text-[10px] font-bold bg-[#731326] text-amber-100">
                  {p.category}
                </span>
                <span className="absolute top-3 right-3 px-2 py-0.5 rounded text-[10px] font-mono bg-black/60 text-white">
                  {p.year}
                </span>
              </div>
              <div className="p-4 space-y-1 text-xs">
                <h4 className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100 group-hover:text-[#731326] dark:group-hover:text-amber-300 transition-colors">
                  {p.title}
                </h4>
                <p className="text-stone-500 text-[11px] line-clamp-2">{p.caption}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* VIDEO GALLERY */}
      {mediaType === 'videos' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in duration-150">
          {videos.map(v => (
            <div
              key={v.id}
              className="rounded-3xl overflow-hidden bg-white dark:bg-[#1a0f12] border border-stone-200 dark:border-stone-800 shadow-sm space-y-3 p-4"
            >
              <div className="relative h-48 rounded-2xl overflow-hidden group cursor-pointer">
                <img src={v.thumbnail} alt={v.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-[#731326] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 fill-white ml-0.5" />
                  </div>
                </div>
                <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 text-white text-[10px] font-mono">
                  {v.duration}
                </span>
              </div>

              <div className="space-y-1 text-xs">
                <h4 className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100">
                  {v.title}
                </h4>
                <p className="text-[11px] text-stone-400">{v.source}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div
          onClick={() => setLightboxImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md cursor-pointer"
        >
          <div className="relative max-w-4xl w-full">
            <img src={lightboxImage} alt="Enlarged gallery view" className="w-full h-auto rounded-2xl shadow-2xl max-h-[85vh] object-contain mx-auto" />
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute -top-10 right-0 text-white p-2 rounded-full hover:bg-white/20"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
