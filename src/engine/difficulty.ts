import { BoardCell, Coordinate, Puzzle } from './types';
import { isValidPlacement } from './solver';
import { CAMPAIGNS, getCampaignForLevel } from '../data/levels';

export interface PuzzleDifficultyMetrics {
  size: number;
  minRegionSize: number;
  nakedSingleSteps: number;
  pointingClaimingSteps: number;
  directStarvationSteps: number;
  subsetParitySteps: number;
  maxSubsetSize: number;
  branchingLookaheadSteps: number;
  maxLookaheadTier: number;
  stepsBeforeFirstCat: number;
  difficultyScore: number;
}

export interface LevelDifficultyInfo {
  levelId: string;
  levelNumber: number;
  campaignNumber: number;
  size: number;
  score: number;
  averageForSize: number;
  stdDevForSize: number;
  ratioToAverage: number;
  zScore: number;
  isHard: boolean;
  metrics: PuzzleDifficultyMetrics;
}

export interface CampaignSizeDifficultyStats {
  campaignId: string;
  campaignNumber: number;
  size: number;
  levelCount: number;
  averageScore: number;
  stdDev: number;
  minScore: number;
  maxScore: number;
  hardLevelIds: string[];
  byLevelId: Map<string, LevelDifficultyInfo>;
}

/**
 * Algorithmically scores the logical solving difficulty of a puzzle by simulating
 * a human player's deduction progression from easiest visual patterns to multi-branch lookahead:
 *  - Structural starting tightness (smallest territory size: 1-cell/2-cell anchors vs >=3 or >=4)
 *  - Naked Singles (1 open cell in a territory, row, or column) -> weight 1
 *  - Pointing & Claiming (line <-> territory single-unit confinement) -> weight 3
 *  - 1-Step Direct Starvation / Common Neighbor Aloof Overlap -> weight 4
 *  - Contiguous Subset Parity (k rows/cols containing or covered by k territories) -> weight 4 + 3*k
 *  - Multi-Branch / Lookahead Contradictions (when all direct pattern rules stall) -> weight 18..38
 */
