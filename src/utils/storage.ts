import { UserSettings, LevelProgress, DailyProgress, GameStats, BoardCell, GameMode } from '../engine/types';

const SETTINGS_KEY = 'meowdoku_settings_v1';
const CAMPAIGN_KEY = 'meowdoku_campaign_v1';
const DAILY_KEY = 'meowdoku_daily_v1';
const STATS_KEY = 'meowdoku_stats_v1';
const SAVED_GAME_KEY = 'meowdoku_saved_session_v1';

export const DEFAULT_SETTINGS: UserSettings = {
  soundEnabled: true,
  hapticsEnabled: true,
  volume: 0.6,
  playStyle: 'classic',
  autoCross: true,
  highlightConflicts: true,
  dimCompleted: true,
  catBreed: 'orange_tabby',
  theme: 'cozy',
};

export const DEFAULT_STATS: GameStats = {
  gamesPlayed: 0,
  gamesWon: 0,
  currentDailyStreak: 0,
  maxDailyStreak: 0,
  bestTimesBySize: {},
};

export function loadSettings(): UserSettings {
  try {
    const saved = localStorage.getItem(SETTINGS_KEY);
    if (saved) {
      return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
    }
  } catch (e) {
    console.error('Failed to load settings:', e);
  }
  return DEFAULT_SETTINGS;
}

export function saveSettings(settings: UserSettings): void {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (e) {
    console.error('Failed to save settings:', e);
  }
}

export function loadCampaignProgress(): Record<string, LevelProgress> {
  try {
    const saved = localStorage.getItem(CAMPAIGN_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Failed to load campaign progress:', e);
  }
  return {};
}

export function saveCampaignProgress(progress: Record<string, LevelProgress>): void {
  try {
    localStorage.setItem(CAMPAIGN_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error('Failed to save campaign progress:', e);
  }
}

export function loadDailyProgress(): Record<string, DailyProgress> {
  try {
    const saved = localStorage.getItem(DAILY_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Failed to load daily progress:', e);
  }
  return {};
}

export function saveDailyProgress(progress: Record<string, DailyProgress>): void {
  try {
    localStorage.setItem(DAILY_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error('Failed to save daily progress:', e);
  }
}

export function loadStats(): GameStats {
  try {
    const saved = localStorage.getItem(STATS_KEY);
    if (saved) {
      return { ...DEFAULT_STATS, ...JSON.parse(saved) };
    }
  } catch (e) {
    console.error('Failed to load stats:', e);
  }
  return DEFAULT_STATS;
}

export function saveStats(stats: GameStats): void {
  try {
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
  } catch (e) {
    console.error('Failed to save stats:', e);
  }
}

export interface SavedGameSession {
  puzzleId: string;
  gameMode: GameMode;
  cells: BoardCell[];
  hearts: number;
  timerSeconds: number;
  levelNumber?: number;
}

export function loadSavedSession(): SavedGameSession | null {
  try {
    const saved = localStorage.getItem(SAVED_GAME_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Failed to load saved session:', e);
  }
  return null;
}

export function saveSession(session: SavedGameSession | null): void {
  try {
    if (session) {
      localStorage.setItem(SAVED_GAME_KEY, JSON.stringify(session));
    } else {
      localStorage.removeItem(SAVED_GAME_KEY);
    }
  } catch (e) {
    console.error('Failed to save session:', e);
  }
}
