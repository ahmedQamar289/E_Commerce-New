import React from "react";
import getProducts, { type Product } from "@/app/api/products.api";
import SingleProduct from "../SingleProduct/singleProduct";

export default async function AllProducts() {
  const data = await getProducts();

  return (
    <>
      <div className="container mx-auto my-8 w-[90%] gap-2">
        <div className="flex flex-wrap">
          {data.map((currentProduct: Product) => (
            <SingleProduct product={currentProduct} key={currentProduct.id} />
          ))}
        </div>
      </div>
    </>
  );
}
