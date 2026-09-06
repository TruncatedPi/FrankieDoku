export const MIN_SIZE = 4;
export const MAX_SIZE = 12;
export const BOARD_SIZES = Array.from({ length: MAX_SIZE - MIN_SIZE + 1 }, (_, i) => MIN_SIZE + i);
export const GENERATOR_VERSION = 2;

export function assertBoardSize(size: number): void {
  if (!Number.isInteger(size) || size < MIN_SIZE || size > MAX_SIZE) {
    throw new RangeError(`Board size must be an integer from ${MIN_SIZE} to ${MAX_SIZE}`);
  }
}
