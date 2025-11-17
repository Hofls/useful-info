### Server side
* Connect to server `125.44.214.78`
* Install - `apt install shadowsocks-libev`
* Configure - `nano /etc/shadowsocks-libev/config.json`:
    ```
    {
        "server":"0.0.0.0",
        "server_port":8388,
        "password":"qwerty",
        "timeout":300,
        "method":"aes-256-gcm",
        "fast_open":true,
        "nameserver":"1.1.1.1",
        "mode":"tcp_and_udp"
    }
    ```
* Check:
  * `systemctl status shadowsocks-libev`
  * `netstat -tupln | grep 8388`

### Client side
* Shadowsocks client:
  * Run .exe from https://github.com/shadowsocks/shadowsocks-windows/releases
  * Make sure server is available - `telnet 125.44.214.78 8388`
  * Set parameters:
    * IP address - `125.44.214.78`
    * Port - `8388`
    * Password - `qwerty`
    * Encryption - `aes-256-gcm`
  * Open logs:
    * Tray icon -> Help -> Detailed journal
    * Tray icon -> Help -> Show journal
  * Make sure client is available - `telnet localhost 1080`
* Configure Google Chrome proxy extension (e.g. FoxyProxy):
  * Check `SOCKS5` at `proxy.md`
