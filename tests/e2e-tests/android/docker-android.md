#### Getting started
* Minimal requirements:
    * GPU is important. Without GPU - emulator will be very slow and laggy.
* Make sure virtualization enabled:
    * Ubuntu:
        * `apt install cpu-checker`
        * `kvm-ok`
    * Other:
        * `cat /proc/cpuinfo | egrep 'vmx|svm'`
    * [Azure, AWS, Google cloud](https://github.com/budtmo/docker-android/blob/master/README_CLOUD.md)
        * Azure - D2s_v3
* `apt update`
* `apt install docker.io`

#### Docker-android
* [Docker-android](https://github.com/budtmo/docker-android)
* `docker run --privileged -d -p 6080:6080 -p 5554:5554 -p 5555:5555 -e DEVICE="Samsung Galaxy S6" --name android-container budtmo/docker-android-x86-11.0`
* Expose ports to the internet (Inbound port rules)
* Open in browser `http://YOUR_SITE_IP:6080/`
* Connect with debug bridge `adb connect YOUR_SITE_IP:5555`

#### TODO
* https://github.com/thyrlian/AndroidSDK

