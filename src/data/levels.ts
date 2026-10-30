import { CAMPAIGN_1_LEVELS } from './campaigns/campaign-1';
import { CAMPAIGN_2_LEVELS } from './campaigns/campaign-2';
import { CAMPAIGN_3_LEVELS } from './campaigns/campaign-3';
import { CAMPAIGN_4_LEVELS } from './campaigns/campaign-4';
import { CAMPAIGN_5_LEVELS } from './campaigns/campaign-5';
import { CAMPAIGN_6_LEVELS } from './campaigns/campaign-6';
import { CAMPAIGN_7_LEVELS } from './campaigns/campaign-7';
import { defineCampaign, type CampaignInfo, type CampaignLevel, type CampaignPack, type CampaignTierInfo } from './campaign-types';
export { CAMPAIGN_TIERS, LEVELS_PER_CAMPAIGN, defineCampaign } from './campaign-types';
export type { CampaignInfo, CampaignLevel, CampaignPack, CampaignTier, CampaignTierInfo } from './campaign-types';

// Add one imported pack here when publishing another 100 levels.
export const CAMPAIGNS: CampaignPack[] = [
  defineCampaign(1, CAMPAIGN_1_LEVELS),
  defineCampaign(2, CAMPAIGN_2_LEVELS),
  defineCampaign(3, CAMPAIGN_3_LEVELS),
  defineCampaign(4, CAMPAIGN_4_LEVELS),
  defineCampaign(5, CAMPAIGN_5_LEVELS),
  defineCampaign(6, CAMPAIGN_6_LEVELS),
  defineCampaign(7, CAMPAIGN_7_LEVELS),
];
CAMPAIGNS.forEach((campaign, index) => {
  if (campaign.number !== index + 1) throw new Error('Campaign packs must be registered in consecutive order');
});
export const CAMPAIGN_LEVELS = CAMPAIGNS.flatMap(campaign => campaign.levels);
const campaignByLevel = new Map(CAMPAIGNS.flatMap(campaign => campaign.levels.map(level => [level.id, campaign] as const)));
const levelIndex = new Map(CAMPAIGN_LEVELS.map((level, index) => [level.id, index]));

export function getCampaignForLevel(levelId: string): CampaignPack | undefined {
  return campaignByLevel.get(levelId);
}
export function getNextCampaignLevel(levelId: string): CampaignLevel | undefined {
  const index = levelIndex.get(levelId);
  return index === undefined ? undefined : CAMPAIGN_LEVELS[index + 1];
}
export interface TierMilestone {
  isTierComplete: boolean;
  /** The last level in this 100-level campaign, even if another pack follows. */
  isFinalCampaignComplete: boolean;
  completedCampaign: CampaignInfo;
  nextCampaign?: CampaignInfo;
  completedTier: CampaignTierInfo;
  nextTier?: CampaignTierInfo;
  nextLevelNumber?: number;
}
export function getTierMilestone(levelId: string): TierMilestone | null {
  const campaign = getCampaignForLevel(levelId);
  const index = levelIndex.get(levelId);
  if (!campaign || index === undefined) return null;
  const current = CAMPAIGN_LEVELS[index];
  const completedTier = campaign.tiers.find(t => t.name === current.tier)!;
  if (current.levelNumber !== completedTier.endLevel) return null;
  const next = getNextCampaignLevel(levelId);
  const complete = current.levelNumber === campaign.endLevel;
  return {
    isTierComplete: true, isFinalCampaignComplete: complete, completedCampaign: campaign, completedTier,
    nextCampaign: complete && next ? getCampaignForLevel(next.id) : undefined,
    nextTier: !complete && next ? campaign.tiers.find(t => t.name === next.tier) : undefined,
    nextLevelNumber: next?.levelNumber,
  };
}
