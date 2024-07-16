#### Getting started. AWS CDK
* [Install & run Localstack](localstack.md)
* Install packages:
    * `apt install nodejs`
    * `apt install npm`
    * `npm install -g aws-cdk-local aws-cdk`
* Generate app:
    * `mkdir aws-cdk && cd aws-cdk`
    * `cdklocal bootstrap`
    * `cdklocal init sample-app --language=javascript`
* Deploy & check infrastructure: 
    * `cdklocal deploy`
    * `aws sns list-topics`
