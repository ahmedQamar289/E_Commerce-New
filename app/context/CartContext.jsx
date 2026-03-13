"use client";
import { createContext, useState, useEffect } from "react";
import getMyToken from "../utilities/getMyToken";
import getloggedUserCart from "../CartActions/getuseerCart.action";

export const CartContext = createContext();

export function CartContextProvider({ children }) {
  const [token, settoken] = useState("");
  const [numberOfCartItem, setnumberOfCartItem] = useState(0);
  async function getUserCart() {
    try {
      let res = await getloggedUserCart();
      console.log("User Cart:", res);
      if(res.status === "success"){
        let sum = 0;
        res.data.products.forEach((product) => {
          sum += product.count;
        });
        setnumberOfCartItem(sum);
      }
    } catch (error) {
      console.error("Error fetching user cart:", error);
    }
  }

  useEffect(() => {
    getUserCart();
  }, []);
  

  return (
    <CartContext.Provider value={{ numberOfCartItem, setnumberOfCartItem, getUserCart }}>
        {children}
    </CartContext.Provider>
  );
}
