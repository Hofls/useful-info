### npx playwright
* Generate new project - `npm init playwright`
* Run test generator - `npx playwright codegen playwright.dev`
* Run all tests:
    * `npm install`
    * `npx playwright test --config=config/local.config.js`
* Run specific test:
    * By file - `npx playwright test --config=config/local.config.js tests/todo-page.spec.ts`
    * By name - `npx playwright test -g "Hello world"`
* Show report (after running a test)
    * Look at `playwright-report/index.html`, or execute `npx playwright show-report`
* Debug - `npx playwright test --project=chromium --headed --debug`

### 
* [Assertions](https://playwright.dev/docs/test-assertions):
    * `await expect(page.locator('text="Task done!"')).toBeVisible();`
    * `await expect(page.locator('.status')).not.toContainText('error');`
    * `await expect(page).toHaveScreenshot('expected-map.png');`
    * `await expect(page.locator('list > .component')).toHaveCount(3)`;
    * `expect(value).toBeGreaterThan(34)`
* Standard JS assertions:
    * `console.assert(total === 27, "Wrong total");`