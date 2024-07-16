module.exports = {

    /** Create visit */
    run: async function(page) {
        try {
            await page.click('text="Continue"');
            await page.click('text="Create"');
            await page.fill('[placeholder="Enter name"]', 'John Vinny');
            await page.click('text=/25 oct 2011/');
            await page.click('text="Register"');
            await page.waitForSelector('text="Visit created"')
        } catch (e) {
            await page.screenshot({ path: 'screenshots/create-visit.png' });
            throw e;
        }
    }
};
