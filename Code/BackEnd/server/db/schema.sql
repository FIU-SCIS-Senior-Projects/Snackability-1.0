DROP DATABASE IF EXISTS snackability_2;
CREATE database snackability_2;

USE snackability_2;

CREATE TABLE snack (
  id int NOT NULL AUTO_INCREMENT,
  brand_name VARCHAR(100) NOT NULL,
  product VARCHAR(200) NOT NULL,
  short_name VARCHAR(150) NULL,
  serving_size INT NOT NULL,
  calories INT NOT NULL,
  calories_fat INT NOT NULL,
  saturated_fat INT NOT NULL,
  trans_fat  INT NOT NULL,
  sodium  INT NOT NULL,
  sugar INT NOT NULL, 
  first_ingredient VARCHAR(50), 
  processed VARCHAR(5), 
  brand_name_search VARCHAR(50) NULL,
  product_search VARCHAR(50) NULL,
  short_name_search VARCHAR(50) NULL,
  primary key (id)
);

