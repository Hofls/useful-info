#### Info
* PostgreSQL - relational database
* Persistence: `--volume /opt/postgressql:/var/lib/postgresql/data`
* Set max_connections to 100: `docker run postgres -N 100`

#### Getting started. Server
* Using docker:
    * `docker run -p 5432:5432 -e POSTGRES_PASSWORD=postgres -d postgres`
* Using apt:
    ```
    # Install:
    sudo su
    apt update && apt install postgresql postgresql-contrib
    # Allow remote connections:
    nano /etc/postgresql/16/main/postgresql.conf
        listen_addresses = '*'
    nano /etc/postgresql/16/main/pg_hba.conf
        host    all             all             0.0.0.0/0               md5
    # Set password:
    sudo -u postgres psql
        \password postgres
    # Apply changes
    systemctl restart postgresql
    ```

#### Getting started. GUI client
* Launch postgres on server
* Run DBeaver on client:
    * New Database Connection -> PostgreSQL
        * Host: YOUR_SERVER_IP
        * Username: postgres
        * Password: postgres
    * Test Connection -> Finish

#### Getting started. CLI client
* Connect to a server with running PosgreSQL
* Launch psql console - `psql` or `sudo -u postgres psql`
    * Move to `/opt` if error appears - `could not change directory to "/home/hofls": Permission denied` 
* List databases - `SELECT datname FROM pg_database;`
* Connect to db named "shop_db" - `\c shop_db`
* List tables - `\dt`
* Look at rows in a table  - `select * from customer limit 10;`

#### Commands
* Change max connections count:
    * `SHOW max_connections;`
    * `ALTER SYSTEM SET max_connections TO '100';`
    * Restart PostgreSQL
* Change user password (on Windows) 
    * `D:\Programs\PostgreSQL\bin\psql.exe -U postgres`
    * `ALTER USER hofls WITH PASSWORD '123456'`
* Logs:
  * `tail -n 50 /var/log/syslog`
  * `tail -n 50 /var/log/postgresql/postgresql-16-main.log`
* Dump:
    * Create [db for tests](test_db.sql)
    * In source PostgreSQL, pick 1:
        * A:
            * `pg_dump -U postgres -F t customers_db > customers_dump.tar`
        * B:
            * Log in as `postgres` user - `sudo -u postgres -i`
            * Dump data `pg_dump customers_db > customers_dump.sql`
    * In target PostgreSQL:
        * Manually create database `customers_db`
        * Pick 1:
            * Via console - `psql -U postgres customers_db < dump.sql`
            * Via DBeaver - `customers_db` -> right click -> `Tools` -> `Execute script` -> set path to `customers_dump.sql`

#### Failover / Replication
* TLDR - Run two identical databases (primary & replica), if main fails - replica becomes main
* Install PostgreSQL on primary & replica servers
* On primary:
  * Configure write-ahead log - `nano /etc/postgresql/16/main/postgresql.conf`
  ```
  archive_mode = on
  archive_command = 'cp %p /var/lib/postgresql/16/main/archivedir/%f'
  wal_level = replica
  max_wal_senders = 3
  wal_keep_size = 64
  ```
  * Allow replication connections ("all" does not cover replication)
    `nano /etc/postgresql/16/main/pg_hba.conf` \
    `host    replication     all             0.0.0.0/0               md5`
  * Apply changes - `systemctl restart postgresql`
  * Create replication user:
  ```
  sudo -u postgres psql
  CREATE USER replicator REPLICATION LOGIN ENCRYPTED PASSWORD 'your_password';
  ```
* On replica:
  * Stop PostgreSQL - `systemctl stop postgresql`
  * Remove old data - `rm -rf /var/lib/postgresql/16/main`
  * Copy data from primary to replica: \
    `sudo -u postgres pg_basebackup -h INSERT_PRIMARY_IP_HERE -D /var/lib/postgresql/16/main -U replicator -v -P --wal-method=stream -R` \
    Thanks to `-R` it should also create `postgresql.auto.conf` and `standby.signal` files (standby config and flag)
  * Apply changes - `systemctl start postgresql`
  * Test replication:
    * Modify data in primary DB, check changes in replica DB
    * Check active replication session (on primary) - `SELECT * FROM pg_stat_replication`
    * Run `SELECT pg_is_in_recovery();`, on primary should return `false`, on replica should return `true`
    * Modify data in replica DB, error should appear - `Cannot execute UPDATE in a read-only transaction`
* Manual failover:
  * Stop primary (to simulate failure) - `systemctl stop postgresql`
  * Promote replica to primary - `sudo -u postgres pg_ctlcluster 16 main promote`
  * Repeat steps from `Test replication:`, to make sure replica became primary
  * Now switch your app to new primary DB, then create new replica
