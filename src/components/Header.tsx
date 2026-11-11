import React, { useState, useEffect, useRef } from 'react';
import { HintWindow } from './HintWindow';
import { GameMode, PlayStyle, CatBreed, HintResult, ThemePalette } from '../engine/types';
import { getTerritoryInfo } from '../engine/palettes';
import { Volume2, VolumeX, Settings, Heart, Calendar, Grid, Download, Users, RefreshCw, Sparkles, X, Moon, Sun } from 'lucide-react';
import { CatIcon } from './CatIcon';
import { APP_VERSION } from '../utils/version';

interface HeaderProps {
  gameMode: GameMode;
  playStyle: PlayStyle;
  levelNumber?: number;
  levelName?: string;
  isHardLevel?: boolean;
  isSuperHardLevel?: boolean;
  gridSize: number;
  hearts: number;
  maxHearts: number;
  timerSeconds: number;
  soundEnabled: boolean;
  onToggleSound: () => void;
  darkMode?: boolean;
  onToggleDarkMode?: () => void;
  onOpenLevels: () => void;
  onOpenDaily: () => void;
  onOpenSettings: () => void;
  onOpenInstall: () => void;
  onOpenTwoPlayer: () => void;
  onNewFreePlay: () => void;
  catBreed?: CatBreed;
  theme?: ThemePalette;
  activeHint?: HintResult | null;
  onDismissHint?: () => void;
}

