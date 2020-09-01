const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {default: axios} = require('axios');
const token = process.env.BEARER_TOKEN;

/**
 * GET route template
 */
router.get( '/:publication_id', ( req, res )=>{
    console.log( 'in router /api/tweets GET', req.params );
    /// - query: SELECT * FROM "eventlist" - ///
    pool.query( `SELECT "tweet_id" FROM "tweets" WHERE "publication_id"=$1;`,[req.params.publication_id])
    .then( ( result )=>{
        // success
        res.send( result.rows );
    }).catch( ( err )=>{
        // error
        res.sendStatus( 500 );
    })
})


// GET Tweet from Twitter Embed API

router.get('/:publication_id/:tweet_id', (req, res) => {
    console.log( 'in router /api/tweets GET embed html', req.params );
    
    axios.get(`https://publish.twitter.com/oembed?url=https://twitter.com/anyuser/status/${req.params.tweet_id}&omit_script=true`)

        .then((response)=>{
            console.log('sending back:', response.data.html);
            res.send(response.data.html);
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

});

module.exports = router;