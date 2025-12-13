## Commands (cmd)
* Find `java.exe` in environment variables
  * `for %i in (java.exe) do @echo.   %~$PATH:i`
* Set environment variable
    * `setx RANDOOP_JAR "C:\Programs\Randoop\randoop-all-4.2.3.jar"`
    * Restart console
* Get environment variable
    * `echo %RANDOOP_JAR%`
* Call `java.exe` from cmd by its name alone, without full path:
    * Add path `C:\ProgramData\Oracle\Java\javapath` to `PATH` environment variable
    * `java --version`
* Copy text from console
    * Select text, `ctrl+c`
* Find files/folders with name containing 'masdev' in this folder and all subfolders
    * `dir /s *masdev*`
* Write output of command `dir` into `list.txt`
    * `dir > list.txt`
* Copy `service.war` to `deployments` folder. Answers `y` on question about files replacement
    * `echo y | copy target\service.war %WILDFLY_HOME%\standalone\deployments`
* Make long command readable:
  ```
  docker run ^
    --network host ^
    --add-host camel.test.keras.ru:32.2.121.43 ^
    --name rest-backend ^
    --env-file ./environment.list ^
  rest-sp-back:1.0` 
  ```
* Local DNS
  * In file `C:\Windows\System32\drivers\etc` insert `231.23.143.25 camel.keras.com`

## PowerShell
* Convert line endings of all files in all subfolders (from LF to CRLF):
  ```
  Get-ChildItem -Recurse -File | ForEach-Object {
      (Get-Content $_.FullName -Raw) -replace "`n", "`r`n" | Set-Content $_.FullName -NoNewline
  }
  ```

## Package managers
* Chocolatey:
  * Install `Node JS`
    * `choco install nodejs`
  * Uninstall `Node JS`
    * `choco uninstall nodejs`
* WinGet:
    * todo

## OS
* Windows installation:
  * Download `.iso` image from [massgrave](https://massgrave.dev/genuine-installation-media)
  * Upload it to flash drive, using `rufus`
  * Turn off the internet (very important step)
  * Unnecessary on new systems:
    * Restart PC, go to BIOS (by spamming `DEL`/`F2`/etc)
    * Choose to boot from flash drive, save and exit
  * If installer asks for key - skip it (activate later with massgrave)
  * On version selection (home/education/pro) pick Pro, because it supports virtualization
  * At the end of installation, if you have an internet - Windows will try to run a very long update
  * If you turned off the internet:
    * Skip mandatory connection screen - `Shift+F10`, enter `oobe\BypassNRO`
    * On second attempt at the screen, press `I don't have internet`
  * Next steps - [fresh-install.md](fresh-install.md)
* Windows update (manual):
  * Download `.iso` image of new Windows version
  * Right click, mount, update (by default it will keep all the files, software and settings)
