import type { BoardCell, CellState, GameMode, HintResult, InputMode, Move, Puzzle, TwoPlayerConfig, UserSettings } from './types';
import { findConflicts, getAutoCrossCells, getSatisfiedUnits, isValidPlacement } from './solver';

export interface GameSession {
  version: 2;
  sessionId: string;
  puzzle: Puzzle;
  gameMode: GameMode;
  cells: BoardCell[];
  hearts: number;
  timerSeconds: number;
  history: Move[];
  redoStack: Move[];
  currentPlayer: 1 | 2;
  twoPlayerConfig: TwoPlayerConfig | null;
  isWon: boolean;
  isGameOver: boolean;
}

export function newGame(puzzle: Puzzle, gameMode: GameMode, config: TwoPlayerConfig | null = null): GameSession {
  return {
    version: 2, sessionId: `${Date.now()}-${Math.random()}`, puzzle, gameMode,
    cells: puzzle.regions.flatMap((row, r) => row.map((region, col) => ({ row: r, col, region, state: 'empty' as const }))),
    hearts: 3, timerSeconds: 0, history: [], redoStack: [], currentPlayer: 1,
    twoPlayerConfig: config, isWon: false, isGameOver: false,
  };
}

export function evaluateGame(game: GameSession): GameSession {
  const { size, regions, solution } = game.puzzle;
  const conflicts = findConflicts(game.cells, size, regions, solution);
  const units = getSatisfiedUnits(game.cells, size, regions);
  return { ...game,
    cells: game.cells.map(cell => ({ ...cell, hasConflict: conflicts.has(`${cell.row},${cell.col}`) })),
    isWon: conflicts.size === 0 && units.rows.size === size && units.cols.size === size && units.regions.size === size,
    isGameOver: game.hearts <= 0,
  };
}

export type CellAction = 'tap' | 'doubleTap' | 'cat' | 'mark' | 'drag';
export type GameAction =
  | { type: 'start'; game: GameSession }
  | { type: 'tick' }
  | { type: 'hint'; hint: HintResult }
  | { type: 'dismissHint' }
  | { type: 'undo' | 'redo' }
  | { type: 'move'; row: number; col: number; action: CellAction; inputMode: InputMode; settings: UserSettings; markColor?: 'black' | 'red' };

export function gameReducer(game: GameSession, action: GameAction): GameSession {
  if (action.type === 'start') return action.game;
  if (game.isWon || game.isGameOver) return game;
  if (action.type === 'tick') return { ...game, timerSeconds: game.timerSeconds + 1 };
  if (action.type === 'dismissHint') return { ...game, cells: game.cells.map(c => c.isHinted ? { ...c, isHinted: false } : c) };
  if (action.type === 'hint') return { ...game, cells: game.cells.map(c => ({ ...c, isHinted: c.row === action.hint.row && c.col === action.hint.col })) };
  if (action.type === 'undo' || action.type === 'redo') {
    const undo = action.type === 'undo';
    const stack = undo ? game.history : game.redoStack;
    const move = stack[stack.length - 1];
    if (!move) return game;
    const cells = game.cells.map(cell => {
      if (cell.row === move.row && cell.col === move.col) return { ...cell,
        state: undo ? move.prevState : move.newState,
        isMistake: undo ? move.prevMistake : move.isMistake,
        player: undo ? move.prevPlayer : move.newState === 'cat' ? move.player : undefined,
        markColor: undo ? move.prevMarkColor : move.markColor,
        isHinted: false,
      };
      const crossed = move.autoCrossed?.find(c => c.row === cell.row && c.col === cell.col);
      return crossed ? { ...cell, state: undo ? crossed.prevState : ('mark' as CellState), markColor: undo ? undefined : ('black' as const), isHinted: false } : cell;
    });
    return evaluateGame({ ...game, cells,
      history: undo ? game.history.slice(0, -1) : [...game.history, move],
      redoStack: undo ? [...game.redoStack, move] : game.redoStack.slice(0, -1),
      currentPlayer: move.newState === 'cat' && move.player ? (undo ? move.player : move.player === 1 ? 2 : 1) : game.currentPlayer,
    });
  }
  if (action.type !== 'move') return game;
  const { row, col, settings, markColor = 'black' } = action;
  const cell = game.cells.find(c => c.row === row && c.col === col);
  if (!cell) return game;
  let target: CellState;
  if (action.action === 'drag') {
    if (cell.state !== 'empty') return game;
    target = 'mark';
  } else if (action.action === 'cat' || action.action === 'doubleTap' || (action.action === 'tap' && action.inputMode === 'cat')) {
    target = cell.state === 'cat' ? 'empty' : 'cat';
  } else {
    if (cell.state === 'mark') {
      const current = cell.markColor ?? 'black';
      if (current !== markColor && !cell.isMistake) {
        target = 'mark';
      } else {
        target = 'empty';
      }
    } else {
      target = 'mark';
    }
  }
  let mistake = false;
  let hearts = game.hearts;
  let crossed: Move['autoCrossed'];
  if (target === 'cat') {
    const cats = game.cells.filter(c => c.state === 'cat');
    if (!isValidPlacement(row, col, cats, game.puzzle.regions) ||
        (game.puzzle.solution && !game.puzzle.solution.some(q => q.row === row && q.col === col))) {
      mistake = true;
      target = 'mark';
      if (settings.playStyle === 'classic') hearts--;
    } else if (settings.autoCross) {
      crossed = getAutoCrossCells(row, col, game.puzzle.size, game.puzzle.regions, game.cells)
        .map(q => ({ ...q, prevState: 'empty' }));
    }
  }
  const nextMarkColor = target === 'mark' ? (mistake ? 'red' : markColor) : undefined;
  const player = game.gameMode === 'twoplayer' ? game.currentPlayer : undefined;
  const move: Move = { row, col, prevState: cell.state, newState: target, prevMistake: cell.isMistake,
    isMistake: mistake, prevPlayer: cell.player, player, autoCrossed: crossed,
    markColor: nextMarkColor, prevMarkColor: cell.markColor };
  const crossedKeys = new Set(crossed?.map(c => c.row * game.puzzle.size + c.col));
  const cells = game.cells.map(c => {
    if (c.row === row && c.col === col) return { ...c, state: target, isMistake: mistake, markColor: nextMarkColor, isHinted: false, player: target === 'cat' ? player : undefined };
    return crossedKeys.has(c.row * game.puzzle.size + c.col) ? { ...c, state: 'mark' as CellState, markColor: 'black' as const, isHinted: false } : c;
  });
  return evaluateGame({ ...game, cells, hearts, history: [...game.history, move], redoStack: [],
    currentPlayer: player && target === 'cat' ? player === 1 ? 2 : 1 : game.currentPlayer });
}
