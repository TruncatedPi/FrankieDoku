import { Coordinate, Puzzle, BoardCell, HintResult, HintInvolvedCell, ThemePalette } from './types';
import { assertBoardSize, MIN_SIZE, MAX_SIZE } from './constants';
import { formatTerritoryTag } from './palettes';

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
  if (targetRegion === -1) return false;

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
  const { size, regions } = puzzle;
  assertBoardSize(size);
  if (!Number.isInteger(maxSolutions) || maxSolutions < 1) throw new RangeError('Solution limit must be a positive integer');
  const solutions: Coordinate[][] = [];
  const cols = new Array<number>(size).fill(-1);
  const all = (1 << size) - 1;
  function search(rows: number, usedCols: number, usedRegions: number) {
    if (solutions.length >= maxSolutions) return;
    if (rows === all) {
      solutions.push(cols.map((col, row) => ({ row, col })));
      return;
    }
    let choices: Coordinate[] | undefined;
    const byRegion: Coordinate[][] = Array.from({ length: size }, () => []);
    for (let row = 0; row < size; row++) {
      if (rows & (1 << row)) continue;
      const available: Coordinate[] = [];
      for (let col = 0; col < size; col++) {
        if (regions[row][col] === -1) continue;
        if ((usedCols & (1 << col)) || (usedRegions & (1 << regions[row][col]))) continue;
        if (row > 0 && cols[row - 1] >= 0 && Math.abs(cols[row - 1] - col) <= 1) continue;
        if (row + 1 < size && cols[row + 1] >= 0 && Math.abs(cols[row + 1] - col) <= 1) continue;
        const q = { row, col };
        available.push(q);
        byRegion[regions[row][col]].push(q);
      }
      if (!available.length) return;
      if (!choices || available.length < choices.length) choices = available;
    }
    for (let reg = 0; reg < size; reg++) {
      if (usedRegions & (1 << reg)) continue;
      if (!byRegion[reg].length) return;
      if (byRegion[reg].length < choices!.length) choices = byRegion[reg];
    }
    for (const { row, col } of choices!) {
      cols[row] = col;
      search(rows | (1 << row), usedCols | (1 << col), usedRegions | (1 << regions[row][col]));
      cols[row] = -1;
      if (solutions.length >= maxSolutions) break;
    }
  }
  search(0, 0, 0);
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
  return currentCells.filter(cell => cell.state === 'empty' && cell.region !== -1 &&
    !(cell.row === placedRow && cell.col === placedCol) &&
    (cell.row === placedRow || cell.col === placedCol || regions[cell.row][cell.col] === targetRegion ||
      (Math.abs(cell.row - placedRow) <= 1 && Math.abs(cell.col - placedCol) <= 1)))
    .map(({ row, col }) => ({ row, col }));
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

function describeCatConflict(
  a: Coordinate,
  b: Coordinate,
  regions: number[][],
  theme: ThemePalette = 'cozy'
): string {
  const parts: string[] = [];
  if (Math.abs(a.row - b.row) <= 1 && Math.abs(a.col - b.col) <= 1) parts.push('touching');
  else if (a.row === b.row) parts.push('same row');
  else if (a.col === b.col) parts.push('same column');
  else if (regions[a.row][a.col] === regions[b.row][b.col]) {
    parts.push(`same ${formatTerritoryTag(regions[a.row][a.col], theme)}`);
  }
  return parts.length > 0 ? parts.join(' and ') : 'rule violation';
}

/**
 * Smart logical hint deduction engine:
 * Explains HOW a cell causes a contradiction or constraint issue,
 * returns involved cells with faded state and highlighting.
 */
function cellName(row: number, col: number): string {
  return `Row ${row + 1}, Column ${col + 1}`;
}

/**
 * Searches for Pointing and Claiming reductions between Lines and Territories.
 */
