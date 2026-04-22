export async function RemoveItemFromCart(id: string) {
  console.log("Removing product:", id);
  return {
    status: "success",
    message: "✅ Item removed from cart",
  };
}
