import axios from "axios";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import Main from "./main";

const PersonalDetailsPage = () => {
  useEffect(() => {
    const sessionUser = JSON.parse(sessionStorage.getItem("user"));
    axios
      .post(`${process.env.NEXT_PUBLIC_BE_URI}/api/v1/user/getPersonal`, {
        email: sessionUser.email,
      })
      .then((res) => {
        console.log("then res: " + JSON.stringify(res));
      })
      .catch((err) => {
        toast.error(
          "Something went wrong while getting personal details Check Logs"
        );
        console.log(err);
      });
  });
  const personalDetails = [
    { label: "Gender", value: "Male" },
    { label: "Occupation", value: "Software Engineer" },
    { label: "Marital Status", value: "Single" },
    { label: "Children", value: "0" },
    { label: "Date of Birth", value: "1990-01-01" },
  ];

  return (
    <>
    <Main/>
    <div className="container mx-auto mt-10 px-5">
      <h1 className="text-2xl font-semibold mb-5">Personal Details</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {personalDetails.map((detail, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                {detail.label}
              </label>
              <input
                type="text"
                className="border rounded-md py-2 px-3 w-full bg-gray-100"
                value={detail.value}
                readOnly
              />
            </div>
          </div>
        ))}
      </div>
      <button className="bg-blue-500 hover:bg-blue-700 text-white m-5 font-bold py-2 px-4 rounded">
        Edit
      </button>
    </div>
    </>
  );
};

export default PersonalDetailsPage;
