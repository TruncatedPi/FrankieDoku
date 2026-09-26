import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, Clock, Heart, ArrowRight, RotateCcw, Sparkles, Crown, Play } from 'lucide-react';
import { CatBreed } from '../engine/types';
import { CatIcon } from './CatIcon';
import type { TierMilestone } from '../data/levels';

interface VictoryModalProps {
  isOpen: boolean;
  timeSeconds: number;
  bestTimeSeconds?: number;
  heartsRemaining: number;
  maxHearts: number;
  levelNumber?: number;
  hasNextLevel: boolean;
  onNextLevel: () => void;
  onReplay: () => void;
  onClose: () => void;
  catBreed: CatBreed;
  tierMilestone?: TierMilestone | null;
  onEnterFreePlay?: () => void;
}

export const VictoryModal: React.FC<VictoryModalProps> = ({
  isOpen,
  timeSeconds,
  bestTimeSeconds,
  heartsRemaining,
  maxHearts,
  levelNumber,
  hasNextLevel,
  onNextLevel,
  onReplay,
  onClose,
  catBreed,
  tierMilestone = null,
  onEnterFreePlay,
}) => {
  useEffect(() => {
    if (isOpen) {
      if (tierMilestone?.isFinalCampaignComplete) {
        // Grand celebration double burst for completing all 100 levels
        confetti({
          particleCount: 120,
          spread: 90,
          origin: { y: 0.5 },
          colors: ['#f59e0b', '#ec4899', '#3b82f6', '#10b981', '#fbbf24', '#8b5cf6'],
        });
        const timer = setTimeout(() => {
          confetti({
            particleCount: 80,
            angle: 60,
            spread: 60,
            origin: { x: 0.1, y: 0.6 },
            colors: ['#f59e0b', '#ec4899', '#3b82f6', '#fbbf24'],
          });
          confetti({
            particleCount: 80,
            angle: 120,
            spread: 60,
            origin: { x: 0.9, y: 0.6 },
            colors: ['#10b981', '#3b82f6', '#8b5cf6', '#fbbf24'],
          });
        }, 250);
        return () => clearTimeout(timer);
      } else if (tierMilestone?.isTierComplete) {
        // Joyful celebratory confetti for completing a campaign set
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#fb923c', '#f43f5e', '#38bdf8', '#4ade80', '#facc15', '#a855f7'],
        });
      } else {
        // Standard level victory confetti
        confetti({
          particleCount: 70,
          spread: 65,
          origin: { y: 0.6 },
          colors: ['#fb923c', '#f43f5e', '#38bdf8', '#4ade80', '#facc15'],
        });
      }
    }
  }, [isOpen, tierMilestone]);

  if (!isOpen) return null;

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${rem.toString().padStart(2, '0')}`;
  };

  const isNewBest = bestTimeSeconds ? timeSeconds <= bestTimeSeconds : true;
  const isFinalCampaign = Boolean(tierMilestone?.isFinalCampaignComplete);
  const isTierComplete = Boolean(tierMilestone?.isTierComplete && !isFinalCampaign);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Victory Celebration"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 pt-[max(1rem,calc(env(safe-area-inset-top)+0.5rem))] pb-[max(1rem,calc(env(safe-area-inset-bottom)+0.5rem))] pl-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))] bg-slate-900/60 backdrop-blur-sm animate-pop-in"
    >
      <div className="relative w-full max-w-sm max-h-[90vh] overflow-y-auto rounded-3xl bg-white dark:bg-cozy-darkCard p-6 shadow-2xl border border-amber-200 dark:border-white/10 text-center flex flex-col items-center gap-3.5">
        {/* Cute Victory Cat */}
        <div className="relative w-24 h-24 -mt-12 bg-amber-100 dark:bg-amber-950/60 rounded-full p-3 shadow-lg border-4 border-white dark:border-cozy-darkCard shrink-0">
          <CatIcon breed={catBreed} expression="happy" />
          <div className="absolute -top-1 -right-1 p-1.5 bg-amber-400 rounded-full shadow text-white">
            {isFinalCampaign ? (
              <Crown className="w-4 h-4 fill-white" />
            ) : (
              <Sparkles className="w-4 h-4 fill-white" />
            )}
          </div>
        </div>

        {/* Title */}
        <div>
          {isFinalCampaign ? (
            <>
              <h2 className="text-2xl font-black text-amber-950 dark:text-amber-100 flex items-center justify-center gap-1.5">
                Grand Champion! 👑
              </h2>
              <p className="text-xs text-amber-700 dark:text-amber-300 font-bold mt-0.5">
                All 100 Campaign Levels Conquered!
              </p>
            </>
          ) : isTierComplete ? (
            <>
              <h2 className="text-xl sm:text-2xl font-black text-amber-950 dark:text-amber-100 flex items-center justify-center gap-1.5">
                Set Completed! 🎉
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {levelNumber ? `Level ${levelNumber} Completed!` : 'Puzzle Solved!'}
              </p>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 flex items-center justify-center gap-2">
                {catBreed === 'frankie' ? 'Paws-itively Amazing! 🐾' : 'Purr-fect! 🐾'}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {levelNumber ? `Level ${levelNumber} Completed!` : 'Puzzle Solved!'}
              </p>
            </>
          )}
        </div>

        {/* Campaign Final Celebration Banner */}
        {isFinalCampaign && (
          <div className="w-full p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-rose-500/15 to-purple-500/15 border-2 border-amber-400 dark:border-amber-400/60 flex flex-col items-center gap-1.5 shadow-xs">
            <div className="flex items-center gap-1.5 text-amber-900 dark:text-amber-100 font-extrabold text-sm sm:text-base">
              <Crown className="w-5 h-5 text-amber-500 fill-amber-400 shrink-0" />
              <span>Grandmaster Set Complete!</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
              Congratulations! You have mastered every single territory, Aloof cat, and logic puzzle from Kitten to Grandmaster.
            </p>
            <div className="mt-1 px-3 py-1 rounded-xl bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-200 text-xs font-bold border border-amber-300/80">
              🌟 100 / 100 Campaign Levels Mastered 🌟
            </div>
          </div>
        )}

        {/* Intermediate Campaign Set Completed Pop-up Card */}
        {isTierComplete && tierMilestone && (
          <div className="w-full p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-emerald-500/15 to-sky-500/15 border-2 border-amber-400 dark:border-amber-400/60 flex flex-col items-center gap-1.5 shadow-xs">
            <div className="flex items-center gap-1.5 text-amber-900 dark:text-amber-100 font-extrabold text-sm sm:text-base">
              <Trophy className="w-5 h-5 text-amber-500 fill-amber-400 shrink-0" />
              <span>{tierMilestone.completedTier.name} Set Complete!</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
              You've completed the <strong className="text-amber-700 dark:text-amber-300">{tierMilestone.completedTier.name}</strong> set!
            </p>
            {tierMilestone.nextTier && (
              <div className="mt-1 pt-2 border-t border-amber-200/60 dark:border-white/10 w-full flex flex-col items-center gap-1">
                <span className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold">
                  Now Starting New Set
                </span>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-200 font-bold text-xs sm:text-sm border border-amber-300/80">
                  <span>{tierMilestone.nextTier.badge}</span>
                  <span>{tierMilestone.nextTier.name} Set</span>
                  <span className="text-[11px] font-normal text-amber-700 dark:text-amber-300">
                    ({tierMilestone.nextTier.gridSizes})
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Stats Cards */}
        <div className="w-full grid grid-cols-2 gap-2.5">
          {/* Completion Time */}
          <div className="p-3 rounded-2xl bg-amber-50/80 dark:bg-white/5 border border-amber-100 dark:border-white/10 flex flex-col items-center">
            <div className="flex items-center gap-1 text-amber-700 dark:text-amber-300 text-xs font-semibold">
              <Clock className="w-3.5 h-3.5" />
              <span>Time</span>
            </div>
            <span className="text-lg font-bold font-mono text-slate-800 dark:text-slate-100 mt-1">
              {formatTime(timeSeconds)}
            </span>
            {isNewBest && (
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold mt-0.5">
                🌟 New Best!
              </span>
            )}
          </div>

          {/* Hearts Remaining */}
          <div className="p-3 rounded-2xl bg-rose-50/80 dark:bg-white/5 border border-rose-100 dark:border-white/10 flex flex-col items-center">
            <div className="flex items-center gap-1 text-rose-700 dark:text-rose-300 text-xs font-semibold">
              <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
              <span>Hearts</span>
            </div>
            <div className="flex items-center gap-1 mt-1.5">
              {Array.from({ length: maxHearts }).map((_, i) => (
                <Heart
                  key={i}
                  className={`w-4 h-4 ${
                    i < heartsRemaining
                      ? 'text-rose-500 fill-rose-500'
                      : 'text-slate-300 dark:text-slate-600'
                  }`}
                />
              ))}
            </div>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 font-medium">
              {heartsRemaining === maxHearts ? 'Flawless!' : `${heartsRemaining}/${maxHearts} Left`}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full flex flex-col gap-2 mt-1">
          {isFinalCampaign ? (
            <button
              type="button"
              onClick={onEnterFreePlay || onClose}
              className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 active:scale-95 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Enter Free Play Mode</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : isTierComplete && tierMilestone?.nextTier ? (
            <button
              type="button"
              onClick={onNextLevel}
              className="w-full py-3 px-4 rounded-2xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>Start {tierMilestone.nextTier.name} Set (Level {tierMilestone.nextLevelNumber})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : hasNextLevel ? (
            <button
              type="button"
              onClick={onNextLevel}
              className="w-full py-3 px-4 rounded-2xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>Next Level</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : null}

          <div className="w-full flex gap-2">
            <button
              type="button"
              onClick={onReplay}
              className="flex-1 py-2.5 px-3 rounded-2xl bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/15 text-slate-700 dark:text-slate-200 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Replay</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 px-3 rounded-2xl bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/15 text-slate-700 dark:text-slate-200 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>{isFinalCampaign ? 'Free Play' : 'Close'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
