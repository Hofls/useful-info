## Main
#### Info
* `Nexus` - Artifacts storage/proxy (e.g. for java dependencies, npm packages)
* Persistence - `--volume /opt/nexus-data:/nexus-data`

#### Getting started
* Prerequisite: at least 3GB RAM
* Run nexus:
    * `docker run -d -p 8081:8081 --name nexus sonatype/nexus3`
    * `docker logs -f --tail 10 a04s28sd`
* Find `admin` password:
    * `docker exec a04s28sd cat /nexus-data/admin.password`
* Open `http://YOUR_SERVER_IP:8081/` -> Sign in
* Test repository using `docker login`, `docker tag`, `docker push`, `docker pull`

#### Install a plugin
* Put `.kar` file on a server, in the `/opt/nexus-plugins` folder
* Run nexus with `--volume /opt/nexus-plugins:/opt/sonatype/nexus/deploy`

## Details
#### Install & Use nexus-repository-apk
* `nexus-repository-apk` is a pull-through proxy/cache for apk (alpine packages)
* Install plugin:
  * Download `.kar` for release `v3.70` [from github](https://github.com/805728578/nexus-repository-apk/releases)
  * Put `.kar` file on a server, in the `/opt/nexus-plugins` folder
  * Run nexus with `--volume /opt/nexus-plugins:/opt/sonatype/nexus/deploy`
* Configure plugin:
  * Open `Nexus` -> `Configuration` -> `Repositories` -> `Create repository` -> `apk (proxy)`
    * Name - apk-repo
    * Remote storage - https://dl-cdn.alpinelinux.org/alpine/v3.21/main
* From alpine:
  * Run alpine - `docker run -it alpine:3.21 /bin/sh`
  * Add repo - `echo "@test-apk http://INSERT_YOUR_NEXUS_IP:8081/repository/apk-repo/" >> /etc/apk/repositories`
  * Install packages:
    * `apk add curl@test-apk`
    * `apk add nano@test-apk`
* Make sure that packages are cached - `Nexus` -> `Browse` -> `apk-repo` -> `curl`/`nano`
