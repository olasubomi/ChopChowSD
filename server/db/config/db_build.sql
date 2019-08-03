BEGIN;
DROP TABLE IF EXISTS customer , admin , supplier, grocery_listItem;
CREATE TABLE grocery_listItem (
  id  SERIAL PRIMARY KEY,
  name_grocery TEXT NOT NULL
);
CREATE TABLE customer(
    id  SERIAL PRIMARY KEY,
    first_name TEXT,
    last_name TEXT,
    email TEXT,
    phone_number INTEGER,
    street TEXT,
    city TEXT,
    zip_code INTEGER,
    ips_id INTEGER,
    grocery_listItem_id INTEGER REFERENCES grocery_listItem(id)
);
CREATE TABLE admin(
    id  INTEGER,
    name SERIAL PRIMARY KEY    
)
WITH (
  OIDS=FALSE
);
CREATE TABLE supplier (
  id  SERIAL PRIMARY KEY,
  store_name TEXT NOT NULL
);
COMMIT;
