const { test, expect } = require('@playwright/test');
const browser = require("../src/utils/browser");

test.beforeEach(browser.login);

test.describe('New Todo', () => {

  test('Page should have description', async ({ page }) => {
    await expect(page.locator('text=This is just a demo of TodoMVC for testing, not the real TodoMVC app.')).toBeVisible();
    await expect(page.locator('text=Double-click to edit a todo')).toBeVisible();
  });

  test('Should add new item', async ({ page }) => {
    let locator = page.locator('[placeholder="What needs to be done\\?"]')
    await locator.fill("Hello world!");
    await locator.press('Enter');

    await expect(page.locator('.new-todo')).toBeEmpty();
  });
});

