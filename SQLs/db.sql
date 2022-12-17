Create database solutionOne
use solutionOne;
create table authors(
  email varchar(100) NOT NULL,
  firstname varchar(100) NOT NULL,
  lastname varchar(100) NOT NULL,
  PRIMARY KEY (email)
);
create table books(
  title varchar(100) NOT NULL,
  isbn int(11) NOT NULL,
  authors varchar(100) NOT NULL,
  description varchar(10000) NOT NULL,
  PRIMARY KEY (isbn)
);
create table magazines(
  title varchar(100) NOT NULL,
  isbn int(11) NOT NULL,
  authors varchar(100) NOT NULL,
  publishedat DATETIME NOT NULL,
  PRIMARY KEY (isbn)
);
create table publications(
  title varchar(100) NOT NULL,
  isbn varchar(20) NOT NULL,
  authors varchar(100) NOT NULL,
  description varchar(10000) ,
  publishedat varchar(10),
  PRIMARY KEY (isbn)
)