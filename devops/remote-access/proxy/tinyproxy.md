## Info
* Warning - proxy is limited to http/https traffic only. Better use VPN.

## Tinyproxy
##### Installation
* Server side:
    * `apt update`
    * `apt install tinyproxy -y`
    * `nano /etc/tinyproxy/tinyproxy.conf`
        * Comment out all `Allow` lines, e.g. `Allow 127.0.0.1`, `Allow ::1`
    * `service tinyproxy restart`
    * Check that proxy is working - `curl -iv -x http://127.0.0.1:8888 --location http://www.google.com`
    * Logs - `tail -n 400 /var/log/tinyproxy/tinyproxy.log | grep CONNECT`
* Client side:
    * Install `Proxy Helper` (extension for `Google chrome`)
    * `Proxy Helper` -> Right click -> `Options` -> `General`
      * `HTTP PROXY:` insert server ip
      * `PORT:` insert port 8888
    * `Proxy Helper` -> Left click -> `HTTP PROXY`
    * [Ceck your IP](https://api.ipify.org/?format=json)
    
##### Basic auth
* Server side:
    * `nano /etc/tinyproxy/tinyproxy.conf`
        * Uncomment `BasicAuth`, set user/password
    * `service tinyproxy restart`
    * Check that its working - `curl -iv --proxy-user "username:password" -x http://127.0.0.1:8888 --location http://www.google.com`
* Client side:
    * `Proxy Helper` -> Right click -> `Options` -> `Authentication` -> Set user/password
    * Restart browser
    * [Check your IP](https://api.ipify.org/?format=json)
