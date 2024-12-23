"use client";
import Navbar from "../Components/Navbar";
import React, { useContext, useEffect, useState } from "react";
import ProductCard from "../Components/ProductCard";
import { jwtDecode } from "jwt-decode";
import { faCirclePlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import ProductContext from "@/context/ProductContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const dashboard = () => {
  const router = useRouter();
  const { setFetchedProducts } = useContext(ProductContext);
  const { fetchedProducts } = useContext(ProductContext);
  const [searchedTerm, setSearchedTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [userId, setUserId] = useState("");
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
      setFilteredProducts(json.products);
    } else if (response.status === 200) {
      setFetchedProducts([]);
      setFilteredProducts([]);
    } else {
      console.log(json.message);
    }
  };
  const removeProduct = () => {
    fetchAllProductsByUserID(userId);
    toast.error("Removed successfully");
  };
  const handleSearchBar = (value) => {
    console.log("search bar clicked");
    setSearchedTerm(value);
    titleGotSearched(value);
  };
  const titleGotSearched = (searchedTerm) => {
    // console.log(searchedTerm);
    if (searchedTerm !== "") {
      const searchedProducts = fetchedProducts.filter((singleProduct) => {
        return singleProduct.productName
          .toLowerCase()
          .includes(searchedTerm.toLowerCase());
      });
      console.log(searchedProducts);
      setFilteredProducts(searchedProducts);
    } else {
      setFilteredProducts(fetchedProducts);
    }
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      const authToken = localStorage.getItem("authStorageToken");
      if (authToken) {
        const storedData = jwtDecode(authToken);
        setUserId(storedData.userId);
        fetchAllProductsByUserID(storedData.userId);
      }
    }
  }, []);
  return (
    <div className="flex flex-col min-h-screen h-auto w-full max-w-screen mx-auto overflow-y-auto">
      <ToastContainer />
      {/* Top Section */}
      <div className="bg-customBG h-[300px] bg-cover bg-no-repeat bg-bottom flex-shrink-0">
        <Navbar />
      </div>

      {/* Bottom Section */}
      <div className="bg-gray-300 min-h-[60%] h-auto flex flex-col justify-center items-center ">
        <div className="bg-white flex rounded-md h-[40px] items-center mr-3">
          <FontAwesomeIcon
            icon={faSearch}
            className="text-black text-xl mr-1 ml-3"
          />
          <input
            type="text"
            className="w-full border-none"
            value={searchedTerm}
            onChange={(e) => handleSearchBar(e.target.value)}
          />
        </div>
        <div
          className={`p-8 bg-transparent w-[90%] rounded-lg  ${
            filteredProducts.length != 0 ? "grid grid-cols-4 gap-8" : "flex "
          } `}
        >
          {filteredProducts && filteredProducts.length != 0 ? (
            filteredProducts?.map((singleProductData, key) => (
              <ProductCard
                singleProductData={singleProductData}
                key={key}
                onDelete={removeProduct}
              />
            ))
          ) : searchedTerm.length !== 0 ? (
            <div className="text-gray-500 w-full h-[400px] flex rounded-md justify-center items-center cursor-default" >No products match the searched string!</div>
          ) : (
            <div
              className="text-gray-500 w-full h-[500px] flex flex-col gap-2 bg-white rounded-md justify-center items-center border-dashed border-gray-600 border-2 hover:scale-105 transition-transform duration-300 ease-in-out cursor-default"
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
