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
    * Press `e` to switch format of value (kb -> mb -> gb))
    * `shift+m` to sort by RAM usage
    * `shift+p` to sort by CPU usage
* Current user and group
  * `id`
* Became almighty root user
  * `sudo su`
* Ordered list of files/folders in current directory
  * `ls -l`
* Install Docker
  * `apt update`
  * `apt install docker.io`
* Copy from console
  * Select text with mouse
* Show path of an IP packet
  * `traceroute google.com`
* Show total memory usage (RAM/swap)
  * `free -h`
* Show full path to current working directory
  * `pwd`
* Show info about linux distributive (version)
  * `cat /etc/*-release`
* Write last 20k lines from services.log to temp.log
  * `tail -n 20000 services.log > temp.log`
* Run docker-compose on OS start
  * `crontab -e`
  * Add line `@reboot cd /opt/highload && docker-compose up -d`
  * `:wq`
* Give all permissions to script `reload.sh`
  * `chmod 777 reload.sh`
* Boot up file manager
  * `mc`
  * `ranger`
* Show documentation for `ls` command:
  * Detailed description, without examples: `man ls`
  * Brief description, with examples: `tldr ls`
  
* If you are unable to delete some files/folders:
    * Kill process:
        * Find process that holds open files in folder "/var/lib/docker":
          * `lsof | grep /var/lib/docker`
        * Kill it
    * Resolve mounting issues:
        * Try to delete folder: `rm -r docker`
            * Errors will show full path to problematic files/folders
        * Umount each of them: `umount docker/containers/82JDSAJDK2/shm`
    

* Service manager
  * List all services `systemctl list-units --type=service`
  * Restart service apache2 `systemctl restart apache2`
  * Look at service logs `journalctl -u apache2.service`
