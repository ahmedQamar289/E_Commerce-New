
import React from "react";
import Link from "next/link";
import { getAllBrands, Brand } from "@/app/api/brands.api";
import { getBrandDisplay } from "@/app/api/brandsData";

export default async function BrandsIndex() {
  let brands: Brand[] = [];
  try {
    brands = await getAllBrands();
  } catch (err) {
    console.error("Failed to load brands list:", err);
  }

  return <>
    <div className="container mx-auto py-8 my-8 w-[90%] gap-2">
     
       <h1 className="text-3xl font-bold text-center mb-8">Brands & Categories</h1>
      {brands.length === 0 ? (
        <p className="mt-4 text-center">No brands available.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
          {brands.map((b) => {
            const brandInfo = getBrandDisplay(b.slug || b._id);
            return (
              <Link
                key={b._id}
                href={`/brands/${b._id}`}
                className={`${brandInfo.color} border-2 border-gray-200 rounded-lg p-6 text-center hover:shadow-xl transition-all hover:scale-105`}
              >
                <div className="text-5xl mb-3 flex justify-center">{brandInfo.icon}</div>
                <div className="font-bold text-lg text-gray-800">{brandInfo.name}</div>
                <p className="text-sm text-gray-600 mt-2">Click to explore</p>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  </>
}