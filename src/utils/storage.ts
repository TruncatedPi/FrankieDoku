import type { UserSettings, LevelProgress, DailyProgress, GameStats, Move, TwoPlayerConfig } from '../engine/types';
import type { GameSession } from '../engine/game';
import { evaluateGame } from '../engine/game';
import { validatePuzzleIntegrity } from '../engine/solver';
import { validDateKey } from './dates';

const SETTINGS_KEY = 'meowdoku_settings_v1';
const CAMPAIGN_KEY = 'meowdoku_campaign_v1';
const DAILY_KEY = 'meowdoku_daily_v1';
const STATS_KEY = 'meowdoku_stats_v1';
const SAVED_GAME_KEY = 'meowdoku_saved_session_v2';
export const DEFAULT_SETTINGS: UserSettings = {
  soundEnabled: true, hapticsEnabled: true, volume: 0.6, playStyle: 'classic',
  autoCross: true, highlightConflicts: true, dimCompleted: true, catBreed: 'frankie', theme: 'cozy',
};
export const DEFAULT_STATS: GameStats = { gamesPlayed: 0, gamesWon: 0, currentDailyStreak: 0, maxDailyStreak: 0, bestTimesBySize: {} };
const breeds = ['frankie', 'orange_tabby', 'calico', 'tuxedo', 'siamese', 'black_cat', 'gray_fluff'];
const themes = ['cozy', 'pastel', 'matcha', 'lavender', 'midnight'];
const record = (value: unknown): value is Record<string, unknown> => !!value && typeof value === 'object' && !Array.isArray(value);
const count = (value: unknown): value is number => Number.isSafeInteger(value) && (value as number) >= 0;
function read(key: string): unknown {
  try { return JSON.parse(localStorage.getItem(key) || 'null'); } catch { return null; }
}
function write(key: string, value: unknown) {
  try { if (value === null) localStorage.removeItem(key); else localStorage.setItem(key, JSON.stringify(value)); }
  catch { /* Storage may be unavailable or full; keep the active game playable. */ }
}
export function sanitizeSettings(value: unknown): UserSettings {
  const result = { ...DEFAULT_SETTINGS };
  if (!record(value)) return result;
  for (const key of ['soundEnabled', 'hapticsEnabled', 'autoCross', 'highlightConflicts', 'dimCompleted'] as const) {
    if (typeof value[key] === 'boolean') result[key] = value[key];
  }
  if (typeof value.volume === 'number' && Number.isFinite(value.volume)) result.volume = Math.max(0, Math.min(1, value.volume));
  if (value.playStyle === 'classic' || value.playStyle === 'zen') result.playStyle = value.playStyle;
  if (breeds.includes(value.catBreed as string)) result.catBreed = value.catBreed as UserSettings['catBreed'];
  if (themes.includes(value.theme as string)) result.theme = value.theme as UserSettings['theme'];
  return result;
}
export const loadSettings = () => sanitizeSettings(read(SETTINGS_KEY));
export const saveSettings = (settings: UserSettings) => write(SETTINGS_KEY, settings);
export function loadCampaignProgress(): Record<string, LevelProgress> {
  const saved = read(CAMPAIGN_KEY), result: Record<string, LevelProgress> = {};
  if (record(saved)) for (const [key, value] of Object.entries(saved)) {
    if (/^level-\d+$/.test(key) && record(value) && value.levelId === key && typeof value.completed === 'boolean' &&
        count(value.stars) && value.stars <= 3 && (value.bestTimeSeconds === undefined || count(value.bestTimeSeconds))) {
      result[key] = value as unknown as LevelProgress;
    }
  }
  return result;
}
export const saveCampaignProgress = (progress: Record<string, LevelProgress>) => write(CAMPAIGN_KEY, progress);
export function loadDailyProgress(): Record<string, DailyProgress> {
  const saved = read(DAILY_KEY), result: Record<string, DailyProgress> = {};
  if (record(saved)) for (const [key, value] of Object.entries(saved)) {
    if (validDateKey(key) && record(value) && value.date === key && typeof value.completed === 'boolean' &&
        count(value.timeSeconds) && count(value.heartsRemaining) && value.heartsRemaining <= 3) result[key] = value as unknown as DailyProgress;
  }
  return result;
}
export const saveDailyProgress = (progress: Record<string, DailyProgress>) => write(DAILY_KEY, progress);
export function loadStats(): GameStats {
  const saved = read(STATS_KEY), result = { ...DEFAULT_STATS, bestTimesBySize: {} as Record<number, number> };
  if (!record(saved)) return result;
  for (const key of ['gamesPlayed', 'gamesWon', 'currentDailyStreak', 'maxDailyStreak'] as const) if (count(saved[key])) result[key] = saved[key];
  if (record(saved.bestTimesBySize)) for (const [key, value] of Object.entries(saved.bestTimesBySize)) {
    if (/^(?:[4-9]|1[0-2])$/.test(key) && count(value)) result.bestTimesBySize[Number(key)] = value;
  }
  return result;
}
export const saveStats = (stats: GameStats) => write(STATS_KEY, stats);
export function validTwoPlayerConfig(value: unknown): value is TwoPlayerConfig {
  return record(value) && ['player1Name', 'player2Name'].every(k => typeof value[k] === 'string' && (value[k] as string).length > 0 && (value[k] as string).length <= 100) &&
    breeds.includes(value.player1Breed as string) && breeds.includes(value.player2Breed as string);
}
export function loadSavedSession(): GameSession | null {
  const saved = read(SAVED_GAME_KEY);
  if (!record(saved) || saved.version !== 2 || typeof saved.sessionId !== 'string' || !record(saved.puzzle)) return null;
  const game = saved as unknown as GameSession;
  if (!validatePuzzleIntegrity(game.puzzle).valid || !game.puzzle.solution ||
      !['campaign', 'daily', 'freeplay', 'twoplayer'].includes(game.gameMode) ||
      !count(game.hearts) || game.hearts > 3 || !count(game.timerSeconds) ||
      (game.currentPlayer !== 1 && game.currentPlayer !== 2) ||
      (game.gameMode === 'twoplayer' && !validTwoPlayerConfig(game.twoPlayerConfig)) ||
      (game.gameMode === 'daily' && (!validDateKey(game.puzzle.dailyDate) || game.puzzle.id !== `daily-${game.puzzle.dailyDate}`))) return null;
  const size = game.puzzle.size;
  if (!Array.isArray(game.cells) || game.cells.length !== size * size) return null;
  const state = (s: unknown) => ['empty', 'cat', 'mark'].includes(s as string);
  const coordinate = (q: unknown): q is { row: number; col: number } => record(q) && count(q.row) && count(q.col) && q.row < size && q.col < size;
  const player = (p: unknown) => p === undefined || p === 1 || p === 2;
  for (let i = 0; i < game.cells.length; i++) {
    const cell = game.cells[i];
    if (!coordinate(cell) || cell.row !== Math.floor(i / size) || cell.col !== i % size ||
        cell.region !== game.puzzle.regions[cell.row][cell.col] || !state(cell.state) || !player(cell.player)) return null;
  }
  const validMove = (move: Move) => coordinate(move) && state(move.prevState) && state(move.newState) && player(move.player) && player(move.prevPlayer) &&
    (move.autoCrossed === undefined || (Array.isArray(move.autoCrossed) && move.autoCrossed.length <= size * size && move.autoCrossed.every(c => coordinate(c) && state(c.prevState))));
  if (![game.history, game.redoStack].every(stack => Array.isArray(stack) && stack.length <= 10000 && stack.every(validMove))) return null;
  return evaluateGame({ ...game, twoPlayerConfig: game.gameMode === 'twoplayer' ? game.twoPlayerConfig : null });
}
export const saveSession = (session: GameSession | null) => write(SAVED_GAME_KEY, session);
