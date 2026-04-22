"use server";

export default async function getloggedUserCart() {
  // Return empty cart structure for compatibility
  return {
    status: "success",
    data: {
      _id: "localCart",
      cartOwner: "user",
      products: [],
      totalCartPrice: 0,
      __v: 0,
    },
  };
}
