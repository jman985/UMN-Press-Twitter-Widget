const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

/**
 * GET route template
 */
router.get('/', rejectUnauthenticated, (req, res) => {
  console.log('Getting Publications')
  const queryText = `
  SELECT * FROM publication
  ORDER BY title ASC`
  pool.query(queryText)
  .then( (response) => {
      console.log( 'Successfully got publication data');
      res.send(response.rows);
    })
    .catch((err) => {
      console.log("An error occured while getting bookmarks:", err);
      res.sendStatus(500);
    });
});


// updates the inclusion value of a publication
router.put('/', rejectUnauthenticated, (req, res) => {
  console.log('Toggling inclusion state of publication #', req.body.id)
  const queryText = `
  UPDATE publication
  SET include = NOT include
  WHERE id = ${req.body.id}
  `
  pool.query(queryText)
  .then( (response) => {
      console.log( 'Successfully toggled inclusion state');
      res.send(response.rows);
  })
  .catch( (err) => {
      console.log('An error occured while toggling inclusion state:', err);
      res.sendStatus(500);
  })
})


// updates the search_type value of a publication
router.put('/searchtype', rejectUnauthenticated, (req, res) => {
  console.log('Changing Searchtype of publication #', req.body.id)
  const queryText = `
  UPDATE publication
  SET search_type = $1
  WHERE id = $2
  `
  const values = [req.body.searchType, req.body.id]
  pool.query(queryText, values)
  .then( (response) => {
      console.log( 'Successfully changed Searchtype');
      res.send(response.rows);
  })
  .catch( (err) => {
      console.log('An error occured while trying to change search type:', err);
      res.sendStatus(500);
  })
})

// updates the search_type value of all publications
router.put('/searchtypeall', rejectUnauthenticated, (req, res) => {
  console.log('Changing Searchtype of all publications to ', req.body.searchType)
  const queryText = `
  UPDATE publication
  SET search_type = $1
  `
  const values = [req.body.searchType]
  pool.query(queryText, values)
  .then( (response) => {
      console.log( 'Successfully changed all Searchtypes');
      res.send(response.rows);
  })
  .catch( (err) => {
      console.log('An error occured while changing all search types:', err);
      res.sendStatus(500);
  })
})


//update timestamp 
router.put('/timestamp/:id', rejectUnauthenticated, (req, res) => {
  console.log('update last_searched timestamp');
    pool.query(`UPDATE "publication" 
    SET "last_searched" = CURRENT_TIMESTAMP WHERE id = ${req.params.id};`)
    // pool.query(queryText, queryInput)
    .then(() => res.sendStatus(201))
    .catch((error) => {res.sendStatus(500);
      console.log(error);
      //console.log(req.body)
    });
  });

/**
 * POST route template
 */
router.post("/csv", async (req, res) => {
  const csvData = req.body.payload;
  //console.log("OOOOO", csvData);
  const connection = await pool.connect();
  const notAvailable = "not provided";

  try {
    // for (book of csvData) {
    //   if (book.data.title === undefined) {
    //     console.log("pooooop");
    //   } else {
    //     console.log(book.data.title);
    //   }
    // }
    await connection.query("BEGIN");

    const queryText = `INSERT INTO "publication" ("title", "author1", "subtitle") 
    SELECT CAST($1 AS VARCHAR(1000)) AS "title", CAST($2 AS VARCHAR(1000)) AS "author1", CAST($3 AS VARCHAR(1000)) AS "subtitle"
     WHERE NOT EXISTS (SELECT * FROM "publication" WHERE "title" = $1 AND "author1" = $2 AND "subtitle" = $3);`;

    // const queryText = `INSERT INTO "publication" ("title", "author1", "subtitle") VALUES ($1, $2, $3);`;

    for (book of csvData) {
      await connection.query(queryText, [
        book.data.title,
        book.data.author,
        book.data.subtitle,
      ]);
    }
    await connection.query("COMMIT");
  } catch (error) {
    await connection.query("ROLLBACK");
    throw error;
  } finally {
    connection.release();
  }
});



router.put('/all', rejectUnauthenticated, (req, res) => {
  console.log('Toggling inclusion state of all publications')
  const queryText = `
  UPDATE publication
  SET include = $1
  `
  pool.query(queryText, [req.body.include])
  .then( (response) => {
      console.log( 'Successfully toggled inclusion state');
      res.send(response.rows);
  })
  .catch( (err) => {
      console.log('An error occured while toggling inclusion state:', err);
      res.sendStatus(500);
  })
})


module.exports = router;

// switch (book) {
//   case book.data.title === undefined || "":
//     book.data.title = "not provided";
//     break;
//   case book.data.author === undefined:
//     book.data.author = notAvailable;
//     break;
//   case book.data.subtitile === undefined:
//     book.data.subtitle = notAvailable;
//     break;
