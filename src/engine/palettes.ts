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
    '#ff99c8', // Sweet Pink
    '#fcf6bd', // Lemon Butter
    '#7ee8fa', // Ice Blue
    '#b388ff', // Pastel Violet
    '#e4c1f9', // Orchid Lilac
    '#ffb38a', // Peach Apricot
    '#99e2b4', // Seafoam Green
    '#ffd670', // Sunshine Gold
    '#f43f5e', // Strawberry Rose
    '#38bdf8', // Ocean Blue
    '#a3e635', // Pistachio Lime
    '#7c3aed', // Deep Iris
  ],
  matcha: [
    '#2d6a4f', // Deep Forest Green
    '#d97706', // Warm Honey Amber
    '#0284c7', // Mountain Lake Blue
    '#c2410c', // Terracotta Clay
    '#84cc16', // Fresh Lime Sprout
    '#86198f', // Wild Plum Berry
    '#fde047', // Bright Sunflower Gold
    '#99f6e4', // Crisp Mint Foam
    '#e11d48', // Blossom Rose
    '#78350f', // Cedar Chestnut
    '#475569', // Alpine Slate
    '#4338ca', // Deep Indigo Night
  ],
  lavender: [
    '#c084fc', // Amethyst Purple
    '#67e8f9', // Starlight Cyan
    '#f472b6', // Dream Rose
    '#a7f3d0', // Moonlit Mint
    '#6366f1', // Periwinkle Indigo
    '#fde047', // Star Gold
    '#d946ef', // Orchid Fuchsia
    '#fb923c', // Sunset Coral
    '#93c5fd', // Powder Blue
    '#ef4444', // Crimson Spark
    '#e9d5ff', // Soft Lavender Mist
    '#0d9488', // Deep Twilight Teal
  ],
  midnight: [
    '#00f0ff', // Electric Neon Cyan
    '#ff007f', // Hot Neon Magenta
    '#39ff14', // Electric Neon Lime
    '#ffb700', // Bright Neon Amber
    '#b026ff', // Electric Violet
    '#ff5400', // Vivid Neon Orange
    '#0044ff', // Deep Electric Royal Blue
    '#ffff00', // Bright Neon Yellow
    '#ffffff', // Pure Neon Ice White
    '#ff0033', // Neon Signal Red
    '#00ffcc', // Bright Neon Mint Turquoise
    '#3b82f6', // Electric Sky Blue
  ],
  ocean: [
    '#0284c7', // Ocean Blue
    '#0d9488', // Reef Teal
    '#f59e0b', // Sunlit Sand
    '#10b981', // Seafoam Mint
    '#06b6d4', // Tropical Aqua
    '#ec4899', // Coral Reef
    '#6366f1', // Deep Abyss
    '#f43f5e', // Starfish Red
    '#84cc16', // Sea Kelp
    '#a855f7', // Sea Anemone
    '#facc15', // Sunny Pearl
    '#0e7490', // Pacific Cyan
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
    'Sweet Pink',
    'Lemon Butter',
    'Ice Blue',
    'Pastel Violet',
    'Orchid Lilac',
    'Peach Apricot',
    'Seafoam Green',
    'Sunshine Gold',
    'Strawberry Rose',
    'Ocean Blue',
    'Pistachio Lime',
    'Deep Iris',
  ],
  matcha: [
    'Forest Green',
    'Honey Amber',
    'Mountain Blue',
    'Terracotta Clay',
    'Fresh Lime',
    'Plum Berry',
    'Sunflower Gold',
    'Mint Foam',
    'Blossom Rose',
    'Cedar Chestnut',
    'Alpine Slate',
    'Indigo Night',
  ],
  lavender: [
    'Amethyst Purple',
    'Starlight Cyan',
    'Dream Rose',
    'Moonlit Mint',
    'Periwinkle Indigo',
    'Star Gold',
    'Orchid Fuchsia',
    'Sunset Coral',
    'Powder Blue',
    'Crimson Spark',
    'Lavender Mist',
    'Twilight Teal',
  ],
  midnight: [
    'Neon Cyan',
    'Neon Magenta',
    'Neon Lime',
    'Neon Amber',
    'Electric Violet',
    'Neon Orange',
    'Royal Blue',
    'Neon Yellow',
    'Ice White',
    'Signal Red',
    'Mint Turquoise',
    'Sky Blue',
  ],
  ocean: [
    'Ocean Blue',
    'Reef Teal',
    'Sunlit Sand',
    'Seafoam Mint',
    'Tropical Aqua',
    'Coral Reef',
    'Deep Abyss',
    'Starfish Red',
    'Sea Kelp',
    'Sea Anemone',
    'Sunny Pearl',
    'Pacific Cyan',
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

