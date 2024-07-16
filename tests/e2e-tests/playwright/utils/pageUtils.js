// Import from main.js in root:
// const pageUtils = require("./utils/pageUtils");

module.exports = {

    fillByLabel: async function(page, labelSelector, text) {
        await page.click(labelSelector);
        await page.keyboard.insertText(text);
    },

    /**
     * Does not emit the keydown, keyup or keypress events. If you need them - use typeByLabel
     */
    fillByLabelTab: async function(page, labelSelector, text) {
        await page.click(labelSelector);
        await page.keyboard.press('Tab')
        await page.keyboard.insertText(text);
    },

    // await pageUtils.typeByLabel(page, 'text="Username"', 'admin');
    typeByLabel: async function(page, labelSelector, text) {
        await page.click(labelSelector);
        await page.keyboard.press('Tab')
        await page.keyboard.type(text);
        await page.keyboard.press('Enter')
    },

    enterByLabel: async function(page, labelSelector) {
        await page.click(labelSelector);
        await page.keyboard.press('Tab')
        await page.keyboard.press('Enter')
    },

    navigateWithTabs: async function(page, times) {
        for (let i = 0; i < times; i++) {
            await page.keyboard.press('Tab');
        }
        await page.keyboard.press('Enter');
    },

    /** Wait until visible */
    getElement: async function(page, selector) {
        return await page.waitForSelector(selector);
    },

    /** Alternative to page.click() */
    click: async function(page, selector) {
        let element = await page.waitForSelector(selector);
        await element.dispatchEvent('click');
    },

    /** Doesn't wait for selector to appear, returns instantly */
    findInstant: async function(page, selector) {
        await page.waitForLoadState();
        return await page.$(selector);
    },

    clickInvisible: async function(page, selector) {
        // or try regular click with force - .click({ force: true }
        let element = await page.$(selector);
        await element.dispatchEvent('click');
    },

    //  await pageUtils.hold(page, 'PageDown');
    hold: async function(page, button) {
        for (let i = 0; i < 20; i++) {
            await page.keyboard.press(button);
        }
    },

    clickOnLast: async function(page, selector) {
        await page.waitForSelector(selector);
        let responses = await page.$$(selector);
        await responses[responses.length - 1].click();
    },

    /**
     * When 'document.getSelection()' is not enough
     * Prerequisites:
     * 1. await context.grantPermissions(["clipboard-read", "clipboard-write"]);
     * 2. Page with https
     */
    readSelection: async function(page) {
        await page.evaluate(() => navigator.clipboard.writeText(""));
        await page.keyboard.press('Control+C');
        let chatText = await page.evaluate(() => navigator.clipboard.readText());
        await page.evaluate(() => navigator.clipboard.writeText(""));
        return chatText;
    },

    focusByLabel: async function(page, labelSelector) {
        await page.click(labelSelector);
        await page.keyboard.press('Tab');
    },

    readFocusedElement: async function(page) {
        let valueText = await page.evaluate(() => document.activeElement.value);
        if (valueText) {
            return valueText;
        }

        let innerText = await page.evaluate(() => document.activeElement.innerText);
        if (innerText) {
            return innerText;
        }
    },

    // expect(pageText.includes('ID - 281737')).toBeTruthy();
    getPageText: async function(page) {
        return await page.evaluate(() => document.body.innerText);
    },

    /** Each frame is different world, it's impossible to reach everything from main page */
    getFrame: async function(page, selector) {
        let element = await page.waitForSelector(selector);
        return await element.contentFrame();
    },

    replaceText: async function(page, text) {
        await page.keyboard.press('Control+A');
        await page.keyboard.press('Delete');
        await page.keyboard.insertText(text);
    },


    /**
     * await uploadFile(page, 'Upload files', 'hello.txt');
     * Will press "Upload files" button
     * When file uploading popup appears - it will receive hello.txt from project root
     */
    uploadFile: async function (page, buttonName, file) {
        const fileChooserPromise = page.waitForEvent('filechooser');
        await page.click(`text="${buttonName}"`);
        const fileChooser = await fileChooserPromise;
        await fileChooser.setFiles(file);
    },

    /**
     * await uploadFileV2(page, 'hello.txt');
     * In case if uploadFile didn't work
     */
    uploadFileV2: async function (page, file) {
        await page.setInputFiles('input[type="file"]', file);
    },

    /**
     * Prerequisites:
     *   let context = await browser.newContext({ acceptDownloads: true });
     * Usage (click without await is important):
     *   page.locator('text=Get file').click();
     *   let filePath = await waitForDownload(page);
     */
    waitForDownload: async function(page) {
        let download = await page.waitForEvent('download');
        return await download.path();
    },

    waitForLoader: async function(page) {
        await this.sleep(2);
        let waitingLimit = 25;
        for (let seconds = 0; seconds < waitingLimit; seconds++) {
            let loader = await page.$(`xpath=//div[text()="Loading..."]`);
            if (!loader) {
                return ;
            }
            await this.sleep(1);
        }
    },

    /** Search by dom node property */
    findInputByValue: async function(page, value) {
        await this.sleep(2);
        let inputs = await page.$$('css=input');
        for (let input of inputs) {
            let inputValue = await this.getProperty(input, "value");
            if (inputValue === value) {
                return input;
            }
        }
    },

    readTable: async function(page) {
        let rows = await page.$$("table.x-grid3-row-table");
        let results = [];
        for (let row of rows) {
            let columns = await row.$$('td');
            let result = {
                code: await columns[0].innerText(),
                category: await columns[1].innerText(),
                status: await columns[2].innerText()
            }
            results.push(result);
        }
        return results;
    },

    // await action.clickRightOf(page, 1200, 'text="Select a slot')
    clickRightOf: async function(page, offset, selector) {
        await page.locator(selector).scrollIntoViewIfNeeded();
        let element = await page.$(selector);
        let box = await element.boundingBox();
        await page.mouse.click(box.x + offset, box.y);
    },

    // await action.clickBelowOf(page, 50, 'text="Pick a date"');
    clickBelowOf: async function(page, offset, selector) {
        await page.locator(selector).scrollIntoViewIfNeeded();
        let element = await page.$(selector);
        let box = await element.boundingBox();
        await page.mouse.click(box.x + 10, box.y + offset);
    },

    // Also useful to check if element exists or not
    isVisible: async function (page, selector) {
        try {
            await page.waitForSelector(selector, { state: 'visible', timeout: 3000 });
            return true;
        } catch (error) {
            return false;
        }
    },

    getProperty: async function(element, property) {
        return await (await element.getProperty(property)).jsonValue();
    },

    sleep: async function(seconds) {
        return new Promise((resolve) => {
            setTimeout(resolve, 1000 * seconds);
        });
    }

};
