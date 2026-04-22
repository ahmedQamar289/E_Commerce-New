"use server";

export async function ClearCartItem() {
  console.log(" Clearing cart");
  return {
    status: "success",
    message: "✅ Cart cleared successfully",
  };
}
