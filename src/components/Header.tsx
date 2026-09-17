import React from 'react';
import { GameMode, PlayStyle, CatBreed, HintResult } from '../engine/types';
import { Volume2, VolumeX, Settings, Heart, Calendar, Grid, Download, Users, RefreshCw, Sparkles, X } from 'lucide-react';
import { CatIcon } from './CatIcon';
import { APP_VERSION } from '../utils/version';

interface HeaderProps {
  gameMode: GameMode;
  playStyle: PlayStyle;
  levelNumber?: number;
  levelName?: string;
  gridSize: number;
  hearts: number;
  maxHearts: number;
  timerSeconds: number;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenLevels: () => void;
  onOpenDaily: () => void;
  onOpenSettings: () => void;
  onOpenInstall: () => void;
  onOpenTwoPlayer: () => void;
  onNewFreePlay: () => void;
  catBreed?: CatBreed;
  activeHint?: HintResult | null;
  onDismissHint?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  gameMode,
  playStyle,
  levelNumber,
  levelName,
  gridSize,
  hearts,
  maxHearts,
  timerSeconds,
  soundEnabled,
  onToggleSound,
  onOpenLevels,
  onOpenDaily,
  onOpenSettings,
  onOpenInstall,
  onOpenTwoPlayer,
  onNewFreePlay,
  catBreed,
  activeHint,
  onDismissHint,
}) => {
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
    <header className="w-full max-w-[min(94vw,500px)] mx-auto pt-2 pb-1 sm:pt-3 sm:pb-2 px-3 flex flex-col gap-1.5 sm:gap-2 select-none">
      {/* Top Bar: Brand & Quick Action Buttons */}
      <div className="flex items-center justify-between">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-2xl bg-amber-100 dark:bg-amber-900/40 p-1 shadow-sm border border-amber-300/40 flex items-center justify-center">
            <CatIcon breed={catBreed || 'frankie'} expression="happy" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 leading-none mb-0.5">
              <h1 className="text-xl font-bold tracking-tight text-amber-950 dark:text-amber-100 flex items-center gap-1">
                SchroDoku!
              </h1>
              <span
                data-testid="app-version"
                className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-md bg-amber-200/80 dark:bg-amber-900/50 text-amber-950 dark:text-amber-200 border border-amber-300/50 shadow-xs"
              >
                {APP_VERSION}
              </span>
            </div>
            <span className="text-[10px] text-amber-700/80 dark:text-amber-300/80 font-medium">
              100% Ad-Free & Cozy
            </span>
          </div>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onOpenInstall}
            className="p-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-800 dark:text-amber-200 transition-colors"
            title="Install on iPhone / Android"
            aria-label="Install App"
          >
            <Download className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={onToggleSound}
            className="p-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-800 dark:text-amber-200 transition-colors"
            title={soundEnabled ? 'Mute' : 'Unmute'}
            aria-label="Toggle Sound"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button
            type="button"
            onClick={onOpenSettings}
            className="p-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-800 dark:text-amber-200 transition-colors"
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
          <div className="flex items-center justify-between px-2 py-1.5 rounded-2xl bg-white/70 dark:bg-cozy-darkCard/70 backdrop-blur-sm border border-slate-200/40 dark:border-white/5 shadow-sm text-sm">
            {/* Mode & Level name */}
            <span className="font-bold text-slate-800 dark:text-slate-100 truncate max-w-[170px]">
              {getModeTitle()}
            </span>

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
            className="absolute inset-0 z-20 flex flex-col justify-start p-2 rounded-2xl bg-gradient-to-r from-amber-50/95 via-orange-50/95 to-amber-50/95 dark:from-amber-950/95 dark:via-stone-900/95 dark:to-amber-950/95 border border-amber-400/60 shadow-md backdrop-blur-md animate-pop-in overflow-y-auto"
          >
            <div className="flex items-start justify-between gap-1.5">
              <div className="flex items-start gap-1.5 flex-1 min-w-0">
                <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-300 shrink-0 mt-0.5 fill-amber-400" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-amber-950 dark:text-amber-100 leading-tight">
                    {activeHint.explanation}
                  </p>
                  {activeHint.steps && activeHint.steps.length > 0 && (
                    <ol className="mt-1 space-y-0.5 pl-3.5 text-[10px] sm:text-[11px] font-medium text-amber-900/90 dark:text-amber-200/90 list-decimal list-outside leading-tight">
                      {activeHint.steps.map((step, idx) => (
                        <li key={idx}>{step}</li>
                      ))}
                    </ol>
                  )}
                </div>
              </div>
              <button
                type="button"
                onClick={onDismissHint}
                className="p-1 rounded-lg hover:bg-amber-400/20 text-amber-900 dark:text-amber-100 transition-colors shrink-0"
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
