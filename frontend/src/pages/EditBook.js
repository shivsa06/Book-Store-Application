import React, { useEffect, useState } from "react";
import BackButton from "../compoents/BackButton";
import Spinner from "../compoents/Spinner";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

const EditBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    let url = `http://localhost:5678/getOneBook/${id}`;
    let reqOptions = {
      method: "GET"
    };
    const fetchData = async () => {
      try {
        setLoading(true);
        let JSONData = await fetch(url, reqOptions);
        let JSOData = await JSONData.json();
        console.log(JSOData);
        if (JSOData.length > 0) {
          const item = JSOData[0];
          setTitle(item.title);
          setAuthor(item.author);
          setPublishYear(item.publishYear);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  let handleEditBook = async () => {
    setLoading(true);
    let dataToSend = new FormData();
    dataToSend.append("id", id);
    dataToSend.append("title", title);
    dataToSend.append("author", author);
    dataToSend.append("publishYear", publishYear);

    let url = `http://localhost:5678/updateBook`;
    let reqOptions = {
      method: "PUT",
      body: dataToSend
    };
    try {
      let JSONData = await fetch(url, reqOptions);
      if (!JSONData.ok) {
        throw new Error("Network response was not ok");
      }
      let JSOData = await JSONData.json();
      console.log(JSOData);
      setLoading(false);
      enqueueSnackbar("Book Updated Successfully", { variant: "success" });
    } catch (error) {
      setLoading(false);
      enqueueSnackbar("Error", { variant: "error" });
      console.log(error);
    }
    navigate("/");
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Edit Book</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2  w-full "
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Publish Year</label>
          <input
            type="number"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2  w-full "
          />
        </div>
        <button className="p-2 bg-sky-300 m-8" onClick={handleEditBook}>
          Save
        </button>
      </div>
    </div>
  );
};

export default EditBook;
