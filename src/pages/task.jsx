import axios from "axios";
import { Menu } from "primereact/menu";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Task() {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 2;

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/v1/task/gettask")
      .then((response) => {
        console.log(response.data);
        setItems(response.data);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something went wrong. Check Logs");
      });
  }, []);

  const truncateDescription = (description) => {
    const words = description?.split(" ");
    if (words?.length > 50) {
      return words.slice(0, 40).join(" ") + "...";
    }
    return description;
  };

  // Calculate indexes of the first and last post to display on the current page
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = items.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const item = [
    {
      label: "Surfing",
    },
    {
      label: "Youtube",
    },
    {
      label: "Facebook",
    },
    {
      label: "TikTok",
    },
  ];

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="lg:w-1/4 ml-10 mt-10 mr-2">
        <h1 className="text-2xl">Categories</h1>
        <Menu model={item} />
      </div>
      <div className="lg:w-3/4">
        <div className=" flex justify-center my-5">
          {Array.from(
            { length: Math.ceil(items.length / postsPerPage) },
            (_, i) => (
              <button
                key={i}
                onClick={() => paginate(i + 1)}
                className={`mx-1 px-4 py-2 rounded-md ${
                  i + 1 === currentPage
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {i + 1}
              </button>
            )
          )}
        </div>
        <div className="lg:grid lg:grid-cols-3 justify-center gap-4">
          {currentPosts.map((item) => (
            <div
              className="max-w-sm rounded overflow-hidden shadow-lg bg-white mx-2 my-4"
              key={item._id}
            >
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2 capitalize">
                  {item.title}
                </div>
                <p className="text-gray-700 text-base">
                  {truncateDescription(item.description)}
                </p>
              </div>
              <div className="px-6 py-4">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  More Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
