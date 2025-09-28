### Electron
* Getting started:
  * Install - `npm install`
  * Run - `npm run start`
  * Build .exe - `npm run package`
* Structure:
  * `index.html` - UI
  * `main.js` - entry point
  * `preload.js` - gives `renderer` access to Node.js & Electron API
  * `renderer.js` - client side logic for the UI (listens to events/clicks, updates UI dynamically)
    * Has access to standard web API + anything exposed via `preload`