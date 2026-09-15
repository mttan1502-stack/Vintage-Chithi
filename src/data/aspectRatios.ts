import { AspectRatioOption } from '../types';

export const ASPECT_RATIOS: AspectRatioOption[] = [
  {
    id: 'postcard',
    labelBengali: 'ক্লাসিক পোস্টকার্ড',
    labelEnglish: 'Postcard (3:2)',
    ratioClass: 'aspect-[3/2]',
    cssRatio: '3/2',
    width: 1200,
    height: 800
  },
  {
    id: 'square',
    labelBengali: 'ইনস্টাগ্রাম স্কয়ার',
    labelEnglish: 'Square (1:1)',
    ratioClass: 'aspect-square',
    cssRatio: '1/1',
    width: 1080,
    height: 1080
  },
  {
    id: 'story',
    labelBengali: 'ইনস্টাগ্রাম স্টোরি',
    labelEnglish: 'IG Story (9:16)',
    ratioClass: 'aspect-[9/16]',
    cssRatio: '9/16',
    width: 1080,
    height: 1920
  },
  {
    id: 'facebook',
    labelBengali: 'ফেসবুক পোস্ট',
    labelEnglish: 'Facebook (16:9)',
    ratioClass: 'aspect-[16/9]',
    cssRatio: '16/9',
    width: 1200,
    height: 675
  },
  {
    id: 'status',
    labelBengali: 'হোয়াটসঅ্যাপ স্ট্যাটাস',
    labelEnglish: 'WhatsApp Status (9:16)',
    ratioClass: 'aspect-[9/16]',
    cssRatio: '9/16',
    width: 1080,
    height: 1920
  }
];
