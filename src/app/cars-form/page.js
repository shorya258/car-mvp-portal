"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import MultiImageUpload from "../Components/ImageUpload";
import { jwtDecode } from "jwt-decode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
const carsForm = () => {
  const searchParams = useSearchParams();
  const [productId, setProductId] = useState(searchParams.get("requestId"));
  const [userId, setUserId] = useState("");
  const [productDetails, setProductDetails] = useState({
    productName: "",
    productDescription: "",
    tags: [],
    images: [],
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
  const createSingleProduct = async () => {
    // console.log("user id", userId, "product details", productDetails)
    const response = await fetch("api/createProduct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        productDetails,
      }),
    });
    const json = await response.json();
    console.log("prod creation", json);
    if (response.status === 201) {
      console.log(json.message);
    } else {
      console.log(json.message);
    }
  };
  const updateSingleProduct = async () => {
    console.log("update api called", productDetails);
    const response = await fetch("api/updateProduct", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productDetails,
      }),
    });
    const json = await response.json();
    console.log("prod updation", json);
    if (response.status === 201) {
      console.log(json.message);
    } else {
      console.log(json.message);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!productId) {
      createSingleProduct();
      console.log("created");
    } else {
      updateSingleProduct();
      console.log("updated");
    }
    console.log("changes saved");
  };
  const onChange = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };
  const [tagInput, setTagInput] = useState("");

  const handleAddTag = (e) => {
    e.preventDefault();
    setProductDetails((prevDetails) => ({
      ...prevDetails,
      tags: [...prevDetails.tags, { tagName: tagInput.trim() }],
    }));
    // console.log(productDetails);
    setTagInput("");
  };
  const handleRemoveTag=(tagToRemove)=>{
    console.log("")
    let tempTags=productDetails.tags;
    tempTags= tempTags.filter((tag)=>(tagToRemove!=tag))
    setProductDetails((prevDetails) => ({
      ...prevDetails,
      tags: tempTags,
    }));
    console.log("tag removed", productDetails)
  }
  useEffect(() => {
    if (typeof window !== "undefined") {
      const authToken = localStorage.getItem("authStorageToken");
      console.log(authToken);
      if (authToken) {
        const storedData = jwtDecode(authToken);
        console.log("stored data", storedData);
        setUserId(storedData.userId)
      }
    }
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
                {productDetails.tags.length > 5 ? (
                  <div>You can only enter 5 tags at max!</div>
                ) : (
                  <>
                    <input
                      type="text"
                      placeholder="Enter tag"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                    />
                    <button onClick={handleAddTag}>Add Tag</button>
                  </>
                )}
                <div className="flex gap-3" >

                {productDetails.tags.length !== 0 &&
                  productDetails.tags.map((singleTag, key) => {
                    return <div key={key} className="rounded-md bg-indigo-600 text-white p-2" >
                      {singleTag.tagName}
                      <FontAwesomeIcon icon={faXmark} className="text-white" onClick={()=>(handleRemoveTag(singleTag.tagName))} />
                      </div>;
                  })}
                </div>
              </div>
              <MultiImageUpload />
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
