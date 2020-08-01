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
* Ordered list of files/folders in current directory
  * `ls -l`
* Install Docker
  * `apt update`
  * `apt install docker.io`
* Copy from console
  * Select text with mouse
* Show path of an IP packet
  * `traceroute google.com`
* Show RAM/swap usage
  * `free -h`
* Show full path to current working directory
  * `pwd`
* Show info about linux distributive
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
* Find process that holds open files in folder "/var/lib/docker":
  * `lsof | grep /var/lib/docker`

* Service manager
  * List all services `systemctl list-units --type=service`
  * Restart service acpache2 `systemctl restart apache2`
