## Client side
* Linux 1:
    * `curl https://ifconfig.co`
    * `curl -x http://125.44.214.78:8888 --proxy-user hofls:qwerty https://ifconfig.co`
    * `curl -x http://hofls:qwerty@125.44.214.78:8888 http://example.com`
* Linux 2:
    * `export http_proxy=http://hofls:qwerty@125.44.214.78:8888`
    * `curl https://api.ipify.org/?format=json`
* Google chrome:
    * Extension `Proxy Helper`:
        * `Proxy Helper` -> Right click -> `Options` -> `General`
          * `HTTP PROXY:` insert server ip
          * `PORT:` insert port 8888
        * `Proxy Helper` -> Right click -> `Options` -> `Authentication` -> Set user/password
        * Restart browser
        * `Proxy Helper` -> Left click -> `HTTP PROXY`
    * Extension `Foxy proxy`. HTTP:
      * `Proxies` -> `Add` -> Fill fields:
        * Type - HTTP
        * Hostname - 125.44.214.78
        * Port - 8888
        * Username - hofls
        * Password - qwerty
      * `Save` -> Extension icon -> Activate profile
    * Extension `Foxy proxy`. SOCKS5:
      * Type - `SOCKS5`
      * IP - `127.0.0.1`
      * Port - `1080`
    * [check your IP](https://api.ipify.org/?format=json)
* Dockerfile:
  * `ENV http_proxy http://hofls:qwerty@125.44.214.78:8888`
  * To test - connect to container, execute `curl https://api.ipify.org/?format=json`
* Java:
    * `java -Dhttp.proxyHost=125.44.214.78 -Dhttp.proxyPort=8888 -jar minimal-project.jar`
    * TODO: make it work with basic auth `-Dhttp.proxyUser=SAdin -Dhttp.z654321Z`
* Etc:
  * Often you have to put it all in 1 line, e.g. `http://hofls:qwerty@84.26.222.43:8888` in `SillyTavern`