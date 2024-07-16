const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc');
});

test.describe('Counter', () => {
  test('should display the current number of todo items', async ({ page }) => {
    await page.locator('.new-todo').fill("Pet a cat");
    await page.locator('.new-todo').press('Enter');
    await expect(page.locator('.todo-count')).toContainText('1');
  });
});

