import { test } from 'node:test';
import assert from 'node:assert/strict';
import { formatAppVersion, APP_VERSION } from './version';

test('formatAppVersion produces v2.YYMM.DDHH with zero-padded month, day, and HH in UTC-7', () => {
  // 2026-01-01 09:05:00 UTC-7
  const jan1 = new Date('2026-01-01T09:05:00-07:00');
  assert.equal(formatAppVersion(jan1), 'v2.2601.0109');

  // 2026-09-06 14:30:00 UTC-7
  const sep6 = new Date('2026-09-06T14:30:00-07:00');
  assert.equal(formatAppVersion(sep6), 'v2.2609.0614');

  // 2026-12-31 23:59:00 UTC-7
  const dec31 = new Date('2026-12-31T23:59:00-07:00');
  assert.equal(formatAppVersion(dec31), 'v2.2612.3123');

  // 2028-02-29 00:15:00 UTC-7 (leap year day)
  const leapFeb29 = new Date('2028-02-29T00:15:00-07:00');
  assert.equal(formatAppVersion(leapFeb29), 'v2.2802.2900');
});

test('formatAppVersion formats git commit ISO timestamp strings in UTC-7', () => {
  // Commit timestamp with -07:00 offset
  assert.equal(formatAppVersion('2026-09-26T12:55:45-07:00'), 'v2.2609.2612');

  // UTC commit timestamp converted to UTC-7 (07:05 UTC -> 00:05 UTC-7)
  assert.equal(formatAppVersion('2027-01-01T07:05:00Z'), 'v2.2701.0100');

  // UTC-5 commit timestamp converted to UTC-7 (23:45 UTC-5 -> 21:45 UTC-7)
  assert.equal(formatAppVersion('2028-12-31T23:45:00-05:00'), 'v2.2812.3121');
});

test('APP_VERSION is non-empty and matches v2.YYMM.DDHH format', () => {
  assert.match(APP_VERSION, /^v2\.\d{4}\.\d{4}$/);
});
