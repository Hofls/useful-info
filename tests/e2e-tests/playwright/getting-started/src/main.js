// npm run start
const { chromium } = require('playwright');

// Kill process on unhandled promise rejection:
process.on('unhandledRejection', error => {
    console.log(error);
    throw error;
});

start();

async function start() {
    const browser = await chromium.launch({ headless: false, slowMo: 250 });
    const page = await browser.newPage();
    await page.setViewportSize({ width: 1280, height: 800 }); // Typical laptop
    await page.goto('http://whatsmyuseragent.org/');
    await page.screenshot({ path: `example.png` });
    await browser.close();
}
