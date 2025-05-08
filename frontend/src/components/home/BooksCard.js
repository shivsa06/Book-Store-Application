import React from "react";
import { PiBookOpenTextLight } from "react-icons/pi";
import { BiUserCircle, BiShow } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import BookSingleCard from "./BookSingleCard";

const BooksCard = ({ books }) => {
  const booksArray = Array.isArray(books) ? books : [];

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {booksArray.length === 0 ? (
        <p className="text-center text-gray-500 col-span-full">
          No books available
        </p>
      ) : (
        booksArray.map((item) => <BookSingleCard key={item.bId} book={item} />)
      )}
    </div>
  );
};

export default BooksCard;
