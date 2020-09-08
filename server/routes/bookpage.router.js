const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {default: axios} = require('axios');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');




router.get( '/:publication_id', rejectUnauthenticated, ( req, res )=>{
    console.log( 'in router /books GET',req.params );
    /// - query: SELECT * FROM "eventlist" - ///
    pool.query( `SELECT "title", "subtitle", "author1" FROM "publication" WHERE "id"= $1;`,[req.params.publication_id])

    .then( ( result )=>{
        // success
        res.send( result.rows );
    }).catch( ( err )=>{
        // error
        res.sendStatus( 500 );
    })
})


module.exports = router;