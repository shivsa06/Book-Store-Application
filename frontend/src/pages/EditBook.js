import React, { useEffect, useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

const EditBook = () => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    publishYear: "",
  });

  const [loading, setLoading] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!id || isNaN(id)) {
      setMessage("Invalid Book ID. Please try again.");
      enqueueSnackbar("Invalid Book ID", { variant: "error" });
      return;
    }
    setLoading(true);
    console.log("Fetching book data for ID:", id);
    axios
      .get(`http://localhost:3456/getOneBook/${id}`)
      .then((response) => {
        console.log("Get Response:", response.data);
        setFormData(response.data.book);
        setMessage("Book Details Loaded Successfully");
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error("Get Error:", error);
        const errorMsg =
          error.response?.data?.error ||
          "Network Error, Please try again later.";
        setMessage(`Error: ${errorMsg}`);
        enqueueSnackbar(`Error: ${errorMsg}`, { variant: "error" });
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditBook = (e) => {
    e.preventDefault();
    if (!id || isNaN(id)) {
      setMessage("Invalid Book ID. Please try again.");
      enqueueSnackbar("Invalid Book ID", { variant: "error" });
      return;
    }
    if (
      !formData.title.trim() ||
      !formData.author.trim() ||
      !formData.publishYear
    ) {
      setMessage("All fields are required.");
      enqueueSnackbar("All fields are required", { variant: "error" });
      return;
    }
    setLoading(true);
    console.log("Submitting Form with Data:", formData);
    axios
      .put(`http://localhost:3456/editBook/${id}`, formData)
      .then((response) => {
        setLoading(false);
        console.log("Put Response:", response.data);
        enqueueSnackbar("Book Updated Successfully", { variant: "success" });
        setMessage("Book Updated Successfully");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch((error) => {
        setLoading(false);
        console.error("Put Error:", error);
        const errorMsg =
          error.response?.data?.error || "Network Error, Please try again.";
        setMessage(`Error: ${errorMsg}`);
        enqueueSnackbar(`Error: ${errorMsg}`, { variant: "error" });
      });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <BackButton />
      <h1 className="text-3xl font-bold text-gray-800 my-6 text-center">
        Edit Book
      </h1>
      {message && (
        <p
          className={`text-center text-lg font-semibold p-3 rounded-lg mb-4 max-w-lg mx-auto ${
            message.includes("Error")
              ? "text-red-600 bg-red-100"
              : "text-green-600 bg-green-100"
          }`}
        >
          {message}
        </p>
      )}
      {loading && <Spinner className="mx-auto" />}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-full max-w-[600px] p-6 mx-auto bg-white shadow-lg">
        <form onSubmit={handleEditBook}>
          <div className="my-4">
            <label className="text-lg font-medium text-gray-600 block mb-2">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="border-2 border-gray-300 px-4 py-2 w-full rounded-md focus:outline-none focus:border-sky-500 transition-colors"
              placeholder="Enter book title"
              required
            />
          </div>
          <div className="my-4">
            <label className="text-lg font-medium text-gray-600 block mb-2">
              Author
            </label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className="border-2 border-gray-300 px-4 py-2 w-full rounded-md focus:outline-none focus:border-sky-500 transition-colors"
              placeholder="Enter author name"
              required
            />
          </div>
          <div className="my-4">
            <label className="text-lg font-medium text-gray-600 block mb-2">
              Publish Year
            </label>
            <input
              type="number"
              name="publishYear"
              value={formData.publishYear}
              onChange={handleChange}
              className="border-2 border-gray-300 px-4 py-2 w-full rounded-md focus:outline-none focus:border-sky-500 transition-colors"
              placeholder="Enter publish year"
              required
            />
          </div>
          <button
            type="submit"
            className="mt-6 bg-sky-500 text-white font-semibold py-3 px-8 rounded-lg w-1/2 mx-auto hover:bg-sky-600 transition-colors shadow-md"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditBook;
