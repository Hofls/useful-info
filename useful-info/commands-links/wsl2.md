### Windows Subsystem for Linux (WSL2)
* Turn on:
    * `Turn windows features on or off` -> Turn on `Virtual Machine Platform` and `Windows Subsystem for Linux`
    * `cmd` -> `wsl --install`
    * In any folder - `shift + right click` -> `Open Linux shell here`
* Send requests from WSL2 (Linux) to Host web service (Windows), for local development
    * Disable firewall:
        * Method №1 - `New-NetFirewallRule -DisplayName "WSL" -Direction Inbound  -InterfaceAlias "vEthernet (WSL)"  -Action Allow`
        * Method №2:
      ```
      Set-NetFirewallProfile -Profile Private -DisabledInterfaceAliases "vEthernet (WSL)"
      Set-NetFirewallProfile -Profile Public -DisabledInterfaceAliases "vEthernet (WSL)"
      ```
    * Get host ip address - `ip route show | grep -i default`
    * Connect, send requests:
  ```
  ping 172.29.64.1
  curl http://172.29.64.1:8080/service/actuator/info
  telnet 172.29.64.1 9005
  ```
