import React from 'react';
import { PostcardTemplate, Quote, CustomizationState } from '../types';
import { CATEGORIES } from '../data/categories';
import { POSTCARD_TEMPLATES } from '../data/postcards';
import { PostcardCanvas } from '../components/PostcardCanvas';
import { Sparkles, Heart, ArrowRight, BookOpen } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface HomeProps {
  onStartGenerator: (template?: PostcardTemplate, quoteText?: string) => void;
  onExploreGallery: () => void;
  onSelectCategory: (categoryName: string) => void;
  onToggleFavorite: (type: 'postcards' | 'quotes' | 'gallery', id: string) => void;
  isFavorite: (type: 'postcards' | 'quotes' | 'gallery', id: string) => boolean;
}

export const Home: React.FC<HomeProps> = ({
  onStartGenerator,
  onExploreGallery,
  onSelectCategory,
  onToggleFavorite,
  isFavorite
}) => {
  const { language, t } = useLanguage();
  const isEn = language === 'en';

  // Hero postcard preview state
  const heroTemplate = POSTCARD_TEMPLATES[0];
  const heroCustomization: CustomizationState = {
    recipient: isEn ? 'Dearest,' : 'প্রিয়তমা,',
    message: isEn 
      ? 'When I think of you, even the falling rain turns into a gentle letter. Untold feelings linger quietly in the heart...' 
      : 'তোমার কথা মনে পড়লে বৃষ্টিও যেন চিঠি হয়ে নামে। কত কথা জমে আছে হৃদয়ের আঙিনায়...',
    sender: isEn ? 'Yours faithfully,' : 'তোমার চিরকালের,',
    date: isEn ? 'Monsoon, 1978' : 'আষাঢ়, ১৩৭৮',
    fontFamily: isEn ? 'playfair' : 'bengali-serif',
    fontSize: 20,
    isBold: false,
    isItalic: false,
    textAlign: 'center',
    letterSpacing: 0.5,
    lineHeight: 1.8,
    textColor: '#faebd7',
    textPosition: 'center',
    vintageEffect: 'sepia',
    aspectRatio: 'postcard',
    showStamp: true,
    stampType: 'rose',
    borderStyle: 'vintage',
    paperTone: 'antique-sepia',
    backgroundOverlayOpacity: 0.45
  };

  // Filter collections
  const popularTemplates = POSTCARD_TEMPLATES.filter(p => p.collection === 'popular').slice(0, 4);
  const newTemplates = POSTCARD_TEMPLATES.filter(p => p.collection === 'new').slice(0, 4);
  const romanticTemplates = POSTCARD_TEMPLATES.filter(p => p.category === 'রোমান্টিক' || p.category === 'প্রেম' || p.collection === 'romantic').slice(0, 4);
  const rainyTemplates = POSTCARD_TEMPLATES.filter(p => p.category === 'বৃষ্টি' || p.collection === 'rainy').slice(0, 4);
  const letterTemplates = POSTCARD_TEMPLATES.filter(p => p.category === 'প্রেমপত্র' || p.collection === 'letter').slice(0, 4);

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-8 sm:pt-14 pb-12 sm:pb-16 border-b border-[#291f18]">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-[#83182b]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-[#c5a059]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#201813] border border-[#c5a059]/30 text-xs sm:text-sm text-[#d4af37] shadow-sm">
                <span className="text-base">💌</span>
                <span className="font-bengali-sans font-medium">Vintage Chithi – {isEn ? 'Post Office of Love' : 'ভালোবাসার ডাকঘর'}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-bengali-serif text-[#f4ecd8] tracking-tight leading-[1.25] sm:leading-[1.2]">
                {isEn ? (
                  <>
                    “Vintage Emotions,<br className="hidden sm:inline" />
                    <span className="text-[#e29578] font-normal italic"> for Today’s Love.”</span>
                  </>
                ) : (
                  <>
                    “পুরনো দিনের অনুভূতি,<br className="hidden sm:inline" />
                    <span className="text-[#e29578] font-normal italic"> আজকের ভালোবাসার জন্য।”</span>
                  </>
                )}
              </h1>

              <p className="text-base sm:text-xl text-[#c4b39e] max-w-xl mx-auto lg:mx-0 font-bengali-sans leading-relaxed">
                {t('heroSub')}
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={() => onStartGenerator()}
                  className="w-full sm:w-auto px-7 py-3.5 bg-gradient-to-r from-[#83182b] to-[#a32036] hover:from-[#961c31] hover:to-[#b6243d] text-[#fbf6ec] font-bold text-base rounded-xl border border-[#d4af37]/60 shadow-xl hover:shadow-2xl transition-all active:scale-[0.98] flex items-center justify-center gap-2.5"
                >
                  <Sparkles className="w-5 h-5 text-[#ffd700]" />
                  <span>✨ {t('heroBtnStart')}</span>
                </button>

                <button
                  onClick={onExploreGallery}
                  className="w-full sm:w-auto px-6 py-3.5 bg-[#1e1712] hover:bg-[#2a2019] text-[#ebd9b7] font-medium text-base rounded-xl border border-[#443326] hover:border-[#c5a059]/50 shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <span>🖼️ {t('heroBtnGallery')}</span>
                  <ArrowRight className="w-4 h-4 text-[#c5a059]" />
                </button>
              </div>

              {/* Badges / Guarantees */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-5 text-xs text-[#998774]">
                <div className="flex items-center gap-1.5">
                  <span className="text-[#c5a059]">✦</span>
                  <span>{t('badgeNoWatermark')}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[#c5a059]">✦</span>
                  <span>{t('badgeUltraHd')}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[#c5a059]">✦</span>
                  <span>{t('badgeVintageFeel')}</span>
                </div>
              </div>
            </div>

            {/* Right: Realistic Vintage Postcard Preview Display */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md group">
                {/* Stamp Envelope effect background */}
                <div className="absolute -inset-2 bg-gradient-to-r from-[#c5a059]/20 to-[#83182b]/20 rounded-2xl blur-lg opacity-70 group-hover:opacity-100 transition-opacity" />

                <div className="relative bg-[#16110d] p-3 sm:p-4 rounded-xl border border-[#c5a059]/40 shadow-2xl">
                  {/* Decorative badge */}
                  <div className="absolute -top-3 -right-3 z-30 px-3 py-1 bg-[#83182b] text-[#fbf6ec] text-[11px] font-bold rounded-full border border-[#d4af37]/60 shadow-lg flex items-center gap-1 rotate-3">
                    <span>{isEn ? 'Live Postcard' : 'লাইভ পোস্টকার্ড'}</span>
                  </div>

                  <PostcardCanvas 
                    template={heroTemplate} 
                    state={heroCustomization}
                    className="w-full rounded-lg"
                  />

                  <div className="mt-3 flex items-center justify-between px-1">
                    <span className="text-xs text-[#998774] font-bengali-sans">
                      {isEn ? 'Design: ' : 'ডিজাইন: '} {isEn ? (heroTemplate.titleEn || heroTemplate.title) : heroTemplate.title}
                    </span>
                    <button
                      onClick={() => onStartGenerator(heroTemplate)}
                      className="text-xs text-[#c5a059] hover:text-[#e8d7be] font-semibold flex items-center gap-1 transition-colors"
                    >
                      <span>{isEn ? 'Write on this' : 'এটিতে লিখুন'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CATEGORIES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-cinzel text-[#d4af37] tracking-wider uppercase mb-2">
            <span>{isEn ? 'Category Archives' : 'ক্যাটাগরি আর্চাইভ'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold font-bengali-serif text-[#ebd9b7]">
            {t('chooseCategoryTitle')}
          </h2>
          <div className="h-0.5 w-16 bg-[#c5a059]/40 mx-auto my-3 rounded-full" />
          <p className="text-sm text-[#a89984] max-w-lg mx-auto font-bengali-sans">
            {t('chooseCategorySub')}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
          {CATEGORIES.slice(1).map(cat => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.name)}
              className="group p-3.5 sm:p-4 rounded-xl bg-[#1a1410] hover:bg-[#271d16] border border-[#382b20] hover:border-[#c5a059]/60 shadow-md hover:shadow-lg transition-all text-center flex flex-col items-center justify-center gap-2 active:scale-[0.97]"
            >
              <span className="text-2xl sm:text-3xl transition-transform group-hover:scale-125">
                {cat.emoji}
              </span>
              <span className="text-xs sm:text-sm font-medium font-bengali-sans text-[#ebd9b7] group-hover:text-[#f4ecd8] whitespace-nowrap">
                {isEn ? cat.nameEn : cat.name}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* 3. HOMEPAGE COLLECTIONS */}
      {/* 3.1 🔥 জনপ্রিয় পোস্টকার্ড */}
      <CollectionSection
        title={isEn ? "🔥 Popular Postcards" : "🔥 জনপ্রিয় পোস্টকার্ড"}
        subtitle={isEn ? "Most cherished and widely sent vintage letters of affection" : "সবচেয়ে বেশি পাঠানো ও ভালোবাসায় সিক্ত ভিন্টেজ চিঠিগুলো"}
        templates={popularTemplates.length > 0 ? popularTemplates : POSTCARD_TEMPLATES.slice(0, 4)}
        onStartGenerator={onStartGenerator}
        onToggleFavorite={onToggleFavorite}
        isFavorite={isFavorite}
      />

      {/* 3.2 ✨ নতুন পোস্টকার্ড */}
      <CollectionSection
        title={isEn ? "✨ New Postcards" : "✨ নতুন পোস্টকার্ড"}
        subtitle={isEn ? "Freshly curated rare vintage borders and archival art" : "সদ্য যুক্ত হওয়া দুর্লভ ক্লাসিক পোস্টকার্ড ফ্রেম ও নকশা"}
        templates={newTemplates.length > 0 ? newTemplates : POSTCARD_TEMPLATES.slice(4, 8)}
        onStartGenerator={onStartGenerator}
        onToggleFavorite={onToggleFavorite}
        isFavorite={isFavorite}
      />

      {/* 3.3 ❤️ Romantic Collection */}
      <CollectionSection
        title={isEn ? "❤️ Romantic Collection" : "❤️ Romantic Collection"}
        subtitle={isEn ? "Timeless melodies of devotion and love keepsakes" : "গভীর অনুরাগের রঙিন সুর ও চিরন্তন প্রেমের স্মারক"}
        templates={romanticTemplates.length > 0 ? romanticTemplates : POSTCARD_TEMPLATES.slice(8, 12)}
        onStartGenerator={onStartGenerator}
        onToggleFavorite={onToggleFavorite}
        isFavorite={isFavorite}
      />

      {/* 3.4 🌧️ Rainy Love Collection */}
      <CollectionSection
        title={isEn ? "🌧️ Rainy Love Collection" : "🌧️ Rainy Love Collection"}
        subtitle={isEn ? "Monsoon droplets, lone window sills, and unspoken rain epistles" : "বৃষ্টিভেজা মন, একলা জানালা ও শ্রাবণের না-বলা চিঠি"}
        templates={rainyTemplates.length > 0 ? rainyTemplates : POSTCARD_TEMPLATES.filter(p => p.category === 'বৃষ্টি')}
        onStartGenerator={onStartGenerator}
        onToggleFavorite={onToggleFavorite}
        isFavorite={isFavorite}
      />

      {/* 3.5 💌 Vintage Letter Collection */}
      <CollectionSection
        title={isEn ? "💌 Vintage Letter Collection" : "💌 Vintage Letter Collection"}
        subtitle={isEn ? "Aged envelopes, quill ink, and retro post office nostalgia" : "হলুদ খাম, দোয়াত-কলম ও রেট্রো ডাকঘরের পরম নস্টালজিয়া"}
        templates={letterTemplates.length > 0 ? letterTemplates : POSTCARD_TEMPLATES.filter(p => p.category === 'প্রেমপত্র')}
        onStartGenerator={onStartGenerator}
        onToggleFavorite={onToggleFavorite}
        isFavorite={isFavorite}
      />

      {/* 4. INSPIRATIONAL QUOTE SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#1b140f] via-[#241a14] to-[#1b140f] border border-[#c5a059]/30 p-8 sm:p-12 text-center shadow-2xl">
          <div className="inline-flex items-center gap-1.5 text-xs text-[#c5a059] font-cinzel tracking-wider uppercase mb-3">
            <BookOpen className="w-4 h-4" />
            <span>{isEn ? 'Lexicon of Emotion' : 'অনুভূতির শব্দকোষ'}</span>
          </div>

          <h3 className="text-xl sm:text-3xl font-bengali-serif font-bold text-[#f4ecd8] max-w-2xl mx-auto leading-relaxed">
            {isEn ? '“Love never grows old; it is the memories that grow profoundly deeper.”' : '“ভালোবাসা কখনো পুরনো হয় না, শুধু স্মৃতিগুলো আরও গভীর হয়।”'}
          </h3>

          <p className="text-xs sm:text-sm text-[#9e8d7a] mt-3 font-bengali-sans">
            {isEn 
              ? '— Choose from hundreds of famous classical quotes or write your own soul-stirring lines' 
              : '— শত শত প্রেমের উক্তি থেকে বেছে নিয়ে সাজিয়ে নিন আপনার নিজস্ব ডাকপত্র'}
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => onStartGenerator(undefined, isEn ? 'Love never grows old; it is the memories that grow profoundly deeper.' : 'ভালোবাসা কখনো পুরনো হয় না, শুধু স্মৃতিগুলো আরও গভীর হয়।')}
              className="px-5 py-2.5 bg-[#83182b] hover:bg-[#9c2037] text-[#fbf6ec] text-xs sm:text-sm font-semibold rounded-lg shadow transition-all flex items-center gap-2"
            >
              <span>{isEn ? 'Write letter with this quote' : 'এই উক্তিটি দিয়ে চিঠি লিখুন'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

interface CollectionSectionProps {
  title: string;
  subtitle: string;
  templates: PostcardTemplate[];
  onStartGenerator: (template: PostcardTemplate) => void;
  onToggleFavorite: (type: 'postcards' | 'quotes' | 'gallery', id: string) => void;
  isFavorite: (type: 'postcards' | 'quotes' | 'gallery', id: string) => boolean;
}

const CollectionSection: React.FC<CollectionSectionProps> = ({
  title,
  subtitle,
  templates,
  onStartGenerator,
  onToggleFavorite,
  isFavorite
}) => {
  const { language, t } = useLanguage();
  const isEn = language === 'en';

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 pb-2 border-b border-[#291f18] gap-2">
        <div>
          <h3 className="text-xl sm:text-2xl font-bold font-bengali-serif text-[#ebd9b7] flex items-center gap-2">
            <span>{title}</span>
          </h3>
          <p className="text-xs sm:text-sm text-[#998774] font-bengali-sans mt-1">
            {subtitle}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
        {templates.map(card => {
          const isFav = isFavorite('postcards', card.id);
          const displayTitle = isEn ? (card.titleEn || card.title) : card.title;
          const displayQuote = isEn ? (card.defaultQuoteEn || card.defaultQuote) : card.defaultQuote;
          const displayDesc = isEn ? (card.descriptionEn || card.descriptionBengali) : card.descriptionBengali;

          return (
            <div
              key={card.id}
              className="group relative bg-[#18130f] border border-[#35281e] hover:border-[#c5a059]/60 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
            >
              {/* Image & Overlay */}
              <div className="relative aspect-[3/2] overflow-hidden bg-[#241b14]">
                <img
                  src={card.image}
                  alt={displayTitle}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                {/* Category badge */}
                <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-sm border border-[#c5a059]/30 text-[10px] font-medium text-[#ebd9b7]">
                  {card.category}
                </div>

                {/* Favorite button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite('postcards', card.id);
                  }}
                  className={`absolute top-2.5 right-2.5 p-1.5 rounded-full backdrop-blur-md transition-colors ${
                    isFav
                      ? 'bg-[#83182b] text-white'
                      : 'bg-black/50 text-[#c2b3a1] hover:text-[#f4ecd8] hover:bg-black/70'
                  }`}
                  title={isFav ? (isEn ? 'Remove from favorites' : 'পছন্দ থেকে মুছুন') : (isEn ? 'Add to favorites' : 'পছন্দে যোগ করুন')}
                >
                  <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
                </button>

                {/* Short Quote Preview inside card thumbnail */}
                <div className="absolute bottom-2.5 inset-x-2.5 text-center">
                  <p className="text-xs text-[#faebd7] font-bengali-serif italic line-clamp-2 drop-shadow-md">
                    “{displayQuote}”
                  </p>
                </div>
              </div>

              {/* Card Meta & Action */}
              <div className="p-3.5 sm:p-4 flex flex-col justify-between flex-1 gap-3">
                <div>
                  <h4 className="text-sm font-semibold font-bengali-serif text-[#f4ecd8] group-hover:text-[#c5a059] transition-colors truncate">
                    {displayTitle}
                  </h4>
                  {displayDesc && (
                    <p className="text-[11px] text-[#8c7d6c] line-clamp-1 mt-0.5 font-bengali-sans">
                      {displayDesc}
                    </p>
                  )}
                </div>

                {/* Use Design Button */}
                <button
                  type="button"
                  onClick={() => onStartGenerator(card)}
                  className="w-full py-2 px-3 bg-[#241c16] hover:bg-[#83182b] text-[#ebd9b7] hover:text-[#fbf6ec] text-xs font-semibold rounded-lg border border-[#48372a] hover:border-[#d4af37]/60 transition-all flex items-center justify-center gap-1.5 group-hover:border-[#c5a059]/70"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#c5a059] group-hover:text-[#ffd700]" />
                  <span>{t('useDesign')}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
