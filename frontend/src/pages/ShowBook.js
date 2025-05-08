import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import axios from "axios";
import Spinner from "../components/Spinner";
import { useSnackbar } from "notistack";

const ShowBook = () => {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (!id || isNaN(id)) {
      setError("Invalid Book ID. Please try again.");
      enqueueSnackbar("Invalid Book ID", { variant: "error" });
      return;
    }
    setLoading(true);
    setError("");
    axios
      .get(`http://localhost:3456/getOneBook/${id}`)
      .then((response) => {
        console.log("Get Response: ", response.data);
        if (!response.data.book || typeof response.data.book !== "object") {
          throw new Error("Invalid book data received");
        }
        setBook(response.data.book);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error("Get Error: ", error);
        const errorMessage =
          error.response?.data?.error ||
          error.message ||
          "Network Error, Please try again later.";
        setError(errorMessage);
        enqueueSnackbar(errorMessage, { variant: "error" });
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Show Book</h1>
      {loading ? (
        <Spinner className="mx-auto" />
      ) : error ? (
        <p className="text-red-600 bg-red-100 text-center text-lg font-semibold p-3 rounded-lg max-w-lg mx-auto">
          {error}
        </p>
      ) : !book ? (
        <p className="text-gray-600 text-center text-lg">
          No book data available.
        </p>
      ) : (
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4">
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Id: </span>
            <span>{id}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Title: </span>
            <span>{book.title || "N/A"}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Author: </span>
            <span>{book.author || "N/A"}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Publish Year: </span>
            <span>{book.publishYear || "N/A"}</span>
          </div>
          {/* Removed createdAt and updatedAt since not in API response */}
        </div>
      )}
    </div>
  );
};

export default ShowBook;
