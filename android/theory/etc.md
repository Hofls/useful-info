## Android Studio
* To look at http requests/responses:
    * Go to `security` repository
* Show info about UI components currently displayed on Android Emulator. Allows to jump from UI straight to the code
    * `uiautomatorviewer.exe`
* In case of constant BSOD/Emulator crashes:
    * Right click on windows -> Apps and features -> Programs and features -> Turn Windows features on or off
    * Disable Windows Hypervisor Platform
    * Disable Hyper-v
* To slow down internet (for testing)
    * Launch emulator -> Click on `...` -> Cellular
        * Network type - GSM
        * Signal strength - Poor
    * Relaunch emulator

### Catch Android emulator traffic (Android Studio)
* To look at http requests/responses:
    * Run emulator
    * `View` -> `Tool Windows` -> `Profiler`
    * `Start new session` -> Pick emulator -> Click on `NETWORK` timeline
* For more info go to `computer-security` repo

## Build .apk on server
* Install Java
    * `apt update`
    * `apt install openjdk-8-jdk`
    * `java -version`
* Install Android SDK
    * `mkdir -p /opt/android-sdk/cmdline-tools/latest; mkdir /opt/temp`
    * `cd /opt/temp`
    * Find URL for latest [Command line tools](https://developer.android.com/studio#command-tools)
    * `wget https://dl.google.com/android/repository/commandlinetools-linux-7302050_latest.zip`
    * `unzip commandlinetools-linux-7302050_latest.zip`
    * `cd cmdline-tools`
    * `mv -i * /opt/android-sdk/cmdline-tools/latest`
    * `export ANDROID_SDK_ROOT=/opt/android-sdk`
    * `export PATH=$PATH:$ANDROID_SDK_ROOT/cmdline-tools/latest/bin`
* Configure Android SDK
    * `sdkmanager`
    * `yes | sdkmanager --licenses` 
* Optional
    * Build .apk file
        * `./gradlew app:clean`
        * `./gradlew app:assembleRelease`
    * Install tools
        * `sdkmanager --install "platform-tools platforms;android-29 build-tools;29.0.2 emulator"`
* 
* 