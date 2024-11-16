"use client";
import Navbar from "../Components/Navbar";
import React, { useEffect, useState } from "react";
import ProductCard from "../Components/ProductCard";
import { jwtDecode } from "jwt-decode";
import { faCarSide } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const dashboard = () => {
  const [fetchedProducts, setFetchedProducts] = useState([]);
  const fetchAllProductsByUserID = async (userId) => {
    const response = await fetch("api/fetchAllProductsForUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
      }),
    });
    const json = await response.json();
    setFetchedProducts(json.products);
    if (response.status === 201) {
      console.log(json.message);
    } else {
      console.log(json.message);
    }
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      const authToken = localStorage.getItem("authStorageToken");
      console.log(authToken);
      if (authToken) {
        const storedData = jwtDecode(authToken);
        console.log("stored data", storedData);
        fetchAllProductsByUserID(storedData.userId);
      }
    }
  }, []);
  return (
    <div className="flex flex-col h-screen w-full max-w-screen mx-auto overflow-y-auto">
      {/* Top Section */}
      <div className="bg-customBG h-[40%] bg-cover bg-no-repeat bg-bottom flex-shrink-0">
        <Navbar />
      </div>

      {/* Bottom Section */}
      <div className="bg-gray-300 min-h-[60%] h-auto flex justify-center items-center ">
        <div className={`p-8 bg-transparent min-h-full w-[90%] rounded-lg grid grid-cols-4 gap-8`}>
          {fetchedProducts && fetchedProducts?.map((singleProductData, key) => (
            <ProductCard singleProductData={singleProductData} key={key} />
          ))}
        </div>
      </div>
          {!fetchedProducts && <div className='text-gray-500  w-full '>
            <FontAwesomeIcon icon={faCarSide} className="text-7xl" />
            <span className="text-6xl font-extrabold tracking-wider" >SHOOT! YOU HAVE NOT ADDED ANY CARS YET!</span>
          </div>
            }
    </div>
  );
};

export default dashboard;
