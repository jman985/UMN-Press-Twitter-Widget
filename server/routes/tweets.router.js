const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {default: axios} = require('axios');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const token = process.env.BEARER_TOKEN;

// GET from Twitter API
router.get('/twitter/:title', rejectUnauthenticated, (req, res) => {
    // console.log('=====>> router get', req.params.title);
    console.log('this is the router query', req.params.title);
    axios.get(`https://api.twitter.com/2/tweets/search/recent?query="${req.params.title}"&max_results=30&tweet.fields=possibly_sensitive,referenced_tweets`, {
        headers: {
        'Authorization': `Bearer ${token}`
        }
    })
        .then((response)=>{
            // console.log('sending back:', response.data.data);
            res.send({body: response.data.data, header: response.headers});
            // console.log({data: response.data.data, header:response.headers})
            // console.log(response.headers)
        })
        .catch((error)=>{
            console.log('error with Twitter GET', error);
            res.sendStatus(500);
        });
})


router.get('/database', rejectUnauthenticated, (req, res) => {
  console.log('getting all tweets from database')
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



router.post('/database', rejectUnauthenticated, (req, res) => {
    console.log('preparing insert query:', req.body)
    const queryText = `INSERT INTO "tweet" ("publication_id", "tweet_id")
    SELECT $1 AS "publication_id", CAST($2 AS VARCHAR) AS "tweet_id" 
    WHERE NOT EXISTS (SELECT * FROM tweet WHERE publication_id = $1 AND tweet_id = $2);`

    pool.query(queryText, [req.body.publicationId,req.body.tweetId])
        .then(response => {
            res.sendStatus(200);
        }).catch(error=>{
            console.log('Error posting Tweets');
            res.sendStatus(500);
        })
});

// sets approved value of tweets in tweet table to true
router.put('/database/approve', rejectUnauthenticated, (req, res) => {
  console.log('Approving tweet id #', req.body.id)
  const queryText = `
  UPDATE tweet
  SET approved = true
  WHERE id = ${req.body.id}
  `
  pool.query(queryText)
  .then( (response) => {
      console.log( 'Successfully approved tweet');
      res.send(response.rows);
  })
  .catch( (err) => {
      console.log('An error occured while approving tweet:', err);
      res.sendStatus(500);
  })
})

// sets approved value of tweets in tweet table to false
router.put('/database/reject', rejectUnauthenticated, (req, res) => {
  console.log('Rejecting tweet #', req.body.id)
  const queryText = `
  UPDATE tweet
  SET approved = false
  WHERE id = ${req.body.id}
  `
  pool.query(queryText)
  .then( (response) => {
      console.log( 'Successfully rejected tweet');
      res.send(response.rows);
  })
  .catch( (err) => {
      console.log('An error occured while rejecting tweet:', err);
      res.sendStatus(500);
  })
})

module.exports = router;