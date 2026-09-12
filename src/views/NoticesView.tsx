import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Bell,
  Search,
  Download,
  Pin,
  Calendar,
  Filter,
  PlusCircle,
  FileText,
  Share2
} from 'lucide-react';
import { Notice } from '../types';
import { exportToPrintablePDF } from '../utils/exportUtils';

export const NoticesView: React.FC = () => {
  const { notices, addNotice, language, activeRole } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);

  // New notice form state
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('General');
  const [newContent, setNewContent] = useState('');
  const [isPinned, setIsPinned] = useState(false);

  const categories = ['all', 'General', 'Scholarship', 'Events', 'Cultural', 'Academic'];

  const filteredNotices = notices.filter(n => {
    const matchSearch =
      !searchQuery.trim() ||
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.content.toLowerCase().includes(searchQuery.toLowerCase());

    const matchCategory = selectedCategory === 'all' || n.category.toLowerCase() === selectedCategory.toLowerCase();

    return matchSearch && matchCategory;
  });

  const handleCreateNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newContent) return;

    addNotice({
      title: newTitle,
      category: newCategory,
      content: newContent,
      pinned: isPinned,
      publishedBy: 'Executive Board, BSWA'
    });

    setShowAddModal(false);
    setNewTitle('');
    setNewContent('');
    setIsPinned(false);
  };

  const handleDownloadNotice = (notice: Notice) => {
    exportToPrintablePDF(`BSWA DUET Official Notice - ${notice.title}`, `notice-card-${notice.id}`);
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Page Header */}
      <div className="rounded-3xl bg-gradient-to-r from-[#6b1426] via-[#540d1a] to-[#36050e] text-white p-6 sm:p-10 shadow-lg border border-[#d4af37]/30 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-200 text-xs font-semibold">
            <Bell className="w-3.5 h-3.5" />
            <span>Official Communications Desk</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-4xl font-bold text-amber-100">
            Notices & Announcements
          </h1>
          <p className="text-xs sm:text-sm text-amber-100/80 max-w-xl">
            Official announcements from the Executive Committee, Academic Advisory Panel, and Scholarship Committee of BSWA DUET.
          </p>
        </div>

        {(activeRole === 'admin' || activeRole === 'executive') && (
          <button
            onClick={() => setShowAddModal(true)}
            className="px-5 py-3 rounded-2xl bg-[#d4af37] text-[#3a0610] font-bold text-xs hover:bg-amber-300 shadow-md transition-all flex items-center gap-2 flex-shrink-0"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Publish New Notice</span>
          </button>
        )}
      </div>

      {/* Search & Category Filter Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-[#1a0f12] border border-stone-200 dark:border-stone-800 shadow-sm flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search notices by keyword..."
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900"
          />
        </div>

        <div className="flex gap-1.5 overflow-x-auto w-full sm:w-auto">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-[#731326] text-white shadow-sm'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Notices List */}
      <div className="space-y-4">
        {filteredNotices.map(notice => (
          <div
            key={notice.id}
            id={`notice-card-${notice.id}`}
            className={`p-6 rounded-3xl bg-white dark:bg-[#1a0f12] border-2 transition-all shadow-sm space-y-3 ${
              notice.pinned
                ? 'border-amber-400/80 dark:border-amber-700/80 bg-gradient-to-r from-amber-50/40 to-transparent dark:from-amber-950/20'
                : 'border-stone-200 dark:border-stone-800'
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 dark:border-stone-800 pb-2.5">
              <div className="flex items-center gap-2">
                {notice.pinned && (
                  <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border border-rose-300">
                    <Pin className="w-3 h-3" />
                    <span>Pinned Announcement</span>
                  </span>
                )}
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-amber-100 dark:bg-amber-950 text-[#731326] dark:text-amber-300">
                  {notice.category}
                </span>
              </div>

              <div className="flex items-center gap-3 text-xs text-stone-400">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span className="font-mono">{notice.date}</span>
                </span>
                <button
                  onClick={() => handleDownloadNotice(notice)}
                  className="p-1 rounded-lg text-stone-500 hover:text-[#731326] dark:hover:text-amber-400 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                  title="Download notice as printable PDF"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div>
              <h3 className="font-serif font-bold text-base text-[#731326] dark:text-amber-300">
                {language === 'bn' && notice.titleBn ? notice.titleBn : notice.title}
              </h3>
              <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed mt-2 whitespace-pre-line">
                {notice.content}
              </p>
            </div>

            <div className="pt-2 flex items-center justify-between text-[11px] text-stone-400 border-t border-stone-100 dark:border-stone-800/60">
              <span>Published by: <strong>{notice.publishedBy || 'BSWA DUET Committee'}</strong></span>
              <span className="font-mono text-[10px]">Notice ID: #{notice.id.toUpperCase()}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Add Notice Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <form
            onSubmit={handleCreateNotice}
            className="w-full max-w-lg bg-white dark:bg-[#1a0f12] rounded-3xl p-6 border-2 border-[#731326] shadow-2xl space-y-4 text-xs"
          >
            <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-3">
              <h3 className="font-serif font-bold text-base text-[#731326] dark:text-amber-300">
                Publish Official Notice
              </h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="text-stone-400 hover:text-stone-700"
              >
                ✕
              </button>
            </div>

            <div>
              <label className="block font-semibold mb-1">Notice Title *</label>
              <input
                type="text"
                required
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                placeholder="e.g. Schedule for Buddha Purnima Sanghadana 2026"
                className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold mb-1">Category</label>
                <select
                  value={newCategory}
                  onChange={e => setNewCategory(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900"
                >
                  <option value="General">General</option>
                  <option value="Scholarship">Scholarship</option>
                  <option value="Events">Events</option>
                  <option value="Academic">Academic</option>
                  <option value="Cultural">Cultural</option>
                </select>
              </div>

              <div className="flex items-center gap-2 pt-6">
                <input
                  type="checkbox"
                  id="pin"
                  checked={isPinned}
                  onChange={e => setIsPinned(e.target.checked)}
                  className="rounded text-[#731326]"
                />
                <label htmlFor="pin" className="font-semibold text-stone-700 dark:text-stone-300">
                  Pin to Top
                </label>
              </div>
            </div>

            <div>
              <label className="block font-semibold mb-1">Notice Content *</label>
              <textarea
                rows={5}
                required
                value={newContent}
                onChange={e => setNewContent(e.target.value)}
                placeholder="Write the full text of the notice..."
                className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900"
              />
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="submit"
                className="flex-1 py-2.5 rounded-xl bg-[#731326] text-white font-bold hover:bg-[#800020]"
              >
                Publish Notice
              </button>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="py-2.5 px-4 rounded-xl border border-stone-300 dark:border-stone-700 text-stone-600 dark:text-stone-300 font-semibold"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
