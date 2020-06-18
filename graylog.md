How to search:
* Find faults in file `services.log`
    * `filename:"/var/log/project/soap/services.log" && message:"FAULT_IN"`
* Find errors not related to firewall
    * `message:"ERROR" && NOT message:"Firewall"`
* Find request and response (by exchange id)"
    * `"75f92c53-c924-4198-a38f-820c3d557cbc"`

Based on https://docs.graylog.org/en/3.1/pages/queries.html