"use client"
import Image from "next/image";
import React from "react";
import Navbar from "../Components/Navbar";
import ProductsSection from "../Components/ProductsSection";

const dashboard = () => {
  return (
    <div className="flex flex-col h-screen w-full max-w-screen mx-auto overflow-y-auto">
      {/* Top Section */}
      <div className="bg-customBG h-[40%] bg-cover bg-no-repeat bg-bottom flex-shrink-0">
        <Navbar/>
      </div>

      {/* Bottom Section */}
      <div className="bg-gray-300 h-[60%] flex justify-center items-center relative ">
        <ProductsSection />
      </div>
    </div>
  );
};

export default dashboard;
