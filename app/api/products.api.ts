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
  const response = await fetch("https://dummyjson.com/products?limit=100", {
    method: "GET",
    next: { revalidate: 60 },
  });

  const { products } = await response.json();
  return products.map((p: any) => ({
    id: p.id.toString(),
    title: p.title,
    imageCover: p.thumbnail,
    price: p.price,
    ratingsAverage: p.rating,
    category: {
      name: p.category,
    },
  })) as Product[];
}
