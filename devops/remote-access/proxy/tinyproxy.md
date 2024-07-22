## Info
* Warning - proxy is limited to http/https traffic only. Better use VPN.

## Tinyproxy
##### Installation
* Server side:
    * `apt update`
    * `apt install tinyproxy -y`
    * `nano /etc/tinyproxy/tinyproxy.conf`
        * Comment out `Allow 127.0.0.1`
    * `service tinyproxy restart`
    * Check that proxy is working - `curl -iv -x http://127.0.0.1:8888 --location http://www.google.com`
* Client side:
    * Install `Proxy Helper` (extension for `Google chrome`)
    * Set server IP, port 8888, activate `http proxy`
    * [check your IP](https://api.ipify.org/?format=json)
    
##### Basic auth
* Server side:
    * `nano /etc/tinyproxy/tinyproxy.conf`
        * Uncomment `BasicAuth`, set user/password
    * `service tinyproxy restart`
    * Check that its working - `curl -iv --proxy-user "username:password" -x http://127.0.0.1:8888 --location http://www.google.com`
* Client side:
    * Set user/password
    * [check your IP](https://api.ipify.org/?format=json)
