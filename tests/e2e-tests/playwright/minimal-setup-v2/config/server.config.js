const { devices } = require('@playwright/test');

const config = {
  testDir: '../tests',
  timeout: 120 * 1000,
  expect: {
    timeout: 10 * 1000
  },
  fullyParallel: true,
  retries: 2,
  workers: 1,
  reporter: [ ['html', { open: 'never' }] ],
  use: {
    actionTimeout: 10 * 1000,
    headless: true,
    screenshot: 'only-on-failure',
    launchOptions: {
      slowMo: 250,
    },
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1600, height: 900 },
      },
    }
  ],
};

module.exports = config;
