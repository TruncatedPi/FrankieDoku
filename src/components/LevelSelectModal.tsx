import React, { useEffect, useState, useRef } from 'react';
import { X, Star, Lock, CheckCircle2, Trophy, Clock } from 'lucide-react';
import { LevelProgress } from '../engine/types';
import { CAMPAIGNS, CAMPAIGN_LEVELS, getCampaignForLevel, type CampaignLevel, type CampaignTier } from '../data/levels';
import { getLevelDifficultyInfo } from '../engine/difficulty';

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
  const tabListRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!isOpen) return;
    const campaign = getCampaignForLevel(currentLevelId) ?? CAMPAIGNS[0];
    setSelectedCampaignId(campaign.id);
    setSelectedTier(campaign.levels.find(level => level.id === currentLevelId)?.tier ?? 'Kitten');
  }, [isOpen, currentLevelId]);
  useEffect(() => {
    if (!isOpen) return;
    const activeTab = tabListRef.current?.querySelector<HTMLElement>('[role="tab"][aria-selected="true"]');
    activeTab?.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'smooth' });
  }, [isOpen, selectedCampaignId]);
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
        <div className="flex flex-col gap-1.5 shrink-0">
          <div
            ref={tabListRef}
            role="tablist"
            aria-label="Campaigns"
            className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100/80 dark:bg-white/5 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory"
          >
            {CAMPAIGNS.map(campaign => {
              const isSelected = campaign.id === selectedCampaign.id;
              const campaignCompleted = campaign.levels.filter(lvl => progressMap[lvl.id]?.completed).length;
              const isAllDone = campaignCompleted === campaign.levelCount;

              return (
                <button
                  key={campaign.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  aria-label={`${campaign.name} (${campaign.startLevel}–${campaign.endLevel})`}
                  onClick={() => setSelectedCampaignId(campaign.id)}
                  className={`snap-start shrink-0 rounded-xl px-3 py-1.5 text-xs font-bold transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-amber-500 text-white shadow-sm ring-1 ring-amber-600/30 dark:ring-amber-400/40'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-white/10'
                  }`}
                >
                  <span>{campaign.name} ({campaign.startLevel}–{campaign.endLevel})</span>
                  {isAllDone ? (
                    <span
                      aria-hidden="true"
                      className={`text-[10px] px-1 py-0.5 rounded-full font-bold leading-none ${
                        isSelected
                          ? 'bg-amber-600 text-amber-100'
                          : 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400'
                      }`}
                    >
                      ✓
                    </span>
                  ) : campaignCompleted > 0 ? (
                    <span
                      aria-hidden="true"
                      className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono font-medium leading-none ${
                        isSelected
                          ? 'bg-amber-600 text-amber-100'
                          : 'bg-slate-200 dark:bg-white/10 text-slate-500 dark:text-slate-400'
                      }`}
                    >
                      {campaignCompleted}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1 pt-0.5">
            <span aria-live="polite">
              {selectedCampaign.name}: {completedCount} / {selectedCampaign.levelCount} completed
            </span>
            <span className="font-mono text-[11px] font-semibold text-amber-600 dark:text-amber-400">
              {Math.round((completedCount / selectedCampaign.levelCount) * 100)}%
            </span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-white/10 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-amber-500 h-full rounded-full transition-all duration-300 ease-out"
              style={{ width: `${(completedCount / selectedCampaign.levelCount) * 100}%` }}
            />
          </div>
        </div>
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
            const diffInfo = getLevelDifficultyInfo(lvl.id);

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
                <div className="flex items-center justify-between gap-1">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="font-bold text-sm text-slate-800 dark:text-slate-100 truncate">
                      Level {lvl.levelNumber}
                    </span>
                    {lvl.allowDisjointRegions && (
                      <span
                        data-testid={`level-disjoint-badge-${lvl.levelNumber}`}
                        title="Contains one or more disjointed (split) territories"
                        className="shrink-0 px-1.5 py-0.5 rounded bg-violet-100 dark:bg-violet-950/70 text-violet-700 dark:text-violet-300 border border-violet-300/60 dark:border-violet-700/50 text-[9px] font-extrabold tracking-wider uppercase leading-none"
                      >
                        SPLIT
                      </span>
                    )}
                    {diffInfo?.isHard && (
                      <span
                        data-testid={`level-hard-badge-${lvl.levelNumber}`}
                        title={`Hard for ${lvl.size}×${lvl.size} in Campaign ${diffInfo.campaignNumber} (score ${diffInfo.score}, threshold ${diffInfo.hardThresholdForSize}, campaign avg ${diffInfo.averageForSize.toFixed(0)})`}
                        className="shrink-0 px-1.5 py-0.5 rounded bg-rose-100 dark:bg-rose-950/70 text-rose-700 dark:text-rose-300 border border-rose-300/60 dark:border-rose-700/50 text-[9px] font-extrabold tracking-wider uppercase leading-none"
                      >
                        HARD
                      </span>
                    )}
                  </div>
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 fill-emerald-100 dark:fill-emerald-950 shrink-0" />
                  ) : (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-slate-400 font-mono font-medium shrink-0">
                      {lvl.size}x{lvl.size}
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                  {lvl.name}
                </p>

                {/* Best Time if completed */}
                {isCompleted && prog?.bestTimeSeconds !== undefined ? (
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
