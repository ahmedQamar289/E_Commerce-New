"use server";
import getMyToken from "../utilities/getMyToken";

export async function UpdateCart(id: string, count: string) {
  const token = await getMyToken();
  if (!token) {
    console.log(" No token in UpdateCart");
    return { status: "fail", message: "❌ Please Login First" };
  }

  console.log(" Updating product:", id, "Count:", count);
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
    method: "PUT",
    headers: {
      token: String(token),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ count }),
  });
  console.log(" Update Response status:", res.status);
  let payload = await res.json();
  console.log(" Update Response:", payload);
  return payload;
}

/**//* */
// "use server";
// import getMyToken from "../utilities/getMyToken";

// export async function UpdateCart(id: string, count: string) {
//   const token = await getMyToken();
//   if (!token) {
//     console.log(" No token in UpdateCart");
//     return { status: "fail", message: "❌ Please Login First" };
//   }

//   // Convert count to integer
//   const countNum = parseInt(count, 10);
//   if (isNaN(countNum) || countNum < 1) {
//     console.log(" Invalid count:", count);
//     return { status: "fail", message: "❌ Invalid quantity" };
//   }

//   console.log(" Updating product:", id, "Count:", countNum);
//   try {
//     const res = await fetch(
//       `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
//       {
//         method: "PUT",
//         headers: {
//           token: String(token),
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ count: countNum }),
//       },
//     );

//     console.log(" Update Response status:", res.status);

//     if (!res.ok) {
//       const errorPayload = await res.json();
//       console.error(" API Error:", errorPayload);
//       return {
//         status: "fail",
//         message: errorPayload.message || "❌ Failed to update cart",
//       };
//     }

//     const payload = await res.json();
//     console.log(" Update Response:", payload);
//     return payload;
//   } catch (error) {
//     console.error(" Fetch error:", error);
//     return { status: "fail", message: "❌ Network error" };
//   }
// }
