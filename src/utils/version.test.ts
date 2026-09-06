import { test } from 'node:test';
import assert from 'node:assert/strict';
import { formatAppVersion, APP_VERSION } from './version';

test('formatAppVersion produces v1.YYdoy.HH with zero-padded doy and HH from Date', () => {
  // 2026-01-01 09:05:00
  const jan1 = new Date(2026, 0, 1, 9, 5);
  assert.equal(formatAppVersion(jan1), 'v1.26001.09');

  // 2026-09-06 14:30:00 (day 249)
  const sep6 = new Date(2026, 8, 6, 14, 30);
  assert.equal(formatAppVersion(sep6), 'v1.26249.14');

  // 2026-12-31 23:59:00 (non-leap year, day 365)
  const dec31 = new Date(2026, 11, 31, 23, 59);
  assert.equal(formatAppVersion(dec31), 'v1.26365.23');

  // 2028-12-31 00:15:00 (leap year, day 366)
  const leapDec31 = new Date(2028, 11, 31, 0, 15);
  assert.equal(formatAppVersion(leapDec31), 'v1.28366.00');
});

test('formatAppVersion formats git commit ISO timestamp strings directly', () => {
  // Exact commit timestamp from this morning
  assert.equal(formatAppVersion('2026-09-06T09:08:43-07:00'), 'v1.26249.09');

  // New Year commit timestamp
  assert.equal(formatAppVersion('2027-01-01T00:05:00Z'), 'v1.27001.00');

  // Leap year end timestamp
  assert.equal(formatAppVersion('2028-12-31T23:45:00-05:00'), 'v1.28366.23');
});

test('APP_VERSION is non-empty and matches v1.YYdoy.HH format', () => {
  assert.match(APP_VERSION, /^v1\.\d{5}\.\d{2}$/);
});
