# Linux
* `snapd` - universal package manager

## Commands

#### CLI Usage
* Show recent commands
    * `history`
* Clear CLI
    * `clear`
* Current user and group
    * `id`
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
* Quickly find out what `-t` parameter means in `ssh-keygen` command:
    * `man ssh-keygen | grep -- -t`
    * `Double dash --` signifies the end of command options, after which only positional parameters accepted
* Autocomplete:
    * `echo "hey" > example.text`
    * `cat ex`
    * Press `Tab`
* Erase command line
    * `ctrl-u`
* Delete a word to the left/right
    * `ctrl+w` / `alt+d`
    
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
* Call `java` from CLI by its name alone, without full path:
    * 1st way
        * Create symlink in `/usr/bin`
        * Call `java -version`
    * 2nd way
        * `export JAVA_HOME=/opt/jdk-15.0.1`
        * `export PATH=$JAVA_HOME/bin:$PATH`
* Service manager
    * List all services `systemctl list-units --type=service`
    * Restart service apache2 `systemctl restart apache2`
    * Show apache2 status `systemctl status apache2`
    * Look at service logs `journalctl -u apache2.service`
* Monitor system calls and signals
    * `strace ls`

#### Files/Folders
* Find file with name containing 'specopsfls' in this folder and all subfolders
    * `find . -name *specopsfls*` 
* Find folder with name containing 'fldtofnd' in this folder and all subfolders 
    * `find / -type d -name '*fldtofnd*'` 
* Write last 20k lines from services.log to temp.log
    * `tail -n 20000 services.log > temp.log`
* Give all permissions to script `reload.sh`
    * `chmod 777 reload.sh`
* Add a folder to uncompressed archive (.tar):
    * `tar -cvf uncompressed.tar myfolder`
* Extract everything from .tar archive:
    * `tar -xvf uncompressed.tar`
* Ordered list of files/folders in current directory
    * `ls -l`
* Create symlink
    * `ln -s /usr/lib/jvm/jre7/bin/java /usr/bin/java`
* If you are unable to delete some files/folders:
    * Kill process:
        * Find process that holds open files in folder "/var/lib/docker":
            * `lsof | grep /var/lib/docker`
        * Kill it
    * Resolve mounting issues:
     * Try to delete folder: `rm -r docker`
         * Errors will show full path to problematic files/folders
     * Umount each of them: `umount docker/containers/82JDSAJDK2/shm`

#### Resources/usage
* Display amount of available disk space
    * `df -h`
* Live feed of process resource usage
    * `top`
        * Press `e` to switch format of value (kb -> mb -> gb))
        * `shift+m` to sort by RAM usage
        * `shift+p` to sort by CPU usage
* Show total memory usage (RAM/swap)
    * `free -h`
        * Column `free` - amount of memory that is not used at all
        * Column `available` - free memory + memory that is used for cache/buffer (can become available if needed)
    * `cat /proc/meminfo` is less human readable, but has more information
* CPU info:
    * `cat /proc/cpuinfo`
* GPU info:
    * `lshw -C display`

#### Network
* Shows ports in use
    * `netstat -tuplen`
        * Local Address `0.0.0.0:6080` / `:::6080` means its accessible from outside
        * Local Address `127.0.0.1:6080` means its accessible only from localhost
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
* SSH, SCP
    * Commands moved to `devops` repository
* Download file from internet
    * `wget "https://apache-mirror.com/file.tar.gz"`
* Send get request
    * `curl https://example.com`
* Send anything to IP:PORT
    * `telnet 84.154.131.23 9200`
* Get your IP address (useful on VMs)
    * `ip addr | grep inet`
* Redirect traffic (Port-forwarding)
    * `socat tcp-listen:9090,reuseaddr,fork tcp:localhost:8000`
    * For more info look at `devops` repository
* Send SOAP request
    ```
    curl -X POST -H "Content-Type: text/xml" \
    --data-binary @request.xml \
    http://someamel.test.edias.som.ru/proxy/IMIS/IMIS/v5S/ProxyService \
    > response.xml
    ```
* Send POST request with JSON body
    ```
    curl \
    --header "Content-Type: application/json" \
    --request POST \
    --data '{"text":"Hello world!"}' \
    https://integram.org/webhook/dD3fFkdS2KL
    ```
    
#### Text processing
* Replace every occurrence of `Sam` with `Mike` in `report.txt`
    * `sed 's/Sam/Mike/g' report.txt > report_new.txt`
* `awk` is outdated, better use `python`
* Edit text file
    * `nano /etc/gitlab-runner/config.toml`
    * `vim /etc/gitlab-runner/config.toml`
    
#### Special characters
* `&` - run in background
* `|` - pipe output of one command as input of another
* `;` - command separator
* `>` - output redirect
* `*` `?` - wildcards
* `#` - Comment
* `\` - Escape next character

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
* Print environment variables
        * `printenv`
        * `echo $JAVA_HOME`
* Make long command readable:
    ```
    docker run \
        --network host \
        --add-host camel.test.keras.ru:32.2.121.43 \
        --name rest-backend \ 
        --env-file ./environment.list \
    rest-sp-back:1.0` 
    ```

## File system hierarchy
* `etc` - configurations
* `opt` - optional, 3rd party software
* `tmp` - temporary files
* `var` - variable data
    * `/var/log` - logs
