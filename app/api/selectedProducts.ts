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

export default async function selectedProducts(id: string): Promise<SelectedProduct> {
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products/${id}`,
    {
      method: "GET",
      next: { revalidate: 60 },
    }
  );

  const { data } = await response.json();
  return data as SelectedProduct;
}
