import { Coordinate, Puzzle, BoardCell, HintResult } from './types';

/**
 * Checks if placing a cat at (row, col) is valid given existing placed cats.
 */
export function isValidPlacement(
  row: number,
  col: number,
  queens: Coordinate[],
  regions: number[][]
): boolean {
  const targetRegion = regions[row][col];

  for (const q of queens) {
    // Same row
    if (q.row === row) return false;
    // Same column
    if (q.col === col) return false;
    // Same region
    if (regions[q.row][q.col] === targetRegion) return false;
    // Aloof rule: touching horizontally, vertically, or diagonally
    if (Math.abs(q.row - row) <= 1 && Math.abs(q.col - col) <= 1) {
      return false;
    }
  }

  return true;
}

/**
 * Backtracking solver that counts solutions up to maxSolutions.
 * Returns array of solutions, each solution being an array of Coordinates.
 */
export function solvePuzzle(
  puzzle: Puzzle,
  maxSolutions = 2
): Coordinate[][] {
  const size = puzzle.size;
  const regions = puzzle.regions;
  const solutions: Coordinate[][] = [];

  const usedCols = new Array(size).fill(false);
  const usedRegions = new Array(size).fill(false);
  const currentQueens: Coordinate[] = [];

  function backtrack(row: number) {
    if (solutions.length >= maxSolutions) return;

    if (row === size) {
      solutions.push([...currentQueens]);
      return;
    }

    for (let col = 0; col < size; col++) {
      if (usedCols[col]) continue;

      const reg = regions[row][col];
      if (usedRegions[reg]) continue;

      // Check aloof rule with previous row (since we place row by row)
      if (row > 0) {
        const prevQueen = currentQueens[row - 1];
        if (Math.abs(prevQueen.col - col) <= 1) continue;
      }

      // Valid placement in row
      usedCols[col] = true;
      usedRegions[reg] = true;
      currentQueens.push({ row, col });

      backtrack(row + 1);

      currentQueens.pop();
      usedRegions[reg] = false;
      usedCols[col] = false;
    }
  }

  backtrack(0);
  return solutions;
}

/**
 * Validates whether a puzzle has EXACTLY ONE unique solution.
 */
export function isPuzzleUnique(puzzle: Puzzle): boolean {
  const solutions = solvePuzzle(puzzle, 2);
  return solutions.length === 1;
}

/**
 * Checks conflict status for all cells on the board currently.
 * Returns a Set of "row,col" keys that are in conflict.
 */
export function findConflicts(
  cells: BoardCell[],
  size: number,
  regions: number[][],
  solution?: Coordinate[]
): Set<string> {
  const conflicts = new Set<string>();
  const catPositions: Coordinate[] = [];

  for (const cell of cells) {
    if (cell.state === 'cat') {
      catPositions.push({ row: cell.row, col: cell.col });
    }
  }

  // Check pairwise conflicts between placed cats
  for (let i = 0; i < catPositions.length; i++) {
    for (let j = i + 1; j < catPositions.length; j++) {
      const a = catPositions[i];
      const b = catPositions[j];

      const sameRow = a.row === b.row;
      const sameCol = a.col === b.col;
      const sameRegion = regions[a.row][a.col] === regions[b.row][b.col];
      const touching = Math.abs(a.row - b.row) <= 1 && Math.abs(a.col - b.col) <= 1;

      if (sameRow || sameCol || sameRegion || touching) {
        conflicts.add(`${a.row},${a.col}`);
        conflicts.add(`${b.row},${b.col}`);
      }
    }
  }

  // If known solution is provided, flag any placed cat that is not part of the unique solution
  if (solution && solution.length > 0) {
    const solSet = new Set(solution.map((s) => `${s.row},${s.col}`));
    for (const cat of catPositions) {
      if (!solSet.has(`${cat.row},${cat.col}`)) {
        conflicts.add(`${cat.row},${cat.col}`);
      }
    }
  }

  return conflicts;
}

/**
 * Determines cells that should be automatically crossed out ('X')
 * when a cat is placed at (row, col).
 */
export function getAutoCrossCells(
  placedRow: number,
  placedCol: number,
  size: number,
  regions: number[][],
  currentCells: BoardCell[]
): Coordinate[] {
  const targetRegion = regions[placedRow][placedCol];
  const toCross: Coordinate[] = [];

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (r === placedRow && c === placedCol) continue;

      const isSameRow = r === placedRow;
      const isSameCol = c === placedCol;
      const isSameRegion = regions[r][c] === targetRegion;
      const isNeighbour = Math.abs(r - placedRow) <= 1 && Math.abs(c - placedCol) <= 1;

      if (isSameRow || isSameCol || isSameRegion || isNeighbour) {
        const cell = currentCells.find((cItem) => cItem.row === r && cItem.col === c);
        if (cell && cell.state === 'empty') {
          toCross.push({ row: r, col: c });
        }
      }
    }
  }

  return toCross;
}

