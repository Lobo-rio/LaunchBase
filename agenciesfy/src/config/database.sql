CREATE TABLE "agencies" (
  "id" SERIAL PRIMARY KEY,
  "name" text NOT NULL,
  "cnpj" text NOT NULL
);

CREATE TABLE "addresses" (
  "id" SERIAL PRIMARY KEY,
  "agency_id" int UNIQUE,
  "street" text NOT NULL,
  "number" int NOT NULL,
  "complement" text,
  "neighborhood" text NOT NULL,
  "city" text NOT NULL,
  "state" text NOT NULL,
  "zipcode" int
);

CREATE TABLE "cars" (
  "id" SERIAL PRIMARY KEY,
  "models_id" int,
  "name" tex NOT NULL
);

CREATE TABLE "models" (
  "id" SERIAL PRIMARY KEY,
  "plate" text NOT NULL,
  "color" text NOT NULL,
  "motorization" text NOT NULL,
  "doors" int NOT NULL,
  "automatic" int DEFAULT 0
);

CREATE TABLE "orders" (
  "id" SERIAL PRIMARY KEY,
  "agency_id" int,
  "customers_id" int,
  "car_id" int,
  "description" text NOT NULL,
  "quantity_days" int NOT NULL,
  "price" int NOT NULL
);

CREATE TABLE "customers" (
  "id" SERIAL PRIMARY KEY,
  "name" text NOT NULL,
  "cpf" int NOT NULL,
  "birth_day" date NOT NULL,
  "phone" int NOT NULL
);

ALTER TABLE "agencies" ADD FOREIGN KEY ("id") REFERENCES "addresses" ("agency_id");

ALTER TABLE "cars" ADD FOREIGN KEY ("models_id") REFERENCES "models" ("id");

ALTER TABLE "orders" ADD FOREIGN KEY ("customers_id") REFERENCES "customers" ("id");

ALTER TABLE "orders" ADD FOREIGN KEY ("agency_id") REFERENCES "agencies" ("id");

ALTER TABLE "orders" ADD FOREIGN KEY ("car_id") REFERENCES "cars" ("id");

