module.exports = {

    /** Minimal test example */
    run: async function(page) {
        try {
            await page.click('text="Continue"');
            await page.click('text="Quit"');
        } catch (e) {
            await page.screenshot({ path: 'screenshots/hello-world.png' });
            throw e;
        }
    }
};
