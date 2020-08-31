
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);
CREATE TABLE "publication" (
    "id" SERIAL PRIMARY KEY,
    "title" VARCHAR (1000) UNIQUE NOT NULL,
    "subtitle" VARCHAR (1000) NOT NULL,
    "author1" VARCHAR (1000),
    "author2" VARCHAR (1000),
    "author3" VARCHAR (1000),
    "author4" VARCHAR (1000),
    "last_searched" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE "tweet" (
    "id" SERIAL PRIMARY KEY,
    "publication_id" INT REFERENCES publication(id),
    "tweet_id" VARCHAR (100),
    "approved" BOOLEAN
);

INSERT INTO publication(title, subtitle, author1)
VALUES 
('Book1', 'subtitle1', 'author1'),
('Book2', 'subtitle2', 'author2'),
('Book3', 'subtitle3', 'author3'),
('Book4', 'subtitle4', 'author4');
