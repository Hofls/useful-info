## Open source

##### Develop locally
* If all you want to do is edit code and run tests, Windows is enough
    * Linux is must have to build and run code
* Use IDE on windows, sync files with Linux, run/build/test on Linux
    * Linux is great on server-side, windows is good on client-side
    * Free your local OS from need to install a bunch of software / config tweaks
    * Practically unlimited resources (on the cloud)
    * Possible pitfalls:
        * Use LF instead of CRLF on Windows
            * `git config --global core.autocrlf false`
        * Path shouldn't have spaces or weird characters (e.g. cyrillic)
    
##### Develop locally. Host-Guest
* Disclaimer: this method has limitations (e.g. no symlinks)
* `VMware Player`:
    * Install `VMware Player`
    * Download & install `Ubuntu` server image 
        * .iso - install yourself [(slow)](https://ubuntu.com/server)
            * File -> New Virtual Machine -> Installer disc image file (iso)
        * .vmdk - already installed [(fast)](https://www.osboxes.org/ubuntu-server/)
            * File -> New Virtual Machine -> I will install the OS later
            * Edit VM settings -> Add... -> Hard Disk -> Use an exiting virtual disk
            * Edit VM settings -> Pick old hard disk -> Remove
    * Folder & test file:
        * Create a folder `shared-folder` on host machine
        * Create `hello.py` file with content `print('Hello world!')`
    * Sync a folder:
        * Edit VM settings -> Options -> Shared Folders -> Always Enabled -> Add...
        * Run a VM
        * Execute on guest 
            * `mkdir /mnt/hgfs`
            * `vmhgfs-fuse .host:/ /mnt/hgfs/ -o allow_other -o uid=1000`
            * `cd /mnt/hgfs/shared-folder`
            * `python3 hello.py`
    * Access guest web-service (from the host)  
        * Get address: `ip addr | grep inet`
        * Run web-service: `python3 -m http.server`
        * Open URL on the host: http://GUEST_IP_ADDR:8000
* `Docker`:
    * TODO (Using volumes)

##### Develop locally. Client-Server
* `IntelliJ IDEA`:
    * https://www.jetbrains.com/help/idea/creating-a-remote-server-configuration.html
    * https://www.jetbrains.com/help/idea/uploading-and-downloading-files.html#2a338ba
* `WinSCP`:
    * https://stackoverflow.com/questions/423362/best-way-to-instantly-mirror-sync-files-from-windows-to-linux-server
* `Rsync`:
    * https://stackoverflow.com/questions/423362/best-way-to-instantly-mirror-sync-files-from-windows-to-linux-server
