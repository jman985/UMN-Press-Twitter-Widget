const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {default: axios} = require('axios');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const token = process.env.BEARER_TOKEN;

// GET from Twitter API
router.get('/twitter/:title', rejectUnauthenticated, (req, res) => {
    // console.log('=====>> router get', req.params.title);
    // console.log('preparing to hit server with a request to the Twitter API');
    axios.get(`https://api.twitter.com/2/tweets/search/recent?query="${req.params.title}"&max_results=10`, {
        headers: {
        'Authorization': `Bearer ${token}`
        }
    })
        .then((response)=>{
            // console.log('sending back:', response.data.data);
            res.send(response.data.data);
        })
        .catch((error)=>{
            console.log('error with Twitter GET', error);
            res.sendStatus(500);
        });
})


router.get('/database', (req, res) => {
  console.log('getting all tweets from database')
  const queryText = `SELECT * FROM tweet`
  pool.query(queryText)
      .then(response => {
          res.send(response.rows);
      }).catch(error=>{
          console.log('Error getting Tweets from database:', error);
          res.sendStatus(500);
      })
});



router.post('/database', (req, res) => {
    console.log('preparing insert query:', req.body)
    const queryText = `INSERT INTO tweet (tweet_id, publication_id)
    VALUES ($1, $2)`
    pool.query(queryText, [req.body.tweetId, req.body.publicationId])
        .then(response => {
            res.sendStatus(200);
        }).catch(error=>{
            console.log('Error posting Tweets');
            res.sendStatus(500);
        })
});


// sets approved value of tweets in tweet table to true
router.put('/database/approve', (req, res) => {
  console.log('Approving tweet #', req.body.id)
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
router.put('/database/reject', (req, res) => {
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