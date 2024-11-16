"use client"
import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import ProductCard from './ProductCard'
import { jwtDecode } from 'jwt-decode'
const ProductsSection = () => {
    const[allProducts, setAllProducts]= useState([]);
    const fetchAllProductsByUserID=(userId)=>{

    }
    // useEffect(() => {
    //     if (typeof window !== "undefined") {
    //         const authToken = localStorage.getItem("authStorageToken");
    //         if (authToken) {
    //           const decodedData = jwtDecode(authToken);
    //           console.log(decodedData);
    //         }
    //       }
    //   }, []);
  return (
    <div className='z-10 p-5 absolute bg-transparent min-h-full w-[80%] rounded-lg -top-20 grid grid-cols-4 gap-4' >
        <ProductCard className="row-cols-2" />
        <ProductCard className="row-cols-2" />
        <ProductCard className="row-cols-2" />
        <ProductCard className="row-cols-2" />
        <ProductCard className="row-cols-2" />
        <ProductCard className="row-cols-2" />
    </div>
  )
}

export default dynamic(() => Promise.resolve(ProductsSection), { ssr: false });