

# Getting Started


Required:
- Node.js
- Postico and PostgreSQL
- Nodemon

To Run:
- npm install
- npm run server
- npm run client

SQL:

...
CREATE TABLE "product" (
"id" serial PRIMARY KEY NOT NULL,
"product_number" integer,
"name" varchar(200)
);

CREATE TABLE "current_price" (
"value" decimal(4,2),
"currency_code" varchar(80),
"product_id" INT REFERENCES "product"
);

INSERT INTO "product" ("product_number", "name")
VALUES (15117729, 'Destiny 2'),
(16483589, 'Halo 5'),
(16696652, 'Fortnite'),
(16752456, 'Overwatch');

INSERT INTO "current_price" ("value", "currency_code", "product_id")
VALUES (49.99, 'USD', 1),
(49.98, 'USD', 2),
(01.00, 'USD', 3),
(19.99, 'USD', 4);
...