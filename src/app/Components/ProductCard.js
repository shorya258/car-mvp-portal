
"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import ConfirmationModal from './ConfirmationModal'

const ProductCard = ({singleProductData}) => {
  const{productName, productDescription}=singleProductData;
  const [openDeleteModal, toggleDeleteModal] = useState(false);
  const handleReject = () => {
    toggleDeleteModal(false)
  }
  const handleApprove = () => {
    toggleDeleteModal(false)
  }
  return (
    <div className="mx-auto rounded overflow-hidden shadow-lg bg-white">
      <Image
        className="w-full"
        src="/background.jpg"
        alt="Sunset in the mountains"
        width={30}
        height={50}
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{productName}</div>
        <div className="text-gray-700 text-sm">{productDescription}</div>
      </div>
      <div className="px-6 pt-4 pb-2">
        {singleProductData.tags.map((tag, index) => {
          return (
            <span key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 cursor-default">
              #{tag.tagName}
            </span>
          );
        })}
      </div>
      <div className="flex justify-evenly p-3">
        <button className="flex w-1/2 mx-2 px-3 py-1.5 justify-center rounded-md border-2 border-solid border-gray-300 hover:border-none text-sm md:text-lg  font-semibold leading-6 shadow-sm hover:bg-green-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black hover:-translate-y-1 transition-transform duration-300 ease-in-out">
          Edit
        </button>
        <button className="flex w-1/2 mx-2 px-3 py-1.5 justify-center rounded-md border-2 border-solid border-gray-300 hover:border-none text-sm md:text-lg font-semibold leading-6 shadow-sm hover:bg-red-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black hover:-translate-y-1 transition-transform duration-300 ease-in-out" 
        onClick={() => toggleDeleteModal(true)}
        >
          Delete
        </button>
      </div>
      {openDeleteModal && <ConfirmationModal handleApprove={handleApprove} handleReject={handleReject}/>}
    </div>
  );
}

export default ProductCard