function findLineRegionReduction(
  size: number,
  regions: number[][],
  cells: BoardCell[],
  placedCats: Coordinate[],
  theme: ThemePalette = 'cozy'
): HintResult | null {
  const validCells = cells.filter(
    (c) => c.state === 'empty' && isValidPlacement(c.row, c.col, placedCats, regions)
  );

  // 1. Pointing: In Territory reg, all remaining valid cells lie within a single row or column
  for (let reg = 0; reg < size; reg++) {
    if (placedCats.some((cat) => regions[cat.row][cat.col] === reg)) continue;
    const regValid = validCells.filter((c) => regions[c.row][c.col] === reg);
    if (regValid.length === 0) continue;

    const firstRow = regValid[0].row;
    if (regValid.every((c) => c.row === firstRow)) {
      const target = validCells.find((c) => c.row === firstRow && regions[c.row][c.col] !== reg);
      if (target) {
        return {
          type: 'elimination',
          row: target.row,
          col: target.col,
          explanation: `All open squares for ${formatTerritoryTag(reg, theme)} lie in Row ${firstRow + 1}. Mark ${cellName(target.row, target.col)} with an ❌.`,
          steps: [
            `In ${formatTerritoryTag(reg, theme)}, all remaining open squares lie exclusively in Row ${firstRow + 1}.`,
            `Because ${formatTerritoryTag(reg, theme)} must contain a cat, that cat must be placed in Row ${firstRow + 1}.`,
            `Therefore, no other square in Row ${firstRow + 1} outside ${formatTerritoryTag(reg, theme)} can contain a cat.`,
            `Conclusion: Mark ${cellName(target.row, target.col)} with an ❌!`,
          ],
          involvedCells: [
            { row: target.row, col: target.col, fadedState: 'mark', highlight: true, reason: 'forced_empty' },
            ...regValid.map((c) => ({ row: c.row, col: c.col, highlight: true, reason: 'caused_by' as const })),
          ],
        };
      }
    }

    const firstCol = regValid[0].col;
    if (regValid.every((c) => c.col === firstCol)) {
      const target = validCells.find((c) => c.col === firstCol && regions[c.row][c.col] !== reg);
      if (target) {
        return {
          type: 'elimination',
          row: target.row,
          col: target.col,
          explanation: `All open squares for ${formatTerritoryTag(reg, theme)} lie in Column ${firstCol + 1}. Mark ${cellName(target.row, target.col)} with an ❌.`,
          steps: [
            `In ${formatTerritoryTag(reg, theme)}, all remaining open squares lie exclusively in Column ${firstCol + 1}.`,
            `Because ${formatTerritoryTag(reg, theme)} must contain a cat, that cat must be placed in Column ${firstCol + 1}.`,
            `Therefore, no other square in Column ${firstCol + 1} outside ${formatTerritoryTag(reg, theme)} can contain a cat.`,
            `Conclusion: Mark ${cellName(target.row, target.col)} with an ❌!`,
          ],
          involvedCells: [
            { row: target.row, col: target.col, fadedState: 'mark', highlight: true, reason: 'forced_empty' },
            ...regValid.map((c) => ({ row: c.row, col: c.col, highlight: true, reason: 'caused_by' as const })),
          ],
        };
      }
    }
  }

  // 2. Claiming: In Row r or Column c, all remaining valid cells lie within a single Territory
  for (let r = 0; r < size; r++) {
    if (placedCats.some((cat) => cat.row === r)) continue;
    const rowValid = validCells.filter((c) => c.row === r);
    if (rowValid.length === 0) continue;

    const firstReg = regions[r][rowValid[0].col];
    if (rowValid.every((c) => regions[r][c.col] === firstReg)) {
      const target = validCells.find((c) => regions[c.row][c.col] === firstReg && c.row !== r);
      if (target) {
        return {
          type: 'elimination',
          row: target.row,
          col: target.col,
          explanation: `All open squares in Row ${r + 1} lie in ${formatTerritoryTag(firstReg, theme)}. Mark ${cellName(target.row, target.col)} with an ❌.`,
          steps: [
            `In Row ${r + 1}, all remaining open squares lie exclusively within ${formatTerritoryTag(firstReg, theme)}.`,
            `Because Row ${r + 1} must contain a cat, that cat will be located in ${formatTerritoryTag(firstReg, theme)}.`,
            `Therefore, no other square in ${formatTerritoryTag(firstReg, theme)} outside Row ${r + 1} can contain a cat.`,
            `Conclusion: Mark ${cellName(target.row, target.col)} with an ❌!`,
          ],
          involvedCells: [
            { row: target.row, col: target.col, fadedState: 'mark', highlight: true, reason: 'forced_empty' },
            ...rowValid.map((c) => ({ row: c.row, col: c.col, highlight: true, reason: 'caused_by' as const })),
          ],
        };
      }
    }
  }

  for (let c = 0; c < size; c++) {
    if (placedCats.some((cat) => cat.col === c)) continue;
    const colValid = validCells.filter((item) => item.col === c);
    if (colValid.length === 0) continue;

    const firstReg = regions[colValid[0].row][c];
    if (colValid.every((item) => regions[item.row][c] === firstReg)) {
      const target = validCells.find((item) => regions[item.row][item.col] === firstReg && item.col !== c);
      if (target) {
        return {
          type: 'elimination',
          row: target.row,
          col: target.col,
          explanation: `All open squares in Column ${c + 1} lie in ${formatTerritoryTag(firstReg, theme)}. Mark ${cellName(target.row, target.col)} with an ❌.`,
          steps: [
            `In Column ${c + 1}, all remaining open squares lie exclusively within ${formatTerritoryTag(firstReg, theme)}.`,
            `Because Column ${c + 1} must contain a cat, that cat will be located in ${formatTerritoryTag(firstReg, theme)}.`,
            `Therefore, no other square in ${formatTerritoryTag(firstReg, theme)} outside Column ${c + 1} can contain a cat.`,
            `Conclusion: Mark ${cellName(target.row, target.col)} with an ❌!`,
          ],
          involvedCells: [
            { row: target.row, col: target.col, fadedState: 'mark', highlight: true, reason: 'forced_empty' },
            ...colValid.map((item) => ({ row: item.row, col: item.col, highlight: true, reason: 'caused_by' as const })),
          ],
        };
      }
    }
  }

  return null;
}

/**
 * Searches for Subset Parity (Contained/Covered Territories) reductions:
 * When k rows (or k columns) fully contain k territories, those k territories
 * consume all k cats available in those lines. Therefore, any cell in those
 * lines belonging to any other territory cannot contain a cat.
 * Also checks the dual (when k lines are covered only by k territories).
 */
