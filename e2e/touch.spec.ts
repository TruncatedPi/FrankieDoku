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
  await page.getByLabel('Territory texture patterns').uncheck();
  await page.getByRole('button',{name:'Close Settings'}).tap();
  await expect(page.locator('[data-cell]').first()).toHaveCSS('border-top-color','rgb(255, 255, 255)');
  await page.waitForTimeout(200);
  await page.reload();
  await expect(page.locator('[data-cell]').first()).toHaveCSS('border-top-color','rgb(255, 255, 255)');
  await expect(page.getByTestId('territory-spotlight-bar')).toBeVisible();
  await page.getByTestId('spotlight-chip-0').tap();
  await expect(page.getByTestId('spotlight-clear')).toBeVisible();
  await page.getByRole('button',{name:'Free Play',exact:true}).tap();
  await page.getByRole('button',{name:'Heart',exact:true}).tap();
  await expect(page.locator('[data-cell]')).toHaveCount(81);
  await expect.poll(()=>page.evaluate(()=>JSON.parse(localStorage.getItem('meowdoku_saved_session_v2')||'{}').puzzle?.id)).toBe('pattern-heart');
});

test('hint explanation is readable and movable on a phone', async ({page, browserName}) => {
  await page.goto('./');
  const chips = page.locator('[data-testid^="spotlight-chip-"]');
  const textures = await chips.evaluateAll(nodes => nodes.map(n => getComputedStyle(n).backgroundImage !== 'none'));
  expect(textures.filter(Boolean).length).toBe(Math.floor(textures.length / 2));
  await page.getByRole('button', {name:'Hint', exact:true}).tap();
  await page.getByText('Why?', {exact:true}).tap();
  const dialog = page.getByRole('dialog', {name:'Why this hint?'});
  await expect(dialog.locator('ol, p').first()).toHaveCSS('font-size','18px');
  const handle = dialog.getByRole('button', {name:'Move hint explanation'});
  const box = (await handle.boundingBox())!;
  if (browserName === 'chromium') {
    const cdp = await page.context().newCDPSession(page);
    await cdp.send('Input.dispatchTouchEvent', {type:'touchStart', touchPoints:[{x:box.x+20,y:box.y+20}]});
    await cdp.send('Input.dispatchTouchEvent', {type:'touchMove', touchPoints:[{x:box.x+20,y:box.y+100}]});
    await cdp.send('Input.dispatchTouchEvent', {type:'touchEnd', touchPoints:[]});
  } else {
    // Synthetic WebKit pointer events have no active native pointer to capture.
    await handle.evaluate(node => { node.setPointerCapture = () => {}; });
    await handle.dispatchEvent('pointerdown', {pointerId:9, pointerType:'touch', isPrimary:true, button:0, clientX:box.x+20, clientY:box.y+20});
    await handle.dispatchEvent('pointermove', {pointerId:9, pointerType:'touch', isPrimary:true, clientX:box.x+20, clientY:box.y+100});
    await handle.dispatchEvent('pointerup', {pointerId:9, pointerType:'touch', isPrimary:true});
  }
  await expect.poll(async () => (await dialog.boundingBox())!.y).toBeGreaterThan(100);
  await dialog.getByRole('button', {name:'Close explanation'}).tap();
  await expect(dialog).toHaveCount(0);
  await expect(page.getByTestId('hint-overlay')).toBeVisible();
});
