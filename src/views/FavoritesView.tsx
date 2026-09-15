import React, { useState } from 'react';
import { POSTCARD_TEMPLATES } from '../data/postcards';
import { QUOTES } from '../data/quotes';
import { GALLERY_ITEMS } from '../data/gallery';
import { PostcardTemplate, Quote, GalleryItem } from '../types';
import { Heart, Sparkles, Download, Trash2, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface FavoritesViewProps {
  favorites: { postcards: string[]; quotes: string[]; gallery: string[] };
  onToggleFavorite: (type: 'postcards' | 'quotes' | 'gallery', id: string) => void;
  onStartGenerator: (template?: PostcardTemplate, quoteText?: string) => void;
  onDownloadGallery: (item: GalleryItem) => void;
}

export const FavoritesView: React.FC<FavoritesViewProps> = ({
  favorites,
  onToggleFavorite,
  onStartGenerator,
  onDownloadGallery
}) => {
  const [activeTab, setActiveTab] = useState<'postcards' | 'quotes' | 'gallery'>('postcards');
  const { language, t } = useLanguage();
  const isEn = language === 'en';

  const favoritePostcards = POSTCARD_TEMPLATES.filter(p => favorites.postcards.includes(p.id));
  const favoriteQuotes = QUOTES.filter(q => favorites.quotes.includes(q.id));
  const favoriteGallery = GALLERY_ITEMS.filter(g => favorites.gallery.includes(g.id));

  const totalCount = favoritePostcards.length + favoriteQuotes.length + favoriteGallery.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#201813] border border-[#c5a059]/30 text-xs text-[#d4af37]">
          <span>♡ {isEn ? 'Personal Keepsakes' : 'ব্যক্তিগত সংগ্রহ'}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold font-bengali-serif text-[#f4ecd8]">
          {isEn ? `My Favorites (${totalCount})` : `আমার পছন্দের তালিকা (${totalCount})`}
        </h1>
        <p className="text-sm text-[#a89984] max-w-lg mx-auto font-bengali-sans">
          {isEn 
            ? 'Your saved postcards, memorable quotes, and gallery keepsakes' 
            : 'আপনার সংরক্ষিত পোস্টকার্ড, মনের মতো উক্তি এবং গ্যালারি আর্টওয়ার্কসমূহ'}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center">
        <div className="inline-flex p-1 rounded-xl bg-[#18120e] border border-[#35281e]">
          <button
            onClick={() => setActiveTab('postcards')}
            className={`px-4 sm:px-6 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              activeTab === 'postcards'
                ? 'bg-[#83182b] text-[#fbf6ec] shadow-md border border-[#d4af37]/40'
                : 'text-[#a89984] hover:text-[#f4ecd8]'
            }`}
          >
            {isEn ? `Postcards (${favoritePostcards.length})` : `পোস্টকার্ড (${favoritePostcards.length})`}
          </button>
          <button
            onClick={() => setActiveTab('quotes')}
            className={`px-4 sm:px-6 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              activeTab === 'quotes'
                ? 'bg-[#83182b] text-[#fbf6ec] shadow-md border border-[#d4af37]/40'
                : 'text-[#a89984] hover:text-[#f4ecd8]'
            }`}
          >
            {isEn ? `Quotes (${favoriteQuotes.length})` : `উক্তি (${favoriteQuotes.length})`}
          </button>
          <button
            onClick={() => setActiveTab('gallery')}
            className={`px-4 sm:px-6 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              activeTab === 'gallery'
                ? 'bg-[#83182b] text-[#fbf6ec] shadow-md border border-[#d4af37]/40'
                : 'text-[#a89984] hover:text-[#f4ecd8]'
            }`}
          >
            {isEn ? `Gallery (${favoriteGallery.length})` : `গ্যালারি (${favoriteGallery.length})`}
          </button>
        </div>
      </div>

      {/* Content */}
      {activeTab === 'postcards' && (
        <div>
          {favoritePostcards.length === 0 ? (
            <EmptyFavoritesMessage
              text={isEn ? "No postcards added to your favorites yet." : "আপনার পছন্দের তালিকায় এখনও কোনো পোস্টকার্ড যোগ করা হয়নি।"}
              actionText={isEn ? "Browse Postcard Library" : "পোস্টকার্ড লাইব্রেরি ব্রাউজ করুন"}
              onAction={() => onStartGenerator()}
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoritePostcards.map(card => {
                const displayTitle = isEn ? (card.titleEn || card.title) : card.title;
                const displayQuote = isEn ? (card.defaultQuoteEn || card.defaultQuote) : card.defaultQuote;

                return (
                  <div
                    key={card.id}
                    className="bg-[#18130f] border border-[#35281e] rounded-xl overflow-hidden shadow-lg p-3 space-y-3"
                  >
                    <div className="relative aspect-[3/2] rounded-lg overflow-hidden">
                      <img src={card.image} alt={displayTitle} className="w-full h-full object-cover" />
                      <button
                        onClick={() => onToggleFavorite('postcards', card.id)}
                        className="absolute top-2 right-2 p-1.5 bg-[#83182b] text-white rounded-full shadow"
                        title={isEn ? "Remove" : "মুছুন"}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-[#ebd9b7] font-bengali-serif">{displayTitle}</h4>
                      <p className="text-xs text-[#998877] font-bengali-serif italic mt-1 line-clamp-1">“{displayQuote}”</p>
                    </div>
                    <button
                      onClick={() => onStartGenerator(card)}
                      className="w-full py-2 bg-[#241c16] hover:bg-[#83182b] text-[#ebd9b7] hover:text-white text-xs font-semibold rounded-lg border border-[#443326] transition-all flex items-center justify-center gap-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
                      <span>{t('createLetter')}</span>
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {activeTab === 'quotes' && (
        <div>
          {favoriteQuotes.length === 0 ? (
            <EmptyFavoritesMessage
              text={isEn ? "No quotes added to your favorites yet." : "আপনার পছন্দের তালিকায় এখনও কোনো উক্তি যোগ করা হয়নি।"}
              actionText={isEn ? "Browse Love Quotes" : "প্রেমের উক্তি সমগ্র দেখুন"}
              onAction={() => onStartGenerator()}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {favoriteQuotes.map(quote => {
                const displayQuote = isEn ? (quote.textEn || quote.text) : quote.text;
                const displayAuthor = isEn ? (quote.authorEn || quote.author) : quote.author;

                return (
                  <div
                    key={quote.id}
                    className="p-4 rounded-xl bg-[#18130f] border border-[#35281e] flex flex-col justify-between gap-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm sm:text-base font-bengali-serif text-[#ebd9b7] italic leading-relaxed">
                          “{displayQuote}”
                        </p>
                        {displayAuthor && (
                          <p className="text-xs text-[#c5a059] mt-1">
                            — {displayAuthor}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => onToggleFavorite('quotes', quote.id)}
                        className="text-[#83182b] hover:text-red-400 p-1"
                        title={isEn ? "Remove" : "মুছুন"}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-[#291f18]">
                      <span className="text-[10px] text-[#c5a059]">{quote.category}</span>
                      <button
                        onClick={() => onStartGenerator(undefined, displayQuote)}
                        className="px-3 py-1 bg-[#83182b] text-white text-xs rounded font-medium flex items-center gap-1"
                      >
                        <span>{t('useQuote')}</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {activeTab === 'gallery' && (
        <div>
          {favoriteGallery.length === 0 ? (
            <EmptyFavoritesMessage
              text={isEn ? "No gallery artworks added to your favorites yet." : "আপনার পছন্দের তালিকায় এখনও কোনো গ্যালারি আর্টওয়ার্ক যোগ করা হয়নি।"}
              actionText={isEn ? "Browse Vintage Gallery" : "ভিন্টেজ গ্যালারি দেখুন"}
              onAction={() => onStartGenerator()}
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoriteGallery.map(item => {
                const displayTitle = isEn ? (item.titleEn || item.title) : item.title;
                const displayQuote = isEn ? (item.quoteEn || item.quote) : item.quote;

                return (
                  <div
                    key={item.id}
                    className="bg-[#18130f] border border-[#35281e] rounded-xl overflow-hidden shadow-lg p-3 space-y-3"
                  >
                    <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                      <img src={item.image} alt={displayTitle} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-3 text-center">
                        <p className="text-xs text-[#faebd7] font-bengali-serif font-bold">“{displayQuote}”</p>
                      </div>
                      <button
                        onClick={() => onToggleFavorite('gallery', item.id)}
                        className="absolute top-2 right-2 p-1.5 bg-[#83182b] text-white rounded-full shadow"
                        title={isEn ? "Remove" : "মুছুন"}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-[#ebd9b7]">{displayTitle}</span>
                      <button
                        onClick={() => onDownloadGallery(item)}
                        className="px-3 py-1 bg-[#83182b] text-white text-xs font-semibold rounded flex items-center gap-1"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>{t('downloadBtn')}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const EmptyFavoritesMessage = ({ text, actionText, onAction }: { text: string; actionText: string; onAction: () => void }) => (
  <div className="text-center py-16 bg-[#16110d] rounded-2xl border border-[#2d2218] p-8 space-y-3">
    <div className="text-3xl text-[#83182b]">♡</div>
    <p className="text-sm text-[#d8c7ad] font-bengali-sans max-w-sm mx-auto">{text}</p>
    <button
      onClick={onAction}
      className="mt-2 text-xs text-[#c5a059] hover:underline font-semibold"
    >
      {actionText}
    </button>
  </div>
);
