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
  regions: number[][]
): Set<string> {
  const conflicts = new Set<string>();
  const catPositions: Coordinate[] = [];

  for (const cell of cells) {
    if (cell.state === 'cat') {
      catPositions.push({ row: cell.row, col: cell.col });
    }
  }

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
 * 1. Checks if any row/col/region has only 1 remaining valid spot -> MUST be a Cat!
 * 2. Checks if placing a cat at (r, c) would invalidate another unit -> MUST be an 'X'!
 * 3. Fallback: compares against unique solution and suggests next progressive step.
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

  // Check row deductions
  for (let r = 0; r < size; r++) {
    const rowCells = cells.filter((c) => c.row === r);
    const hasCat = rowCells.some((c) => c.state === 'cat');
    if (!hasCat) {
      const candidates = rowCells.filter((c) => c.state === 'empty');
      if (candidates.length === 1) {
        return {
          type: 'placement',
          row: candidates[0].row,
          col: candidates[0].col,
          explanation: `In row ${r + 1}, there is only one open spot left for a cat!`,
        };
      }
    }
  }

  // Check col deductions
  for (let c = 0; c < size; c++) {
    const colCells = cells.filter((item) => item.col === c);
    const hasCat = colCells.some((item) => item.state === 'cat');
    if (!hasCat) {
      const candidates = colCells.filter((item) => item.state === 'empty');
      if (candidates.length === 1) {
        return {
          type: 'placement',
          row: candidates[0].row,
          col: candidates[0].col,
          explanation: `In column ${c + 1}, only this square remains open!`,
        };
      }
    }
  }

  // Check region deductions
  for (let reg = 0; reg < size; reg++) {
    const regCells = cells.filter((item) => regions[item.row][item.col] === reg);
    const hasCat = regCells.some((item) => item.state === 'cat');
    if (!hasCat) {
      const candidates = regCells.filter((item) => item.state === 'empty');
      if (candidates.length === 1) {
        return {
          type: 'placement',
          row: candidates[0].row,
          col: candidates[0].col,
          explanation: `This colored territory has only one spot left where a cat can fit!`,
        };
      }
    }
  }

  // Check if an empty cell is not in the solution -> can be safely eliminated with an 'X'
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

  // Find an unplaced cat from solution
  for (const sol of solution) {
    const cell = cells.find((c) => c.row === sol.row && c.col === sol.col);
    if (cell && cell.state !== 'cat') {
      return {
        type: 'placement',
        row: sol.row,
        col: sol.col,
        explanation: `A happy cat belongs right here! 🐱`,
      };
    }
  }

  return null;
}
