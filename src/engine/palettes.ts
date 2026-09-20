import { ThemePalette } from './types';

// Distinct palettes for territories (up to 12 regions)
export const REGION_PALETTES: Record<ThemePalette, string[]> = {
  cozy: [
    '#ef4444', // Coral Red
    '#0284c7', // Sky Cerulean
    '#10b981', // Mint Emerald
    '#f59e0b', // Honey Gold
    '#9333ea', // Royal Purple
    '#f97316', // Tangerine Orange
    '#06b6d4', // Turquoise Teal
    '#ec4899', // Blossom Pink
    '#84cc16', // Spring Lime
    '#1e3a8a', // Deep Midnight Blue
    '#7c2d12', // Warm Dark Terracotta
    '#fef08a', // Warm Buttercream
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
};

// Approximate, friendly human-readable color names for each territory slot in each theme
export const REGION_COLOR_NAMES: Record<ThemePalette, string[]> = {
  cozy: [
    'Coral Red',
    'Sky Cerulean',
    'Mint Emerald',
    'Honey Gold',
    'Royal Purple',
    'Tangerine Orange',
    'Turquoise Teal',
    'Blossom Pink',
    'Spring Lime',
    'Midnight Blue',
    'Dark Terracotta',
    'Buttercream',
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
