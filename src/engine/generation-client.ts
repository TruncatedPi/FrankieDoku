import type { Puzzle } from './types';
import { GENERATOR_VERSION } from './constants';
import { validatePuzzleIntegrity } from './solver';

// Small in-memory cache avoids unbounded growth while replaying dates.
const dailyCache = new Map<string, Puzzle>();
export function requestPuzzle(request: { size?: number; date?: string }, signal: AbortSignal): Promise<Puzzle> {
  const key = request.date ? `v${GENERATOR_VERSION}:${request.date}` : undefined;
  if (signal.aborted) return Promise.reject(new DOMException('Cancelled', 'AbortError'));
  if (key && dailyCache.has(key)) return Promise.resolve(structuredClone(dailyCache.get(key)!));
  return new Promise((resolve, reject) => {
    const worker = new Worker(new URL('./generator.worker.ts', import.meta.url), { type: 'module' });
    const finish = (error?: Error, puzzle?: Puzzle) => {
      clearTimeout(timeout);
      signal.removeEventListener('abort', abort);
      worker.terminate();
      if (error) reject(error); else resolve(puzzle!);
    };
    const abort = () => finish(new DOMException('Cancelled', 'AbortError'));
    const timeout = setTimeout(() => finish(new Error('Map generation timed out. Please try again.')), 15_000);
    signal.addEventListener('abort', abort, { once: true });
    worker.onerror = () => finish(new Error('Could not create a map. Please try again.'));
    worker.onmessage = event => {
      const puzzle = event.data.puzzle as Puzzle | undefined;
      if (!puzzle || !validatePuzzleIntegrity(puzzle).valid) return finish(new Error(event.data.error || 'Invalid generated map'));
      if (key) {
        dailyCache.set(key, structuredClone(puzzle));
        if (dailyCache.size > 14) dailyCache.delete(dailyCache.keys().next().value!);
      }
      finish(undefined, puzzle);
    };
    worker.postMessage(request);
  });
}
