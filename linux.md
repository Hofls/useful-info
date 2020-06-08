# Linux
## Commands
* Run command 'standalone.sh' in the background, immune to hangups
  * `nohup /opt/wildfly-15.0.1.Final/bin/standalone.sh &`
* Find file with name containing 'specopsfls' in this folder and all subfolders
  * `find . -name *specopsfls*` 
* Find folder with name containing 'fldtofnd' in this folder and all subfolders 
  * `find / -type d -name '*fldtofnd*'` 
* Shows ports in use
  * `netstat -tuplen` 
* Opens ports `80` and `443` in firewall
  ```
  firewall-cmd --permanent --zone=public --add-port=80/tcp
  firewall-cmd --permanent --zone=public --add-port=433/tcp
  firewall-cmd --reload
  ```
* Find and kill process with name containing "prctodth"
   ```
   ps aux | grep prctodth
   kill -9 832747
   ```
* Display amount of available disk space
  * `df -h`
* Show recent commands
  * `history`
* Live feed of process resource usage
  * `top`
* Current user and group
  * `id`
* Became almighty root user
  * `sudo su`
* Install Docker
  * `apt-get update`
  * `apt-get install docker.io`
* Copy from console
  * Select text with mouse
* Show path of an IP packet
  * traceroute google.com
  
## Connect to server using ssh key
* Use case - you got tired of entering password each time / want to improve level of security
* Generate ssh keys (private and public)
    * On Windows - use `PuTTYgen.exe`
    * On Linux - `ssh-keygen -t rsa`
* Add public key to authorized list on server
    * `cd ~/.ssh/`
    * Copy public key into file `authorized_keys`
    * Public key should look like `ssh-rsa AAAAB3N...2DA key-comment`
* Connect via Putty
    * Add private key in `Connection => SSH => Auth => Private key file for authentication:`
    * Go to `Session`, set Host Name (or IP address)
        * Save session
        * Open connection

## SSH Tunneling (Port Forwarding)
* Use case - app is running on a server, has web-interface on localhost. For some reasons you cant open it to outside world.
* Create SSH tunnel in `PUTTY`:
    * Go to `Connection` => `SSH` => `Tunnels`, set values
        * `Destination - Dynamic`
        * `Source port - 9999`
        * Press `Add`
    * Go to `Session`, set Host Name (or IP address)
        * Save session
        * Open connection
* Create `Google Chrome` shortcut
    * Change run parameters, so they look like this
        * `"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --proxy-server="socks5://127.0.0.1:9999"`
    * Open `Google Chrome`
* Check your ip address on any service, to make sure it is changed
* To access remote localhost
    * Add following line to `/etc/hosts` file on the server
        * `127.0.0.1 remote.host`
    * To access app running on a remote localhost, on port 8081, use:
        * http://remote.host:8081

