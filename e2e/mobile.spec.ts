import { test, expect } from '@playwright/test';

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