function findSubsetParityReduction(
  size: number,
  regions: number[][],
  cells: BoardCell[],
  placedCats: Coordinate[],
  theme: ThemePalette = 'cozy'
): HintResult | null {
  const validCells = cells.filter(
    (c) => c.state === 'empty' && isValidPlacement(c.row, c.col, placedCats, regions)
  );

  const rowHasCat = (r: number) => placedCats.some((c) => c.row === r);
  const colHasCat = (c: number) => placedCats.some((cat) => cat.col === c);
  const regHasCat = (reg: number) => placedCats.some((c) => regions[c.row][c.col] === reg);

  const regValidCells = (reg: number) => validCells.filter((c) => regions[c.row][c.col] === reg);

  // 1. Contiguous Row Bands [rStart..rEnd] containing k unplaced territories
  for (let k = 2; k < size; k++) {
    for (let rStart = 0; rStart <= size - k; rStart++) {
      const rEnd = rStart + k - 1;

      let openRows = 0;
      for (let r = rStart; r <= rEnd; r++) {
        if (!rowHasCat(r)) openRows++;
      }
      if (openRows === 0) continue;

      const containedTerritories: number[] = [];
      for (let reg = 0; reg < size; reg++) {
        if (regHasCat(reg)) continue;
        const vCells = regValidCells(reg);
        if (vCells.length > 0 && vCells.every((c) => c.row >= rStart && c.row <= rEnd)) {
          containedTerritories.push(reg);
        }
      }

      if (containedTerritories.length === openRows) {
        const elimCells = validCells.filter(
          (c) => c.row >= rStart && c.row <= rEnd && !containedTerritories.includes(regions[c.row][c.col])
        );

        if (elimCells.length > 0) {
          const counts = new Map<number, number>();
          for (const c of elimCells) {
            const reg = regions[c.row][c.col];
            counts.set(reg, (counts.get(reg) || 0) + 1);
          }
          elimCells.sort((a, b) => {
            const diff = (counts.get(regions[b.row][b.col]) || 0) - (counts.get(regions[a.row][a.col]) || 0);
            if (diff !== 0) return diff;
            return a.row === b.row ? a.col - b.col : a.row - b.row;
          });

          const target = elimCells[0];
          const targetReg = regions[target.row][target.col];
          const targetRegElim = elimCells.filter((c) => regions[c.row][c.col] === targetReg);

          const containedCells = validCells.filter(
            (c) => c.row >= rStart && c.row <= rEnd && containedTerritories.includes(regions[c.row][c.col])
          );

          const rowDesc = rStart === rEnd ? `Row ${rStart + 1}` : `Rows ${rStart + 1}–${rEnd + 1}`;
          const rowLongDesc = rStart === rEnd ? `Row ${rStart + 1}` : `Rows ${rStart + 1} to ${rEnd + 1}`;

          return {
            type: 'elimination',
            row: target.row,
            col: target.col,
            explanation: `${rowDesc} (${openRows} rows) fully contain ${openRows} territories. Squares for ${formatTerritoryTag(targetReg, theme)} in these rows cannot contain a cat! Mark ${cellName(target.row, target.col)} with an ❌.`,
            steps: [
              `${rowLongDesc} (${openRows} rows in total) can contain at most ${openRows} cats (1 cat per row).`,
              `These rows fully contain ${openRows} entire territories: ${containedTerritories.map((t) => formatTerritoryTag(t, theme)).join(', ')}.`,
              `Because each of these ${openRows} territories requires a cat, they consume all ${openRows} cats available in ${rowLongDesc}.`,
              `Therefore, no other territory (such as ${formatTerritoryTag(targetReg, theme)}) can place a cat in ${rowLongDesc}.`,
              `Conclusion: Mark ${cellName(target.row, target.col)} in ${formatTerritoryTag(targetReg, theme)} with an ❌!`,
            ],
            involvedCells: [
              ...targetRegElim.map((c) => ({
                row: c.row,
                col: c.col,
                fadedState: 'mark' as const,
                highlight: true,
                reason: 'forced_empty' as const,
              })),
              ...containedCells.map((c) => ({
                row: c.row,
                col: c.col,
                highlight: true,
                reason: 'caused_by' as const,
              })),
            ],
          };
        }
      }
    }
  }

  // 2. Contiguous Column Bands [cStart..cEnd] containing k unplaced territories
  for (let k = 2; k < size; k++) {
    for (let cStart = 0; cStart <= size - k; cStart++) {
      const cEnd = cStart + k - 1;

      let openCols = 0;
      for (let c = cStart; c <= cEnd; c++) {
        if (!colHasCat(c)) openCols++;
      }
      if (openCols === 0) continue;

      const containedTerritories: number[] = [];
      for (let reg = 0; reg < size; reg++) {
        if (regHasCat(reg)) continue;
        const vCells = regValidCells(reg);
        if (vCells.length > 0 && vCells.every((item) => item.col >= cStart && item.col <= cEnd)) {
          containedTerritories.push(reg);
        }
      }

      if (containedTerritories.length === openCols) {
        const elimCells = validCells.filter(
          (item) => item.col >= cStart && item.col <= cEnd && !containedTerritories.includes(regions[item.row][item.col])
        );

        if (elimCells.length > 0) {
          const counts = new Map<number, number>();
          for (const item of elimCells) {
            const reg = regions[item.row][item.col];
            counts.set(reg, (counts.get(reg) || 0) + 1);
          }
          elimCells.sort((a, b) => {
            const diff = (counts.get(regions[b.row][b.col]) || 0) - (counts.get(regions[a.row][a.col]) || 0);
            if (diff !== 0) return diff;
            return a.col === b.col ? a.row - b.row : a.col - b.col;
          });

          const target = elimCells[0];
          const targetReg = regions[target.row][target.col];
          const targetRegElim = elimCells.filter((item) => regions[item.row][item.col] === targetReg);

          const containedCells = validCells.filter(
            (item) => item.col >= cStart && item.col <= cEnd && containedTerritories.includes(regions[item.row][item.col])
          );

          const colDesc = cStart === cEnd ? `Column ${cStart + 1}` : `Columns ${cStart + 1}–${cEnd + 1}`;
          const colLongDesc = cStart === cEnd ? `Column ${cStart + 1}` : `Columns ${cStart + 1} to ${cEnd + 1}`;

          return {
            type: 'elimination',
            row: target.row,
            col: target.col,
            explanation: `${colDesc} (${openCols} columns) fully contain ${openCols} territories. Squares for ${formatTerritoryTag(targetReg, theme)} in these columns cannot contain a cat! Mark ${cellName(target.row, target.col)} with an ❌.`,
            steps: [
              `${colLongDesc} (${openCols} columns in total) can contain at most ${openCols} cats (1 cat per column).`,
              `These columns fully contain ${openCols} entire territories: ${containedTerritories.map((t) => formatTerritoryTag(t, theme)).join(', ')}.`,
              `Because each of these ${openCols} territories requires a cat, they consume all ${openCols} cats available in ${colLongDesc}.`,
              `Therefore, no other territory (such as ${formatTerritoryTag(targetReg, theme)}) can place a cat in ${colLongDesc}.`,
              `Conclusion: Mark ${cellName(target.row, target.col)} in ${formatTerritoryTag(targetReg, theme)} with an ❌!`,
            ],
            involvedCells: [
              ...targetRegElim.map((item) => ({
                row: item.row,
                col: item.col,
                fadedState: 'mark' as const,
                highlight: true,
                reason: 'forced_empty' as const,
              })),
              ...containedCells.map((item) => ({
                row: item.row,
                col: item.col,
                highlight: true,
                reason: 'caused_by' as const,
              })),
            ],
          };
        }
      }
    }
  }

  // 3. Covered Row Bands: when all open cells in [rStart..rEnd] belong to exactly openRows territories
  for (let k = 2; k < size; k++) {
    for (let rStart = 0; rStart <= size - k; rStart++) {
      const rEnd = rStart + k - 1;

      let openRows = 0;
      for (let r = rStart; r <= rEnd; r++) {
        if (!rowHasCat(r)) openRows++;
      }
      if (openRows === 0) continue;

      const bandCells = validCells.filter((c) => c.row >= rStart && c.row <= rEnd);
      if (bandCells.length === 0) continue;

      const coveringTerritories = Array.from(new Set(bandCells.map((c) => regions[c.row][c.col])));
      if (coveringTerritories.length === openRows && coveringTerritories.every((t) => !regHasCat(t))) {
        const elimCells = validCells.filter(
          (c) => (c.row < rStart || c.row > rEnd) && coveringTerritories.includes(regions[c.row][c.col])
        );

        if (elimCells.length > 0) {
          const target = elimCells[0];
          const targetReg = regions[target.row][target.col];
          const rowDesc = rStart === rEnd ? `Row ${rStart + 1}` : `Rows ${rStart + 1}–${rEnd + 1}`;
          const rowLongDesc = rStart === rEnd ? `Row ${rStart + 1}` : `Rows ${rStart + 1} to ${rEnd + 1}`;

          return {
            type: 'elimination',
            row: target.row,
            col: target.col,
            explanation: `${rowDesc} only contain squares from ${openRows} territories. Mark ${cellName(target.row, target.col)} in ${formatTerritoryTag(targetReg, theme)} outside these rows with an ❌.`,
            steps: [
              `${rowLongDesc} (${openRows} rows) only contain squares from ${coveringTerritories.map((t) => formatTerritoryTag(t, theme)).join(', ')}.`,
              `Because these ${openRows} rows require ${openRows} cats, each of those territories must place its cat within ${rowLongDesc}.`,
              `Therefore, squares for ${formatTerritoryTag(targetReg, theme)} outside ${rowLongDesc} cannot contain a cat.`,
              `Conclusion: Mark ${cellName(target.row, target.col)} with an ❌!`,
            ],
            involvedCells: [
              { row: target.row, col: target.col, fadedState: 'mark', highlight: true, reason: 'forced_empty' },
              ...bandCells.map((c) => ({ row: c.row, col: c.col, highlight: true, reason: 'caused_by' as const })),
            ],
          };
        }
      }
    }
  }

  // 4. Covered Column Bands: when all open cells in [cStart..cEnd] belong to exactly openCols territories
  for (let k = 2; k < size; k++) {
    for (let cStart = 0; cStart <= size - k; cStart++) {
      const cEnd = cStart + k - 1;

      let openCols = 0;
      for (let c = cStart; c <= cEnd; c++) {
        if (!colHasCat(c)) openCols++;
      }
      if (openCols === 0) continue;

      const bandCells = validCells.filter((item) => item.col >= cStart && item.col <= cEnd);
      if (bandCells.length === 0) continue;

      const coveringTerritories = Array.from(new Set(bandCells.map((item) => regions[item.row][item.col])));
      if (coveringTerritories.length === openCols && coveringTerritories.every((t) => !regHasCat(t))) {
        const elimCells = validCells.filter(
          (item) => (item.col < cStart || item.col > cEnd) && coveringTerritories.includes(regions[item.row][item.col])
        );

        if (elimCells.length > 0) {
          const target = elimCells[0];
          const targetReg = regions[target.row][target.col];
          const colDesc = cStart === cEnd ? `Column ${cStart + 1}` : `Columns ${cStart + 1}–${cEnd + 1}`;
          const colLongDesc = cStart === cEnd ? `Column ${cStart + 1}` : `Columns ${cStart + 1} to ${cEnd + 1}`;

          return {
            type: 'elimination',
            row: target.row,
            col: target.col,
            explanation: `${colDesc} only contain squares from ${openCols} territories. Mark ${cellName(target.row, target.col)} in ${formatTerritoryTag(targetReg, theme)} outside these columns with an ❌.`,
            steps: [
              `${colLongDesc} (${openCols} columns) only contain squares from ${coveringTerritories.map((t) => formatTerritoryTag(t, theme)).join(', ')}.`,
              `Because these ${openCols} columns require ${openCols} cats, each of those territories must place its cat within ${colLongDesc}.`,
              `Therefore, squares for ${formatTerritoryTag(targetReg, theme)} outside ${colLongDesc} cannot contain a cat.`,
              `Conclusion: Mark ${cellName(target.row, target.col)} with an ❌!`,
            ],
            involvedCells: [
              { row: target.row, col: target.col, fadedState: 'mark', highlight: true, reason: 'forced_empty' },
              ...bandCells.map((item) => ({ row: item.row, col: item.col, highlight: true, reason: 'caused_by' as const })),
            ],
          };
        }
      }
    }
  }

  return null;
}

