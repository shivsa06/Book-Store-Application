const express = require("express");
const db = require("../config/database");

const router = express.Router();

router.delete("/deleteBook/:id", (request, response) => {
  const deleteQuery = `DELETE from bookInfo where bId = ${request.params.id}`;
  db.query(deleteQuery, (error, results) => {
    if (error) {
      console.error("Error Deleting Book:", error.message);
      return res.status(500).json({ error: "Failed to delete Book" });
    } else {
      response.status(200).json({ message: "Book deleted successfully" });
    }
  });
});

module.exports = router;
