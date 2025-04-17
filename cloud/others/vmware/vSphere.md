### Create VM, install OS (Linux)
* Create VM
    * Open `VMware Cloud Director` -> Data Centers -> Virtual Machines -> NEW VM
        * Or Data centers -> vApps -> Actions -> Add -> Add VM
    * Not obvious choices:
        * `Type` - NEW
        * `Boot Image` - Ubuntu.iso
            * If no such image in list - add it manually (Libraries -> Media & Other -> Add)
        * `Size` - Custom sizing options
        * `Storage Policy` - VM default
        * `Network` - (copy from any VM)
        * `Network Adapter Type` - VMXNET3
        * `IP Mode` - Static - IP Pool
    * Press `OK`
* Install OS
    * Find created VM in list, click "Launch Web Console"
    * Follow installation process, create root password
    * Configure network interface (DNS, Gateway, Search...)
        * Simple way - look at the existing config in another VM, e.g. for CentOS - `nmtui`
        * Example:
            * Subnet - 24.232.21.0/24 (Based on VM ip address + mask)
                * AKA "Netmask = 24"
            * Address - 24.232.21.77 (VM ip address)
            * Gateway - 24.232.21.1 (Based on VM ip address)
            * Name servers - 17.112.5.2, 17.112.5.3 (from `nmtui`)
                * AKA "DNS servers"
            * Search domains - sun.lan (from `nmtui`)
    * Storage configuration:
        * Pick `Use an entire disk`
        * Unpick `Set up this disk as an LVM group`
            * With default LVM group only small amount of space will be available 
    * Install OpenSSH server
    * If security update takes too long - its OK to cancel and manually reboot server

### Install, configure Windows
* Create VM (same as Linux, only difference is image - pick Microsoft Windows Server)
* Configure:
    * Disable Firewall
    * `Server Manager` -> `Local Server` -> `Remote Desktop` -> `Enabled`
    * `Network & Internet Settings` -> `Change adapter settings` -> `Ethernet` -> `Options` -> `Internet Protocol Version 4 (TCP/IPv4)` -> `Properties`
        * Fill same as for linux:
            * `Use the following IP address:`
            * `Use the following DNS server addresses:`
    * After connecting to the network - question appears `Allow PC to be discoverable on this network?`, press `Yes`
* Test:
    * Ping VM, connect via RDP

### Edit existing VM:
* Edit RAM/CPU:
    * Turn off VM 
    * Compute -> Memory/CPU -> Edit
    * Turn on VM
* Edit Disk size:
    * TODO, should be harder than RAM/CPU
* Edit network:
    * Turn off VM
    * Hardware -> NICs -> Edit -> Change Network -> Save
    * Turn on VM
    * All Actions -> VM Console -> Launch Web Console
    * `nmtui` -> Edit -> Update subnet, address and gateway (based on new IP adddress)
    * `reboot`

### Edit VM IP address:
* CentOS - `nmtui`
* Ubuntu:
    * `ip a` - should show old IP address
    * `nano /etc/netplan/*.yaml` - eit same parameters as in `nmtui`
    * `netplan apply`
    * `ip a` - should show new IP address
