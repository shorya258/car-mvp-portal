"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
const carsForm = () => {
  const searchParams = useSearchParams();
  const [productId, setProductId] = useState(searchParams.get("requestId"));
  const [productDetails, setProductDetails] = useState({
    productName: "",
    productDescription: "",
    tags:[],
    images:[]
  });

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
    console.log("prod details", json);
    setProductDetails(json.singleProduct);
    if (response.status === 201) {
      console.log(json.message);
    } else {
      console.log(json.message);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("changes saved");
  };
  const onChange = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    if (productId) {
      fetchSingleProduct(productId);
    }
  }, []);

  return (
    <div className="flex flex-col p-5 items-center bg-gray-300">
      <form className="bg-white px-10 py-5 shadow-lg rounded-lg shadow-gray-600 min-w-[50%] ">
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-lg font-bold text-gray-900">
              Create a car profile
            </h2>
            <p className="mt-1 text-sm/6 text-gray-600">
              Enter the details of your car
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="productName"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Model Name
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      id="productName"
                      name="productName"
                      type="text"
                      placeholder="Model Name"
                      autoComplete="productName"
                      value={productDetails.productName}
                      onChange={onChange}
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm/6"
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="productDescription"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  About
                </label>
                <div className="mt-2">
                  <textarea
                    id="productDescription"
                    name="productDescription"
                    value={productDetails.productDescription}
                    onChange={onChange}
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                    defaultValue={""}
                  />
                </div>
                <p className="mt-3 text-sm/6 text-gray-600">
                  Write a few sentences about the model.
                </p>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="productName"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Tag Name
                </label>
                
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      id="productName"
                      name="productName"
                      type="text"
                      placeholder="Model Name"
                      autoComplete="productName"
                      value={productDetails.productName}
                      onChange={onChange}
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm/6"
                    />
                  </div>
                </div>
              </div>
              
              <div className="col-span-full">
                <label
                  htmlFor="cover-photo"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Cover photo
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    <div className="mt-4 flex text-sm/6 text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs/5 text-gray-600">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-evenly p-3">
              <button
                onClick={handleSubmit}
                type="submit"
                className="flex w-1/2 mx-2 px-3 py-1.5 justify-center rounded-md border-2 border-solid border-gray-300 hover:border-none text-sm md:text-lg  font-semibold leading-6 shadow-sm hover:bg-indigo-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black hover:-translate-y-1 transition-transform duration-300 ease-in-out "
              >
                Save changes
              </button>
              <button className="flex w-1/2 mx-2 px-3 py-1.5 justify-center rounded-md border-2 border-solid border-gray-300 hover:border-none text-sm md:text-lg font-semibold leading-6 shadow-sm hover:bg-black hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black hover:-translate-y-1 transition-transform duration-300 ease-in-out">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default carsForm;
