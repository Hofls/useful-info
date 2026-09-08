### Deepseek harness
* Run `npx @deepseek-ai/dsh web`
  * Better create `.bat` file with this command and add it to `PATH`
  * Windows antimalware/antivirus drastically reduces startup speed. Fix:
    * Search -> Virus & threat protection -> Manage Settings -> Add or remove exclusions -> Process -> node.exe
* Open http://127.0.0.1:3080
* [List of plugins](https://github.com/awesome-dsh-plugin/awesome-dsh-plugin)

### MCP
* Main instruction is in claude-code.md
* Insert text into `cordis.patch.yml` located at `C:\Users\%USERPROFILE%\.dsh\profiles\web`:
* Playwright:
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
* Blender:
  ```
  - insert:
    - id: mcp-blender
      name: '@deepseek-ai/dsh-mcp-client'
      config:
        serverName: blender
        transport: stdio
        command: uvx
        args: ['blender-mcp']
  ```
  
### Other
* To run tests that require access to docker, add following text to CLAUDE.md:
  * `escalate deepseek harness acccess (from current "Workspace write", to "Full access") and run mvn -pl ms-shop-service test -Dtest=CalculatorServiceTest`
* 