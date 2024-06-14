import React, { useState, useEffect, useRef } from "react";
import GLOBE from "vanta/dist/vanta.globe.min";
import * as THREE from "three";
import LoginPage from "./auth/login";
import RegisterPage from "./auth/register";
import { useRouter } from "next/router";

export default function Landing() {
  const [vantaEffect, setVantaEffect] = useState(0);
  const vantaRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        GLOBE({
          el: vantaRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 700.0,
          minWidth: 600.0,
          scale: 1.0,
          scaleMobile: 1.0,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
    <div ref={vantaRef} className="flex flex-col md:flex-row">
      <div className="md:w-1/2">
        {router.pathname === "/auth/register" ? <RegisterPage /> : <LoginPage />}
      </div>
      <div className="md:w-1/2 my-auto mx-10">
      <div className="mx-auto bg-white my-10 rounded-lg p-10">
        <h1 className="text-2xl text-center">Dummy User Login Details</h1>
        <h1 className=" text-center">Email: sharma@mail.com</h1>
        <h1 className=" text-center">Password: 12345678</h1>
      </div>
      <div className="bg-orange-100 border border-orange-500 text-orange-700 my-10 px-4 py-3 rounded relative">
      <strong className="font-bold">Warning!</strong>
      <span className="block sm:inline">Loading data may take some time (upto 1 min) as our server is hosted on shared hosting.</span>
    </div>
        <h1 className="text-white text-justify text-3xl mb-4">SEOSpaceTrax</h1>
        <h1 className="text-white text-justify text-xl font-medium">
          Welcome to SEOSpaceTrax, your go-to platform for maximizing your SEO
          efforts while earning rewards! At SEOhub, we offer a unique
          opportunity to earn money by completing various tasks designed to
          enhance your website&apos;s search engine optimization. Whether you&apos;re a
          seasoned SEO expert or just starting out, SEOhub provides a range of
          tasks tailored to your skill level and interests.         </h1>
      </div>
    </div>
  );
}
