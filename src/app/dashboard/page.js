"use client";
import Navbar from "../Components/Navbar";
import React, { useContext, useEffect, useState } from "react";
import ProductCard from "../Components/ProductCard";
import { jwtDecode } from "jwt-decode";
import { faCirclePlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import ProductContext from "@/context/ProductContext";
const dashboard = () => {
  const router = useRouter();
  const { setFetchedProducts } = useContext(ProductContext);
  const { fetchedProducts } = useContext(ProductContext);
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
    if (response.status === 201) {
      setFetchedProducts(json.products);
      setFetchedProducts(json.products);
    } else {
      console.log(json.message);
    }
  };
  const removeProduct = (productId) => {
    setFetchedProducts((prevProducts) =>
      prevProducts.filter((product) => product._id !== productId)
    );
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const authToken = localStorage.getItem("authStorageToken");
      if (authToken) {
        const storedData = jwtDecode(authToken);
        fetchAllProductsByUserID(storedData.userId);
      }
    }
  }, [fetchedProducts]);
  return (
    <div className="flex flex-col h-screen w-full max-w-screen mx-auto overflow-y-auto">
      {/* Top Section */}
      <div className="bg-customBG h-[40%] bg-cover bg-no-repeat bg-bottom flex-shrink-0">
        <Navbar />
      </div>

      {/* Bottom Section */}
      <div className="bg-gray-300 min-h-[60%] h-auto flex flex-col justify-center items-center ">
        <div
          className={`p-8 bg-transparent min-h-full w-[90%] rounded-lg  ${
            fetchedProducts.length != 0 ? "grid grid-cols-4 gap-8" : "flex "
          } `}
        >
          {fetchedProducts && fetchedProducts.length != 0 ? (
            fetchedProducts?.map((singleProductData, key) => (
              <ProductCard
                singleProductData={singleProductData}
                key={key}
                onDelete={removeProduct}
              />
            ))
          ) : (
            <div
              className="text-gray-500 w-full flex flex-col gap-2 bg-white rounded-md justify-center items-center border-dashed border-gray-600 border-2 hover:scale-105 transition-transform duration-300 ease-in-out cursor-default"
              onClick={() => router.push(`/cars-form`)}
            >
              <FontAwesomeIcon icon={faCirclePlus} className="text-3xl" />
              <span className="text-xl font-medium tracking-wider">
                Click to add a car.
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default dashboard;
