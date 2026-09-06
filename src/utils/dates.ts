import type { DailyProgress } from '../engine/types';

export function localDateKey(date = new Date()): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}
export function validDateKey(value: unknown): value is string {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value;
}
export function offsetDate(key: string, days: number): string {
  const date = new Date(`${key}T00:00:00Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}
export function dailyStreaks(progress: Record<string, DailyProgress>, today = localDateKey()) {
  const dates = Object.keys(progress).filter(date => progress[date].completed && date <= today).sort();
  let maxDailyStreak = 0, count = 0, previous = '';
  for (const date of dates) {
    count = previous && offsetDate(previous, 1) === date ? count + 1 : 1;
    maxDailyStreak = Math.max(maxDailyStreak, count);
    previous = date;
  }
  const currentDailyStreak = previous === today || previous === offsetDate(today, -1) ? count : 0;
  return { currentDailyStreak, maxDailyStreak };
}
