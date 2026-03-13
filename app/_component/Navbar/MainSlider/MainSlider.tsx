"use client";

import React from "react";
import "swiper/css/bundle";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import img2 from "../../../../public/images/imgi_2_image.webp";
import img3 from "../../../../public/images/imgi_3_image.webp";
import img4 from "../../../../public/images/imgi_4_image.webp";
import img5 from "../../../../public/images/imgi_5_image.webp";
import img6 from "../../../../public/images/imgi_6_image.webp";
import img7 from "../../../../public/images/imgi_7_image.webp";
import img8 from "../../../../public/images/imgi_8_image.webp";
import img9 from "../../../../public/images/imgi_9_image.webp";
import img10 from "../../../../public/images/imgi_10_image.webp";
import Image from "next/image";

export default function MainSlider() {
  return (
    <div className="w-[80%] mx-auto p-4 my-6 flex gap-4">
      <div className="w-full lg:w-3/4">
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          // breakpoints={{
          //   640: { slidesPerView: 3 },
          //   1024: { slidesPerView: 4 },
          //   1280: { slidesPerView: 5 },
          // }}
          modules={[Autoplay]}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          loop
        >
          <SwiperSlide>
            <Image
              src={img2}
              alt="Image 2"
              className="w-full h-[250px] md:h-[320px] lg:h-[400px] object-cover rounded-lg"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src={img5}
              alt="Image 5"
              className="w-full h-[250px] md:h-[320px] lg:h-[400px] object-cover rounded-lg"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src={img6}
              alt="Image 6"
              className="w-full h-[250px] md:h-[320px] lg:h-[400px] object-cover rounded-lg"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src={img7}
              alt="Image 7"
              className="w-full h-[250px] md:h-[320px] lg:h-[400px] object-cover rounded-lg"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src={img8}
              alt="Image 8"
              className="w-full h-[250px] md:h-[320px] lg:h-[400px] object-cover rounded-lg"
            />
          </SwiperSlide>
  
        </Swiper>
      </div>
      <div className="hidden lg:flex lg:w-1/4 flex-col gap-3">
        <Image
          src={img10}
          alt="Image 10"
          className="w-full h-[190px] object-fill rounded-lg"
        />
        <Image
          src={img9}
          alt="Image 9"
          className="w-full h-[190px] object-cover rounded-lg"
        />
      </div>
    </div>
  );
}
