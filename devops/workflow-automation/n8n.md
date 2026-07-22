* Install:
  * `apt update && apt install docker.io -y`
  * `docker run -d --restart unless-stopped --name n8n -p 5678:5678 -e N8N_SECURE_COOKIE=false -v n8n_data:/home/node/.n8n docker.n8n.io/n8nio/n8n`
* Open in browser - http://YOUR_SERVER_IP:5678
* Do some automation by connecting bunch of blocks
  * Send http requests, ask AI to do something, integrate with different services, run code, control flow (loop/if-else), transform data