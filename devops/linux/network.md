### Netcat - TCP/IP and UDP
* Send request & receive response from example.com:
  * `nano http-req.txt` (empty lines are important):
  ```
  GET / HTTP/1.1
  Host: example.com
  Connection: close
  
  
  ```
  * `nc example.com 80 <http-req.txt`

### Telnet  - TCP/IP
* Send request & receive response from example.com:
  * `telnet example.com 80`
  * Manually insert (empty lines are important):
  ```
  GET / HTTP/1.1
  Host: example.com
  Connection: close
  
  
  ```
