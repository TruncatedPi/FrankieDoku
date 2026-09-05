import { useState, useEffect, useRef, useCallback } from 'react';
import {
  BoardCell,
  CellState,
  Coordinate,
  GameMode,
  InputMode,
  Move,
  PlayStyle,
  Puzzle,
  UserSettings,
  GameStats,
  LevelProgress,
  DailyProgress,
  HintResult,
} from '../engine/types';
import {
  findConflicts,
  getAutoCrossCells,
  getSatisfiedUnits,
  generateHint,
  isValidPlacement,
} from '../engine/solver';
import { generateDailyPuzzle, generatePuzzle } from '../engine/generator';
import { CAMPAIGN_LEVELS, CampaignLevel } from '../data/levels';
import {
  loadSettings,
  saveSettings,
  loadStats,
  saveStats,
  loadCampaignProgress,
  saveCampaignProgress,
  loadDailyProgress,
  saveDailyProgress,
  DEFAULT_SETTINGS,
  DEFAULT_STATS,
} from '../utils/storage';
import { sound } from '../utils/audio';

export function useGameState() {
  const [settings, setSettings] = useState<UserSettings>(() => loadSettings());
  const [stats, setStats] = useState<GameStats>(() => loadStats());
  const [campaignProgress, setCampaignProgress] = useState<Record<string, LevelProgress>>(() =>
    loadCampaignProgress()
  );
  const [dailyProgress, setDailyProgress] = useState<Record<string, DailyProgress>>(() =>
    loadDailyProgress()
  );

  // Active game state
  const [gameMode, setGameMode] = useState<GameMode>('campaign');
  const [currentLevel, setCurrentLevel] = useState<CampaignLevel>(() => CAMPAIGN_LEVELS[0]);
  const [currentPuzzle, setCurrentPuzzle] = useState<Puzzle>(() => CAMPAIGN_LEVELS[0]);
  const [cells, setCells] = useState<BoardCell[]>([]);
  const [inputMode, setInputMode] = useState<InputMode>('mark');

  // Hearts & Lives (Classic mode: 3 hearts)
  const MAX_HEARTS = 3;
  const [hearts, setHearts] = useState<number>(MAX_HEARTS);

  // Timer
  const [timerSeconds, setTimerSeconds] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  // Win & Over
  const [isWon, setIsWon] = useState<boolean>(false);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  // Undo / Redo history
  const [history, setHistory] = useState<Move[]>([]);
  const [redoStack, setRedoStack] = useState<Move[]>([]);

  // Hint
  const [activeHint, setActiveHint] = useState<HintResult | null>(null);

  // Two-player pass & play tracking
  const [twoPlayerConfig, setTwoPlayerConfig] = useState<{
    player1Name: string;
    player2Name: string;
    player1Breed: string;
    player2Breed: string;
  } | null>(null);
  const [currentPlayer, setCurrentPlayer] = useState<1 | 2>(1);

  // Sync sound manager settings
  useEffect(() => {
    sound.setMuted(!settings.soundEnabled);
    sound.setVolume(settings.volume);
  }, [settings.soundEnabled, settings.volume]);

  // Initialize board cells from puzzle
  const initBoard = useCallback((puzzle: Puzzle) => {
    const size = puzzle.size;
    const initialCells: BoardCell[] = [];
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        initialCells.push({
          row: r,
          col: c,
          region: puzzle.regions[r][c],
          state: 'empty',
          hasConflict: false,
          isHinted: false,
        });
      }
    }
    setCells(initialCells);
    setHistory([]);
    setRedoStack([]);
    setHearts(MAX_HEARTS);
    setTimerSeconds(0);
    setIsWon(false);
    setIsGameOver(false);
    setActiveHint(null);
    setIsTimerRunning(true);
  }, []);

  // Load initial board on mount
  useEffect(() => {
    initBoard(currentPuzzle);
  }, []);

  // Timer interval
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning && !isWon && !isGameOver) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, isWon, isGameOver]);

  // Check conflicts and win condition whenever cells change
  useEffect(() => {
    if (cells.length === 0 || isWon || isGameOver) return;

    const size = currentPuzzle.size;
    const conflicts = findConflicts(
      cells,
      size,
      currentPuzzle.regions,
      currentPuzzle.solution
    );

    // Update conflict visual flags on cells
    setCells((prev) =>
      prev.map((cell) => {
        const key = `${cell.row},${cell.col}`;
        const hasConflict = conflicts.has(key);
        if (cell.hasConflict !== hasConflict) {
          return { ...cell, hasConflict };
        }
        return cell;
      })
    );

    // Check Win Condition:
    // 1. Exactly `size` cats
    // 2. 0 conflicts
    // 3. Every row, col, and region has exactly 1 cat
    const catCells = cells.filter((c) => c.state === 'cat');
    if (catCells.length === size && conflicts.size === 0) {
      // Validate all units
      const satisfied = getSatisfiedUnits(cells, size, currentPuzzle.regions);
      if (
        satisfied.rows.size === size &&
        satisfied.cols.size === size &&
        satisfied.regions.size === size
      ) {
        // Victory!
        setIsWon(true);
        setIsTimerRunning(false);
        sound.playVictory();

        // Update progress and stats
        const finishTime = timerSeconds;
        setStats((prev) => {
          const newStats = {
            ...prev,
            gamesPlayed: prev.gamesPlayed + 1,
            gamesWon: prev.gamesWon + 1,
            bestTimesBySize: {
              ...prev.bestTimesBySize,
              [size]: prev.bestTimesBySize[size]
                ? Math.min(prev.bestTimesBySize[size], finishTime)
                : finishTime,
            },
          };
          saveStats(newStats);
          return newStats;
        });

        if (gameMode === 'campaign' && currentLevel) {
          setCampaignProgress((prev) => {
            const existing = prev[currentLevel.id];
            const bestTime = existing?.bestTimeSeconds
              ? Math.min(existing.bestTimeSeconds, finishTime)
              : finishTime;
            const updated = {
              ...prev,
              [currentLevel.id]: {
                levelId: currentLevel.id,
                completed: true,
                bestTimeSeconds: bestTime,
                stars: hearts === MAX_HEARTS ? 3 : hearts >= 2 ? 2 : 1,
                completedDate: new Date().toISOString(),
              },
            };
            saveCampaignProgress(updated);
            return updated;
          });
        } else if (gameMode === 'daily') {
          const today = new Date().toISOString().split('T')[0];
          setDailyProgress((prev) => {
            const updated = {
              ...prev,
              [today]: {
                date: today,
                completed: true,
                timeSeconds: finishTime,
                heartsRemaining: hearts,
              },
            };
            saveDailyProgress(updated);
            return updated;
          });

          // Daily streak update
          setStats((prev) => {
            const newStreak = prev.currentDailyStreak + 1;
            const newStats = {
              ...prev,
              currentDailyStreak: newStreak,
              maxDailyStreak: Math.max(prev.maxDailyStreak, newStreak),
            };
            saveStats(newStats);
            return newStats;
          });
        }
      }
    }
  }, [cells, currentPuzzle, isWon, isGameOver, hearts, gameMode, currentLevel, timerSeconds]);

  // Primary user action on a cell
  const handleCellAction = (
    row: number,
    col: number,
    actionType: 'tap' | 'doubleTap' | 'cat' | 'mark' | 'drag'
  ) => {
    if (isWon || isGameOver) return;

    const currentCell = cells.find((c) => c.row === row && c.col === col);
    if (!currentCell) return;

    let targetState: CellState = currentCell.state;

    if (actionType === 'drag') {
      // Dragging only marks unmarked cells as 'mark' ('X')
      if (currentCell.state === 'empty') {
        targetState = 'mark';
      } else {
        return; // don't change already marked/cat cells while dragging
      }
    } else if (actionType === 'doubleTap' || actionType === 'cat') {
      // Double tap or secondary click = toggle cat
      targetState = currentCell.state === 'cat' ? 'empty' : 'cat';
    } else if (actionType === 'mark') {
      targetState = currentCell.state === 'mark' ? 'empty' : 'mark';
    } else if (actionType === 'tap') {
      // Mode-based tap
      if (inputMode === 'mark') {
        targetState = currentCell.state === 'mark' ? 'empty' : 'mark';
      } else {
        targetState = currentCell.state === 'cat' ? 'empty' : 'cat';
      }
    }

    if (targetState === currentCell.state) return;

    // Process state change
    let autoCrossedList: { row: number; col: number; prevState: CellState }[] = [];

    if (targetState === 'cat') {
      sound.playMeow();
      sound.triggerHaptic('medium');

      // Check for illegal move in Classic mode (heart penalty)
      if (settings.playStyle === 'classic') {
        const existingCats: Coordinate[] = cells
          .filter((c) => c.state === 'cat' && !(c.row === row && c.col === col))
          .map((c) => ({ row: c.row, col: c.col }));

        const isValid = isValidPlacement(row, col, existingCats, currentPuzzle.regions);
        const isSolutionCat =
          !currentPuzzle.solution ||
          currentPuzzle.solution.some((s) => s.row === row && s.col === col);

        if (!isValid || !isSolutionCat) {
          // Rule violation or misplaced cat: deduct heart
          sound.playHeartLost();
          sound.triggerHaptic('heavy');
          const nextHearts = hearts - 1;
          setHearts(nextHearts);
          if (nextHearts <= 0) {
            setIsGameOver(true);
            setIsTimerRunning(false);
          }
        }
      }

      // Auto-Cross helpers if enabled
      if (settings.autoCross) {
        const toCross = getAutoCrossCells(
          row,
          col,
          currentPuzzle.size,
          currentPuzzle.regions,
          cells
        );
        autoCrossedList = toCross.map((coord) => ({
          row: coord.row,
          col: coord.col,
          prevState: 'empty',
        }));
      }
    } else if (targetState === 'mark') {
      sound.playPop();
      sound.triggerHaptic('light');
    } else {
      sound.playTap();
      sound.triggerHaptic('light');
    }

    // Apply change to board cells
    setCells((prev) => {
      const next: BoardCell[] = prev.map((cell) => {
        if (cell.row === row && cell.col === col) {
          return { ...cell, state: targetState as CellState, isHinted: false };
        }
        if (autoCrossedList.some((ac) => ac.row === cell.row && ac.col === cell.col)) {
          return { ...cell, state: 'mark' as CellState, isHinted: false };
        }
        return cell;
      });
      return next;
    });

    // Record in history for undo
    const newMove: Move = {
      row,
      col,
      prevState: currentCell.state,
      newState: targetState,
      autoCrossed: autoCrossedList.length > 0 ? autoCrossedList : undefined,
      player: gameMode === 'twoplayer' ? currentPlayer : undefined,
    };

    setHistory((prev) => [...prev, newMove]);
    setRedoStack([]);

    // Two-player pass & play alternate turn
    if (gameMode === 'twoplayer' && targetState === 'cat') {
      setCurrentPlayer((prev) => (prev === 1 ? 2 : 1));
    }
  };

  // Undo action
  const handleUndo = () => {
    if (history.length === 0 || isWon || isGameOver) return;

    const lastMove = history[history.length - 1];
    setHistory((prev) => prev.slice(0, -1));
    setRedoStack((prev) => [...prev, lastMove]);

    sound.playTap();
    sound.triggerHaptic('light');

    setCells((prev) =>
      prev.map((cell) => {
        if (cell.row === lastMove.row && cell.col === lastMove.col) {
          return { ...cell, state: lastMove.prevState };
        }
        if (lastMove.autoCrossed?.some((ac) => ac.row === cell.row && ac.col === cell.col)) {
          return { ...cell, state: 'empty' };
        }
        return cell;
      })
    );

    if (gameMode === 'twoplayer' && lastMove.newState === 'cat') {
      setCurrentPlayer((prev) => (prev === 1 ? 2 : 1));
    }
  };

  // Redo action
  const handleRedo = () => {
    if (redoStack.length === 0 || isWon || isGameOver) return;

    const moveToRedo = redoStack[redoStack.length - 1];
    setRedoStack((prev) => prev.slice(0, -1));
    setHistory((prev) => [...prev, moveToRedo]);

    sound.playTap();
    sound.triggerHaptic('light');

    setCells((prev) =>
      prev.map((cell) => {
        if (cell.row === moveToRedo.row && cell.col === moveToRedo.col) {
          return { ...cell, state: moveToRedo.newState };
        }
        if (moveToRedo.autoCrossed?.some((ac) => ac.row === cell.row && ac.col === cell.col)) {
          return { ...cell, state: 'mark' };
        }
        return cell;
      })
    );
  };

  // Hint action
  const handleHint = () => {
    if (isWon || isGameOver) return;

    const hint = generateHint(currentPuzzle, cells);
    if (!hint) return;

    sound.playHint();
    sound.triggerHaptic('medium');
    setActiveHint(hint);

    // Highlight the target cell with golden sparkle glow
    setCells((prev) =>
      prev.map((cell) => ({
        ...cell,
        isHinted: cell.row === hint.row && cell.col === hint.col,
      }))
    );
  };

  // Reset current puzzle
  const handleReset = () => {
    initBoard(currentPuzzle);
    sound.playTap();
  };

  // Select a campaign level
  const handleSelectCampaignLevel = (level: CampaignLevel) => {
    setGameMode('campaign');
    setCurrentLevel(level);
    setCurrentPuzzle(level);
    initBoard(level);
  };

  // Next level in campaign
  const handleNextLevel = () => {
    if (!currentLevel) return;
    const nextIdx = CAMPAIGN_LEVELS.findIndex((lvl) => lvl.id === currentLevel.id) + 1;
    if (nextIdx < CAMPAIGN_LEVELS.length) {
      handleSelectCampaignLevel(CAMPAIGN_LEVELS[nextIdx]);
    }
  };

  // Select a daily puzzle by date
  const handleSelectDaily = (dateString: string) => {
    const daily = generateDailyPuzzle(dateString);
    setGameMode('daily');
    setCurrentPuzzle(daily);
    initBoard(daily);
  };

  // Start a free play puzzle
  const handleStartFreePlay = (size = 7) => {
    const puzzle = generatePuzzle(size);
    if (puzzle) {
      setGameMode('freeplay');
      setCurrentPuzzle(puzzle);
      initBoard(puzzle);
    }
  };

  // Start two-player co-op
  const handleStartTwoPlayer = (config: {
    player1Name: string;
    player2Name: string;
    player1Breed: string;
    player2Breed: string;
    gridSize: number;
  }) => {
    setTwoPlayerConfig(config);
    setCurrentPlayer(1);
    const puzzle = generatePuzzle(config.gridSize) || CAMPAIGN_LEVELS[0];
    setGameMode('twoplayer');
    setCurrentPuzzle(puzzle);
    initBoard(puzzle);
  };

  // Update settings
  const handleUpdateSettings = (partial: Partial<UserSettings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...partial };
      saveSettings(next);
      return next;
    });
  };

  // Reset progress
  const handleResetProgress = () => {
    setCampaignProgress({});
    setDailyProgress({});
    setStats(DEFAULT_STATS);
    saveCampaignProgress({});
    saveDailyProgress({});
    saveStats(DEFAULT_STATS);
  };

  // Satisfied units computation for dimming
  const satisfied = getSatisfiedUnits(cells, currentPuzzle.size, currentPuzzle.regions);
  const placedCatsCount = cells.filter((c) => c.state === 'cat').length;
  const remainingCats = Math.max(0, currentPuzzle.size - placedCatsCount);

  return {
    settings,
    stats,
    campaignProgress,
    dailyProgress,
    gameMode,
    currentLevel,
    currentPuzzle,
    cells,
    inputMode,
    setInputMode,
    hearts,
    maxHearts: MAX_HEARTS,
    timerSeconds,
    isWon,
    isGameOver,
    history,
    redoStack,
    activeHint,
    twoPlayerConfig,
    currentPlayer,
    satisfiedRows: satisfied.rows,
    satisfiedCols: satisfied.cols,
    satisfiedRegions: satisfied.regions,
    remainingCats,
    handleCellAction,
    handleUndo,
    handleRedo,
    handleHint,
    handleReset,
    handleSelectCampaignLevel,
    handleNextLevel,
    handleSelectDaily,
    handleStartFreePlay,
    handleStartTwoPlayer,
    handleUpdateSettings,
    handleResetProgress,
    hasNextLevel:
      gameMode === 'campaign' &&
      currentLevel &&
      CAMPAIGN_LEVELS.findIndex((lvl) => lvl.id === currentLevel.id) < CAMPAIGN_LEVELS.length - 1,
  };
}
