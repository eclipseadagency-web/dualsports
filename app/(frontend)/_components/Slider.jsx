"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import slider1 from "@/public/slider1.webp";
import slider2 from "@/public/slider2.webp";
import slider3 from "@/public/slider3.webp";
import slider4 from "@/public/slider4.webp";
import Image from "next/image";

const Slider = () => {
  return (
    <section className="my-20">
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        loop={true}
        modules={[Autoplay, Pagination, Navigation]}
        centeredSlides={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        className="mySwiper"
      >
        <SwiperSlide>
          <Image
            src={slider1}
            width={"full"}
            height={"full"}
            alt="swiper image"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src={slider2}
            width={"full"}
            height={"full"}
            alt="swiper image"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src={slider3}
            width={"full"}
            height={"full"}
            alt="swiper image"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src={slider4}
            width={"full"}
            height={"full"}
            alt="swiper image"
          />
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default Slider;
