### Other
* To write code, better use model with `Capabilities: Reasoning`, to allow thinking before answer
* Models are stored at `C:\Users\%USERNAME%\.lmstudio\models`

### MCP
* Allow model to run js code:
  * Download any model with `Capabilities: Tool Use`, for example `Qwen3 Vl 4B`
  * Plug icon -> Activate `js-code-sandbox` -> ask "use js to print current time"
* Allow model to analyze images:
  * Download any model with `Capabilities: Vision`, for example `Qwen3 Vl 4B`
  * Plug icon -> Activate `rag v1` -> drag & drop any image
* [Custom MCPs](../../mcp)

### OpenAI-like API
* In console, execute - `lms server start`
* Send http request via browser console:
```
const response = await fetch('http://localhost:1234/v1/completions', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    prompt: "Hello! Who are you?",
    max_tokens: -1,
    temperature: 0.7,
    stream: false
  })
});

const data = await response.json();
console.log(data);
```
