import { ThemePalette } from './types';

// Distinct palettes for territories (up to 12 regions)
export const REGION_PALETTES: Record<ThemePalette, string[]> = {
  cozy: [
    '#ef4444', // Coral Red (0)
    '#0284c7', // Sky Cerulean (1)
    '#77ff00', // Spring Lime (2)
    '#114400', // Deep Forest (3)
    '#440088', // Royal Purple (4)
    '#ffccff', // Blossom Pink (5)
    '#997700', // Honey Gold (6)
    '#99eeff', // Glacier Cyan (7)
    '#009977', // Mint Emerald (8)
    '#ffddbb', // Buttercream (9)
    '#662200', // Dark Terracotta (10)
    '#dd00ee', // Orchid Magenta (11)
  ],
  pastel: [
    '#ff0f3c', // Strawberry Rose (0)
    '#00fff0', // Ice Blue (1)
    '#005a3c', // Seafoam Green (2)
    '#ffe1ff', // Sweet Pink (3)
    '#5a004b', // Deep Iris (4)
    '#b48700', // Sunshine Gold (5)
    '#69b4ff', // Ocean Blue (6)
    '#1ea500', // Pistachio Lime (7)
    '#e11eff', // Orchid Lilac (8)
    '#005a96', // Pastel Violet (9)
    '#f0f0a5', // Lemon Butter (10)
    '#5a2d00', // Peach Apricot (11)
  ],
  matcha: [
    '#004b00', // Forest Green (0)
    '#f05aff', // Plum Berry (1)
    '#87ff00', // Fresh Lime (2)
    '#1ec3ff', // Mountain Blue (3)
    '#ff9600', // Sunflower Gold (4)
    '#69001e', // Cedar Chestnut (5)
    '#006978', // Alpine Slate (6)
    '#2d0096', // Indigo Night (7)
    '#00ffe1', // Mint Foam (8)
    '#ff3c4b', // Blossom Rose (9)
    '#784b00', // Terracotta Clay (10)
    '#789669', // Honey Amber (11)
  ],
  lavender: [
    '#5a005a', // Amethyst Purple (0)
    '#d2ff00', // Star Gold (1)
    '#004b00', // Twilight Teal (2)
    '#ff96ff', // Dream Rose (3)
    '#d26900', // Sunset Coral (4)
    '#00e1ff', // Starlight Cyan (5)
    '#5a1e00', // Crimson Spark (6)
    '#3c87ff', // Powder Blue (7)
    '#3ca569', // Moonlit Mint (8)
    '#004b5a', // Periwinkle Indigo (9)
    '#e10f69', // Orchid Fuchsia (10)
    '#ffe1d2', // Lavender Mist (11)
  ],
  midnight: [
    '#00f0ff', // Neon Cyan (0)
    '#692dff', // Electric Violet (1)
    '#004b00', // Mint Turquoise (2)
    '#ffb700', // Neon Amber (3)
    '#ffe1ff', // Ice White (4)
    '#870f00', // Signal Red (5)
    '#2da54b', // Neon Lime (6)
    '#ff2d96', // Neon Magenta (7)
    '#2d2d3c', // Royal Blue (8)
    '#ff5a1e', // Neon Orange (9)
    '#0f96ff', // Sky Blue (10)
    '#c3ff00', // Neon Yellow (11)
  ],
  ocean: [
    '#0078b4', // Ocean Blue (0)
    '#ffb41e', // Sunny Pearl (1)
    '#87002d', // Starfish Red (2)
    '#003c00', // Reef Teal (3)
    '#ffd2ff', // Coral Reef (4)
    '#00ffb4', // Seafoam Mint (5)
    '#e100f0', // Sea Anemone (6)
    '#ff695a', // Pacific Cyan (7)
    '#0000a5', // Deep Abyss (8)
    '#784b00', // Sunlit Sand (9)
    '#87e1ff', // Tropical Aqua (10)
    '#699600', // Sea Kelp (11)
  ],
};

