# Sql
* Explain visualizer
    * https://tatiyants.com/pev/#/plans

## Queries
* Update/Insert based on bunch of selects
    ```
    MERGE INTO unique_trade_object uto
      USING (
        ... a lot of selects
      ) o ON (uto.id = o.uto_id)
      WHEN MATCHED THEN
        UPDATE SET uto.address = o.alternative_address
      WHEN NOT MATCHED THEN
        ... insert or ignore
    ```
* Calculate count of rows with unique conditions
    ```
    SELECT 
      house_id,
      COUNT(*) AS total_count,
      SUM(CASE WHEN filtered.visit_type = 'SPECIAL' THEN 1 ELSE 0 END) AS special_count,
      SUM(CASE WHEN filtered.age >= 1 and filtered_visit.age < 10 THEN 1 ELSE 0 END) AS chlidren_count
    from filtered
    group by filtered.house_id
    ```
