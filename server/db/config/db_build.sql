
DROP TABLE public.customer;

CREATE TABLE public.customer
(
first_name text COLLATE pg_catalog."default",
last_name text COLLATE pg_catalog."default",
email text COLLATE pg_catalog."default",
phone_number text COLLATE pg_catalog."default",
street text COLLATE pg_catalog."default",
city text COLLATE pg_catalog."default",
zip_code numeric,
id numeric,
ips_id numeric,
grocery_list_id numeric
)
WITH (
OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.customer
OWNER to pvahqtecafcvqh;