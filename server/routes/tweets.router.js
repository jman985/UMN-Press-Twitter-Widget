const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {default: axios} = require('axios');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const authToken = process.env.BEARER_TOKEN;
const limitToken = process.env.SEARCH_RESULT_LIMIT;

// Search Twitter API for searchTerm
router.get('/twitter/:searchTerm', rejectUnauthenticated, (req, res) => {
    axios.get(`https://api.twitter.com/2/tweets/search/recent?query=${req.params.searchTerm}&max_results=${limitToken}&tweet.fields=possibly_sensitive,referenced_tweets`, {
        headers: {
        'Authorization': `Bearer ${authToken}`
        }
    })
        .then((response)=>{
            res.send({body: response.data.data, header: response.headers});
        })
        .catch((error)=>{
            console.log('error with Twitter GET', error);
            res.sendStatus(500);
        });
})


// Get all tweets from the database
router.get('/database', rejectUnauthenticated, (req, res) => {
  const queryText = `
  SELECT tweet.*, publication.title, publication.author1 FROM tweet
  JOIN publication ON tweet.publication_id = publication.id`
  pool.query(queryText)
      .then(response => {
          res.send(response.rows);
      }).catch(error=>{
          console.log('Error getting Tweets from database:', error);
          res.sendStatus(500);
      })
});


//POST only unique tweet ids into the database
router.post('/database', rejectUnauthenticated, (req, res) => {
    const queryText = `INSERT INTO "tweet" ("publication_id", "tweet_id")
    SELECT $1 AS "publication_id", CAST($2 AS VARCHAR(100)) AS "tweet_id" 
    WHERE NOT EXISTS (SELECT * FROM tweet WHERE publication_id = $1 AND tweet_id = $2);`
    pool.query(queryText, [req.body.publicationId,req.body.tweetId])
        .then(response => {
            res.sendStatus(200);
        }).catch(error=>{
            console.log('Error posting Tweets');
            res.sendStatus(500);
        })
});


// Updates approved value of tweets in tweet table to true
router.put('/database/approve', rejectUnauthenticated, (req, res) => {
  const queryText = `
  UPDATE tweet
  SET approved = true
  WHERE id = ${req.body.id}
  `
  pool.query(queryText)
  .then( (response) => {
      res.send(response.rows);
  })
  .catch( (err) => {
      console.log('An error occured while approving tweet:', err);
      res.sendStatus(500);
  })
})

// Updates approved value of tweets in tweet table to false
router.put('/database/reject', rejectUnauthenticated, (req, res) => {
  const queryText = `
  UPDATE tweet
  SET approved = false
  WHERE id = ${req.body.id}
  `
  pool.query(queryText)
  .then( (response) => {
      res.send(response.rows);
  })
  .catch( (err) => {
      console.log('An error occured while rejecting tweet:', err);
      res.sendStatus(500);
  })
})


// Updates approved value of tweets in tweet table to false
router.delete('/database/delete', rejectUnauthenticated, (req, res) => {
  const queryText = `
  DELETE FROM tweet 
  WHERE approved IS null OR approved = false;`
  pool.query(queryText)
  .then( (response) => {
      res.send(response.rows);
  })
  .catch( (err) => {
      console.log('An error occured while deleting tweets:', err);
      res.sendStatus(500);
  })
})

module.exports = router;