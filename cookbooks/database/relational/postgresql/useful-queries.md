* Running queries:
```
SELECT pid, age(clock_timestamp(), query_start), usename, query 
FROM pg_stat_activity 
WHERE query != '<IDLE>' AND query NOT ILIKE '%pg_stat_activity%' 
ORDER BY query_start asc;
```
* Kill query:
```
-- running:
SELECT pg_cancel_backend(pid);
-- idle:
SELECT pg_terminate_backend(pid);
```
* All users:
```
SELECT * FROM pg_user;
```
* Table index usage
```
-- should be around 0.99 for all big tables:
SELECT relname, 100 * idx_scan / (seq_scan + idx_scan) percent_of_times_index_used, n_live_tup rows_in_table
FROM pg_stat_user_tables 
ORDER BY n_live_tup DESC;
```
* Unused indexes:
```
SELECT relname AS table_name, indexrelname AS index_name, idx_scan, idx_tup_read, idx_tup_fetch, pg_size_pretty(pg_relation_size(indexrelname::regclass))
FROM pg_stat_all_indexes
WHERE schemaname = 'public'
AND idx_scan = 0
AND idx_tup_read = 0
AND idx_tup_fetch = 0
ORDER BY pg_relation_size(indexrelname::regclass) DESC;
```
* Missing indexes:
```
SELECT
  relname,
  seq_scan - idx_scan AS too_much_seq,
  CASE
    WHEN
      seq_scan - coalesce(idx_scan, 0) > 0
    THEN
      'Missing Index?'
    ELSE
      'OK'
  END,
  pg_relation_size(relname::regclass) AS rel_size, seq_scan, idx_scan
FROM
  pg_stat_all_tables
WHERE
  schemaname = 'public'
  AND pg_relation_size(relname::regclass) > 80000
ORDER BY
  too_much_seq DESC;
```
* Settings:
```
SELECT * FROM pg_settings;
```
* Active connections:
```
SELECT * FROM pg_stat_activity;
```
* Active connections (grouped):
```
SELECT client_hostname, count(*) 
FROM pg_stat_activity
group by client_hostname
order by client_hostname;
```