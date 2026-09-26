export type CellState = 'empty' | 'cat' | 'mark';

export interface Coordinate {
  row: number;
  col: number;
}

export interface Puzzle {
  id: string;
  size: number;
  // 2D grid of region indices: regions[r][c] in 0..(size - 1)
  regions: number[][];
  solution?: Coordinate[];
  name?: string;
  difficulty?: 'easy' | 'medium' | 'hard' | 'expert';
  generatorVersion?: number;
  dailyDate?: string;
}

export interface BoardCell {
  row: number;
  col: number;
  region: number;
  state: CellState;
  hasConflict?: boolean;
  isHighlighted?: boolean;
  player?: 1 | 2;
  isHinted?: boolean;
  isMistake?: boolean;
  markColor?: 'black' | 'red';
}

export interface Move {
  row: number;
  col: number;
  prevState: CellState;
  newState: CellState;
  isMistake?: boolean;
  autoCrossed?: { row: number; col: number; prevState: CellState }[];
  player?: 1 | 2; // For two-player pass-and-play
  prevPlayer?: 1 | 2;
  prevMistake?: boolean;
  markColor?: 'black' | 'red';
  prevMarkColor?: 'black' | 'red';
}

export interface TwoPlayerConfig {
  player1Name: string;
  player2Name: string;
  player1Breed: CatBreed;
  player2Breed: CatBreed;
}

export type GameMode = 'campaign' | 'daily' | 'freeplay' | 'twoplayer';
export type PlayStyle = 'classic' | 'zen'; // Classic = 3 hearts, Zen = infinite hearts
export type InputMode = 'mark' | 'cat'; // For mobile single-tap toggling
export type CatBreed = 'frankie' | 'orange_tabby' | 'calico' | 'tuxedo' | 'siamese' | 'black_cat' | 'gray_fluff';
export type ThemePalette = 'cozy' | 'pastel' | 'matcha' | 'lavender' | 'midnight';

export interface UserSettings {
  soundEnabled: boolean;
  hapticsEnabled: boolean;
  volume: number;
  playStyle: PlayStyle;
  autoCross: boolean;
  highlightConflicts: boolean;
  dimCompleted: boolean;
  catBreed: CatBreed;
  theme: ThemePalette;
}

export interface LevelProgress {
  levelId: string;
  completed: boolean;
  bestTimeSeconds?: number;
  stars: number; // 1 to 3 stars based on time/hearts
  completedDate?: string;
}

export interface DailyProgress {
  date: string; // YYYY-MM-DD
  completed: boolean;
  timeSeconds: number;
  heartsRemaining: number;
}

export interface GameStats {
  gamesPlayed: number;
  gamesWon: number;
  currentDailyStreak: number;
  maxDailyStreak: number;
  bestTimesBySize: Record<number, number>;
}

export interface HintInvolvedCell {
  row: number;
  col: number;
  fadedState?: 'cat' | 'mark';
  highlight?: boolean;
  reason?: 'conflict' | 'forced_empty' | 'starved_unit' | 'caused_by';
}

export interface HintResult {
  type: 'elimination' | 'placement';
  row: number;
  col: number;
  explanation: string;
  steps?: string[];
  involvedCells?: HintInvolvedCell[];
}
