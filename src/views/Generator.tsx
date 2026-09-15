import React, { useState, useRef, useEffect } from 'react';
import { PostcardTemplate, CustomizationState, BorderStyle } from '../types';
import { POSTCARD_TEMPLATES } from '../data/postcards';
import { QUOTES } from '../data/quotes';
import { ASPECT_RATIOS } from '../data/aspectRatios';
import { VINTAGE_EFFECTS } from '../data/vintageEffects';
import { PostcardCanvas } from '../components/PostcardCanvas';
import { DownloadGateModal } from '../components/DownloadGateModal';
import { toPng, toJpeg } from 'html-to-image';
import confetti from 'canvas-confetti';
import { 
  Dices, 
  Download, 
  RotateCcw
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface GeneratorProps {
  initialTemplate?: PostcardTemplate;
  initialQuote?: string;
  onSaveFavorite?: (type: 'postcards' | 'quotes', id: string) => void;
}

export const Generator: React.FC<GeneratorProps> = ({
  initialTemplate,
  initialQuote
}) => {
  const { language, t } = useLanguage();
  const isEn = language === 'en';

  // 1. Template selection state
  const [selectedTemplate, setSelectedTemplate] = useState<PostcardTemplate>(
    initialTemplate || POSTCARD_TEMPLATES[0]
  );

  // 2. Customization state
  const defaultState: CustomizationState = {
    recipient: isEn ? 'My Beloved' : 'প্রিয়তমা',
    message: initialQuote || (isEn && selectedTemplate.defaultQuoteEn ? selectedTemplate.defaultQuoteEn : selectedTemplate.defaultQuote),
    sender: isEn ? 'Yours forever...' : 'ইতি, তোমার...',
    date: isEn ? 'Autumn, 1978' : 'আষাঢ়, ১৩৭৮',
    fontFamily: selectedTemplate.typography.fontFamily || 'bengali-serif',
    fontSize: selectedTemplate.typography.fontSize || 22,
    isBold: false,
    isItalic: false,
    textAlign: 'center',
    letterSpacing: 0.5,
    lineHeight: 1.8,
    textColor: selectedTemplate.typography.color || '#f6edd9',
    textPosition: selectedTemplate.textPosition || 'center',
    vintageEffect: 'sepia',
    aspectRatio: 'postcard',
    showStamp: true,
    stampType: 'rose',
    borderStyle: selectedTemplate.borderStyle || 'vintage',
    paperTone: (selectedTemplate.paperTone as any) || 'antique-sepia',
    backgroundOverlayOpacity: 0.45
  };

  const [customState, setCustomState] = useState<CustomizationState>(defaultState);

  // Sync when initial props change
  useEffect(() => {
    if (initialTemplate) {
      setSelectedTemplate(initialTemplate);
      const quoteText = initialQuote || (isEn && initialTemplate.defaultQuoteEn ? initialTemplate.defaultQuoteEn : initialTemplate.defaultQuote);
      setCustomState(prev => ({
        ...prev,
        borderStyle: initialTemplate.borderStyle || prev.borderStyle,
        message: quoteText,
        textColor: initialTemplate.typography.color || prev.textColor,
      }));
    } else if (initialQuote) {
      setCustomState(prev => ({ ...prev, message: initialQuote }));
    }
  }, [initialTemplate, initialQuote, isEn]);

  // UI Accordions
  const [activeStepTab, setActiveStepTab] = useState<'templates' | 'quotes' | 'editor' | 'styling' | 'effects'>('editor');
  const [customInputText, setCustomInputText] = useState('');
  const [quoteSearch, setQuoteSearch] = useState('');
  const [quoteAuthorFilter, setQuoteAuthorFilter] = useState('all');
  
  // Download gate state
  const [isDownloadGateOpen, setIsDownloadGateOpen] = useState(false);
  const [downloadFormat, setDownloadFormat] = useState<'png' | 'jpg'>('png');
  const [isExporting, setIsExporting] = useState(false);

  // Ref to the postcard element for html-to-image export
  const canvasRef = useRef<HTMLDivElement>(null);

  // Font options
  const FONT_OPTIONS = [
    { id: 'bengali-serif', label: isEn ? 'Elegant Bengali Serif' : 'এলিগেন্ট বাংলা (Noto Serif)' },
    { id: 'bengali-tiro', label: isEn ? 'Traditional Script (Tiro)' : 'ঐতিহ্যবাহী বাংলা (Tiro Bangla)' },
    { id: 'calligraphy', label: isEn ? 'Handwritten Script' : 'হস্তলিপি (Dancing Script)' },
    { id: 'vintage-serif', label: isEn ? 'Vintage Serif (Playfair)' : 'ভিন্টেজ সেরিফ (Playfair)' },
    { id: 'typewriter', label: isEn ? 'Typewriter (Courier)' : 'টাইপরাইটার (Courier Prime)' },
    { id: 'bengali-sans', label: isEn ? 'Classic Sans (Siliguri)' : 'ক্লাসিক (Hind Siliguri)' }
  ];

  // Colors
  const COLOR_PALETTES = [
    { label: isEn ? 'Cream Vintage' : 'ক্রিম ভিন্টেজ', color: '#f6edd9' },
    { label: isEn ? 'Golden Hue' : 'সোনালী আভা', color: '#faebd7' },
    { label: isEn ? 'Warm Parchment' : 'উষ্ণ পার্চমেন্ট', color: '#fbf0d9' },
    { label: isEn ? 'Antique Gold' : 'অ্যান্টিক স্বর্ণ', color: '#f3e5ab' },
    { label: isEn ? 'Faded Rose' : 'গোলাপী মলিন', color: '#ffe4e1' },
    { label: isEn ? 'Black Ink' : 'কালো কালি', color: '#25160e' },
    { label: isEn ? 'Chocolate Brown' : 'চকলেট ব্রাউন', color: '#3d2516' },
    { label: isEn ? 'Deep Maroon' : 'গাঢ় মেরুন', color: '#52141d' }
  ];

  // 🎲 Surprise Me
  const handleSurpriseMe = () => {
    const randomTemplate = POSTCARD_TEMPLATES[Math.floor(Math.random() * POSTCARD_TEMPLATES.length)];
    const randomQuote = QUOTES[Math.floor(Math.random() * QUOTES.length)];
    const randomFont = FONT_OPTIONS[Math.floor(Math.random() * FONT_OPTIONS.length)].id;
    const randomEffect = VINTAGE_EFFECTS[Math.floor(Math.random() * VINTAGE_EFFECTS.length)].id;
    const randomStamp: ('rose' | 'postmark' | 'wax') = ['rose', 'postmark', 'wax'][Math.floor(Math.random() * 3)] as any;

    const messageText = isEn ? (randomQuote.textEn || randomQuote.text) : randomQuote.text;

    setSelectedTemplate(randomTemplate);
    setCustomState(prev => ({
      ...prev,
      message: messageText,
      fontFamily: randomFont,
      vintageEffect: randomEffect,
      stampType: randomStamp,
      borderStyle: randomTemplate.borderStyle || 'vintage',
      textColor: randomTemplate.typography.color || '#faebd7',
    }));
  };

  // Reset Text Style
  const handleResetStyle = () => {
    setCustomState(prev => ({
      ...prev,
      fontFamily: selectedTemplate.typography.fontFamily || 'bengali-serif',
      fontSize: selectedTemplate.typography.fontSize || 22,
      isBold: false,
      isItalic: false,
      textAlign: 'center',
      letterSpacing: 0.5,
      lineHeight: 1.8,
      textColor: selectedTemplate.typography.color || '#f6edd9',
      textPosition: 'center',
      vintageEffect: 'sepia',
      aspectRatio: 'postcard',
      showStamp: true,
      stampType: 'rose',
      borderStyle: selectedTemplate.borderStyle || 'vintage'
    }));
  };

  // Apply written custom quote
  const handleApplyCustomText = () => {
    if (customInputText.trim()) {
      setCustomState(prev => ({ ...prev, message: customInputText.trim() }));
      setCustomInputText('');
    }
  };

  // Trigger download gate modal
  const handleInitiateDownload = () => {
    setIsDownloadGateOpen(true);
  };

  // Actual HD Export Execution after 8-second gate
  const handlePerformExport = async () => {
    if (!canvasRef.current) return;
    setIsExporting(true);

    try {
      const node = canvasRef.current;
      
      // Ensure all document fonts are fully loaded before rendering
      if ('fonts' in document) {
        await document.fonts.ready;
      }

      // Use pixelRatio 2.5 for true crisp HD export
      // skipFonts: true prevents html-to-image from accessing document.styleSheets cssRules on cross-origin Google Fonts which causes DOMException SecurityError
      const options = {
        quality: 0.98,
        pixelRatio: 2.5,
        cacheBust: true,
        skipFonts: true,
      };

      let dataUrl: string;
      if (downloadFormat === 'jpg') {
        dataUrl = await toJpeg(node, options);
      } else {
        dataUrl = await toPng(node, options);
      }

      // Create download link
      const link = document.createElement('a');
      const cleanTitle = selectedTemplate.title.replace(/[^a-zA-Z0-9\u0980-\u09FF]/g, '_');
      link.download = `VintageChithi_${cleanTitle}_${Date.now()}.${downloadFormat}`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Celebration confetti
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.7 },
          colors: ['#c5a059', '#83182b', '#faebd7', '#d4af37']
        });
      } catch (e) {
        // silent
      }
    } catch (err) {
      console.error('Error generating postcard HD image:', err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#2b1f17] pb-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-cinzel text-[#d4af37] tracking-wider uppercase mb-1">
            <span>{t('customStudio')}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-bengali-serif text-[#f4ecd8] flex items-center gap-2">
            <span>💌 {t('generatorHeaderTitle')}</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#998774] font-bengali-sans mt-0.5">
            {t('generatorSub')}
          </p>
        </div>

        {/* Surprise Me Button */}
        <button
          type="button"
          onClick={handleSurpriseMe}
          className="px-4 py-2.5 bg-[#251b14] hover:bg-[#342419] text-[#ebd9b7] hover:text-[#fbf6ec] border border-[#c5a059]/50 hover:border-[#c5a059] rounded-xl text-xs sm:text-sm font-semibold transition-all shadow flex items-center justify-center gap-2 active:scale-[0.97]"
        >
          <Dices className="w-4 h-4 text-[#ffd700]" />
          <span>{t('surpriseMe')}</span>
        </button>
      </div>

      {/* Main Grid: Left Editor Controls & Right Live Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Generator Step Controls (6 cols on lg) */}
        <div className="lg:col-span-6 space-y-5">
          {/* Step Navigation Tabs */}
          <div className="grid grid-cols-5 p-1 bg-[#18120e] rounded-xl border border-[#33251a] text-center text-xs">
            <button
              onClick={() => setActiveStepTab('templates')}
              className={`py-2 px-1 rounded-lg font-medium transition-all ${
                activeStepTab === 'templates'
                  ? 'bg-[#83182b] text-[#fbf6ec] shadow-md border border-[#d4af37]/40'
                  : 'text-[#a89984] hover:text-[#f4ecd8]'
              }`}
            >
              {t('step1Design')}
            </button>
            <button
              onClick={() => setActiveStepTab('quotes')}
              className={`py-2 px-1 rounded-lg font-medium transition-all ${
                activeStepTab === 'quotes'
                  ? 'bg-[#83182b] text-[#fbf6ec] shadow-md border border-[#d4af37]/40'
                  : 'text-[#a89984] hover:text-[#f4ecd8]'
              }`}
            >
              {t('step2Quotes')}
            </button>
            <button
              onClick={() => setActiveStepTab('editor')}
              className={`py-2 px-1 rounded-lg font-medium transition-all ${
                activeStepTab === 'editor'
                  ? 'bg-[#83182b] text-[#fbf6ec] shadow-md border border-[#d4af37]/40'
                  : 'text-[#a89984] hover:text-[#f4ecd8]'
              }`}
            >
              {t('step3Text')}
            </button>
            <button
              onClick={() => setActiveStepTab('styling')}
              className={`py-2 px-1 rounded-lg font-medium transition-all ${
                activeStepTab === 'styling'
                  ? 'bg-[#83182b] text-[#fbf6ec] shadow-md border border-[#d4af37]/40'
                  : 'text-[#a89984] hover:text-[#f4ecd8]'
              }`}
            >
              {t('step4Style')}
            </button>
            <button
              onClick={() => setActiveStepTab('effects')}
              className={`py-2 px-1 rounded-lg font-medium transition-all ${
                activeStepTab === 'effects'
                  ? 'bg-[#83182b] text-[#fbf6ec] shadow-md border border-[#d4af37]/40'
                  : 'text-[#a89984] hover:text-[#f4ecd8]'
              }`}
            >
              {t('step5Effects')}
            </button>
          </div>

          {/* TAB 1: STEP 1 - পোস্টকার্ড নির্বাচন করুন */}
          {activeStepTab === 'templates' && (
            <div className="p-4 sm:p-5 bg-[#17120e] rounded-xl border border-[#312419] space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold font-bengali-serif text-[#ebd9b7]">
                  {t('step1Heading')} ({POSTCARD_TEMPLATES.length})
                </h3>
                <span className="text-[11px] text-[#c5a059]">{t('clickToSelect')}</span>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5 max-h-96 overflow-y-auto pr-1">
                {POSTCARD_TEMPLATES.map(template => {
                  const isSelected = selectedTemplate.id === template.id;
                  const displayTitle = isEn ? (template.titleEn || template.title) : template.title;

                  return (
                    <div
                      key={template.id}
                      onClick={() => {
                        setSelectedTemplate(template);
                        setCustomState(prev => ({
                          ...prev,
                          borderStyle: template.borderStyle || prev.borderStyle,
                          textColor: template.typography.color || prev.textColor,
                        }));
                      }}
                      className={`relative aspect-[3/2] rounded-lg overflow-hidden cursor-pointer border transition-all ${
                        isSelected
                          ? 'border-[#d4af37] ring-2 ring-[#83182b] scale-[1.02] shadow-lg'
                          : 'border-[#382b20] opacity-75 hover:opacity-100 hover:border-[#c5a059]/50'
                      }`}
                    >
                      <img
                        src={template.image}
                        alt={displayTitle}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      <div className="absolute bottom-1 inset-x-1 text-center">
                        <span className="text-[9px] text-[#f4ecd8] font-bengali-sans font-medium line-clamp-1">
                          {displayTitle}
                        </span>
                      </div>
                      {isSelected && (
                        <div className="absolute top-1 right-1 w-4 h-4 bg-[#83182b] text-white rounded-full flex items-center justify-center text-[10px] shadow">
                          ✓
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: STEP 2 - উক্তি নির্বাচন করুন */}
          {activeStepTab === 'quotes' && (
            <div className="p-4 sm:p-5 bg-[#17120e] rounded-xl border border-[#312419] space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold font-bengali-serif text-[#ebd9b7]">
                  {t('step2Heading')}
                </h3>
                <span className="text-[11px] text-[#c5a059]">{QUOTES.length} {t('tabQuotes')}</span>
              </div>

              {/* Quick Search & Author Filter */}
              <div className="space-y-2">
                <input
                  type="text"
                  value={quoteSearch}
                  onChange={(e) => setQuoteSearch(e.target.value)}
                  placeholder={isEn ? "Search quotes or poets (Ghalib, Faridi, Rain)..." : "উক্তি বা কবি খুঁজুন (যেমন: গালিব, ফরীদি, নজরুল)..."}
                  className="w-full bg-[#1b1510] border border-[#3a2c20] focus:border-[#c5a059] rounded-lg px-3 py-1.5 text-xs text-[#f4ecd8] placeholder-[#7d6f60] outline-none"
                />

                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-[11px]">
                  {[
                    { label: isEn ? 'All' : 'সকল', author: 'all' },
                    { label: isEn ? 'Humayun Faridi' : 'হুমায়ুন ফরীদি', author: 'হুমায়ুন ফরীদি' },
                    { label: isEn ? 'Mirza Ghalib' : 'মির্জা গালিব', author: 'মির্জা গালিব' },
                    { label: isEn ? 'Kazi Nazrul' : 'কাজী নজরুল', author: 'কাজী নজরুল ইসলাম' },
                    { label: isEn ? 'Faiz' : 'ফয়েজ', author: 'ফয়েজ আহমেদ ফয়েজ' },
                    { label: isEn ? 'Mir Taqi Mir' : 'মির তকি মির', author: 'মির তকি মির' },
                    { label: isEn ? 'Hafez' : 'হাফেজ', author: 'হাফেজ শিরাজী' },
                  ].map(p => (
                    <button
                      key={p.author}
                      type="button"
                      onClick={() => setQuoteAuthorFilter(p.author)}
                      className={`px-2.5 py-1 rounded-full whitespace-nowrap transition-all border ${
                        quoteAuthorFilter === p.author
                          ? 'bg-[#83182b] text-[#fbf6ec] border-[#d4af37]'
                          : 'bg-[#221a14] text-[#a89984] border-[#382b20] hover:text-[#f4ecd8]'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2.5 max-h-96 overflow-y-auto pr-1">
                {QUOTES.filter(q => {
                  const matchesAuthor = quoteAuthorFilter === 'all' || q.author === quoteAuthorFilter;
                  const qSearch = quoteSearch.trim().toLowerCase();
                  const matchesSearch = !qSearch || 
                    q.text.toLowerCase().includes(qSearch) || 
                    (q.textEn && q.textEn.toLowerCase().includes(qSearch)) ||
                    (q.author && q.author.toLowerCase().includes(qSearch)) ||
                    (q.authorEn && q.authorEn.toLowerCase().includes(qSearch)) ||
                    q.category.toLowerCase().includes(qSearch);
                  return matchesAuthor && matchesSearch;
                }).map(q => {
                  const displayQuote = isEn ? (q.textEn || q.text) : q.text;
                  const displayAuthor = isEn ? (q.authorEn || q.author) : q.author;
                  const displayRole = isEn ? (q.authorRoleEn || q.authorRole) : q.authorRole;
                  const isSelected = customState.message === displayQuote || customState.message === q.text;

                  return (
                    <div
                      key={q.id}
                      className={`p-3 rounded-lg border transition-all flex items-start justify-between gap-3 ${
                        isSelected
                          ? 'bg-[#291e17] border-[#c5a059] shadow'
                          : 'bg-[#1e1712] border-[#382a1f] hover:border-[#c5a059]/40'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] px-2 py-0.5 rounded bg-[#2c2017] text-[#c5a059] font-mono">
                            {q.category}
                          </span>
                          {displayAuthor && (
                            <span className="text-[10px] text-[#d4af37] font-semibold font-bengali-serif">
                              — {displayAuthor}
                            </span>
                          )}
                        </div>
                        <p className="text-xs sm:text-sm text-[#ebd9b7] font-bengali-serif leading-relaxed">
                          “{displayQuote}”
                        </p>
                        {displayRole && (
                          <p className="text-[9px] text-[#7d6f60] font-bengali-sans">
                            {displayRole}
                          </p>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => setCustomState(prev => ({ ...prev, message: displayQuote }))}
                        className={`px-2.5 py-1 text-xs rounded font-medium whitespace-nowrap transition-colors flex items-center gap-1 ${
                          isSelected
                            ? 'bg-[#83182b] text-[#fbf6ec]'
                            : 'bg-[#2f231b] text-[#c2b3a1] hover:bg-[#83182b] hover:text-[#fbf6ec]'
                        }`}
                      >
                        {isSelected ? t('selectedMark') : t('useThis')}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: STEP 3 - নিজের লেখা লিখুন / LETTER FIELDS */}
          {activeStepTab === 'editor' && (
            <div className="p-4 sm:p-5 bg-[#17120e] rounded-xl border border-[#312419] space-y-4">
              <h3 className="text-sm font-semibold font-bengali-serif text-[#ebd9b7]">
                {t('step3Heading')}
              </h3>

              {/* Recipient */}
              <div>
                <label className="block text-xs text-[#c2b3a1] font-medium mb-1">
                  {t('recipientLabel')}:
                </label>
                <input
                  type="text"
                  value={customState.recipient}
                  onChange={(e) => setCustomState(prev => ({ ...prev, recipient: e.target.value }))}
                  placeholder={t('recipientPlaceholder')}
                  className="w-full bg-[#1e1712] border border-[#3b2c20] focus:border-[#c5a059] rounded-lg px-3 py-2 text-sm text-[#f4ecd8] outline-none font-bengali-sans"
                />
              </div>

              {/* Main Message / Quote Textarea */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs text-[#c2b3a1] font-medium">
                    {t('quoteTextLabel')}:
                  </label>
                  <span className="text-[10px] text-[#7d6f60]">
                    {customState.message.length} {isEn ? 'chars' : 'বর্ণ'}
                  </span>
                </div>
                <textarea
                  rows={4}
                  value={customState.message}
                  onChange={(e) => setCustomState(prev => ({ ...prev, message: e.target.value }))}
                  placeholder={t('quotePlaceholder')}
                  className="w-full bg-[#1e1712] border border-[#3b2c20] focus:border-[#c5a059] rounded-lg p-3 text-sm text-[#f4ecd8] outline-none font-bengali-sans leading-relaxed resize-none"
                />
              </div>

              {/* Sender & Date row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-[#c2b3a1] font-medium mb-1">
                    {t('senderLabel')}:
                  </label>
                  <input
                    type="text"
                    value={customState.sender}
                    onChange={(e) => setCustomState(prev => ({ ...prev, sender: e.target.value }))}
                    placeholder={t('senderPlaceholder')}
                    className="w-full bg-[#1e1712] border border-[#3b2c20] focus:border-[#c5a059] rounded-lg px-3 py-2 text-sm text-[#f4ecd8] outline-none font-bengali-sans"
                  />
                </div>

                <div>
                  <label className="block text-xs text-[#c2b3a1] font-medium mb-1">
                    {t('dateLabel')}:
                  </label>
                  <input
                    type="text"
                    value={customState.date}
                    onChange={(e) => setCustomState(prev => ({ ...prev, date: e.target.value }))}
                    placeholder={t('datePlaceholder')}
                    className="w-full bg-[#1e1712] border border-[#3b2c20] focus:border-[#c5a059] rounded-lg px-3 py-2 text-sm text-[#f4ecd8] outline-none font-bengali-sans"
                  />
                </div>
              </div>

              {/* Write your own quick replacement block */}
              <div className="pt-3 border-t border-[#291e16]">
                <span className="text-xs text-[#d4af37] font-semibold block mb-2">
                  {t('pasteOwnLine')}
                </span>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={customInputText}
                    onChange={(e) => setCustomInputText(e.target.value)}
                    placeholder={t('customLinePlaceholder')}
                    className="flex-1 bg-[#1e1712] border border-[#3b2c20] rounded-lg px-3 py-2 text-xs text-[#f4ecd8] outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleApplyCustomText}
                    className="px-3 py-2 bg-[#83182b] hover:bg-[#9c2037] text-white text-xs font-semibold rounded-lg shadow whitespace-nowrap"
                  >
                    {t('applyText')}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: STEP 4 - TEXT CUSTOMIZATION */}
          {activeStepTab === 'styling' && (
            <div className="p-4 sm:p-5 bg-[#17120e] rounded-xl border border-[#312419] space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold font-bengali-serif text-[#ebd9b7]">
                  {t('step4Heading')}
                </h3>
                <button
                  type="button"
                  onClick={handleResetStyle}
                  className="text-xs text-[#c5a059] hover:text-[#faebd7] flex items-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{t('resetStyle')}</span>
                </button>
              </div>

              {/* Font Family Selector */}
              <div>
                <label className="block text-xs text-[#c2b3a1] font-medium mb-1">
                  {t('fontLabel')}:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {FONT_OPTIONS.map(font => (
                    <button
                      key={font.id}
                      type="button"
                      onClick={() => setCustomState(prev => ({ ...prev, fontFamily: font.id }))}
                      className={`py-2 px-2.5 rounded-lg text-xs font-medium border text-left truncate transition-all ${
                        customState.fontFamily === font.id
                          ? 'bg-[#83182b] text-[#fbf6ec] border-[#d4af37]/60'
                          : 'bg-[#1e1712] text-[#b5a695] border-[#3b2c20] hover:border-[#c5a059]/40'
                      }`}
                    >
                      {font.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Font Size & Line Height */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex justify-between text-xs text-[#c2b3a1] mb-1">
                    <span>{t('fontSizeLabel')}:</span>
                    <span className="font-mono text-[#c5a059]">{customState.fontSize}px</span>
                  </div>
                  <input
                    type="range"
                    min={16}
                    max={34}
                    value={customState.fontSize}
                    onChange={(e) => setCustomState(prev => ({ ...prev, fontSize: Number(e.target.value) }))}
                    className="w-full accent-[#c5a059]"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs text-[#c2b3a1] mb-1">
                    <span>{t('lineHeightLabel')}:</span>
                    <span className="font-mono text-[#c5a059]">{customState.lineHeight}</span>
                  </div>
                  <input
                    type="range"
                    min={1.2}
                    max={2.4}
                    step={0.1}
                    value={customState.lineHeight}
                    onChange={(e) => setCustomState(prev => ({ ...prev, lineHeight: Number(e.target.value) }))}
                    className="w-full accent-[#c5a059]"
                  />
                </div>
              </div>

              {/* Text Alignment & Formats (Bold, Italic) */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="flex items-center gap-1 bg-[#1e1712] p-1 rounded-lg border border-[#3b2c20]">
                  <button
                    type="button"
                    onClick={() => setCustomState(prev => ({ ...prev, textAlign: 'left' }))}
                    className={`px-3 py-1 text-xs rounded ${customState.textAlign === 'left' ? 'bg-[#83182b] text-white' : 'text-[#a89984]'}`}
                  >
                    {t('alignLeft')}
                  </button>
                  <button
                    type="button"
                    onClick={() => setCustomState(prev => ({ ...prev, textAlign: 'center' }))}
                    className={`px-3 py-1 text-xs rounded ${customState.textAlign === 'center' ? 'bg-[#83182b] text-white' : 'text-[#a89984]'}`}
                  >
                    {t('alignCenter')}
                  </button>
                  <button
                    type="button"
                    onClick={() => setCustomState(prev => ({ ...prev, textAlign: 'right' }))}
                    className={`px-3 py-1 text-xs rounded ${customState.textAlign === 'right' ? 'bg-[#83182b] text-white' : 'text-[#a89984]'}`}
                  >
                    {t('alignRight')}
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setCustomState(prev => ({ ...prev, isBold: !prev.isBold }))}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all ${
                      customState.isBold ? 'bg-[#83182b] text-white border-[#d4af37]' : 'bg-[#1e1712] text-[#a89984] border-[#3b2c20]'
                    }`}
                  >
                    {t('bold')}
                  </button>
                  <button
                    type="button"
                    onClick={() => setCustomState(prev => ({ ...prev, isItalic: !prev.isItalic }))}
                    className={`px-3 py-1.5 text-xs italic rounded-lg border transition-all ${
                      customState.isItalic ? 'bg-[#83182b] text-white border-[#d4af37]' : 'bg-[#1e1712] text-[#a89984] border-[#3b2c20]'
                    }`}
                  >
                    {t('italic')}
                  </button>
                </div>
              </div>

              {/* Text Color Swatches */}
              <div>
                <label className="block text-xs text-[#c2b3a1] font-medium mb-1.5">
                  {t('textColorLabel')}:
                </label>
                <div className="flex flex-wrap items-center gap-2">
                  {COLOR_PALETTES.map(p => (
                    <button
                      key={p.color}
                      type="button"
                      onClick={() => setCustomState(prev => ({ ...prev, textColor: p.color }))}
                      className={`w-7 h-7 rounded-full border transition-all flex items-center justify-center ${
                        customState.textColor === p.color ? 'ring-2 ring-[#c5a059] scale-110' : 'border-black/40'
                      }`}
                      style={{ backgroundColor: p.color }}
                      title={p.label}
                    >
                      {customState.textColor === p.color && (
                        <span className="text-[10px] text-[#83182b] font-bold">✓</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Aspect Ratio Chooser */}
              <div className="pt-2 border-t border-[#291e16]">
                <label className="block text-xs text-[#c2b3a1] font-medium mb-1.5">
                  {t('aspectRatioLabel')}:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {ASPECT_RATIOS.map(ratio => (
                    <button
                      key={ratio.id}
                      type="button"
                      onClick={() => setCustomState(prev => ({ ...prev, aspectRatio: ratio.id }))}
                      className={`p-2 rounded-lg text-xs font-medium border text-left transition-all ${
                        customState.aspectRatio === ratio.id
                          ? 'bg-[#83182b] text-[#fbf6ec] border-[#d4af37]/60 shadow'
                          : 'bg-[#1e1712] text-[#a89984] border-[#3b2c20]'
                      }`}
                    >
                      <div className="font-semibold">{isEn ? ratio.labelEnglish : ratio.labelBengali}</div>
                      <div className="text-[10px] opacity-75">{ratio.labelEnglish}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: STEP 5 - VINTAGE EFFECTS, STAMPS & BORDERS */}
          {activeStepTab === 'effects' && (
            <div className="p-4 sm:p-5 bg-[#17120e] rounded-xl border border-[#312419] space-y-4">
              <h3 className="text-sm font-semibold font-bengali-serif text-[#ebd9b7]">
                {t('step5Heading')}
              </h3>

              {/* Vintage Visual Effects */}
              <div>
                <label className="block text-xs text-[#c2b3a1] font-medium mb-1.5">
                  {t('filterLabel')}:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {VINTAGE_EFFECTS.map(effect => (
                    <button
                      key={effect.id}
                      type="button"
                      onClick={() => setCustomState(prev => ({ ...prev, vintageEffect: effect.id }))}
                      className={`p-2 rounded-lg text-xs font-medium border text-left transition-all ${
                        customState.vintageEffect === effect.id
                          ? 'bg-[#83182b] text-[#fbf6ec] border-[#d4af37]/60 shadow'
                          : 'bg-[#1e1712] text-[#a89984] border-[#3b2c20]'
                      }`}
                    >
                      {isEn ? effect.nameEnglish : effect.nameBengali}
                    </button>
                  ))}
                </div>
              </div>

              {/* Decorative Stamp & Seal Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block text-xs text-[#c2b3a1] font-medium mb-1">
                    {t('stampLabel')}:
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setCustomState(prev => ({ ...prev, showStamp: !prev.showStamp }))}
                      className={`px-3 py-1.5 text-xs rounded-lg border ${
                        customState.showStamp ? 'bg-[#291e17] text-[#c5a059] border-[#c5a059]' : 'bg-[#1e1712] text-[#7d6f60] border-[#33251a]'
                      }`}
                    >
                      {customState.showStamp ? t('stampVisible') : t('stampHidden')}
                    </button>

                    {customState.showStamp && (
                      <button
                        type="button"
                        onClick={() => setCustomState(prev => ({
                          ...prev,
                          stampType: prev.stampType === 'rose' ? 'wax' : 'rose'
                        }))}
                        className="px-3 py-1.5 text-xs rounded-lg bg-[#1e1712] text-[#ebd9b7] border border-[#3b2c20]"
                      >
                        {isEn ? 'Type: ' : 'ধরন: '}{customState.stampType === 'wax' ? t('waxSeal') : t('postageStamp')}
                      </button>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-[#c2b3a1] font-medium mb-1">
                    {t('borderStyle')}
                  </label>
                  <select
                    value={customState.borderStyle}
                    onChange={(e) => setCustomState(prev => ({ ...prev, borderStyle: e.target.value as BorderStyle }))}
                    className="w-full bg-[#1e1712] border border-[#3b2c20] rounded-lg px-3 py-1.5 text-xs text-[#f4ecd8] outline-none"
                  >
                    <option value="vintage">{isEn ? 'Vintage Corner' : 'ভিন্টেজ কর্নার (Vintage Corner)'}</option>
                    <option value="ornate">{isEn ? 'Ornate Double' : 'অলঙ্কৃত ডাবল (Ornate)'}</option>
                    <option value="double">{isEn ? 'Golden Double Line' : 'গোল্ডেন ডাবল লাইন (Double)'}</option>
                    <option value="simple">{isEn ? 'Simple Clean' : 'সরল রেখা (Simple)'}</option>
                    <option value="none">{isEn ? 'No Border' : 'বর্ডারহীন (None)'}</option>
                  </select>
                </div>
              </div>

              {/* Background Opacity / Contrast Slider */}
              <div className="pt-2">
                <div className="flex justify-between text-xs text-[#c2b3a1] mb-1">
                  <span>{t('contrastDepth')}</span>
                  <span className="font-mono text-[#c5a059]">{Math.round(customState.backgroundOverlayOpacity * 100)}%</span>
                </div>
                <input
                  type="range"
                  min={0.15}
                  max={0.75}
                  step={0.05}
                  value={customState.backgroundOverlayOpacity}
                  onChange={(e) => setCustomState(prev => ({ ...prev, backgroundOverlayOpacity: Number(e.target.value) }))}
                  className="w-full accent-[#c5a059]"
                />
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Live Postcard Preview (Sticky / Large on desktop, 6 cols on lg) */}
        <div className="lg:col-span-6 space-y-4 lg:sticky lg:top-24">
          <div className="flex items-center justify-between">
            <span className="text-xs font-cinzel text-[#d4af37] tracking-wider uppercase flex items-center gap-1">
              <span>{t('livePreview')}</span>
            </span>
            <span className="text-[11px] text-[#8c7d6c]">
              {t('exactPreviewNote')}
            </span>
          </div>

          {/* Canvas Wrapper */}
          <div className="p-2 sm:p-3 bg-[#16100c] border border-[#c5a059]/40 rounded-xl shadow-2xl overflow-hidden">
            <PostcardCanvas
              ref={canvasRef}
              template={selectedTemplate}
              state={customState}
              className="w-full rounded-lg"
            />
          </div>

          {/* Main Download Button */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleInitiateDownload}
              disabled={isExporting}
              className="w-full py-3.5 sm:py-4 px-6 bg-gradient-to-r from-[#83182b] to-[#a32238] hover:from-[#941c32] hover:to-[#b82941] text-[#fdf8f0] font-bold text-base sm:text-lg rounded-xl shadow-xl hover:shadow-2xl transition-all border border-[#d4af37]/60 active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-50"
            >
              <Download className="w-5 h-5 text-[#ffd700]" />
              <span>{t('downloadHd')}</span>
            </button>
            <p className="text-[11px] text-center text-[#8c7a69] mt-2">
              {t('sponsorNote')}
            </p>
          </div>
        </div>
      </div>

      {/* 8-Second Download Gate Modal */}
      <DownloadGateModal
        isOpen={isDownloadGateOpen}
        onClose={() => setIsDownloadGateOpen(false)}
        onReadyToDownload={handlePerformExport}
        format={downloadFormat}
        onFormatChange={setDownloadFormat}
      />
    </div>
  );
};