export const FormattedHintText: React.FC<{ text: string; theme?: ThemePalette }> = ({ text, theme }) => {
  const parts = text.split(/(\[\[territory:\d+:#[0-9a-fA-F]{6}\|[^\]]+\]\])/g);
  return (
    <>
      {parts.map((part, idx) => {
        const match = part.match(/^\[\[territory:(\d+):(#[0-9a-fA-F]{6})\|([^\]]+)\]\]$/);
        if (match) {
          const regIndex = parseInt(match[1], 10);
          const fallbackHex = match[2];
          const fallbackLabel = match[3];

          let displayColor = fallbackHex;
          let displayLabel = fallbackLabel;

          if (theme) {
            const info = getTerritoryInfo(regIndex, theme);
            displayColor = info.hex;
            const isCapital = fallbackLabel.startsWith('Territory');
            displayLabel = `${isCapital ? 'Territory' : 'territory'} ${info.name}`;
          }

          return (
            <span
              key={idx}
              className="font-semibold inline-flex items-center gap-1 text-slate-950 dark:text-white align-baseline"
            >
              <span aria-hidden="true" className="inline-block w-3 h-3 rounded-sm border border-slate-500 shrink-0" style={{backgroundColor: displayColor}} />
              {displayLabel}
            </span>
          );
        }
        return <React.Fragment key={idx}>{part}</React.Fragment>;
      })}
    </>
  );
};

export const Header: React.FC<HeaderProps> = ({
  gameMode,
  playStyle,
  levelNumber,
  levelName,
  isHardLevel = false,
  isSuperHardLevel = false,
  gridSize,
  hearts,
  maxHearts,
  timerSeconds,
  soundEnabled,
  onToggleSound,
  darkMode = false,
  onToggleDarkMode,
  onOpenLevels,
  onOpenDaily,
  onOpenSettings,
  onOpenInstall,
  onOpenTwoPlayer,
  onNewFreePlay,
  catBreed,
  theme,
  activeHint,
  onDismissHint,
}) => {
  const [explanationHint, setExplanationHint] = useState<HintResult | null>(null);
  const statusRowRef = useRef<HTMLDivElement | null>(null);
  const modeTitleRef = useRef<HTMLSpanElement | null>(null);
  const [compactSuperBadge, setCompactSuperBadge] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.innerWidth < 480 : false
  );

  useEffect(() => {
    if (!(gameMode === 'campaign' && isSuperHardLevel)) {
      setCompactSuperBadge(false);
      return;
    }

    let cancelled = false;
    const measureRoom = () => {
      if (cancelled) return;
      const rowEl = statusRowRef.current;
      const titleEl = modeTitleRef.current;
      if (!rowEl || !titleEl) return;

      const style = window.getComputedStyle(rowEl);
      const padLeft = parseFloat(style.paddingLeft) || 0;
      const padRight = parseFloat(style.paddingRight) || 0;
      const rowInnerWidth = rowEl.clientWidth - padLeft - padRight;

      let otherChildrenWidth = 0;
      for (let i = 1; i < rowEl.children.length; i++) {
        otherChildrenWidth += (rowEl.children[i] as HTMLElement).getBoundingClientRect().width;
      }

      const rowGaps = Math.max(0, rowEl.children.length - 1) * (parseFloat(style.columnGap) || 8);
      const reservedTitleWidth = Math.min(titleEl.scrollWidth, 160);
      const availableForBadgeBox = rowInnerWidth - otherChildrenWidth - rowGaps - reservedTitleWidth - 6;
      setCompactSuperBadge(availableForBadgeBox < 82);
    };

    measureRoom();

    const observer =
      typeof ResizeObserver !== 'undefined' && statusRowRef.current
        ? new ResizeObserver(measureRoom)
        : null;
    if (observer && statusRowRef.current) {
      observer.observe(statusRowRef.current);
    }
    window.addEventListener('resize', measureRoom);
    document.fonts?.ready?.then(measureRoom).catch(() => {});

    return () => {
      cancelled = true;
      observer?.disconnect();
      window.removeEventListener('resize', measureRoom);
    };
  }, [gameMode, isSuperHardLevel, playStyle, levelNumber, levelName]);
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${rem.toString().padStart(2, '0')}`;
  };

  const getModeTitle = () => {
    switch (gameMode) {
      case 'campaign':
        return `Level ${levelNumber || 1}: ${levelName || `${gridSize}x${gridSize}`}`;
      case 'daily':
        return 'Daily Challenge 📅';
      case 'twoplayer':
        return 'Cozy Co-Op 🐾';
      case 'freeplay':
      default:
        return `Free Play (${gridSize}x${gridSize})`;
    }
  };

  return (
    <header className="w-full max-w-[540px] mx-auto pt-1.5 pb-1 sm:pt-3 sm:pb-2 px-2 sm:px-3 flex flex-col gap-1.5 sm:gap-2 select-none">
      {/* Top Bar: Brand & Quick Action Buttons */}
      <div className="flex items-center justify-between gap-1.5 min-w-0">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 flex-1">
          <div className="w-8 h-8 sm:w-9 sm:h-9 shrink-0 rounded-2xl bg-amber-100 dark:bg-amber-900/40 p-1 shadow-sm border border-amber-300/40 flex items-center justify-center">
            <CatIcon breed={catBreed || 'frankie'} expression="happy" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1 sm:gap-1.5 leading-none mb-0.5 min-w-0">
              <h1 className="text-lg sm:text-xl font-bold tracking-tight text-amber-950 dark:text-amber-100 truncate">
                FrankieDoku!
              </h1>
              <span
                data-testid="app-version"
                className="shrink-0 text-[9px] sm:text-[10px] font-mono font-bold px-1 sm:px-1.5 py-0.5 rounded-md bg-amber-200/80 dark:bg-amber-900/50 text-amber-950 dark:text-amber-200 border border-amber-300/50 shadow-xs"
              >
                {APP_VERSION}
              </span>
            </div>
            <span className="block truncate text-[10px] text-amber-700/80 dark:text-amber-300/80 font-medium">
              100% Ad-Free & Cozy
            </span>
          </div>
        </div>

        {/* Action icons (never shrink or clip, even on narrow iPhone screens) */}
        <div className="flex items-center gap-0.5 sm:gap-1 shrink-0">
          <button
            type="button"
            onClick={onOpenInstall}
            className="p-1.5 sm:p-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-800 dark:text-amber-200 transition-colors"
            title="Install on iPhone / Android"
            aria-label="Install App"
          >
            <Download className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={onToggleSound}
            className="p-1.5 sm:p-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-800 dark:text-amber-200 transition-colors"
            title={soundEnabled ? 'Mute' : 'Unmute'}
            aria-label="Toggle Sound"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {onToggleDarkMode && (
            <button
              type="button"
              onClick={onToggleDarkMode}
              className="p-1.5 sm:p-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-800 dark:text-amber-200 transition-colors"
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>
          )}

          <button
            type="button"
            onClick={onOpenSettings}
            className="p-1.5 sm:p-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-800 dark:text-amber-200 transition-colors"
            title="Settings"
            aria-label="Settings"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Navigation Buttons & Info Status, covered by active logical hint overlay without shifting layout */}
      <div className="relative min-h-[76px]">
        {/* Normal Header Rows (hidden when hint is active) */}
        <div
          className={`flex flex-col gap-1.5 transition-opacity duration-200 ${
            activeHint ? 'invisible pointer-events-none' : 'visible opacity-100'
          }`}
          aria-hidden={Boolean(activeHint)}
        >
          {/* Navigation Buttons Row */}
          <div className="flex items-center justify-between gap-1.5 overflow-x-auto py-1 text-xs">
            <button
              type="button"
              onClick={onOpenLevels}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-semibold transition-all ${
                gameMode === 'campaign'
                  ? 'bg-amber-500 text-white shadow-sm'
                  : 'bg-white/80 dark:bg-cozy-darkCard/80 hover:bg-amber-50 text-slate-700 dark:text-slate-200 border border-slate-200/60 dark:border-white/10'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              Levels
            </button>

            <button
              type="button"
              onClick={onOpenDaily}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-semibold transition-all ${
                gameMode === 'daily'
                  ? 'bg-amber-500 text-white shadow-sm'
                  : 'bg-white/80 dark:bg-cozy-darkCard/80 hover:bg-amber-50 text-slate-700 dark:text-slate-200 border border-slate-200/60 dark:border-white/10'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              Daily
            </button>

            <button
              type="button"
              onClick={onOpenTwoPlayer}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-semibold transition-all ${
                gameMode === 'twoplayer'
                  ? 'bg-amber-500 text-white shadow-sm'
                  : 'bg-white/80 dark:bg-cozy-darkCard/80 hover:bg-amber-50 text-slate-700 dark:text-slate-200 border border-slate-200/60 dark:border-white/10'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              Co-Op
            </button>

            <button
              type="button"
              onClick={onNewFreePlay}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-semibold transition-all ${
                gameMode === 'freeplay'
                  ? 'bg-amber-500 text-white shadow-sm'
                  : 'bg-white/80 dark:bg-cozy-darkCard/80 hover:bg-amber-50 text-slate-700 dark:text-slate-200 border border-slate-200/60 dark:border-white/10'
              }`}
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Free Play
            </button>
          </div>

          {/* Info Status Row: Level Title, Hearts / Zen, Timer */}
          <div ref={statusRowRef} className="flex items-center justify-between gap-2 px-2 py-1.5 rounded-2xl bg-white/70 dark:bg-cozy-darkCard/70 backdrop-blur-sm border border-slate-200/40 dark:border-white/5 shadow-sm text-sm">
            {/* Mode & Level name */}
            <div className="flex items-center gap-1.5 min-w-0">
              <span ref={modeTitleRef} className="font-bold text-slate-800 dark:text-slate-100 truncate max-w-[160px]">
                {getModeTitle()}
              </span>
              {gameMode === 'campaign' && (isHardLevel || isSuperHardLevel) && (
                <span
                  data-testid="header-hard-badge"
                  title={
                    isSuperHardLevel
                      ? 'Super-hard: significantly above average difficulty with multi-step lookahead for this map size'
                      : 'Significantly above average difficulty for this map size in the current campaign'
                  }
                  className={`shrink-0 px-1.5 py-0.5 rounded border text-[9px] font-extrabold tracking-wider uppercase leading-none ${
                    isSuperHardLevel
                      ? 'bg-rose-700 dark:bg-rose-600 text-white border-rose-800/60 dark:border-rose-400/60 shadow-sm'
                      : 'bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 border-rose-300/60 dark:border-rose-700/50'
                  }`}
                >
                  {isSuperHardLevel ? (compactSuperBadge ? 'SUPER' : 'SUPER-HARD') : 'HARD'}
                </span>
              )}
            </div>

            {/* Hearts or Zen badge */}
            <div className="flex items-center gap-1">
              {playStyle === 'classic' ? (
                <div className="flex items-center gap-1" title={`${hearts} lives remaining`}>
                  {Array.from({ length: maxHearts }).map((_, i) => (
                    <Heart
                      key={i}
                      className={`w-4 h-4 transition-all duration-300 ${
                        i < hearts
                          ? 'text-rose-500 fill-rose-500 scale-100'
                          : 'text-slate-300 dark:text-slate-600 scale-75'
                      }`}
                    />
                  ))}
                </div>
              ) : (
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-semibold">
                  🐾 Zen Mode
                </span>
              )}
            </div>

            {/* Timer */}
            <span className="font-mono font-bold text-slate-600 dark:text-slate-300 text-xs tracking-wider">
              ⏱️ {formatTime(timerSeconds)}
            </span>
          </div>
        </div>

        {/* Active Logical Hint Overlay covering the menu area */}
        {activeHint && (
          <div
            data-testid="hint-overlay"
            className="absolute inset-0 z-20 flex flex-col justify-start p-3 rounded-2xl bg-white dark:bg-slate-950 border border-amber-400/60 shadow-md backdrop-blur-md animate-pop-in overflow-y-auto"
          >
            <div className="flex items-start justify-between gap-1.5">
              <div className="flex items-start gap-1.5 flex-1 min-w-0">
                <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-300 shrink-0 mt-0.5 fill-amber-400" />
                <div className="flex-1 min-w-0">
                  <p className="text-base font-bold text-slate-950 dark:text-white leading-snug">
                    {activeHint.explanation.includes("doesn't belong here") ? 'Remove this cat.' : activeHint.type === 'placement' ? 'Place a cat here.' : 'Mark this square with an X.'}
                  </p>
                  <button type="button" onClick={() => setExplanationHint(activeHint)} className="mt-1 text-sm text-slate-950 dark:text-white">
                    <span className="font-bold underline underline-offset-2">Why?</span> Row {activeHint.row + 1}, column {activeHint.col + 1}
                  </button>
                  {explanationHint === activeHint && <HintWindow onClose={() => setExplanationHint(null)}>
                    {activeHint.steps?.length ? <ol className="space-y-4 pl-5 list-decimal">
                      {activeHint.steps.map((step, idx) => <li key={idx}><FormattedHintText text={step} theme={theme} /></li>)}
                    </ol> : <p><FormattedHintText text={activeHint.explanation} theme={theme} /></p>}
                  </HintWindow>}
                </div>
              </div>
              <button
                type="button"
                onClick={onDismissHint}
                className="p-2 min-w-10 min-h-10 rounded-lg hover:bg-amber-400/20 text-amber-900 dark:text-amber-100 transition-colors shrink-0"
                aria-label="Dismiss Hint"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
