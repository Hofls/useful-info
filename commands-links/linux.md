# Linux
## Commands

#### CLI Usage
* Show recent commands
  * `history`
* Current user and group
  * `id`
* Became almighty root user
  * `sudo su`
* Copy from console
  * Select text with mouse
* Show full path to current working directory
  * `pwd`
* Show documentation for `ls` command:
  * Detailed description, without examples: `man ls`
  * Brief description, with examples: `tldr ls`
* Autocomplete:
  * `echo "hey" > example.text`
  * `cat ex`
  * Press `Tab`
  
#### Commands combo
* Execute commands in parallel:
  * `echo "a" & echo "b"`
* Execute commands sequentially:
  * `echo "a" && echo "b"`
* Pipeline output of one command to input of another:
  * `echo "good" | grep go`
* Write output of command to file:
  * `echo "a" > example.txt`
   
#### Processes
* Run command 'standalone.sh' in the background, immune to hangups
  * `nohup /opt/wildfly-15.0.1.Final/bin/standalone.sh &`
* Find and kill process with name containing "prctodth"
   ```
   ps aux | grep prctodth
   kill -9 832747
   ```
* Ordered list of files/folders in current directory
  * `ls -l`
* Call `java` from CLI by its name alone, without full path:
    * Copy java executable to `/usr/bin`
    * Call `java -version`
* Service manager
  * List all services `systemctl list-units --type=service`
  * Restart service apache2 `systemctl restart apache2`
  * Show apache2 status `systemctl status apache2`
  * Look at service logs `journalctl -u apache2.service`

#### Files/Folders
* Find file with name containing 'specopsfls' in this folder and all subfolders
  * `find . -name *specopsfls*` 
* Find folder with name containing 'fldtofnd' in this folder and all subfolders 
  * `find / -type d -name '*fldtofnd*'` 
* Write last 20k lines from services.log to temp.log
  * `tail -n 20000 services.log > temp.log`
* Give all permissions to script `reload.sh`
  * `chmod 777 reload.sh`
* If you are unable to delete some files/folders:
  * Kill process:
    * Find process that holds open files in folder "/var/lib/docker":
      * `lsof | grep /var/lib/docker`
    * Kill it
  * Resolve mounting issues:
   * Try to delete folder: `rm -r docker`
     * Errors will show full path to problematic files/folders
   * Umount each of them: `umount docker/containers/82JDSAJDK2/shm`

#### Resources usage
* Display amount of available disk space
  * `df -h`
* Live feed of process resource usage
  * `top`
    * Press `e` to switch format of value (kb -> mb -> gb))
    * `shift+m` to sort by RAM usage
    * `shift+p` to sort by CPU usage
* Show total memory usage (RAM/swap)
  * `free -h`

#### Network
* Shows ports in use
  * `netstat -tuplen` 
* Opens ports `80` and `443` in firewall
  ```
  firewall-cmd --permanent --zone=public --add-port=80/tcp
  firewall-cmd --permanent --zone=public --add-port=433/tcp
  firewall-cmd --reload
  ```
* Local DNS:
  * In file `etc/hosts` insert `231.23.143.25 camel.keras.com`
* Show path of an IP packet
  * `traceroute google.com`

#### Others
* Install Docker
  * `apt update`
  * `apt install docker.io`
* Show info about linux distributive (version)
  * `cat /etc/*-release`
* Run docker-compose on OS start
  * `crontab -e`
  * Add line `@reboot cd /opt/highload && docker-compose up -d`
  * `:wq`
* Boot up file manager
  * `mc`
  * `ranger`
* Make long command readable:
  ```
  docker run \
    --network host \
    --add-host camel.test.keras.ru:32.2.121.43 \
    --name rest-backend \ 
    --env-file ./environment.list \
  rest-sp-back:1.0` 
  ```
