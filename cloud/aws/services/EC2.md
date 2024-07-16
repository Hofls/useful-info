### Use cases
* Server with installed OS, most generic solution. When no other AWS service fits your needs.

### Pricing models
* `On demand` Default. No upfront payment, no commitment, for short-term or unpredictable workload
* `Spot instances` savings up to 90%, but EC2 can reclaim the capacity at any moment. Anything you run here - should be fault-tolerant
* `Reserved instances` commit for multi year contract, savings up to 75%
* `Dedicated host` most expensive, when you need to follow laws/regulations that forbid you to share hardware with other AWS customers


### Usable features:
* `Security group` - make port accessible to entire internet (e.g. 80)
* `EC2 Instance connect` - connect to instance via SSH in a browser (alternative to PuTTy)
    * Looks like it is working only with specific instances (Amazon Linux 2 AMI)
* `Auto Scaling Groups` - automatically change amount of EC2 instances, based on load
* `Load Balancers` - send traffic to the least loaded instance
* `AMI` (Amazon Machine Images) - snapshot of an instance (like docker images)
* `Placement groups` - pick cluster if you want instances located close to each other (for low latency)
* `Snapshot` - save image (to restore data in case of loss / run new instances)
* `Elastic IP` - static IP address (makes sense only if you don't use load balancer)
