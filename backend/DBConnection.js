const mysql = require("mysql");

let connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  database: "book_store_application",
  user: "root",
  password: "root"
});

connection.connect((error) => {
  if (error) {
    console.log("Unable to Connect");
    console.log(error);
  } else {
    console.log("Successfully connected to DB");
  }
});

module.exports = connection;
