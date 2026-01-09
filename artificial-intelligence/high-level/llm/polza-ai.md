#### Polza AI
* Parameters:
  * API URL - https://api.polza.ai/api/v1
  * Models - https://polza.ai/models
  * Token - https://polza.ai/dashboard
* Most performant models (below 1$ per million tokens):
  * google/gemini-2.5-flash-lite
  * x-ai/grok-4-fast
  * deepseek/deepseek-v3.2
* Check via fetch:
```
const response = await fetch('https://api.polza.ai/api/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer INSERT_TOKEN_HERE',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    model: 'qwen/qwen3-14b',
    messages: [
      { role: 'user', content: 'Hello! Who are you?' }
    ]
  })
});

const data = await response.json();
console.log(data.choices[0].message.content);
console.log(`Cost: ${data.usage.cost} rub.`);
```