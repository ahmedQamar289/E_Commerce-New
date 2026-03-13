"use server";
import getMyToken from "../utilities/getMyToken";

export default async function AddToCart(id: string) {
  console.log(" Adding product:", id);
  const token = await getMyToken();

  if (!token) {
    console.log(" No token found");
    return { status: "fail", message: "❌ Please log in first" };
  }

  console.log("✅ Token found");

  let res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`, {
    method: "POST",
    headers: {
      token: String(token),
      "Content-type": "application/json",
    },
    body: JSON.stringify({ productId: id }),
  });

  console.log(" Response status:", res.status);
  let payload = await res.json();
  console.log(" API Response:", payload);
  return payload;
}
