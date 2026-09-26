/**
 * Calculates day of year (1-366) for a given calendar year, month (1-12), and day (1-31).
 */
export function getDayOfYear(year: number, month: number, day: number): number {
  const isLeap = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  const daysBeforeMonth = [
    0,
    31,
    31 + (isLeap ? 29 : 28),
    31 + (isLeap ? 29 : 28) + 31,
    31 + (isLeap ? 29 : 28) + 31 + 30,
    31 + (isLeap ? 29 : 28) + 31 + 30 + 31,
    31 + (isLeap ? 29 : 28) + 31 + 30 + 31 + 30,
    31 + (isLeap ? 29 : 28) + 31 + 30 + 31 + 30 + 31,
    31 + (isLeap ? 29 : 28) + 31 + 30 + 31 + 30 + 31 + 31,
    31 + (isLeap ? 29 : 28) + 31 + 30 + 31 + 30 + 31 + 31 + 30,
    31 + (isLeap ? 29 : 28) + 31 + 30 + 31 + 30 + 31 + 31 + 30 + 31,
    31 + (isLeap ? 29 : 28) + 31 + 30 + 31 + 30 + 31 + 31 + 30 + 31 + 30,
  ];
  return daysBeforeMonth[month - 1] + day;
}

/**
 * Formats a version string in the form: v2.YYMM.DDHH
 * - YY: 2-digit year (e.g. '26' for 2026)
 * - MM: 2-digit month with leading zero ('01'-'12')
 * - DD: 2-digit day of month with leading zero ('01'-'31')
 * - HH: 24-hour time with leading zero in local (UTC-7) time ('00'-'23')
 * 
 * Supports Date objects and ISO date strings (e.g. from git log %cI: "2026-09-26T12:55:45-07:00" or UTC "2026-09-26T19:55:45Z").
 */
export function formatAppVersion(dateOrIso: Date | string = new Date()): string {
  let date: Date;

  if (typeof dateOrIso === 'string') {
    if (dateOrIso.includes('Z') || /[+-]\d{2}:\d{2}$/.test(dateOrIso)) {
      date = new Date(dateOrIso);
    } else {
      const match = dateOrIso.match(/^(\d{4})-(\d{2})-(\d{2})[T ](\d{2}):/);
      if (match) {
        const yy = match[1].slice(-2);
        const mm = match[2];
        const dd = match[3];
        const hh = match[4];
        return `v2.${yy}${mm}.${dd}${hh}`;
      }
      date = new Date(dateOrIso);
    }
  } else {
    date = dateOrIso;
  }

  // Convert to UTC-7 (Pacific / local target offset)
  const utcMs = date.getTime();
  const targetMs = utcMs - 7 * 60 * 60 * 1000;
  const target = new Date(targetMs);
  const yy = String(target.getUTCFullYear()).slice(-2);
  const mm = String(target.getUTCMonth() + 1).padStart(2, '0');
  const dd = String(target.getUTCDate()).padStart(2, '0');
  const hh = String(target.getUTCHours()).padStart(2, '0');

  return `v2.${yy}${mm}.${dd}${hh}`;
}

declare const __APP_VERSION__: string | undefined;

export const APP_VERSION: string =
  typeof __APP_VERSION__ !== 'undefined' ? __APP_VERSION__ : formatAppVersion();
