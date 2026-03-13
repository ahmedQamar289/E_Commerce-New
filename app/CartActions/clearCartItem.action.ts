"use server";
import getMyToken from "../utilities/getMyToken";

export async function ClearCartItem() {
  const token = await getMyToken();
  if (!token) {
    console.log(" No token in ClearCartItem");
    return { status: "fail", message: "❌ Please Login First" };
  }

  console.log(" Clearing cart");
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`, {
    method: "DELETE",
    headers: {
      token: String(token),
      "Content-Type": "application/json",
    },
  });
  console.log("📡 Clear Response status:", res.status);
  let payload = await res.json();
  console.log("📦 Clear Response:", payload);
  return payload;
}
