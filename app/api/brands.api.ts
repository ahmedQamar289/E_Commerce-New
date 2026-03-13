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
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/brands/${brandId}`,
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
  const { data } = await res.json();
  return data;
}

export async function getProductsByBrand(brandId: string): Promise<Product[]> {
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products?brand=${brandId}`,
    { method: "GET", next: { revalidate: 60 } },
  );
  if (!res.ok) {
    const txt = await res.text();
    console.warn(`getProductsByBrand request failed ${res.status}: ${txt}`);
    return [];
  }
  const { data } = await res.json();
  return data;
}

export async function getAllBrands(): Promise<Brand[]> {
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/brands`, {
    method: "GET",
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`getAllBrands failed ${res.status}: ${txt}`);
  }
  const { data } = await res.json();
  return data;
}
