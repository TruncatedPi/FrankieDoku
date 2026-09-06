import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { localDateKey, dailyStreaks, offsetDate } from './dates';
import { loadSettings, loadCampaignProgress, loadDailyProgress, loadStats, loadSavedSession, saveSession, DEFAULT_SETTINGS } from './storage';
import { newGame, gameReducer } from '../engine/game';
import { CAMPAIGN_LEVELS } from '../data/levels';

const data = new Map<string, string>();
Object.defineProperty(globalThis, 'localStorage', { configurable: true, value: {
  getItem: (key: string) => data.get(key) ?? null,
  setItem: (key: string, value: string) => data.set(key, value), removeItem: (key: string) => data.delete(key),
} });
beforeEach(() => data.clear());

test('malformed JSON and wrong-shaped settings/progress recover without crashing', () => {
  for (const value of ['{', 'null', '[]', '5', '"bad"']) {
    for (const key of ['settings', 'campaign', 'daily', 'stats']) data.set(`meowdoku_${key}_v1`, value);
    assert.deepEqual(loadSettings(), DEFAULT_SETTINGS);
    assert.deepEqual(loadCampaignProgress(), {});
    assert.deepEqual(loadDailyProgress(), {});
    assert.equal(loadStats().gamesPlayed, 0);
  }
  data.set('meowdoku_settings_v1', JSON.stringify({ soundEnabled: 'false', theme: 'bad', volume: 5, autoCross: false, catBreed: 'frankie' }));
  assert.equal(loadSettings().soundEnabled, true);
  assert.equal(loadSettings().volume, 1);
  assert.equal(loadSettings().autoCross, false);
  assert.equal(loadSettings().catBreed, 'frankie');
  data.set('meowdoku_campaign_v1', JSON.stringify({ 'level-1': null }));
  assert.deepEqual(loadCampaignProgress(), {});
});

test('session restores full puzzle, moves, marks, lives, and time; corrupt cells and histories are rejected', () => {
  let game = newGame(CAMPAIGN_LEVELS[0], 'campaign');
  game = gameReducer(game, { type: 'move', row: 0, col: 1, action: 'cat', inputMode: 'cat', settings: DEFAULT_SETTINGS });
  game = gameReducer(game, { type: 'tick' });
  saveSession(game);
  assert.deepEqual(loadSavedSession(), JSON.parse(JSON.stringify(game)));
  saveSession({ ...game, history: [null as never] });
  assert.equal(loadSavedSession(), null);
  saveSession({ ...game, cells: game.cells.slice(1) });
  assert.equal(loadSavedSession(), null);
  saveSession({ ...game, puzzle: { ...game.puzzle, solution: [] } });
  assert.equal(loadSavedSession(), null);
});

test('streaks are idempotent, reset after a missed day, and support backfilled dates across month/leap boundaries', () => {
  const entry = (date: string) => ({ date, completed: true, timeSeconds: 1, heartsRemaining: 3 });
  const progress = { '2028-02-28': entry('2028-02-28'), '2028-02-29': entry('2028-02-29'), '2028-03-01': entry('2028-03-01') };
  assert.deepEqual(dailyStreaks(progress, '2028-03-01'), { currentDailyStreak: 3, maxDailyStreak: 3 });
  assert.deepEqual(dailyStreaks(progress, '2028-03-02'), { currentDailyStreak: 3, maxDailyStreak: 3 });
  assert.deepEqual(dailyStreaks(progress, '2028-03-03'), { currentDailyStreak: 0, maxDailyStreak: 3 });
  assert.deepEqual(dailyStreaks({ ...progress, '2028-03-01': entry('2028-03-01') }, '2028-03-01'), dailyStreaks(progress, '2028-03-01'));
  assert.equal(offsetDate('2028-03-01', -1), '2028-02-29');
  const date = new Date(2026, 8, 5, 23, 59);
  assert.equal(localDateKey(date), '2026-09-05');
});
