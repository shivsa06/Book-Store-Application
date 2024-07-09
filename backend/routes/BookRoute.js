const express = require("express");
const multer = require("multer");
const connection = require("../DBConnection");
const upload = multer();

let router = express.Router();

// Middleware to parse JSON bodies
router.use(express.json());

router.get("/getBooks", upload.none(), (request, response) => {
  let allBooks = `select * from book_info`;
  connection.query(allBooks, (error, results) => {
    if (error) {
      response.json(error);
    } else {
      response.json(results);
      console.log(results);
    }
  });
});

router.post("/createBook", upload.none(), (request, response) => {
  console.log(request.body);
  let insertData = `insert into book_info(title, author, publishYear)
    values('${request.body.title}', '${request.body.author}', '${request.body.publishYear}')`;
  connection.query(insertData, (error, results) => {
    if (error) {
      response.json(error);
      console.log(error);
    } else {
      response.json({
        status: "Success",
        msg: "Book Created Successfully",
        details: request.body
      });
    }
  });
});

router.get("/getOneBook/:id", (request, response) => {
  console.log(request.params);
  let query = `select * from book_info where bId = ${request.params.id}`;
  connection.query(query, (error, results) => {
    if (error) {
      response.json(error);
      console.log(error);
    } else {
      response.json(results);
    }
  });
});

router.put("/updateBook", upload.none(), (request, response) => {
  console.log(request.body);
  let updateQuery = `update book_info set title = '${request.body.title}', author = '${request.body.author}', publishYear = '${request.body.publishYear}' where bId = ${request.body.id}`;
  connection.query(updateQuery, (error, results) => {
    if (error) {
      console.log(error);
      response.json(error);
    } else {
      response.json({
        status: "success",
        msg: "Account Updated Successfully",
        details: results
      });
    }
  });
});

router.delete("/deleteBook:id", (request, response) => {
  let deleteQuery = `delete from book_info where bId = ${request.params.id}`;
  connection.query(deleteQuery, (error, results) => {
    if (error) {
      console.log(error);
      response.json(error);
    } else {
      response.json({
        status: "Success",
        message: "Book Deleted Successfully"
      });
      console.log(results);
    }
  });
});

module.exports = router;
