* Install playwright MCP via vibe-coding plugin
* Make sure following text appeared in mcp_settings.json:
```
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp"]
    }
  }
}
```
* Run mcp:
```
npx @playwright/mcp
```
* Ask AI - `Navigate to example.com using playwright MCP`