import React, { useMemo, useRef, useState } from 'react';
import { useApp } from '../context/AppContext';
import { GalleryPhoto } from '../types';
import {
  Images,
  Plus,
  Pencil,
  Trash2,
  X,
  Maximize2,
  Upload,
  ShieldCheck,
  Calendar,
} from 'lucide-react';

type PhotoForm = {
  title: string;
  category: string;
  date: string;
  caption: string;
  url: string;
};

const EMPTY_FORM: PhotoForm = {
  title: '',
  category: '',
  date: new Date().toISOString().split('T')[0],
  caption: '',
  url: '',
};

// Downscale + compress uploads so localStorage does not overflow with raw data URLs.
const readAndCompress = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const maxW = 1280;
        const scale = Math.min(1, maxW / img.width);
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(reader.result as string);
          return;
        }
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg', 0.82));
      };
      img.onerror = reject;
      img.src = reader.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

export const GalleryView: React.FC = () => {
  const { galleryPhotos, addGalleryPhoto, updateGalleryPhoto, deleteGalleryPhoto, activeRole } = useApp();

  const canManage = activeRole === 'admin' || activeRole === 'executive';

  const [activeYear, setActiveYear] = useState<'all' | string>('all');
  const [lightbox, setLightbox] = useState<GalleryPhoto | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<PhotoForm>(EMPTY_FORM);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const years = useMemo(() => {
    const set = new Set(galleryPhotos.map(p => p.year));
    return Array.from(set).sort((a, b) => Number(b) - Number(a));
  }, [galleryPhotos]);

  // Group filtered photos by year (newest first), each year's photos newest date first.
  const grouped = useMemo(() => {
    const filtered = galleryPhotos.filter(p => activeYear === 'all' || p.year === activeYear);
    const map = new Map<string, GalleryPhoto[]>();
    filtered.forEach(p => {
      const list = map.get(p.year) || [];
      list.push(p);
      map.set(p.year, list);
    });
    return Array.from(map.entries())
      .sort((a, b) => Number(b[0]) - Number(a[0]))
      .map(([year, photos]) => ({
        year,
        photos: photos.sort((a, b) => (a.date < b.date ? 1 : -1)),
      }));
  }, [galleryPhotos, activeYear]);

  const openAdd = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setModalOpen(true);
  };

  const openEdit = (photo: GalleryPhoto) => {
    setEditingId(photo.id);
    setForm({
      title: photo.title,
      category: photo.category,
      date: photo.date,
      caption: photo.caption || '',
      url: photo.url,
    });
    setModalOpen(true);
  };

  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    setUploading(true);
    try {
      const dataUrl = await readAndCompress(file);
      setForm(prev => ({ ...prev, url: dataUrl }));
    } catch {
      alert('Could not read that image. Please try another file.');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.url) {
      alert('Please upload a photo first.');
      return;
    }
    if (!form.title.trim()) {
      alert('Please add a title.');
      return;
    }

    if (editingId) {
      const existing = galleryPhotos.find(p => p.id === editingId);
      if (existing) {
        updateGalleryPhoto({
          ...existing,
          title: form.title.trim(),
          category: form.category.trim() || 'General',
          date: form.date,
          caption: form.caption.trim(),
          url: form.url,
          year: form.date.slice(0, 4),
        });
      }
    } else {
      addGalleryPhoto({
        title: form.title.trim(),
        category: form.category.trim() || 'General',
        date: form.date,
        caption: form.caption.trim(),
        url: form.url,
      });
    }
    setModalOpen(false);
    setForm(EMPTY_FORM);
    setEditingId(null);
  };

  const handleDelete = (photo: GalleryPhoto) => {
    if (window.confirm(`Remove "${photo.title}" from the gallery? This cannot be undone.`)) {
      deleteGalleryPhoto(photo.id);
    }
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Page Header */}
      <div className="rounded-3xl bg-gradient-to-r from-[#6b1426] via-[#540d1a] to-[#36050e] text-white p-6 sm:p-10 shadow-lg border border-[#d4af37]/30 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-200 text-xs font-semibold">
            <Images className="w-3.5 h-3.5" />
            <span>Association Activities Archive</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-4xl font-bold text-amber-100 text-balance">
            Photo Gallery
          </h1>
          <p className="text-xs sm:text-sm text-amber-100/80 max-w-xl text-pretty">
            A year-wise visual chronicle of BSWA DUET ceremonies, welfare drives, and community
            milestones.
          </p>
        </div>

        {canManage ? (
          <button
            onClick={openAdd}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold bg-[#d4af37] text-[#3a0610] shadow-md hover:brightness-105 transition-all flex-shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Upload Photo</span>
          </button>
        ) : (
          <div className="flex items-center gap-2 px-3 py-2 rounded-2xl text-[11px] font-semibold bg-white/10 text-amber-100/80 flex-shrink-0">
            <ShieldCheck className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Managed by the Admin Panel</span>
          </div>
        )}
      </div>

      {/* Year Filter */}
      <div className="flex flex-wrap gap-1.5 border-b border-stone-200 dark:border-stone-800 pb-3">
        <button
          onClick={() => setActiveYear('all')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
            activeYear === 'all'
              ? 'bg-[#731326] text-white shadow-sm'
              : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
          }`}
        >
          All Years
        </button>
        {years.map(y => (
          <button
            key={y}
            onClick={() => setActiveYear(y)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeYear === y
                ? 'bg-[#731326] text-white shadow-sm'
                : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
            }`}
          >
            {y}
          </button>
        ))}
      </div>

      {/* Empty state */}
      {grouped.length === 0 && (
        <div className="text-center py-20 text-stone-400 dark:text-stone-500">
          <Images className="w-10 h-10 mx-auto mb-3 opacity-60" />
          <p className="text-sm font-medium">No photos in the gallery yet.</p>
          {canManage && <p className="text-xs mt-1">Use the Upload Photo button to add the first memory.</p>}
        </div>
      )}

      {/* Year Sections */}
      {grouped.map(({ year, photos }) => (
        <section key={year} className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#731326]/10 dark:bg-amber-950/40 text-[#731326] dark:text-amber-300 text-sm font-serif font-bold">
              <Calendar className="w-3.5 h-3.5" />
              {year}
            </span>
            <span className="text-[11px] text-stone-400 font-medium">{photos.length} photo{photos.length !== 1 ? 's' : ''}</span>
            <div className="flex-1 h-px bg-stone-200 dark:bg-stone-800" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {photos.map(p => (
              <div
                key={p.id}
                className="group rounded-3xl overflow-hidden bg-white dark:bg-[#1a0f12] border border-stone-200 dark:border-stone-800 shadow-sm hover:shadow-xl transition-all"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={p.url || "/placeholder.svg"}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <button
                    onClick={() => setLightbox(p)}
                    className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                    aria-label={`View ${p.title}`}
                  >
                    <Maximize2 className="w-8 h-8 text-white drop-shadow-md" />
                  </button>
                  <span className="absolute top-3 left-3 px-2 py-0.5 rounded text-[10px] font-bold bg-[#731326] text-amber-100 pointer-events-none">
                    {p.category}
                  </span>
                  <span className="absolute top-3 right-3 px-2 py-0.5 rounded text-[10px] font-mono bg-black/60 text-white pointer-events-none">
                    {p.date}
                  </span>

                  {canManage && (
                    <div className="absolute bottom-3 right-3 flex gap-1.5">
                      <button
                        onClick={() => openEdit(p)}
                        className="p-1.5 rounded-lg bg-white/90 text-[#731326] hover:bg-white shadow transition-colors"
                        aria-label={`Edit ${p.title}`}
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(p)}
                        className="p-1.5 rounded-lg bg-white/90 text-rose-600 hover:bg-white shadow transition-colors"
                        aria-label={`Delete ${p.title}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
                <div className="p-4 space-y-1 text-xs">
                  <h4 className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100 group-hover:text-[#731326] dark:group-hover:text-amber-300 transition-colors text-pretty">
                    {p.title}
                  </h4>
                  {p.caption && <p className="text-stone-500 text-[11px] line-clamp-2">{p.caption}</p>}
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* Lightbox */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md cursor-pointer"
        >
          <div className="relative max-w-4xl w-full" onClick={e => e.stopPropagation()}>
            <img
              src={lightbox.url || "/placeholder.svg"}
              alt={lightbox.title}
              className="w-full h-auto rounded-2xl shadow-2xl max-h-[80vh] object-contain mx-auto"
            />
            <div className="mt-3 text-center text-white">
              <h4 className="font-serif font-bold text-lg">{lightbox.title}</h4>
              {lightbox.caption && <p className="text-sm text-white/70 mt-1">{lightbox.caption}</p>}
              <p className="text-xs text-amber-300/80 mt-1 font-mono">
                {lightbox.category} · {lightbox.date}
              </p>
            </div>
            <button
              onClick={() => setLightbox(null)}
              className="absolute -top-10 right-0 text-white p-2 rounded-full hover:bg-white/20"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}

      {/* Add / Edit Modal */}
      {modalOpen && canManage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-white dark:bg-[#1a0f12] rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 dark:border-stone-800 sticky top-0 bg-white dark:bg-[#1a0f12]">
              <h3 className="font-serif font-bold text-lg text-[#731326] dark:text-amber-300">
                {editingId ? 'Edit Photo' : 'Upload New Photo'}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-lg text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Upload dropzone */}
              <div>
                <label className="block text-xs font-bold text-stone-600 dark:text-stone-300 mb-1.5">
                  Photo
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={e => handleFile(e.target.files?.[0])}
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full rounded-2xl border-2 border-dashed border-stone-300 dark:border-stone-700 hover:border-[#731326] dark:hover:border-amber-500 transition-colors overflow-hidden"
                >
                  {form.url ? (
                    <img src={form.url || "/placeholder.svg"} alt="Preview" className="w-full h-44 object-cover" />
                  ) : (
                    <div className="h-44 flex flex-col items-center justify-center text-stone-400 gap-2">
                      <Upload className="w-6 h-6" />
                      <span className="text-xs font-semibold">
                        {uploading ? 'Processing image…' : 'Click to select an image'}
                      </span>
                    </div>
                  )}
                </button>
                {form.url && (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="mt-1.5 text-[11px] font-semibold text-[#731326] dark:text-amber-400 hover:underline"
                  >
                    Replace image
                  </button>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-600 dark:text-stone-300 mb-1.5">
                  Title
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={e => setForm(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g. Buddha Purnima Peace Procession"
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-[#731326]/40"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-600 dark:text-stone-300 mb-1.5">
                    Category
                  </label>
                  <input
                    type="text"
                    value={form.category}
                    onChange={e => setForm(prev => ({ ...prev, category: e.target.value }))}
                    placeholder="e.g. Scholarship"
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-[#731326]/40"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-600 dark:text-stone-300 mb-1.5">
                    Date
                  </label>
                  <input
                    type="date"
                    value={form.date}
                    onChange={e => setForm(prev => ({ ...prev, date: e.target.value }))}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-[#731326]/40"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-600 dark:text-stone-300 mb-1.5">
                  Caption <span className="font-normal text-stone-400">(optional)</span>
                </label>
                <textarea
                  value={form.caption}
                  onChange={e => setForm(prev => ({ ...prev, caption: e.target.value }))}
                  rows={2}
                  placeholder="A short description of this activity."
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-[#731326]/40 resize-none"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl text-sm font-bold text-stone-600 dark:text-stone-300 border border-stone-300 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="flex-1 py-2.5 rounded-xl text-sm font-bold bg-[#731326] text-amber-100 hover:brightness-110 transition-all disabled:opacity-60"
                >
                  {editingId ? 'Save Changes' : 'Add to Gallery'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
