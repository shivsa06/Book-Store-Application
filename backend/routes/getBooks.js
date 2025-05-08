const express = require("express");
const db = require("../config/database");

const router = express.Router();

//GET /user/:id - Fetch user details
router.get("/getBooks", (req, res) => {
  const retrieveQuery = `SELECT * FROM bookInfo`;
  db.query(retrieveQuery, (err, results) => {
    if (err) {
      console.log("Error Fetching: ", err);
      return res.status(500).json({ error: "Database error" });
    } else {
      return res.status(200).json(results);
    }
  });
});

module.exports = router;
