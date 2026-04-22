export interface SelectedProduct {
  id: string;
  title: string;
  imageCover: string;
  category: {
    name: string;
  };
  description: string;
  price: number;
  ratingsAverage: number;
}

export default async function selectedProducts(
  id: string,
): Promise<SelectedProduct> {
  const response = await fetch(`https://dummyjson.com/products/${id}`, {
    method: "GET",
    next: { revalidate: 60 },
  });

  const product = await response.json();

  // Handle API errors
  if (!product || product.id === undefined) {
    throw new Error(`Product not found: ${id}`);
  }

  return {
    id: product.id.toString(),
    title: product.title || "Unknown",
    imageCover: product.thumbnail || product.image || "",
    category: {
      name: product.category || "Uncategorized",
    },
    description: product.description || "",
    price: product.price || 0,
    ratingsAverage: product.rating || 0,
  } as SelectedProduct;
}
