import type { Puzzle } from '../engine/types';

export const LEVELS_PER_CAMPAIGN = 100;
export type CampaignTier = 'Kitten' | 'Playful' | 'Clever' | 'Master' | 'Explorer' | 'Adventurer' | 'Champion' | 'Legend' | 'Grandmaster';
export interface CampaignLevel extends Puzzle {
  levelNumber: number;
  tier: CampaignTier;
  mirrorsLevelId?: string;
}
export interface CampaignTierInfo {
  name: CampaignTier;
  label: string;
  badge: string;
  startLevel: number;
  endLevel: number;
  gridSizes: string;
}
export interface CampaignInfo {
  id: string;
  number: number;
  name: string;
  startLevel: number;
  endLevel: number;
  levelCount: number;
}
export interface CampaignPack extends CampaignInfo {
  levels: CampaignLevel[];
  tiers: CampaignTierInfo[];
}
// Relative ranges define the progression shared by every 100-level pack.
export const CAMPAIGN_TIERS: CampaignTierInfo[] = [
  { name: 'Kitten', label: 'Tier 1: Kitten', badge: '🐾', startLevel: 1, endLevel: 10, gridSizes: '4×4 – 5×5' },
  { name: 'Playful', label: 'Tier 2: Playful', badge: '🧶', startLevel: 11, endLevel: 25, gridSizes: '6×6 – 7×7' },
  { name: 'Clever', label: 'Tier 3: Clever', badge: '😼', startLevel: 26, endLevel: 40, gridSizes: '8×8 – 9×9' },
  { name: 'Master', label: 'Tier 4: Master', badge: '👑', startLevel: 41, endLevel: 50, gridSizes: '10×10' },
  { name: 'Explorer', label: 'Tier 5: Explorer', badge: '🗺️', startLevel: 51, endLevel: 60, gridSizes: '8×8' },
  { name: 'Adventurer', label: 'Tier 6: Adventurer', badge: '⚔️', startLevel: 61, endLevel: 70, gridSizes: '9×9' },
  { name: 'Champion', label: 'Tier 7: Champion', badge: '🏆', startLevel: 71, endLevel: 80, gridSizes: '10×10' },
  { name: 'Legend', label: 'Tier 8: Legend', badge: '🌟', startLevel: 81, endLevel: 90, gridSizes: '11×11' },
  { name: 'Grandmaster', label: 'Tier 9: Grandmaster', badge: '💎', startLevel: 91, endLevel: 100, gridSizes: '12×12' },
];
export function defineCampaign(number: number, levels: CampaignLevel[]): CampaignPack {
  if (!Number.isSafeInteger(number) || number < 1 || !Number.isSafeInteger(number * LEVELS_PER_CAMPAIGN)) throw new Error('Campaign number must be a positive safe integer');
  if (levels.length !== LEVELS_PER_CAMPAIGN) throw new Error(`Campaign ${number} must contain ${LEVELS_PER_CAMPAIGN} levels`);
  const offset = (number - 1) * LEVELS_PER_CAMPAIGN;
  for (const [index, level] of levels.entries()) {
    const expected = offset + index + 1;
    if (level.levelNumber !== expected || level.id !== `level-${expected}`) throw new Error(`Campaign ${number} has invalid numbering at position ${index + 1}`);
    const tier = CAMPAIGN_TIERS.find(t => index + 1 >= t.startLevel && index + 1 <= t.endLevel);
    if (level.tier !== tier?.name) throw new Error(`Level ${expected} has the wrong tier`);
  }
  return {
    id: `campaign-${number}`, number, name: `Campaign ${number}`,
    startLevel: offset + 1, endLevel: offset + LEVELS_PER_CAMPAIGN, levelCount: levels.length, levels,
    tiers: CAMPAIGN_TIERS.map(t => ({ ...t, startLevel: t.startLevel + offset, endLevel: t.endLevel + offset })),
  };
}
