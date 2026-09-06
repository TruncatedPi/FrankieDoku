import type { Coordinate, Puzzle } from './types';
import { solvePuzzle, validatePuzzleIntegrity } from './solver';
import { assertBoardSize, GENERATOR_VERSION } from './constants';

export function createPRNG(seed: number) {
  return () => {
    let t = (seed = (seed + 0x6d2b79f5) | 0);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
export function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) hash = (Math.imul(hash, 31) + str.charCodeAt(i)) | 0;
  return hash >>> 0;
}
/** Fisher–Yates consumes the same random sequence in every JavaScript engine. */
export function shuffle<T>(items: T[], random: () => number): T[] {
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }
  return items;
}
export function generateValidQueens(size: number, random: () => number): Coordinate[] {
  assertBoardSize(size);
  const queens: Coordinate[] = [], used = new Set<number>();
  function place(row: number): boolean {
    if (row === size) return true;
    for (const col of shuffle(Array.from({ length: size }, (_, i) => i), random)) {
      if (used.has(col) || (row > 0 && Math.abs(queens[row - 1].col - col) <= 1)) continue;
      used.add(col); queens.push({ row, col });
      if (place(row + 1)) return true;
      queens.pop(); used.delete(col);
    }
    return false;
  }
  if (!place(0)) throw new Error(`No valid arrangement for size ${size}`);
  return queens;
}
const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
function connected(grid: number[][], size: number, region: number): boolean {
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
 * N-1 singleton territories force N-1 cats; the remaining row and column force
 * the last cat in the background territory. Non-touching singleton seeds leave
 * that background connected. Only accept growth preserving connectivity and
 * uniqueness, so exhausted growth budgets still return a valid map.
 */
export function generatePuzzle(size: number, seed?: number, maxRounds = 60): Puzzle {
  assertBoardSize(size);
  if (seed !== undefined && !Number.isSafeInteger(seed)) throw new RangeError('Seed must be a safe integer');
  if (!Number.isInteger(maxRounds) || maxRounds < 0 || maxRounds > 1000) throw new RangeError('Invalid growth budget');
  const actualSeed = seed ?? Math.floor(Math.random() * 0x100000000);
  const random = createPRNG(actualSeed), queens = generateValidQueens(size, random);
  const background = Math.floor(random() * size);
  const grid = Array.from({ length: size }, () => new Array<number>(size).fill(background));
  const seeds = new Set(queens.map(q => q.row * size + q.col));
  queens.forEach((q, region) => { grid[q.row][q.col] = region; });
  const puzzle: Puzzle = {
    id: `gen-v${GENERATOR_VERSION}-${size}x${size}-${actualSeed}-${maxRounds}`,
    size, regions: grid, solution: queens, generatorVersion: GENERATOR_VERSION,
    name: `${size}x${size} Logic`,
    difficulty: size <= 5 ? 'easy' : size <= 7 ? 'medium' : size <= 9 ? 'hard' : 'expert',
  };
  for (let round = 0; round < Math.min(maxRounds, size); round++) {
    let changed = false;
    for (const key of shuffle(Array.from({ length: size * size }, (_, i) => i), random)) {
      const r = Math.floor(key / size), c = key % size;
      if (seeds.has(key) || grid[r][c] !== background) continue;
      const neighbors = new Set<number>();
      for (const [dr, dc] of directions) {
        const nr = r + dr, nc = c + dc;
        if (nr >= 0 && nc >= 0 && nr < size && nc < size && grid[nr][nc] !== background) neighbors.add(grid[nr][nc]);
      }
      for (const region of shuffle([...neighbors], random)) {
        grid[r][c] = region;
        if (connected(grid, size, background) && solvePuzzle(puzzle, 2).length === 1) { changed = true; break; }
        grid[r][c] = background;
      }
    }
    if (!changed) break;
  }
  const integrity = validatePuzzleIntegrity(puzzle);
  if (!integrity.valid) throw new Error(`Generated map failed integrity: ${integrity.error}`);
  return puzzle;
}
export function generateDailyPuzzle(dateString: string): Puzzle {
  const date = new Date(`${dateString}T00:00:00Z`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateString) || !Number.isFinite(date.getTime()) || date.toISOString().slice(0, 10) !== dateString) {
    throw new RangeError('Daily date must be a valid YYYY-MM-DD date');
  }
  const size = [9, 6, 7, 7, 8, 8, 9][date.getUTCDay()];
  return { ...generatePuzzle(size, hashString(`v${GENERATOR_VERSION}:${dateString}`)),
    id: `daily-${dateString}`, dailyDate: dateString, name: `Daily Challenge: ${dateString}` };
}
/** Legacy fixture for auditing old daily maps; no longer a generation fallback. */
export function createDailyFallbackPuzzle(dateString: string): Puzzle {
  return { id: `daily-${dateString}`, size: 5,
    regions: [[0, 0, 0, 2, 2], [0, 1, 1, 2, 2], [0, 3, 1, 2, 2], [0, 3, 3, 2, 2], [0, 3, 4, 4, 4]],
    solution: [0, 2, 4, 1, 3].map((col, row) => ({ row, col })),
    name: `Daily Challenge: ${dateString}`, difficulty: 'medium' };
}
