import { useState, useEffect } from 'react';

export interface FavoritesState {
  postcards: string[]; // ids
  quotes: string[];    // ids
  gallery: string[];   // ids
}

const FAVORITES_KEY = 'vintage_chithi_favorites_v1';

export function getFavorites(): FavoritesState {
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Error reading favorites from localStorage:', e);
  }
  return { postcards: [], quotes: [], gallery: [] };
}

export function saveFavorites(favs: FavoritesState) {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favs));
  } catch (e) {
    console.error('Error saving favorites to localStorage:', e);
  }
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoritesState>(getFavorites);

  useEffect(() => {
    const handleStorage = () => {
      setFavorites(getFavorites());
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const toggleFavorite = (type: 'postcards' | 'quotes' | 'gallery', id: string) => {
    setFavorites(prev => {
      const list = prev[type];
      const exists = list.includes(id);
      const nextList = exists ? list.filter(item => item !== id) : [...list, id];
      const updated = { ...prev, [type]: nextList };
      saveFavorites(updated);
      return updated;
    });
  };

  const isFavorite = (type: 'postcards' | 'quotes' | 'gallery', id: string) => {
    return favorites[type].includes(id);
  };

  const totalCount = favorites.postcards.length + favorites.quotes.length + favorites.gallery.length;

  return { favorites, toggleFavorite, isFavorite, totalCount };
}
