# useful-linux-commands
* `find . -name *specopsfls*` Find file with name containing 'specopsfls' in this folder and all subfolders
* `find / -type d -name '*fldtofnd*'` Find folder with name containing 'fldtofnd' in this folder and all subfolders
* `netstat -tuplen` Shows ports in use
* ```
  firewall-cmd --permanent --zone=public --add-port=80/tcp
  firewall-cmd --permanent --zone=public --add-port=433/tcp
  firewall-cmd --reload
  ```
  Opens ports `80` and `443` in firewall
 * sdsd
