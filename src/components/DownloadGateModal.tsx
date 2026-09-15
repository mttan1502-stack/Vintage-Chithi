import React, { useState, useEffect } from 'react';
import { SPONSOR_URL } from '../config/sponsor';
import { X, ExternalLink, Lock, CheckCircle, Download, Clock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface DownloadGateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReadyToDownload: () => void;
  format: 'png' | 'jpg';
  onFormatChange: (format: 'png' | 'jpg') => void;
}

export const DownloadGateModal: React.FC<DownloadGateModalProps> = ({
  isOpen,
  onClose,
  onReadyToDownload,
  format,
  onFormatChange
}) => {
  const [hasClickedSponsor, setHasClickedSponsor] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(8);
  const [isReady, setIsReady] = useState(false);
  const { language, t } = useLanguage();
  const isEn = language === 'en';

  // Reset states whenever modal opens
  useEffect(() => {
    if (isOpen) {
      setHasClickedSponsor(false);
      setSecondsRemaining(8);
      setIsReady(false);
    }
  }, [isOpen]);

  // 8-second countdown timer once user clicks sponsor
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (hasClickedSponsor && secondsRemaining > 0) {
      timer = setInterval(() => {
        setSecondsRemaining(prev => {
          if (prev <= 1) {
            setIsReady(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [hasClickedSponsor, secondsRemaining]);

  if (!isOpen) return null;

  const handleSponsorClick = () => {
    // Open sponsor URL in new tab safely
    try {
      window.open(SPONSOR_URL, '_blank', 'noopener,noreferrer');
    } catch (e) {
      console.warn('Popup blocked or prevented', e);
    }
    setHasClickedSponsor(true);
    setSecondsRemaining(8);
    setIsReady(false);
  };

  const handleDownloadClick = () => {
    if (isReady) {
      onReadyToDownload();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-lg bg-[#181310] border border-[#c5a059]/40 rounded-xl shadow-2xl p-6 sm:p-8 text-[#f4ecd8] overflow-hidden"
        style={{
          boxShadow: '0 20px 50px rgba(0,0,0,0.8), inset 0 1px 1px rgba(212,175,55,0.2)'
        }}
      >
        {/* Ornate Corner Accents */}
        <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-[#d4af37]/60" />
        <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-[#d4af37]/60" />
        <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-[#d4af37]/60" />
        <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-[#d4af37]/60" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#a89984] hover:text-[#f4ecd8] p-1.5 rounded-full hover:bg-white/5 transition-colors"
          title={t('close')}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#83182b]/30 border border-[#83182b] text-2xl mb-3 shadow-inner">
            💌
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-bengali-serif text-[#ebd9b7] tracking-wide">
            {t('downloadReadyModalTitle')}
          </h3>
          <div className="h-0.5 w-16 bg-[#c5a059]/40 mx-auto my-2 rounded-full" />
          <p className="text-sm sm:text-base text-[#d8c7ad] font-bengali-sans mt-2">
            {t('sponsorPageNotice')}
          </p>
        </div>

        {/* Download Format Chooser */}
        <div className="bg-[#241c16] border border-[#423326] rounded-lg p-3.5 mb-5">
          <div className="flex items-center justify-between text-xs text-[#d8c7ad] mb-2 font-medium">
            <span>{isEn ? 'Select Download Format:' : 'ডাউনলোড ফরম্যাট নির্বাচন করুন:'}</span>
            <span className="text-[#c5a059] font-mono">HD High Resolution</span>
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => onFormatChange('png')}
              className={`py-2 px-3 text-xs sm:text-sm font-medium rounded-md border transition-all flex items-center justify-center gap-1.5 ${
                format === 'png'
                  ? 'bg-[#83182b] border-[#d4af37]/70 text-[#fbf6ec] shadow-md'
                  : 'bg-[#181310] border-[#3d2e22] text-[#a89984] hover:border-[#c5a059]/40'
              }`}
            >
              <span>{isEn ? 'PNG (Maximum Clarity)' : 'PNG (সর্বোচ্চ স্পষ্টতা)'}</span>
            </button>
            <button
              type="button"
              onClick={() => onFormatChange('jpg')}
              className={`py-2 px-3 text-xs sm:text-sm font-medium rounded-md border transition-all flex items-center justify-center gap-1.5 ${
                format === 'jpg'
                  ? 'bg-[#83182b] border-[#d4af37]/70 text-[#fbf6ec] shadow-md'
                  : 'bg-[#181310] border-[#3d2e22] text-[#a89984] hover:border-[#c5a059]/40'
              }`}
            >
              <span>{isEn ? 'JPG (Compact Size)' : 'JPG (কম্প্যাক্ট সাইজ)'}</span>
            </button>
          </div>
        </div>

        {/* Sponsor Action & Countdown Gate Area */}
        <div className="space-y-4">
          {!hasClickedSponsor ? (
            <div>
              <button
                type="button"
                onClick={handleSponsorClick}
                className="w-full py-3.5 px-5 bg-gradient-to-r from-[#c5a059] to-[#d4af37] text-[#1a120b] font-bold rounded-lg shadow-lg hover:brightness-105 active:scale-[0.99] transition-all flex items-center justify-center gap-2.5 text-base"
              >
                <ExternalLink className="w-5 h-5" />
                <span>{t('sponsorVisitBtn')}</span>
              </button>
              <p className="text-[11px] text-center text-[#998774] mt-2">
                {t('sponsorCountdownHint')}
              </p>
            </div>
          ) : (
            <div className="bg-[#211913] border border-[#c5a059]/30 rounded-lg p-4 text-center space-y-3">
              {!isReady ? (
                <>
                  <div className="flex items-center justify-center gap-2 text-[#c5a059] font-medium text-sm">
                    <Clock className="w-4 h-4 animate-spin" />
                    <span>{isEn ? 'Rendering in HD...' : 'Download প্রস্তুত হচ্ছে...'}</span>
                  </div>

                  {/* Countdown Display */}
                  <div className="flex items-center justify-center my-2">
                    <div className="w-16 h-16 rounded-full border-2 border-[#c5a059]/50 flex items-center justify-center bg-[#15100c] text-3xl font-bold font-mono text-[#d4af37] shadow-inner">
                      {secondsRemaining}
                    </div>
                  </div>

                  <p className="text-xs text-[#a89984]">
                    {isEn ? 'Please wait, rendering your vintage postcard in high definition...' : 'অনুগ্রহ করে অপেক্ষা করুন, পোস্টকার্ড হাই-ডেফিনিশনে রেন্ডার হচ্ছে...'}
                  </p>

                  <button
                    disabled
                    type="button"
                    className="w-full py-3 px-4 bg-[#2f241c] text-[#786959] font-medium rounded-lg flex items-center justify-center gap-2 cursor-not-allowed border border-[#3e3025]"
                  >
                    <Lock className="w-4 h-4" />
                    <span>{t('downloadLocked')} ({secondsRemaining}s)</span>
                  </button>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-center gap-2 text-emerald-400 font-semibold text-base animate-pulse">
                    <CheckCircle className="w-5 h-5" />
                    <span>{t('downloadReadySuccess')}</span>
                  </div>
                  <p className="text-xs text-[#d8c7ad]">
                    {isEn ? 'Your customized vintage postcard is ready for instant download!' : 'আপনার কাস্টমাইজড ভিন্টেজ পোস্টকার্ড এখন ডাউনলোডের জন্য সম্পূর্ণ প্রস্তুত!'}
                  </p>
                  <button
                    type="button"
                    onClick={handleDownloadClick}
                    className="w-full py-3.5 px-5 bg-gradient-to-r from-[#83182b] to-[#a32238] hover:from-[#941c32] hover:to-[#b82941] text-[#fdf8f0] font-bold rounded-lg shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2 text-base border border-[#d4af37]/60 active:scale-[0.99]"
                  >
                    <Download className="w-5 h-5" />
                    <span>{t('downloadNowBtn')} ({format.toUpperCase()})</span>
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        {/* Security & Period Note */}
        <div className="mt-5 pt-3 border-t border-[#31251c] flex items-center justify-between text-[11px] text-[#8c7a69]">
          <span>{isEn ? '100% Watermark-Free HD Quality' : 'কোনো ওয়াটারমার্ক ছাড়াই ফুল HD কোয়ালিটি'}</span>
          <span className="font-cinzel text-[#c5a059]/70">Vintage Chithi Archive</span>
        </div>
      </div>
    </div>
  );
};
