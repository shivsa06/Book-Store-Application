import React, { useEffect, useState } from "react";
import Spinner from "../compoents/Spinner";
import BooksTable from "../compoents/home/BooksTable";
import BooksCard from "../compoents/home/BooksCard";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("table");

  useEffect(() => {
    setLoading(true);
    getBooks();
  }, []);

  let getBooks = async () => {
    let url = "http://localhost:5678/getBooks";
    let reqOptions = {
      method: "GET"
    };
    try {
      let JSONData = await fetch(url, reqOptions);
      let JSOData = await JSONData.json();
      setBooks(JSOData);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-center items-center gap-x-4">
        <button
          className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
          onClick={() => setShowType("table")}
        >
          Table
        </button>
        <button
          className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
          onClick={() => setShowType("card")}
        >
          Card
        </button>
      </div>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">Books List</h1>
        <Link to="/createBook">
          <MdOutlineAddBox className="text-sky-800 text-4xl"></MdOutlineAddBox>
        </Link>
      </div>
      {loading ? (
        <Spinner></Spinner>
      ) : showType === "table" ? (
        <BooksTable books={books}></BooksTable>
      ) : (
        <BooksCard books={books}></BooksCard>
      )}
    </div>
  );
};

export default Home;
