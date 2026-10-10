import React, { useEffect, useState } from 'react';
import { X, Star, Lock, CheckCircle2, Trophy, Clock } from 'lucide-react';
import { LevelProgress } from '../engine/types';
import { CAMPAIGNS, CAMPAIGN_LEVELS, getCampaignForLevel, type CampaignLevel, type CampaignTier } from '../data/levels';

interface LevelSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLevelId: string;
  progressMap: Record<string, LevelProgress>;
  onSelectLevel: (level: CampaignLevel) => void;
}

export const LevelSelectModal: React.FC<LevelSelectModalProps> = ({
  isOpen,
  onClose,
  currentLevelId,
  progressMap,
  onSelectLevel,
}) => {
  const [selectedCampaignId, setSelectedCampaignId] = useState(() => getCampaignForLevel(currentLevelId)?.id ?? CAMPAIGNS[0].id);
  const [selectedTier, setSelectedTier] = useState<CampaignTier>('Kitten');
  useEffect(() => {
    if (!isOpen) return;
    const campaign = getCampaignForLevel(currentLevelId) ?? CAMPAIGNS[0];
    setSelectedCampaignId(campaign.id);
    setSelectedTier(campaign.levels.find(level => level.id === currentLevelId)?.tier ?? 'Kitten');
  }, [isOpen, currentLevelId]);
  const selectedCampaign = CAMPAIGNS.find(campaign => campaign.id === selectedCampaignId) ?? CAMPAIGNS[0];
  const completedCount = selectedCampaign.levels.filter(level => progressMap[level.id]?.completed).length;

  if (!isOpen) return null;

  const filteredLevels = selectedCampaign.levels.filter(lvl => lvl.tier === selectedTier);

  const formatTime = (secs?: number) => {
    if (secs === undefined) return '--:--';
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${mins}:${rem.toString().padStart(2, '0')}`;
  };

  return (
    <div role="dialog" aria-modal="true" aria-label="Campaign Levels" className="fixed inset-0 z-50 flex items-center justify-center p-4 pt-[max(1rem,calc(env(safe-area-inset-top)+0.5rem))] pb-[max(1rem,calc(env(safe-area-inset-bottom)+0.5rem))] pl-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))] bg-slate-900/60 backdrop-blur-sm animate-pop-in">
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
                {CAMPAIGN_LEVELS.length} Puzzles · {CAMPAIGNS.length} Campaigns
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close Campaign Levels"
            className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-white/10 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Campaign overlay selector: only the selected pack is displayed. */}
        <div role="tablist" aria-label="Campaigns" className="flex gap-2 overflow-x-auto pb-1 shrink-0">
          {CAMPAIGNS.map(campaign => <button
            key={campaign.id} type="button" role="tab" aria-selected={campaign.id === selectedCampaign.id}
            onClick={() => setSelectedCampaignId(campaign.id)}
            className={`shrink-0 rounded-xl border px-3 py-2 text-xs font-bold ${campaign.id === selectedCampaign.id ? 'bg-amber-500 text-white border-amber-600' : 'border-slate-200 dark:border-white/10'}`}
          >{campaign.name} ({campaign.startLevel}–{campaign.endLevel})</button>)}
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400" aria-live="polite">
          {selectedCampaign.name}: {completedCount} / {selectedCampaign.levelCount} completed
        </p>
        {/* Tier Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100/80 dark:bg-white/5 text-xs font-semibold overflow-x-auto no-scrollbar scroll-smooth">
          {selectedCampaign.tiers.map((tier) => (
            <button
              key={tier.name}
              type="button"
              aria-pressed={selectedTier === tier.name}
              onClick={() => setSelectedTier(tier.name)}
              className={`py-1.5 px-3 rounded-xl transition-all flex items-center gap-1.5 shrink-0 ${
                selectedTier === tier.name
                  ? 'bg-white dark:bg-amber-600 text-amber-900 dark:text-white shadow-sm font-bold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100'
              }`}
            >
              <span aria-hidden="true" className="text-sm leading-none">{tier.badge}</span>
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