/**
 * Lookahead contradiction deduction:
 * Tests placing a hypothetical cat at each non-solution empty cell.
 * Searches for 1-step unit starvation and multi-step forcing chains.
 */
function findLookaheadContradiction(
  size: number,
  regions: number[][],
  cells: BoardCell[],
  placedCats: Coordinate[],
  solutionSet: Set<string>,
  theme: ThemePalette = 'cozy'
): HintResult | null {
  const emptyNonSol = cells.filter((c) => c.state === 'empty' && !solutionSet.has(`${c.row},${c.col}`));

  // 1. 1-Step Lookahead Contradiction: Check if placing a cat at (cell.row, cell.col) directly starves any unit
  for (const cell of emptyNonSol) {
    const hypotheticalCats = [...placedCats, { row: cell.row, col: cell.col }];

    // Check Row starvation
    for (let r = 0; r < size; r++) {
      if (hypotheticalCats.some((cat) => cat.row === r)) continue;
      const remaining = cells.filter(
        (c) => c.row === r && c.state !== 'mark' && isValidPlacement(c.row, c.col, hypotheticalCats, regions)
      );
      if (remaining.length === 0) {
        const wiped = cells.filter(
          (c) => c.row === r && c.state === 'empty' && !isValidPlacement(c.row, c.col, [{ row: cell.row, col: cell.col }], regions)
        );
        return {
          type: 'elimination',
          row: cell.row,
          col: cell.col,
          explanation: `Placing a cat at ${cellName(cell.row, cell.col)} eliminates all valid spots in Row ${r + 1}! Mark this square with an ❌.`,
          steps: [
            `Suppose a cat is placed at ${cellName(cell.row, cell.col)}.`,
            `That cat eliminates all remaining open spots in Row ${r + 1} (${wiped.map((w) => `Column ${w.col + 1}`).join(', ')}).`,
            `Every row must contain exactly one cat, so leaving Row ${r + 1} with 0 valid squares is impossible.`,
            `Conclusion: ${cellName(cell.row, cell.col)} cannot contain a cat. Mark it with an ❌!`,
          ],
          involvedCells: [
            { row: cell.row, col: cell.col, fadedState: 'cat', highlight: true, reason: 'conflict' },
            ...wiped.map((w) => ({ row: w.row, col: w.col, fadedState: 'mark' as const, highlight: true, reason: 'starved_unit' as const })),
          ],
        };
      }
    }

    // Check Column starvation
    for (let c = 0; c < size; c++) {
      if (hypotheticalCats.some((cat) => cat.col === c)) continue;
      const remaining = cells.filter(
        (item) => item.col === c && item.state !== 'mark' && isValidPlacement(item.row, item.col, hypotheticalCats, regions)
      );
      if (remaining.length === 0) {
        const wiped = cells.filter(
          (item) => item.col === c && item.state === 'empty' && !isValidPlacement(item.row, item.col, [{ row: cell.row, col: cell.col }], regions)
        );
        return {
          type: 'elimination',
          row: cell.row,
          col: cell.col,
          explanation: `Placing a cat at ${cellName(cell.row, cell.col)} eliminates all valid spots in Column ${c + 1}! Mark this square with an ❌.`,
          steps: [
            `Suppose a cat is placed at ${cellName(cell.row, cell.col)}.`,
            `That cat eliminates all remaining open spots in Column ${c + 1} (${wiped.map((w) => `Row ${w.row + 1}`).join(', ')}).`,
            `Every column must contain exactly one cat, so leaving Column ${c + 1} with 0 valid squares is impossible.`,
            `Conclusion: ${cellName(cell.row, cell.col)} cannot contain a cat. Mark it with an ❌!`,
          ],
          involvedCells: [
            { row: cell.row, col: cell.col, fadedState: 'cat', highlight: true, reason: 'conflict' },
            ...wiped.map((w) => ({ row: w.row, col: w.col, fadedState: 'mark' as const, highlight: true, reason: 'starved_unit' as const })),
          ],
        };
      }
    }

    // Check Territory starvation
    for (let reg = 0; reg < size; reg++) {
      if (hypotheticalCats.some((cat) => regions[cat.row][cat.col] === reg)) continue;
      const remaining = cells.filter(
        (item) => regions[item.row][item.col] === reg && item.state !== 'mark' && isValidPlacement(item.row, item.col, hypotheticalCats, regions)
      );
      if (remaining.length === 0) {
        const wiped = cells.filter(
          (item) => regions[item.row][item.col] === reg && item.state === 'empty' && !isValidPlacement(item.row, item.col, [{ row: cell.row, col: cell.col }], regions)
        );
        return {
          type: 'elimination',
          row: cell.row,
          col: cell.col,
          explanation: `Placing a cat at ${cellName(cell.row, cell.col)} eliminates all valid spots in ${formatTerritoryTag(reg, theme)}! Mark this square with an ❌.`,
          steps: [
            `Suppose a cat is placed at ${cellName(cell.row, cell.col)}.`,
            `That cat eliminates all remaining open spots in ${formatTerritoryTag(reg, theme)}.`,
            `Every territory must contain exactly one cat, so leaving ${formatTerritoryTag(reg, theme)} with 0 valid squares is impossible.`,
            `Conclusion: ${cellName(cell.row, cell.col)} cannot contain a cat. Mark it with an ❌!`,
          ],
          involvedCells: [
            { row: cell.row, col: cell.col, fadedState: 'cat', highlight: true, reason: 'conflict' },
            ...wiped.map((w) => ({ row: w.row, col: w.col, fadedState: 'mark' as const, highlight: true, reason: 'starved_unit' as const })),
          ],
        };
      }
    }
  }

  // 2. Multi-Step Forcing Chains (Propagation):
  // Check if placing a cat at (cell.row, cell.col) forces a single square in another unit, leading to contradiction
  for (const cell of emptyNonSol) {
    const hypotheticalCats = [...placedCats, { row: cell.row, col: cell.col }];

    for (let reg = 0; reg < size; reg++) {
      if (hypotheticalCats.some((cat) => regions[cat.row][cat.col] === reg)) continue;
      const cand = cells.filter(
        (item) => regions[item.row][item.col] === reg && item.state !== 'mark' && isValidPlacement(item.row, item.col, hypotheticalCats, regions)
      );
      if (cand.length === 1) {
        const forced = cand[0];
        const nextCats = [...hypotheticalCats, { row: forced.row, col: forced.col }];

        // Check if nextCats starves any territory
        for (let targetReg = 0; targetReg < size; targetReg++) {
          if (nextCats.some((cat) => regions[cat.row][cat.col] === targetReg)) continue;
          const rem = cells.filter(
            (item) => regions[item.row][item.col] === targetReg && item.state !== 'mark' && isValidPlacement(item.row, item.col, nextCats, regions)
          );
          if (rem.length === 0) {
            return {
              type: 'elimination',
              row: cell.row,
              col: cell.col,
              explanation: `Placing a cat at ${cellName(cell.row, cell.col)} forces a cat at ${cellName(forced.row, forced.col)}, which starves ${formatTerritoryTag(targetReg, theme)}! Mark this square with an ❌.`,
              steps: [
                `Suppose a cat is placed at ${cellName(cell.row, cell.col)}.`,
                `In ${formatTerritoryTag(reg, theme)}, this leaves only ${cellName(forced.row, forced.col)} open, forcing a cat there.`,
                `Placing that forced cat eliminates all remaining open spots in ${formatTerritoryTag(targetReg, theme)}!`,
                `Conclusion: Placing a cat at ${cellName(cell.row, cell.col)} causes an impossible contradiction. Mark it with an ❌!`,
              ],
              involvedCells: [
                { row: cell.row, col: cell.col, fadedState: 'cat', highlight: true, reason: 'conflict' },
                { row: forced.row, col: forced.col, fadedState: 'cat', highlight: true, reason: 'caused_by' },
              ],
            };
          }
        }

        // Check if nextCats starves any row
        for (let r = 0; r < size; r++) {
          if (nextCats.some((cat) => cat.row === r)) continue;
          const rem = cells.filter(
            (item) => item.row === r && item.state !== 'mark' && isValidPlacement(item.row, item.col, nextCats, regions)
          );
          if (rem.length === 0) {
            return {
              type: 'elimination',
              row: cell.row,
              col: cell.col,
              explanation: `Placing a cat at ${cellName(cell.row, cell.col)} forces a cat at ${cellName(forced.row, forced.col)}, which starves Row ${r + 1}! Mark this square with an ❌.`,
              steps: [
                `Suppose a cat is placed at ${cellName(cell.row, cell.col)}.`,
                `In ${formatTerritoryTag(reg, theme)}, this leaves only ${cellName(forced.row, forced.col)} open, forcing a cat there.`,
                `Placing that forced cat eliminates all remaining open spots in Row ${r + 1}!`,
                `Conclusion: Placing a cat at ${cellName(cell.row, cell.col)} causes an impossible contradiction. Mark it with an ❌!`,
              ],
              involvedCells: [
                { row: cell.row, col: cell.col, fadedState: 'cat', highlight: true, reason: 'conflict' },
                { row: forced.row, col: forced.col, fadedState: 'cat', highlight: true, reason: 'caused_by' },
              ],
            };
          }
        }

        // Check if nextCats starves any column
        for (let c = 0; c < size; c++) {
          if (nextCats.some((cat) => cat.col === c)) continue;
          const rem = cells.filter(
            (item) => item.col === c && item.state !== 'mark' && isValidPlacement(item.row, item.col, nextCats, regions)
          );
          if (rem.length === 0) {
            return {
              type: 'elimination',
              row: cell.row,
              col: cell.col,
              explanation: `Placing a cat at ${cellName(cell.row, cell.col)} forces a cat at ${cellName(forced.row, forced.col)}, which starves Column ${c + 1}! Mark this square with an ❌.`,
              steps: [
                `Suppose a cat is placed at ${cellName(cell.row, cell.col)}.`,
                `In ${formatTerritoryTag(reg, theme)}, this leaves only ${cellName(forced.row, forced.col)} open, forcing a cat there.`,
                `Placing that forced cat eliminates all remaining open spots in Column ${c + 1}!`,
                `Conclusion: Placing a cat at ${cellName(cell.row, cell.col)} causes an impossible contradiction. Mark it with an ❌!`,
              ],
              involvedCells: [
                { row: cell.row, col: cell.col, fadedState: 'cat', highlight: true, reason: 'conflict' },
                { row: forced.row, col: forced.col, fadedState: 'cat', highlight: true, reason: 'caused_by' },
              ],
            };
          }
        }
      }
    }
  }

  return null;
}

