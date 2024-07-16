### Info
* Fiddler - Modern alternative to Wireshark

### Catch Android emulator traffic (Android Studio)
* To look at http requests/responses:
    * Run emulator
    * `View` -> `Tool Windows` -> `Profiler`
    * `Start new session` -> Pick emulator -> Click on `NETWORK` timeline
    
### Catch Android emulator traffic (Fiddler)
* Install `Fiddler Everywhere` (using fake email)
    * Optional - `Settings -> Connections -> Allow remote computers to connect`
    * For HTTPS:
        * `Settings -> HTTPS -> Trust root certificate`
        * `Settings -> HTTPS -> Capture HTTPS traffic`
* Open android emulator
    * Settings -> Search field -> Wifi -> Touch active -> Edit 
        * Proxy - Manual
        * IP - 10.0.2.2
        * Port - 8866
    * Open Google Chrome, go to url http://example.com
        * Fiddler should catch request/response
    * For HTTPS:
        * TODO