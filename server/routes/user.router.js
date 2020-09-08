const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {  
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);

  const queryText = 'INSERT INTO "user" (username, password) VALUES ($1, $2) RETURNING id';
  pool.query(queryText, [username, password])
    .then(() => res.sendStatus(201))
    .catch(() => res.sendStatus(500));
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});



router.put('/rate', (req, res) => {
  let userId = req.body.userId
  const queryText = `
  UPDATE "user"
  SET rate_limit = $1, rate_limit_remaining = $2, rate_limit_refresh = $3
  WHERE id = $4;
  `
  const values = [
    req.body.rateLimit, 
    req.body.rateLimitRemaining, 
    req.body.rateLimitReset,
    req.body.userId
  ]
  console.log(req.body)
  pool.query(queryText, values)
  .then( (response) => {
      console.log( 'Successfully updated rate info');
      res.sendStatus(200);
  })
  .catch( (err) => {
      console.log('An error occured while updating rate info:', err);
      res.sendStatus(500);
  })
});


module.exports = router;
