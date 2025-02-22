DROP TABLE IF EXISTS billionaires;
 
CREATE TABLE account (
  id BIGINT PRIMARY KEY,
  first_name VARCHAR(250) NOT NULL,
  balance DECIMAL(19,2) NOT NULL
);
 
INSERT INTO account (id, first_name, balance) VALUES
  (21321, 'Alex', 777),
  (823892, 'Bill', 15432.23),
  (2343921, 'John', 9000),
  (38482939, 'Zena', -200);
