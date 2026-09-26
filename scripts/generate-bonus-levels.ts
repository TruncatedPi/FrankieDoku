import { Coordinate, Puzzle } from '../src/engine/types';
import { solvePuzzle, validatePuzzleIntegrity } from '../src/engine/solver';
import { validateMap } from './map-validator';
import { createPRNG, generateValidQueens, shuffle } from '../src/engine/generator';

const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];

function isConnected(grid: number[][], size: number, region: number): boolean {
  let start = -1, count = 0;
  for (let r = 0; r < size; r++) for (let c = 0; c < size; c++) {
    if (grid[r][c] === region) { start = r * size + c; count++; }
  }
  if (!count) return false;
  const seen = new Set([start]), queue = [start];
  for (let i = 0; i < queue.length; i++) {
    const r = Math.floor(queue[i] / size), c = queue[i] % size;
    for (const [dr, dc] of directions) {
      const nr = r + dr, nc = c + dc, key = nr * size + nc;
      if (nr >= 0 && nc >= 0 && nr < size && nc < size && grid[nr][nc] === region && !seen.has(key)) {
        seen.add(key); queue.push(key);
      }
    }
  }
  return seen.size === count;
}

/**
 * Generate a random derangement (permutation with no fixed points relative to exclude)
 */
function randomDerangement(size: number, exclude: number[], random: () => number): number[] | null {
  for (let attempt = 0; attempt < 200; attempt++) {
    const perm = shuffle(Array.from({ length: size }, (_, i) => i), random);
    if (perm.every((val, idx) => val !== exclude[idx])) {
      return perm;
    }
  }
  return null;
}

/**
 * Generate two disjoint derangements h1, h2 relative to queens such that:
 * for all r: h1[r] != q[r], h2[r] != q[r], h1[r] != h2[r]
 */
function randomDoubleDerangement(size: number, queenCols: number[], random: () => number): [number[], number[]] | null {
  for (let attempt = 0; attempt < 500; attempt++) {
    const h1 = randomDerangement(size, queenCols, random);
    if (!h1) continue;
    // For h2, it must differ from both queenCols and h1
    let success = false;
    for (let attempt2 = 0; attempt2 < 200; attempt2++) {
      const h2 = shuffle(Array.from({ length: size }, (_, i) => i), random);
      if (h2.every((val, idx) => val !== queenCols[idx] && val !== h1[idx])) {
        return [h1, h2];
      }
    }
  }
  return null;
}

export function generateBonusPuzzle(
  size: number,
  holesPerRow: 1 | 2,
  seed: number,
  maxRounds = 40
): Puzzle | null {
  const random = createPRNG(seed);
  const queens = generateValidQueens(size, random);
  const queenCols = queens.map(q => q.col);

  // Determine hole positions
  const holes: Coordinate[] = [];
  if (holesPerRow === 1) {
    const h1 = randomDerangement(size, queenCols, random);
    if (!h1) return null;
    for (let r = 0; r < size; r++) holes.push({ row: r, col: h1[r] });
  } else {
    const d = randomDoubleDerangement(size, queenCols, random);
    if (!d) return null;
    const [h1, h2] = d;
    for (let r = 0; r < size; r++) {
      holes.push({ row: r, col: h1[r] });
      holes.push({ row: r, col: h2[r] });
    }
  }

  const holeSet = new Set(holes.map(h => h.row * size + h.col));
  const background = Math.floor(random() * size);
  const grid = Array.from({ length: size }, () => new Array<number>(size).fill(background));

  // Stamp holes as -1
  for (const h of holes) {
    grid[h.row][h.col] = -1;
  }

  // Stamp queens as region seeds
  queens.forEach((q, region) => {
    grid[q.row][q.col] = region;
  });

  const queenSeeds = new Set(queens.map(q => q.row * size + q.col));

  const puzzle: Puzzle = {
    id: `bonus-${size}x${size}-${holesPerRow}hole-${seed}`,
    size,
    regions: grid,
    solution: queens,
    difficulty: size <= 7 ? 'medium' : size <= 9 ? 'hard' : 'expert',
  };

  // Grow regions into available background squares
  for (let round = 0; round < Math.min(maxRounds, size * 2); round++) {
    let changed = false;
    for (const key of shuffle(Array.from({ length: size * size }, (_, i) => i), random)) {
      if (holeSet.has(key) || queenSeeds.has(key)) continue;
      const r = Math.floor(key / size), c = key % size;
      if (grid[r][c] !== background) continue;

      const neighbors = new Set<number>();
      for (const [dr, dc] of directions) {
        const nr = r + dr, nc = c + dc;
        if (nr >= 0 && nc >= 0 && nr < size && nc < size && grid[nr][nc] !== background && grid[nr][nc] !== -1) {
          neighbors.add(grid[nr][nc]);
        }
      }

      for (const region of shuffle([...neighbors], random)) {
        grid[r][c] = region;
        // Background must remain connected, and puzzle must have exactly 1 solution
        if (isConnected(grid, size, background) && solvePuzzle(puzzle, 2).length === 1) {
          changed = true;
          break;
        }
        grid[r][c] = background;
      }
    }
    if (!changed) break;
  }

  // Check that all regions are connected
  for (let reg = 0; reg < size; reg++) {
    if (!isConnected(grid, size, reg)) return null;
  }

  if (solvePuzzle(puzzle, 2).length !== 1) return null;

  return puzzle;
}
