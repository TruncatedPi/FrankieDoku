import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { createElement } from 'react';
import { create, act, type ReactTestRenderer } from 'react-test-renderer';
import { useGameState } from './useGameState';
import { newGame } from '../engine/game';
import { generateDailyPuzzle } from '../engine/generator';
import { saveSession, DEFAULT_SETTINGS } from '../utils/storage';

const data = new Map<string, string>();
Object.defineProperty(globalThis, 'localStorage', { configurable: true, value: {
  getItem: (key: string) => data.get(key) ?? null, setItem: (key: string, value: string) => data.set(key, value), removeItem: (key: string) => data.delete(key),
} });
Object.defineProperty(globalThis, 'window', { configurable: true, value: new EventTarget() });
Object.defineProperty(globalThis, 'document', { configurable: true, value: { hidden: false, documentElement: { classList: { toggle: () => {} } } } });
beforeEach(() => {
  data.clear();
  data.set('meowdoku_settings_v1', JSON.stringify({ ...DEFAULT_SETTINGS, soundEnabled: false }));
});

test('mounted hook settles while idle and persists rapid moves without a render loop', async () => {
  let api!: ReturnType<typeof useGameState>, renderer!: ReactTestRenderer, renders = 0;
  function Harness() { api = useGameState(); assert.ok(++renders < 20, 'render loop'); return null; }
  await act(async () => { renderer = create(createElement(Harness)); });
  assert.equal(api.stats.gamesPlayed, 1);
  const first = api.currentPuzzle.solution![0];
  await act(async () => { api.handleCellAction(first.row, first.col, 'cat'); });
  assert.equal(api.cells.filter(c => c.state === 'cat').length, 1);
  await act(async () => { api.handleUndo(); api.handleRedo(); });
  assert.equal(api.cells.filter(c => c.state === 'cat').length, 1);
  await act(async () => renderer.unmount());
  assert.equal(JSON.parse(data.get('meowdoku_saved_session_v2')!).cells.filter((c: { state: string }) => c.state === 'cat').length, 1);
});

test('winning a past daily records that date once, and a restored victory is not counted again', async () => {
  const puzzle = generateDailyPuzzle('2026-09-01');
  saveSession(newGame(puzzle, 'daily'));
  let api!: ReturnType<typeof useGameState>, renderer!: ReactTestRenderer;
  function Harness() { api = useGameState(); return null; }
  await act(async () => { renderer = create(createElement(Harness)); });
  await act(async () => { for (const q of puzzle.solution!) api.handleCellAction(q.row, q.col, 'cat'); });
  assert.equal(api.isWon, true);
  assert.deepEqual(Object.keys(api.dailyProgress), ['2026-09-01']);
  assert.equal(api.stats.gamesWon, 1);
  await act(async () => renderer.unmount());
  await act(async () => { renderer = create(createElement(Harness)); });
  assert.equal(api.stats.gamesWon, 1);
  await act(async () => { api.handleReset(); });
  await act(async () => { for (const q of puzzle.solution!) api.handleCellAction(q.row, q.col, 'cat'); });
  assert.equal(api.stats.gamesWon, 2);
  assert.equal(Object.keys(api.dailyProgress).length, 1);
  assert.ok(api.stats.currentDailyStreak <= 1);
  await act(async () => renderer.unmount());
});

test('markColor toggles and persists to localStorage', async () => {
  let api!: ReturnType<typeof useGameState>, renderer!: ReactTestRenderer;
  function Harness() { api = useGameState(); return null; }
  await act(async () => { renderer = create(createElement(Harness)); });
  assert.equal(api.markColor, 'black');

  await act(async () => { api.handleToggleMarkColor(); });
  assert.equal(api.markColor, 'red');
  assert.equal(data.get('frankiedoku_mark_color'), 'red');

  await act(async () => { api.handleToggleMarkColor(); });
  assert.equal(api.markColor, 'black');
  assert.equal(data.get('frankiedoku_mark_color'), 'black');

  await act(async () => renderer.unmount());
});

