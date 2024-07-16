#### Getting started. AWS CLI
* [Install & run Localstack](localstack.md)
* Install AWS CLI:
    * `apt install awscli`
    * `pip3 install --upgrade awscli`
* Configure AWS CLI:
    ```
    export AWS_ACCESS_KEY_ID="test"
    export AWS_SECRET_ACCESS_KEY="test"
    export AWS_DEFAULT_REGION="us-east-1"
    alias aws='aws --endpoint-url=http://localhost:4566'
    ```
* Make sure its working:
    * `aws dynamodb list-tables`
    * `aws apigateway get-rest-apis`
    * `aws kinesis list-streams`

#### S3
* `aws s3api create-bucket --bucket sample-bucket`
* `aws s3api list-buckets`
* `touch index.html`
* `aws s3api put-object --bucket sample-bucket --key index.html --body index.html`
* `aws s3api list-objects --bucket sample-bucket`
* `aws s3api delete-object --bucket sample-bucket --key index.html`
* `aws s3api delete-bucket --bucket sample-bucket`

#### IAM
* `aws iam create-group --group-name MyIamGroup`
* `aws iam create-user --user-name MyUser`
* `aws iam add-user-to-group --user-name MyUser --group-name MyIamGroup`
* `aws iam get-group --group-name MyIamGroup`

#### SNS
* `aws sns create-topic --name my-topic`
* `aws sns subscribe --topic-arn arn:aws:sns:us-east-1:000000000000:my-topic --protocol email --notification-endpoint hofls@example.com`
* `aws sns publish --topic-arn arn:aws:sns:us-east-1:000000000000:my-topic --message "First message to your email!"`

#### DynamoDB
```
aws dynamodb create-table \
    --table-name MusicCollection \
    --attribute-definitions AttributeName=Artist,AttributeType=S \
    --key-schema AttributeName=Artist,KeyType=HASH \
    --provisioned-throughput ReadCapacityUnits=1,WriteCapacityUnits=1
```
```
aws dynamodb put-item \
    --table-name MusicCollection \
    --item '{
        "Artist": {"S": "No One You Know"},
        "SongTitle": {"S": "Dont ask me"} ,
        "AlbumTitle": {"S": "Very serious"} 
      }'
```
```
aws dynamodb query --table-name MusicCollection \
    --key-condition-expression "Artist = :name" \
    --expression-attribute-values  '{":name":{"S":"No One You Know"}}'
```