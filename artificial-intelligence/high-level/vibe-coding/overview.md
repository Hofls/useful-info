### Main
* [mcp.md](mcp/mcp.md)
* [skills.md](skills/skills.md)

### Coding agents / Vibe coding
* `BlackBox AI` - (BYOM/MCP marketplace/Skills) + (VSCODE/IDEA)
  * Settings -> Tools -> Disable command execution 
* `Kilo code` - (BYOM/MCP marketplace) + (VSCODE/IDEA)
    * Pick `OpenAI Compatible` to add custom url/key/model
* `Cline` - (BYOM/MCP) + (VSCODE/IDEA)
* `Koda` - (BYOM/MCP) + (VSCODE)
* `Roo Code` - (BYOM/MCP marketplace) + (VSCODE)
    * Pick `OpenAI Compatible` to add custom url/key/model
* `Yandex Code Assistant` - (BYOM/MCP marketplace) + (VSCODE/IDEA)
    * Installation process is unusual - https://sourcecraft.dev/portal/docs/en/code-assistant/
    * Usage statistics - https://sourcecraft.dev/me/codeassistant/settings
* `Continue` - (BYOM/MCP) + (VSCODE/IDEA)
    * Adding custom provider is scuffed (look at `tools/continue.md`)
* `OpenCode` - bad
    * BYOM is super scuffed (gotta manually edit `C:\Users\%USERPROFILE%\.config\opencode\opencode.json`)
* `Qodo Gen` - bad, no true BYOM, requires registration
* `Cursor IDE` - bad, requires registration + sms verification

### AI assistant / AI autocomplete
* `Tabby` - bad, requires running an entire server
* `Windsurf` - bad, requires auth, no true BYOM
* `CodeGPT` - bad, requires auth, no true BYOM
* `Tabnine` - bad, paywalled

### Workflows
* Web chat:
  * Description - Manually gather relevant code, paste into chat, tell AI what to do
  * Upgrade 1 - Have templates with typical code examples ready
  * Upgrade 2 - Gather relevant code automatically (e.g. context-extractor plugin for IntelliJ IDEA)
* Smart autocomplete:
  * Description - Install AI assistant/AI autocomplete into IDE, write code manually, accept/reject suggestions
* Agents:
  * Description - Pay for AI API, install plugin (e.g. Kilo code), tell AI what to do
  * Upgrade 1 - Prepare .md file with detailed project description (architecture description, how to build/test, code examples etc)
  * Upgrade 2 - Ask AI to maintain it's own .md file, with most important info
  * Upgrade 3 - Use multiple agents at the same time
