const express = require("express");
const db = require("../config/database");

const router = express.Router();

router.put("/editBook/:id", (req, res) => {
  console.log(req.body);
  const selectQuery = `UPDATE bookInfo SET title = '${req.body.title}', author = '${req.body.author}', publishYear = '${req.body.publishYear}' WHERE bId = ${req.params.id}`;
  db.query(selectQuery, (err, result) => {
    if (err) {
      console.log("Error Fetching: ", err);
      return res.status(500).json({ error: "Database error" });
    } else {
      res.status(200).json({
        message: "Book updated successfully",
        book: result[0],
      });
    }
  });
});

module.exports = router;
