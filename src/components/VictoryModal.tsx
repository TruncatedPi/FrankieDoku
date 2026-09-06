import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, Clock, Heart, ArrowRight, RotateCcw, Share2, Sparkles } from 'lucide-react';
import { CatBreed } from '../engine/types';
import { CatIcon } from './CatIcon';

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
}) => {
  useEffect(() => {
    if (isOpen) {
      // Trigger joyful celebratory confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#fb923c', '#f43f5e', '#38bdf8', '#4ade80', '#facc15'],
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${rem.toString().padStart(2, '0')}`;
  };

  const isNewBest = bestTimeSeconds ? timeSeconds <= bestTimeSeconds : true;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-pop-in">
      <div className="relative w-full max-w-sm rounded-3xl bg-white dark:bg-cozy-darkCard p-6 shadow-2xl border border-amber-200 dark:border-white/10 text-center flex flex-col items-center gap-4">
        {/* Cute Victory Cat */}
        <div className="relative w-24 h-24 -mt-12 bg-amber-100 dark:bg-amber-950/60 rounded-full p-3 shadow-lg border-4 border-white dark:border-cozy-darkCard">
          <CatIcon breed={catBreed} expression="happy" />
          <div className="absolute -top-1 -right-1 p-1 bg-amber-400 rounded-full shadow text-white">
            <Sparkles className="w-4 h-4 fill-white" />
          </div>
        </div>

        {/* Title */}
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 flex items-center justify-center gap-2">
            {catBreed === 'frankie' ? 'Paws-itively Amazing! 🐾' : 'Purr-fect! 🐾'}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {levelNumber ? `Level ${levelNumber} Completed!` : 'Puzzle Solved!'}
          </p>
        </div>

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
        <div className="w-full flex flex-col gap-2 mt-2">
          {hasNextLevel ? (
            <button
              type="button"
              onClick={onNextLevel}
              className="w-full py-3 px-4 rounded-2xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all"
            >
              <span>Next Level</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : null}

          <div className="w-full flex gap-2">
            <button
              type="button"
              onClick={onReplay}
              className="flex-1 py-2.5 px-3 rounded-2xl bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/15 text-slate-700 dark:text-slate-200 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Replay</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 px-3 rounded-2xl bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/15 text-slate-700 dark:text-slate-200 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>Close</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
