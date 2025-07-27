### Getting started
* Install Git - `cmd /c winget install -e --id Git.Git`
* Install NodeJS?
* Install SillyTavern - `git clone https://github.com/SillyTavern/SillyTavern-Launcher.git && cd SillyTavern-Launcher && start installer.bat`
* Optional - setup proxy in `/SillyTavern/config.yaml`
  * `url: http://hofls:qwerty@84.26.222.43:8888`
  * (if proxy not available, console logs will be spammed with `ECONNREFUSED`)
  * (if ok - logs will contain `[Request Proxy] Proxy URL is used:`)
* Run `/SillyTavern/Start.bat`
* Open http://127.0.0.1:8000/
* Pick any featured character
* Configure `Api connections`:
  * API - `Chat Completion`
  * Chat Completion Source - `Google AI Studio`
  * If you don't have API key - generate it https://aistudio.google.com/app/apikey
  * Put key in `Google AI Studio API Key`
  * Google model - `gemini 2.5-pro` or `gemini-2.5-flash`
  * Click `Connect`
  * Click `Create a new connection profile`
* `AI Response configuration`:
  * `Max Response Length (tokens)` - 4000
  * `Context Size` - 10000
  * `Streaming` - Disabled (with streaming you won't see error messages)
  * `Temperature` - 1.0
  * `Web search` - Disabled
  * `Chat history` - Enabled
  * `Main prompt` - Paste your prompt there
