import { useState, useEffect, useRef, useCallback, useMemo, useReducer } from 'react';
import type { GameMode, InputMode, Puzzle, UserSettings, HintResult, TwoPlayerConfig } from '../engine/types';
import { gameReducer, newGame, type CellAction } from '../engine/game';
import { getSatisfiedUnits, generateHint } from '../engine/solver';
import { requestPuzzle } from '../engine/generation-client';
import { CAMPAIGN_LEVELS, type CampaignLevel } from '../data/levels';
import { loadSettings, saveSettings, loadStats, saveStats, loadCampaignProgress, saveCampaignProgress,
  loadDailyProgress, saveDailyProgress, loadSavedSession, saveSession, sanitizeSettings, DEFAULT_STATS } from '../utils/storage';
import { dailyStreaks, localDateKey } from '../utils/dates';
import { sound } from '../utils/audio';

export function useGameState() {
  const [settings, setSettings] = useState(loadSettings);
  const [rawStats, setStats] = useState(loadStats);
  const [campaignProgress, setCampaignProgress] = useState(loadCampaignProgress);
  const [dailyProgress, setDailyProgress] = useState(loadDailyProgress);
  const [restored] = useState(loadSavedSession);
  const [game, dispatch] = useReducer(gameReducer, restored, session => session ?? newGame(CAMPAIGN_LEVELS[0], 'campaign'));
  const [inputMode, setInputMode] = useState<InputMode>('mark');
  const [activeHint, setActiveHint] = useState<HintResult | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState<string | null>(null);
  const pending = useRef<AbortController | null>(null);
  const played = useRef<string | null>(restored?.sessionId ?? null);
  const recordedWin = useRef<string | null>(restored?.isWon ? restored.sessionId : null);
  const currentPuzzle = game.puzzle;
  const currentLevel = CAMPAIGN_LEVELS.find(level => level.id === currentPuzzle.id) ?? CAMPAIGN_LEVELS[0];
  const today = localDateKey();
  const streaks = useMemo(() => dailyStreaks(dailyProgress, today), [dailyProgress, today]);
  const stats = useMemo(() => ({ ...rawStats, ...streaks }), [rawStats, streaks]);

  useEffect(() => { saveSettings(settings); sound.setMuted(!settings.soundEnabled); sound.setVolume(settings.volume);
    sound.setHapticsEnabled(settings.hapticsEnabled);
    document.documentElement.classList.toggle('dark', settings.theme === 'midnight');
  }, [settings]);
  useEffect(() => { saveStats(stats); }, [stats]);
  useEffect(() => { saveCampaignProgress(campaignProgress); }, [campaignProgress]);
  useEffect(() => { saveDailyProgress(dailyProgress); }, [dailyProgress]);

  // Count attempts when a new session starts, including retries and losses.
  useEffect(() => {
    if (played.current === game.sessionId) return;
    played.current = game.sessionId;
    setStats(prev => ({ ...prev, gamesPlayed: prev.gamesPlayed + 1 }));
  }, [game.sessionId]);

  useEffect(() => {
    if (game.isWon || game.isGameOver || isGenerating) return;
    const interval = setInterval(() => {
      if (typeof document === 'undefined' || !document.hidden) dispatch({ type: 'tick' });
    }, 1000);
    return () => clearInterval(interval);
  }, [game.isWon, game.isGameOver, isGenerating]);

  // Persist settled state, and flush the latest state when navigating away.
  const latest = useRef(game);
  latest.current = game;
  useEffect(() => {
    const timer = setTimeout(() => saveSession(game), 150);
    return () => clearTimeout(timer);
  }, [game]);
  useEffect(() => {
    const flush = () => saveSession(latest.current);
    window.addEventListener('pagehide', flush);
    return () => { flush(); window.removeEventListener('pagehide', flush); pending.current?.abort(); };
  }, []);

  useEffect(() => {
    if (!game.isWon || recordedWin.current === game.sessionId) return;
    recordedWin.current = game.sessionId;
    sound.playVictory();
    const size = game.puzzle.size, finishTime = game.timerSeconds;
    setStats(prev => ({ ...prev, gamesWon: prev.gamesWon + 1,
      bestTimesBySize: { ...prev.bestTimesBySize, [size]: Math.min(prev.bestTimesBySize[size] ?? Infinity, finishTime) } }));
    if (game.gameMode === 'campaign') {
      setCampaignProgress(prev => ({ ...prev, [game.puzzle.id]: {
        levelId: game.puzzle.id, completed: true,
        bestTimeSeconds: Math.min(prev[game.puzzle.id]?.bestTimeSeconds ?? Infinity, finishTime),
        stars: Math.max(prev[game.puzzle.id]?.stars ?? 0, game.hearts), completedDate: new Date().toISOString(),
      } }));
    } else if (game.gameMode === 'daily' && game.puzzle.dailyDate) {
      const date = game.puzzle.dailyDate;
      setDailyProgress(prev => ({ ...prev, [date]: { date, completed: true,
        timeSeconds: Math.min(prev[date]?.timeSeconds ?? Infinity, finishTime),
        heartsRemaining: Math.max(prev[date]?.heartsRemaining ?? 0, game.hearts),
      } }));
    }
  }, [game]);

  const startGame = useCallback((puzzle: Puzzle, mode: GameMode, config: TwoPlayerConfig | null = null) => {
    pending.current?.abort(); pending.current = null;
    setIsGenerating(false); setGenerationError(null); setActiveHint(null);
    dispatch({ type: 'start', game: newGame(puzzle, mode, config) });
  }, []);
  const generate = async (request: { size?: number; date?: string }, mode: GameMode, config: TwoPlayerConfig | null = null) => {
    pending.current?.abort();
    const controller = new AbortController(); pending.current = controller;
    setIsGenerating(true); setGenerationError(null);
    try {
      const puzzle = await requestPuzzle(request, controller.signal);
      if (!controller.signal.aborted && pending.current === controller) startGame(puzzle, mode, config);
    } catch (error) {
      if (!controller.signal.aborted && pending.current === controller) setGenerationError(error instanceof Error ? error.message : 'Could not create a map');
    } finally {
      if (pending.current === controller) { pending.current = null; setIsGenerating(false); }
    }
  };
  const handleCellAction = (row: number, col: number, action: CellAction) => {
    if (isGenerating || game.isWon || game.isGameOver) return;
    setActiveHint(null);
    dispatch({ type: 'move', row, col, action, inputMode, settings });
  };
  const previousGame = useRef(game);
  useEffect(() => {
    const previous = previousGame.current; previousGame.current = game;
    if (previous.sessionId !== game.sessionId || previous.history.length >= game.history.length || game.isWon) return;
    const move = game.history[game.history.length - 1];
    if (move?.isMistake) { sound.playHeartLost(); sound.triggerHaptic('heavy'); }
    else if (move?.newState === 'cat') { sound.playMeow(); sound.triggerHaptic('medium'); }
    else { sound.playTap(); sound.triggerHaptic('light'); }
  }, [game]);
  const handleHint = () => {
    if (isGenerating || game.isWon || game.isGameOver) return;
    const hint = generateHint(currentPuzzle, game.cells);
    if (hint) { setActiveHint(hint); dispatch({ type: 'hint', hint }); sound.playHint(); sound.triggerHaptic('medium'); }
  };
  const satisfied = useMemo(() => getSatisfiedUnits(game.cells, currentPuzzle.size, currentPuzzle.regions), [game.cells, currentPuzzle]);
  const nextIndex = CAMPAIGN_LEVELS.findIndex(level => level.id === currentPuzzle.id) + 1;
  const hasNextLevel = game.gameMode === 'campaign' && nextIndex > 0 && nextIndex < CAMPAIGN_LEVELS.length;
  return {
    settings, stats, campaignProgress, dailyProgress, ...game, currentPuzzle, currentLevel,
    inputMode, setInputMode, maxHearts: 3, activeHint, isGenerating, generationError,
    satisfiedRows: satisfied.rows, satisfiedCols: satisfied.cols, satisfiedRegions: satisfied.regions,
    remainingCats: Math.max(0, currentPuzzle.size - game.cells.filter(c => c.state === 'cat').length),
    handleCellAction, handleHint,
    handleUndo: () => { if (!isGenerating) { setActiveHint(null); dispatch({ type: 'undo' }); } },
    handleRedo: () => { if (!isGenerating) { setActiveHint(null); dispatch({ type: 'redo' }); } },
    handleReset: () => startGame(currentPuzzle, game.gameMode, game.twoPlayerConfig),
    handleSelectCampaignLevel: (level: CampaignLevel) => startGame(level, 'campaign'),
    handleNextLevel: () => { if (hasNextLevel) startGame(CAMPAIGN_LEVELS[nextIndex], 'campaign'); },
    handleSelectDaily: (date: string) => generate({ date }, 'daily'),
    handleStartFreePlay: (size = 7) => generate({ size }, 'freeplay'),
    handleStartTwoPlayer: (config: TwoPlayerConfig & { gridSize: number }) => generate({ size: config.gridSize }, 'twoplayer', config),
    handleUpdateSettings: (partial: Partial<UserSettings>) => setSettings(prev => sanitizeSettings({ ...prev, ...partial })),
    handleResetProgress: () => {
      setCampaignProgress({}); setDailyProgress({}); setStats({ ...DEFAULT_STATS, bestTimesBySize: {} });
      startGame(CAMPAIGN_LEVELS[0], 'campaign');
    },
    hasNextLevel,
  };
}
