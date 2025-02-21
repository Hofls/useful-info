# Local network
* General idea:
  * Open router control panel (e.g. http://192.168.0.1)
  * Find all connected devices
  * Check availability via ping
  * Pick one device to use as a server, install software and connect (more info at devops -> remote-access)
* Smartphone as http server:
  * Connect phone to wifi, make sure it is pingable from pc (phone ip is visible on a router http page)
  * On phone - download "Simple HTTP Server" from app store, put files in shared folder, press "Start"
  * On PC - open http://INSERT_PHONE_IP_HERE:8080
* 