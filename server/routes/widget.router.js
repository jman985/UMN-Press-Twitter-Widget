const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {default: axios} = require('axios');
const token = process.env.BEARER_TOKEN;


// gets a tweets for a specific publication
router.get( '/:publication_id', ( req, res )=>{
    pool.query( `SELECT "tweet_id" FROM "tweet" WHERE "publication_id"=$1 AND "approved"=TRUE;`,[req.params.publication_id])
    .then( ( result )=>{
        res.send( result.rows );
    }).catch( ( err )=>{
        res.sendStatus( 500 );
    })
})




module.exports = router;