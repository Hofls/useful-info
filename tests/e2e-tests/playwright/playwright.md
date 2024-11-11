### Info
* `Playwright` - Node.js library for browser automation (generic)
* `Playwirght Test` - specialized on e2e tests

### Selector types
* Text
    * `await page.waitForSelector('text="Successfully"')` (for really strict search look at xpath)
        * `<p>Successfully updated</p>`
    * `await page.click('text=/2020.11.24/');` (regex)
        * `<span>Last visit - 2020.11.24, at 16:43</span>`
* [Css](https://appletree.or.kr/quick_reference_cards/CSS/CSS%20selectors%20cheatsheet.pdf)
    * `page.locator("#oculus732").click()`
         * `<button id = "oculus732">Login</button>`
    * `await page.locator('div:text-is("Login")').click();`
        * `<div>Login</div>`
    * `await page.locator('article:has(div.promo)').textContent();`
        * ```
          <article>
            <p>Hello world!</p>
            <div class=promo/>
          </article>
          ```
    * `h1:has(+ p)`
        * ```
          <h1/>
          <p/>
          ```
    * `await page.fill('css=[placeholder="Enter name"]', 'John');`
        * `<input placeholder="Enter name"/>`
    * `await page.click('css=span.login-area :nth-child(2)');`
        * ```
          <span class="login-area">
            <button/>
            <button/>
          </span>
          ```
    * `await page.fill('css=.lu-modal-body input[placeholder="dd.mm.yyyy"]', '20.11.2020');`
        *  ```
            <div class="lu-modal-body">
              <div>
                <input placeholder="dd.mm.yyyy"/>
              </div>
            </div>
            ```
* [Xpath](https://devhints.io/xpath)
    * `'xpath=//div[text()="Password"]/ancestor::foo'`
        * ```
            <foo>
              <div>Password</div>
            </foo>
          ```
        * If multiple foo ancestors - pick specific one `ancestor::foo[1]`
    * `sdFrame.click('xpath=//a[starts-with(text(),"Info about")]');`
        * ```
            <foo>
              <a>Info about product</div>
            </foo>
          ```
* Layout-based selectors
    * `await page.locator('input:right-of(:text("Username"))').first().fill('value');`
        * Fill an input to the right of "Username"
    * `await page.locator(':nth-match(input:right-of(:text("Username")), 2)').first().fill('value');`
        * Fill second input to the right of "Username"
    * `await page.locator('button:right-of(:nth-match(div:text-is("Warning"), 2))').first().click();`
        * Click on button to the right of second "Warning"
    * `await page.locator('button[ngtooltip="Order now!"]:near(.promo-card)').first().click();`
        * Click a button with tooltip "Order now!" near the promo card
* Combining different selector types:
    * `await page.click('xpath=//div >> css=button');`
        * ```
            <button/>
            <div>
                <button/>
            <div>
          ```
    * `await page.locator('a:has(+ p:text-is("Hello"))').click();`
        * ```
          <a/>
          <p>Hello</p>
          ```

### Recipes
##### Read element:
* Get selected text
    * `await page.evaluate(() => document.getSelection().toString());`
* Get focused element inner text:
    * `await page.evaluate(() => document.activeElement.innerText);`
* Get focused input value:
    * `await page.evaluate(() => document.activeElement.value);`
* Read value right of text "Hello, mister"
    * `let userName = await page.locator('span:right-of(div:text-is("Hello, mister"))').first().innerText();`
* Count warnings on a page:
    * `await page.locator('text="Warning!"').count();`
    
##### Search elements
* Strict:
    * Matches with "Hello", ignores "Hello World"
    * `await page.click('text="Hello"');`
    * `await page.click(`xpath=//div[text()="Hello"]`);`
* Relaxed:
    * Matches with "Hello", "Hmm Hello World"
    * `await page.click('text=Hello');`
    * `await page.click('text=/Hello/');`
* Regex:
    * `await page.click('text=/He??o/');`
* Find array of elements:
    ```
    let links = await tableFrame.$$(`xpath=//a[starts-with(text(),"SD")]`);
    for (let link of links) {}
    ```
* Click on third "Cancel order" element
    * `await page.click('css=:nth-match(:text("Cancel order"), 3)');`
* Find without waiting for an element to appear
    * `let saveButton = await page.$('text="Save"');`
* Find visible element (ignore all invisible)
    * `await page.locator('text="Hello world" >> visible=true');`
    * `await page.locator('button.greeitngs:visible');`

##### Buttons
* Default click:
    * `await page.click('text="Save button"');`
* Alternative click:
    ```
    let saveButton = await page.waitForSelector('text="Save button"');
    await saveButton.dispatchEvent('click');
    ```

##### iFrames
* Click on button inside iFrame:
    ```
    let element = await page.waitForSelector('css=[title="Frame with buttons"]');
    let frame = await element.contentFrame();
    await frame.click('text="Button in frame"');
    ```

##### Keyboard
* Write text:
    * `await page.keyboard.insertText('SD15880789');`
    * `await page.keyboard.type('SD15880789');`
* Move around the page:
    * `await page.keyboard.press('Tab')`
* Press Enter:
    * `await page.keyboard.press('Enter')`
* Copy text:
    * `await page.keyboard.press('Control+C');`
    
##### Random
* Error - `page.goto: net::ERR_CERT_AUTHORITY_INVALID at https://example.com`. Fix:
```
    let context = await browser.newContext({
        ignoreHTTPSErrors: true
    });
```
* Error - `page.goto: net::ERR_CERT_AUTHORITY_INVALID at https://example.com`. Fix №2:
```
    const https = require('https');
    
    let response = await fetch("https://example.com", {
        "headers": {
            "content-type": "application/json"
        },
        "method": "POST",
        agent: new https.Agent({rejectUnauthorized: false}) // Ignores HTTPS errors
    });
    utils.assertTrue(response.ok);
```