import React, { useState } from 'react';
import { ActiveTab, PostcardTemplate, Quote, GalleryItem } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { DownloadGateModal } from './components/DownloadGateModal';
import { Home } from './views/Home';
import { PostcardsView } from './views/PostcardsView';
import { QuotesView } from './views/QuotesView';
import { GalleryView } from './views/GalleryView';
import { FavoritesView } from './views/FavoritesView';
import { Generator } from './views/Generator';
import { useFavorites } from './utils/favorites';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import confetti from 'canvas-confetti';

function MainApp() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { language } = useLanguage();

  // Selected template & quote passed into generator
  const [activeTemplate, setActiveTemplate] = useState<PostcardTemplate | undefined>(undefined);
  const [activeQuoteText, setActiveQuoteText] = useState<string | undefined>(undefined);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');

  // Favorites state
  const { favorites, toggleFavorite, isFavorite, totalCount } = useFavorites();

  // Gallery direct download gate state
  const [pendingGalleryItem, setPendingGalleryItem] = useState<GalleryItem | null>(null);
  const [galleryFormat, setGalleryFormat] = useState<'png' | 'jpg'>('png');

  // Transition to Generator with specific parameters
  const handleStartGenerator = (template?: PostcardTemplate, quoteText?: string) => {
    if (template) setActiveTemplate(template);
    if (quoteText) setActiveQuoteText(quoteText);
    setActiveTab('generator');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Select category from Home or Search
  const handleSelectCategory = (catName: string) => {
    setActiveCategoryFilter(catName);
    setActiveTab('postcards');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Gallery item download trigger -> opens download gate
  const handleDownloadGalleryItem = (item: GalleryItem) => {
    setPendingGalleryItem(item);
  };

  const handleExecuteGalleryDownload = async () => {
    if (!pendingGalleryItem) return;
    try {
      // Fetch image blob to download cleanly
      const response = await fetch(pendingGalleryItem.image);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `VintageChithi_Gallery_${pendingGalleryItem.id}.${galleryFormat}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 }
        });
      } catch (e) {
        // silent
      }
    } catch (e) {
      // Fallback: open image in new tab if cross-origin fetch is restricted
      window.open(pendingGalleryItem.image, '_blank');
    } finally {
      setPendingGalleryItem(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#0e0c0a] text-[#f4ecd8] flex flex-col selection:bg-[#83182b] selection:text-[#fbf6ec]">
      {/* Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        favoritesCount={totalCount}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main View Container */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <Home
            onStartGenerator={handleStartGenerator}
            onExploreGallery={() => {
              setActiveTab('gallery');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectCategory={handleSelectCategory}
            onToggleFavorite={toggleFavorite}
            isFavorite={isFavorite}
          />
        )}

        {activeTab === 'postcards' && (
          <PostcardsView
            initialCategory={activeCategoryFilter}
            onStartGenerator={handleStartGenerator}
            onToggleFavorite={toggleFavorite}
            isFavorite={isFavorite}
          />
        )}

        {activeTab === 'quotes' && (
          <QuotesView
            onUseQuote={(quoteText) => handleStartGenerator(undefined, quoteText)}
            onToggleFavorite={toggleFavorite}
            isFavorite={isFavorite}
          />
        )}

        {activeTab === 'gallery' && (
          <GalleryView
            onDownloadItem={handleDownloadGalleryItem}
            onToggleFavorite={toggleFavorite}
            isFavorite={isFavorite}
          />
        )}

        {activeTab === 'generator' && (
          <Generator
            initialTemplate={activeTemplate}
            initialQuote={activeQuoteText}
          />
        )}

        {activeTab === 'favorites' && (
          <FavoritesView
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            onStartGenerator={handleStartGenerator}
            onDownloadGallery={handleDownloadGalleryItem}
          />
        )}
      </main>

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />

      {/* Global Search Modal */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectPostcard={(p) => handleStartGenerator(p)}
        onSelectQuote={(q) => handleStartGenerator(undefined, q.text)}
        onSelectGallery={(g) => {
          setActiveTab('gallery');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onSelectCategory={handleSelectCategory}
      />

      {/* Gallery Download Gate Modal */}
      <DownloadGateModal
        isOpen={pendingGalleryItem !== null}
        onClose={() => setPendingGalleryItem(null)}
        onReadyToDownload={handleExecuteGalleryDownload}
        format={galleryFormat}
        onFormatChange={setGalleryFormat}
      />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <MainApp />
    </LanguageProvider>
  );
}
