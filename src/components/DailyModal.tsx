import React from 'react';
import { X, Calendar, Flame, CheckCircle2, Play, Clock } from 'lucide-react';
import { DailyProgress, GameStats } from '../engine/types';

interface DailyModalProps {
  isOpen: boolean;
  onClose: () => void;
  stats: GameStats;
  dailyProgressMap: Record<string, DailyProgress>;
  onSelectDate: (dateString: string) => void;
}

export const DailyModal: React.FC<DailyModalProps> = ({
  isOpen,
  onClose,
  stats,
  dailyProgressMap,
  onSelectDate,
}) => {
  if (!isOpen) return null;

  const today = new Date().toISOString().split('T')[0];

  // Get past 7 days
  const pastDays: { dateStr: string; dayName: string; dayNum: number }[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
    const dayNum = d.getDate();
    pastDays.push({ dateStr, dayName, dayNum });
  }

  const formatTime = (secs?: number) => {
    if (!secs) return '--:--';
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${mins}:${rem.toString().padStart(2, '0')}`;
  };

  const todayCompleted = Boolean(dailyProgressMap[today]?.completed);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-pop-in">
      <div className="relative w-full max-w-sm rounded-3xl bg-white dark:bg-cozy-darkCard p-6 shadow-2xl border border-amber-200 dark:border-white/10 flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">
                Daily Puzzles
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                A fresh brain teaser every day
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

        {/* Streak Counter Card */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-300/40 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500 text-white shadow-sm">
              <Flame className="w-5 h-5 fill-amber-300 text-amber-100" />
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                Daily Streak
              </div>
              <div className="text-xl font-bold text-amber-900 dark:text-amber-100 leading-none mt-0.5">
                {stats.currentDailyStreak} Day{stats.currentDailyStreak === 1 ? '' : 's'}
              </div>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-slate-400 block">Best Streak</span>
            <span className="text-sm font-bold text-slate-700 dark:text-slate-200">
              {stats.maxDailyStreak} Days
            </span>
          </div>
        </div>

        {/* 7-Day History Selector */}
        <div>
          <span className="text-xs font-bold text-slate-700 dark:text-slate-200 block mb-2">
            Recent Challenges
          </span>
          <div className="grid grid-cols-7 gap-1">
            {pastDays.reverse().map((day) => {
              const prog = dailyProgressMap[day.dateStr];
              const isDone = Boolean(prog?.completed);
              const isToday = day.dateStr === today;

              return (
                <button
                  key={day.dateStr}
                  type="button"
                  onClick={() => {
                    onSelectDate(day.dateStr);
                    onClose();
                  }}
                  className={`p-1.5 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                    isToday
                      ? 'ring-2 ring-amber-400 bg-amber-50 dark:bg-amber-950/40 border-amber-300 font-bold'
                      : isDone
                      ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300/60'
                      : 'bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 hover:border-amber-300'
                  }`}
                  title={`${day.dateStr} ${isDone ? '(Completed)' : ''}`}
                >
                  <span className="text-[9px] text-slate-400 font-medium">
                    {day.dayName}
                  </span>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
                    {day.dayNum}
                  </span>
                  {isDone ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 fill-emerald-100 dark:fill-emerald-950" />
                  ) : (
                    <div className="w-3.5 h-3.5 rounded-full border border-dashed border-slate-300 dark:border-slate-600" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Play Today CTA */}
        <button
          type="button"
          onClick={() => {
            onSelectDate(today);
            onClose();
          }}
          className="w-full py-3 px-4 rounded-2xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all mt-1"
        >
          <Play className="w-4 h-4 fill-white" />
          <span>{todayCompleted ? "Replay Today's Puzzle" : "Play Today's Challenge"}</span>
        </button>
      </div>
    </div>
  );
};
