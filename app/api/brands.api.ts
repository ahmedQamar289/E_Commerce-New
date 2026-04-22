export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  _id: string;
  title: string;
  price: number;
  imageCover: string;
  ratingsAverage: number;
}

export async function getBrand(brandId: string): Promise<Brand | null> {
  // Using categories as brands in DummyJSON
  const res = await fetch(
    `https://dummyjson.com/products/category/${brandId}`,
    {
      method: "GET",
      next: { revalidate: 60 },
    },
  );
  if (!res.ok) {
    const txt = await res.text();
    console.warn(`getBrand request failed ${res.status}: ${txt}`);
    return null;
  }
  const data = await res.json();
  return {
    _id: brandId,
    name: brandId,
    slug: brandId,
    image: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

export async function getProductsByBrand(brandId: string): Promise<Product[]> {
  const res = await fetch(
    `https://dummyjson.com/products/category/${brandId}`,
    {
      method: "GET",
      next: { revalidate: 60 },
    },
  );
  if (!res.ok) {
    const txt = await res.text();
    console.warn(`getProductsByBrand request failed ${res.status}: ${txt}`);
    return [];
  }
  const { products } = await res.json();
  return products.map((p: any) => ({
    _id: p.id.toString(),
    title: p.title,
    price: p.price,
    imageCover: p.thumbnail,
    ratingsAverage: p.rating,
  }));
}

export async function getAllBrands(): Promise<Brand[]> {
  const res = await fetch(`https://dummyjson.com/products/categories`, {
    method: "GET",
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`getAllBrands failed ${res.status}: ${txt}`);
  }
  const categories = await res.json();

  // Handle both array and object responses
  const categoryArray = Array.isArray(categories)
    ? categories
    : Object.values(categories || []);

  return categoryArray.map((cat: any) => {
    const catName =
      typeof cat === "string" ? cat : cat.name || cat.slug || String(cat);
    const displayName =
      typeof catName === "string"
        ? catName.charAt(0).toUpperCase() + catName.slice(1)
        : String(catName);
    return {
      _id: catName,
      name: displayName,
      slug: catName,
      image: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  });
}
