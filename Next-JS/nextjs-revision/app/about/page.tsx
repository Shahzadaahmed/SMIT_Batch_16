// About Screen...!

"use client";

import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const productData = [
  {
    id: 1,
    productName: "Watch",
    des: "Best watch",
    price: 150,
    quantity: 2,
    stock: "available",
    image:
      "https://www.angeljackets.com/product_images/w/608/womens-black-leather-jacket-cafe-racer__25390_thumb.webp",
  },
  {
    id: 2,
    productName: "Shirt",
    des: "Best Shirt",
    price: 250,
    quantity: 3,
    stock: "available",
    image:
      "https://www.angeljackets.com/product_images/g/475/hooded-leather-jacket-brown__02409_thumb.webp",
  },
];

const About = () => {
  const handleCheckout = async () => {
    const apiUrl = "http://localhost:5050/check-out/session";

    try {
      await loadStripe("apni key lao");
      const response = await axios({
        method: "POST",
        url: apiUrl,
        data: {
          items: productData,
        },
      });
      console.log("Payment res FE: ", response);

      const { status, data } = response;

      if (status == 200) {
        window.location.href = data?.data?.checkoutUrl;
      }
    } catch (error) {
      console.log("Err in stripe checkout from FE: ", error);
    }
  };

  return (
    <div>
      <h1> Stripe integration with Next JS and Node JS </h1>
      <button onClick={handleCheckout}> Checkout </button>
    </div>
  );
};

export default About;
