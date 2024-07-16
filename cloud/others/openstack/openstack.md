#### Info
* `Openstack` - cloud computing platform (e.g. private cloud for your company)

#### Getting started
* Disclaimer: tested on 4 CPU, 8 RAM
* Install:
    * `apt update && apt install snapd`
    * `snap install microstack --beta`
* Run:
    * `microstack init --auto --control`
* Test:
    * Open in web browser `https://YOUR_SERVER_IP/`
        * Username - `admin`
        * Password - `snap get microstack config.credentials.keystone-password`
