## Info
* Warning - proxy is limited to http/https traffic only. Better use VPN.

## Squid
##### Installation
* Server side:
    * `apt install squid`
    * `nano /etc/squid/squid.conf`
        * Add `http_access allow all` after `http_access allow localnet`
    * `systemctl restart squid`
* Client side:
    * Install `Proxy Helper` (extension for `Google chrome`)
    * Set server IP, port 3128, activate `http proxy`
    * [check your IP](https://api.ipify.org/?format=json)
    
##### Basic auth
* Super bloated. Better use `Tinyproxy`

##### Problems + Solutions
* Cant access proxy
    * Turn off firewall - `systemctl stop firewalld`
    * Or open port:
    ```
    firewall-cmd --permanent --zone=public --add-port=3128/tcp
    firewall-cmd --reload
    ```
* Proxy is slow
    * Problem:
        * After connecting to VPN - proxy is very slow
        *`journalctl -f` has errors "Could not determine this machines public hostname" 'powos-web-t' rDNS test failed
    * Solution:
        * Add in `/etc/hosts` IP of this server, e.g. `10.154.34.222 powos-web-t`
* If you have server with VPN and proxy. Resources are available directly from server, but unavailable via proxy
    * Solution 1:
        * VPN should be running -> Change /etc/hosts -> Restart proxy
    * Solution 2:
        * IP addresses/routes depend on if VPN was ON/OFF while you started proxy
        * Try restarting proxy (with VPN turned ON/OFF)
    * Solution 3:
        * Try pinging resource with VPN and without VPN - results in 2 different IP addresses
        * Check logs - `/var/log/squid/access.log`, possibly IP on the right side is wrong
        * Edit `/etc/hosts`, add correct IP, restart VPN (otherwise VPN will ignore changes)
* Ban websites to make sure people use proxy according to its purpose (e.g. access to sites available only through VPN)
    * `nano /etc/squid/squid.conf`
        * Look for `# INSERT YOUR OWN RULE(S) HERE TO ALLOW ACCESS FROM YOUR CLIENTS`
        * `acl bad_url dstdomain "/etc/squid/banned-sites.acl"`
        * `http_access deny bad_url`
    * `nano /etc/squid/banned-sites.acl`
        * `.youtube.com`
        * `.twitch.tv`