/**
 * Smart logical hint deduction engine:
 * Explains HOW a cell causes a contradiction or constraint issue,
 * provides explicit numbered deduction steps, and returns involved
 * cells with faded states and highlights.
 */
export function generateHint(
  puzzle: Puzzle,
  cells: BoardCell[],
  theme: ThemePalette = 'cozy'
): HintResult | null {
  const size = puzzle.size;
  const regions = puzzle.regions;
  const solutions = puzzle.solution ? [puzzle.solution] : solvePuzzle(puzzle, 1);

  if (solutions.length === 0) return null;
  const solution = solutions[0];
  const solutionSet = new Set(solution.map((s) => `${s.row},${s.col}`));
  const placedCats = cells.filter((c) => c.state === 'cat');

  // 1. FIRST: Check if the player has placed any INCORRECT cats!
  for (const cell of cells) {
    if (cell.state === 'cat' && !solutionSet.has(`${cell.row},${cell.col}`)) {
      // 1A. Check for direct conflict with another placed cat
      const conflictingCat = placedCats.find(
        (c) => !(c.row === cell.row && c.col === cell.col) && !isValidPlacement(cell.row, cell.col, [c], regions)
      );
      if (conflictingCat) {
        const relation = describeCatConflict(cell, conflictingCat, regions, theme);
        return {
          type: 'elimination',
          row: cell.row,
          col: cell.col,
          explanation: `The cat in ${cellName(cell.row, cell.col)} doesn't belong here! It conflicts with the cat in ${cellName(conflictingCat.row, conflictingCat.col)} (${relation}). Remove it to clear the contradiction. 😿`,
          steps: [
            `The cat at ${cellName(cell.row, cell.col)} conflicts with the cat at ${cellName(conflictingCat.row, conflictingCat.col)} (${relation}).`,
            `Cats cannot share the same row, column, or territory, nor touch even diagonally.`,
            `Conclusion: Remove the cat at ${cellName(cell.row, cell.col)} to clear the contradiction.`,
          ],
          involvedCells: [
            { row: cell.row, col: cell.col, highlight: true, reason: 'conflict' },
            { row: conflictingCat.row, col: conflictingCat.col, highlight: true, reason: 'conflict' },
          ],
        };
      }

      // 1B. Check if this cat starves another row, column, or region
      for (let r = 0; r < size; r++) {
        if (placedCats.some((c) => c.row === r)) continue;
        const remaining = cells.filter(
          (c) => c.row === r && c.state !== 'mark' && isValidPlacement(c.row, c.col, placedCats, regions)
        );
        if (remaining.length === 0) {
          const wiped = cells.filter(
            (c) => c.row === r && c.state === 'empty' && !isValidPlacement(c.row, c.col, [cell], regions)
          );
          return {
            type: 'elimination',
            row: cell.row,
            col: cell.col,
            explanation: `The cat in ${cellName(cell.row, cell.col)} doesn't belong here! It eliminates all open squares in Row ${r + 1}. Remove it to clear the contradiction. 😿`,
            steps: [
              `The cat placed at ${cellName(cell.row, cell.col)} eliminates all open squares in Row ${r + 1}.`,
              `Row ${r + 1} must contain exactly one cat, but now has 0 valid squares available.`,
              `Conclusion: Remove the cat at ${cellName(cell.row, cell.col)} to clear the contradiction.`,
            ],
            involvedCells: [
              { row: cell.row, col: cell.col, highlight: true, reason: 'conflict' },
              ...wiped.map((w) => ({ row: w.row, col: w.col, fadedState: 'mark' as const, highlight: true, reason: 'starved_unit' as const })),
            ],
          };
        }
      }

      for (let c = 0; c < size; c++) {
        if (placedCats.some((cat) => cat.col === c)) continue;
        const remaining = cells.filter(
          (item) => item.col === c && item.state !== 'mark' && isValidPlacement(item.row, item.col, placedCats, regions)
        );
        if (remaining.length === 0) {
          const wiped = cells.filter(
            (item) => item.col === c && item.state === 'empty' && !isValidPlacement(item.row, item.col, [cell], regions)
          );
          return {
            type: 'elimination',
            row: cell.row,
            col: cell.col,
            explanation: `The cat in ${cellName(cell.row, cell.col)} doesn't belong here! It eliminates all open squares in Column ${c + 1}. Remove it to clear the contradiction. 😿`,
            steps: [
              `The cat placed at ${cellName(cell.row, cell.col)} eliminates all open squares in Column ${c + 1}.`,
              `Column ${c + 1} must contain exactly one cat, but now has 0 valid squares available.`,
              `Conclusion: Remove the cat at ${cellName(cell.row, cell.col)} to clear the contradiction.`,
            ],
            involvedCells: [
              { row: cell.row, col: cell.col, highlight: true, reason: 'conflict' },
              ...wiped.map((w) => ({ row: w.row, col: w.col, fadedState: 'mark' as const, highlight: true, reason: 'starved_unit' as const })),
            ],
          };
        }
      }

      for (let reg = 0; reg < size; reg++) {
        if (placedCats.some((cat) => regions[cat.row][cat.col] === reg)) continue;
        const remaining = cells.filter(
          (item) => regions[item.row][item.col] === reg && item.state !== 'mark' && isValidPlacement(item.row, item.col, placedCats, regions)
        );
        if (remaining.length === 0) {
          const wiped = cells.filter(
            (item) => regions[item.row][item.col] === reg && item.state === 'empty' && !isValidPlacement(item.row, item.col, [cell], regions)
          );
          return {
            type: 'elimination',
            row: cell.row,
            col: cell.col,
            explanation: `The cat in ${cellName(cell.row, cell.col)} doesn't belong here! It eliminates all open squares in ${formatTerritoryTag(reg, theme)}. Remove it to clear the contradiction. 😿`,
            steps: [
              `The cat placed at ${cellName(cell.row, cell.col)} eliminates all open squares in ${formatTerritoryTag(reg, theme)}.`,
              `${formatTerritoryTag(reg, theme)} must contain exactly one cat, but now has 0 valid squares available.`,
              `Conclusion: Remove the cat at ${cellName(cell.row, cell.col)} to clear the contradiction.`,
            ],
            involvedCells: [
              { row: cell.row, col: cell.col, highlight: true, reason: 'conflict' },
              ...wiped.map((w) => ({ row: w.row, col: w.col, fadedState: 'mark' as const, highlight: true, reason: 'starved_unit' as const })),
            ],
          };
        }
      }

      // 1C. Fallback off-solution placed cat
      const solCat = solution.find((s) => s.row === cell.row);
      return {
        type: 'elimination',
        row: cell.row,
        col: cell.col,
        explanation: `The cat in ${cellName(cell.row, cell.col)} doesn't belong here! Remove it to clear the contradiction. 😿`,
        steps: [
          `The cat at ${cellName(cell.row, cell.col)} prevents the rest of the board from completing cleanly.`,
          `Every row, column, and territory requires a unique solution.`,
          `Conclusion: Remove the cat at ${cellName(cell.row, cell.col)} to clear the contradiction.`,
        ],
        involvedCells: [
          { row: cell.row, col: cell.col, highlight: true, reason: 'conflict' },
          ...(solCat ? [{ row: solCat.row, col: solCat.col, fadedState: 'cat' as const, highlight: true, reason: 'caused_by' as const }] : []),
        ],
      };
    }
  }

  // 2. SECOND: Check if the player accidentally marked a TRUE CAT spot with an 'X'!
  for (const sol of solution) {
    const cell = cells.find((c) => c.row === sol.row && c.col === sol.col);
    if (cell && cell.state === 'mark') {
      const reg = regions[sol.row][sol.col];
      const otherRegCells = cells.filter(
        (c) => regions[c.row][c.col] === reg && !(c.row === sol.row && c.col === sol.col)
      );
      return {
        type: 'placement',
        row: sol.row,
        col: sol.col,
        explanation: `The ❌ in ${cellName(sol.row, sol.col)} was placed by mistake! A happy cat belongs here. 🐱`,
        steps: [
          `The square at ${cellName(sol.row, sol.col)} was marked with an ❌ by mistake.`,
          `Without this square, ${formatTerritoryTag(reg, theme)} has no remaining valid squares that complete the puzzle.`,
          `Conclusion: Clear the ❌ at ${cellName(sol.row, sol.col)} — a cat belongs right here!`,
        ],
        involvedCells: [
          { row: sol.row, col: sol.col, fadedState: 'cat', highlight: true, reason: 'caused_by' },
          ...otherRegCells.slice(0, 4).map((c) => ({
            row: c.row,
            col: c.col,
            fadedState: c.state === 'empty' ? ('mark' as const) : undefined,
            highlight: true,
            reason: 'forced_empty' as const,
          })),
        ],
      };
    }
  }

  // 3. Direct rule eliminations on empty cells before consulting answer
  for (const cell of cells) {
    if (cell.state !== 'empty') continue;
    const blocker = placedCats.find((cat) => !isValidPlacement(cell.row, cell.col, [cat], regions));
    if (blocker) {
      const relation = describeCatConflict(cell, blocker, regions, theme);
      return {
        type: 'elimination',
        row: cell.row,
        col: cell.col,
        explanation: `A cat here would conflict (${relation}) with the cat at ${cellName(blocker.row, blocker.col)}. Mark this square with an ❌.`,
        steps: [
          `A cat is already placed at ${cellName(blocker.row, blocker.col)}.`,
          `Rules state cats cannot share the same row, column, territory, or touch (${relation}).`,
          `Conclusion: Mark ${cellName(cell.row, cell.col)} with an ❌.`,
        ],
        involvedCells: [
          { row: cell.row, col: cell.col, fadedState: 'mark', highlight: true, reason: 'forced_empty' },
          { row: blocker.row, col: blocker.col, highlight: true, reason: 'conflict' },
        ],
      };
    }
  }

  // 4. Forced moves in rows (Naked Single)
  for (let r = 0; r < size; r++) {
    const rowCells = cells.filter((c) => c.row === r);
    const hasCat = rowCells.some((c) => c.state === 'cat');
    if (!hasCat) {
      const candidates = rowCells.filter((c) => c.state === 'empty' && isValidPlacement(c.row, c.col, placedCats, regions));
      if (candidates.length === 1 && solutionSet.has(`${candidates[0].row},${candidates[0].col}`)) {
        const target = candidates[0];
        const others = rowCells.filter((c) => !(c.row === target.row && c.col === target.col));
        return {
          type: 'placement',
          row: target.row,
          col: target.col,
          explanation: `In Row ${r + 1}, all other squares are blocked or eliminated. Only this square remains open for a cat!`,
          steps: [
            `Inspect Row ${r + 1}: all other squares are marked with ❌ or blocked by existing rules.`,
            `Every row must contain exactly one cat.`,
            `Conclusion: Place a cat at ${cellName(target.row, target.col)}!`,
          ],
          involvedCells: [
            { row: target.row, col: target.col, fadedState: 'cat', highlight: true, reason: 'caused_by' },
            ...others.map((o) => ({
              row: o.row,
              col: o.col,
              fadedState: o.state === 'empty' ? ('mark' as const) : undefined,
              highlight: true,
              reason: 'forced_empty' as const,
            })),
          ],
        };
      }
    }
  }

  // 5. Forced moves in columns (Naked Single)
  for (let c = 0; c < size; c++) {
    const colCells = cells.filter((item) => item.col === c);
    const hasCat = colCells.some((item) => item.state === 'cat');
    if (!hasCat) {
      const candidates = colCells.filter((item) => item.state === 'empty' && isValidPlacement(item.row, item.col, placedCats, regions));
      if (candidates.length === 1 && solutionSet.has(`${candidates[0].row},${candidates[0].col}`)) {
        const target = candidates[0];
        const others = colCells.filter((item) => !(item.row === target.row && item.col === target.col));
        return {
          type: 'placement',
          row: target.row,
          col: target.col,
          explanation: `In Column ${c + 1}, all other squares are blocked or eliminated. Only this square remains open for a cat!`,
          steps: [
            `Inspect Column ${c + 1}: all other squares are marked with ❌ or blocked by existing rules.`,
            `Every column must contain exactly one cat.`,
            `Conclusion: Place a cat at ${cellName(target.row, target.col)}!`,
          ],
          involvedCells: [
            { row: target.row, col: target.col, fadedState: 'cat', highlight: true, reason: 'caused_by' },
            ...others.map((o) => ({
              row: o.row,
              col: o.col,
              fadedState: o.state === 'empty' ? ('mark' as const) : undefined,
              highlight: true,
              reason: 'forced_empty' as const,
            })),
          ],
        };
      }
    }
  }

  // 6. Forced moves in regions (Naked Single)
  for (let reg = 0; reg < size; reg++) {
    const regCells = cells.filter((item) => regions[item.row][item.col] === reg);
    const hasCat = regCells.some((item) => item.state === 'cat');
    if (!hasCat) {
      const candidates = regCells.filter((item) => item.state === 'empty' && isValidPlacement(item.row, item.col, placedCats, regions));
      if (candidates.length === 1 && solutionSet.has(`${candidates[0].row},${candidates[0].col}`)) {
        const target = candidates[0];
        const others = regCells.filter((item) => !(item.row === target.row && item.col === target.col));
        return {
          type: 'placement',
          row: target.row,
          col: target.col,
          explanation: `In ${formatTerritoryTag(reg, theme)}, all other squares are blocked or eliminated. Only this square remains open for a cat!`,
          steps: [
            `Inspect ${formatTerritoryTag(reg, theme)}: all other squares are marked with ❌ or blocked by existing rules.`,
            `Every colored territory must contain exactly one cat.`,
            `Conclusion: Place a cat at ${cellName(target.row, target.col)}!`,
          ],
          involvedCells: [
            { row: target.row, col: target.col, fadedState: 'cat', highlight: true, reason: 'caused_by' },
            ...others.map((o) => ({
              row: o.row,
              col: o.col,
              fadedState: o.state === 'empty' ? ('mark' as const) : undefined,
              highlight: true,
              reason: 'forced_empty' as const,
            })),
          ],
        };
      }
    }
  }

  // 7. Line-Region Interaction (Pointing & Claiming reductions)
  const lineReduction = findLineRegionReduction(size, regions, cells, placedCats, theme);
  if (lineReduction) {
    return lineReduction;
  }

  // 8. Subset Parity (Contained & Covered Territories)
  const subsetHint = findSubsetParityReduction(size, regions, cells, placedCats, theme);
  if (subsetHint) {
    return subsetHint;
  }

  // 9. Lookahead Contradiction & Multi-Step Forcing Chains
  const lookaheadHint = findLookaheadContradiction(size, regions, cells, placedCats, solutionSet, theme);
  if (lookaheadHint) {
    return lookaheadHint;
  }

  // 10. Place an unplaced cat from solution with clear deduction explanation
  for (const sol of solution) {
    const cell = cells.find((c) => c.row === sol.row && c.col === sol.col);
    if (cell && cell.state === 'empty') {
      const rowHasCat = cells.some((c) => c.row === sol.row && c.state === 'cat');
      const colHasCat = cells.some((c) => c.col === sol.col && c.state === 'cat');
      const regHasCat = cells.some((c) => regions[c.row][c.col] === regions[sol.row][sol.col] && c.state === 'cat');
      if (!rowHasCat && !colHasCat && !regHasCat) {
        const reg = regions[sol.row][sol.col];
        return {
          type: 'placement',
          row: sol.row,
          col: sol.col,
          explanation: `A happy cat belongs right here in ${cellName(sol.row, sol.col)}! 🐱`,
          steps: [
            `Examine ${cellName(sol.row, sol.col)} inside ${formatTerritoryTag(reg, theme)}.`,
            `Placing a cat here maintains the unique, valid solution across all rows, columns, and territories.`,
            `Conclusion: Place a cat at ${cellName(sol.row, sol.col)}!`,
          ],
          involvedCells: [
            { row: sol.row, col: sol.col, fadedState: 'cat', highlight: true, reason: 'caused_by' },
          ],
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
  if (!puzzle || typeof puzzle !== 'object') {
    return { valid: false, error: 'Puzzle must be an object' };
  }
  const size = puzzle.size;
  const regions = puzzle.regions;

  if (!Number.isInteger(size) || size < MIN_SIZE || size > MAX_SIZE) {
    return { valid: false, error: `Invalid board size ${size}, expected an integer from ${MIN_SIZE} to ${MAX_SIZE}` };
  }

  if (!Array.isArray(regions) || regions.length !== size) {
    return { valid: false, error: `Region grid height (${regions?.length}) does not match size (${size})` };
  }

  for (let r = 0; r < size; r++) {
    if (!Array.isArray(regions[r]) || regions[r].length !== size) {
      return { valid: false, error: `Region row ${r} length does not match size (${size})` };
    }
  }

  // Check that all regions 0..(size - 1) exist and are connected
  const regionCells: Coordinate[][] = Array.from({ length: size }, () => []);
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      const reg = regions[r][c];
      if (reg === -1) continue; // void/missing cell
      if (!Number.isInteger(reg) || reg < 0 || reg >= size) {
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

    for (let head = 0; head < queue.length; head++) {
      const curr = queue[head];
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
  const solutions = solvePuzzle(puzzle, 2);
  if (solutions.length === 0) {
    return { valid: false, error: `Puzzle has 0 solutions (unsolvable)` };
  }
  if (solutions.length > 1) {
    return { valid: false, error: 'Puzzle has at least 2 solutions (contradictory / non-unique)' };
  }

  const sol = solutions[0];
  if (puzzle.solution !== undefined) {
    if (!Array.isArray(puzzle.solution) || puzzle.solution.length !== size) {
      return { valid: false, error: `Known solution must contain exactly ${size} cats` };
    }
    const solSet = new Set(sol.map((s) => `${s.row},${s.col}`));
    for (const s of puzzle.solution) {
      if (!s || !Number.isInteger(s.row) || !Number.isInteger(s.col) || !solSet.delete(`${s.row},${s.col}`)) {
        return { valid: false, error: `Known solution does not match solver output` };
      }
    }
  }

  return { valid: true };
}

