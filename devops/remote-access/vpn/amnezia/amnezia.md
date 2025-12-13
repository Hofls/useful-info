### Amnezia
* Download - https://amnezia.org/downloads
* VPN:
  * AmneziaVPN -> Self-hosted VPN -> Fill "Server IP", "Username", "Password"/"Private key" -> Automatic
    * Or pick protocol yourself - AmneziaWG, WireGuard, XRay, OpenVPN, OpenVPN over Cloak, OpenVPN over SS, IPsec
    * Amnezia should install docker on server & run container "amnezia-awg" 
* Socks5 proxy server:
  * AmneziaVPN -> Server 1 -> Options -> Services -> SOCKS5 proxy server -> Install
    * Amnezia should install docker on server & run container "amnezia-socks5proxy"
    * On client side use FoxyProxy (look at proxy.md)