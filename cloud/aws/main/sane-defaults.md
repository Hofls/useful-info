### Configure
* `My Billing Dashboard`
    * `Billing Preferences` check boxes:
        * `Receive PDF Invoice By Email`
        * `Receive Free Tier Usage Alerts`
            * Set `Email Address`
        * `Receive Billing Alerts`
    * `Budgets`:
        * `Create budget` -> `Cost budget`
            * Set `Budgeted amount` (e.g. $2) 
            * Set `threshold` (e.g. 80)
            * Set `Email recipients`
* `Cloudwatch`
    * `Alarms` -> `Billing` - `Create alarm`
    * `All` -> `Billing` -> `Total Estimated Charge`
    * Set `threshold` (e.g. $4)
    * `Create new SNS topic` -> Set email
* `IAM`
    * `Enable MFA`
    * `Add user` with fewer privileges than Administrator
    * 

### Advices
* Use `Pricing Calculator` to check estimated cost of your solution
* Use `Resource Groups` -> `Tag Editor` to check all your resources (EC2 instances, Lambda functions, DynamoDB tables etc)
* Before rolling out your own thing - check `Marketplace`, `Quick Starts` and `Hands on`
* To check current spending and usage - `Billing & Cost Management Dashboard`
    * To generate overall report - `AWS Cost and Usage Reports`
* To make sure nothing crazy is happening - periodically review event history in `CloudTrail`
