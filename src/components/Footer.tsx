import React, { useState } from 'react';
import { ActiveTab } from '../types';
import { Heart, Sparkles, Mail, ShieldCheck, FileText, Info } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface FooterProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  const [modalType, setModalType] = useState<'privacy' | 'terms' | 'contact' | null>(null);
  const { language, t } = useLanguage();
  const isEn = language === 'en';

  return (
    <footer className="bg-[#0b0908] border-t border-[#c5a059]/20 text-[#a89984] pt-14 pb-12 mt-20 relative overflow-hidden">
      {/* Subtle vintage border design */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#c5a059]/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-[#241c16]">
          {/* Col 1: Brand & Tagline */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="text-3xl">💌</span>
              <span className="font-bengali-serif text-2xl font-bold tracking-wide text-[#f4ecd8]">
                {t('appName')}
              </span>
            </div>
            <p className="font-bengali-serif text-lg text-[#ebd9b7] italic">
              “{t('tagline')}”
            </p>
            <p className="text-xs sm:text-sm text-[#8c7d6c] max-w-md leading-relaxed font-bengali-sans">
              {isEn
                ? 'Vintage Chithi is a timeless aesthetic platform reviving the lost romance of handwritten postcards and letters. Craft your deepest feelings into vintage postcards to gift timeless affection.'
                : 'Vintage Chithi হলো ক্লাসিক ডাকঘর ও প্রেমপত্রের নস্টালজিক প্ল্যাটফর্ম। আপনার হৃদয়ের গভীরতম অনুভূতিগুলোকে ক্লাসিক পোস্টকার্ডে রূপ দিন এবং প্রিয়জনকে উপহার দিন ভালোবাসার চিরন্তন পরশ।'}
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold font-cinzel tracking-wider text-[#d4af37] uppercase">
              {isEn ? 'Navigation' : 'ন্যাভিগেশন'}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button 
                  onClick={() => { setActiveTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-[#f4ecd8] transition-colors"
                >
                  {t('navHome')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveTab('postcards'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-[#f4ecd8] transition-colors"
                >
                  {t('navPostcards')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveTab('quotes'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-[#f4ecd8] transition-colors"
                >
                  {t('navQuotes')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveTab('gallery'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-[#f4ecd8] transition-colors"
                >
                  {t('navGallery')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveTab('generator'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-[#d4af37] transition-colors font-medium text-[#c5a059]"
                >
                  ✨ {t('createLetter')}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Legal & Support */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold font-cinzel tracking-wider text-[#d4af37] uppercase">
              {isEn ? 'Information & Policies' : 'তথ্য ও নীতি'}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button 
                  onClick={() => setModalType('privacy')}
                  className="hover:text-[#f4ecd8] transition-colors flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>{isEn ? 'Privacy Policy' : 'গোপনীয়তা নীতি (Privacy Policy)'}</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setModalType('terms')}
                  className="hover:text-[#f4ecd8] transition-colors flex items-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>{isEn ? 'Terms of Service' : 'ব্যবহারের শর্তাবলী (Terms of Service)'}</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setModalType('contact')}
                  className="hover:text-[#f4ecd8] transition-colors flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>{isEn ? 'Contact Us' : 'যোগাযোগ (Contact Us)'}</span>
                </button>
              </li>
              <li className="pt-2">
                <a 
                  href="/vintage-chithi.html"
                  download="vintage-chithi-standalone.html"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#201711] hover:bg-[#2e2017] border border-[#c5a059]/40 text-[#ffd700] text-xs font-medium transition"
                  title={isEn ? "Download Standalone Single-File HTML" : "অফলাইন সিঙ্গেল-ফাইল HTML ডাউনলোড করুন"}
                >
                  <span>📄</span>
                  <span>{isEn ? 'Download Standalone HTML' : 'সিঙ্গেল-ফাইল HTML ডাউনলোড'}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7d6f60]">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Vintage Chithi. {isEn ? 'All rights reserved.' : 'সর্বস্বত্ব সংরক্ষিত।'}</span>
          </div>
          <div className="flex items-center gap-1 text-[11px]">
            <span>{isEn ? 'Crafted with devotion for vintage lovers' : 'হৃদয়ের ভালোবাসায় নির্মিত বাঙালি নস্টালজিকদের জন্য'}</span>
            <Heart className="w-3.5 h-3.5 text-[#83182b] fill-current inline mx-0.5" />
          </div>
        </div>
      </div>

      {/* Info Modals */}
      {modalType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-md bg-[#181310] border border-[#c5a059]/40 rounded-xl p-6 text-[#f4ecd8] shadow-2xl">
            <h3 className="text-lg font-bold font-bengali-serif text-[#ebd9b7] mb-3">
              {modalType === 'privacy' && (isEn ? 'Privacy Policy' : 'গোপনীয়তা নীতি (Privacy Policy)')}
              {modalType === 'terms' && (isEn ? 'Terms of Service' : 'ব্যবহারের শর্তাবলী (Terms)')}
              {modalType === 'contact' && (isEn ? 'Contact Us' : 'যোগাযোগ (Contact)')}
            </h3>
            <div className="text-xs sm:text-sm text-[#c2b3a1] space-y-2 leading-relaxed">
              {modalType === 'privacy' && (
                <p>
                  {isEn
                    ? 'Vintage Chithi does not store any private user photos or credentials on external servers. All customized letter texts and preferences are stored purely in your local browser cache.'
                    : 'Vintage Chithi ব্যবহারকারীদের কোনো ব্যক্তিগত ছবি বা তথ্য সার্ভারে জমা রাখে না। আপনার পোস্টকার্ডের টেক্সট ও পছন্দের ডেটা সম্পূর্ণরূপে আপনার নিজস্ব ব্রাউজারের লোকাল স্টোরেজে সুরক্ষিত থাকে।'}
                </p>
              )}
              {modalType === 'terms' && (
                <p>
                  {isEn
                    ? 'All vintage postcard designs and curated quotes on this platform are freely open for personal greetings, creative expression, and loving letters. Commercial resale is strictly prohibited.'
                    : 'এই প্ল্যাটফর্মের সমস্ত পোস্টকার্ড ডিজাইন ও উক্তি ব্যক্তিগত শুভেচ্ছা ও ভালোবাসা প্রকাশের উদ্দেশ্যে উন্মুক্ত। কোনো বাণিজ্যিক পুনঃবিক্রয় বা অপব্যবহার নিষিদ্ধ।'}
                </p>
              )}
              {modalType === 'contact' && (
                <p>
                  {isEn
                    ? 'Have queries or suggestions? We are always ready to assist and celebrate the art of vintage letter writing.'
                    : 'যেকোনো পরামর্শ বা মতামত পাঠাতে পারেন আমাদের কাছে। চিঠি ও নস্টালজিয়া সংক্রান্ত যেকোনো সহযোগিতার জন্য আমরা সদা প্রস্তুত।'}
                </p>
              )}
            </div>
            <div className="mt-5 text-right">
              <button
                onClick={() => setModalType(null)}
                className="px-4 py-1.5 bg-[#83182b] text-white text-xs font-semibold rounded hover:bg-[#9c2037] transition-all"
              >
                {t('close')}
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
