#### Send notification only once
* Problem:
    * Multiple backend instances work with the single DB
    * Instances take first row from `notification` table with status `NEW`, change it to `IN_PROGRESS`, then sends notifications
    * Each notification should be sent only one time
    * 2 different instances can start processing same record simultaneously, and each will sent a notification
* Not working solution:
    * Just naively change record status from `NEW` to `IN_PROGRESS`
    * It won't work in case of simultaneous processing:
        * Both backends will see a `NEW` status, both will change to `IN_PROGRESS`, both will send a notification
* Manual Solution (okayish):
    * Let DB constraints do all the work
    * Create table `notification_lock` with rows: id (autogenerated, unique), notification_id (unique), lock_time
    * Before sending notification - backend should insert record into `notification_lock`
    * When 2 different instances will try to insert record at the same time:
        * DB will allow only 1 insert (notification_id is unique)
        * Second insert will throw an error
* Pessimistic lock (good):
    * Start processing by locking a record (`select for update`)
    * Second instance will wait while first instance is changing status
    * After first is done - second will see changed status (`IN_PROCESS`) and will ignore record
* Optimistic lock (great):
    * Both instances will try to change status at same time
    * One instance will succeed, another will fail (`select where version = 2` won't find anything)
* Implementation:
    * `java-dependencies` repository, `database/h2db` package