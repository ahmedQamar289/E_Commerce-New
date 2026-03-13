import getMyToken from "../utilities/getMyToken";

export default async function getloggedUserCart() {
  let token = await getMyToken();
  console.log(" Token in getCart:", token?.substring(0, 20) + "...");

  if (!token) {
    console.log(" No token in getCart");
    return { status: "fail", message: "❌ Please login to see cart!" };
  }

  let res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`, {
    method: "GET",
    headers: {
      token: String(token),
      "Content-type": "application/json",
    },
  });

  console.log(" Cart Response status:", res.status);
  let payload = await res.json();
  console.log(" Cart data:", payload);
  return payload;
}
