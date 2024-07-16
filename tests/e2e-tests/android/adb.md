* Connect to remote ADB (e.g. on server)
    * `adb connect 40.72.121.5:5555`
* List connected devices
    * `adb devices`
* Get .apk package name
    * `adb shell`
    * `pm list packages -f`