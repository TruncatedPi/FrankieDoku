/**
 * Generate 50 new campaign levels (51–100) spanning 8×8 through 12×12.
 * Run: npx tsx scripts/generate-new-levels.ts > new-levels.json
 */
import { generatePuzzle } from '../src/engine/generator';
import { validateMap } from './map-validator';
import { solvePuzzle, validatePuzzleIntegrity } from '../src/engine/solver';

interface LevelSpec {
  size: number;
  tier: string;
  tierLabel: string;
  namePrefix: string;
}

const TIER_SPECS: LevelSpec[] = [
  { size: 8,  tier: 'Explorer',    tierLabel: 'Explorer (8×8)',       namePrefix: 'Explorer Trail' },
  { size: 9,  tier: 'Adventurer',  tierLabel: 'Adventurer (9×9)',     namePrefix: 'Adventurer Path' },
  { size: 10, tier: 'Champion',    tierLabel: 'Champion (10×10)',     namePrefix: 'Champion Arena' },
  { size: 11, tier: 'Legend',      tierLabel: 'Legend (11×11)',       namePrefix: 'Legend Quest' },
  { size: 12, tier: 'Grandmaster', tierLabel: 'Grandmaster (12×12)', namePrefix: 'Grandmaster Trial' },
];

const LEVELS_PER_TIER = 10;

function main() {
  const levels: any[] = [];
  let levelNumber = 51;
  let failures = 0;

  for (const spec of TIER_SPECS) {
    let generated = 0;
    let seed = 1000 + spec.size * 100; // Spread seeds by size to get variety

    while (generated < LEVELS_PER_TIER) {
      seed++;
      try {
        // Vary growth budget for visual variety in region shapes
        const maxRounds = 10 + (generated * 5); // 10, 15, 20, 25, 30, 35, 40, 45, 50, 55
        const puzzle = generatePuzzle(spec.size, seed, Math.min(maxRounds, 60));

        // Double-check with the independent validator
        const validation = validateMap(puzzle);
        if (!validation.valid) {
          failures++;
          continue;
        }

        // Also verify integrity
        const integrity = validatePuzzleIntegrity(puzzle);
        if (!integrity.valid) {
          failures++;
          continue;
        }

        // Confirm exactly 1 unique solution
        const solutions = solvePuzzle(puzzle, 2);
        if (solutions.length !== 1) {
          failures++;
          continue;
        }

        const level = {
          id: `level-${levelNumber}`,
          levelNumber,
          name: `${spec.namePrefix} #${generated + 1}`,
          tier: spec.tier,
          size: spec.size,
          difficulty: spec.size <= 9 ? 'hard' as const : 'expert' as const,
          regions: puzzle.regions,
          solution: puzzle.solution,
        };

        levels.push(level);
        generated++;
        levelNumber++;
      } catch {
        seed++;
        failures++;
      }
    }
  }

  // Output as JSON
  console.error(`Generated ${levels.length} levels (${failures} seeds skipped)`);
  console.log(JSON.stringify(levels, null, 2));
}

main();
