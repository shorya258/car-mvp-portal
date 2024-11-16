import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";

const Carousel = ({productImages}) => {
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
      {console.log(productImages, "productImages")}
      {productImages?.map((img, index) => (
        <SwiperSlide key={index}>
          <img
            src={img.imgUrl}
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