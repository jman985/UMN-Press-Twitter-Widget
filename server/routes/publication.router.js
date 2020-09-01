const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

/**
 * GET route template
 */
router.get("/", (req, res) => {
  console.log("Getting Publications");
  const queryText = `SELECT * FROM publication`;
  pool
    .query(queryText)
    .then((response) => {
      console.log("Successfully got publication data", response.rows);
      res.send(response.rows);
    })
    .catch((err) => {
      console.log("An error occured while getting bookmarks:", err);
      res.sendStatus(500);
    });
});

/**
 * POST route template
 */
router.post("/csv", (req, res) => {
  console.log("made it to post route", req.body);
  for (let book of req.body.payload) {
    console.log(book.data.author);
  }
});

module.exports = router;
