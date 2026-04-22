"use client";
import { createContext, useState, useEffect } from "react";
import getMyToken from "../utilities/getMyToken";
import getloggedUserCart from "../CartActions/getuseerCart.action";

export const CartContext = createContext();

export function CartContextProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [numberOfCartItem, setnumberOfCartItem] = useState(0);

  // تحميل السلة من localStorage عند بدء التطبيق
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCartItems(parsedCart);
        setnumberOfCartItem(parsedCart.length);
      } catch (error) {
        console.error("Error parsing cart from localStorage:", error);
      }
    }
  }, []);

  // إضافة منتج إلى السلة
  const addToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.count += 1;
      setCartItems([...cartItems]);
    } else {
      setCartItems([...cartItems, { ...product, count: 1 }]);
    }

    // حفظ في localStorage
    const updatedCart = existingItem
      ? cartItems
      : [...cartItems, { ...product, count: 1 }];
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setnumberOfCartItem(updatedCart.length);
  };

  // إزالة منتج من السلة
  const removeFromCart = (productId) => {
    const updatedCart = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setnumberOfCartItem(updatedCart.length);
  };

  // تحديث عدد المنتج
  const updateCartItem = (productId, count) => {
    const item = cartItems.find((item) => item.id === productId);
    if (item) {
      item.count = count;
      setCartItems([...cartItems]);
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  };

  // تفريغ السلة
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cart");
    setnumberOfCartItem(0);
  };

  // حساب الإجمالي
  const getTotalPrice = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.count, 0);
  };

  const getUserCart = async () => {
    try {
      let res = await getloggedUserCart();
      console.log("User Cart:", res);
      if (res.status === "success") {
        let sum = 0;
        if (res.data && res.data.products) {
          res.data.products.forEach((product) => {
            sum += product.count;
          });
        }
        setnumberOfCartItem(sum);
      }
    } catch (error) {
      console.error("Error fetching user cart:", error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        numberOfCartItem,
        setnumberOfCartItem,
        getUserCart,
        addToCart,
        removeFromCart,
        updateCartItem,
        clearCart,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
