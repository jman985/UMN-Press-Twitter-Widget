
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "rate_limit" INT,
    "rate_limit_remaining" INT DEFAULT 450,
    "rate_limit_refresh" INT
);
CREATE TABLE "publication" (
    "id" SERIAL PRIMARY KEY,
    "title" VARCHAR (1000),
    "subtitle" VARCHAR (1000),
    "author1" VARCHAR (1000),
    "author2" VARCHAR (1000),
    "author3" VARCHAR (1000),
    "author4" VARCHAR (1000),
    -- last_searched defaults null so we can see that this publication has not been searched yet
    "last_searched" TIMESTAMP DEFAULT NULL, 
    "include" BOOLEAN DEFAULT TRUE,
    "search_type" VARCHAR (10) DEFAULT 'T'
);
CREATE TABLE "tweet" (
    "id" SERIAL PRIMARY KEY,
    "publication_id" INT REFERENCES publication(id),
    "tweet_id" VARCHAR (100),
    "approved" BOOLEAN
);

INSERT INTO publication(title, subtitle, author1)
VALUES 
('Art of Wonder', 'Inspiration, Creativity, and the Minneapolis Institute of Arts', 'Minneapolis Institute Of Arts'),
('Awakening the Eye', 'Robert Frank''s American Cinema', 'Kouvaros, George'),
('Bargaining for Women''s Rights', 'Activism in an Aspiring Muslim Democracy', 'Kang, Alice J.'),
('Barnstorming the Prairies', 'How Aerial Vision Shaped the Midwest', 'Weems, Jason');
