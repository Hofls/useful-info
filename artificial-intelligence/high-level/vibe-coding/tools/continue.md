### Add custom model provider
* Pick local config, fill it with:
```
name: Local Agent
version: 1.0.0
schema: v1
models:
  - name: polza
    provider: openai
    apiBase: "INSERT_URL_HERE"
    apiKey: "INSERT_API_KEY_HERE"
    model: "INSERT_MODEL_HERE"
    roles:
      - chat
      - edit
      - apply
```