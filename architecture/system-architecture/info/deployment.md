* Using load balancers when deploying: 
    * Swap instances in the load balancer after spinning up a new stack with your latest version
    * Keep old stack running for one or two hours
        * If problems occur - flip back to old stack
        * If everything is ok - tear down old stack
    