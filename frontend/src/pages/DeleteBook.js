import React, { useState } from "react";
import BackButton from "../compoents/BackButton";
import Spinner from "../compoents/Spinner";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteBook = async () => {
    setLoading(true);
    let url = `http://localhost:5678/deleteBook${id}`;
    let reqOptions = {
      method: "DELETE"
    };
    try {
      let JSONData = await fetch(url, reqOptions);
      if (!JSONData.ok) {
        throw new Error("Network response was not ok");
      }
      let JSOData = await JSONData.json();
      console.log(JSOData);
      setLoading(false);
      enqueueSnackbar("Book Deleted Successfully", { variant: "success" });
      navigate("/");
    } catch (error) {
      setLoading(false);
      enqueueSnackbar("Error", { variant: "error" });
      console.log(error);
    }
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Delete Book</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto">
        <h3 className="text-2xl">Are You Sure You want to delete this book?</h3>

        <button
          className="p-4 bg-red-600 text-white m-8 w-full"
          onClick={handleDeleteBook}
        >
          Yes, Delete it
        </button>
      </div>
    </div>
  );
};

export default DeleteBook;
