const express = require("express");
const db = require("../config/database");

const router = express.Router();

//GET /user/:id - Fetch user details
router.get("/getOneBook/:id", (req, res) => {
  const id = req.params.id;
  const selectQuery = `SELECT * from bookInfo where bId = ${id}`;
  db.query(selectQuery, (err, result) => {
    if (err) {
      console.log("Error Fetching: ", err);
      return res.status(500).json({ error: "Database error" });
    } else {
      res.status(200).json({
        message: "Book details fetched successfully",
        book: result[0],
      });
    }
  });
});

module.exports = router;
