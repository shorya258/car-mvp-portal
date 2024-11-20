"use client";
import { useState } from "react";
import ProductContext from "./ProductContext";
const ProductContextProvider=({children})=>{
const [fetchedProducts, setFetchedProducts]=useState([]);
return(
    <ProductContext.Provider value={{fetchedProducts, setFetchedProducts}}>
        {children}
    </ProductContext.Provider>
)
}
export default ProductContextProvider;