# Windows
## Commands
* Find `java.exe` in environment variables
  * `for %i in (java.exe) do @echo.   %~$PATH:i`
* Set environment variable
    * `setx RANDOOP_JAR "C:\Programs\Randoop\randoop-all-4.2.3.jar"`
    * Restart console
* Get environment variable
    * `echo %RANDOOP_JAR%`
* Copy text from console
    * Select text, `ctrl+c`
* Find files/folders with name containing 'masdev' in this folder and all subfolders
    * `dir /s *masdev*`
* Write output of command `dir` into `list.txt`
    * `dir > list.txt`

## Package managers
### Chocolatey
* Install `Node JS`
    * `choco install nodejs`
* Uninstall `Node JS`
    * `choco uninstall nodejs`
### WinGet
* todo

## Software
* To find and delete folders that take too much space:
    * `TreeSize Free`, run as Admin
* To connect to remote desktop:
    * `Anydesk`
* To connect to remote server via SSH:
    * `Putty`
* To transfer files to/from remote server:
    * `WinSCP`
* To connect to database:
    * `DBeaver`
* To send SOAP requests:
    * `SoapUI`
* To send HTTP requests:
    * `Postman`
* To limit resources available to the process:
    * `Battle Encoder Shirase`
* To check hardware temperature:
    * `SpeedFan`
* To play videos:
    * `VLC`
* To record all the sounds that you hear in your headphones:
    * `Audacity`
* To take screenshots:
    * `Lightshot`
* To not ruin eyesight while working at night:
    * `F.lux`
