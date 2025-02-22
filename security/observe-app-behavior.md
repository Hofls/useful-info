### Want to see what a program is doing?
* If it is an untrusted app - run it in `Sandboxie` / `Windows Sandbox` / `VMware Workstation Player`
* `Sandboxie` also allows observation of file/registry changes (Sandbox -> R click -> Box Content)
* `Process Mintor` to observe current program activity (network, files, registry, process tree)
* `Wireshark` to capture traffic
  * Download & install
    * Do not use portable version (it requires manual installation of npcap)
  * `Edit` -> `Preferences` -> `Appearance` -> `Language` -> `English`
  * `Welcome` -> `Ethernet` -> `Capture`
  * Set a filter, for example:
    * `(ip.dst == 93.184.215.14) || (ip.src == 93.184.215.14)`
* `Ghidra` - TODO
* https://ipinfo.io/ to get info about captured IP address
