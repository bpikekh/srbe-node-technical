CREATE TABLE encounter (
  id serial PRIMARY KEY,
  admit_date TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
  icd_10_primary varchar(8),
  cpt_primary varchar(8),
  procedure_name_testing varchar(24)
);

insert into encounter 
(icd_10_primary, cpt_primary, procedure_name_testing) VALUES
(null, '44970', 'Appendectomy'),
('0DBJ432', null, 'Appendectomy'),
('06BY0ZC', null, 'Hemorrhoidectomy'),
(null, '46260', 'Hemorrhoidectomy'),
('0DT6333', null, 'Total Gastro'),
(null, '55555', 'NA'),
('0JB5123', null, 'Lobectectomy');
