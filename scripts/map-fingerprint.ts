import type { Puzzle } from '../src/engine/types';

/** Compare territory layouts independently of colors, rotation, and reflection. */
export function mapFingerprint(puzzle: Pick<Puzzle, 'size' | 'regions'>): string {
  const { size, regions } = puzzle;
  const variants: string[] = [];
  for (let reflect = 0; reflect < 2; reflect++) for (let turns = 0; turns < 4; turns++) {
    const ids = new Map<number, number>();
    const normalized: number[] = [];
    for (let row = 0; row < size; row++) for (let col = 0; col < size; col++) {
      let r = row, c = reflect ? size - col - 1 : col;
      for (let turn = 0; turn < turns; turn++) [r, c] = [c, size - r - 1];
      const region = regions[r][c];
      if (!ids.has(region)) ids.set(region, ids.size);
      normalized.push(ids.get(region)!);
    }
    variants.push(normalized.join(','));
  }
  return `${size}:${variants.sort()[0]}`;
}
