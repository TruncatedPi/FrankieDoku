import { test, describe } from 'node:test';
import assert from 'node:assert';
import {
  solvePuzzle,
  isPuzzleUnique,
  findConflicts,
  getAutoCrossCells,
  getSatisfiedUnits,
  generateHint,
} from './solver';
import { generateDailyPuzzle, generatePuzzle } from './generator';
import { CAMPAIGN_LEVELS } from '../data/levels';
import { BoardCell, Puzzle } from './types';

describe('Meowdoku Engine & Rules', () => {
  test('Aloof Rule & Queen Solvability on 5x5', () => {
    const testPuzzle = CAMPAIGN_LEVELS[5]; // Level 6 is a 5x5 puzzle

    const solutions = solvePuzzle(testPuzzle, 5);
    assert.strictEqual(solutions.length, 1, 'Puzzle should have exactly 1 unique solution');
    assert.strictEqual(isPuzzleUnique(testPuzzle), true);
  });

  test('Conflict Detection on Touching Cats', () => {
    const size = 5;
    const regions = [
      [0, 0, 1, 1, 2],
      [0, 1, 1, 2, 2],
      [3, 3, 1, 2, 2],
      [3, 3, 4, 4, 2],
      [3, 4, 4, 4, 4],
    ];

    // Two cats placed diagonally adjacent: (0, 0) and (1, 1)
    const cells: BoardCell[] = [
      { row: 0, col: 0, region: 0, state: 'cat' },
      { row: 1, col: 1, region: 1, state: 'cat' },
      { row: 3, col: 4, region: 2, state: 'cat' },
    ];

    const conflicts = findConflicts(cells, size, regions);
    assert.ok(conflicts.has('0,0'), 'Cat at (0,0) should conflict');
    assert.ok(conflicts.has('1,1'), 'Cat at (1,1) should conflict due to diagonal touching');
    assert.ok(!conflicts.has('3,4'), 'Cat at (3,4) should not conflict');
  });

  test('Auto-cross computation marks row, col, region, and 8-neighbors', () => {
    const size = 5;
    const regions = [
      [0, 0, 1, 1, 2],
      [0, 1, 1, 2, 2],
      [3, 3, 1, 2, 2],
      [3, 3, 4, 4, 2],
      [3, 4, 4, 4, 4],
    ];

    const cells: BoardCell[] = [];
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        cells.push({ row: r, col: c, region: regions[r][c], state: 'empty' });
      }
    }

    const toCross = getAutoCrossCells(2, 2, size, regions, cells);
    const crossedSet = new Set(toCross.map((c) => `${c.row},${c.col}`));

    // Check same row (2, 0)
    assert.ok(crossedSet.has('2,0'));
    // Check same col (0, 2)
    assert.ok(crossedSet.has('0,2'));
    // Check diagonal neighbour (1, 1)
    assert.ok(crossedSet.has('1,1'));
    // Placed cell itself should not be in toCross
    assert.ok(!crossedSet.has('2,2'));
  });

  test('Daily puzzle is deterministic for given date', () => {
    const p1 = generateDailyPuzzle('2026-09-05');
    const p2 = generateDailyPuzzle('2026-09-05');

    assert.strictEqual(p1.size, p2.size);
    assert.deepStrictEqual(p1.regions, p2.regions);
    assert.strictEqual(isPuzzleUnique(p1), true);
  });

  test('Campaign levels verification', () => {
    assert.strictEqual(CAMPAIGN_LEVELS.length, 120, 'Must have exactly 120 campaign levels');

    // Test a sample of levels across tiers
    const sampleIndices = [0, 9, 15, 24, 30, 39, 45, 49, 55, 65, 75, 85, 95, 99, 105, 115];
    for (const idx of sampleIndices) {
      const lvl = CAMPAIGN_LEVELS[idx];
      assert.ok(lvl.size >= 4 && lvl.size <= 12);
      assert.strictEqual(isPuzzleUnique(lvl), true, `Level ${lvl.levelNumber} must have unique solution`);
    }
  });
});
