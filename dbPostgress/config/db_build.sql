BEGIN;
DROP TABLE IF EXISTS customer,
admin,
supplier,
list;
CREATE TABLE list (
  id SERIAL PRIMARY KEY,
  groceryname TEXT NOT NULL
);
CREATE TABLE customer(
  id SERIAL PRIMARY KEY,
  firstname TEXT,
  lastname TEXT,
  email TEXT,
  phoneNumber INTEGER,
  street TEXT,
  city TEXT,
  zipCode INTEGER,
  ipsid INTEGER,
  listid INTEGER REFERENCES list(id)
);
CREATE TABLE admin(id INTEGER, name TEXT PRIMARY KEY) WITH (OIDS = FALSE);
CREATE TABLE supplier (
  id SERIAL PRIMARY KEY,
  storename TEXT NOT NULL
);
COMMIT;
