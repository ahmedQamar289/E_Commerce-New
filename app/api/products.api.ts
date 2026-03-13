export interface Product {
  id: string;
  title: string;
  imageCover: string;
  price: number;
  ratingsAverage: number;
  category: {
    name: string;
  };
}

export default async function getProducts(): Promise<Product[]> {
  const response = await fetch("https://ecommerce.routemisr.com/api/v1/products", {
    method: "GET",
    next: { revalidate: 60 },
  });

  const { data } = await response.json();
  return data as Product[];
}