/**
 * Returns which rows, cols, and regions are already satisfied (have exactly 1 cat).
 */
export function getSatisfiedUnits(
  cells: BoardCell[],
  size: number,
  regions: number[][]
): {
  rows: Set<number>;
  cols: Set<number>;
  regions: Set<number>;
} {
  const rowCount = new Array(size).fill(0);
  const colCount = new Array(size).fill(0);
  const regCount = new Array(size).fill(0);

  for (const cell of cells) {
    if (cell.state === 'cat') {
      rowCount[cell.row]++;
      colCount[cell.col]++;
      regCount[regions[cell.row][cell.col]]++;
    }
  }

  const satisfiedRows = new Set<number>();
  const satisfiedCols = new Set<number>();
  const satisfiedRegions = new Set<number>();

  for (let i = 0; i < size; i++) {
    if (rowCount[i] === 1) satisfiedRows.add(i);
    if (colCount[i] === 1) satisfiedCols.add(i);
    if (regCount[i] === 1) satisfiedRegions.add(i);
  }

  return {
    rows: satisfiedRows,
    cols: satisfiedCols,
    regions: satisfiedRegions,
  };
}

/**
 * Smart logical hint deduction engine:
 * 1. Checks if existing placed cats contradict the solution -> prompts to remove them!
 * 2. Checks if the player mistakenly marked a cat spot with 'X' -> prompts to unmark!
 * 3. Checks if any row/col/region has only 1 remaining valid spot -> MUST be a Cat!
 * 4. Checks if an empty cell cannot be a cat -> MUST be an 'X'!
 * 5. Suggests the next cat placement without contradicting placed cats.
 */
export function generateHint(
  puzzle: Puzzle,
  cells: BoardCell[]
): HintResult | null {
  const size = puzzle.size;
  const regions = puzzle.regions;
  const solutions = puzzle.solution ? [puzzle.solution] : solvePuzzle(puzzle, 1);

  if (solutions.length === 0) return null;
  const solution = solutions[0];
  const solutionSet = new Set(solution.map((s) => `${s.row},${s.col}`));

  // 1. FIRST: Check if the player has placed any INCORRECT cats!
  // If a cat is placed that is NOT in the solution, we MUST tell the player to remove it first,
  // otherwise any further hint would contradict their placed cat!
  for (const cell of cells) {
    if (cell.state === 'cat' && !solutionSet.has(`${cell.row},${cell.col}`)) {
      return {
        type: 'elimination',
        row: cell.row,
        col: cell.col,
        explanation: `The cat in Row ${cell.row + 1}, Column ${cell.col + 1} doesn't belong here! Remove it to clear the contradiction. 😿`,
      };
    }
  }

  // 2. SECOND: Check if the player accidentally marked a TRUE CAT spot with an 'X'!
  for (const sol of solution) {
    const cell = cells.find((c) => c.row === sol.row && c.col === sol.col);
    if (cell && cell.state === 'mark') {
      return {
        type: 'placement',
        row: sol.row,
        col: sol.col,
        explanation: `The ❌ in Row ${sol.row + 1}, Column ${sol.col + 1} was placed by mistake! A happy cat belongs here. 🐱`,
      };
    }
  }

  // 3. THIRD: Check for forced moves in rows (where row has no cat yet)
  for (let r = 0; r < size; r++) {
    const rowCells = cells.filter((c) => c.row === r);
    const hasCat = rowCells.some((c) => c.state === 'cat');
    if (!hasCat) {
      const candidates = rowCells.filter((c) => c.state === 'empty');
      if (candidates.length === 1 && solutionSet.has(`${candidates[0].row},${candidates[0].col}`)) {
        return {
          type: 'placement',
          row: candidates[0].row,
          col: candidates[0].col,
          explanation: `In Row ${r + 1}, only this square remains open for a cat!`,
        };
      }
    }
  }

  // 4. FOURTH: Check for forced moves in columns
  for (let c = 0; c < size; c++) {
    const colCells = cells.filter((item) => item.col === c);
    const hasCat = colCells.some((item) => item.state === 'cat');
    if (!hasCat) {
      const candidates = colCells.filter((item) => item.state === 'empty');
      if (candidates.length === 1 && solutionSet.has(`${candidates[0].row},${candidates[0].col}`)) {
        return {
          type: 'placement',
          row: candidates[0].row,
          col: candidates[0].col,
          explanation: `In Column ${c + 1}, only this square remains open for a cat!`,
        };
      }
    }
  }

  // 5. FIFTH: Check for forced moves in regions
  for (let reg = 0; reg < size; reg++) {
    const regCells = cells.filter((item) => regions[item.row][item.col] === reg);
    const hasCat = regCells.some((item) => item.state === 'cat');
    if (!hasCat) {
      const candidates = regCells.filter((item) => item.state === 'empty');
      if (candidates.length === 1 && solutionSet.has(`${candidates[0].row},${candidates[0].col}`)) {
        return {
          type: 'placement',
          row: candidates[0].row,
          col: candidates[0].col,
          explanation: `In this colored territory, only this square remains open for a cat!`,
        };
      }
    }
  }

  // 6. SIXTH: Deduce cells that cannot be cats (must be 'X')
  for (const cell of cells) {
    if (cell.state === 'empty' && !solutionSet.has(`${cell.row},${cell.col}`)) {
      return {
        type: 'elimination',
        row: cell.row,
        col: cell.col,
        explanation: `By deduction, no cat can rest here. Mark it with an ❌!`,
      };
    }
  }

  // 7. SEVENTH: Place an unplaced cat from solution (only if row/col/region doesn't already have a cat!)
  for (const sol of solution) {
    const cell = cells.find((c) => c.row === sol.row && c.col === sol.col);
    if (cell && cell.state === 'empty') {
      const rowHasCat = cells.some((c) => c.row === sol.row && c.state === 'cat');
      const colHasCat = cells.some((c) => c.col === sol.col && c.state === 'cat');
      const regHasCat = cells.some((c) => regions[c.row][c.col] === regions[sol.row][sol.col] && c.state === 'cat');
      if (!rowHasCat && !colHasCat && !regHasCat) {
        return {
          type: 'placement',
          row: sol.row,
          col: sol.col,
          explanation: `A happy cat belongs right here in Row ${sol.row + 1}, Column ${sol.col + 1}! 🐱`,
        };
      }
    }
  }

  return null;
}

