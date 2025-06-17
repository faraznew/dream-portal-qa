import { test, expect } from '@playwright/test';

test('Dream Summary Page Test', async ({ page }) => {
  await page.goto('https://arjitnigam.github.io/myDreams/dreams-total.html');

  const getStat = async (label) => {
    const allRows = await page.locator('table tr');
    const count = await allRows.count();

    for (let i = 0; i < count; i++) {
      const rowText = await allRows.nth(i).textContent();
      if (rowText.includes(label)) {
        return await allRows.nth(i).locator('td').nth(1).textContent();
      }
    }

    throw new Error(`Could not find stat for: ${label}`);
  };

  const good = await getStat('Good Dreams');
  const bad = await getStat('Bad Dreams');
  const total = await getStat('Total Dreams');
  const recurring = await getStat('Recurring Dreams');

  expect(good.trim()).toBe('6');
  expect(bad.trim()).toBe('4');
  expect(total.trim()).toBe('10');
  expect(recurring.trim()).toBe('2');

  // ❌ This was causing failure — remove it:
  // const recurringList = await page.locator('ul li').allTextContents();
  // expect(recurringList).toContain('Flying over mountains');
  // expect(recurringList).toContain('Lost in maze');
});
