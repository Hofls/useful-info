### Getting started
* Download & install using [Windows Installer](https://github.com/nomic-ai/gpt4all)
* Launch `gpt4all/bin/chat.exe`
* `Find Models` -> Qwen or Llama -> `Download`
* Start chatting
	
### Other
* Parameters:
	* Models are stored at `C:\Users\%USERNAME%\AppData\Local\nomic.ai\GPT4All`
    * To chat with local docs - add their extensions to `Settings` -> `Allowed File Extensions List`
    * To stop wasting computational resources - `Settings` -> `Application` -> `Suggestion Mode` -> `Never`
* Features:
	* Chat with any LLM
	* Chat with your local files/docs
    * OpenAI compatible local API server
	
### Tests (from _local-models.md)
* Task - Chat with book "Why buddhism is true"
  * Embedding takes ~10 minutes
* Model - Qwen 7B (very good)
	* Response takes ~20 seconds
    * Regular chatting is instant
* Model - Llama 1B (mid)
	* Response takes ~1 second
* Model - Qwen 0.5B (useless)
