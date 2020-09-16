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
  
    pool.query( `SELECT "tweet_id" FROM "tweet" WHERE "publication_id"=$1 AND "approved"=TRUE;`,[req.params.publication_id])

    .then( ( result )=>{
        // success
        res.send( result.rows );
    }).catch( ( err )=>{
        // error
        res.sendStatus( 500 );
    })
})




module.exports = router;