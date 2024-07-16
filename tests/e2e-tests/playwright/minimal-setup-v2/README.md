### Info
* Project was generated via `npm init playwright`

### Run locally
* Install - `npm install`
* Run all - `npx playwright test --config=config/local.config.js`
* Run specific - `npx playwright test --config=config/local.config.js -g "Should add new item"`

### Run on server
* `docker build --tag minimal-setup:2.0 .`
* `docker run minimal-setup:2.0`

### Run on schedule in gitlab
* `Project` -> `CI/CD` -> `Schedules` -> `New schedule`
