import React, { useState, useMemo } from 'react';
import { QUOTES } from '../data/quotes';
import { CATEGORIES } from '../data/categories';
import { Quote } from '../types';
import { Search, Heart, Sparkles, Copy, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface QuotesViewProps {
  onUseQuote: (quoteText: string) => void;
  onToggleFavorite: (type: 'postcards' | 'quotes' | 'gallery', id: string) => void;
  isFavorite: (type: 'postcards' | 'quotes' | 'gallery', id: string) => boolean;
}

const PROMINENT_POETS = [
  { name: 'সকল উক্তি', nameEn: 'All Quotes', author: 'all', emoji: '✨' },
  { name: 'হুমায়ুন ফরীদি', nameEn: 'Humayun Faridi', author: 'হুমায়ুন ফরীদি', emoji: '🎭' },
  { name: 'মির্জা গালিব', nameEn: 'Mirza Ghalib', author: 'মির্জা গালিব', emoji: '✒️' },
  { name: 'মির তকি মির', nameEn: 'Mir Taqi Mir', author: 'মির তকি মির', emoji: '📜' },
  { name: 'ফয়েজ আহমেদ ফয়েজ', nameEn: 'Faiz Ahmed Faiz', author: 'ফয়েজ আহমেদ ফয়েজ', emoji: '🌹' },
  { name: 'কাজী নজরুল ইসলাম', nameEn: 'Kazi Nazrul Islam', author: 'কাজী নজরুল ইসলাম', emoji: '🪶' },
  { name: 'হাফেজ শিরাজী', nameEn: 'Hafez Shirazi', author: 'হাফেজ শিরাজী', emoji: '🌙' },
];

export const QuotesView: React.FC<QuotesViewProps> = ({
  onUseQuote,
  onToggleFavorite,
  isFavorite
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedAuthor, setSelectedAuthor] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { language, t } = useLanguage();
  const isEn = language === 'en';

  const filteredQuotes = useMemo(() => {
    return QUOTES.filter(q => {
      const matchesCategory = selectedCategory === 'all' || q.category === selectedCategory;
      const matchesAuthor = selectedAuthor === 'all' || q.author === selectedAuthor;
      const cleanQ = searchQuery.trim().toLowerCase();
      const matchesSearch = 
        !cleanQ || 
        q.text.toLowerCase().includes(cleanQ) || 
        (q.textEn && q.textEn.toLowerCase().includes(cleanQ)) || 
        q.category.toLowerCase().includes(cleanQ) ||
        (q.author && q.author.toLowerCase().includes(cleanQ)) ||
        (q.authorEn && q.authorEn.toLowerCase().includes(cleanQ)) ||
        (q.authorRole && q.authorRole.toLowerCase().includes(cleanQ)) ||
        (q.authorRoleEn && q.authorRoleEn.toLowerCase().includes(cleanQ));
      return matchesCategory && matchesAuthor && matchesSearch;
    });
  }, [selectedCategory, selectedAuthor, searchQuery]);

  const handleCopy = (quote: Quote) => {
    const textToCopy = isEn ? (quote.textEn || quote.text) : quote.text;
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(quote.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#201813] border border-[#c5a059]/30 text-xs text-[#d4af37]">
          <span>📖 {isEn ? 'Classic Love Quotes & Ghazal Archive' : 'প্রেমের উক্তি ও গজল ভাণ্ডার'}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold font-bengali-serif text-[#f4ecd8]">
          {t('quotesHeaderTitle')}
        </h1>
        <p className="text-sm sm:text-base text-[#a89984] max-w-xl mx-auto font-bengali-sans">
          {t('quotesHeaderSub')}
        </p>
      </div>

      {/* Search and Category Filter */}
      <div className="space-y-4">
        <div className="relative max-w-xl mx-auto">
          <Search className="w-4 h-4 text-[#c5a059] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isEn ? "Search quotes or poets... (e.g. Ghalib, Faridi, Rain, Longing)" : "উক্তি বা কবি খুঁজুন... (যেমন: গালিব, ফরীদি, নজরুল, বিরহ, বৃষ্টি)"}
            className="w-full bg-[#18120e] border border-[#382b20] focus:border-[#c5a059]/60 rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#f4ecd8] placeholder-[#7d6f60] outline-none transition-colors"
          />
        </div>

        {/* Featured Poets / Figures Filter */}
        <div className="space-y-1.5">
          <div className="text-center text-[11px] text-[#c5a059] font-medium tracking-wide">
            {t('featuredPoets')}
          </div>
          <div className="flex items-center justify-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {PROMINENT_POETS.map(poet => {
              const isSelected = selectedAuthor === poet.author;
              return (
                <button
                  key={poet.author}
                  onClick={() => {
                    setSelectedAuthor(poet.author);
                    if (poet.author !== 'all') {
                      setSelectedCategory('all');
                    }
                  }}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 border ${
                    isSelected
                      ? 'bg-[#83182b] text-[#fbf6ec] border-[#d4af37] shadow-lg scale-105'
                      : 'bg-[#1e1712] text-[#d6c7b2] border-[#443326] hover:border-[#c5a059] hover:text-[#fbf6ec]'
                  }`}
                >
                  <span>{poet.emoji}</span>
                  <span>{isEn ? poet.nameEn : poet.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none pt-1">
          {CATEGORIES.map(cat => {
            const isSelected = (cat.slug === 'all' && selectedCategory === 'all') || cat.name === selectedCategory;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.slug === 'all' ? 'all' : cat.name);
                  if (cat.slug !== 'all') {
                    setSelectedAuthor('all');
                  }
                }}
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

      {/* Quotes Count */}
      <div className="flex items-center justify-between text-xs text-[#8c7d6c] px-1 border-b border-[#251d16] pb-2">
        <span>{t('totalQuotesCount')}: {filteredQuotes.length}</span>
        {(selectedCategory !== 'all' || selectedAuthor !== 'all' || searchQuery) && (
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSelectedAuthor('all');
              setSearchQuery('');
            }}
            className="text-[#c5a059] hover:underline"
          >
            {t('resetFilters')}
          </button>
        )}
      </div>

      {/* Quotes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredQuotes.map(quote => {
          const isFav = isFavorite('quotes', quote.id);
          const isCopied = copiedId === quote.id;
          const displayQuoteText = isEn ? (quote.textEn || quote.text) : quote.text;
          const displayAuthor = isEn ? (quote.authorEn || quote.author) : quote.author;
          const displayRole = isEn ? (quote.authorRoleEn || quote.authorRole) : quote.authorRole;

          return (
            <div
              key={quote.id}
              className="relative p-5 rounded-xl bg-[#18130f] border border-[#35281e] hover:border-[#c5a059]/60 shadow-lg hover:shadow-2xl transition-all flex flex-col justify-between gap-4 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#241c16] text-[#c5a059] border border-[#3e2e22] font-medium">
                    {quote.category}
                  </span>

                  <div className="flex items-center gap-1">
                    {/* Copy Button */}
                    <button
                      onClick={() => handleCopy(quote)}
                      className="p-1.5 text-[#8c7d6c] hover:text-[#f4ecd8] rounded-full hover:bg-white/5 transition-colors"
                      title={isEn ? "Copy quote" : "উক্তিটি কপি করুন"}
                    >
                      {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>

                    {/* Favorite Button */}
                    <button
                      onClick={() => onToggleFavorite('quotes', quote.id)}
                      className={`p-1.5 rounded-full transition-colors ${
                        isFav ? 'text-[#83182b]' : 'text-[#8c7d6c] hover:text-[#f4ecd8]'
                      }`}
                      title={isFav ? (isEn ? 'Remove from favorites' : 'পছন্দ থেকে মুছুন') : (isEn ? 'Add to favorites' : 'পছন্দে যোগ করুন')}
                    >
                      <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-[#ebd9b7] font-bengali-serif leading-relaxed italic">
                  “{displayQuoteText}”
                </p>

                {displayAuthor && (
                  <div className="text-right pt-1 border-t border-[#2a2018]/50">
                    <p className="text-xs font-semibold text-[#c5a059] font-bengali-serif">
                      — {displayAuthor}
                    </p>
                    {displayRole && (
                      <p className="text-[10px] text-[#8c7d6c] font-bengali-sans">
                        ({displayRole})
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Action */}
              <button
                onClick={() => onUseQuote(displayQuoteText)}
                className="w-full py-2 px-3 bg-[#241c16] group-hover:bg-[#83182b] text-[#ebd9b7] group-hover:text-[#fbf6ec] text-xs font-semibold rounded-lg border border-[#48372a] group-hover:border-[#d4af37]/60 transition-all flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#c5a059] group-hover:text-[#ffd700]" />
                <span>{t('useInLetter')}</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
