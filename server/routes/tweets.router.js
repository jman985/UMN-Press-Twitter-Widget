const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {default: axios} = require('axios');
const token = process.env.BEARER_TOKEN;

// GET from Twitter API
router.get('/', (req, res) => {
    // console.log('preparing to hit server with a request to the Twitter API');
    axios.get(`https://api.twitter.com/2/tweets/search/recent?query=book1&max_results=10`, {
        headers: {
        'Authorization': `Bearer ${token}`
        }
    })
        .then((response)=>{
            console.log('sending back:', response.data.data);
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
// router.post('/', (req, res) => {

// });

module.exports = router;