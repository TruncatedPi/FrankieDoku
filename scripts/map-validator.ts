import type { Coordinate, Puzzle } from '../src/engine/types';

export interface MapValidation {
  valid: boolean;
  errors: string[];
  // Capped at two: two means at least two, never an exact total.
  solutions: Coordinate[][];
  nodes: number;
  exhausted: boolean;
}

/** An independent oracle: no imports from the application's solver or validator. */
export function validateMap(input: unknown, maxNodes = 1_000_000): MapValidation {
  const result: MapValidation = { valid: false, errors: [], solutions: [], nodes: 0, exhausted: false };
  const fail = (message: string) => { result.errors.push(message); return result; };
  if (!Number.isSafeInteger(maxNodes) || maxNodes < 1) return fail('Invalid search budget');
  if (!input || typeof input !== 'object') return fail('Map must be an object');
  const { size, regions, solution } = input as Puzzle;
  if (!Number.isInteger(size) || size < 4 || size > 12) return fail('Size must be an integer from 4 to 12');
  if (!Array.isArray(regions) || regions.length !== size ||
      Array.from(regions).some(row => !Array.isArray(row) || row.length !== size)) {
    return fail('Regions must be a square grid matching size');
  }

  const territories: Coordinate[][] = Array.from({ length: size }, () => []);
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      const region = regions[row][col];
      if (!Number.isInteger(region) || region < 0 || region >= size) {
        return fail(`Invalid region at (${row},${col}): ${region}`);
      }
      territories[region].push({ row, col });
    }
  }
  for (const [region, cells] of territories.entries()) {
    if (!cells.length) return fail(`Region ${region} is empty`);
    const seen = new Set<number>();
    const pending = [cells[0]];
    while (pending.length) {
      const { row, col } = pending.pop()!;
      const key = row * size + col;
      if (seen.has(key)) continue;
      seen.add(key);
      for (const [r, c] of [[row - 1, col], [row + 1, col], [row, col - 1], [row, col + 1]]) {
        if (r >= 0 && c >= 0 && r < size && c < size && regions[r][c] === region) {
          if (!seen.has(r * size + c)) pending.push({ row: r, col: c });
        }
      }
    }
    if (seen.size !== cells.length) return fail(`Region ${region} is disconnected`);
  }

  // Check the supplied answer directly against the rules, including length and duplicates.
  if (solution !== undefined) {
    if (!Array.isArray(solution) || solution.length !== size) {
      result.errors.push(`Stored solution must contain exactly ${size} cats`);
    } else {
      for (let i = 0; i < solution.length; i++) {
        const q = solution[i];
        if (!q || !Number.isInteger(q.row) || !Number.isInteger(q.col) ||
            q.row < 0 || q.col < 0 || q.row >= size || q.col >= size) {
          result.errors.push(`Stored solution has invalid coordinate at index ${i}`);
          break;
        }
        if (solution.slice(0, i).some(p =>
          p.row === q.row || p.col === q.col || regions[p.row][p.col] === regions[q.row][q.col] ||
          (Math.abs(p.row - q.row) <= 1 && Math.abs(p.col - q.col) <= 1))) {
          result.errors.push(`Stored solution violates the rules at (${q.row},${q.col})`);
          break;
        }
      }
    }
  }

  // Search one REGION at a time, choosing the most constrained remaining region.
  // Unlike the production row solver, compare each candidate with ALL placed cats.
  const selected: Coordinate[] = [];
  function search(remaining: number[]) {
    if (result.solutions.length === 2 || result.exhausted) return;
    if (++result.nodes > maxNodes) { result.exhausted = true; return; }
    if (!remaining.length) {
      result.solutions.push([...selected].sort((a, b) => a.row - b.row));
      return;
    }
    let chosen = -1;
    let candidates: Coordinate[] | undefined;
    for (const region of remaining) {
      const available = territories[region].filter(q => selected.every(p =>
        p.row !== q.row && p.col !== q.col &&
        (Math.abs(p.row - q.row) > 1 || Math.abs(p.col - q.col) > 1)));
      if (!available.length) return;
      if (!candidates || available.length < candidates.length) {
        chosen = region;
        candidates = available;
      }
    }
    const next = remaining.filter(region => region !== chosen);
    for (const q of candidates!) {
      selected.push(q);
      search(next);
      selected.pop();
      if (result.solutions.length === 2 || result.exhausted) break;
    }
  }
  search(territories.map((_, index) => index));
  if (result.exhausted) result.errors.push('Search budget exceeded; uniqueness is UNKNOWN');
  else if (!result.solutions.length) result.errors.push('Map has no solution');
  else if (result.solutions.length === 2) result.errors.push('Map has at least two solutions');
  result.valid = result.errors.length === 0;
  return result;
}
