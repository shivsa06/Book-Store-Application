import React, { useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteBook = () => {
    if (!id || isNaN(id)) {
      setLoading(false);
      enqueueSnackbar("Invalid Book ID", { variant: "error" });
      return;
    }
    setLoading(true);
    console.log("Sending DELETE request");
    axios
      .delete(`http://localhost:3456/deleteBook/${id}`)
      .then((response) => {
        console.log("Delete Response: ", response.data);
        enqueueSnackbar("Book Deleted Successfully", { variant: "success" });
        setTimeout(() => {
          setLoading(true);
          navigate("/");
        }, 2000);
      })
      .catch((error) => {
        setLoading(false);
        console.error("Delete Error:", error);
        if (error.response) {
          enqueueSnackbar(
            `Error: ${error.response.data.error || "Failed to delete book"}`,
            {
              variant: "error",
            }
          );
        } else if (error.request) {
          enqueueSnackbar("Network Error: Backend server not responding", {
            variant: "error",
          });
        } else {
          enqueueSnackbar(`Error: ${error.message}`, { variant: "error" });
        }
      });
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
