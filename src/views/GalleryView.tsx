import React, { useState, useMemo } from 'react';
import { GALLERY_ITEMS } from '../data/gallery';
import { CATEGORIES } from '../data/categories';
import { GalleryItem } from '../types';
import { Heart, Download, Eye, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface GalleryViewProps {
  onDownloadItem: (item: GalleryItem) => void;
  onToggleFavorite: (type: 'postcards' | 'quotes' | 'gallery', id: string) => void;
  isFavorite: (type: 'postcards' | 'quotes' | 'gallery', id: string) => boolean;
}

export const GalleryView: React.FC<GalleryViewProps> = ({
  onDownloadItem,
  onToggleFavorite,
  isFavorite
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activePreview, setActivePreview] = useState<GalleryItem | null>(null);
  const { language, t } = useLanguage();
  const isEn = language === 'en';

  const filteredItems = useMemo(() => {
    if (selectedCategory === 'all') return GALLERY_ITEMS;
    return GALLERY_ITEMS.filter(g => g.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#201813] border border-[#c5a059]/30 text-xs text-[#d4af37]">
          <span>🖼️ {isEn ? 'Finished Masterpieces' : 'সমাপ্ত শিল্পকর্ম'}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold font-bengali-serif text-[#f4ecd8]">
          {t('galleryHeaderTitle')}
        </h1>
        <p className="text-sm sm:text-base text-[#a89984] max-w-xl mx-auto font-bengali-sans">
          {t('galleryHeaderSub')}
        </p>
      </div>

      {/* Category Pills */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map(cat => {
          const isSelected = (cat.slug === 'all' && selectedCategory === 'all') || cat.name === selectedCategory;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.slug === 'all' ? 'all' : cat.name)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 border ${
                isSelected
                  ? 'bg-[#83182b] text-[#fbf6ec] border-[#d4af37]/60 shadow-md'
                  : 'bg-[#1b1511] text-[#b5a695] border-[#36291e] hover:border-[#c5a059]/40 hover:text-[#f4ecd8]'
              }`}
            >
              <span>{cat.emoji}</span>
              <span>{isEn ? cat.nameEn : cat.name}</span>
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map(item => {
          const isFav = isFavorite('gallery', item.id);
          const displayTitle = isEn ? (item.titleEn || item.title) : item.title;
          const displayQuote = isEn ? (item.quoteEn || item.quote) : item.quote;

          return (
            <div
              key={item.id}
              className="group relative bg-[#18130f] border border-[#35281e] hover:border-[#c5a059]/60 rounded-xl overflow-hidden shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              {/* Image Container with Pre-rendered Typography Preview */}
              <div 
                className="relative aspect-[4/3] overflow-hidden bg-[#221812] cursor-pointer"
                onClick={() => setActivePreview(item)}
              >
                <img
                  src={item.image}
                  alt={displayTitle}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Vintage overlay tint */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/25 transition-colors" />

                {/* Inner Border */}
                <div className="absolute inset-3 border border-[#c5a059]/40 pointer-events-none" />

                {/* Center Quote Art Text */}
                <div className="absolute inset-6 flex flex-col items-center justify-center text-center p-4">
                  <div className="w-8 h-8 rounded-full border border-[#d4af37]/60 flex items-center justify-center text-xs mb-2 text-[#d4af37]">
                    💌
                  </div>
                  <p className="text-base sm:text-lg font-bengali-serif font-bold text-[#faebd7] leading-relaxed drop-shadow-lg">
                    “{displayQuote}”
                  </p>
                </div>

                {/* Favorite button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite('gallery', item.id);
                  }}
                  className={`absolute top-3 right-3 p-1.5 rounded-full backdrop-blur-md transition-colors ${
                    isFav
                      ? 'bg-[#83182b] text-white'
                      : 'bg-black/50 text-[#c2b3a1] hover:text-[#f4ecd8] hover:bg-black/70'
                  }`}
                  title={isFav ? (isEn ? 'Remove from favorites' : 'পছন্দ থেকে মুছুন') : (isEn ? 'Add to favorites' : 'পছন্দে যোগ করুন')}
                >
                  <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
                </button>

                {/* Category badge */}
                <div className="absolute bottom-3 left-3 px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm border border-[#c5a059]/30 text-[10px] text-[#ebd9b7]">
                  {item.category}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="p-3.5 bg-[#1a1410] border-t border-[#291f18] flex items-center justify-between gap-3">
                <span className="text-xs font-semibold text-[#ebd9b7] truncate font-bengali-serif">
                  {displayTitle}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActivePreview(item)}
                    className="p-1.5 text-[#a89984] hover:text-[#f4ecd8] rounded-lg hover:bg-white/5 transition-colors"
                    title={isEn ? "Preview enlarged" : "বড় করে দেখুন"}
                  >
                    <Eye className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onDownloadItem(item)}
                    className="px-3 py-1.5 bg-[#83182b] hover:bg-[#9c2037] text-[#fbf6ec] text-xs font-semibold rounded-lg shadow transition-all flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{t('downloadBtn')}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      {activePreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-xl bg-[#18130f] border border-[#c5a059]/50 rounded-xl overflow-hidden shadow-2xl p-4 sm:p-6">
            <button
              onClick={() => setActivePreview(null)}
              className="absolute top-4 right-4 text-[#a89984] hover:text-white p-1 rounded-full hover:bg-white/10"
              title={t('close')}
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-[#c5a059]/40 mb-4 bg-black">
              <img
                src={activePreview.image}
                alt={isEn ? (activePreview.titleEn || activePreview.title) : activePreview.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/45" />
              <div className="absolute inset-4 border border-[#c5a059]/50 pointer-events-none" />

              <div className="absolute inset-8 flex flex-col items-center justify-center text-center p-4">
                <span className="text-2xl mb-2 text-[#d4af37]">💌</span>
                <p className="text-lg sm:text-2xl font-bengali-serif font-bold text-[#faebd7] leading-relaxed drop-shadow-2xl">
                  “{isEn ? (activePreview.quoteEn || activePreview.quote) : activePreview.quote}”
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div>
                <h4 className="text-sm font-semibold font-bengali-serif text-[#ebd9b7]">
                  {isEn ? (activePreview.titleEn || activePreview.title) : activePreview.title}
                </h4>
                <span className="text-xs text-[#8c7d6c] font-bengali-sans">
                  {isEn ? 'Category: ' : 'ক্যাটাগরি: '}{activePreview.category}
                </span>
              </div>

              <button
                onClick={() => {
                  const item = activePreview;
                  setActivePreview(null);
                  onDownloadItem(item);
                }}
                className="px-5 py-2 bg-gradient-to-r from-[#83182b] to-[#a32238] text-white font-bold text-xs sm:text-sm rounded-lg shadow-lg flex items-center gap-2 border border-[#d4af37]/60"
              >
                <Download className="w-4 h-4" />
                <span>{isEn ? 'Proceed to Download' : 'ডাউনলোড গেট চালু করুন'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
