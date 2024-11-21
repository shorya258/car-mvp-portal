"use client";
import Image from "next/image";
import React, { useState } from "react";
import ConfirmationModal from "./ConfirmationModal";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
const ProductCard = ({ singleProductData, onDelete }) => {
  const router = useRouter();
  const { _id, productName, productDescription, images } = singleProductData;
  const cardImage = images[0].imgUrl;
  const [openDeleteModal, toggleDeleteModal] = useState(false);
  function truncateDescription(description) {
    const limit = 100;
    if (description.length > limit) {
      return description.slice(0, limit);
    }
    return description;
  }
  const handleReject = () => {
    toggleDeleteModal(false);
  };
  const handleApprove = () => {
    handleDeleteProduct();
    toggleDeleteModal(false);
  };
  const navigateToForm = () => {
    router.push(`/cars-form?requestId=${_id}`);
  };
  const navigateToProductDescriptionPage = () => {
    router.push(`/car-description?requestId=${_id}`);
  };
  const handleDeleteProduct = async () => {
    const response = await fetch("api/updateProduct", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: _id,
      }),
    });
    const json = await response.json();
    if (response.status === 201) {
      onDelete(_id);
      // toast.success(json.message);
    } else {
      console.log(json.message);
    }
  };
  return (
    <div className="mx-auto rounded overflow-hidden shadow-lg bg-white cursor-default">
      <div onClick={navigateToProductDescriptionPage}>
        <Image
          className="w-full"
          src={cardImage}
          alt="Sunset in the mountains"
          width={200}
          height={200}
        />
        <div className="px-6 py-4 ">
          <div className="font-bold text-xl mb-2">{productName}</div>
          <div className="text-gray-700 text-sm">
            {truncateDescription(productDescription)}
            <span className="text-gray-900"> ...read more</span>
          </div>
        </div>
        <ul className="px-6 pt-4 pb-2">
          {singleProductData.tags.map((tag, index) => {
            return (
              <li
                key={index}
                className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 cursor-default"
              >
                {tag.tagName}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="flex justify-evenly p-3">
        <button
          className="flex w-1/2 mx-2 px-3 py-1.5 justify-center rounded-md border-2 border-solid border-gray-300 hover:border-none text-sm md:text-lg  font-semibold leading-6 shadow-sm hover:bg-green-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black hover:-translate-y-1 transition-transform duration-300 ease-in-out"
          onClick={navigateToForm}
        >
          Edit
        </button>
        <button
          className="flex w-1/2 mx-2 px-3 py-1.5 justify-center rounded-md border-2 border-solid border-gray-300 hover:border-none text-sm md:text-lg font-semibold leading-6 shadow-sm hover:bg-red-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black hover:-translate-y-1 transition-transform duration-300 ease-in-out"
          onClick={() => toggleDeleteModal(true)}
        >
          Delete
        </button>
      </div>
      {openDeleteModal && (
        <ConfirmationModal
          handleApprove={handleApprove}
          handleReject={handleReject}
        />
      )}
    </div>
  );
};

export default ProductCard;
