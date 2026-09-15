export interface CategoryItem {
  id: string;
  name: string;
  nameEn: string;
  emoji: string;
  slug: string;
}

export const CATEGORIES: CategoryItem[] = [
  { id: 'cat-all', name: 'সবগুলো', nameEn: 'All', emoji: '✨', slug: 'all' },
  { id: 'cat-poetic', name: 'কাব্য ও গজল', nameEn: 'Poetry & Ghazals', emoji: '📜', slug: 'কাব্য ও গজল' },
  { id: 'cat-love', name: 'প্রেম', nameEn: 'Love', emoji: '❤️', slug: 'প্রেম' },
  { id: 'cat-romantic', name: 'রোমান্টিক', nameEn: 'Romantic', emoji: '🌹', slug: 'রোমান্টিক' },
  { id: 'cat-heartbreak', name: 'বিরহ', nameEn: 'Heartbreak & Longing', emoji: '💔', slug: 'বিরহ' },
  { id: 'cat-missing', name: 'মিস করা', nameEn: 'Missing You', emoji: '🥺', slug: 'মিস করা' },
  { id: 'cat-rain', name: 'বৃষ্টি', nameEn: 'Rain & Solitude', emoji: '🌧️', slug: 'বৃষ্টি' },
  { id: 'cat-night', name: 'রাতের অনুভূতি', nameEn: 'Midnight Thoughts', emoji: '🌙', slug: 'রাতের অনুভূতি' },
  { id: 'cat-letter', name: 'প্রেমপত্র', nameEn: 'Love Letters', emoji: '💌', slug: 'প্রেমপত্র' },
  { id: 'cat-proposal', name: 'প্রপোজ', nameEn: 'Proposal', emoji: '💍', slug: 'প্রপোজ' },
  { id: 'cat-birthday', name: 'জন্মদিন', nameEn: 'Birthday', emoji: '🎂', slug: 'জন্মদিন' },
  { id: 'cat-anniversary', name: 'Anniversary', nameEn: 'Anniversary', emoji: '💑', slug: 'Anniversary' },
  { id: 'cat-unrequited', name: 'একতরফা প্রেম', nameEn: 'Unrequited Love', emoji: '🖤', slug: 'একতরফা প্রেম' },
  { id: 'cat-memories', name: 'স্মৃতি', nameEn: 'Nostalgic Memories', emoji: '🌸', slug: 'স্মৃতি' },
  { id: 'cat-classic', name: 'Classic Vintage', nameEn: 'Classic Vintage', emoji: '🎞️', slug: 'Classic Vintage' },
  { id: 'cat-bengali', name: 'Bengali Vintage', nameEn: 'Bengali Vintage', emoji: '🇧🇩', slug: 'Bengali Vintage' },
];
