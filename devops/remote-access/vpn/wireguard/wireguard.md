#### Getting started. Server side
* Install:
  * Execute:
      ```
      sudo su
      curl -O https://raw.githubusercontent.com/angristan/wireguard-install/master/wireguard-install.sh
      chmod +x wireguard-install.sh
      ./wireguard-install.sh
      ```
    * `IPv4 or IPv6 public address` could be wrong (internal instead of external)
  *  Download `/home/hofls/wg0-client-clint.conf` or `/root/wg0-client-clint.conf` (actual path should be visible in console, after script execution)
* Maintenance:
  * Check status - `systemctl status wg-quick@wg0`
  * Check logs - `journalctl --unit=wg-quick@wg0 -n 100 --no-pager`
  * Add user / Revoke user / Uninstall - `./wireguard-install.sh`

#### Getting started. Client side
* Install [WireGuard client](https://www.wireguard.com/install/)
* Download `wg0-client-clint.conf` from server, `Add Tunnel`
