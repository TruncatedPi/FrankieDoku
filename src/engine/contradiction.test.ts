import { test, describe } from 'node:test';
import assert from 'node:assert';
import {
  solvePuzzle,
  isPuzzleUnique,
  findConflicts,
  generateHint,
  explainCellContradiction,
  validatePuzzleIntegrity,
} from './solver';
import { generateDailyPuzzle, generatePuzzle } from './generator';
import { CAMPAIGN_LEVELS, CAMPAIGNS, LEVELS_PER_CAMPAIGN } from '../data/levels';
import { BoardCell, Puzzle } from './types';
import { getTerritoryInfo, stripTerritoryTags } from './palettes';

describe('Puzzle Integrity & Contradiction Verification', () => {
  test('All registered campaign levels must be 100% contradiction-free with strictly 1 unique solution', () => {
    assert.strictEqual(CAMPAIGN_LEVELS.length, CAMPAIGNS.length * LEVELS_PER_CAMPAIGN, 'Each campaign must contain a full 100-level pack');

    for (const level of CAMPAIGN_LEVELS) {
      const integrity = validatePuzzleIntegrity(level);
      assert.strictEqual(
        integrity.valid,
        true,
        `Level ${level.levelNumber} (${level.name}) failed integrity: ${integrity.error}`
      );

      // Verify solver returns exactly 1 solution
      const solutions = solvePuzzle(level, 3);
      assert.strictEqual(
        solutions.length,
        1,
        `Level ${level.levelNumber} has ${solutions.length} solutions (contradictory / non-unique)`
      );

      // Verify stored solution matches solver solution exactly
      assert.ok(level.solution, `Level ${level.levelNumber} must have a solution array`);
      const solSet = new Set(solutions[0].map((c) => `${c.row},${c.col}`));
      for (const cat of level.solution) {
        assert.ok(
          solSet.has(`${cat.row},${cat.col}`),
          `Level ${level.levelNumber} stored cat (${cat.row},${cat.col}) does not match solved cat`
        );
      }
    }
  });

  test('Daily puzzle generation never produces contradictory or non-unique puzzles', () => {
    const dates = [
      '2026-09-01',
      '2026-09-02',
      '2026-09-03',
      '2026-09-04',
      '2026-09-05',
      '2026-09-06',
      '2026-09-07',
      '2026-12-25',
      '2027-01-01',
    ];

    for (const date of dates) {
      const puzzle = generateDailyPuzzle(date);
      const integrity = validatePuzzleIntegrity(puzzle);
      assert.strictEqual(
        integrity.valid,
        true,
        `Daily puzzle for ${date} failed integrity: ${integrity.error}`
      );

      const solutions = solvePuzzle(puzzle, 3);
      assert.strictEqual(
        solutions.length,
        1,
        `Daily puzzle for ${date} must have strictly 1 unique solution`
      );
    }
  });

  test('Procedural generator produces valid, unique, contradiction-free puzzles across sizes', () => {
    const testSizes = [4, 5, 6, 7, 8, 9, 10, 11, 12];
    for (const size of testSizes) {
      const puzzle = generatePuzzle(size, 42 + size * 100, 30);
      assert.ok(puzzle, `Generator must produce a ${size}x${size} puzzle`);
      if (puzzle) {
        const integrity = validatePuzzleIntegrity(puzzle);
        assert.strictEqual(
          integrity.valid,
          true,
          `Generated ${size}x${size} puzzle failed integrity: ${integrity.error}`
        );

        const solutions = solvePuzzle(puzzle, 3);
        assert.strictEqual(
          solutions.length,
          1,
          `Generated ${size}x${size} puzzle must have strictly 1 unique solution`
        );
      }
    }
  });

  test('Level 1 contradiction prevention: invalid cat placement is flagged and hint prioritizes removal', () => {
    const level1 = CAMPAIGN_LEVELS[0];
    const size = level1.size;

    // Build empty board
    const cells: BoardCell[] = [];
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        cells.push({
          row: r,
          col: c,
          region: level1.regions[r][c],
          state: 'empty',
          hasConflict: false,
          isHinted: false,
        });
      }
    }

    // Player places an off-solution cat at Row 1 Col 4 (index 0, 3)
    const targetIdx = cells.findIndex((c) => c.row === 0 && c.col === 3);
    cells[targetIdx].state = 'cat';

    // 1. Conflict detection must immediately flag this cat
    const conflicts = findConflicts(cells, size, level1.regions, level1.solution);
    assert.ok(
      conflicts.has('0,3'),
      'Off-solution cat at (0,3) must be flagged in conflicts'
    );

    // 2. Hint engine must detect the invalid cat and tell the player to remove it
    const hint = generateHint(level1, cells);
    assert.ok(hint, 'Hint must be generated');
    assert.strictEqual(hint?.type, 'elimination', 'Hint must be an elimination/removal');
    assert.strictEqual(hint?.row, 0, 'Hint must point to row 0');
    assert.strictEqual(hint?.col, 3, 'Hint must point to col 3');
    assert.ok(
      hint?.explanation.includes("doesn't belong here"),
      'Hint explanation must explain that the cat does not belong here'
    );
  });

  test('Hint engine never suggests placing a cat into a row, column, or region that already has a cat', () => {
    const level1 = CAMPAIGN_LEVELS[0];
    const size = level1.size;

    // Create cells with an invalid cat at (0, 0)
    const cells: BoardCell[] = [];
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        cells.push({
          row: r,
          col: c,
          region: level1.regions[r][c],
          state: r === 0 && c === 0 ? 'cat' : 'empty',
          hasConflict: false,
          isHinted: false,
        });
      }
    }

    const hint = generateHint(level1, cells);
    assert.ok(hint);
    // Since (0, 0) is not in the solution, hint must direct removal of (0, 0)
    assert.strictEqual(hint.type, 'elimination');
    assert.strictEqual(hint.row, 0);
    assert.strictEqual(hint.col, 0);
  });

  test('Hint engine detects when a player accidentally crosses out a true solution cell', () => {
    const level1 = CAMPAIGN_LEVELS[0];
    const size = level1.size;

    // Build empty board
    const cells: BoardCell[] = [];
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        cells.push({
          row: r,
          col: c,
          region: level1.regions[r][c],
          state: 'empty',
          hasConflict: false,
          isHinted: false,
        });
      }
    }

    // Player mistakenly puts an 'X' on (0, 1) which is a true cat location
    const idx = cells.findIndex((c) => c.row === 0 && c.col === 1);
    cells[idx].state = 'mark';

    const hint = generateHint(level1, cells);
    assert.ok(hint);
    assert.strictEqual(hint?.row, 0);
    assert.strictEqual(hint?.col, 1);
    assert.strictEqual(hint?.type, 'placement');
    assert.ok(hint?.explanation.includes('placed by mistake'));
  });

  test('validatePuzzleIntegrity accurately detects non-unique or broken puzzles', () => {
    // 1. Puzzle with 2 solutions (ambiguous / contradictory)
    const ambiguousPuzzle: Puzzle = {
      id: 'ambiguous',
      size: 4,
      regions: [
        [0, 0, 1, 1],
        [0, 0, 1, 1],
        [2, 2, 3, 3],
        [2, 2, 3, 3],
      ],
    };
    const ambCheck = validatePuzzleIntegrity(ambiguousPuzzle);
    assert.strictEqual(ambCheck.valid, false);
    assert.ok(ambCheck.error?.includes('contradictory / non-unique'));

    // 2. Puzzle with disconnected region
    const disconnectedPuzzle: Puzzle = {
      id: 'disconnected',
      size: 4,
      regions: [
        [0, 1, 0, 1],
        [2, 2, 3, 3],
        [2, 2, 3, 3],
        [2, 2, 3, 3],
      ],
    };
    const discCheck = validatePuzzleIntegrity(disconnectedPuzzle);
    assert.strictEqual(discCheck.valid, false);
    assert.ok(discCheck.error?.includes('disconnected'));
  });

  test('Hint engine explains HOW contradiction occurs and returns involved cells with faded states', () => {
    const level1 = CAMPAIGN_LEVELS[0];
    const size = level1.size;

    // 1. Two touching cats (direct conflict)
    const cells: BoardCell[] = [];
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        cells.push({
          row: r,
          col: c,
          region: level1.regions[r][c],
          state: 'empty',
          hasConflict: false,
          isHinted: false,
        });
      }
    }

    // Place a valid cat at solution spot (0, 1) and an invalid cat touching at (1, 2)
    cells.find((c) => c.row === 0 && c.col === 1)!.state = 'cat';
    cells.find((c) => c.row === 1 && c.col === 2)!.state = 'cat';

    const hint = generateHint(level1, cells);
    assert.ok(hint);
    assert.strictEqual(hint.type, 'elimination');
    assert.strictEqual(hint.row, 1);
    assert.strictEqual(hint.col, 2);
    assert.ok(hint.explanation.includes('touching') || hint.explanation.includes('conflicts with'));
    assert.ok(hint.involvedCells && hint.involvedCells.length >= 2);
    const conflicting = hint.involvedCells.find((inv) => inv.row === 0 && inv.col === 1);
    assert.ok(conflicting, 'Involved cells must include the conflicting cat at (0, 1)');
    assert.strictEqual(conflicting?.highlight, true);

    // 2. Direct rule elimination on empty square
    const cells2: BoardCell[] = [];
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        cells2.push({
          row: r,
          col: c,
          region: level1.regions[r][c],
          state: 'empty',
          hasConflict: false,
          isHinted: false,
        });
      }
    }
    // Place a valid cat at (0, 1). Square (0, 0) is empty in same row.
    cells2.find((c) => c.row === 0 && c.col === 1)!.state = 'cat';
    const ruleHint = generateHint(level1, cells2);
    assert.ok(ruleHint);
    assert.strictEqual(ruleHint.type, 'elimination');
    assert.ok(ruleHint.involvedCells && ruleHint.involvedCells.length >= 2);
    const targetFaded = ruleHint.involvedCells.find((inv) => inv.row === ruleHint.row && inv.col === ruleHint.col);
    assert.strictEqual(targetFaded?.fadedState, 'mark');
    assert.ok(ruleHint.steps && ruleHint.steps.length > 0, 'Hint must include logical steps');
  });

  test('Hint engine always produces structured logical steps and never emits generic fallback', () => {
    // Check initial hints across first 10 campaign levels
    for (let i = 0; i < 10; i++) {
      const level = CAMPAIGN_LEVELS[i];
      const cells: BoardCell[] = [];
      for (let r = 0; r < level.size; r++) {
        for (let c = 0; c < level.size; c++) {
          cells.push({
            row: r,
            col: c,
            region: level.regions[r][c],
            state: 'empty',
            hasConflict: false,
            isHinted: false,
          });
        }
      }

      const hint = generateHint(level, cells);
      assert.ok(hint, `Level ${level.levelNumber} must produce a hint`);
      assert.ok(
        !hint.explanation.includes('cannot be part of a complete solution'),
        `Level ${level.levelNumber} hint must not use generic fallback message`
      );
      assert.ok(hint.steps && hint.steps.length >= 2, `Level ${level.levelNumber} hint must have at least 2 deductive steps`);
      assert.ok(
        hint.steps.some((s) => s.includes('Conclusion')),
        `Level ${level.levelNumber} steps must include a conclusion`
      );
    }
  });

  test('Pointing / Claiming reduction generates explicit line-territory logical steps', () => {
    // 4x4 custom puzzle where Territory 0 has all cells in Row 0
    const pointingPuzzle: Puzzle = {
      id: 'pointing-test',
      size: 4,
      regions: [
        [0, 0, 1, 1],
        [2, 2, 1, 1],
        [2, 2, 3, 3],
        [2, 2, 3, 3],
      ],
      solution: [
        { row: 0, col: 1 },
        { row: 1, col: 3 },
        { row: 2, col: 0 },
        { row: 3, col: 2 },
      ],
    };

    const cells: BoardCell[] = [];
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        cells.push({
          row: r,
          col: c,
          region: pointingPuzzle.regions[r][c],
          state: 'empty',
          hasConflict: false,
          isHinted: false,
        });
      }
    }

    const hint = generateHint(pointingPuzzle, cells);
    assert.ok(hint);
    assert.ok(hint.steps && hint.steps.length >= 3);
    assert.ok(hint.explanation.length > 0);
    assert.ok(!hint.explanation.includes('cannot be part of a complete solution'));

    // Check cozy theme: Territory 0 is Coral Red (#ef4444)
    assert.ok(hint.explanation.includes('Territory Coral Red'), 'Hint explanation should refer to Territory Coral Red');
    assert.ok(hint.explanation.includes('[[territory:0:#ef4444|Territory Coral Red]]'), 'Hint explanation should contain matching color tag');
    assert.strictEqual(
      stripTerritoryTags(hint.explanation).includes('[[territory:'),
      false,
      'stripTerritoryTags should cleanly remove metadata brackets'
    );

    // Check theme customization: In midnight theme, Territory 0 is Neon Cyan (#00f0ff)
    const midnightHint = generateHint(pointingPuzzle, cells, 'midnight');
    assert.ok(midnightHint);
    assert.ok(midnightHint.explanation.includes('Territory Neon Cyan'), 'Midnight hint should refer to Territory Neon Cyan');
    assert.ok(midnightHint.explanation.includes('[[territory:0:#00f0ff|Territory Neon Cyan]]'), 'Midnight hint should contain #00f0ff tag');

    // Ensure no hints use numeric territory values like "Territory 1"
    assert.ok(!hint.explanation.includes('Territory 1'), 'Must not refer to territory as a numeric value');
    assert.ok(!midnightHint.explanation.includes('Territory 1'), 'Must not refer to territory as a numeric value in midnight theme');
  });

  test('Subset parity reduction: Rows 5-10 containing 6 territories eliminates Neon Amber in Level 49', () => {
    const level49 = CAMPAIGN_LEVELS.find((l) => l.id === 'level-49');
    assert.ok(level49, 'Level 49 must exist');

    // Create cells matching screenshot with two player marks:
    // (Row 4, Col 8) 0-indexed (3, 7) and (Row 6, Col 9) 0-indexed (5, 8)
    const cells: BoardCell[] = [];
    for (let r = 0; r < level49.size; r++) {
      for (let c = 0; c < level49.size; c++) {
        const isMark = (r === 3 && c === 7) || (r === 5 && c === 8);
        cells.push({
          row: r,
          col: c,
          region: level49.regions[r][c],
          state: isMark ? 'mark' : 'empty',
          hasConflict: false,
          isHinted: false,
        });
      }
    }

    const hint = generateHint(level49, cells, 'midnight');
    assert.ok(hint, 'Hint must be generated');
    assert.strictEqual(hint.type, 'elimination', 'Hint must be an elimination of a non-contained territory');

    // Verify it detected the Rows 5-10 subset parity
    assert.ok(
      hint.explanation.includes('Rows 5–10 (6 rows) fully contain 6 territories') ||
        hint.explanation.includes('Rows 5 to 10'),
      `Explanation should mention Rows 5-10 subset parity, got: ${hint.explanation}`
    );
    assert.ok(
      hint.explanation.includes('Territory Neon Amber'),
      `Explanation should eliminate Territory Neon Amber, got: ${hint.explanation}`
    );
    assert.ok(
      !hint.explanation.includes('Row 1, Column 1'),
      'Must NOT fall back to arbitrary solution placement at Row 1, Column 1'
    );
    assert.ok(hint.steps && hint.steps.length >= 4, 'Must provide structured logical steps');
    assert.ok(
      hint.steps.some((s) => s.includes('consume all 6 cats') || s.includes('can contain at most 6 cats')),
      'Steps must explain the pigeonhole counting principle'
    );
  });

  test('Level 364 mid-game position: avoids oracle cat-placement giveaway and explains (a) R2C2 shared-territory conflict and (b) R1C7-R1C9 two-option Coral Red contradiction', () => {
    const level364 = CAMPAIGN_LEVELS.find((l) => l.id === 'level-364');
    assert.ok(level364, 'Level 364 must exist');

    // Exact 25 marks from the mid-game screenshot position on Level 364:
    const marks = new Set([
      '0,3', '0,4', '0,5',
      '1,0', '1,3', '1,4', '1,5', '1,6', '1,7',
      '2,3', '2,4', '2,5', '2,6',
      '3,3', '3,4', '3,6', '3,7',
      '5,6',
      '6,6',
      '8,0', '8,1', '8,3', '8,4', '8,5', '8,6',
    ]);

    const cells: BoardCell[] = [];
    for (let r = 0; r < level364.size; r++) {
      for (let c = 0; c < level364.size; c++) {
        cells.push({
          row: r,
          col: c,
          region: level364.regions[r][c],
          state: marks.has(`${r},${c}`) ? 'mark' : 'empty',
          hasConflict: false,
          isHinted: false,
        });
      }
    }

    // 1. Primary hint on this board state must be Deduction (a):
    // Placing a cat on R2C2 of Territory Coral Red only allows for a cat in Territory Sky Cerulean for both Row 1 (R1C7, R1C8, R1C9) and Row 3 (R3C8, R3C9)
    const hintA = generateHint(level364, cells, 'cozy');
    assert.ok(hintA, 'Hint must be generated for Level 364 mid-game position');
    assert.strictEqual(hintA.type, 'elimination', 'Hint must be an elimination (mark with X), never an un-deduced cat placement giveaway');
    assert.ok(!hintA.explanation.includes('maintains the unique, valid solution'), 'Must never emit oracle solution giveaway text');
    assert.strictEqual(hintA.row, 1, 'Hint (a) targets Row 2 (0-indexed 1)');
    assert.strictEqual(hintA.col, 1, 'Hint (a) targets Column 2 (0-indexed 1)');

    const plainA = stripTerritoryTags(hintA.explanation);
    assert.ok(plainA.includes('R2C2'), `Hint (a) must reference R2C2, got: ${plainA}`);
    assert.ok(plainA.includes('Territory Coral Red'), `Hint (a) must reference Territory Coral Red, got: ${plainA}`);
    assert.ok(plainA.includes('Territory Sky Cerulean'), `Hint (a) must reference Territory Sky Cerulean, got: ${plainA}`);
    assert.ok(
      plainA.includes('Row 1 (R1C7, R1C8, R1C9)') && plainA.includes('Row 3 (R3C8, R3C9)'),
      `Hint (a) must explain that both Row 1 (R1C7, R1C8, R1C9) and Row 3 (R3C8, R3C9) only have options in Sky Cerulean, got: ${plainA}`
    );

    // 2. Deduction (b): Placing a cat on either R1C7, R1C8, or R1C9 in Territory Sky Cerulean only allows for a cat
    // in Territory Coral Red for either Row 2 (R2C2) or Row 3 (R3C2), and both options block all other Row 3 or Row 2 possibilities
    const hintB = explainCellContradiction(level364, cells, 0, 6, 'cozy');
    assert.ok(hintB, 'Contradiction explanation must be generated for R1C7');
    assert.strictEqual(hintB.type, 'elimination');
    const plainB = stripTerritoryTags(hintB.explanation);
    assert.ok(
      plainB.includes('either R1C7, R1C8, or R1C9'),
      `Hint (b) must group R1C7, R1C8, or R1C9 in Sky Cerulean, got: ${plainB}`
    );
    assert.ok(
      plainB.includes('Territory Coral Red') && plainB.includes('Row 2 (R2C2) or Row 3 (R3C2)'),
      `Hint (b) must explain that Coral Red is restricted to Row 2 (R2C2) or Row 3 (R3C2), got: ${plainB}`
    );
    assert.ok(
      plainB.includes('Both options block all other Row 3 or Row 2 possibilities'),
      `Hint (b) must explain that both options block all other Row 3 or Row 2 possibilities, got: ${plainB}`
    );

    // 3. Verify that solving Level 364 from start to finish via generateHint completes cleanly with ZERO oracle placements
    const simCells: BoardCell[] = [];
    for (let r = 0; r < level364.size; r++) {
      for (let c = 0; c < level364.size; c++) {
        simCells.push({
          row: r,
          col: c,
          region: level364.regions[r][c],
          state: 'empty',
          hasConflict: false,
          isHinted: false,
        });
      }
    }
    for (let step = 0; step < 200; step++) {
      if (simCells.filter((c) => c.state === 'cat').length === level364.size) break;
      const h = generateHint(level364, simCells, 'cozy');
      assert.ok(h, `Step ${step} on Level 364 must produce a logical hint`);
      assert.ok(
        !h.explanation.includes('maintains the unique, valid solution'),
        `Step ${step} must not use oracle giveaway fallback`
      );
      const cell = simCells.find((c) => c.row === h.row && c.col === h.col)!;
      cell.state = h.type === 'placement' ? 'cat' : 'mark';
    }
    assert.strictEqual(simCells.filter((c) => c.state === 'cat').length, level364.size, 'Level 364 must solve to completion via hints');
  });
});



