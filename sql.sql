
-- SQLite
/*
DROP TABLE IF EXISTS consumer;
DROP TABLE IF EXISTS superAdmin;
DROP TABLE IF EXISTS question;
DROP TABLE IF EXISTS contributor;
DROP TABLE IF EXISTS answer;
*/
DROP TABLE IF EXISTS consumer;
DROP TABLE IF EXISTS superAdmin;
DROP TABLE IF EXISTS question;
DROP TABLE IF EXISTS contributor;
DROP TABLE IF EXISTS answer;
DROP TABLE IF EXISTS queryCollection;
DROP TABLE IF EXISTS category;

CREATE TABLE IF NOT EXISTS consumer (
    username varchar(40) UNIQUE NOT NULL,
    email varchar(64) UNIQUE NOT NULL,
    password varchar(32) NOT NULL,
    userID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL);
    


CREATE TABLE IF NOT EXISTS superAdmin (
    username varchar(16) UNIQUE NOT NULL,
    email varchar(64) UNIQUE NOT NULL,
    password varchar(32) NOT NULL,
    userID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL);



CREATE TABLE IF NOT EXISTS contributor (
    username varchar(16) UNIQUE NOT NULL,
    email varchar(64) UNIQUE NOT NULL,
    password varchar(32) NOT NULL,
    userID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL);

    
/*

CREATE TABLE IF NOT EXISTS queryCollection ( 
    formID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    username VARCHAR(255) NOT NULL, /* Will take the userid of the questionmaker
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP, /*When a question is asked a row in queryCollection will be instantiated and therfore they have the same date  
    category varchar(15) 
    );


*/

CREATE TABLE IF NOT EXISTS question ( /**/
    questionID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
 
    questionTitle varchar(30),
    username varchar(40), 
    questionText TEXT,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    category VARCHAR(20) NOT NULL
    );


CREATE TABLE IF NOT EXISTS answer ( /* SELECT queryCollection.formID,queryCollection.username,queryCollection.date,queryCollection.category,question.formID FROM queryCollection INNER JOIN question AS queryCollection.formID = question.formID */
    answerID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  
    answerVote INTEGER(200),
    username varchar(40),
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    answerText TEXT
    );

CREATE TABLE IF NOT EXISTS category(
categoryID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
category VARCHAR(20) UNIQUE NOT NULL
); /**/