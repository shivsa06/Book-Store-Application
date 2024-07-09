import React from "react";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import Home from "./pages/Home";
import CreateBook from "./pages/CreateBooks";
import EditBook from "./pages/EditBook";
import ShowBook from "./pages/ShowBook";
import DeleteBook from "./pages/DeleteBook";

function App() {
  return (
    <BrowserRouter>
      <SnackbarProvider>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/createBook" element={<CreateBook></CreateBook>}></Route>
          <Route path="/editBook/:id" element={<EditBook></EditBook>}></Route>
          <Route path="/details/:id" element={<ShowBook></ShowBook>}></Route>
          <Route path="/deleteBook/:id" element={<DeleteBook></DeleteBook>}></Route>
        </Routes>
      </SnackbarProvider>
    </BrowserRouter>
  );
}

export default App;
