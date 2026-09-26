import React, { useState } from 'react';
import { X, Star, Lock, CheckCircle2, Trophy, Clock } from 'lucide-react';
import { LevelProgress } from '../engine/types';
import { CAMPAIGN_LEVELS, CampaignLevel } from '../data/levels';

interface LevelSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLevelId: string;
  progressMap: Record<string, LevelProgress>;
  onSelectLevel: (level: CampaignLevel) => void;
}

type TierName = 'Kitten' | 'Playful' | 'Clever' | 'Master' | 'Explorer' | 'Adventurer' | 'Champion' | 'Legend' | 'Grandmaster' | 'Phantom' | 'Eclipse';

const TIERS: { name: TierName; label: string; badge: string }[] = [
  { name: 'Kitten', label: 'Tier 1: Kitten (4x4-5x5)', badge: '🐾' },
  { name: 'Playful', label: 'Tier 2: Playful (6x6-7x7)', badge: '🧶' },
  { name: 'Clever', label: 'Tier 3: Clever (8x8-9x9)', badge: '😼' },
  { name: 'Master', label: 'Tier 4: Master (10x10)', badge: '👑' },
  { name: 'Explorer', label: 'Tier 5: Explorer (8x8)', badge: '🗺️' },
  { name: 'Adventurer', label: 'Tier 6: Adventurer (9x9)', badge: '⚔️' },
  { name: 'Champion', label: 'Tier 7: Champion (10x10)', badge: '🏆' },
  { name: 'Legend', label: 'Tier 8: Legend (11x11)', badge: '🌟' },
  { name: 'Grandmaster', label: 'Tier 9: Grandmaster (12x12)', badge: '💎' },
  { name: 'Phantom', label: 'Tier 10: Phantom (1 Void/Line)', badge: '👻' },
  { name: 'Eclipse', label: 'Tier 11: Eclipse (2 Voids/Line)', badge: '🌑' },
];

export const LevelSelectModal: React.FC<LevelSelectModalProps> = ({
  isOpen,
  onClose,
  currentLevelId,
  progressMap,
  onSelectLevel,
}) => {
  const [selectedTier, setSelectedTier] = useState<TierName>('Kitten');

  if (!isOpen) return null;

  const filteredLevels = (CAMPAIGN_LEVELS || []).filter((lvl) => lvl.tier === selectedTier);

  const formatTime = (secs?: number) => {
    if (!secs) return '--:--';
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${mins}:${rem.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-pop-in">
      <div className="relative w-full max-w-md max-h-[85vh] rounded-3xl bg-white dark:bg-cozy-darkCard p-5 shadow-2xl border border-amber-200 dark:border-white/10 flex flex-col gap-3.5">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">
                Campaign Levels
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                120 Crafted Logic Puzzles
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-white/10 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tier Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100/80 dark:bg-white/5 text-xs font-semibold overflow-x-auto no-scrollbar scroll-smooth">
          {TIERS.map((tier) => (
            <button
              key={tier.name}
              type="button"
              onClick={() => setSelectedTier(tier.name)}
              className={`py-1.5 px-3 rounded-xl transition-all flex items-center gap-1.5 shrink-0 ${
                selectedTier === tier.name
                  ? 'bg-white dark:bg-amber-600 text-amber-900 dark:text-white shadow-sm font-bold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100'
              }`}
            >
              <span className="text-sm leading-none">{tier.badge}</span>
              <span className="text-[11px] whitespace-nowrap">{tier.name}</span>
            </button>
          ))}
        </div>

        {/* Levels Grid */}
        <div className="flex-1 overflow-y-auto pr-1 py-1 grid grid-cols-2 gap-2.5 max-h-[50vh]">
          {filteredLevels.map((lvl) => {
            const prog = progressMap[lvl.id];
            const isCompleted = Boolean(prog?.completed);
            const isCurrent = lvl.id === currentLevelId;

            return (
              <button
                key={lvl.id}
                type="button"
                onClick={() => {
                  onSelectLevel(lvl);
                  onClose();
                }}
                className={`p-3 rounded-2xl border text-left flex flex-col gap-1 transition-all relative ${
                  isCurrent
                    ? 'ring-2 ring-amber-400 bg-amber-50/90 dark:bg-amber-950/40 border-amber-300'
                    : isCompleted
                    ? 'bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-200/60 dark:border-emerald-800/40 hover:bg-emerald-50'
                    : 'bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 hover:border-amber-300 hover:bg-amber-50/30'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-slate-800 dark:text-slate-100">
                    Level {lvl.levelNumber}
                  </span>
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 fill-emerald-100 dark:fill-emerald-950" />
                  ) : (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-slate-400 font-mono font-medium">
                      {lvl.size}x{lvl.size}
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                  {lvl.name}
                </p>

                {/* Best Time if completed */}
                {isCompleted && prog?.bestTimeSeconds ? (
                  <div className="flex items-center gap-1 text-[10px] text-emerald-700 dark:text-emerald-300 font-mono mt-0.5">
                    <Clock className="w-3 h-3" />
                    <span>Best: {formatTime(prog.bestTimeSeconds)}</span>
                  </div>
                ) : null}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
