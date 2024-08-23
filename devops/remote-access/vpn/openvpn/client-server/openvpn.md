#### Getting started. Server side
* Install:
    * Alternative A (script from nyr):
      * `wget https://git.io/vpn -O openvpn-install.sh && bash openvpn-install.sh`
        * Public IP - had to replace it, by default showed internal IP (`curl ifconfig.co`)
        * Client name - clint
      * INSERT_NAME_HERE = `openvpn-server@server.service`
    * Alternative B (script from angristan):
      * `cd /opt`
      * `curl -O https://raw.githubusercontent.com/Angristan/openvpn-install/master/openvpn-install.sh`
        * Optional - `apt update && apt install curl`
      * `chmod +x openvpn-install.sh`
      * `./openvpn-install.sh`
          * Public IP - had to replace it, by default showed internal IP (`curl ifconfig.co`)
          * Client name - clint
      * INSERT_NAME_HERE = `openvpn@server`
    * Download `/home/hofls/clint.ovpn` or `/root/clint.ovpn` (actual path should be visible in console, after script execution)
* Maintenance:
    * Check status - `systemctl status INSERT_NAME_HERE`
    * Check logs - `journalctl --unit=INSERT_NAME_HERE -n 100 --no-pager`
    * Add new user / Revoke existing user / Uninstall - `./openvpn-install.sh` -> `Pick an item from menu`
* Problems:
    * Problem - OpenVPN connects successfully, but you still can't open any web page or ping anything \
      Solution - wait for a few minutes, until `Inactivity timeout`, vpn will restart and will work \
      To speed it up - `nano /etc/openvpn/server/server.conf` -> `keepalive 3 10` -> `systemctl restart INSERT_NAME_HERE`
    * 

#### Getting started. Client side
* Client side (Local VM / Real PC):
    * Notice: not really working on cloud VM (interrupts ssh connection)
    * `apt update && apt install openvpn network-manager-openvpn`
    * Copy `clint.ovpn` to `/etc/openvpn/client/clint.ovpn`
    * Run VPN:
        * Check your IP - `curl ifconfig.co` (shows client IP)
        * Run VPN `openvpn /etc/openvpn/client/clint.ovpn`
        * Check your IP - `curl ifconfig.co` (shows server IP)
