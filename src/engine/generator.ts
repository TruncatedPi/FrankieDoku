import { Coordinate, Puzzle } from './types';
import { isPuzzleUnique, solvePuzzle, validatePuzzleIntegrity } from './solver';

/**
 * Seedable pseudo-random number generator (Mulberry32).
 */
export function createPRNG(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Creates a numeric seed from a string (e.g. '2026-09-05').
 */
export function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

/**
 * Generates a valid queen placement where no two queens share
 * a row, column, or any of the 8 neighbouring positions.
 */
export function generateValidQueens(
  size: number,
  random: () => number,
  maxTries = 500
): Coordinate[] | null {
  for (let t = 0; t < maxTries; t++) {
    const queens: Coordinate[] = [];
    const usedCols = new Array(size).fill(false);

    function placeRow(r: number): boolean {
      if (r === size) return true;

      // Shuffle column choices
      const cols = Array.from({ length: size }, (_, i) => i).sort(() => random() - 0.5);

      for (const c of cols) {
        if (usedCols[c]) continue;

        // Aloof check with previous row
        if (r > 0) {
          const prevQ = queens[r - 1];
          if (Math.abs(prevQ.col - c) <= 1) continue;
        }

        usedCols[c] = true;
        queens.push({ row: r, col: c });

        if (placeRow(r + 1)) return true;

        queens.pop();
        usedCols[c] = false;
      }
      return false;
    }

    if (placeRow(0)) {
      return queens;
    }
  }

  return null;
}

/**
 * Partitions the N x N grid into N contiguous regions,
 * each containing exactly one queen seed.
 */
export function partitionGrid(
  size: number,
  queens: Coordinate[],
  random: () => number
): number[][] {
  const grid: number[][] = Array.from({ length: size }, () =>
    new Array(size).fill(-1)
  );

  const regionSizes = new Array(size).fill(0);
  const regionCells: Coordinate[][] = Array.from({ length: size }, () => []);

  // Place seeds
  for (let reg = 0; reg < size; reg++) {
    const q = queens[reg];
    grid[q.row][q.col] = reg;
    regionSizes[reg] = 1;
    regionCells[reg].push(q);
  }

  let unassignedCount = size * size - size;
  const directions = [
    { dr: -1, dc: 0 },
    { dr: 1, dc: 0 },
    { dr: 0, dc: -1 },
    { dr: 0, dc: 1 },
  ];

  let loops = 0;
  while (unassignedCount > 0 && loops < size * size * 10) {
    loops++;
    const sortedRegions = Array.from({ length: size }, (_, i) => i).sort(
      (a, b) => regionSizes[a] - regionSizes[b]
    );

    let expanded = false;
    for (const reg of sortedRegions) {
      const candidates: Coordinate[] = [];
      for (const cell of regionCells[reg]) {
        for (const dir of directions) {
          const nr = cell.row + dir.dr;
          const nc = cell.col + dir.dc;
          if (
            nr >= 0 &&
            nr < size &&
            nc >= 0 &&
            nc < size &&
            grid[nr][nc] === -1
          ) {
            candidates.push({ row: nr, col: nc });
          }
        }
      }

      if (candidates.length > 0) {
        const chosen = candidates[Math.floor(random() * candidates.length)];
        if (grid[chosen.row][chosen.col] === -1) {
          grid[chosen.row][chosen.col] = reg;
          regionCells[reg].push(chosen);
          regionSizes[reg]++;
          unassignedCount--;
          expanded = true;
          break;
        }
      }
    }

    if (!expanded) {
      for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
          if (grid[r][c] === -1) {
            for (const dir of directions) {
              const nr = r + dir.dr;
              const nc = c + dir.dc;
              if (nr >= 0 && nr < size && nc >= 0 && nc < size && grid[nr][nc] !== -1) {
                grid[r][c] = grid[nr][nc];
                regionSizes[grid[r][c]]++;
                unassignedCount--;
                break;
              }
            }
          }
        }
      }
    }
  }

  return grid;
}

/**
 * Checks whether a region in the grid is orthogonally contiguous.
 */
function isRegionConnected(grid: number[][], size: number, reg: number): boolean {
  const cells: Coordinate[] = [];
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (grid[r][c] === reg) cells.push({ row: r, col: c });
    }
  }
  if (cells.length <= 1) return true;

  const visited = new Set<string>();
  const queue = [cells[0]];
  visited.add(`${cells[0].row},${cells[0].col}`);

  const directions = [
    { dr: -1, dc: 0 },
    { dr: 1, dc: 0 },
    { dr: 0, dc: -1 },
    { dr: 0, dc: 1 },
  ];

  while (queue.length > 0) {
    const curr = queue.shift()!;
    for (const d of directions) {
      const nr = curr.row + d.dr;
      const nc = curr.col + d.dc;
      if (nr >= 0 && nr < size && nc >= 0 && nc < size && grid[nr][nc] === reg) {
        const key = `${nr},${nc}`;
        if (!visited.has(key)) {
          visited.add(key);
          queue.push({ row: nr, col: nc });
        }
      }
    }
  }

  return visited.size === cells.length;
}

