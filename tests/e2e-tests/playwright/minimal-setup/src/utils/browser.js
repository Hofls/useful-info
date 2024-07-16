const { chromium } = require('playwright');

module.exports = {

    launchBrowser: async function() {
        if (process.env.NODE_PROFILE === "dev") {
            return await chromium.launch({ headless: false, slowMo: 1000 });
        } else {
            return await chromium.launch();
        }
    },

    newContext: async function(browser) {
        let context = await browser.newContext();
        await context.grantPermissions(["clipboard-read", "clipboard-write"]);
        context.setDefaultTimeout(60 * 1000);
        return context;
    },

    newPage: async function(context) {
        const page = await context.newPage();
        await page.setViewportSize({ width: 1820, height: 980 });
        await page.goto('http://your-site-here.com');
        return page;
    }
};
