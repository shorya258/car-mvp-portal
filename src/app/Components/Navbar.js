"use client";
import React from "react";
import { useRouter } from "next/navigation";
const Navbar = () => {
  const router = useRouter();
  const customClass =
    "p-1 rounded-lg hover:text-black hover:scale-105 transition-transform duration-300 ease-in-out cursor-default  ";
  const navigateToForm = () => {
    router.push(`/cars-form`);
  };
  return (
    <div className="flex flex-row justify-between items-center  text-gray-200 text-2xl font-extrabold mx-auto py-4 px-28 bg-black bg-opacity-50">
      <div className={`${customClass}text-4xl text-white`}>CarsFlow</div>
      <div className="flex justify-center gap-5">
        <div
          className={`${customClass} hover:text-white`}
          onClick={navigateToForm}
        >
          + Add
        </div>
        <div className={`${customClass} hover:text-white`}>Buy</div>
        <div className={`${customClass} hover:text-white`}>Rent</div>
        <div className={`${customClass} hover:text-white`}>Sell</div>
      </div>
    </div>
  );
};

export default Navbar;
