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

  return categoryArray.map((cat: any) => {
    const catName =
      typeof cat === "string" ? cat : cat.name || cat.slug || String(cat);
    return {
      _id: catName,
      name:
        typeof catName === "string"
          ? catName.charAt(0).toUpperCase() + catName.slice(1)
          : String(catName),
      slug: catName,
      image: "",
    };
  });
}
