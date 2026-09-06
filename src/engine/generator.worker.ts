/// <reference lib="webworker" />
import { generateDailyPuzzle, generatePuzzle } from './generator';

self.onmessage = (event: MessageEvent<{ size?: number; date?: string }>) => {
  try {
    const puzzle = event.data.date ? generateDailyPuzzle(event.data.date) : generatePuzzle(event.data.size!);
    self.postMessage({ puzzle });
  } catch (error) {
    self.postMessage({ error: error instanceof Error ? error.message : String(error) });
  }
};
