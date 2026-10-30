import { test, describe } from 'node:test';
import assert from 'node:assert';
import {
  analyzePuzzleDifficulty,
  getCampaignSizeDifficultyStats,
  getLevelDifficultyInfo,
} from './difficulty';
import { CAMPAIGNS, CAMPAIGN_LEVELS } from '../data/levels';

describe('Algorithmic Difficulty Scoring & Campaign Size Benchmarks', () => {
  test('distinguishes easy direct-progression maps from hard multi-branching maps of the same size', () => {
    // In Campaign 4 (9x9):
    // level-334 and level-363 have 1-cell regions and 0 branching lookahead steps (easy progression)
    // level-364 has minRegionSize = 4 and requires 5 branching lookahead steps (score 161 vs 53.5 avg)
    const easy334 = getLevelDifficultyInfo('level-334');
    const easy363 = getLevelDifficultyInfo('level-363');
    const hard338 = getLevelDifficultyInfo('level-338');
    const hard364 = getLevelDifficultyInfo('level-364');

    assert.ok(easy334 && easy363 && hard338 && hard364);
    assert.strictEqual(easy334.metrics.branchingLookaheadSteps, 0);
    assert.strictEqual(easy363.metrics.branchingLookaheadSteps, 0);
    assert.strictEqual(easy334.isHard, false);
    assert.strictEqual(easy363.isHard, false);

    assert.ok(hard364.metrics.branchingLookaheadSteps >= 3);
    assert.strictEqual(hard364.metrics.minRegionSize, 4);
    assert.ok(hard364.score > hard364.averageForSize * 2.5);
    assert.strictEqual(hard364.isHard, true, 'Level 364 must be flagged as HARD for 9x9 in Campaign 4');
    assert.strictEqual(hard338.isHard, true, 'Level 338 must be flagged as HARD for 9x9 in Campaign 4');
  });

  test('computes per-campaign, per-size statistics across all 7 campaigns and sizes 4..12', () => {
    let totalHard = 0;
    for (const campaign of CAMPAIGNS) {
      let campaignHard = 0;
      for (let size = 4; size <= 12; size++) {
        const stats = getCampaignSizeDifficultyStats(campaign.id, size);
        assert.ok(stats, `Stats must exist for ${campaign.id} size ${size}`);
        assert.ok(stats.levelCount >= 5, `Expected at least 5 levels of size ${size} in ${campaign.id}`);
        assert.ok(stats.averageScore >= stats.minScore && stats.averageScore <= stats.maxScore);
        campaignHard += stats.hardLevelIds.length;
        totalHard += stats.hardLevelIds.length;

        for (const hid of stats.hardLevelIds) {
          const info = stats.byLevelId.get(hid);
          assert.ok(info?.isHard);
          assert.ok(info.score > stats.averageScore, `Hard level ${hid} must exceed campaign size average`);
        }
      }
      assert.ok(campaignHard >= 8 && campaignHard <= 25, `Campaign ${campaign.number} should have a selective subset of HARD levels, got ${campaignHard}`);
    }
    assert.ok(totalHard >= 70 && totalHard <= 160, `Total HARD levels across 700 levels should be a selective outlier subset, got ${totalHard}`);
  });

  test('analyzePuzzleDifficulty is deterministic for any puzzle', () => {
    const sample = CAMPAIGN_LEVELS[363]; // level-364
    const first = analyzePuzzleDifficulty(sample);
    const second = analyzePuzzleDifficulty(sample);
    assert.deepStrictEqual(first, second);
  });
});
