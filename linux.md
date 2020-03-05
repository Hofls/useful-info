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
  
## Connect to server using ssh key
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

## Tunneling
* todo - describe use case
