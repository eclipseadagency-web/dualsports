"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import swiper1 from "@/public/swiper1.webp";
import swiper2 from "@/public/swiper2.webp";
import swiper3 from "@/public/swiper3.webp";
import swiper4 from "@/public/swiper4.webp";
import Image from "next/image";
import "@/app/globals.css";
const HeroSection = () => {
  return (
    <section className="container">
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        loop={true}
        modules={[Autoplay, Pagination, Navigation]}
        centeredSlides={true}
        // autoplay={{
        //   delay: 3500,
        //   disableOnInteraction: false,
        // }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        className="mySwiper"
      >
        <SwiperSlide>
          <Image
            src={swiper1}
            fill
            sizes="(min-width: 1480px) 1336px, (min-width: 480px) calc(95.92vw - 64px), (min-width: 440px) calc(200vw - 524px), (min-width: 400px) calc(200vw - 484px), calc(100vw - 64px)"
            alt="swiper image"
            priority
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src={swiper2}
            fill
            sizes="(min-width: 1480px) 1336px, (min-width: 480px) calc(95.92vw - 64px), (min-width: 440px) calc(200vw - 524px), (min-width: 400px) calc(200vw - 484px), calc(100vw - 64px)"
            alt="swiper image"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src={swiper3}
            fill
            sizes="(min-width: 1480px) 1336px, (min-width: 480px) calc(95.92vw - 64px), (min-width: 440px) calc(200vw - 524px), (min-width: 400px) calc(200vw - 484px), calc(100vw - 64px)"
            alt="swiper image"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src={swiper4}
            fill
            sizes="(min-width: 1480px) 1336px, (min-width: 480px) calc(95.92vw - 64px), (min-width: 440px) calc(200vw - 524px), (min-width: 400px) calc(200vw - 484px), calc(100vw - 64px)"
            alt="swiper image"
          />
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default HeroSection;
