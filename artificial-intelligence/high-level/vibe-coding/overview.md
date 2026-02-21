### Vibe coding - main
* [mcp.md](mcp/mcp.md)
* [skills.md](skills/skills.md)

### Coding agents / Vibe coding
* `Kilo code` - (BYOM/MCP marketplace) + (VSCODE/IDEA)
  * Settings -> Providers -> Pick `OpenAI Compatible` to add custom url/key/model
  * Settings -> Auto-Approve -> Disable command execution
  * Settings -> Context -> Workspace file context limit -> 50
* `Cline` - (BYOM/MCP) + (VSCODE/IDEA)
* `BlackBox AI` - (BYOM/MCP marketplace/Skills) + (VSCODE/IDEA)
  * Settings -> Auto-Approve -> Disable command execution
  * Settings -> Context -> Workspace file context limit -> 50
  * Settings -> Providers -> Pick `OpenAI Compatible` to add custom url/key/model
* `Koda` - (BYOM/MCP) + (VSCODE)
* `Roo Code` - (BYOM/MCP marketplace) + (VSCODE)
    * Pick `OpenAI Compatible` to add custom url/key/model
* `Yandex Code Assistant` - (BYOM/MCP marketplace) + (VSCODE/IDEA)
    * Installation process is unusual - https://sourcecraft.dev/portal/docs/en/code-assistant/
    * Usage statistics - https://sourcecraft.dev/me/codeassistant/settings
* `Continue` - (BYOM/MCP) + (VSCODE/IDEA)
    * Adding custom provider is scuffed (edit local config, add new model with `apiBase`, `apiKey`, `model`, `provider: openai` fields)
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
* Others:
  * https://addyo.substack.com/p/how-to-write-a-good-spec-for-ai-agents
  * https://addyo.substack.com/p/the-80-problem-in-agentic-coding
  * https://mitchellh.com/writing/my-ai-adoption-journey
  * https://www.reddit.com/r/ExperiencedDevs/comments/1qq8y8u/ai_is_working_great_for_my_team_and_yall_are/
  * https://www.reddit.com/r/ClaudeAI/comments/1qb90zq/9_tips_from_a_developer_gone_vibecoder/
  * https://www.reddit.com/r/ClaudeAI/comments/1r5d576/small_company_leader_here_ai_agents_are_moving/
  * https://www.reddit.com/r/ClaudeAI/comments/1r0dxob/ive_used_ai_to_write_100_of_my_code_for_1_year_as/
