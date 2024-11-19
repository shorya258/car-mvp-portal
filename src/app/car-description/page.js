"use client";
import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Carousel from "../Components/Carousel";
const CarsDescription = () => {
  const searchParams = useSearchParams();
  const [productId, setProductId] = useState(searchParams.get("requestId"));
  const [productDetails, setProductDetails] = useState({
    productName: "",
    productDescription: "",
    tags: [],
    images: [],
  });
  console.log(productId);
  const fetchSingleProduct = async (productId) => {
    const response = await fetch("api/fetchSingleProduct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId,
      }),
    });
    const json = await response.json();
    console.log("prod details in car desc page", json);
    setProductDetails(json.singleProduct);
    if (response.status === 201) {
      console.log(json.message);
    } else {
      console.log(json.message);
    }
  };
  useEffect(() => {
    fetchSingleProduct(productId);
  }, []);

  return (
    <div className="min-h-screen flex flex-col mx-auto">
      <div className="h-full flex flex-col flex-grow-[2] bg-blue-950 justify-end">
        <div className=" flex-grow-1 text-center text-6xl text-white font-bold py-10 px-5">
          {productDetails.productName}
        </div>
        <div className="flex-grow-1 p-2 md:p-5">
          <Carousel productImages={productDetails.images} />
        </div>
      </div>
      <div className="flex-grow-[2] bg-white flex flex-col px-4">
        <div className="">
          <span className="border-b-4 border-blue-950 text-3xl mx-4">
            Overview
          </span>
        </div>
        <div className="p-3 text-xl tracking-tight text-gray-500">
          {productDetails.productDescription}
        </div>
        <div className="flex gap-5">
          {productDetails.tags.length !== 0 &&
            productDetails.tags.map((tag, key) => {
              return (
                <div
                  key={key}
                  className="bg-blue-950 text-white rounded-lg px-5 py-2 text-md hover:scale-105 transition-transform duration-300 ease-in-out"
                >
                  {tag.tagName}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CarsDescription />
    </Suspense>
  );
}