export function analyzePuzzleDifficulty(puzzle: Puzzle): PuzzleDifficultyMetrics {
  const { size, regions } = puzzle;
  const cells: BoardCell[] = [];
  const regionSizes = new Array<number>(size).fill(0);

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      regionSizes[regions[r][c]]++;
      cells.push({
        row: r,
        col: c,
        region: regions[r][c],
        state: 'empty',
        hasConflict: false,
        isHinted: false,
      });
    }
  }

  const minRegionSize = Math.min(...regionSizes);

  let nakedSingleSteps = 0;
  let pointingClaimingSteps = 0;
  let directStarvationSteps = 0;
  let subsetParitySteps = 0;
  let maxSubsetSize = 0;
  let branchingLookaheadSteps = 0;
  let maxLookaheadTier = 0;
  let stepsBeforeFirstCat = 0;
  let firstCatPlaced = false;
  let score = 0;

  // Structural starting complexity: puzzles with no tiny 1-2 cell regions lack an immediate starter anchor
  if (minRegionSize >= 4) score += 10;
  else if (minRegionSize === 3) score += 5;
  else if (minRegionSize === 2) score += 2;

  const solSet = new Set((puzzle.solution || []).map((s) => `${s.row},${s.col}`));

  for (let iter = 0; iter < 500; iter++) {
    const placedCats = cells.filter((c) => c.state === 'cat');
    if (placedCats.length === size) break;

    // Auto-cross any empty cells directly blocked by placed cats
    for (const c of cells) {
      if (c.state === 'empty' && !isValidPlacement(c.row, c.col, placedCats, regions)) {
        c.state = 'mark';
      }
    }

    // 1. Naked Singles (in region, row, or col)
    let placedAnySingle = false;
    for (let reg = 0; reg < size; reg++) {
      if (placedCats.some((cat) => regions[cat.row][cat.col] === reg)) continue;
      const cand = cells.filter((item) => regions[item.row][item.col] === reg && item.state === 'empty');
      if (cand.length === 1) {
        cand[0].state = 'cat';
        nakedSingleSteps++;
        score += 1;
        firstCatPlaced = true;
        placedAnySingle = true;
        break;
      }
    }
    if (placedAnySingle) continue;

    for (let r = 0; r < size; r++) {
      if (placedCats.some((cat) => cat.row === r)) continue;
      const cand = cells.filter((c) => c.row === r && c.state === 'empty');
      if (cand.length === 1) {
        cand[0].state = 'cat';
        nakedSingleSteps++;
        score += 1;
        firstCatPlaced = true;
        placedAnySingle = true;
        break;
      }
    }
    if (placedAnySingle) continue;

    for (let c = 0; c < size; c++) {
      if (placedCats.some((cat) => cat.col === c)) continue;
      const cand = cells.filter((item) => item.col === c && item.state === 'empty');
      if (cand.length === 1) {
        cand[0].state = 'cat';
        nakedSingleSteps++;
        score += 1;
        firstCatPlaced = true;
        placedAnySingle = true;
        break;
      }
    }
    if (placedAnySingle) continue;

    if (!firstCatPlaced) stepsBeforeFirstCat++;

    // 2. Pointing & Claiming (single line <-> single territory reduction)
    let didPointing = false;
    for (let reg = 0; reg < size; reg++) {
      if (placedCats.some((cat) => regions[cat.row][cat.col] === reg)) continue;
      const regCells = cells.filter((c) => c.state === 'empty' && regions[c.row][c.col] === reg);
      if (regCells.length === 0) continue;
      const r0 = regCells[0].row;
      if (regCells.every((c) => c.row === r0)) {
        const targets = cells.filter((c) => c.state === 'empty' && c.row === r0 && regions[c.row][c.col] !== reg);
        if (targets.length > 0) {
          targets.forEach((t) => (t.state = 'mark'));
          pointingClaimingSteps++;
          score += 3;
          didPointing = true;
          break;
        }
      }
      const c0 = regCells[0].col;
      if (regCells.every((c) => c.col === c0)) {
        const targets = cells.filter((c) => c.state === 'empty' && c.col === c0 && regions[c.row][c.col] !== reg);
        if (targets.length > 0) {
          targets.forEach((t) => (t.state = 'mark'));
          pointingClaimingSteps++;
          score += 3;
          didPointing = true;
          break;
        }
      }
    }
    if (didPointing) continue;

    for (let r = 0; r < size; r++) {
      if (placedCats.some((cat) => cat.row === r)) continue;
      const rCells = cells.filter((c) => c.state === 'empty' && c.row === r);
      if (rCells.length === 0) continue;
      const reg0 = regions[r][rCells[0].col];
      if (rCells.every((c) => regions[r][c.col] === reg0)) {
        const targets = cells.filter((c) => c.state === 'empty' && regions[c.row][c.col] === reg0 && c.row !== r);
        if (targets.length > 0) {
          targets.forEach((t) => (t.state = 'mark'));
          pointingClaimingSteps++;
          score += 3;
          didPointing = true;
          break;
        }
      }
    }
    if (didPointing) continue;

    for (let c = 0; c < size; c++) {
      if (placedCats.some((cat) => cat.col === c)) continue;
      const cCells = cells.filter((item) => item.state === 'empty' && item.col === c);
      if (cCells.length === 0) continue;
      const reg0 = regions[cCells[0].row][c];
      if (cCells.every((item) => regions[item.row][c] === reg0)) {
        const targets = cells.filter((item) => item.state === 'empty' && regions[item.row][item.col] === reg0 && item.col !== c);
        if (targets.length > 0) {
          targets.forEach((t) => (t.state = 'mark'));
          pointingClaimingSteps++;
          score += 3;
          didPointing = true;
          break;
        }
      }
    }
    if (didPointing) continue;

    // 3. 1-Step Direct Unit Starvation / Common Neighbor Aloof Overlap
    let didDirectStarvation = false;
    const emptyCellsNow = cells.filter((c) => c.state === 'empty');
    for (let reg = 0; reg < size; reg++) {
      if (placedCats.some((cat) => regions[cat.row][cat.col] === reg)) continue;
      const uCells = emptyCellsNow.filter((c) => regions[c.row][c.col] === reg);
      if (uCells.length >= 2) {
        const wipers = emptyCellsNow.filter(
          (target) =>
            regions[target.row][target.col] !== reg &&
            uCells.every((u) => !isValidPlacement(target.row, target.col, [{ row: u.row, col: u.col }], regions))
        );
        if (wipers.length > 0) {
          wipers.forEach((n) => (n.state = 'mark'));
          directStarvationSteps++;
          score += 4;
          didDirectStarvation = true;
          break;
        }
      }
    }
    if (didDirectStarvation) continue;

    for (let r = 0; r < size; r++) {
      if (placedCats.some((cat) => cat.row === r)) continue;
      const uCells = emptyCellsNow.filter((c) => c.row === r);
      if (uCells.length >= 2) {
        const wipers = emptyCellsNow.filter(
          (target) =>
            target.row !== r &&
            uCells.every((u) => !isValidPlacement(target.row, target.col, [{ row: u.row, col: u.col }], regions))
        );
        if (wipers.length > 0) {
          wipers.forEach((n) => (n.state = 'mark'));
          directStarvationSteps++;
          score += 4;
          didDirectStarvation = true;
          break;
        }
      }
    }
    if (didDirectStarvation) continue;

    for (let c = 0; c < size; c++) {
      if (placedCats.some((cat) => cat.col === c)) continue;
      const uCells = emptyCellsNow.filter((item) => item.col === c);
      if (uCells.length >= 2) {
        const wipers = emptyCellsNow.filter(
          (target) =>
            target.col !== c &&
            uCells.every((u) => !isValidPlacement(target.row, target.col, [{ row: u.row, col: u.col }], regions))
        );
        if (wipers.length > 0) {
          wipers.forEach((n) => (n.state = 'mark'));
          directStarvationSteps++;
          score += 4;
          didDirectStarvation = true;
          break;
        }
      }
    }
    if (didDirectStarvation) continue;

    // 4. Contiguous Subset Parity
    let didSubset = false;
    const rowHasCat = (r: number) => placedCats.some((c) => c.row === r);
    const colHasCat = (c: number) => placedCats.some((cat) => cat.col === c);
    const regHasCat = (reg: number) => placedCats.some((c) => regions[c.row][c.col] === reg);

    for (let k = 2; k < size && !didSubset; k++) {
      for (let rStart = 0; rStart <= size - k && !didSubset; rStart++) {
        const rEnd = rStart + k - 1;
        let openRows = 0;
        for (let r = rStart; r <= rEnd; r++) if (!rowHasCat(r)) openRows++;
        if (openRows === 0) continue;

        const contained: number[] = [];
        for (let reg = 0; reg < size; reg++) {
          if (regHasCat(reg)) continue;
          const v = emptyCellsNow.filter((c) => regions[c.row][c.col] === reg);
          if (v.length > 0 && v.every((c) => c.row >= rStart && c.row <= rEnd)) contained.push(reg);
        }
        if (contained.length === openRows) {
          const elim = emptyCellsNow.filter(
            (c) => c.row >= rStart && c.row <= rEnd && !contained.includes(regions[c.row][c.col])
          );
          if (elim.length > 0) {
            elim.forEach((e) => (e.state = 'mark'));
            subsetParitySteps++;
            maxSubsetSize = Math.max(maxSubsetSize, openRows);
            score += 4 + openRows * 3;
            didSubset = true;
            break;
          }
        }

        const bandCells = emptyCellsNow.filter((c) => c.row >= rStart && c.row <= rEnd);
        const covering = Array.from(new Set(bandCells.map((c) => regions[c.row][c.col])));
        if (covering.length === openRows && covering.every((t) => !regHasCat(t))) {
          const elim = emptyCellsNow.filter(
            (c) => (c.row < rStart || c.row > rEnd) && covering.includes(regions[c.row][c.col])
          );
          if (elim.length > 0) {
            elim.forEach((e) => (e.state = 'mark'));
            subsetParitySteps++;
            maxSubsetSize = Math.max(maxSubsetSize, openRows);
            score += 4 + openRows * 3;
            didSubset = true;
            break;
          }
        }
      }

      for (let cStart = 0; cStart <= size - k && !didSubset; cStart++) {
        const cEnd = cStart + k - 1;
        let openCols = 0;
        for (let c = cStart; c <= cEnd; c++) if (!colHasCat(c)) openCols++;
        if (openCols === 0) continue;

        const contained: number[] = [];
        for (let reg = 0; reg < size; reg++) {
          if (regHasCat(reg)) continue;
          const v = emptyCellsNow.filter((c) => regions[c.row][c.col] === reg);
          if (v.length > 0 && v.every((c) => c.col >= cStart && c.col <= cEnd)) contained.push(reg);
        }
        if (contained.length === openCols) {
          const elim = emptyCellsNow.filter(
            (c) => c.col >= cStart && c.col <= cEnd && !contained.includes(regions[c.row][c.col])
          );
          if (elim.length > 0) {
            elim.forEach((e) => (e.state = 'mark'));
            subsetParitySteps++;
            maxSubsetSize = Math.max(maxSubsetSize, openCols);
            score += 4 + openCols * 3;
            didSubset = true;
            break;
          }
        }

        const bandCells = emptyCellsNow.filter((c) => c.col >= cStart && c.col <= cEnd);
        const covering = Array.from(new Set(bandCells.map((c) => regions[c.row][c.col])));
        if (covering.length === openCols && covering.every((t) => !regHasCat(t))) {
          const elim = emptyCellsNow.filter(
            (c) => (c.col < cStart || c.col > cEnd) && covering.includes(regions[c.row][c.col])
          );
          if (elim.length > 0) {
            elim.forEach((e) => (e.state = 'mark'));
            subsetParitySteps++;
            maxSubsetSize = Math.max(maxSubsetSize, openCols);
            score += 4 + openCols * 3;
            didSubset = true;
            break;
          }
        }
      }
    }
    if (didSubset) continue;

    // 5. True Branching / Multi-Step Lookahead Contradiction!
    const nonSol = emptyCellsNow.filter((c) => !solSet.has(`${c.row},${c.col}`));
    if (nonSol.length === 0) break;

    const checkImmediateConflict = (hyp: Coordinate[], rem: BoardCell[]): boolean => {
      for (let r = 0; r < size; r++) if (!hyp.some((cat) => cat.row === r) && !rem.some((c) => c.row === r)) return true;
      for (let c = 0; c < size; c++) if (!hyp.some((cat) => cat.col === c) && !rem.some((item) => item.col === c)) return true;
      for (let reg = 0; reg < size; reg++) if (!hyp.some((cat) => regions[cat.row][cat.col] === reg) && !rem.some((item) => regions[item.row][item.col] === reg)) return true;

      const rowRegs = new Set<number>();
      for (let r = 0; r < size; r++) {
        if (hyp.some((cat) => cat.row === r)) continue;
        const rRem = rem.filter((c) => c.row === r);
        if (rRem.length > 0 && rRem.every((c) => regions[r][c.col] === regions[r][rRem[0].col])) {
          const rg = regions[r][rRem[0].col];
          if (rowRegs.has(rg)) return true;
          rowRegs.add(rg);
        }
      }
      const colRegs = new Set<number>();
      for (let c = 0; c < size; c++) {
        if (hyp.some((cat) => cat.col === c)) continue;
        const cRem = rem.filter((item) => item.col === c);
        if (cRem.length > 0 && cRem.every((item) => regions[item.row][c] === regions[cRem[0].row][c])) {
          const rg = regions[cRem[0].row][c];
          if (colRegs.has(rg)) return true;
          colRegs.add(rg);
        }
      }
      const regRows = new Set<number>();
      const regCols = new Set<number>();
      for (let reg = 0; reg < size; reg++) {
        if (hyp.some((cat) => regions[cat.row][cat.col] === reg)) continue;
        const tRem = rem.filter((item) => regions[item.row][item.col] === reg);
        if (tRem.length > 0 && tRem.every((item) => item.row === tRem[0].row)) {
          if (regRows.has(tRem[0].row)) return true;
          regRows.add(tRem[0].row);
        }
        if (tRem.length > 0 && tRem.every((item) => item.col === tRem[0].col)) {
          if (regCols.has(tRem[0].col)) return true;
          regCols.add(tRem[0].col);
        }
      }
      return false;
    };

    const getCandidateTier = (cand: BoardCell): number => {
      const hyp = [...placedCats, { row: cand.row, col: cand.col }];
      const rem = emptyCellsNow.filter((c) => isValidPlacement(c.row, c.col, hyp, regions));
      if (checkImmediateConflict(hyp, rem)) return 2;

      for (let reg = 0; reg < size; reg++) {
        if (hyp.some((cat) => regions[cat.row][cat.col] === reg)) continue;
        const tRem = rem.filter((c) => regions[c.row][c.col] === reg);
        if (tRem.length === 1) {
          const nextHyp = [...hyp, { row: tRem[0].row, col: tRem[0].col }];
          const nextRem = rem.filter((c) => isValidPlacement(c.row, c.col, nextHyp, regions));
          if (checkImmediateConflict(nextHyp, nextRem)) return 3;
        }
      }
      for (let r = 0; r < size; r++) {
        if (hyp.some((cat) => cat.row === r)) continue;
        const rRem = rem.filter((c) => c.row === r);
        if (rRem.length === 1) {
          const nextHyp = [...hyp, { row: rRem[0].row, col: rRem[0].col }];
          const nextRem = rem.filter((c) => isValidPlacement(c.row, c.col, nextHyp, regions));
          if (checkImmediateConflict(nextHyp, nextRem)) return 3;
        }
      }
      for (let c = 0; c < size; c++) {
        if (hyp.some((cat) => cat.col === c)) continue;
        const cRem = rem.filter((item) => item.col === c);
        if (cRem.length === 1) {
          const nextHyp = [...hyp, { row: cRem[0].row, col: cRem[0].col }];
          const nextRem = rem.filter((item) => isValidPlacement(item.row, item.col, nextHyp, regions));
          if (checkImmediateConflict(nextHyp, nextRem)) return 3;
        }
      }

      for (let reg = 0; reg < size; reg++) {
        if (hyp.some((cat) => regions[cat.row][cat.col] === reg)) continue;
        const tRem = rem.filter((c) => regions[c.row][c.col] === reg);
        if (tRem.length >= 2 && tRem.length <= 3) {
          if (
            tRem.every((opt) => {
              const nextHyp = [...hyp, { row: opt.row, col: opt.col }];
              const nextRem = rem.filter((c) => isValidPlacement(c.row, c.col, nextHyp, regions));
              return checkImmediateConflict(nextHyp, nextRem);
            })
          ) {
            return 4;
          }
        }
      }
      return 5;
    };

    let bestTier = 6;
    let bestCell = nonSol[0];
    for (const cand of nonSol) {
      const t = getCandidateTier(cand);
      if (t < bestTier) {
        bestTier = t;
        bestCell = cand;
        if (bestTier === 2) break;
      }
    }

    const siblings = nonSol.filter(
      (s) =>
        s.row === bestCell.row &&
        regions[s.row][s.col] === regions[bestCell.row][bestCell.col] &&
        getCandidateTier(s) <= bestTier
    );
    for (const s of siblings) s.state = 'mark';

    branchingLookaheadSteps++;
    maxLookaheadTier = Math.max(maxLookaheadTier, bestTier);
    const tierWeights: Record<number, number> = { 2: 18, 3: 24, 4: 30, 5: 38 };
    score += tierWeights[bestTier] || 30;
  }

  return {
    size,
    minRegionSize,
    nakedSingleSteps,
    pointingClaimingSteps,
    directStarvationSteps,
    subsetParitySteps,
    maxSubsetSize,
    branchingLookaheadSteps,
    maxLookaheadTier,
    stepsBeforeFirstCat,
    difficultyScore: score,
  };
}

