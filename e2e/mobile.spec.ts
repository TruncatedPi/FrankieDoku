import { test, expect } from '@playwright/test';
import { CAMPAIGN_LEVELS } from '../src/data/levels';

test('touch dragging marks neighboring cells despite implicit pointer capture', async ({ page }) => {
  await page.goto('./');
  const first = page.locator('[data-row="0"][data-col="0"]');
  const second = page.locator('[data-row="0"][data-col="1"]');
  const a = (await first.boundingBox())!, b = (await second.boundingBox())!;
  const cdp = await page.context().newCDPSession(page);
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: a.x + a.width / 2, y: a.y + a.height / 2 }] });
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: b.x + b.width / 2, y: b.y + b.height / 2 }] });
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  await expect(first).toHaveAttribute('data-state', 'mark');
  await expect(second).toHaveAttribute('data-state', 'mark');
});

test('12x12 board fits a phone and responds to touch', async ({ page }) => {
  await page.goto('./');
  await page.getByRole('button', { name: 'Free Play', exact: true }).tap();
  await page.getByRole('button', { name: '12×12', exact: true }).tap();
  await page.getByRole('button', { name: 'Start Free Play' }).tap();
  await expect(page.locator('[data-cell]')).toHaveCount(144);
  const cell = page.locator('[data-row="0"][data-col="0"]');
  await cell.tap();
  await expect(cell).toHaveAttribute('data-state', 'mark');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});

test('touch tap toggles mark on and off reliably on mobile', async ({ page }) => {
  await page.goto('./');
  const cell = page.locator('[data-row="0"][data-col="0"]');
  // First tap sets X
  await cell.tap();
  await expect(cell).toHaveAttribute('data-state', 'mark');
  // Second tap removes X
  await page.waitForTimeout(350);
  await cell.tap();
  await expect(cell).toHaveAttribute('data-state', 'empty');
});

test('touch with micro-movement toggles mark on and off', async ({ page }) => {
  await page.goto('./');
  const cell = page.locator('[data-row="1"][data-col="1"]');
  const box = (await cell.boundingBox())!;
  const cdp = await page.context().newCDPSession(page);

  // Tap 1 with micro-jitter
  await cdp.send('Input.dispatchTouchEvent', {
    type: 'touchStart',
    touchPoints: [{ x: box.x + box.width / 2, y: box.y + box.height / 2 }],
  });
  await cdp.send('Input.dispatchTouchEvent', {
    type: 'touchMove',
    touchPoints: [{ x: box.x + box.width / 2 + 1, y: box.y + box.height / 2 + 1 }],
  });
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  await expect(cell).toHaveAttribute('data-state', 'mark');

  // Tap 2 on the same cell with micro-jitter to remove the mark
  await page.waitForTimeout(350);
  await cdp.send('Input.dispatchTouchEvent', {
    type: 'touchStart',
    touchPoints: [{ x: box.x + box.width / 2, y: box.y + box.height / 2 }],
  });
  await cdp.send('Input.dispatchTouchEvent', {
    type: 'touchMove',
    touchPoints: [{ x: box.x + box.width / 2 + 1, y: box.y + box.height / 2 + 1 }],
  });
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  await expect(cell).toHaveAttribute('data-state', 'empty');
});

test('compact spacing under Zen banner and bottom buttons fit within viewport', async ({ page }) => {
  await page.goto('./');
  // Switch to Zen mode to verify Zen banner
  await page.getByRole('button', { name: 'Settings' }).tap();
  await page.getByRole('button', { name: 'Zen (Infinite Lives)' }).tap();
  await page.getByRole('button', { name: 'Close Settings' }).tap();

  const zenBadge = page.getByText('🐾 Zen Mode');
  await expect(zenBadge).toBeVisible();

  const board = page.locator('[data-cell]').first().locator('..').locator('..');
  const zenBox = (await zenBadge.boundingBox())!;
  const boardBox = (await board.boundingBox())!;

  // Verify gap under Zen banner is small/compact (under 45px, not a giant 100px void)
  expect(boardBox.y - (zenBox.y + zenBox.height)).toBeLessThan(45);

  // Verify all bottom buttons are visible and inside viewport
  const undoBtn = page.getByRole('button', { name: 'Undo' });
  const hintBtn = page.getByRole('button', { name: 'Hint' });
  const resetBtn = page.getByRole('button', { name: 'Reset' });
  await expect(undoBtn).toBeVisible();
  await expect(hintBtn).toBeVisible();
  await expect(resetBtn).toBeVisible();

  const resetBox = (await resetBtn.boundingBox())!;
  const viewport = page.viewportSize()!;
  expect(resetBox.y + resetBox.height).toBeLessThanOrEqual(viewport.height);
  expect(boardBox.width).toBeGreaterThanOrEqual(viewport.width * 0.95);
});

test('placing the final cat with a double-tap does not prematurely reset or start the next level', async ({ page }) => {
  await page.goto('./');
  const level1 = CAMPAIGN_LEVELS[0];
  const initialCats = level1.solution!.slice(0, -1);
  const finalCat = level1.solution![level1.solution!.length - 1];
  const cdp = await page.context().newCDPSession(page);
  const touchTap = async (x: number, y: number) => {
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x, y }] });
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  };
  const doubleTap = async (row: number, col: number) => {
    const box = (await page.locator(`[data-row="${row}"][data-col="${col}"]`).boundingBox())!;
    const x = box.x + box.width / 2, y = box.y + box.height / 2;
    await touchTap(x, y);
    await touchTap(x, y);
  };

  // Place all cats except the last one using a real fast double-tap
  for (const q of initialCats) {
    await doubleTap(q.row, q.col);
    await expect(page.locator(`[data-row="${q.row}"][data-col="${q.col}"]`)).toHaveAttribute('data-state', 'cat');
    await page.waitForTimeout(400);
  }

  // Place the final cat with a double-tap, then an immediate bounce tap at the same point
  const box = (await page.locator(`[data-row="${finalCat.row}"][data-col="${finalCat.col}"]`).boundingBox())!;
  await doubleTap(finalCat.row, finalCat.col);
  await touchTap(box.x + box.width / 2, box.y + box.height / 2);

  const victory = page.getByRole('dialog', { name: 'Victory Celebration' });
  await expect(victory).toBeVisible();

  // Follow-through taps landing on Next Level / Replay inside the guard window, plus a
  // synthesized "ghost" click with no pointerdown, must not reset or advance the level.
  await page.evaluate(() => {
    const buttons = [...document.querySelectorAll<HTMLButtonElement>('[role="dialog"] button')];
    for (const label of ['Next Level', 'Replay']) {
      const b = buttons.find(btn => btn.textContent?.trim() === label)!;
      b.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, button: 0, isPrimary: true, pointerType: 'touch' }));
      b.dispatchEvent(new MouseEvent('click', { bubbles: true, detail: 1 }));
      b.dispatchEvent(new MouseEvent('click', { bubbles: true, detail: 1 }));
    }
  });
  await expect(victory).toBeVisible();
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem('meowdoku_saved_session_v2')!).puzzle.id)).toBe('level-1');

  // After the guard window elapses, tapping Next Level intentionally advances to Level 2
  await page.waitForTimeout(700);
  await victory.getByRole('button', { name: 'Next Level', exact: true }).tap();
  await expect(victory).toHaveCount(0);
  await expect.poll(() => page.evaluate(() => JSON.parse(localStorage.getItem('meowdoku_saved_session_v2')!).puzzle.id)).toBe('level-2');
});
