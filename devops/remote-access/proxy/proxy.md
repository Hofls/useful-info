## Client side
* Linux 1:
    * `curl https://ifconfig.co`
    * `curl -x http://123.122.201.232:8888 --proxy-user hofls:qwerty https://ifconfig.co`
* Linux 2:
    * `export http_proxy=http://SAdin:z654321Z@123.122.201.232:8888`
    * `curl https://api.ipify.org/?format=json`
* Dockerfile:
    * `ENV http_proxy http://SAdin:z654321Z@123.122.201.232:8888`
    * To test - connect to container, execute `curl https://api.ipify.org/?format=json`
* Google chrome:
    * Extension `Proxy Helper`
    * [check your IP](https://api.ipify.org/?format=json)
* Java
    * `java -Dhttp.proxyHost=123.122.201.232 -Dhttp.proxyPort=8888 -jar minimal-project.jar`
    * TODO: make it work with basic auth `-Dhttp.proxyUser=SAdin -Dhttp.z654321Z`
