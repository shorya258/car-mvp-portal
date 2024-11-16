"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import ProductCard from "./ProductCard";
import { jwtDecode } from "jwt-decode";
const ProductsSection = () => {
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
        console.log("stored data",storedData);
        fetchAllProductsByUserID(storedData.userId);
      }
    }
  }, []);
  return (
    <div className="p-8 bg-transparent min-h-full w-[90%] rounded-lg -top-20 grid grid-cols-4 gap-8">
      {
        fetchedProducts.length!==0 &&
        fetchedProducts?.map((singleProductData, key)=>{
          return(<ProductCard singleProductData={singleProductData} key={key}/>)
        })
      }
    </div>
  );
};

export default dynamic(() => Promise.resolve(ProductsSection), { ssr: false });
