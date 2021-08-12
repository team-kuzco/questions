DROP DATABASE IF EXISTS qAndA;
CREATE DATABASE qAndA;
USE qAndA;

CREATE TABLE questions (
  id int NOT NULL AUTO_INCREMENT,
  product_id int NOT NULL,
  body varchar (500) NOT NULL,
  date_written int NOT NULL,
  asker_name varchar (200) NOT NULL,
  asker_email varchar (200) NOT NULL,
  reported int NOT NULL,
  helpful int NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE answers (
  id int NOT NULL AUTO_INCREMENT,
  question_id int NOT NULL,
  body varchar (500) NOT NULL,
  date_written int NOT NULL,
  answerer_name varchar (200) NOT NULL,
  answerer_email varchar (200) NOT NULL,
  reported int NOT NULL,
  helpful int NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE answersPhotos (
  id int NOT NULL AUTO_INCREMENT,
  answer_id int NOT NULL,
  url varchar (1000) NOT NULL,
  PRIMARY KEY (id)
);


ALTER TABLE answers
ADD FOREIGN KEY (question_id) REFERENCES questions(id);


ALTER TABLE answersPhotos
ADD FOREIGN KEY (answer_id) REFERENCES answers(id);



LOAD DATA LOCAL INFILE '/home/chris/Downloads/questions.csv'
INTO TABLE questions
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE '/home/chris/Downloads/answers.csv'
INTO TABLE answers
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE '/home/chris/Downloads/answers_photos.csv'
INTO TABLE answersPhotos
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;
