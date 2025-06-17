import { test, expect } from '@playwright/test';

test('Dream Diary Page Test', async ({ page }) => {
  await page.goto('https://arjitnigam.github.io/myDreams/dreams-diary.html');

  const rows = await page.locator('table tbody tr');
  const count = await rows.count();
  expect(count).toBe(10);

  for (let i = 0; i < count; i++) {
    const dreamName = await rows.nth(i).locator('td').nth(0).textContent();
    const daysAgo = await rows.nth(i).locator('td').nth(1).textContent();
    const dreamType = await rows.nth(i).locator('td').nth(2).textContent();

    expect(dreamName.trim()).not.toBe('');
    expect(daysAgo.trim()).not.toBe('');
    expect(['Good', 'Bad']).toContain(dreamType.trim());
  }
});
