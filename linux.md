# Commands
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
* todo

# Tunneling
* todo - describe use case
