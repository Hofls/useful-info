### GUI for CLI
* Idea: take any CLI tool (e.g. jshell, git, kubectl), implement GUI for it
* Architecture:
  ```
  Renderer (HTML/CSS/JS)
          ↓ IPC
  Main process (Node.js)
          ↓ stdin/stdout
  JShell (CLI)
  ```
* Commands:
  * Install - `npm install`
  * Run - `npm run start`
  * Build .exe - `npm run package`
