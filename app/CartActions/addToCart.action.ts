"use server";

export default async function AddToCart(id: string) {
  console.log(" Adding product:", id);

  // Simulate cart addition success
  console.log("✅ Product added to cart");

  return {
    status: "success",
    message: "✅ Product added to cart successfully",
    productId: id,
  };
}
