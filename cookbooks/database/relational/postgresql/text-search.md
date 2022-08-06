### Full-text search
* Find exact match (strict search)
    * Examples:
        * Look for `specially`, find `specially`, not find `special`
        * Look for `аа` (rus), find `АА753`, not find `А123`
        * Look for `a`, find `absorb` and `aaron`
    * Check it:
        * `select * from to_tsvector('simple', 'specially:*');` -> `'specially':1`
        * `select * from to_tsvector('simple', 'аа:*');` -> `'аа':1`
        * `select * from to_tsvector('simple', 'a:*');` -> `'a':1`
* Find partial match
    * Examples:
        * Look for `specially`, find `specially` and `special` 
        * Look for `аа` (rus), find `А123`, not find `АА753`
        * Look for `a`, find nothing
    * Check it:
        * `select * from to_tsvector('english', 'specially:*');` -> `'special':1`
        * `select * from to_tsvector('russian', 'аа:*');` -> `'а':1`
        * `select * from to_tsvector('english', 'a:*');` -> ``
* Search query example (will find Obama):
    ```
    select * from 
        user,
        to_tsquery('simple', 'Bara:*&Husse:*&Obam:*') q
    where (
        to_tsvector('simple', first_name) ||
        to_tsvector('simple', middle_name) ||
        to_tsvector('simple', last_name)
    ) @@ q
    ```

### Fuzzy search
* Example - Look for `GUMBO`, find `DUMBO`
* Install - `CREATE EXTENSION if not exists fuzzystrmatch;`
* Check:
    * `SELECT levenshtein('GUMBO', 'DUMBO');` -> `1`
    * `SELECT levenshtein('GUMBO', 'WORLD');` -> `5`
* Search query example (will find John)
    ```
    SELECT * 
    FROM user
    WHERE levenshtein(first_name , 'Jeohn') <= 2
    ```

### Trigrams
* Look for `gin_trgm_ops` at [optimization.md](./optimization.md)