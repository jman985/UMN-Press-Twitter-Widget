# University of Minnesota Press Twitter Widget

Source code for the U of M Twitter Widget application provided by Prime Digital Academy alumni.

## Prerequisites for initial setup

Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)

## Create database and tables

Create a new database called `umn_app`.\
To set up database tables use the 'database.sql' file located in the root directory or copy tables below.

```SQL
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

```

If you would like to change the name your database to something else, you will need to update the name in the configuration object located on line 34 in `server/modules/pool.js`

## Development Setup Instructions

- Run `npm install`
- Create a `.env` file at the root of the project:
- This file will need the fallowing keys.

  ```
  SERVER_SESSION_SECRET= <Your Chosen Secret>
  BEARER_TOKEN = <token provided by the Twitter api account>
  ```

  - To create a unique Server Secrete visit [Here](https://passwordsgenerator.net/)
  - For Twitter BEARER_TOKEN visit [Here](https://developer.twitter.com/en/docs/authentication/oauth-2-0/bearer-tokens)

- Start postgres if not running already by using `brew services start postgresql`
- Run `npm run server`
- Run `npm run client`
- Navigate to `localhost:3000`

## Lay of the Land

- `src/` contains the React application
- `public/` contains static assets for the client-side
- `build/` after you build the project, contains the transpiled code from `src/` and `public/` that will be viewed on the production site
- `server/` contains the Express App

This code is also heavily commented. We recommend reading through the comments, getting a lay of the land, and becoming comfortable with how the code works before you start making too many changes. If you're wondering where to start, consider reading through component file comments in the following order:

- src/components
  - App/App
  - BookPage
  - CsvParser
  - PublicationItem
  - Publications
  - PublicationsTable
  - PublicationTable2
  - RegisterPage
  - UserPage/UserPage
  - TweetsPage
  - Widget
