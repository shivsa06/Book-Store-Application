Book Keeping Application
A full-stack web application for managing a collection of books. Users can create, view, edit, and delete books with a responsive and intuitive interface. The app features a RESTful API, real-time notifications, and robust error handling, built with modern web technologies.
Features

List Books: Display all books in a table or card format with options to view, edit, or delete.
View Book Details: Show detailed information about a specific book, including ID, title, author, and publish year.
Create Books: Add new books with input validation.
Edit Books: Update existing book details with error handling.
Delete Books: Remove books from the collection.
Interactive Modal: Use modals for creating or editing books (via BookModal).
Responsive UI: Clean and user-friendly interface styled with Tailwind CSS.
Real-time Notifications: Snackbar notifications for success and error messages using Notistack.
RESTful API: Backend API for CRUD operations on books.

Tech Stack
Frontend

React: For building the user interface.
React Router: For client-side routing.
Axios: For making HTTP requests to the backend API.
Notistack: For displaying snackbar notifications.
Tailwind CSS: For styling the UI.

Backend

Node.js: Runtime environment for the server.
Express.js: Web framework for building the RESTful API.
MySQL: Database for storing book information.
mysql2: MySQL client for Node.js.

Database

Table: bookInfo
Columns: bId (INT, Primary Key, Auto Increment), title (VARCHAR), author (VARCHAR), publishYear (INT)



Prerequisites

Node.js (v16 or higher)
MySQL (v8 or higher)
Git (for cloning the repository)

Installation

Clone the Repository:
git clone https://github.com/<your-username>/book-keeping-application.git
cd book-keeping-application


Backend Setup:

Navigate to the backend directory:
cd backend


Install dependencies:
npm install


Configure environment variables:

Create a .env file in the backend directory:
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=book_db
PORT=3456




Configure the database:

Create a MySQL database named book_db:
CREATE DATABASE book_db;


Update backend/config/database.js to use environment variables:
const mysql = require("mysql2");
require("dotenv").config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err.message);
    return;
  }
  console.log("Connected to MySQL database");
});

module.exports = connection;


Create the bookInfo table:
CREATE TABLE bookInfo (
  bId INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  publishYear INT NOT NULL
);


(Optional) Insert sample data:
INSERT INTO bookInfo (title, author, publishYear)
VALUES ('Sample Book', 'John Doe', 2020);






Frontend Setup:

Navigate to the frontend directory (root):
cd ..


Install dependencies:
npm install




Run the Application:

Start the backend server:
cd backend
node server.js


The server will run on http://localhost:3456 (or the port specified in .env).


Start the frontend development server:
cd ..
npm start


The app will open at http://localhost:3000.





Usage

Home Page:
Visit http://localhost:3000/ to see a list of all books in table or card format.


View a Book:
Navigate to http://localhost:3000/showBook/<id> (e.g., /showBook/1) to view book details.


Create a Book:
Go to http://localhost:3000/createBook to add a new book.


Edit a Book:
Go to http://localhost:3000/editBook/<id> (e.g., /editBook/1) to update book details.


Delete a Book:
Navigate to http://localhost:3000/deleteBook/<id> to remove a book.


Error Handling:
Invalid inputs, missing books, or server errors will display snackbar notifications and error messages.



API Endpoints

GET /api/getBooks:
Fetch all books.
Response: { books: [{ bId, title, author, publishYear }, ...] }


GET /api/getOneBook/:id:
Fetch details of a book by ID.
Response: { book: { title, author, publishYear } }


POST /api/createBook:
Create a new book.
Request Body: { title, author, publishYear }
Response: { message: "Book created successfully" }


PUT /api/updateBook/:id:
Update book details by ID.
Request Body: { title, author, publishYear }
Response: { message: "Book updated successfully" }


DELETE /api/deleteBook/:id:
Delete a book by ID.
Response: { message: "Book deleted successfully" }

Contributing

Fork the repository.
Create a new branch (git checkout -b feature/your-feature).
Make your changes and commit (git commit -m "Add your feature").
Push to the branch (git push origin feature/your-feature).
Open a Pull Request.

<!-- Excited to share my latest project: Book Keeping Application! 📚✨

Built a full-stack web app to manage book collections with ease. From creating and editing book records to viewing and deleting them, this app offers a seamless experience with a sleek, responsive UI. Powered by React, Node.js, Express, and MySQL, it features real-time notifications with Notistack, Tailwind CSS for styling, and a robust RESTful API for smooth CRUD operations.

Key highlights:
🔹 Interactive UI: Card and table views for books, with modals for quick interactions.
🔹 Robust Backend: Secure API endpoints with MySQL for efficient data management.
🔹 User-Friendly: Real-time feedback with snackbars and error handling.

This project was a great opportunity to dive deep into full-stack development, from designing a responsive frontend to optimizing backend queries. Check it out on [GitHub link] and feel free to share your feedback! 🚀

#WebDevelopment #ReactJS #NodeJS #MySQL #FullStack #JavaScript #Coding -->
