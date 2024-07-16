#### Setup
* Install `VMware Workstation Player` and `Metasploitable (Image)`
* Log in: `msfadmin/msfadmin`
* On guest execute `ip addr | grep inet`
    * grab ip address
    * `ctrl+alt` to get cursor out of VM
* Open ip address in browser (on host/another guest, e.g. kali)
    * `Metasploitable` web page should be open

#### Mutillidae. Challenges
* index.php?page=user-info.php
    * `Burp → Intruder → SQL Injection`
* 
* 

#### Errors
* Table metasploit.* doesn't exist
    * `nano /var/www/mutillidae/config.inc`
    * replace `metasploit` with `owasp10`
* 
