### Simplest MCP (FETCH)
* Paste into mcp.json:
```
{
  "mcpServers": {
    "fetch": {
      "command": "npx",
      "args": [
        "-y",
        "fetch-mcp"
      ],
      "env": {}
    }
  }
}
```
* Send message to llm - `use fetch to get example.com`