import { test, expect } from '@playwright/test';

test('captured touch drag fills crossed cells and cancellation ends the gesture', async ({page}) => {
  await page.goto('./');
  const first=page.locator('[data-row="0"][data-col="0"]');
  await first.dispatchEvent('pointerdown',{pointerId:7,pointerType:'touch',isPrimary:true,button:0});
  await page.evaluate(() => {
    const board=document.querySelector('[data-testid="game-board"]')!;
    const target=document.querySelector('[data-row="0"][data-col="3"]')!.getBoundingClientRect();
    const touch={identifier:7,target:board,clientX:target.x+target.width/2,clientY:target.y+target.height/2};
    // WebKit does not expose a constructible Touch on every platform.
    const event=new Event('touchmove',{bubbles:true,cancelable:true});
    Object.defineProperty(event,'touches',{value:[touch]});
    board.dispatchEvent(event);
  });
  for(let col=0;col<4;col++) await expect(page.locator('[data-row="0"][data-col="'+col+'"]')).toHaveAttribute('data-state','mark');
  await first.dispatchEvent('pointercancel',{pointerId:7,pointerType:'touch',isPrimary:true});
  await page.locator('[data-row="1"][data-col="3"]').dispatchEvent('pointerenter',{pointerId:7,pointerType:'touch',isPrimary:true});
  await expect(page.locator('[data-row="1"][data-col="3"]')).toHaveAttribute('data-state','empty');
});

test('board readability preferences persist and pattern maps load', async ({page}) => {
  await page.goto('./');
  await page.getByRole('button',{name:'Settings',exact:true}).tap();
  await page.getByLabel('Cell dividing lines').selectOption('white');
  await page.getByLabel('Show region numbers').check();
  await page.getByRole('button',{name:'Close Settings'}).tap();
  await expect(page.locator('[data-cell]').first()).toHaveCSS('border-top-color','rgb(255, 255, 255)');
  await page.waitForTimeout(200);
  await page.reload();
  await expect(page.locator('[data-cell]').first()).toHaveCSS('border-top-color','rgb(255, 255, 255)');
  await expect(page.locator('[data-cell]').first().locator('span')).toBeVisible();
  await page.getByRole('button',{name:'Free Play',exact:true}).tap();
  await page.getByRole('button',{name:'Heart',exact:true}).tap();
  await expect(page.locator('[data-cell]')).toHaveCount(81);
  await expect.poll(()=>page.evaluate(()=>JSON.parse(localStorage.getItem('meowdoku_saved_session_v2')||'{}').puzzle?.id)).toBe('pattern-heart');
});
