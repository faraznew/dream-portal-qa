import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage.js';

test('Home Page UI Test', async ({ page, context }) => {
  const home = new HomePage(page);
  await page.goto('https://arjitnigam.github.io/myDreams/');

  await home.waitForLoading();
  await expect(await home.isMainVisible()).toBeTruthy();

  const [newPage1, newPage2] = await Promise.all([
    context.waitForEvent('page'),
    context.waitForEvent('page'),
    home.clickMyDreams(),
  ]);

  await expect(newPage1).not.toBeNull();
  await expect(newPage2).not.toBeNull();
});
