"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/thumbs";

import Image from "next/image";

const ProductSlider = ({ allProductImages }) => {
  return (
    <>
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        spaceBetween={10}
        pagination={true}
        modules={[FreeMode, Pagination, Thumbs]}
        className="mySwiper2 mb-10"
      >
        {allProductImages?.map((image) => (
          <SwiperSlide key={image.id}>
            <div>
              <Image
                src={image.url}
                width={600}
                height={600}
                alt="product image"
                className="rounded-3xl"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="grid grid-cols-2 gap-5">
        {allProductImages.map((slider) => (
          <div key={slider.id}>
            <Image
              src={slider.url}
              width={600}
              height={600}
              alt="product image"
              className="rounded-3xl"
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductSlider;
