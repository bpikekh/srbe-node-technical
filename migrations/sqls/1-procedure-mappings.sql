CREATE TABLE procedure_mapping (
  id serial PRIMARY KEY,
  nicename varchar(64) not null,
  identifier varchar(64) unique not null,
  icd_10_partial varchar(24)
);
