import React from "react";
import { getBrand, getProductsByBrand, Product as BrandProd } from "@/app/api/brands.api";
import { notFound } from "next/navigation";
import SingelProduct from "@/app/_component/Navbar/SingleProduct/singleProduct";

function toProduct(p: BrandProd) {
  return {
    id: p._id,
    title: p.title,
    imageCover: p.imageCover,
    price: p.price,
    ratingsAverage: p.ratingsAverage,
    category: { name: "" }, 
  };
}

type PageProps = {
  params: { id: string };
};

export default async function BrandPage({ params }: PageProps) {
  const resolvedParams = typeof (params as any)?.then === "function" ? await (params as any) : params;
  const id = resolvedParams?.id;
  if (!id) {
    notFound();
  }

  let brand;
  let products: BrandProd[] = [];
  try {
    brand = await getBrand(id);
    products = await getProductsByBrand(id);
    if (!brand) {
      notFound();
    }
  } catch (err) {
    console.error("Brand page fetch error:", err);
    notFound();
  }

  return (
    <div className="container mx-auto py-8">
      {/* Brand Info */}
      <div className="text-center mb-8">
        <img
          src={brand.image }
          alt={brand.name}
          className="mx-auto h-48 object-contain"
        />
        <h1 className="text-3xl font-bold mt-4">{brand.name}</h1>
      </div>

      {/* Products */}
      <h2 className="text-2xl font-semibold mb-4">Products by {brand.name}</h2>
      {products.length === 0 && (
        <p className="text-center text-gray-500">No products found.</p>
      )}

      <div className="flex flex-wrap -mx-2">
        {products.map((product) => (
          <SingelProduct key={product._id} product={toProduct(product)} />
        ))}
      </div>
    </div>
  );
}