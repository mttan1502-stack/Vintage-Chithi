import { VintageEffect } from '../types';

export interface VintageEffectOption {
  id: VintageEffect;
  nameBengali: string;
  nameEnglish: string;
  filterClass: string;
  overlayClass: string;
}

export const VINTAGE_EFFECTS: VintageEffectOption[] = [
  {
    id: 'original',
    nameBengali: 'মূল রূপ (Original)',
    nameEnglish: 'Original',
    filterClass: '',
    overlayClass: ''
  },
  {
    id: 'sepia',
    nameBengali: 'সিপিয়া (Sepia)',
    nameEnglish: 'Sepia',
    filterClass: 'sepia-[0.65] contrast-[0.95] brightness-[0.95]',
    overlayClass: 'bg-[#704214]/15 mix-blend-multiply'
  },
  {
    id: 'old-paper',
    nameBengali: 'পুরনো কাগজ (Old Paper)',
    nameEnglish: 'Old Paper',
    filterClass: 'sepia-[0.4] contrast-[1.05] brightness-[0.92]',
    overlayClass: 'bg-[#d2b48c]/25 mix-blend-multiply'
  },
  {
    id: 'faded',
    nameBengali: 'মলিন স্মৃতি (Faded)',
    nameEnglish: 'Faded',
    filterClass: 'opacity-90 contrast-[0.85] brightness-[1.05] saturate-[0.75]',
    overlayClass: 'bg-[#f4ecd8]/10'
  },
  {
    id: 'bw',
    nameBengali: 'সাদা-কালো (Black & White)',
    nameEnglish: 'B&W Film',
    filterClass: 'grayscale contrast-[1.2] brightness-[0.9]',
    overlayClass: 'bg-black/10 mix-blend-overlay'
  },
  {
    id: 'film-grain',
    nameBengali: 'ফিল্ম গ্রেইন (Film Grain)',
    nameEnglish: 'Film Grain',
    filterClass: 'contrast-[1.1] brightness-[0.96]',
    overlayClass: 'vintage-grain mix-blend-overlay'
  },
  {
    id: 'dust',
    nameBengali: 'ধূলিময় (Dust & Nostalgia)',
    nameEnglish: 'Dust',
    filterClass: 'sepia-[0.3] contrast-[0.95]',
    overlayClass: 'bg-[#b8860b]/15 mix-blend-color-burn'
  },
  {
    id: 'scratch',
    nameBengali: 'আঁচড় দাগ (Vintage Scratch)',
    nameEnglish: 'Scratch',
    filterClass: 'contrast-[1.15] brightness-[0.9]',
    overlayClass: 'bg-[#2b1d0c]/20 mix-blend-soft-light'
  },
  {
    id: 'coffee-stain',
    nameBengali: 'কফি ছোপ (Coffee Stain)',
    nameEnglish: 'Coffee Stain',
    filterClass: 'sepia-[0.5] contrast-[1.05]',
    overlayClass: 'bg-[#4a2e18]/25 mix-blend-multiply'
  },
  {
    id: 'warm-vintage',
    nameBengali: 'উষ্ণ ভিন্টেজ (Warm Vintage)',
    nameEnglish: 'Warm Vintage',
    filterClass: 'sepia-[0.25] saturate-[1.15] contrast-[1.05] hue-rotate-[-10deg]',
    overlayClass: 'bg-[#e29578]/15 mix-blend-soft-light'
  }
];
