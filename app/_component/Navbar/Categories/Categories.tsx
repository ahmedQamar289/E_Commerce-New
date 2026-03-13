import React from "react";
import allCategories from "@/app/api/allCategories";
import CategorySweper from "../CategorySwiper/CategorySweper";

export default async function Categories() {
  const data = await allCategories();

  return <CategorySweper data={data || []} />;
}
 