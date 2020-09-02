const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get( '/', ( req, res )=>{
    console.log( 'in router /events GET',req.params.title );
    /// - query: SELECT * FROM "eventlist" - ///
    let queryString = `SELECT "tweet_html" FROM "tweets" WHERE "publication_id"=253;`;
    pool.query( queryString ).then( ( result )=>{
        // success
        res.send( result.rows );
    }).catch( ( err )=>{
        // error
        res.sendStatus( 500 );
    })
})

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;