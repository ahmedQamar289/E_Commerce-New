import { Button } from "@/components/ui/button";
import React from "react";
import { type SelectedProduct } from "@/app/api/selectedProducts";
import AddBtn from "../AddBtn/AddBtn";

type DetailsProps = {
  data: SelectedProduct;
};

export default function Details({ data }: DetailsProps) {
  return (
    <>
      <div className="container mx-auto flex w-full p-4 lg:w-[65%]">
        <div className="w-1/4">
          <img
            src={data?.imageCover}
            alt={data?.title || "Product"}
            className="h-auto w-full object-contain"
          />
        </div>

        <div className="ml-4 w-3/4">
          <h1 className="mt-4 text-2xl font-bold">{data.title}</h1>
          <p className="mt-2 font-bold text-gray-600">{data?.category?.name}</p>
          <p className="mt-2 text-shadow-cyan-900">{data?.description}</p>
          <div className="m-4 flex w-[70%] items-center justify-between">
            <p className="mt-4 rounded-xl bg-cyan-900 p-1 text-xl font-semibold text-white">
              {data?.price} EGP
            </p>
            <p className="mt-2 text-gray-600">
              {data?.ratingsAverage}{" "}
              <i className="fas fa-star text-yellow-500"></i>
            </p>
          </div>
         <AddBtn id={data.id}/>
        </div>
      </div>
    </>
  );
}
