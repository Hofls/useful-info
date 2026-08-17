### Claude Code
* `Claude code` - (TERMINAL/VSCODE/JETBRAINS/DESKTOP (paid))
* If a task is huge - automatically creates subagents and delegates to them (or you can ask for it manually)
* Create `settings.json` in `C:\Users\%USERNAME%\.claude`, fill with:
```
{
    "env": {
        "ANTHROPIC_BASE_URL": "https://api.deepseek.com/anthropic",
        "ANTHROPIC_AUTH_TOKEN": "INSERT_YOUR_TOKEN_HERE",
        "ANTHROPIC_MODEL": "deepseek-v4-flash[1m]",
        "ANTHROPIC_DEFAULT_OPUS_MODEL": "deepseek-v4-pro[1m]",
        "ANTHROPIC_DEFAULT_SONNET_MODEL": "deepseek-v4-flash[1m]",
        "ANTHROPIC_DEFAULT_HAIKU_MODEL": "deepseek-v4-flash[1m]",
        "CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC": "1"
    },
    "effortLevel": "low",
    "model": "haiku"
}
```
* To configure proxy, add to `settings.json`:
```
{
    "env": {
        "HTTPS_PROXY": "http://username:password@proxy.example.com:8080",
        "HTTP_PROXY": "http://username:password@proxy.example.com:8080",
        "NO_PROXY": "localhost,127.0.0.1"
    }
}
```
* On a new project always start with `/init` to create `CLAUDE.md`

### Claude Code - MCP
* Browser:
```
claude mcp add --scope user playwright -- npx -y @playwright/mcp@latest
claude mcp list
Test - run claude, ask it to navigate to example.com
```

### Claude Code - Skills
* [Frontend design](https://github.com/anthropics/claude-code/blob/main/plugins/frontend-design/skills/frontend-design/SKILL.md)
* 