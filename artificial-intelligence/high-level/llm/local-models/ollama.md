# Ollama

### Other
* Models are stored at `C:\Users\%USERNAME%\.ollama\models`

### CLI
* Getting started:
```
ollama pull Qwen3.5 0.8B
ollama run Qwen3.5:0.8B
/set nothink
```

### GUI
* Is scuffed atm - no way to set prompt, no way to disable thinking

### OpenAI-like API
* Kinda scuffed too
* Launch ollama `ollama serve`
* Wait until it loads - http://localhost:11434/
* Send http request via browser console:
```
const response = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "qwen3.5:0.8b",
      prompt: "Who are you?",
      stream: false
    })
});

const data = await response.json();
console.log(data);
```