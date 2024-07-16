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

## Package managers
##### Chocolatey
* Install `Node JS`
    * `choco install nodejs`
* Uninstall `Node JS`
    * `choco uninstall nodejs`
##### WinGet
* todo

## Windows installation:
* Download `.iso` image
* Upload it to flash drive, using `rufus`
* Restart PC, go to BIOS (by spamming `DEL`/`F8`/etc)
* Choose to boot from flash drive, save and exit

## Windows update (manual):
* Download `.iso` image of new Windows version
* Right click, mount, update (by default it will keep all the files, software and settings)

## Virtual environment / Sandbox
##### Windows sandbox
* Important! There is no way to persist state (better use sandboxie)
* Installation:
    * `Task Manager` -> `Performance` -> `Virtualization` should be enabled
    * `Turn Windows features on or off` -> `Windows Sandbox` -> Restart PC
    
##### Docker (Without WSL 2)
* Prerequisites:
    * `Windows search` -> `Turn Windows features on or off` -> `Enable Hyper-v`
    * Not really necessary - Enable Windows Hypervisor Platform
    
##### Windows Subsystem for Linux (WSL2)
* `Turn windows features on or off` -> Turn on `Virtual Machine Platform` and `Windows Subsystem for Linux`
* `cmd` -> `wsl --install`
* In any folder - `shift + right click`

##### VMware Workstation Player
* Runs any `.iso` / `.vmdk` images!
* Highly recommended installing `VMware tools` on guest OS
    * `Player` -> `Manage` -> `Install VMware tools`
    * Fixes screen resolution, provides ability to share clipboard (text/files)
* Prerequisites:
    * `Windows search` -> `Turn Windows features on or off` -> `Disable Hyper-v`
* To move cursor out of guest VM - press `CTRL+ALT`
* For more info look at `devops` repository
    
## Etc
###### Settings
* Turn annoying system sounds off: \
  `Sound` -> `Sound Control Panel` -> `Sounds` -> `Sound Scheme: No Sounds`

###### Problem with the internet on PC?
* No problem! Just use internet from a smartphone
* Connect Android to PC via USB
* On Android:
    * Settings -> Network & Internet -> Access point & Modem -> USB modem (Tethering)
* On PC:
    * Deny offer to make PC discoverable on the net
* Use your internet! But be careful, usually mobile internet is not unlimited

## Software
* `Putty`, `WinSCP`, `Anydesk`, `Postman`, `SoapUI`, `IntelliJ IDEA`, `Docker`, 
* `VLC`, `Lightshot`, `Google chrome`, `Telegram`, `qBittorrent`, `OpenJDK`, `OpenLens`
* `Stremio` with addons
* `Wireshark`
* `7zip`
    * Password-protected archive:
        * Right click on files -> Add to archive... -> Set password -> Check "Encrypt file names"
* `Notepad++` 
    * To create second view - right click on tab -> `move to other view`
* `DBeaver` to connect to database
    * `Edit connection` => `PostgreSQL` => `Show all databases`
* `OBS` to record screen + sound
    * To start recording:
        * `Sources` -> `+` -> `Display capture` -> `Start recording`
    * To film only small part of screen:
        * `Display capture` -> `Filters` -> `+` -> `Crop/pad`
* `DaVinci Resolve` - to edit videos
* `Audacity` to record all the sounds that you hear in your headphones
* `Battle Encoder Shirase` to limit resources available to the process (CPU)
* `CpuStres v2.0` to load CPU to 100%
    * Useful to see how frontend behaves on slow PCs (to reproduce bugs) 
* `Sandboxie` - safely run untrusted code
    * Presets -> Block internet access
        * Some software won't run with this option. 
        * The only way is to physically turn off internet access / block suspicious .exe in firewall
    * Run -> Boxed tools -> Windows explorer
* To find and delete folders that take too much space:
    * `TreeSize Free` (run as Admin)
* To run virtual machines:
    * `VMware`, `VirtualBox`
    * Got obsolete in new windows versions
* To check hardware load/temperature:
    * `Open Hardware Monitor`
    * `SpeedFan`
* To run Bash on windows:
    * `Git Windows` or `Cygwin` or `MinGW`
    * Convert CRLF to LF `sed -i -e 's/\r$//' script.sh`

