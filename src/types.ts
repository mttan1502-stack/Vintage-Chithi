export type TextPosition = 'center' | 'left' | 'right' | 'top-left' | 'bottom-left' | 'top' | 'bottom';
export type BorderStyle = 'vintage' | 'double' | 'ornate' | 'simple' | 'none';
export type VintageEffect = 
  | 'original' 
  | 'sepia' 
  | 'old-paper' 
  | 'faded' 
  | 'bw' 
  | 'film-grain' 
  | 'dust' 
  | 'scratch' 
  | 'coffee-stain' 
  | 'warm-vintage';

export type AspectRatioType = 'postcard' | 'square' | 'story' | 'facebook' | 'status';

export interface AspectRatioOption {
  id: AspectRatioType;
  labelBengali: string;
  labelEnglish: string;
  ratioClass: string;
  cssRatio: string;
  width: number;
  height: number;
}

export interface PostcardTemplate {
  id: string;
  title: string;
  titleEn?: string;
  category: string;
  categoryEn?: string;
  image: string;
  defaultQuote: string;
  defaultQuoteEn?: string;
  textPosition: TextPosition;
  typography: {
    fontFamily: string;
    fontSize: number;
    color: string;
    lineHeight?: number;
  };
  borderStyle: BorderStyle;
  collection?: 'popular' | 'new' | 'romantic' | 'rainy' | 'letter';
  descriptionBengali?: string;
  descriptionEn?: string;
  paperTone?: string;
}

export interface Quote {
  id: string;
  text: string;
  textEn?: string;
  category: string;
  categoryEn?: string;
  author?: string;
  authorEn?: string;
  authorRole?: string;
  authorRoleEn?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  titleEn?: string;
  image: string;
  category: string;
  categoryEn?: string;
  quote: string;
  quoteEn?: string;
  aspectRatio?: string;
}

export interface CustomizationState {
  recipient: string;
  message: string;
  sender: string;
  date: string;
  fontFamily: string;
  fontSize: number;
  isBold: boolean;
  isItalic: boolean;
  textAlign: 'left' | 'center' | 'right';
  letterSpacing: number;
  lineHeight: number;
  textColor: string;
  textPosition: TextPosition;
  vintageEffect: VintageEffect;
  aspectRatio: AspectRatioType;
  showStamp: boolean;
  stampType: 'rose' | 'postmark' | 'wax' | 'vintage-bird' | 'crown';
  borderStyle: BorderStyle;
  paperTone: 'parchment' | 'antique-sepia' | 'dark-velvet' | 'faded-rose' | 'kraft';
  backgroundOverlayOpacity: number;
}

export type ActiveTab = 'home' | 'postcards' | 'quotes' | 'gallery' | 'generator' | 'favorites';
