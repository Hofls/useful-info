### Getting started
* Repo - https://github.com/open-webui/open-webui
* Launch VPN (without it dockerhub may throttle download speed)
* `docker run -d -p 3000:8080 --gpus=all -v ollama:/root/.ollama -v open-webui:/app/backend/data --name open-webui --restart always ghcr.io/open-webui/open-webui:ollama`
* Open http://localhost:3000/ in a browser
* Create admin account (just fill all fields with `webui`)
* Find a model name in https://ollama.com/search
  * For example - `llama3.2:3b`
* `Select a model` -> insert `llama3.2:3b` -> `Pull llama3.2:3b from Ollama.com`
* Start chatting

### Other
* Features:
  * Call AI / Talk to AI via voice chat / TTS + STT / 
  * Regenerate response, edit response, continue response
* Parameters:
  * User -> Settings -> Audio -> Set Voice -> Microsoft Zira
