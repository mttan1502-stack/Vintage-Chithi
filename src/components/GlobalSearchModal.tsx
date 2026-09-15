import React, { useState, useMemo } from 'react';
import { POSTCARD_TEMPLATES } from '../data/postcards';
import { QUOTES } from '../data/quotes';
import { GALLERY_ITEMS } from '../data/gallery';
import { CATEGORIES } from '../data/categories';
import { PostcardTemplate, Quote, GalleryItem } from '../types';
import { Search, X, Layers, BookOpen, Image as ImageIcon, Sparkles, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPostcard: (template: PostcardTemplate) => void;
  onSelectQuote: (quote: Quote) => void;
  onSelectGallery: (item: GalleryItem) => void;
  onSelectCategory: (catName: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectPostcard,
  onSelectQuote,
  onSelectGallery,
  onSelectCategory
}) => {
  const [query, setQuery] = useState('');
  const { language, t } = useLanguage();
  const isEn = language === 'en';

  const cleanQuery = query.trim().toLowerCase();

  const results = useMemo(() => {
    if (!cleanQuery) {
      return {
        postcards: [],
        quotes: [],
        gallery: [],
        categories: []
      };
    }

    const matchedPostcards = POSTCARD_TEMPLATES.filter(p => 
      p.title.toLowerCase().includes(cleanQuery) ||
      (p.titleEn && p.titleEn.toLowerCase().includes(cleanQuery)) ||
      p.category.toLowerCase().includes(cleanQuery) ||
      p.defaultQuote.toLowerCase().includes(cleanQuery) ||
      (p.defaultQuoteEn && p.defaultQuoteEn.toLowerCase().includes(cleanQuery)) ||
      (p.descriptionBengali && p.descriptionBengali.toLowerCase().includes(cleanQuery)) ||
      (p.descriptionEn && p.descriptionEn.toLowerCase().includes(cleanQuery))
    );

    const matchedQuotes = QUOTES.filter(q =>
      q.text.toLowerCase().includes(cleanQuery) ||
      (q.textEn && q.textEn.toLowerCase().includes(cleanQuery)) ||
      q.category.toLowerCase().includes(cleanQuery) ||
      (q.author && q.author.toLowerCase().includes(cleanQuery)) ||
      (q.authorEn && q.authorEn.toLowerCase().includes(cleanQuery)) ||
      (q.authorRole && q.authorRole.toLowerCase().includes(cleanQuery)) ||
      (q.authorRoleEn && q.authorRoleEn.toLowerCase().includes(cleanQuery))
    );

    const matchedGallery = GALLERY_ITEMS.filter(g =>
      g.title.toLowerCase().includes(cleanQuery) ||
      (g.titleEn && g.titleEn.toLowerCase().includes(cleanQuery)) ||
      g.quote.toLowerCase().includes(cleanQuery) ||
      (g.quoteEn && g.quoteEn.toLowerCase().includes(cleanQuery)) ||
      g.category.toLowerCase().includes(cleanQuery)
    );

    const matchedCategories = CATEGORIES.filter(c =>
      c.name.toLowerCase().includes(cleanQuery) ||
      c.nameEn.toLowerCase().includes(cleanQuery) ||
      c.slug.toLowerCase().includes(cleanQuery)
    );

    return {
      postcards: matchedPostcards,
      quotes: matchedQuotes,
      gallery: matchedGallery,
      categories: matchedCategories
    };
  }, [cleanQuery]);

  if (!isOpen) return null;

  const totalResults = results.postcards.length + results.quotes.length + results.gallery.length + results.categories.length;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-2xl bg-[#17120e] border border-[#c5a059]/40 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        style={{
          boxShadow: '0 25px 60px rgba(0,0,0,0.9), inset 0 1px 1px rgba(212,175,55,0.2)'
        }}
      >
        {/* Search Input Bar */}
        <div className="relative p-4 sm:p-5 border-b border-[#2c221a] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#c5a059] flex-shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={isEn ? "Search quotes, poets, or postcards... (e.g. Ghalib, Faridi, Rain, Love)" : "উক্তি বা পোস্টকার্ড খুঁজুন... (যেমন: গালিব, ফরীদি, বৃষ্টি, বিরহ, স্মৃতি, প্রেম)"}
            autoFocus
            className="w-full bg-transparent text-[#f4ecd8] placeholder-[#7d6e5d] text-base sm:text-lg outline-none font-bengali-sans"
          />
          {query ? (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-[#8c7d6c] hover:text-[#f4ecd8] rounded-full hover:bg-white/5"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={onClose}
              className="p-1 text-[#8c7d6c] hover:text-[#f4ecd8] rounded-full hover:bg-white/5 text-xs font-mono"
            >
              ESC
            </button>
          )}
        </div>

        {/* Search Results Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {!cleanQuery ? (
            <div className="text-center py-10 space-y-3">
              <div className="text-3xl">💌</div>
              <p className="text-sm text-[#a89984] font-bengali-sans">
                {isEn 
                  ? "Type to search vintage postcards, romantic quotes, poets, or gallery art..." 
                  : "পোস্টকার্ড, রোমান্টিক উক্তি, কবি, ক্যাটাগরি বা গ্যালারি আর্ট খুঁজতে টাইপ করুন..."}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                {(isEn 
                  ? ['Rain', 'Love Letter', 'Missing You', 'Ghalib', 'Faridi', 'Memories']
                  : ['বৃষ্টি', 'প্রেমপত্র', 'মিস করা', 'গালিব', 'ফরীদি', 'বিরহ', 'স্মৃতি']
                ).map(tag => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-2.5 py-1 text-xs rounded-full bg-[#241c16] text-[#c5a059] border border-[#3e2e22] hover:border-[#c5a059]/50 transition-colors"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>
          ) : totalResults === 0 ? (
            <div className="text-center py-12 text-[#8c7d6c]">
              <p className="text-base font-bengali-sans">
                {isEn ? `No results found for “${query}”.` : `“${query}” দিয়ে কোনো ফলাফল পাওয়া যায়নি।`}
              </p>
              <p className="text-xs mt-1">
                {isEn ? "Try searching for a poet, category, or emotion." : "অন্য কোনো শব্দ বা ক্যাটাগরি দিয়ে চেষ্টা করুন।"}
              </p>
            </div>
          ) : (
            <>
              {/* Matched Categories */}
              {results.categories.length > 0 && (
                <div>
                  <h4 className="text-xs font-cinzel text-[#d4af37] tracking-wider uppercase mb-2.5 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{isEn ? `Categories (${results.categories.length})` : `ক্যাটাগরি (${results.categories.length})`}</span>
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {results.categories.map(cat => (
                      <button
                        key={cat.id}
                        onClick={() => {
                          onSelectCategory(cat.name);
                          onClose();
                        }}
                        className="px-3 py-1.5 rounded-lg bg-[#251d17] hover:bg-[#34271e] text-xs text-[#ebd9b7] border border-[#423124] flex items-center gap-1.5 transition-all"
                      >
                        <span>{cat.emoji}</span>
                        <span>{isEn ? cat.nameEn : cat.name}</span>
                        <ArrowRight className="w-3 h-3 text-[#c5a059]" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Matched Postcards */}
              {results.postcards.length > 0 && (
                <div>
                  <h4 className="text-xs font-cinzel text-[#d4af37] tracking-wider uppercase mb-2.5 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5" />
                    <span>{isEn ? `Postcard Designs (${results.postcards.length})` : `পোস্টকার্ড ডিজাইন (${results.postcards.length})`}</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {results.postcards.map(postcard => (
                      <div
                        key={postcard.id}
                        onClick={() => {
                          onSelectPostcard(postcard);
                          onClose();
                        }}
                        className="group flex gap-3 p-2.5 rounded-lg bg-[#201813] hover:bg-[#2b2019] border border-[#392a1f] hover:border-[#c5a059]/60 cursor-pointer transition-all"
                      >
                        <div 
                          className="w-16 h-12 rounded bg-cover bg-center flex-shrink-0 border border-[#48372a]"
                          style={{ backgroundImage: `url(${postcard.image})` }}
                        />
                        <div className="min-w-0 flex-1 flex flex-col justify-between">
                          <div className="text-xs font-semibold text-[#f4ecd8] group-hover:text-[#c5a059] truncate">
                            {isEn ? (postcard.titleEn || postcard.title) : postcard.title}
                          </div>
                          <div className="text-[11px] text-[#998877] truncate font-bengali-sans">
                            {isEn ? (postcard.defaultQuoteEn || postcard.defaultQuote) : postcard.defaultQuote}
                          </div>
                          <div className="text-[9px] text-[#c5a059] uppercase font-mono">
                            {postcard.category}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Matched Quotes */}
              {results.quotes.length > 0 && (
                <div>
                  <h4 className="text-xs font-cinzel text-[#d4af37] tracking-wider uppercase mb-2.5 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>{isEn ? `Quotes (${results.quotes.length})` : `প্রেমের উক্তি (${results.quotes.length})`}</span>
                  </h4>
                  <div className="space-y-2">
                    {results.quotes.map(quote => (
                      <div
                        key={quote.id}
                        onClick={() => {
                          onSelectQuote(quote);
                          onClose();
                        }}
                        className="p-3 rounded-lg bg-[#201813] hover:bg-[#2b2019] border border-[#392a1f] hover:border-[#c5a059]/60 cursor-pointer transition-all flex items-start justify-between gap-3"
                      >
                        <div>
                          <p className="text-xs sm:text-sm text-[#ebd9b7] font-bengali-serif leading-relaxed">
                            “{isEn ? (quote.textEn || quote.text) : quote.text}”
                          </p>
                          {(quote.author || quote.authorEn) && (
                            <span className="text-[10px] text-[#c5a059] mt-1 block">
                              — {isEn ? (quote.authorEn || quote.author) : quote.author}
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-[#83182b]/30 text-[#e68a98] border border-[#83182b]/50 whitespace-nowrap flex-shrink-0">
                          {t('useQuote')}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Matched Gallery Items */}
              {results.gallery.length > 0 && (
                <div>
                  <h4 className="text-xs font-cinzel text-[#d4af37] tracking-wider uppercase mb-2.5 flex items-center gap-1.5">
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span>{isEn ? `Vintage Gallery (${results.gallery.length})` : `ভিন্টেজ গ্যালারি (${results.gallery.length})`}</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {results.gallery.map(item => (
                      <div
                        key={item.id}
                        onClick={() => {
                          onSelectGallery(item);
                          onClose();
                        }}
                        className="group flex gap-3 p-2.5 rounded-lg bg-[#201813] hover:bg-[#2b2019] border border-[#392a1f] hover:border-[#c5a059]/60 cursor-pointer transition-all"
                      >
                        <div 
                          className="w-14 h-14 rounded bg-cover bg-center flex-shrink-0 border border-[#48372a]"
                          style={{ backgroundImage: `url(${item.image})` }}
                        />
                        <div className="min-w-0 flex-1 flex flex-col justify-center">
                          <div className="text-xs font-semibold text-[#f4ecd8] group-hover:text-[#c5a059] truncate">
                            {isEn ? (item.titleEn || item.title) : item.title}
                          </div>
                          <div className="text-[10px] text-[#a89984] line-clamp-2">
                            {isEn ? (item.quoteEn || item.quote) : item.quote}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-[#120d0a] border-t border-[#251c16] text-[11px] text-[#7d6f60] flex items-center justify-between">
          <span>{isEn ? "Click any item to open or use directly" : "দ্রুত নির্বাচন করতে কোনো আইটেমে ক্লিক করুন"}</span>
          <button 
            onClick={onClose}
            className="text-[#c5a059] hover:underline"
          >
            {t('close')}
          </button>
        </div>
      </div>
    </div>
  );
};
