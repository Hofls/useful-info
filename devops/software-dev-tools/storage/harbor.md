### Info
* `Harbor` - stores docker images + helm charts

### Getting started
* Install docker & docker-compose:
  ```
  apt update
  apt install docker.io
  apt install docker-compose
  ```
* Install harbor:
  * `wget https://github.com/goharbor/harbor/releases/download/v2.11.0/harbor-online-installer-v2.11.0.tgz`
  * `tar xzvf harbor-online-installer-v2.11.0.tgz && cd harbor`
  * `cp harbor.yml.tmpl harbor.yml && nano harbor.yml`
    * Set hostname as server IP = 138.120.63.44
    * Comment out ENTIRE https section
  * `./install.sh`
  * Open `http://138.120.63.44/` in browser, log in (admin / Harbor12345)
* Check from your local PC:
  * Change docker config:
    ```
    {
      "insecure-registries": [
        "138.120.63.44"
      ]
    }
    ```
  * Execute:
    ```
    docker pull hello-world
    docker login -u admin -p Harbor12345 138.120.63.44
    docker tag ubuntu 138.120.63.44/library/hello-world
    docker push 138.120.63.44/library/hello-world
    docker pull 138.120.63.44/library/hello-world
    ```

### Harbor push/pull (docker)
* Harbor -> Projects -> Pick any -> PUSH COMMAND -> Should show example commands
* Something like
```
docker pull hello-world
docker login -u hofls -p qwerty harbor.someit.com
docker tag hello-world harbor.someit.com/chartrepo/hello-world:latest
docker push harbor.someit.com/chartrepo/hello-world:latest
docker pull harbor.someit.com/chartrepo/hello-world:latest
```

### Harbor push/pull (helm)
* Harbor -> Projects -> Pick any -> PUSH COMMAND -> Should show example commands
* Something like
```
helm registry login harbor.someit.com -u hofls -p "qwerty"
helm create mychart
helm package mychart 
helm chart push harbor.someit.com/chartrepo/mychart:0.1.0
helm chart pull harbor.someit.com/chartrepo/mychart:0.1.0
```
