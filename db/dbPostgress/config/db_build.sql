BEGIN;
DROP TABLE IF EXISTS customer,
admin,
supplier,
list;
CREATE TABLE list (
  id SERIAL PRIMARY KEY,
   product_name TEXT NOT NULL,
    product_image TEXT NOT NULL,
    product_price NUMERIC,
    sizes TEXT NOT NULL,
    price_per_ounce NUMERIC
);
CREATE TABLE customer(
  id SERIAL PRIMARY KEY,
  firstname TEXT,
  lastname TEXT,
  email TEXT,
  password TEXT,
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
