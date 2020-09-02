const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {default: axios} = require('axios');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const token = process.env.BEARER_TOKEN;

// GET from Twitter API
router.get('/:title', rejectUnauthenticated, (req, res) => {
    // console.log('=====>> router get', req.params.title);
    // console.log('preparing to hit server with a request to the Twitter API');
    axios.get(`https://api.twitter.com/2/tweets/search/recent?query=${req.params.title}&max_results=10`, {
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




/**
 * POST route template
 */
router.post('/', (req, res) => {
    console.log('preapring insert query:', req.body)
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

module.exports = router;