export default async function allCategories() {
  const response = await fetch("https://dummyjson.com/products/categories", {
    method: "GET",
    next: { revalidate: 60 },
  });

  const categories = await response.json();

  // Handle both array and object responses
  const categoryArray = Array.isArray(categories)
    ? categories
    : Object.values(categories || []);

  return categoryArray.map((cat: any, index: number) => {
    const catName =
      typeof cat === "string" ? cat : cat.name || cat.slug || String(cat);
    const images = [
      "/images/imgi_2_image.webp",
      "/images/imgi_3_image.webp",
      "/images/imgi_4_image.webp",
      "/images/imgi_5_image.webp",
      "/images/imgi_6_image.webp",
      "/images/imgi_7_image.webp",
      "/images/imgi_8_image.webp",
      "/images/imgi_9_image.webp",
      "/images/imgi_10_image.webp",
    ];
    return {
      _id: catName,
      name:
        typeof catName === "string"
          ? catName.charAt(0).toUpperCase() + catName.slice(1)
          : String(catName),
      slug: catName,
      image: images[index % images.length],
    };
  });
}