// Approximate, friendly human-readable color names for each territory slot in each theme
export const REGION_COLOR_NAMES: Record<ThemePalette, string[]> = {
  cozy: [
    'Coral Red',
    'Sky Cerulean',
    'Spring Lime',
    'Deep Forest',
    'Royal Purple',
    'Blossom Pink',
    'Honey Gold',
    'Glacier Cyan',
    'Mint Emerald',
    'Buttercream',
    'Dark Terracotta',
    'Orchid Magenta',
  ],
  pastel: [
    'Strawberry Rose',
    'Ice Blue',
    'Seafoam Green',
    'Sweet Pink',
    'Deep Iris',
    'Sunshine Gold',
    'Ocean Blue',
    'Pistachio Lime',
    'Orchid Lilac',
    'Pastel Violet',
    'Lemon Butter',
    'Peach Apricot',
  ],
  matcha: [
    'Forest Green',
    'Plum Berry',
    'Fresh Lime',
    'Mountain Blue',
    'Sunflower Gold',
    'Cedar Chestnut',
    'Alpine Slate',
    'Indigo Night',
    'Mint Foam',
    'Blossom Rose',
    'Terracotta Clay',
    'Honey Amber',
  ],
  lavender: [
    'Amethyst Purple',
    'Star Gold',
    'Twilight Teal',
    'Dream Rose',
    'Sunset Coral',
    'Starlight Cyan',
    'Crimson Spark',
    'Powder Blue',
    'Moonlit Mint',
    'Periwinkle Indigo',
    'Orchid Fuchsia',
    'Lavender Mist',
  ],
  midnight: [
    'Neon Cyan',
    'Electric Violet',
    'Mint Turquoise',
    'Neon Amber',
    'Ice White',
    'Signal Red',
    'Neon Lime',
    'Neon Magenta',
    'Royal Blue',
    'Neon Orange',
    'Sky Blue',
    'Neon Yellow',
  ],
  ocean: [
    'Ocean Blue',
    'Sunny Pearl',
    'Starfish Red',
    'Reef Teal',
    'Coral Reef',
    'Seafoam Mint',
    'Sea Anemone',
    'Pacific Cyan',
    'Deep Abyss',
    'Sunlit Sand',
    'Tropical Aqua',
    'Sea Kelp',
  ],
};

/**
 * Returns hex and human-readable color name for a given territory index and theme.
 */
export function getTerritoryInfo(
  regIndex: number,
  theme: ThemePalette = 'cozy'
): { hex: string; name: string; index: number } {
  const palette = REGION_PALETTES[theme] || REGION_PALETTES.cozy;
  const names = REGION_COLOR_NAMES[theme] || REGION_COLOR_NAMES.cozy;
  const idx = Math.abs(regIndex) % palette.length;
  return {
    index: idx,
    hex: palette[idx],
    name: names[idx],
  };
}

/**
 * Formats a territory reference with tag metadata: [[territory:index:hex|Territory ColorName]]
 * Both the preceding word "Territory" / "territory" and the color name are included in the label.
 */
export function formatTerritoryTag(
  regIndex: number,
  theme: ThemePalette = 'cozy',
  capitalize = true
): string {
  const info = getTerritoryInfo(regIndex, theme);
  const word = capitalize ? 'Territory' : 'territory';
  return `[[territory:${info.index}:${info.hex}|${word} ${info.name}]]`;
}

/**
 * Strips territory formatting tags from a text string, yielding clean plain text:
 * "[[territory:0:#ef4444|Territory Coral Red]]" -> "Territory Coral Red"
 */
