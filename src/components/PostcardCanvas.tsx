import React, { forwardRef } from 'react';
import { PostcardTemplate, CustomizationState } from '../types';
import { VINTAGE_EFFECTS } from '../data/vintageEffects';

interface PostcardCanvasProps {
  template: PostcardTemplate;
  state: CustomizationState;
  className?: string;
  isThumbnail?: boolean;
}

export const PostcardCanvas = forwardRef<HTMLDivElement, PostcardCanvasProps>(
  ({ template, state, className = '', isThumbnail = false }, ref) => {
    const effectConfig = VINTAGE_EFFECTS.find(e => e.id === state.vintageEffect) || VINTAGE_EFFECTS[0];

    // Font class mapping
    const getFontFamilyClass = (fontKey: string) => {
      switch (fontKey) {
        case 'bengali-serif': return 'font-bengali-serif';
        case 'bengali-sans': return 'font-bengali-sans';
        case 'bengali-tiro': return 'font-bengali-tiro';
        case 'vintage-serif': return 'font-vintage-serif';
        case 'typewriter': return 'font-typewriter';
        case 'calligraphy': return 'font-calligraphy';
        default: return 'font-bengali-serif';
      }
    };

    // Paper tone background
    const getPaperToneStyle = (tone: string) => {
      switch (tone) {
        case 'parchment':
          return 'bg-[#f4ecd8] text-[#2c1d11]';
        case 'antique-sepia':
          return 'bg-[#eedcb7] text-[#23150c]';
        case 'dark-velvet':
          return 'bg-[#181310] text-[#f7eedc]';
        case 'faded-rose':
          return 'bg-[#f9ece8] text-[#331c19]';
        case 'kraft':
          return 'bg-[#d8c3a5] text-[#24170e]';
        default:
          return 'bg-[#f4ecd8] text-[#2c1d11]';
      }
    };

    // Border styling
    const getBorderStyle = (borderStyle: string) => {
      switch (borderStyle) {
        case 'vintage':
          return 'border-vintage-corner border border-[#c5a059]/60';
        case 'double':
          return 'border-vintage-double';
        case 'ornate':
          return 'border-vintage-ornate';
        case 'simple':
          return 'border border-[#c5a059]/40';
        case 'none':
          return 'border-0';
        default:
          return 'border border-[#c5a059]/50';
      }
    };

    // Aspect ratio styling
    const getAspectRatioClass = () => {
      switch (state.aspectRatio) {
        case 'postcard': return 'aspect-[3/2]';
        case 'square': return 'aspect-square';
        case 'story': return 'aspect-[9/16]';
        case 'facebook': return 'aspect-[16/9]';
        case 'status': return 'aspect-[9/16]';
        default: return 'aspect-[3/2]';
      }
    };

    // Text alignment
    const getAlignClass = () => {
      if (state.textAlign === 'left') return 'text-left items-start';
      if (state.textAlign === 'right') return 'text-right items-end';
      return 'text-center items-center';
    };

    return (
      <div
        ref={ref}
        id="vintage-postcard-export-canvas"
        className={`relative overflow-hidden shadow-2xl transition-all select-none ${getAspectRatioClass()} ${className}`}
        style={{
          backgroundColor: '#1a1410',
          backgroundImage: `url(${template.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Vintage Paper & Tone Underlay / Overlay */}
        <div 
          className="absolute inset-0 pointer-events-none transition-opacity"
          style={{
            backgroundColor: state.paperTone === 'dark-velvet' ? '#0d0a08' : '#2a1a10',
            opacity: state.backgroundOverlayOpacity,
          }}
        />

        {/* Vintage Filter Effect Layer */}
        {effectConfig.filterClass && (
          <div className={`absolute inset-0 pointer-events-none transition-all ${effectConfig.filterClass}`} />
        )}
        {effectConfig.overlayClass && (
          <div className={`absolute inset-0 pointer-events-none ${effectConfig.overlayClass}`} />
        )}

        {/* Vintage Edge Vignette & Grain */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            boxShadow: 'inset 0 0 60px rgba(0, 0, 0, 0.65), inset 0 0 120px rgba(25, 15, 8, 0.45)'
          }}
        />

        {/* Decorative Outer Border Frame */}
        <div className={`absolute inset-3 sm:inset-5 pointer-events-none z-10 ${getBorderStyle(state.borderStyle)}`}>
          {/* Ornate Corner Accents */}
          {state.borderStyle !== 'none' && (
            <>
              <div className="absolute top-1 left-1 w-3 h-3 border-t-2 border-l-2 border-[#d4af37]/70" />
              <div className="absolute top-1 right-1 w-3 h-3 border-t-2 border-r-2 border-[#d4af37]/70" />
              <div className="absolute bottom-1 left-1 w-3 h-3 border-b-2 border-l-2 border-[#d4af37]/70" />
              <div className="absolute bottom-1 right-1 w-3 h-3 border-b-2 border-r-2 border-[#d4af37]/70" />
            </>
          )}
        </div>

        {/* Top Postage Elements: Vintage Stamp & Postmark Seal */}
        {state.showStamp && (
          <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 flex items-start gap-2 sm:gap-3 pointer-events-none">
            {/* Vintage Postmark Circle Stamp */}
            <div className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-full border border-dashed border-[#d4af37]/70 flex flex-col items-center justify-center text-[8px] sm:text-[9px] font-typewriter tracking-widest text-[#d4af37]/80 rotate-[-12deg] select-none">
              <span className="text-[7px] sm:text-[8px]">ডাক বিভাগ</span>
              <span className="font-bold text-[9px] sm:text-[10px]">1971</span>
              <span className="text-[6px] sm:text-[7px]">CHITHI</span>
              <div className="absolute inset-1 rounded-full border border-[#d4af37]/30" />
            </div>

            {/* Postage Stamp or Wax Seal */}
            {state.stampType === 'wax' ? (
              <div className="vintage-seal w-11 h-11 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-[#fbf6ec] border border-[#fbf6ec]/30 rotate-[6deg]">
                <span className="text-xs sm:text-sm font-calligraphy font-bold">♥</span>
              </div>
            ) : (
              <div className="postage-stamp w-10 h-12 sm:w-13 sm:h-16 p-1 flex flex-col justify-between items-center bg-[#fbf6ec] text-[#331c19] border border-[#d4af37]/50 rotate-[4deg]">
                <div className="w-full flex justify-between items-center text-[7px] font-mono px-0.5 text-[#83182b]">
                  <span>50p</span>
                  <span>💌</span>
                </div>
                <div className="my-auto text-center">
                  <span className="text-xs sm:text-base">🌹</span>
                </div>
                <div className="text-[6px] sm:text-[7px] font-bengali-serif tracking-tighter text-[#5c3d2e]">
                  বাংলাদেশ ডাক
                </div>
              </div>
            )}
          </div>
        )}

        {/* Watermark / Brand Crest in Postcard Header (Subtle & Period-Authentic) */}
        <div className="absolute top-4 left-5 sm:top-6 sm:left-7 z-20 flex items-center gap-2 pointer-events-none opacity-75">
          <span className="text-xs sm:text-sm text-[#d4af37]">💌</span>
          <span className="text-[10px] sm:text-xs font-cinzel tracking-widest uppercase text-[#e8d7be]">
            Vintage Chithi
          </span>
        </div>

        {/* Main Content Area */}
        <div 
          className={`absolute inset-6 sm:inset-10 z-20 flex flex-col justify-between p-2 sm:p-4 ${getAlignClass()}`}
        >
          {/* Recipient Header */}
          <div className="w-full pt-4 sm:pt-6">
            {state.recipient && (
              <div 
                className={`text-sm sm:text-lg font-bengali-tiro text-[#e8d7be] drop-shadow-md pb-1 ${
                  state.textAlign === 'right' ? 'text-right' : state.textAlign === 'center' ? 'text-center' : 'text-left'
                }`}
                style={{
                  color: state.textColor || '#f6edd9'
                }}
              >
                {state.recipient.startsWith('প্রিয়') ? state.recipient : `প্রিয়, ${state.recipient}`}
              </div>
            )}
          </div>

          {/* Letter Body / Quote */}
          <div className="my-auto py-2 sm:py-4 w-full flex flex-col justify-center">
            <p
              className={`leading-relaxed whitespace-pre-wrap transition-all drop-shadow-lg ${getFontFamilyClass(state.fontFamily)} ${
                state.isBold ? 'font-bold' : 'font-normal'
              } ${state.isItalic ? 'italic' : ''}`}
              style={{
                fontSize: isThumbnail ? '11px' : `${state.fontSize}px`,
                lineHeight: isThumbnail ? 1.4 : state.lineHeight,
                letterSpacing: `${state.letterSpacing}px`,
                color: state.textColor || '#faebd7',
                textShadow: '0 2px 8px rgba(0, 0, 0, 0.85), 0 1px 3px rgba(0, 0, 0, 0.95)',
              }}
            >
              {state.message || template.defaultQuote}
            </p>
          </div>

          {/* Footer: Sender & Date */}
          <div className="w-full pb-1 sm:pb-2 flex flex-col sm:flex-row justify-between items-end gap-1 text-xs sm:text-sm">
            {/* Optional Date */}
            <div 
              className="text-[10px] sm:text-xs font-typewriter opacity-85 text-[#d4af37]"
              style={{ color: state.textColor || '#d4af37' }}
            >
              {state.date ? `তারিখ: ${state.date}` : ''}
            </div>

            {/* Sender Sign-off */}
            {state.sender && (
              <div
                className={`font-bengali-tiro text-xs sm:text-base font-semibold drop-shadow-md ${
                  state.textAlign === 'left' ? 'text-left sm:text-right' : state.textAlign === 'center' ? 'text-center sm:text-right' : 'text-right'
                }`}
                style={{ color: state.textColor || '#f6edd9' }}
              >
                {state.sender.startsWith('ইতি') ? state.sender : `ইতি, ${state.sender}`}
              </div>
            )}
          </div>
        </div>

        {/* Vintage Postage Perforations / Airmail Accent (Bottom Stripe subtle) */}
        <div className="absolute bottom-0 inset-x-0 h-1 flex opacity-60 pointer-events-none">
          {Array.from({ length: 30 }).map((_, idx) => (
            <div 
              key={idx} 
              className={`flex-1 h-full ${idx % 2 === 0 ? 'bg-[#83182b]' : 'bg-[#d4af37]'}`} 
            />
          ))}
        </div>
      </div>
    );
  }
);

PostcardCanvas.displayName = 'PostcardCanvas';
