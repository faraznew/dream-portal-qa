import { test, expect } from '@playwright/test';
import { classifyDream } from '../utils/aiHelper';

test('AI-based Dream Type Validation', async () => {
  const dreamEntries = [
    { name: 'Flying over mountains', expected: 'Good' },
    { name: 'Lost in maze', expected: 'Bad' },
    { name: 'Monster chase', expected: 'Bad' }
  ];

  for (const entry of dreamEntries) {
    const result = await classifyDream(entry.name);
    console.log(`🧠 Dream: "${entry.name}" → Classified as: ${result}`);
    expect(result).toBe(entry.expected);
  }
});
