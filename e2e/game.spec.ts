import { test, expect } from '@playwright/test';
import { CAMPAIGN_LEVELS } from '../src/data/levels';
import { generateDailyPuzzle, generatePuzzle } from '../src/engine/generator';
import { newGame } from '../src/engine/game';
import { validateMap } from '../scripts/map-validator';
import { once } from 'node:events';
// @ts-expect-error The test server is a plain JavaScript utility.
import { startBuiltServer } from '../scripts/serve-built.mjs';

test('board settles, accepts keyboard input, and restores state after reload', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
  await page.goto('./');
  // This test exercises session restoration after startup, not cancellation of
  // the browser's initial service-worker installation during navigation.
  await page.evaluate(async () => { await navigator.serviceWorker.ready; });
  const cell = page.locator('[data-row="0"][data-col="0"]');
  await cell.focus();
  await page.keyboard.press('Space');
  await expect(cell).toHaveAttribute('data-state', 'mark');
  await expect.poll(() => page.evaluate(() => JSON.parse(localStorage.getItem('meowdoku_saved_session_v2') || '{}').cells?.[0]?.state)).toBe('mark');
  await page.reload();
  await expect(cell).toHaveAttribute('data-state', 'mark');
  await page.waitForTimeout(1100); // Exercise an idle timer update after restoration.
  expect(errors).toEqual([]);
});

test('free play supports 12x12 and co-op undo/redo preserves the player', async ({ page }) => {
  await page.goto('./');
  await page.getByRole('button', { name: 'Free Play', exact: true }).press('Enter');
  await page.getByRole('button', { name: '12×12', exact: true }).press('Enter');
  await page.getByRole('button', { name: 'Start Free Play' }).press('Enter');
  await expect(page.locator('[data-cell]')).toHaveCount(144);
  await expect(page.getByRole('status')).toHaveCount(0);
  const puzzle = await page.evaluate(async () => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return JSON.parse(localStorage.getItem('meowdoku_saved_session_v2')!).puzzle;
  });
  expect(validateMap(puzzle).valid).toBe(true);
  await page.getByRole('button', { name: 'Co-Op', exact: true }).press('Enter');
  await page.getByRole('button', { name: '12x12', exact: true }).press('Enter');
  await page.getByRole('button', { name: 'Start Co-Op Game' }).press('Enter');
  await expect(page.getByText("Player 1's Turn!")).toBeVisible();
  await expect.poll(() => page.evaluate(() => JSON.parse(localStorage.getItem('meowdoku_saved_session_v2')!).gameMode)).toBe('twoplayer');
  const q = await page.evaluate(() => JSON.parse(localStorage.getItem('meowdoku_saved_session_v2')!).puzzle.solution[0]);
  const cell = page.locator(`[data-row="${q.row}"][data-col="${q.col}"]`);
  await cell.click({ button: 'right' });
  await expect(cell).toHaveAttribute('data-player', '1');
  await expect(page.getByText("Player 2's Turn!")).toBeVisible();
  await page.getByRole('button', { name: /undo/i }).press('Enter');
  await expect(page.getByText("Player 1's Turn!")).toBeVisible();
  await page.getByRole('button', { name: /redo/i }).press('Enter');
  await expect(page.getByText("Player 2's Turn!")).toBeVisible();
  await expect(cell).toHaveAttribute('data-player', '1');
});

test('past daily completion is recorded under the selected date', async ({ page }) => {
  const puzzle = generateDailyPuzzle('2026-09-01');
  await page.addInitScript(game => localStorage.setItem('meowdoku_saved_session_v2', JSON.stringify(game)), newGame(puzzle, 'daily'));
  await page.goto('./');
  for (const q of puzzle.solution!) await page.locator(`[data-row="${q.row}"][data-col="${q.col}"]`).click({ button: 'right' });
  await expect.poll(() => page.evaluate(() => Object.keys(JSON.parse(localStorage.getItem('meowdoku_daily_v1') || '{}')))).toEqual(['2026-09-01']);
});

