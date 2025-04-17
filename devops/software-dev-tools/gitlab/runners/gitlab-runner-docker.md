# Gitlab runner (in docker)
* Gitlab:
  * Group -> Build -> Runners -> New group runner
  * Set tag (docker)
  * Copy and save generate CLI command (with url and token)
* Server:
  * Create folder: 
    * `/opt/gitlab-runner-config`
  * Launch gitlab-runner: 
    * `docker run -d --name gitlab-runner --restart always -v /var/run/docker.sock:/var/run/docker.sock -v /opt/gitlab-runner-config/:/etc/gitlab-runner gitlab/gitlab-runner:v13.10.0`
  * Register runner:
    * Template - `docker exec -it gitlab-runner gitlab-runner register INSERT_CLI_COMMAND_HERE`
    * Example - `docker exec -it gitlab-runner gitlab-runner register --url https://vcs.someit.com --token spod-qeMnXvzDPsYSzeA4tu7`
  * Configure runner (part of registration process):
    * `tags = docker`
    * `executor = docker`
    * `image = debian:stable`
  * Add new lines to `config.toml`, section `[runners.docker]`:
    * `volumes = ["/cache", "/var/run/docker.sock:/var/run/docker.sock"]` (must have)
    * `extra_hosts = ["docker.someit.com:14.144.57.84"]` (optional)
* Gitlab:
  * Project -> Settings -> CI/CD -> Enable group runners
* Try to run build & deploy via `.gitlab-ci.yml`
  * Example - [.gitlab-ci.yml](../kubernetes/example-a/.gitlab-ci.yml)
* Optional. Server:
  * Periodically clean old images/volumes:
    * `59 23 * * * /opt/scripts/clear-docker.sh > /opt/scripts/clear-docker.logs 2>&1`
    * For script, look at `Smart removal` in `docker.md`
