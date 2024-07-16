#### Info
* Localstack - local cloud (AWS) emulator 

#### Getting started
* Install prerequisites:
    * `apt install docker.io`
    * `apt install python3.8`
    * `apt install python3-pip`
* Install & run localstack:
    * `python3 -m pip install localstack`
    * `nohup localstack start &`

#### Interaction
* [CLI](localstack-aws-cli.md)
* SDK:
    * Make port available from outside: 
        * `nohup socat tcp-listen:8566,reuseaddr,fork tcp:localhost:4566 &`
    * Look at java repository, `aws-sdk` folder
* [CDK](localstack-aws-cdk.md)