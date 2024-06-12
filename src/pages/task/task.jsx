import axios from "axios";
import { Menu } from "primereact/menu";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ScrollPanel } from "primereact/scrollpanel";
import { Button } from "primereact/button";
import { useRouter } from "next/router";
import Search_sort from "./search_sort";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../../features/taskSlice";
import { TbError404 } from "react-icons/tb";
import { FaRepeat } from "react-icons/fa6";
import { IoBookmark } from "react-icons/io5";
import { IoBookmarkOutline } from "react-icons/io5";
import { IoTimer } from "react-icons/io5";
import Loading from "../../../loading";

import loadingGif from "../images/loadingGif.gif"
import Image from "next/image";
export default function Task() {
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState([]);
  const[image, setImage] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 4;
  const router = useRouter();
  const dispatch = useDispatch();

  const taskData = useSelector((state) => state.tasks.tasks);
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BE_URI}/api/v1/task/gettask`)
      .then((response) => {
        console.log(response.data);
        dispatch(addTask(response.data));
        setLoading(false)
      })
      .catch((error) => {
        console.log(error)
        toast.error("Something went wrong. Check Logs", error.message);
      });
  }, []);
  useEffect(() => {
    setItems(taskData[taskData.length - 1]);
  }, [taskData]);
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
  const currentPosts = items?.slice(indexOfFirstPost, indexOfLastPost);

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
  // console.log(sessionStorage.getItem("values"));
  return (
    <>
    {loading ?<>
    <Image className="mx-auto" height={200} width={200} src={loadingGif} />
    <h1 className="text-center">loading tasks....</h1>
      <Loading message={"loading tasks"}/>
    </> : <div className="mx-10">
      {/* categories section  */}
      {/* <div className="lg:w-1/4 ml-10 mt-10 mr-2">
        <h1 className="text-2xl">Categories</h1>
        <Menu model={item} />
      </div> */}
      <h1 className="ml-[15%] mb-5 text-xl font-bold">All the Available Tasks</h1>
      <div className="">
        <Search_sort />
        {/* pagination buttons */}
        <div className=" flex justify-center my-5">
          {Array.from(
            { length: Math?.ceil(items?.length / postsPerPage) },
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
        
        {items?.length > 0 ? (
          <div>
            {/* tasks displaying section/ card */}

            <div className="">
              {currentPosts?.map((item) => (
                <div
                  className="lg:w-[70%] mx-auto my-2 relative bg-gray-100 rounded-lg p-6 shadow-md flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6"
                  key={item?._id}
                >
                  <div className="flex flex-col">
                    <h2 className="text-xl font-bold text-gray-800 capitalize">
                      {item?.title}
                    </h2>
                    <p className="">{item?.taskId}</p>
                    <div className="mt-5 lg:flex">
                      <p
                        className="text-gray-600 m-1 bg-white rounded-lg py-1 px-5 w-max border-2 border-blue-500"
                        title="category of the task"
                      >
                        {item?.selectedCategory}
                      </p>
                      <div
                        className="flex border-2 border-blue-500 rounded-lg mx-1 w-max m-1"
                        title="maximum time for completing the task"
                      >
                        <span className="my-auto">
                          <IoTimer size={32} className="mx-2" />
                        </span>
                        <p className="my-auto mr-2">{item.maxTimeSpan?.name}</p>
                      </div>
                      <div className="flex m-1">
                        <div
                          className="my-auto border-2 border-blue-500 rounded-lg p-1 w-max m-1"
                          title="you can repeat the task after successful completion & evaluation"
                        >
                          {Number.isInteger(parseInt(item?.repeat)) ? (
                            <FaRepeat color="orange" size={28} />
                          ) : null}
                        </div>
                        <div
                          className="my-auto mx-1 border-2 border-blue-500 rounded-lg p-1"
                          title="bookmark this task"
                        >
                          <IoBookmarkOutline color="orange" size={28} />
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          router.push({
                            pathname: `/task/detail`,
                            query: { taskId: item?.taskId },
                          });
                        }}
                        className="border-2 text-white bg-blue-500 border-black px-2 py-1 rounded-lg m-1"
                      >
                        Details
                      </button>
                    </div>
                  </div>
                  <div className="bg-white rounded-l-lg shadow-md py-1 px-5 absolute bottom-1/2 right-0 border-2 border-green-500">
                    ${item?.amount}
                  </div>
                </div>
               
              ))}
            </div>
          </div>
        ) : (
          <div className="my-10 text-center">
            {/* 404 not found message, if no tasks are found  */}
            <TbError404 className="mx-auto" size={100} />
            <h1 className="text-2xl font-bold mx-auto">No tasks found</h1>
          </div>
        )}
      </div>
    </div>}
    
    </>
  );
}
