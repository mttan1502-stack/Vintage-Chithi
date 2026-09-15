import React, { useState } from 'react';
import { ActiveTab } from '../types';
import { Sparkles, Heart, Search, Menu, X, BookOpen, Image as ImageIcon, Home as HomeIcon, Layers, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  favoritesCount: number;
  onOpenSearch: () => void;
  onSelectCategory?: (category: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  favoritesCount,
  onOpenSearch
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();

  const navItems: { id: ActiveTab; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: t('navHome'), icon: <HomeIcon className="w-4 h-4" /> },
    { id: 'postcards', label: t('navPostcards'), icon: <Layers className="w-4 h-4" /> },
    { id: 'quotes', label: t('navQuotes'), icon: <BookOpen className="w-4 h-4" /> },
    { id: 'gallery', label: t('navGallery'), icon: <ImageIcon className="w-4 h-4" /> },
    { id: 'favorites', label: t('navFavorites'), icon: <Heart className="w-4 h-4" /> },
  ];

  const handleNavClick = (tab: ActiveTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#120e0c]/90 backdrop-blur-md border-b border-[#c5a059]/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20">
          {/* Logo */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <span className="text-2xl sm:text-3xl transition-transform group-hover:scale-110">
              💌
            </span>
            <div className="flex flex-col">
              <span className="font-bengali-serif text-lg sm:text-2xl font-bold tracking-wide text-[#f4ecd8] group-hover:text-[#c5a059] transition-colors">
                {t('appName')}
              </span>
              <span className="text-[10px] sm:text-xs text-[#a89984] font-bengali-sans hidden sm:block">
                {t('tagline')}
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navItems.map(item => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-3.5 py-2 text-sm font-medium rounded-lg transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'text-[#fbf6ec] bg-[#291f18] border border-[#c5a059]/40 shadow-sm'
                      : 'text-[#c2b3a1] hover:text-[#f4ecd8] hover:bg-[#1d1612]'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                  {item.id === 'favorites' && favoritesCount > 0 && (
                    <span className="ml-1 px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-[#83182b] text-[#fbf6ec] border border-[#d4af37]/40">
                      {favoritesCount}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Language Switcher Button */}
            <button
              onClick={toggleLanguage}
              className="px-2.5 py-1.5 sm:px-3 sm:py-2 text-xs font-semibold rounded-lg bg-[#1f1712] border border-[#c5a059]/40 hover:border-[#d4af37] text-[#e8d5b5] hover:text-[#fbf6ec] transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
              title={language === 'bn' ? 'Switch to English' : 'বাংলায় রূপান্তর করুন'}
              aria-label="Toggle Language"
            >
              <Globe className="w-3.5 h-3.5 text-[#d4af37]" />
              <span className="font-semibold tracking-wide">
                {language === 'bn' ? 'EN' : 'বাং'}
              </span>
            </button>

            {/* Standalone HTML File Direct Download */}
            <a
              href="/vintage-chithi.html"
              download="vintage-chithi.html"
              className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1.5 sm:px-3 sm:py-2 text-xs font-semibold rounded-lg bg-[#1e1711] border border-[#c5a059]/30 hover:border-[#ffd700] text-[#ffd700] transition-all shadow-sm"
              title={language === 'bn' ? 'অফলাইন একক HTML ফাইল ডাউনলোড করুন' : 'Download Standalone Single-File HTML'}
            >
              <span>📄</span>
              <span className="hidden xl:inline">HTML File</span>
            </a>

            {/* Global Search Button */}
            <button
              onClick={onOpenSearch}
              className="p-2 sm:px-3 sm:py-2 text-[#c2b3a1] hover:text-[#f4ecd8] bg-[#1d1612] border border-[#3a2d24] hover:border-[#c5a059]/50 rounded-lg text-xs sm:text-sm flex items-center gap-1.5 transition-all shadow-sm"
              title={t('search')}
            >
              <Search className="w-4 h-4 text-[#c5a059]" />
              <span className="hidden lg:inline text-xs text-[#998774]">{t('search')}</span>
            </button>

            {/* Main Generator CTA */}
            <button
              onClick={() => handleNavClick('generator')}
              className="px-3 sm:px-4 lg:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-[#83182b] to-[#9c2037] hover:from-[#941c32] hover:to-[#b0243e] text-[#fbf6ec] font-semibold text-xs sm:text-sm rounded-lg border border-[#d4af37]/50 shadow-md hover:shadow-lg transition-all active:scale-[0.98] flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-[#ffd700]" />
              <span className="whitespace-nowrap">{t('createLetter')}</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#c2b3a1] hover:text-[#f4ecd8] rounded-lg bg-[#1d1612] border border-[#3a2d24]"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-[#31251c] space-y-1.5 animate-fade-in pb-4">
            {/* Mobile Language Switcher Row */}
            <div className="flex items-center justify-between px-4 py-2 mb-2 bg-[#1b140f] rounded-lg border border-[#382b20]">
              <span className="text-xs text-[#a89984] flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-[#c5a059]" />
                ভাষা / Language
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => toggleLanguage()}
                  className={`px-3 py-1 text-xs rounded font-medium transition-colors ${
                    language === 'bn'
                      ? 'bg-[#83182b] text-[#fbf6ec] border border-[#d4af37]'
                      : 'bg-[#291f17] text-[#a89984]'
                  }`}
                >
                  বাংলা
                </button>
                <button
                  onClick={() => toggleLanguage()}
                  className={`px-3 py-1 text-xs rounded font-medium transition-colors ${
                    language === 'en'
                      ? 'bg-[#83182b] text-[#fbf6ec] border border-[#d4af37]'
                      : 'bg-[#291f17] text-[#a89984]'
                  }`}
                >
                  English
                </button>
              </div>
            </div>

            {navItems.map(item => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full px-4 py-2.5 text-left text-sm font-medium rounded-lg flex items-center justify-between ${
                    isActive
                      ? 'bg-[#291f18] text-[#fbf6ec] border border-[#c5a059]/40'
                      : 'text-[#c2b3a1] hover:bg-[#1c1511] hover:text-[#f4ecd8]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                  {item.id === 'favorites' && favoritesCount > 0 && (
                    <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-[#83182b] text-[#fbf6ec] border border-[#d4af37]/40">
                      {favoritesCount}
                    </span>
                  )}
                </button>
              );
            })}

            <div className="pt-2 px-1">
              <a
                href="/vintage-chithi.html"
                download="vintage-chithi.html"
                className="w-full py-2 px-4 rounded-lg bg-[#221812] border border-[#d4af37]/40 text-[#ffd700] text-xs font-semibold flex items-center justify-center gap-2"
              >
                <span>📄</span>
                <span>{language === 'bn' ? 'সিঙ্গেল-ফাইল HTML ডাউনলোড করুন' : 'Download Standalone HTML'}</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
