import getMyToken from "../utilities/getMyToken";

export async function RemoveItemFromCart(id: string) {
  const token = await getMyToken();
  if (!token) {
    console.log(" No token in RemoveItemFromCart");
    return { status: "fail", message: "❌ Please Login First" };
  }

  console.log("Removing product:", id);
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
    method: "DELETE",
    headers: {
      token: String(token),
      "Content-Type": "application/json",
    },
  });
  console.log(" Remove Response status:", res.status);
  let payload = await res.json();
  console.log(" Remove Response:", payload);
  return payload;
}
