import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { type Product } from "@/app/api/products.api";
import AddBtn from "../AddBtn/AddBtn";

type SingleProductProps = {
  product: Product;
};

export default function SingelProduct({ product }: SingleProductProps) {
  return (
    <>
      <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/5" key={product.id}>
        <div className="prod h-full p-4">
          <Card className="flex h-full flex-col">
            <CardHeader>
              <CardTitle className="cursor-pointer">
                <Link href={`/products/${product.id}`}>
                  <img
                    src={product.imageCover}
                    alt={product.title}
                    className="h-56 w-full rounded-md object-cover"
                  />
                </Link>
              </CardTitle>
              <CardDescription>{product.category.name}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 font-bold">
              <p className="line-clamp-2">{product.title}</p>
            </CardContent>
            <CardFooter className="mt-auto flex flex-col gap-3">
              <div className="flex w-full justify-between">
                <span className="rounded-xl bg-cyan-700 px-2 py-1 text-white">
                  {product.price} EGP
                </span>
                <span>
                  {product.ratingsAverage}{" "}
                  <i className="fas fa-star text-yellow-500"></i>
                </span>
              </div>
              <AddBtn id= {product.id}/>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
}
