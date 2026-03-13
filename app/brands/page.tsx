
import React from "react";
import Link from "next/link";
import { getAllBrands, Brand } from "@/app/api/brands.api";

export default async function BrandsIndex() {
  let brands: Brand[] = [];
  try {
    brands = await getAllBrands();
  } catch (err) {
    console.error("Failed to load brands list:", err);
  }

  return <>
    <div className="container mx-auto py-8 my-8 w-[90%] gap-2">
     
       <h1 className="text-3xl font-bold text-center">Brands</h1>
      {brands.length === 0 ? (
        <p className="mt-4 text-center">No brands available.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
          {brands.map((b) => (
            <Link
              key={b._id}
              href={`/brands/${b._id}`}
              className="border rounded-lg p-4 text-center hover:shadow-lg"
            >
              <img
                src={b.image}
                alt={b.name}
                className="mx-auto h-24 object-contain mb-2"
              />
              <div className="font-semibold">{b.name}</div>
            </Link>
          ))}
        </div>
      )}
    </div>
  </>
}