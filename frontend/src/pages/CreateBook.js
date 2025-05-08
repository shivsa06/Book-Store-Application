import React, { useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import axios from "axios";

const CreateBook = () => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    publishYear: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSaveBook = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post("http://localhost:3456/createBook", formData)
      .then((response) => {
        setLoading(false);
        enqueueSnackbar("Book Created Successfully", { variant: "success" });
        setMessage(`${response.data.message}`);
        console.log(`${response.data.message}`);
        console.log(`Book Id: ${response.data.bookId}`);
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        if (error.response) {
          console.log(error);
          setMessage(`Error: ${error.response.data.error}`);
        } else {
          console.log(error);
          enqueueSnackbar("There is some Error", { variant: "error" });
          setMessage(`Network Error, Please Try again later`);
        }
      });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <BackButton />
      <h1 className="text-3xl font-bold text-gray-800 my-6 text-center">
        Create Book
      </h1>
      {message && (
        <p className="text-center text-lg font-semibold text-green-600 bg-green-100 p-3 rounded-lg mb-4 max-w-lg mx-auto">
          {message}
        </p>
      )}
      {loading && <Spinner />}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-full max-w-[600px] p-6 mx-auto bg-white shadow-lg">
        <form onSubmit={handleSaveBook}>
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
              value={formData.author} // Fixed typo: was formData.title
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
            className="mt-6 bg-sky-500 text-white font-semibold py-3 px-8 rounded-lg w-1/2 mx-auto hover:bg-sky-600"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBook;
