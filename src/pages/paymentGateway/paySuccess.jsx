import React, { useEffect, useState } from "react";
import Image from "next/image";
import tick from "../images/tick.gif";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
const PaymentSuccessPage = () => {
  const router = useRouter();
  const [payment_intent, setPaymentIntent] = useState(null);
  useEffect(() => {
    setPaymentIntent(router.query.payment_intent);
    if(payment_intent){
      axios
        .get(`${process.env.NEXT_PUBLIC_BE_URI}/v1/payment_intents/${payment_intent}`)
        .then((res) => {
          console.log(res.data);
  
          res.data.clientSecret
            ? console.log("milgaya client secret code")
            : console.log("nhi milgaya");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [payment_intent, router]);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md">
        <Image
          src={tick}
          width={50}
          height={50}
          className="mx-auto"
          alt="tick gif"
        />
        <h2 className="mt-4 text-2xl font-semibold text-gray-800 text-center">
          Payment Successful
        </h2>
        <p className="mt-2 text-gray-600 text-center">
          Thank you for your purchase!
        </p>
        <div className="mt-6 flex justify-center">
          <Link
            href="/"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium"
          >
            Continue Exploring
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