const campaignSizeCache = new Map<string, CampaignSizeDifficultyStats>();

/**
 * Computes and caches difficulty statistics for all levels of a given map size within a campaign.
 * A level is flagged as `isHard` when its difficulty score is significantly above average
 * for the current campaign's levels of the same map size.
 */
export function getCampaignSizeDifficultyStats(
  campaignId: string,
  size: number
): CampaignSizeDifficultyStats | null {
  const key = `${campaignId}:${size}`;
  const cached = campaignSizeCache.get(key);
  if (cached) return cached;

  const campaign = CAMPAIGNS.find((c) => c.id === campaignId);
  if (!campaign) return null;

  const groupLevels = campaign.levels.filter((lvl) => lvl.size === size);
  if (groupLevels.length === 0) return null;

  const evaluated = groupLevels.map((lvl) => ({
    level: lvl,
    metrics: analyzePuzzleDifficulty(lvl),
  }));

  const scores = evaluated.map((e) => e.metrics.difficultyScore);
  const averageScore = scores.reduce((a, b) => a + b, 0) / scores.length;
  const variance = scores.reduce((a, b) => a + (b - averageScore) ** 2, 0) / scores.length;
  const stdDev = Math.sqrt(variance);
  const minScore = Math.min(...scores);
  const maxScore = Math.max(...scores);

  // Trimmed mean (excluding the single max value when n >= 7) prevents a single extreme outlier
  // from masking another level that is ~2x+ harder than the rest of the campaign's maps of that size.
  const sorted = [...scores].sort((a, b) => a - b);
  const trimmed = sorted.length >= 7 ? sorted.slice(0, -1) : sorted;
  const trimmedMean = trimmed.reduce((a, b) => a + b, 0) / trimmed.length;

  const byLevelId = new Map<string, LevelDifficultyInfo>();
  const hardLevelIds: string[] = [];

  for (const { level, metrics } of evaluated) {
    const score = metrics.difficultyScore;
    const ratioToAverage = averageScore > 0 ? score / averageScore : 1;
    const zScore = stdDev > 0 ? (score - averageScore) / stdDev : 0;

    const isHard =
      score > averageScore &&
      ((score >= averageScore * 1.35 &&
        score - averageScore >= 12 &&
        (score >= averageScore + 0.75 * stdDev || score >= averageScore * 1.75)) ||
        (score >= trimmedMean * 1.85 &&
          score - trimmedMean >= 25 &&
          metrics.branchingLookaheadSteps > 0));

    if (isHard) {
      hardLevelIds.push(level.id);
    }

    byLevelId.set(level.id, {
      levelId: level.id,
      levelNumber: level.levelNumber,
      campaignNumber: campaign.number,
      size: level.size,
      score,
      averageForSize: averageScore,
      stdDevForSize: stdDev,
      ratioToAverage,
      zScore,
      isHard,
      metrics,
    });
  }

  const stats: CampaignSizeDifficultyStats = {
    campaignId: campaign.id,
    campaignNumber: campaign.number,
    size,
    levelCount: groupLevels.length,
    averageScore,
    stdDev,
    minScore,
    maxScore,
    hardLevelIds,
    byLevelId,
  };

  campaignSizeCache.set(key, stats);
  return stats;
}

/**
 * Returns the difficulty info (including `isHard` relative to the current campaign's same map size)
 * for a specific campaign level ID.
 */
export function getLevelDifficultyInfo(levelId: string): LevelDifficultyInfo | null {
  const campaign = getCampaignForLevel(levelId);
  if (!campaign) return null;
  const level = campaign.levels.find((l) => l.id === levelId);
  if (!level) return null;
  const stats = getCampaignSizeDifficultyStats(campaign.id, level.size);
  return stats?.byLevelId.get(levelId) ?? null;
}
