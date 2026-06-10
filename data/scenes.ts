export interface Scene {
  id: string;
  start: number; // 0–1
  end: number;   // 0–1
  kicker?: string;
  title: string;
  subtitle?: string;
}

export const scenes: Scene[] = [
  {
    id: 'scene-1',
    start: 0.0,
    end: 0.05,
    kicker: 'AVE DUBAI',
    title: 'A New Ritual Awaits.',
    subtitle:
      'Not a normal café. Not a normal restaurant. An urban sanctuary in the heart of Dubai.',
  },
  {
    id: 'scene-2',
    start: 0.05,
    end: 0.12,
    title: 'Sourced Globally. Perfected in Dubai.',
    subtitle:
      'Ultra-premium beans, curated from the world’s most coveted origins, refined for the Dubai palate.',
  },
  {
    id: 'scene-3',
    start: 0.12,
    end: 0.2,
    title: 'Crafted Slowly. Roasted to Absolute Perfection.',
    subtitle:
      'Heat, time, and precision—engineered to unlock depth, sweetness, and aromatic complexity.',
  },
  {
    id: 'scene-4',
    start: 0.2,
    end: 0.28,
    title: 'Precision Ground. Capturing Every Aroma.',
    subtitle:
      'Microscopic attention to particle size ensures every note is preserved, never rushed.',
  },
  {
    id: 'scene-5',
    start: 0.28,
    end: 0.37,
    title: 'Liquid Gold. 9 Bars of Pure Sophistication.',
    subtitle:
      'A bottomless extraction that reveals a dense, honey-like stream of crema-rich espresso.',
  },
  {
    id: 'scene-6',
    start: 0.37,
    end: 0.45,
    title: 'The Canvas is Ready.',
    subtitle:
      'A single porcelain cup, a dark timber table, and the promise of something unforgettable.',
  },
  {
    id: 'scene-7',
    start: 0.45,
    end: 0.54,
    title: 'Freshly Extracted from the World’s Most Exclusive Beans.',
    subtitle:
      'The first pour, the first ripple, the first moment of quiet satisfaction.',
  },
  {
    id: 'scene-8',
    start: 0.54,
    end: 0.63,
    title: 'Textured into Liquid Silk.',
    subtitle:
      'Micro-foam milk folding into espresso, creating a seamless, velvety harmony.',
  },
  {
    id: 'scene-9',
    start: 0.63,
    end: 0.72,
    title: 'Where Artistry Meets Mixology.',
    subtitle:
      'Latte art as a signature—every cup a bespoke composition of balance and contrast.',
  },
  {
    id: 'scene-10',
    start: 0.72,
    end: 0.8,
    title: 'Every Cup Has a Story. This Is Yours.',
    subtitle:
      'Steam, aroma, and warmth converge into a moment designed entirely around you.',
  },
  {
    id: 'scene-11',
    start: 0.8,
    end: 0.85,
    title: 'Welcome to AVE Dubai. An Urban Escape.',
    subtitle:
      'Step beyond the cup into a space that frames the Dubai Fountain lifestyle.',
  },
  {
    id: 'scene-12',
    start: 0.85,
    end: 0.9,
    title: 'Designed for the Global Connoisseur.',
    subtitle:
      'Sculptural lighting, warm timber, and curated textures define a new standard of comfort.',
  },
  {
    id: 'scene-13',
    start: 0.9,
    end: 0.93,
    title: 'Impeccable Atmosphere. Unforgettable Memories.',
    subtitle:
      'From intimate evenings to elevated business encounters, every table is a stage.',
  },
  {
    id: 'scene-14',
    start: 0.93,
    end: 0.96,
    title: '★ ★ ★ ★ ★  |  4.8 Stars from 3,750+ Guests.',
    subtitle:
      '“The coffee is exquisite, the atmosphere is unmatched, and the presentation is pure poetry.”',
  },
  {
    id: 'scene-15',
    start: 0.96,
    end: 1.0,
    title: 'Experience AVE Dubai Tonight.',
    subtitle:
      'Reserve your table and step into a living, breathing expression of contemporary Dubai luxury.',
  },
];
