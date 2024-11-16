"use client"
import React from 'react'

const Navbar = () => {
    const customClass='p-1 rounded-lg hover:text-black hover:scale-105 transition-transform duration-300 ease-in-out cursor-default  '
  return (
    <div className='flex flex-row justify-between items-center p-4 text-gray-200 text-2xl font-extrabold '>
        <div className={`${customClass}text-4xl text-white`} >CarsFlow</div>
        <div className='flex justify-center gap-5'>
        <div className={`${customClass} hover:text-white`}>+ Add</div>
        <div className={`${customClass} hover:text-white`}>Buy</div>
        <div className={`${customClass} hover:text-white`}>Rent</div>
        <div className={`${customClass} hover:text-white`}>Sell</div>
        </div>
    </div>
  )
}

export default Navbar