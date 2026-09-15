import { PostcardTemplate } from '../types';

export const POSTCARD_TEMPLATES: PostcardTemplate[] = [
  {
    id: 'vp001',
    title: 'বৃষ্টির চিঠি (Rainy Love Letter)',
    titleEn: 'Rainy Love Letter',
    category: 'বৃষ্টি',
    image: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=1200&q=80',
    defaultQuote: 'তোমার কথা মনে পড়লে বৃষ্টিও যেন চিঠি হয়ে নামে।',
    defaultQuoteEn: 'When I think of you, even the falling rain turns into a gentle letter.',
    textPosition: 'center',
    typography: {
      fontFamily: 'bengali-serif',
      fontSize: 22,
      color: '#f6edd9',
      lineHeight: 1.8
    },
    borderStyle: 'vintage',
    collection: 'rainy',
    descriptionBengali: 'বৃষ্টিস্নাত জানালার কাঁচ ও বিষাদমাখা প্রেমের ক্লাসিক পোস্টকার্ড',
    descriptionEn: 'Raindrops on window panes with a tender nostalgic romantic atmosphere',
    paperTone: 'antique-sepia'
  },
  {
    id: 'vp002',
    title: 'হলুদ খামের স্মৃতি (Old Paper Letter)',
    titleEn: 'Old Parchment Letter',
    category: 'প্রেমপত্র',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80',
    defaultQuote: 'যে চিঠি কোনোদিন পাঠানো হয়নি, তার খামেই জমা থাকে সবচেয়ে খাঁটি অনুভূতি।',
    defaultQuoteEn: 'The letter never posted holds within its envelope the purest feelings.',
    textPosition: 'center',
    typography: {
      fontFamily: 'bengali-tiro',
      fontSize: 20,
      color: '#2a1a12',
      lineHeight: 1.9
    },
    borderStyle: 'ornate',
    collection: 'letter',
    descriptionBengali: 'পুরনো জীর্ণ হলদেটে চিঠি ও লাল মোমের সিলমোহর',
    descriptionEn: 'Aged parchment paper sealed with classic crimson wax stamp',
    paperTone: 'parchment'
  },
  {
    id: 'vp003',
    title: 'শুকনো গোলাপ (Vintage Rose)',
    titleEn: 'Vintage Pressed Rose',
    category: 'রোমান্টিক',
    image: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=1200&q=80',
    defaultQuote: 'বইয়ের পাতায় রাখা শুকনো গোলাপটার মতো আমাদের ভালোবাসাও অমলিন।',
    defaultQuoteEn: 'Like the dried rose kept between book pages, our love remains timeless.',
    textPosition: 'center',
    typography: {
      fontFamily: 'bengali-serif',
      fontSize: 22,
      color: '#faebd7',
      lineHeight: 1.8
    },
    borderStyle: 'double',
    collection: 'romantic',
    descriptionBengali: 'বইয়ের খাঁজে লুকানো পুরনো দিনের লাল গোলাপ',
    descriptionEn: 'A classic scarlet rose preserved inside an antique diary',
    paperTone: 'faded-rose'
  },
  {
    id: 'vp004',
    title: 'ক্যাফে ও কফি (Old Café Rendezvous)',
    titleEn: 'Old Café Rendezvous',
    category: 'প্রেম',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80',
    defaultQuote: 'এক কাপ চা, একটুখানি নীরবতা আর তোমার স্মৃতিই আমার বিকেল।',
    defaultQuoteEn: 'A warm cup of tea, quiet solitude, and your memory make my afternoon.',
    textPosition: 'center',
    typography: {
      fontFamily: 'bengali-serif',
      fontSize: 21,
      color: '#fdf6e2',
      lineHeight: 1.8
    },
    borderStyle: 'vintage',
    collection: 'popular',
    descriptionBengali: 'পুরনো কাঠের টেবিল ও ধোঁয়া ওঠা কফির রোমান্টিক আবহ',
    descriptionEn: 'Rustic wooden tables with steaming brew and vintage memories',
    paperTone: 'parchment'
  },
  {
    id: 'vp005',
    title: 'রেলস্টেশনের বিদায় (Railway Nostalgia)',
    titleEn: 'Railway Nostalgia',
    category: 'মিস করা',
    image: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=1200&q=80',
    defaultQuote: 'দূরত্ব কেবল দূরত্বেরই জন্ম দেয়, মনের কাছে তুমি সবসময় সেই প্রথমদিনের মতোই প্রিয়।',
    defaultQuoteEn: 'Distance is merely physical; to my soul, you are as precious as day one.',
    textPosition: 'center',
    typography: {
      fontFamily: 'bengali-tiro',
      fontSize: 20,
      color: '#f3e8cf',
      lineHeight: 1.8
    },
    borderStyle: 'ornate',
    collection: 'popular',
    descriptionBengali: 'কুয়াশায় ঘেরা পুরনো বাষ্পচালিত ট্রেনের স্টেশন ও প্রতিক্ষা',
    descriptionEn: 'Foggy vintage train station echoing with tender goodbyes and longing',
    paperTone: 'antique-sepia'
  },
  {
    id: 'vp006',
    title: 'জ্যোৎস্না রাত (Moonlit Reverie)',
    titleEn: 'Moonlit Reverie',
    category: 'রাতের অনুভূতি',
    image: 'https://images.unsplash.com/photo-1532767153582-b1a0e5145009?auto=format&fit=crop&w=1200&q=80',
    defaultQuote: 'তুমি ছাড়া এই নিঝুম রাতের প্রতিটি ক্ষণ যেন এক অনিঃশেষ প্রতীক্ষা।',
    defaultQuoteEn: 'Without you, every quiet breath of this moonlit night is an eternal vigil.',
    textPosition: 'center',
    typography: {
      fontFamily: 'bengali-serif',
      fontSize: 22,
      color: '#f4ecd8',
      lineHeight: 1.9
    },
    borderStyle: 'vintage',
    collection: 'new',
    descriptionBengali: 'মেঘলা আকাশের ফাঁক গলে আসা নরম চাঁদের আলো',
    descriptionEn: 'Soft moonlight filtering through nocturnal clouds into silent longing',
    paperTone: 'dark-velvet'
  },
  {
    id: 'vp007',
    title: 'পুরনো টাইপরাইটার (Typewriter Chithi)',
    titleEn: 'Retro Typewriter Letter',
    category: 'Classic Vintage',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    defaultQuote: 'পুরনো টাইপরাইটারের খটখট শব্দেও শুধু তোমারই নাম লেখা হয়ে যায়।',
    defaultQuoteEn: 'In every keystroke of this vintage typewriter, only your name is spelled.',
    textPosition: 'center',
    typography: {
      fontFamily: 'typewriter',
      fontSize: 21,
      color: '#281c15',
      lineHeight: 1.8
    },
    borderStyle: 'simple',
    collection: 'letter',
    descriptionBengali: '১৯৬০ দশকের রেট্রো টাইপরাইটারে টাইপ করা প্রেমপত্র',
    descriptionEn: 'Mid-century typewriter keystrokes creating an enduring love epistle',
    paperTone: 'parchment'
  },
  {
    id: 'vp008',
    title: 'গ্রামবাংলার নদী ও সূর্যাস্ত (River of Memories)',
    titleEn: 'River of Memories',
    category: 'Bengali Vintage',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    defaultQuote: 'নদীর জল যেমন মোহনায় হারায়, আমার সমস্ত অনুভূতি তোমাতেই বিলীন।',
    defaultQuoteEn: 'As calm rivers dissolve into the ocean, all my emotions surrender to you.',
    textPosition: 'center',
    typography: {
      fontFamily: 'bengali-tiro',
      fontSize: 21,
      color: '#fdf7ea',
      lineHeight: 1.8
    },
    borderStyle: 'vintage',
    collection: 'popular',
    descriptionBengali: 'নদীর শান্ত বুকে সূর্যাস্তের রক্তিম আভা ও নৌকা',
    descriptionEn: 'Golden sunset over tranquil waters with traditional river silhouettes',
    paperTone: 'antique-sepia'
  },
  {
    id: 'vp009',
    title: 'বৃষ্টিভেজা ছাতা (Umbrella in the Rain)',
    titleEn: 'Umbrella in the Rain',
    category: 'বৃষ্টি',
    image: 'https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?auto=format&fit=crop&w=1200&q=80',
    defaultQuote: 'একটাই ছাতা ছিল আমাদের, তবু ভিজে গিয়েছিলাম ভালোবাসার বৃষ্টিতে।',
    defaultQuoteEn: 'We shared just one small umbrella, yet got drenched in eternal romance.',
    textPosition: 'center',
    typography: {
      fontFamily: 'bengali-serif',
      fontSize: 22,
      color: '#faebd7',
      lineHeight: 1.8
    },
    borderStyle: 'double',
    collection: 'rainy',
    descriptionBengali: 'বৃষ্টির রাতে একটি ছাতার নিচে পাশাপাশি হাঁটার মধুর অনুভূতি',
    descriptionEn: 'Walking side by side under one umbrella through warm monsoon drizzles',
    paperTone: 'dark-velvet'
  },
  {
    id: 'vp010',
    title: 'মোমের আলোয় প্রেম (Candlelit Solitude)',
    titleEn: 'Candlelit Solitude',
    category: 'প্রেমপত্র',
    image: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1200&q=80',
    defaultQuote: 'মোমের ক্ষীণ আলোয় কাঁপতে কাঁপতে লিখেছিলাম তোমার নামের প্রথম অক্ষর।',
    defaultQuoteEn: 'By the gentle flicker of candlelight, I trembled as I penned your name.',
    textPosition: 'center',
    typography: {
      fontFamily: 'bengali-serif',
      fontSize: 21,
      color: '#fef3c7',
      lineHeight: 1.8
    },
    borderStyle: 'ornate',
    collection: 'letter',
    descriptionBengali: 'ঝাপসা অন্ধকার ঘরে জ্বলন্ত মোমবাতি ও দোয়াত-কলম',
    descriptionEn: 'Soft candlelight illuminating parchment, quill and deep passion',
    paperTone: 'antique-sepia'
  },
  {
    id: 'vp011',
    title: 'হাত ধরা প্রতিশ্রুতি (The Eternal Hold)',
    titleEn: 'The Eternal Hold',
    category: 'প্রপোজ',
    image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1200&q=80',
    defaultQuote: 'হাতটি ধরে সারাটা জীবন তোমার পাশে চলতে চাই, নিঃশব্দে অথচ বিশ্বস্ততায়।',
    defaultQuoteEn: 'I wish to hold your hand throughout this life, softly yet with unwavering faith.',
    textPosition: 'center',
    typography: {
      fontFamily: 'bengali-tiro',
      fontSize: 22,
      color: '#fffbf0',
      lineHeight: 1.9
    },
    borderStyle: 'vintage',
    collection: 'romantic',
    descriptionBengali: 'দুজনের হাতের নিবিড় স্পর্শ ও চিরন্তন ভালোবাসার শপথ',
    descriptionEn: 'Intertwined hands sealing a vow of devotion through every sunrise',
    paperTone: 'faded-rose'
  },
  {
    id: 'vp012',
    title: 'অ্যানিভার্সারি শুভেচ্ছা (Timeless Vow)',
    titleEn: 'Anniversary: Timeless Vow',
    category: 'Anniversary',
    image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=80',
    defaultQuote: 'বছরের পর বছর কেটে যাক, আমাদের ভালোবাসার সুর যেন চিরনবীন রয়। শুভ বিবাহবার্ষিকী!',
    defaultQuoteEn: 'May the years glide past, yet our love song stays ever youthful. Happy Anniversary!',
    textPosition: 'center',
    typography: {
      fontFamily: 'bengali-serif',
      fontSize: 20,
      color: '#f6edd9',
      lineHeight: 1.9
    },
    borderStyle: 'ornate',
    collection: 'romantic',
    descriptionBengali: 'ভিন্টেজ ফুলের তোড়া ও সোনালী ফিতায় মোড়ানো প্রেমস্মৃতি',
    descriptionEn: 'Vintage floral wreath wrapped with gilded ribbon and anniversary warmth',
    paperTone: 'antique-sepia'
  },
  {
    id: 'vp013',
    title: 'নীরব বিরহ (Silent Tear)',
    titleEn: 'Silent Tear',
    category: 'বিরহ',
    image: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=1200&q=80',
    defaultQuote: 'কিছু বিচ্ছেদ চোখের জলে ভাসে না, শুধু বুকে পাথর হয়ে জমে থাকে।',
    defaultQuoteEn: 'Some goodbyes do not wash away in tears; they weigh quietly upon the soul.',
    textPosition: 'center',
    typography: {
      fontFamily: 'bengali-serif',
      fontSize: 21,
      color: '#f4ecd8',
      lineHeight: 1.8
    },
    borderStyle: 'simple',
    collection: 'new',
    descriptionBengali: 'কুয়াশায় ঘেরা নির্জন পাইন বন ও একা দাঁড়িয়ে থাকা পথ',
    descriptionEn: 'Misty evergreen forest representing solemn contemplation and longing',
    paperTone: 'dark-velvet'
  },
  {
    id: 'vp014',
    title: 'একতরফা চিঠি (Unspoken Confession)',
    titleEn: 'Unspoken Confession',
    category: 'একতরফা প্রেম',
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80',
    defaultQuote: 'তুমি জানতেও পারলে না, আমার প্রতিটি প্রার্থনার নাম কেবল তুমিই ছিলে।',
    defaultQuoteEn: 'You never came to know that in every secret prayer, only your name was whispered.',
    textPosition: 'center',
    typography: {
      fontFamily: 'bengali-tiro',
      fontSize: 21,
      color: '#2d1e16',
      lineHeight: 1.9
    },
    borderStyle: 'vintage',
    collection: 'letter',
    descriptionBengali: 'ডায়েরির ছেঁড়া পাতায় লুকিয়ে রাখা না-বলা ভালোবাসার গান',
    descriptionEn: 'Torn notebook leaf keeping the softest confessions of unrequited love',
    paperTone: 'parchment'
  },
  {
    id: 'vp015',
    title: 'পাহাড়ের গোধূলি (Mountain Dusk)',
    titleEn: 'Mountain Dusk',
    category: 'স্মৃতি',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    defaultQuote: 'পাহাড়ের চূড়ায় দাঁড়িয়ে চিৎকার করে বলেছিলাম, আমি তোমাকেই ভালোবাসি।',
    defaultQuoteEn: 'Standing atop mountain summits, the wind carried my whisper: I adore only you.',
    textPosition: 'center',
    typography: {
      fontFamily: 'bengali-serif',
      fontSize: 22,
      color: '#fdf6e2',
      lineHeight: 1.8
    },
    borderStyle: 'double',
    collection: 'popular',
    descriptionBengali: 'কুয়াশাচ্ছন্ন পাহাড়ি শৃঙ্গ ও বিদায়ী সূর্যের রক্তিম আলো',
    descriptionEn: 'Crimson dusk illuminating alpine peaks with enduring devotion',
    paperTone: 'antique-sepia'
  },
  {
    id: 'vp016',
    title: 'ভিন্টেজ সিনেমা হল (Cinema Paradiso)',
    titleEn: 'Cinema Paradiso',
    category: 'Classic Vintage',
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80',
    defaultQuote: 'পুরনো ব্ল্যাক অ্যান্ড হোয়াইট সিনেমার মতো আমাদের প্রেমটাও চিরন্তন।',
    defaultQuoteEn: 'Like the golden reels of classic black-and-white cinema, our love is immortal.',
    textPosition: 'center',
    typography: {
      fontFamily: 'typewriter',
      fontSize: 20,
      color: '#eae0cb',
      lineHeight: 1.8
    },
    borderStyle: 'ornate',
    collection: 'new',
    descriptionBengali: '১৯৭০-এর ক্লাসিক সিনেমা প্রজেক্টর ও ফিল্ম রোল আর্ট',
    descriptionEn: 'Retro theatre aesthetics and vintage projector nostalgia',
    paperTone: 'antique-sepia'
  }
];