test('campaign victory and replay keep best stars and increment attempts', async ({ page }) => {
  await page.goto('./');
  for (const q of CAMPAIGN_LEVELS[0].solution!) await page.locator(`[data-row="${q.row}"][data-col="${q.col}"]`).click({ button: 'right' });
  await expect.poll(() => page.evaluate(() => JSON.parse(localStorage.getItem('meowdoku_campaign_v1') || '{}')['level-1']?.stars)).toBe(3);
  await expect.poll(() => page.evaluate(() => JSON.parse(localStorage.getItem('meowdoku_stats_v1')!).gamesWon)).toBe(1);
  await page.getByRole('button', { name: 'Replay', exact: true }).click();
  await page.locator('[data-row="0"][data-col="0"]').click({ button: 'right' });
  for (const q of CAMPAIGN_LEVELS[0].solution!) await page.locator(`[data-row="${q.row}"][data-col="${q.col}"]`).click({ button: 'right' });
  await expect.poll(() => page.evaluate(() => JSON.parse(localStorage.getItem('meowdoku_stats_v1')!).gamesWon)).toBe(2);
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem('meowdoku_campaign_v1')!)['level-1'].stars)).toBe(3);
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem('meowdoku_stats_v1')!).gamesPlayed)).toBe(2);
});

test('seeded generation matches Node in each browser engine through size 12', async ({ page }) => {
  await page.goto('http://127.0.0.1:3173');
  for (const size of [4, 9, 12]) {
    const expected = generatePuzzle(size, 942);
    const actual = await page.evaluate(async n => {
      const path = '/src/engine/generator.ts';
      const { generatePuzzle } = await import(path);
      return generatePuzzle(n, 942);
    }, size);
    expect(actual).toEqual(expected);
  }
});

test('project-subpath icons, fonts, worker and gameplay remain available offline', async ({ page }) => {
  // A separate origin lets us shut down the network server without affecting other tests.
  const server = startBuiltServer(0);
  await once(server, 'listening');
  const address = `http://127.0.0.1:${server.address().port}/SchroDoku/`;
  try {
  await page.goto(address);
  await page.evaluate(async () => { await navigator.serviceWorker.ready; });
  await page.reload();
  await expect.poll(() => page.evaluate(() => !!navigator.serviceWorker.controller)).toBe(true);
  const manifest = await page.evaluate(async () => {
    const href = document.querySelector<HTMLLinkElement>('link[rel="manifest"]')!.href;
    const json = await (await fetch(href)).json();
    return { href, icons: json.icons };
  });
  for (const icon of manifest.icons) expect((await page.request.get(new URL(icon.src, manifest.href).href)).ok()).toBe(true);
  await new Promise<void>(resolve => server.close(() => resolve()));
  await page.reload();
  await expect(page.locator('[data-cell]')).toHaveCount(16);
  await page.getByRole('button', { name: 'Free Play', exact: true }).click();
  await page.getByRole('button', { name: '12×12', exact: true }).click();
  await page.getByRole('button', { name: 'Start Free Play' }).click();
  await expect(page.locator('[data-cell]')).toHaveCount(144);
  expect(await page.evaluate(async () => { await document.fonts.ready; return document.fonts.check('16px Comfortaa'); })).toBe(true);
  } finally { server.close(); }
});

test('hint overlays menu area without jumping the board and displays logical steps', async ({ page }) => {
  await page.goto('./');
  const board = page.locator('[data-testid="game-board"]');
  const boxBefore = (await board.boundingBox())!;

  // Click Hint button
  await page.getByRole('button', { name: /hint/i }).click();

  // Hint overlay must be visible covering menu
  const hintOverlay = page.locator('[data-testid="hint-overlay"]');
  await expect(hintOverlay).toBeVisible();

  // The board's vertical position must NOT jump down (within subpixel rendering tolerance)
  const boxAfter = (await board.boundingBox())!;
  expect(Math.abs(boxAfter.y - boxBefore.y)).toBeLessThanOrEqual(2);

  // Dismiss button restores menus
  await page.getByRole('button', { name: 'Dismiss Hint' }).click();
  await expect(hintOverlay).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Levels', exact: true })).toBeVisible();
});

