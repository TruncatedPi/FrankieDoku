import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { CAMPAIGNS, CAMPAIGN_LEVELS, LEVELS_PER_CAMPAIGN, defineCampaign, getCampaignForLevel, getNextCampaignLevel, getTierMilestone } from './levels';
import { mapFingerprint } from '../../scripts/map-fingerprint';
import { generateCampaignLevels } from '../../scripts/generate-campaign';
import { validateMap } from '../../scripts/map-validator';

test('Campaign 1 remains exactly the original 100 released maps', () => {
  const hash = createHash('sha256').update(JSON.stringify(CAMPAIGNS[0].levels)).digest('hex');
  assert.equal(hash, 'e31b7e4ac951af4800ba2b324e10fbd15533ab874fb1d7bd70856d701362005b');
});
test('every campaign has 100 consecutive levels and mirrors the original progression', () => {
  assert.ok(CAMPAIGNS.length >= 2);
  assert.equal(CAMPAIGN_LEVELS.length, CAMPAIGNS.length * LEVELS_PER_CAMPAIGN);
  const ids = new Set<string>();
  for (const campaign of CAMPAIGNS) {
    assert.equal(campaign.levels.length, LEVELS_PER_CAMPAIGN);
    for (const [index, level] of campaign.levels.entries()) {
      const original = CAMPAIGNS[0].levels[index];
      assert.equal(level.levelNumber, campaign.startLevel + index);
      assert.equal(level.id, `level-${level.levelNumber}`);
      assert.ok(!ids.has(level.id)); ids.add(level.id);
      assert.equal(level.size, original.size, level.id);
      assert.equal(level.tier, original.tier, level.id);
      assert.equal(level.difficulty, original.difficulty, level.id);
      if (campaign.number > 1) assert.equal(level.mirrorsLevelId, original.id);
      assert.equal(getCampaignForLevel(level.id)?.id, campaign.id);
    }
  }
});
test('all new maps differ from released maps and each other, including symmetries and colors', () => {
  const seen = new Set(CAMPAIGNS[0].levels.map(mapFingerprint));
  for (const campaign of CAMPAIGNS.slice(1)) for (const level of campaign.levels) {
    const key = mapFingerprint(level);
    assert.ok(!seen.has(key), `Duplicate layout: ${level.id}`);
    seen.add(key);
    const validation = validateMap(level);
    assert.equal(validation.valid, true, `${level.id}: ${validation.errors.join('; ')}`);
  }
});
test('fingerprinting recognizes all rotations, reflections, and region relabeling', () => {
  const level = CAMPAIGN_LEVELS[0];
  const expected = mapFingerprint(level);
  let grid = level.regions;
  for (let turn = 0; turn < 4; turn++) {
    assert.equal(mapFingerprint({ size: level.size, regions: grid }), expected);
    assert.equal(mapFingerprint({ size: level.size, regions: grid.map(row => [...row].reverse().map(region => 100 - region)) }), expected);
    grid = grid[0].map((_, col) => grid.map(row => row[col]).reverse());
  }
});
test('milestones and next-level lookup handle both campaign boundaries and shifted tier ranges', () => {
  assert.equal(getNextCampaignLevel('level-99')?.levelNumber, 100);
  assert.equal(getNextCampaignLevel('level-100')?.levelNumber, 101);
  assert.equal(getNextCampaignLevel(CAMPAIGNS[CAMPAIGNS.length - 1].levels[99].id), undefined);
  assert.equal(getNextCampaignLevel('missing'), undefined);
  const endOne = getTierMilestone('level-100')!;
  assert.equal(endOne.isFinalCampaignComplete, true);
  assert.equal(endOne.completedCampaign.number, 1);
  assert.equal(endOne.nextCampaign?.number, 2);
  assert.equal(endOne.nextLevelNumber, 101);
  const secondTier = getTierMilestone('level-110')!;
  assert.equal(secondTier.completedTier.startLevel, 101);
  assert.equal(secondTier.completedTier.endLevel, 110);
  assert.equal(secondTier.nextTier?.startLevel, 111);
  assert.equal(secondTier.nextLevelNumber, 111);
  assert.equal(secondTier.isFinalCampaignComplete, false);
  const final = getTierMilestone(CAMPAIGNS[CAMPAIGNS.length - 1].levels[99].id)!;
  assert.equal(final.completedCampaign.number, CAMPAIGNS.length);
  assert.equal(final.isFinalCampaignComplete, true);
  assert.equal(final.nextCampaign, undefined);
  assert.equal(final.nextLevelNumber, undefined);
  assert.equal(getTierMilestone('level-101'), null);
  assert.equal(getTierMilestone('missing'), null);
});
test('pack registration rejects incomplete, misnumbered, or misplaced-tier data', () => {
  assert.throws(() => defineCampaign(CAMPAIGNS.length + 1, CAMPAIGNS[0].levels.slice(1)), /100 levels/);
  assert.throws(() => defineCampaign(2, CAMPAIGNS[0].levels), /numbering/);
  assert.throws(() => defineCampaign(0, CAMPAIGNS[0].levels), /positive/);
  const levels = CAMPAIGNS[1].levels.map(level => ({ ...level }));
  levels[0].tier = 'Legend';
  assert.throws(() => defineCampaign(2, levels), /wrong tier/);
});
test('the same authoring tool can create the next hundred-level pack without reused maps', () => {
  const number = CAMPAIGNS.length + 1;
  const levels = generateCampaignLevels(number, CAMPAIGNS[0].levels, CAMPAIGN_LEVELS);
  const pack = defineCampaign(number, levels);
  assert.equal(pack.startLevel, (number - 1) * LEVELS_PER_CAMPAIGN + 1);
  assert.equal(pack.endLevel, number * LEVELS_PER_CAMPAIGN);
  assert.equal(pack.tiers[0].startLevel, pack.startLevel);
  assert.equal(pack.tiers[8].endLevel, pack.endLevel);
  const seen = new Set(CAMPAIGN_LEVELS.map(mapFingerprint));
  for (const [index, level] of levels.entries()) {
    assert.equal(level.size, CAMPAIGNS[0].levels[index].size);
    assert.ok(!seen.has(mapFingerprint(level)), level.id);
    seen.add(mapFingerprint(level));
  }
  // The prospective pack is not registered or written by this test.
  assert.equal(CAMPAIGNS.length, 2);
});
