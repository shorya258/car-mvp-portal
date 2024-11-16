import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
const images = [
  "https://firebasestorage.googleapis.com/v0/b/ecom-platform-72d4b.appspot.com/o/images%2FRectangle%206672.png?alt=media&token=97076d91-de90-4abf-9f9a-c474513ede8f",
  "https://firebasestorage.googleapis.com/v0/b/ecom-platform-72d4b.appspot.com/o/images%2FRectangle%206672.png?alt=media&token=97076d91-de90-4abf-9f9a-c474513ede8f",
  "https://firebasestorage.googleapis.com/v0/b/ecom-platform-72d4b.appspot.com/o/images%2FRectangle%206672.png?alt=media&token=97076d91-de90-4abf-9f9a-c474513ede8f",
  "https://firebasestorage.googleapis.com/v0/b/ecom-platform-72d4b.appspot.com/o/images%2FRectangle%206672.png?alt=media&token=97076d91-de90-4abf-9f9a-c474513ede8f",
  "https://firebasestorage.googleapis.com/v0/b/ecom-platform-72d4b.appspot.com/o/images%2FRectangle%206672.png?alt=media&token=97076d91-de90-4abf-9f9a-c474513ede8f",
];
const Carousel = () => {
  return (
    <div className="w-full max-w-4xl mx-auto">
    <Swiper
      modules={[Autoplay, Pagination]}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      loop={true}
      spaceBetween={20}
      slidesPerView={1}
      breakpoints={{
        640: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }}
    >
      {images.map((url, index) => (
        <SwiperSlide key={index}>
          <img
            src={url}
            alt={`Slide ${index + 1}`}
            className="w-full h-auto rounded-lg"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
  )
}

export default Carousel