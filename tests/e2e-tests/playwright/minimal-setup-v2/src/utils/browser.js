const { chromium } = require('playwright');

module.exports = {

    login: async function() {
        await page.goto('https://demo.playwright.dev/todomvc');
        // await page.locator('input[name="login"]').fill('username');
        // await page.locator('input[name="password"]').fill('password');
        // await page.locator('text=Submit').click();
    }
};