/**
 * Validates the complete mathematical integrity of a puzzle:
 * 1. Has correct dimensions and region identifiers 0..(size - 1)
 * 2. Every region is orthogonally contiguous (connected)
 * 3. Exactly ONE unique solution exists (no contradictory solutions)
 * 4. Solution satisfies all row, col, region, and 8-neighbour isolation constraints
 */
export function validatePuzzleIntegrity(puzzle: Puzzle): { valid: boolean; error?: string } {
  const size = puzzle.size;
  const regions = puzzle.regions;

  if (size < 4) {
    return { valid: false, error: `Invalid board size ${size}, minimum is 4` };
  }

  if (!regions || regions.length !== size) {
    return { valid: false, error: `Region grid height (${regions?.length}) does not match size (${size})` };
  }

  for (let r = 0; r < size; r++) {
    if (!regions[r] || regions[r].length !== size) {
      return { valid: false, error: `Region row ${r} length does not match size (${size})` };
    }
  }

  // Check that all regions 0..(size - 1) exist and are connected
  const regionCells: Coordinate[][] = Array.from({ length: size }, () => []);
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      const reg = regions[r][c];
      if (reg < 0 || reg >= size) {
        return { valid: false, error: `Cell (${r}, ${c}) has invalid region index ${reg}` };
      }
      regionCells[reg].push({ row: r, col: c });
    }
  }

  for (let reg = 0; reg < size; reg++) {
    const cells = regionCells[reg];
    if (cells.length === 0) {
      return { valid: false, error: `Region ${reg} has no cells` };
    }

    // BFS connectedness check
    const visited = new Set<string>();
    const queue = [cells[0]];
    visited.add(`${cells[0].row},${cells[0].col}`);

    while (queue.length > 0) {
      const curr = queue.shift()!;
      for (const d of [{ dr: -1, dc: 0 }, { dr: 1, dc: 0 }, { dr: 0, dc: -1 }, { dr: 0, dc: 1 }]) {
        const nr = curr.row + d.dr;
        const nc = curr.col + d.dc;
        if (nr >= 0 && nr < size && nc >= 0 && nc < size && regions[nr][nc] === reg) {
          const key = `${nr},${nc}`;
          if (!visited.has(key)) {
            visited.add(key);
            queue.push({ row: nr, col: nc });
          }
        }
      }
    }

    if (visited.size !== cells.length) {
      return { valid: false, error: `Region ${reg} is disconnected` };
    }
  }

  // Solve and ensure EXACTLY 1 unique solution (no alternative or contradictory solutions)
  const solutions = solvePuzzle(puzzle, 3);
  if (solutions.length === 0) {
    return { valid: false, error: `Puzzle has 0 solutions (unsolvable)` };
  }
  if (solutions.length > 1) {
    return { valid: false, error: `Puzzle has ${solutions.length} solutions (contradictory / non-unique)` };
  }

  const sol = solutions[0];
  if (puzzle.solution) {
    const solSet = new Set(sol.map((s) => `${s.row},${s.col}`));
    for (const s of puzzle.solution) {
      if (!solSet.has(`${s.row},${s.col}`)) {
        return { valid: false, error: `Known solution does not match solver output` };
      }
    }
  }

  return { valid: true };
}

