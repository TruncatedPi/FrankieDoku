import { generateBonusPuzzle } from './generate-bonus-levels';
import { validateMap } from './map-validator';
import { validatePuzzleIntegrity } from '../src/engine/solver';
import * as fs from 'fs';

interface BonusLevel {
  id: string;
  levelNumber: number;
  name: string;
  tier: 'Phantom' | 'Eclipse';
  size: number;
  difficulty: 'medium' | 'hard' | 'expert';
  regions: number[][];
  solution: { row: number; col: number }[];
}

// Batch 1: 10 levels with 1 hole per row+column (N between min+1=5 and max=12)
const BATCH_1_SIZES = [5, 6, 7, 7, 8, 8, 9, 10, 11, 12];

// Batch 2: 10 levels with 2 holes per row+column (N between min+2=6 and max=12)
const BATCH_2_SIZES = [6, 7, 7, 8, 8, 9, 9, 10, 11, 12];

async function main() {
  const bonusLevels: BonusLevel[] = [];
  let levelNumber = 101;

  console.log('Generating Batch 1: 10 Phantom levels (1 void hole per row/col)...');
  for (let i = 0; i < BATCH_1_SIZES.length; i++) {
    const size = BATCH_1_SIZES[i];
    let puzzle = null;
    let seed = 5000 + i * 173;

    while (!puzzle) {
      seed++;
      try {
        const candidate = generateBonusPuzzle(size, 1, seed, 25);
        if (!candidate) continue;

        const val = validateMap(candidate);
        if (!val.valid) continue;

        const integrity = validatePuzzleIntegrity(candidate);
        if (!integrity.valid) continue;

        puzzle = candidate;
      } catch {
        continue;
      }
    }

    const level: BonusLevel = {
      id: `level-${levelNumber}`,
      levelNumber,
      name: `Phantom Void #${i + 1} (${size}×${size})`,
      tier: 'Phantom',
      size: puzzle.size,
      difficulty: size <= 7 ? 'medium' : size <= 9 ? 'hard' : 'expert',
      regions: puzzle.regions,
      solution: puzzle.solution!,
    };

    bonusLevels.push(level);
    console.log(`  Created ${level.id}: ${level.name} [1 hole/line, size ${size}]`);
    levelNumber++;
  }

  console.log('Generating Batch 2: 10 Eclipse levels (2 void holes per row/col)...');
  for (let i = 0; i < BATCH_2_SIZES.length; i++) {
    const size = BATCH_2_SIZES[i];
    let puzzle = null;
    let seed = 8000 + i * 239;

    while (!puzzle) {
      seed++;
      try {
        const candidate = generateBonusPuzzle(size, 2, seed, 25);
        if (!candidate) continue;

        const val = validateMap(candidate);
        if (!val.valid) continue;

        const integrity = validatePuzzleIntegrity(candidate);
        if (!integrity.valid) continue;

        puzzle = candidate;
      } catch {
        continue;
      }
    }

    const level: BonusLevel = {
      id: `level-${levelNumber}`,
      levelNumber,
      name: `Eclipse Chasm #${i + 1} (${size}×${size})`,
      tier: 'Eclipse',
      size: puzzle.size,
      difficulty: size <= 7 ? 'medium' : size <= 9 ? 'hard' : 'expert',
      regions: puzzle.regions,
      solution: puzzle.solution!,
    };

    bonusLevels.push(level);
    console.log(`  Created ${level.id}: ${level.name} [2 holes/line, size ${size}]`);
    levelNumber++;
  }

  fs.writeFileSync('bonus-levels.json', JSON.stringify(bonusLevels, null, 2));
  console.log(`Successfully generated all ${bonusLevels.length} bonus levels to bonus-levels.json!`);
}

main().catch(console.error);
