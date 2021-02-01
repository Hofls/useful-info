## Android Studio
* To look at http requests/responses:
    * Run emulator
    * `View` -> `Tool Windows` -> `Profiler`
    * `Start new session` -> Pick emulator -> Click on `NETWORK` timeline

* Show info about UI components currently displayed on Android Emulator. Allows to jump from UI straight to the code
    * `uiautomatorviewer.exe`

* In case of constant BSOD/Emulator crashes:
    * Right click on windows -> Apps and features -> Programs and features -> Turn Windows features on or off
    * Disable Windows Hypervisor Platform
    * Disable Hyper-v
