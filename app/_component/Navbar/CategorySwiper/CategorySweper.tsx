"use client";

import React from "react";
import "swiper/css/bundle";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

type Category = {
  _id: string;
  image: string;
  name: string;
};

type CategorySweperProps = {
  data: Category[];
};

export default function CategorySweper({ data }: CategorySweperProps) {
  return (
    <div className="mx-auto my-6 w-[90%]">
      <Swiper
        spaceBetween={20}
        slidesPerView={7}
        modules={[Autoplay]}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        loop
      >
        {data.map((category: Category) => (
          <SwiperSlide key={category._id}>
            <div className="flex flex-col items-center">
              <div className="h-24 w-24 overflow-hidden rounded-full border border-gray-200 md:h-28 md:w-28 lg:h-32 lg:w-32">
                {category.image ? (
                  <img
                    src={category.image}
                    alt={category.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gray-100 text-gray-400">
                    <span className="text-2xl">📦</span>
                  </div>
                )}
              </div>
              <p className="mt-2 text-center text-xs font-medium md:text-sm">
                {category.name}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
