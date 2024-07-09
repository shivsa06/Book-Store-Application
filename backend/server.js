const express = require("express");
const cors = require("cors");
const books = require("./routes/BookRoute");

const app = express();
const PORT = 5678;

app.use(cors());

app.use(express.json()); // to parse JSON bodies

let authorizeToken = (request, response, next) => {
  next();
};

app.use(authorizeToken);

app.use("/", books);

app.listen(PORT, () => {
  console.log(`Server running at PORT: ${PORT}`);
});
