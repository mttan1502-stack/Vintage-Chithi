import React, { useState, useMemo } from 'react';
import { POSTCARD_TEMPLATES } from '../data/postcards';
import { CATEGORIES } from '../data/categories';
import { PostcardTemplate } from '../types';
import { Search, Heart, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface PostcardsViewProps {
  onStartGenerator: (template: PostcardTemplate) => void;
  onToggleFavorite: (type: 'postcards' | 'quotes' | 'gallery', id: string) => void;
  isFavorite: (type: 'postcards' | 'quotes' | 'gallery', id: string) => boolean;
  initialCategory?: string;
}

export const PostcardsView: React.FC<PostcardsViewProps> = ({
  onStartGenerator,
  onToggleFavorite,
  isFavorite,
  initialCategory = 'all'
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const { language, t } = useLanguage();
  const isEn = language === 'en';

  const filteredPostcards = useMemo(() => {
    return POSTCARD_TEMPLATES.filter(card => {
      const matchesCategory = 
        selectedCategory === 'all' || 
        card.category === selectedCategory;

      const q = searchQuery.trim().toLowerCase();
      const matchesSearch = 
        !q || 
        card.title.toLowerCase().includes(q) || 
        (card.titleEn && card.titleEn.toLowerCase().includes(q)) ||
        card.category.toLowerCase().includes(q) ||
        card.defaultQuote.toLowerCase().includes(q) ||
        (card.defaultQuoteEn && card.defaultQuoteEn.toLowerCase().includes(q)) ||
        (card.descriptionBengali && card.descriptionBengali.toLowerCase().includes(q)) ||
        (card.descriptionEn && card.descriptionEn.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#201813] border border-[#c5a059]/30 text-xs text-[#d4af37]">
          <span>🖼️ {isEn ? 'Vintage Archives' : 'পোস্টকার্ড সংগ্রহশালা'}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold font-bengali-serif text-[#f4ecd8]">
          {t('postcardsHeaderTitle')}
        </h1>
        <p className="text-sm sm:text-base text-[#a89984] max-w-xl mx-auto font-bengali-sans">
          {t('postcardsHeaderSub')}
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#c5a059] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isEn ? "Search postcards... (name, mood, theme)" : "পোস্টকার্ড খুঁজুন... (নাম বা বিষয়বস্তু)"}
              className="w-full bg-[#18120e] border border-[#382b20] focus:border-[#c5a059]/60 rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#f4ecd8] placeholder-[#7d6f60] outline-none transition-colors"
            />
          </div>
        </div>

        {/* Categories Pills Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
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
      </div>

      {/* Count Info */}
      <div className="flex items-center justify-between text-xs text-[#8c7d6c] px-1 border-b border-[#251d16] pb-2">
        <span>{t('totalPostcardsCount')}: {filteredPostcards.length}</span>
        {selectedCategory !== 'all' && (
          <button
            onClick={() => setSelectedCategory('all')}
            className="text-[#c5a059] hover:underline"
          >
            {t('resetFilters')}
          </button>
        )}
      </div>

      {/* Postcards Grid */}
      {filteredPostcards.length === 0 ? (
        <div className="text-center py-16 bg-[#16110d] rounded-2xl border border-[#2d2218] p-8">
          <p className="text-base text-[#d8c7ad] font-bengali-sans">
            {isEn ? "No postcards found matching this filter." : "এই ফিল্টারে কোনো পোস্টকার্ড পাওয়া যায়নি।"}
          </p>
          <button
            onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
            className="mt-3 text-xs text-[#c5a059] hover:underline font-semibold"
          >
            {isEn ? "View all postcards" : "সব পোস্টকার্ড দেখুন"}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPostcards.map(card => {
            const isFav = isFavorite('postcards', card.id);
            const displayTitle = isEn ? (card.titleEn || card.title) : card.title;
            const displayQuote = isEn ? (card.defaultQuoteEn || card.defaultQuote) : card.defaultQuote;
            const displayDesc = isEn ? (card.descriptionEn || card.descriptionBengali) : card.descriptionBengali;

            return (
              <div
                key={card.id}
                className="group bg-[#18130f] border border-[#35281e] hover:border-[#c5a059]/60 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
              >
                {/* Artwork Canvas Thumbnail */}
                <div className="relative aspect-[3/2] overflow-hidden bg-[#241b14]">
                  <img
                    src={card.image}
                    alt={displayTitle}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

                  {/* Category badge */}
                  <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-sm border border-[#c5a059]/30 text-[10px] font-medium text-[#ebd9b7]">
                    {card.category}
                  </div>

                  {/* Favorite button */}
                  <button
                    onClick={() => onToggleFavorite('postcards', card.id)}
                    className={`absolute top-2.5 right-2.5 p-1.5 rounded-full backdrop-blur-md transition-colors ${
                      isFav
                        ? 'bg-[#83182b] text-white'
                        : 'bg-black/50 text-[#c2b3a1] hover:text-[#f4ecd8] hover:bg-black/70'
                    }`}
                    title={isFav ? (isEn ? 'Remove from favorites' : 'পছন্দ থেকে মুছুন') : (isEn ? 'Add to favorites' : 'পছন্দে যোগ করুন')}
                  >
                    <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
                  </button>

                  {/* Default Quote Preview on Artwork */}
                  <div className="absolute bottom-2.5 inset-x-3 text-center">
                    <p className="text-xs text-[#faebd7] font-bengali-serif italic line-clamp-2 drop-shadow-md">
                      “{displayQuote}”
                    </p>
                  </div>
                </div>

                {/* Card Meta & Use Action */}
                <div className="p-4 flex flex-col justify-between flex-1 gap-3">
                  <div>
                    <h3 className="text-sm font-semibold font-bengali-serif text-[#f4ecd8] group-hover:text-[#c5a059] transition-colors truncate">
                      {displayTitle}
                    </h3>
                    {displayDesc && (
                      <p className="text-[11px] text-[#8c7d6c] line-clamp-1 mt-0.5 font-bengali-sans">
                        {displayDesc}
                      </p>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => onStartGenerator(card)}
                    className="w-full py-2.5 px-3 bg-[#241c16] hover:bg-[#83182b] text-[#ebd9b7] hover:text-[#fbf6ec] text-xs font-semibold rounded-lg border border-[#48372a] hover:border-[#d4af37]/60 transition-all flex items-center justify-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
                    <span>{t('useDesign')}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
