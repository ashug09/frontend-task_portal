import React, { useState } from "react";
import ProfilePage from "./profile";
import PaymentDetailsPage from "../payment/payment";
import PersonalDetailsPage from "./personal";
import { useRouter } from "next/router";

export default function Main() {
  const router = useRouter();
  const [content, setContent] = useState(<ProfilePage />);
  return (
    <div className="bg-gray-100 rounded-lg p-2">
      <div className="my-5">
        <div className="flex flex-wrap justify-center bg-purple-100 py-2 rounded-lg mx-2">
          <button
            onClick={() => router.push("/profile/myWall")}
            className="text-white text-lg h-12 my-auto bg-purple-500 mx-2 rounded-xl px-8 mb-2 sm:mx-5 sm:mb-0"
          >
            My Wall
          </button>
          <button
            onClick={() => {
              router.push("/profile/personal");
            }}
            className="text-white text-lg h-12 my-auto bg-purple-500 mx-2 rounded-xl px-8 mb-2 sm:mx-5 sm:mb-0"
          >
            Personal
          </button>
          <button
            onClick={() => setContent(<PaymentDetailsPage />)}
            className="text-white text-lg h-12 my-auto bg-purple-500 mx-2 rounded-xl px-8 mb-2 sm:mx-5 sm:mb-0"
          >
            Payments
          </button>
          <button onClick={()=>router.push("/profile/fav")} className="text-white text-lg h-12 my-auto bg-purple-500 mx-2 rounded-xl px-8 mb-2 sm:mx-5 sm:mb-0">
            Favorites
          </button>
          <button className="text-white text-lg h-12 my-auto bg-purple-500 mx-2 rounded-xl px-8 mb-2 sm:mx-5 sm:mb-0">
            Task Status
          </button>
          <button className="text-white text-lg h-12 my-auto bg-purple-500 mx-2 rounded-xl px-8 mb-2 sm:mx-5 sm:mb-0">
            Hidden
          </button>
          <button
            onClick={() => router.push("/profile/profile")}
            className="text-white text-lg h-12 my-auto bg-purple-500 mx-2 rounded-xl px-8 mb-2 sm:mx-5 sm:mb-0"
          >
            Profile
          </button>
        </div>
      </div>
    </div>
  );
}