export function stripTerritoryTags(text: string): string {
  return text.replace(/\[\[territory:\d+:#[0-9a-fA-F]{6}\|([^\]]+)\]\]/g, '$1');
}

export interface LabColor {
  L: number;
  a: number;
  b: number;
}

export interface PalettePairDistance {
  indexA: number;
  indexB: number;
  nameA: string;
  nameB: string;
  hexA: string;
  hexB: string;
  deltaE00: number;
  deltaE76: number;
}

export interface PaletteDistanceAnalysis {
  theme: ThemePalette;
  minDeltaE00: number;
  avgDeltaE00: number;
  minDeltaE76: number;
  avgDeltaE76: number;
  minDeltaE00ByMapSize: Record<number, number>;
  problematicPairs: PalettePairDistance[];
  allPairsSorted: PalettePairDistance[];
}

export function hexToLab(hex: string): LabColor {
  const clean = hex.replace('#', '');
  const n = parseInt(clean, 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;

  const toLinear = (c: number) => {
    const v = c / 255;
    return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  };
  const R = toLinear(r);
  const G = toLinear(g);
  const B = toLinear(b);

  const X = (R * 0.4124564 + G * 0.3575761 + B * 0.1804375) / 0.95047;
  const Y = (R * 0.2126729 + G * 0.7151522 + B * 0.072175) / 1.0;
  const Z = (R * 0.0193339 + G * 0.119192 + B * 0.9503041) / 1.08883;

  const f = (t: number) => (t > 0.008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116);
  const fx = f(X);
  const fy = f(Y);
  const fz = f(Z);

  return {
    L: 116 * fy - 16,
    a: 500 * (fx - fy),
    b: 200 * (fy - fz),
  };
}

export function deltaE76(c1: LabColor, c2: LabColor): number {
  return Math.sqrt((c1.L - c2.L) ** 2 + (c1.a - c2.a) ** 2 + (c1.b - c2.b) ** 2);
}

/**
 * Computes the CIE DE2000 (CIEDE2000) perceptual color difference between two CIELAB colors.
 */
export function deltaE2000(lab1: LabColor, lab2: LabColor): number {
  const { L: L1, a: a1, b: b1 } = lab1;
  const { L: L2, a: a2, b: b2 } = lab2;
  const rad2deg = (rad: number) => (rad * 180) / Math.PI;
  const deg2rad = (deg: number) => (deg * Math.PI) / 180;

  const C1 = Math.hypot(a1, b1);
  const C2 = Math.hypot(a2, b2);
  const avgC = (C1 + C2) / 2;

  const G = 0.5 * (1 - Math.sqrt(Math.pow(avgC, 7) / (Math.pow(avgC, 7) + Math.pow(25, 7))));
  const a1p = (1 + G) * a1;
  const a2p = (1 + G) * a2;
  const C1p = Math.hypot(a1p, b1);
  const C2p = Math.hypot(a2p, b2);

  const getHp = (ap: number, b: number) => {
    if (ap === 0 && b === 0) return 0;
    const h = rad2deg(Math.atan2(b, ap));
    return h >= 0 ? h : h + 360;
  };
  const h1p = getHp(a1p, b1);
  const h2p = getHp(a2p, b2);

  const dLp = L2 - L1;
  const dCp = C2p - C1p;
  let dhp = 0;
  if (C1p * C2p !== 0) {
    if (Math.abs(h2p - h1p) <= 180) dhp = h2p - h1p;
    else if (h2p - h1p > 180) dhp = h2p - h1p - 360;
    else dhp = h2p - h1p + 360;
  }
  const dHp = 2 * Math.sqrt(C1p * C2p) * Math.sin(deg2rad(dhp / 2));

  const avgLp = (L1 + L2) / 2;
  const avgCp = (C1p + C2p) / 2;
  let avghp = h1p + h2p;
  if (C1p * C2p !== 0) {
    if (Math.abs(h1p - h2p) <= 180) avghp = (h1p + h2p) / 2;
    else if (h1p + h2p < 360) avghp = (h1p + h2p + 360) / 2;
    else avghp = (h1p + h2p - 360) / 2;
  }

  const T =
    1 -
    0.17 * Math.cos(deg2rad(avghp - 30)) +
    0.24 * Math.cos(deg2rad(2 * avghp)) +
    0.32 * Math.cos(deg2rad(3 * avghp + 6)) -
    0.2 * Math.cos(deg2rad(4 * avghp - 63));
  const dTheta = 30 * Math.exp(-Math.pow((avghp - 275) / 25, 2));
  const RC = 2 * Math.sqrt(Math.pow(avgCp, 7) / (Math.pow(avgCp, 7) + Math.pow(25, 7)));
  const SL = 1 + (0.015 * Math.pow(avgLp - 50, 2)) / Math.sqrt(20 + Math.pow(avgLp - 50, 2));
  const SC = 1 + 0.045 * avgCp;
  const SH = 1 + 0.015 * avgCp * T;
  const RT = -Math.sin(deg2rad(2 * dTheta)) * RC;

  return Math.sqrt(
    Math.pow(dLp / SL, 2) +
      Math.pow(dCp / SC, 2) +
      Math.pow(dHp / SH, 2) +
      RT * (dCp / SC) * (dHp / SH)
  );
}

/**
 * Analyzes pairwise perceptual distances (CIEDE2000 & CIE76) across all 12 colors
 * and across each map size prefix (4x4..12x12) for a given theme palette.
 * Pairs with CIEDE2000 < `problematicThreshold` (default 20.0) are flagged as problematic close pairs.
 */
export function analyzePaletteDistances(
  theme: ThemePalette,
  problematicThreshold = 20.0
): PaletteDistanceAnalysis {
  const hexes = REGION_PALETTES[theme];
  const names = REGION_COLOR_NAMES[theme];
  const labs = hexes.map(hexToLab);

  const allPairs: PalettePairDistance[] = [];
  for (let i = 0; i < hexes.length; i++) {
    for (let j = i + 1; j < hexes.length; j++) {
      allPairs.push({
        indexA: i,
        indexB: j,
        nameA: names[i],
        nameB: names[j],
        hexA: hexes[i],
        hexB: hexes[j],
        deltaE00: deltaE2000(labs[i], labs[j]),
        deltaE76: deltaE76(labs[i], labs[j]),
      });
    }
  }

  allPairs.sort((a, b) => a.deltaE00 - b.deltaE00);

  const minDeltaE00 = allPairs[0]?.deltaE00 ?? 0;
  const avgDeltaE00 = allPairs.reduce((s, p) => s + p.deltaE00, 0) / allPairs.length;
  const minDeltaE76 = Math.min(...allPairs.map((p) => p.deltaE76));
  const avgDeltaE76 = allPairs.reduce((s, p) => s + p.deltaE76, 0) / allPairs.length;

  const minDeltaE00ByMapSize: Record<number, number> = {};
  for (let n = 4; n <= 12; n++) {
    let minN = Infinity;
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        minN = Math.min(minN, deltaE2000(labs[i], labs[j]));
      }
    }
    minDeltaE00ByMapSize[n] = minN;
  }

  return {
    theme,
    minDeltaE00,
    avgDeltaE00,
    minDeltaE76,
    avgDeltaE76,
    minDeltaE00ByMapSize,
    problematicPairs: allPairs.filter((p) => p.deltaE00 < problematicThreshold),
    allPairsSorted: allPairs,
  };
}