* [Windows activation](https://github.com/massgravel/Microsoft-Activation-Scripts)

## Virtual environment / Sandbox
* [Windows Subsystem for Linux (WSL2)](wsl2.md)
* Windows sandbox:
    * Important! There is no way to persist state (better use sandboxie)
    * Installation:
      * `Task Manager` -> `Performance` -> `Virtualization` should be enabled
      * `Turn Windows features on or off` -> `Windows Sandbox` -> Restart PC 
* Docker (Without WSL 2)
    * Prerequisites:
        * `Windows search` -> `Turn Windows features on or off` -> `Enable Hyper-v`
        * Not really necessary - Enable Windows Hypervisor Platform
    * If Vmmem causes high load, even tho docker is not running
      * It means docker was running on previous session, but is not running now
      * To fix - manually turn off docker each time (before turning off PC)
* VMware Workstation Player:
  * Runs any `.iso` / `.vmdk` images!
    * `.iso` - you have to install it from 0 (spam keyboard during VM launch)
    * `.vmdk` - already installed
  * [Download & install](https://softwareupdate.vmware.com/cds/vmw-desktop/ws/)
  * Highly recommended installing `VMware tools` on guest OS
      * `Player` -> `Manage` -> `Install VMware tools`
      * Fixes screen resolution, provides ability to share clipboard (text/files)
  * Prerequisites (deprecated?):
      * `Windows search` -> `Turn Windows features on or off` -> `Disable Hyper-v`
  * To move cursor out of guest VM - press `CTRL+ALT`
  * For more info look at `devops` repository
    
## Etc
* Run on startup:
  *  `Win+R` -> `shell:startup` -> Paste shortcut there
* Settings:
  * Turn annoying system sounds off: \
    `Sound` -> `Sound Control Panel` -> `Sounds` -> `Sound Scheme: No Sounds`
  * Show file extension (with ability to edit it): \
    `File explorer` -> `View` -> `File name extensions`
* "Microsoft compatibility telemetry" can cause high CPU load. To turn it off:
  * MS search -> Services -> Connected User Experiences and Telemetry -> Properties -> Startup Type -> Disabled
* Problem with the internet on PC:
  * No problem! Just use internet from a smartphone
  * Connect Android to PC via USB
  * On Android:
      * Settings -> Network & Internet -> Access point & Modem -> USB modem (Tethering)
  * On PC:
      * Deny offer to make PC discoverable on the net
  * Use your internet! But be careful, usually mobile internet is not unlimited
* Game has no borderless window setting?
  * Add -popupwindow to exe properties, something like this - `"C:\Programs\Example.exe" -popupwindow`
  * In game settings - turn off full screen mode / turn on windowed mode
* Check resources consumption (system load - CPU, RAM, GPU, DISK):
  * Bad - `Task manager` (hides processes for reason)
  * Good - `Resource monitor` (shows full list)

## Internet access (socks5 proxy / vpn / tunnel)
* SOCKS5 - Look at `devops/remote-access/socks5/ssh.md`
* VPN - Look at `devops/remote-access/vpn/amnezia/amnezia.md` or `devops/remote-access/vpn/nekobox-nekoray-socks5`

## Software
* `Putty`, `WinSCP`, `Anydesk`, `Postman`, `Docker`, 
* `VLC`, `Lightshot`, `Google chrome`, `Telegram`, `qBittorrent`, `OpenJDK`, 
* `OpenLens` any version before 6.3.0 (they removed ability to look at pod logs)
* `Wireshark`
* `7zip`
    * Password-protected (encrypted) archive:
        * Right click on files -> Add to archive... 
        * Archive format -> 7z
        * Encryption method -> AES-256
        * Check "Encrypt file names"
        * Set password
* `Notepad++` 
    * To create second view - right click on tab -> `Move document` -> `Move to other view`
    * To reduce tabs size - Settings -> Preferences -> General -> Enable pin tab feature (disable it)
* `DBeaver` to connect to database
    * `Edit connection` => `PostgreSQL` => `Show all databases`
* `OBS` to record screen + sound
    * To start recording:
        * `Sources` -> `+` -> `Display capture` -> `Start recording`
    * To film only small part of screen:
        * `Display capture` -> `Filters` -> `+` -> `Crop/pad`
    * To simulate webcam:
      * Run as admin `\Programs\OBS\data\obs-plugins\win-dshow\virtualcam-install.bat`
      * Restart PC -> Open OBS -> Start Virtual Camera 
* `DaVinci Resolve` - to edit videos
* `Krita` - to edit images
  * Useful tools - clone brush (bottom right, its an alternative to clone stamp)
* `Audacity` - to record/edit audio 
  * To record all the sounds that you hear in your headphones:
    * Audio Setup -> Host -> Windows WASAPI
    * Audio Setup -> Rescan audio devices
    * Audio Setup -> Recording device -> Loopback
    * Audio Setup -> Recording channels -> Stereo
    * Red circle -> Black square
  * To record sounds from microphone:
    * Audio Setup -> Recording device -> Microphone
    * Red circle -> Black square
* `Battle Encoder Shirase` to limit resources available to the process (CPU)
* `CpuStres v2.0` to load CPU to 100%
    * Useful to see how frontend behaves on slow PCs (to reproduce bugs) 
* To find and delete folders that take too much space:
  * `TreeSize Free` (run as Admin)
* `Sandboxie` - safely run untrusted code (with persistence)
  * Old version: 
    * Presets -> Block internet access
        * Some software won't run with this option. 
        * The only way is to physically turn off internet access / block suspicious .exe in firewall
    * Run -> Boxed tools -> Windows explorer
  * New version:
    * Right click on a box -> Sandbox settings -> Restrictions -> Internet Access -> Block All Programs
      * Disable "Issue message SBIE1307 when access is denied"
* `Windows Sandbox` - safely run untrusted code (without persistence)
* `VMware`, `VirtualBox` - to run virtual machines 
* To check hardware load/temperature:
    * `Open Hardware Monitor`
    * `SpeedFan`
* `GeForce Experience` - to update Nvidia drivers
  * `General` -> `Ingame overlay` -> `Turn off` (it breaks some games)
* To run Bash on windows:
    * `Git Windows` or `Cygwin` or `MinGW`
    * Convert CRLF to LF `sed -i -e 's/\r$//' script.sh`
* `Sumatra portable` - Read PDF/Epub/DjVu
* `Firefox` - Edit PDF
* `Window Spy` - get detailed window info (comes with AHK)
* `VS Code` - the most popular IDE by far [vscode.md](vscode.md)
* `IntelliJ IDEA CE` - Java IDE, more info in [intellij-idea.md](intellij-idea.md)
  * Also install JDK, Maven and Gradle
* `WebStorm` - JavaScript & TypeScript IDE
  * Also installs Git, Node.js and Npm
* `PyCharm CE` - Python IDE
* `Rider` - C# (.NET) IDE 
