const browserUtil = require("../src/utils/browser");
const helloWorld = require("../src/implementation/hello-world");
const createVisit = require("../src/implementation/create-visit");

let browser = null;
let context = null;
let page = null;

beforeAll(async () => {
    browser = await browserUtil.launchBrowser();
});

afterAll(async () => {
    browser.close();
});

beforeEach(async () => {
    context = await browser.newContext();
    context.setDefaultTimeout(7 * 1000);
    page = await browserUtil.newPage(context);
});

afterEach(async () => {
    context.close();
});

test('hello-world-test', async () => {
    await helloWorld.run(page);
});

test('create-visit-test', async () => {
    await createVisit.run(page);
});
