#### JSONB VS Columns
* Bunch of columns better with:
    * Static fields (e.g. address structure)
* Json better with:
    * Dynamic fields (e.g. grafana config)
    * Isolated fields (e.g. trello card)
    * Limited size lists (e.g. list of available protocols)
    * When you need to store json response from external service
        * E.g. [Charge from Stripe API](https://stripe.com/docs/api/ruby#charge_object)
    * When optimization is very important

#### JSONB features
* Creating table
    * `CREATE TABLE building (id SERIAL PRIMARY KEY, data JSONB);`
* Inserting
    * `INSERT INTO building(id, data) VALUES (1, '{"name": "Tall house", "tags": ["Business-center", "Shop"], "finished": true}')`
* Querying data
    * `SELECT data->>'name' AS name FROM building`
* Filtering
    * `SELECT * FROM building WHERE data->>'finished' = 'true'`
    * `SELECT * FROM building WHERE data->'tags' ? 'Shop'`
* Check if field exists
    * `SELECT count(*) FROM cards WHERE data ? 'finished';`
* Expanding data (returns 2 rows - "Business-center" and "Shop")
    * `SELECT jsonb_array_elements_text(data->'tags') as tag FROM cards`
* Indexing
    * `CREATE INDEX finished_index ON cards ((data->>'finished'));`

#### JSONB modification via SQL
* Add value
    * Request - `SELECT jsonb_set('{"message": "hello"}'::jsonb, '{id}', '44')`
    * Result - `{"id": 44, "message": "hello"}`
* Add nested value
    * Request - `SELECT jsonb_set('{"user": {"firstName": "john"}}'::jsonb, '{user, lastName}', '"Doe"')`
    * Result - `{"user": {"lastName": "Doe", "firstName": "john"}}`
* Replace value
    * Request - `select jsonb_set('{"message": "hello"}', '{message}', '"what"')`
    * Result - `{"message": "what"}`
* Replace nested value
    * Request - `select jsonb_set('{"a": "23", "c": {"a": "44"}}'::jsonb, '{c, a}', '66')`
    * Result - `{"a": "23", "c": {"a": 66}}`
* Remove key
    * Request - `select '{"message": "hello", "id": "23"}'::jsonb - 'id'`
    * Result - `{"message": "hello"}`
* Remove nested key
    * Request - `select '{"a": "23", "c": {"a": "44"}}'::jsonb #- '{c,a}'`
    * Result - `{"a": "23", "c": {}}`

### JSONB
* JSONB - Overview
```
    SELECT '{"content":{"date":"2023-01-02"}}'::jsonb @@ '$.content.date > "2023-01-01"';
    SELECT '{"content":{"value":43}}'::jsonb @@ '$.content.value < 44';
    
    SELECT '{"content":{"venous":17.2, "failed": true}}'::jsonb @@ '$.content.venous > 4 && $.content.failed == true';
    
    SELECT '{"content":{"venous":17.2, "status": "OK"}}'::jsonb @> '{"content": {"status": "OK"}}';
    SELECT '{"content":{"venous":17.2, "status": "OK"}}'::jsonb -> 'content'->>'status' = 'OK';
    
    SELECT '[{"action":"SIGNED", "status": "OK"}, {"action":"SAVED", "status": "DELETED"}]'::jsonb @> '[{"status": "OK"}]';
    
    -- 1 json element = 1 row in response
    SELECT jsonb_array_elements('[{"action":"SIGNED"},{"action":"SAVED"}]'::jsonb);
    
    SELECT * FROM 
        jsonb_array_elements('[{"action":"SIGNED", "status": "OK"}, {"action":"SAVED", "status": "DELETED"}]'::jsonb) AS computer
    WHERE computer->>'action' = 'SIGNED' AND computer->>'status' = 'OK'
```
* JSONB - Query & Index
```
    {
      "content": {
        "status": "ACTIVE"
        "weight": 84.3
      }
    }
    
    -- 1
    SELECT *
    FROM doc_card
    WHERE (doc->'content'->>'status') = 'INACTIVE';
    
    CREATE INDEX doc_status_idx
    ON doc_card ((doc->'content'->>'status'));
    
    -- 2 (Upper limit of cost can be scary, but execution time is still greatly improves)
    SELECT *
    FROM doc_card
    WHERE (CAST(doc->'content'->>'weight' AS numeric)) > 80;
    
    CREATE INDEX doc_weight_idx
    ON doc_card
    ((CAST(doc->'content'->>'weight' AS numeric)));
    
    -- 3
    SELECT *
    FROM doc_card
    WHERE doc @@ '$.content.weight > 44';
    
    SELECT *
    FROM patient.doc_card e
    WHERE doc @> '{"content": {"weight": 53.8}}'
    
    CREATE INDEX doc_idx ON doc_card
    USING gin (doc);
```
* JSONB - Query & Index
```
    [
       {
          "action":"SIGNED",
          "userId":"97fbd76a-bd5e-496b-a778-33b2dfa96e31",
          "dateTime":"2023-07-26T08:45:00",
          "userName":"John"
       },
       {
          "action":"SAVED",
          "userId":"97fbd76a-bd5e-496b-a778-33b2dfa96e31",
          "dateTime":"2023-07-26T08:44:34",
          "userName":"Helga"
       }
    ]
    
    -- 1
    SELECT *
    FROM doc_card
    WHERE changelog @> '[{"action": "SIGNED"}]';
    
    SELECT *
    FROM doc_card e
    WHERE changelog @@ '$.dateTime > "2024-07-26T08:44:00"';
    
    CREATE INDEX doc_changelog_idx ON doc_card
    USING gin (changelog);
```
