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
 * Formats a version string in the form: v1.YYdoy.HH
 * - YY: 2-digit year (e.g. '26' for 2026)
 * - doy: Day of year with leading zeros (e.g. '001' to '366')
 * - HH: 24-hour time with leading zero (e.g. '09', '14')
 * 
 * Supports ISO date strings (e.g. from git log %cI: "2026-09-06T09:08:43-07:00")
 * preserving the commit's local date and hour across any timezone.
 */
export function formatAppVersion(dateOrIso: Date | string = new Date()): string {
  if (typeof dateOrIso === 'string') {
    const match = dateOrIso.match(/^(\d{4})-(\d{2})-(\d{2})[T ](\d{2}):/);
    if (match) {
      const year = parseInt(match[1], 10);
      const month = parseInt(match[2], 10);
      const day = parseInt(match[3], 10);
      const yy = String(year).slice(-2);
      const doy = String(getDayOfYear(year, month, day)).padStart(3, '0');
      const hh = match[4];
      return `v1.${yy}${doy}.${hh}`;
    }
  }

  const date = typeof dateOrIso === 'string' ? new Date(dateOrIso) : dateOrIso;
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const yy = String(year).slice(-2);
  const doy = String(getDayOfYear(year, month, day)).padStart(3, '0');
  const hh = String(date.getHours()).padStart(2, '0');

  return `v1.${yy}${doy}.${hh}`;
}

declare const __APP_VERSION__: string | undefined;

export const APP_VERSION: string =
  typeof __APP_VERSION__ !== 'undefined' ? __APP_VERSION__ : formatAppVersion();
