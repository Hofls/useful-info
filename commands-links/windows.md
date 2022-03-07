## Commands
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

## Virtual environment / Sandbox
##### Windows sandbox
* Installation:
    * `Task Manager` -> `Performance` -> `Virtualization` should be enabled
    * `Windows Features` -> `Windows Sandbox` -> Restart PC
##### Docker
* Prerequisites:
    * Right click on windows -> Apps and features -> Programs and features -> Turn Windows features on or off
    * Enable Windows Hypervisor Platform
    * Enable Hyper-v
##### Windows Subsystem for Linux
* todo
##### VMware Workstation Player
* Runs any `.iso` / `.vmdk` images!
* Highly recommended installing `VMware tools` on guest OS
    * Fixes screen resolution, provides ability to share clipboard (text/files)
    
## Etc
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
* `VLC`, `AIMP`, `Lightshot`, `Google chrome`, `7zip`, `Telegram`, `uTorrent`, `OpenJDK`
* `Notepad++` 
    * To create second view - right click on tab -> `move to other view`
* `DBeaver` to connect to database
    * `Edit connection` => `PostgreSQL` => `Show all databases`
* `OBS` to record screen + sound
* `Audacity` to record all the sounds that you hear in your headphones
* `Battle Encoder Shirase` to limit resources available to the process
* `CpuStres v2.0` to load CPU to 100%
* To find and delete folders that take too much space:
    * `TreeSize Free` (run as Admin)
* To run virtual machines:
    * `VMware`, `VirtualBox`
        * Possibly getting obsolete in new windows versions
* To check hardware load:
    * `Open Hardware Monitor`
    * `SpeedFan`

## Software. Detailed
* `SoapUI`:
    * Generate request examples:
        * New SOAP project -> http://example.com/events?wsdl
    * To download all service files (necessary to generate connectors)
        * Right click on service -> Export definition
    * If service returns "Not authorized":
        * Request -> Auth -> Basic -> Login/Password
    * To fix generated queries, replace "?" with ""
    * To send quotes inside quotes:
        * `<keys query="IncidentID=&quot;IM92838221&quot;">`
    * Load test:
        * Pick any SOAP request -> Add to TestCase -> New Load Test -> Run
* 