/**
 * Procedurally generates a unique, solvable Meowdoku puzzle
 * using Counterexample-Guided Constraint Refinement (CEGAR).
 */
export function generatePuzzle(
  size: number,
  seed?: number,
  maxRounds = 60
): Puzzle | null {
  for (let outer = 0; outer < 30; outer++) {
    const random = seed !== undefined ? createPRNG(seed + outer * 7919) : Math.random;
    const queens = generateValidQueens(size, random);
    if (!queens) continue;

    const targetMap = new Map<string, number>();
    queens.forEach((q, idx) => targetMap.set(`${q.row},${q.col}`, idx));

    let grid = partitionGrid(size, queens, random);

    for (let round = 0; round < maxRounds; round++) {
      const candidatePuzzle: Puzzle = {
        id: `gen-${size}x${size}-${seed ?? outer}-${round}`,
        size,
        regions: grid,
        solution: queens,
        name: `${size}x${size} Logic`,
        difficulty: size <= 5 ? 'easy' : size <= 7 ? 'medium' : size <= 9 ? 'hard' : 'expert',
      };

      const sols = solvePuzzle(candidatePuzzle, 2);
      if (sols.length === 1) {
        const integrity = validatePuzzleIntegrity(candidatePuzzle);
        if (integrity.valid) {
          return candidatePuzzle;
        }
      }

      // Find alternative solution
      const altSol = sols.find((sol) =>
        sol.some((q) => !targetMap.has(`${q.row},${q.col}`))
      );

      if (!altSol) break;

      // Find alternative queens not in target
      const altQueens = altSol.filter((q) => !targetMap.has(`${q.row},${q.col}`));
      let changed = false;

      const directions = [
        { dr: -1, dc: 0 },
        { dr: 1, dc: 0 },
        { dr: 0, dc: -1 },
        { dr: 0, dc: 1 },
      ];

      for (const aq of altQueens) {
        for (const d of directions) {
          const nr = aq.row + d.dr;
          const nc = aq.col + d.dc;
          if (nr >= 0 && nr < size && nc >= 0 && nc < size) {
            const neighborReg = grid[nr][nc];
            const currReg = grid[aq.row][aq.col];
            if (neighborReg !== currReg) {
              // Tentatively reassign (aq.row, aq.col) to neighborReg
              grid[aq.row][aq.col] = neighborReg;
              if (
                isRegionConnected(grid, size, currReg) &&
                isRegionConnected(grid, size, neighborReg)
              ) {
                changed = true;
                break;
              } else {
                grid[aq.row][aq.col] = currReg; // Revert
              }
            }
          }
        }
        if (changed) break;
      }

      if (!changed) {
        grid = partitionGrid(size, queens, random);
      }
    }
  }

  return null;
}

/**
 * Generates the daily puzzle deterministically for a specific date (YYYY-MM-DD).
 */
export function generateDailyPuzzle(dateString: string): Puzzle {
  const seed = hashString(dateString);
  const dateObj = new Date(dateString);
  const dayOfWeek = isNaN(dateObj.getDay()) ? 3 : dateObj.getDay();

  // Vary grid size across days of the week:
  // Mon: 6x6, Tue: 7x7, Wed: 7x7, Thu: 8x8, Fri: 8x8, Sat: 9x9, Sun: 9x9
  const sizeMap = [9, 6, 7, 7, 8, 8, 9];
  const size = sizeMap[dayOfWeek] || 7;

  const puzzle = generatePuzzle(size, seed, 60);
  if (puzzle) {
    puzzle.id = `daily-${dateString}`;
    puzzle.name = `Daily Challenge: ${dateString}`;
    return puzzle;
  }

  // Guaranteed fallback 5x5
  const fallbackQueens: Coordinate[] = [
    { row: 0, col: 0 },
    { row: 1, col: 2 },
    { row: 2, col: 4 },
    { row: 3, col: 1 },
    { row: 4, col: 3 },
  ];
  const fallbackRegions = [
    [0, 0, 0, 2, 2],
    [0, 1, 1, 2, 2],
    [0, 3, 1, 2, 2],
    [0, 3, 3, 2, 2],
    [0, 3, 4, 4, 4],
  ];

  return {
    id: `daily-${dateString}`,
    size: 5,
    regions: fallbackRegions,
    solution: fallbackQueens,
    name: `Daily Challenge: ${dateString}`,
    difficulty: 'medium',
  };
}
