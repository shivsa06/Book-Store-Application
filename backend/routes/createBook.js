const express = require("express");
const db = require("../config/database");

const router = express.Router();

//POST/createBook - Register a new book
router.post("/createBook", (req, res) => {
  
    console.log(req.body);
    const insertBook = `INSERT INTO bookInfo(title, author, publishYear) values ('${req.body.title}', '${req.body.author}', '${req.body.publishYear}')`;

    db.query(insertBook, (error, results) => {
        if (error) {
            console.log("Error Creating Book: ", error);
            return res.status(500).json({ error: "Failed to create book" });
        } else {
            console.log("Successfully Inserted");
            console.log(results);
            return res.status(200)
            .json({ message: "Book Inserted Successfully", bookId: results.insertId });
        }
    });
});

module.exports = router;
