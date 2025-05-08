const express = require("express");
const cors = require("cors");
const db = require("./config/database");
const createBook = require("./routes/createBook");
const getBook = require("./routes/getBooks");
const getOneBook = require("./routes/getOneBook");
const updateBook = require("./routes/updateBook");
const deleteBook = require("./routes/deleteBook");
require("dotenv").config();

const app = express();

//Middleware
app.use(cors());
app.use(express.json());

//routes
app.use("/", createBook);
app.use("/", getBook);
app.use("/", getOneBook);
app.use("/", updateBook);
app.use("/", deleteBook);

const PORT = process.env.PORT || 3456;
app.listen(PORT, () => {
  console.log(`Server running on Port: ${PORT}`);
});
