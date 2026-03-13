export default async function allCategories() {
  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/categories",
    {
      method: "GET",
      next: { revalidate: 60 },
    }
  );

  const { data } = await response.json();
  return data;
}