### Server side
* All that is needed - open SSH port & public key in `nano ~/.ssh/authorized_keys`

### Client side
* Forward traffic from client port 1080 to remote server via SSH:
  * `ssh -i D:\Software\Keys\openssh-private-key -D 1080 -N hofls@125.44.214.78`
  * Create .bat for convenience
  * Run bat on startup: `Win+R` -> `shell:startup` -> Paste .bat shortcut there
* Forward http traffic from browser to port 1080:
  * Check `SOCKS5` at `proxy.md`
* Optional:
  * Turn proxy into VPN - `devops/remote-access/vpn/nekobox-nekoray-socks5`
