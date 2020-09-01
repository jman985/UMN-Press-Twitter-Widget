const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  console.log('Getting Publications')
  const queryText = `
  SELECT * FROM publication
  ORDER BY title ASC`
  pool.query(queryText)
  .then( (response) => {
      console.log( 'Successfully got publication data', response.rows);
      res.send(response.rows);
  })
  .catch( (err) => {
      console.log('An error occured while getting bookmarks:', err);
      res.sendStatus(500);
  })
})



router.put('/', (req, res) => {
  console.log('Toggling inclusion state of publication #', req.body.id)
  const queryText = `
  UPDATE publication
  SET include = NOT include
  WHERE id = ${req.body.id}
  `
  pool.query(queryText)
  .then( (response) => {
      console.log( 'Successfully toggled inclusion state');
      res.send(response.rows);
  })
  .catch( (err) => {
      console.log('An error occured while toggling inclusion state:', err);
      res.sendStatus(500);
  })
})


/**
 * POST route template
 */
// router.post('/', (req, res) => {

// });

module.exports = router;