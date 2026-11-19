* Create `setup-tg-proxy.sh`:
```
#!/usr/bin/env bash
set -e

PORT="${1:-443}"

# Generate a 32-char hex secret
SECRET=$(openssl rand -hex 16)

# Get public IPv4
IP=$(curl -4 -fsSL ifconfig.me || curl -4 -fsSL api.ipify.org)

# Open firewall port if UFW is active
if command -v ufw >/dev/null 2>&1 && sudo ufw status | grep -q "Status: active"; then
  sudo ufw allow "${PORT}/tcp"
fi

# Replace any existing container and start MTProxy
sudo docker rm -f tg-mtproxy >/dev/null 2>&1 || true
sudo docker run -d \
  --name tg-mtproxy \
  --restart unless-stopped \
  -p "${PORT}:443" \
  -v tg-proxy-data:/data \
  -e SECRET="${SECRET}" \
  --log-opt max-size=50m \
  telegrammessenger/proxy:latest

echo ""
echo "Done! Connect in Telegram using this link:"
echo "https://t.me/proxy?server=${IP}&port=${PORT}&secret=${SECRET}"
```
* Execute `./setup-tg-proxy.sh 44578`
