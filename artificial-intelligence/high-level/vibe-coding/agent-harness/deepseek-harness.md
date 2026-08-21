### Deepseek harness
* Run `npx @deepseek-ai/dsh web`
  * Better create `.bat` file with this command and add it to `PATH`
* Open http://127.0.0.1:3080
* [List of plugins](https://github.com/awesome-dsh-plugin/awesome-dsh-plugin)

### Deepseek harness - MCP
* Insert text into `cordis.patch.yml` located at `C:\Users\%USERPROFILE%\.dsh\profiles\web`:
```
- insert:
    - id: mcp-playwright
      name: '@deepseek-ai/dsh-mcp-client'
      config:
        serverName: playwright
        transport: stdio
        command: npx
        args: ['-y', '@playwright/mcp@latest']
```
* Run dsh, ask it to navigate to example.com