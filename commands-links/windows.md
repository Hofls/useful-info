# Windows
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
    * `java -version`
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
### Chocolatey
* Install `Node JS`
    * `choco install nodejs`
* Uninstall `Node JS`
    * `choco uninstall nodejs`
### WinGet
* todo

## Software
* To find and delete folders that take too much space:
    * `TreeSize Free` (run as Admin)
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
* To write down everything:
    * `Notepad++` 
        * To create second view - right click on tab -> `move to other view`
* To limit resources available to the process:
    * `Battle Encoder Shirase`
* To check hardware temperature:
    * `SpeedFan`
* To play videos:
    * `VLC`
* To record all the sounds that you hear in your headphones:
    * `Audacity`
* To record screen + sound:
    * `Bandicam`
* To take screenshots:
    * `Lightshot`
* To not ruin eyesight while working at night:
    * `F.lux`
* No need for introduction:
    `IntelliJ IDEA`, `Google chrome`, `7zip`, `Telegram`, `uTorrent`, `OpenJDK`
