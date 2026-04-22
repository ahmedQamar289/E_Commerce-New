"use client"
import React, { useEffect, useState, useContext } from 'react'
import { CartContext } from '../context/CartContext';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface CartProduct {
  id: string;
  title: string;
  imageCover: string;
  price: number;
  count: number;
  category: any;
  ratingsAverage: number;
}

export default function Cart() {
  const { cartItems, removeFromCart, updateCartItem, getTotalPrice, clearCart } = useContext(CartContext);
  const [products, setProducts] = useState<CartProduct[]>(cartItems);
  const [isLoading, setIsLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const router = useRouter();

  useEffect(() => {
    setProducts(cartItems);
    setTotal(getTotalPrice());
    setIsLoading(false);
  }, [cartItems, getTotalPrice]);

  const handleRemoveProduct = (productId: string) => {
    removeFromCart(productId);
    toast.success("✅ Product removed from cart", {
      position: "top-center",
      duration: 2000
    });
  };

  const handleUpdateQuantity = (productId: string, newCount: number) => {
    if (newCount < 1) {
      toast.error("❌ Quantity must be at least 1", {
        position: "top-center",
        duration: 2000
      });
      return;
    }
    updateCartItem(productId, newCount);
    setTotal(getTotalPrice());
  };

  const handleClearCart = () => {
    clearCart();
    toast.success("✅ Cart cleared successfully", {
      position: "top-center",
      duration: 2000
    });
  };

  const handleCheckout = () => {
    if (products.length === 0) {
      toast.error("❌ Your cart is empty", {
        position: "top-center",
        duration: 2000
      });
      return;
    }

    // التحقق من تسجيل الدخول
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (!loggedInUser) {
      toast.error("❌ Please log in first to checkout", {
        position: "top-center",
        duration: 2000
      });
      router.push("/login");
      return;
    }

    // الذهاب إلى صفحة الدفع
    router.push("/checkout/payment");
  };

  if (isLoading) {
    return <div className="h-screen flex justify-center items-center"><span className="loader"></span></div>
  }

  return <>
    {products.length > 0 ? (
      <div className='w-full lg:w-2/3 mx-auto my-12 px-4'>
        <div className='flex justify-between items-center mb-8'>
          <h1 className='text-3xl font-bold text-cyan-900'>Shopping Cart</h1>
          <Button
            onClick={handleClearCart}
            className='bg-red-600 hover:bg-red-700 cursor-pointer'
          >
            Clear Cart
          </Button>
        </div>

        {/* Cart Table */}
        <div className="relative overflow-x-auto bg-white shadow-lg rounded-lg border border-gray-200 mb-8">
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="text-sm bg-cyan-100 border-b border-gray-300">
              <tr>
                <th scope="col" className="px-6 py-3 font-bold">Image</th>
                <th scope="col" className="px-6 py-3 font-bold">Product</th>
                <th scope="col" className="px-6 py-3 font-bold">Price</th>
                <th scope="col" className="px-6 py-3 font-bold">Quantity</th>
                <th scope="col" className="px-6 py-3 font-bold">Total</th>
                <th scope="col" className="px-6 py-3 font-bold">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="bg-white border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <img
                      src={product.imageCover}
                      alt={product.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="px-6 py-4 font-semibold">
                    <Link href={`/products/${product.id}`} className="text-cyan-700 hover:underline">
                      {product.title.substring(0, 50)}...
                    </Link>
                  </td>
                  <td className="px-6 py-4 font-semibold text-green-600">
                    ${product.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleUpdateQuantity(product.id, product.count - 1)}
                        className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        value={product.count}
                        onChange={(e) => handleUpdateQuantity(product.id, parseInt(e.target.value))}
                        className="w-12 text-center border border-gray-300 rounded"
                      />
                      <button
                        onClick={() => handleUpdateQuantity(product.id, product.count + 1)}
                        className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-bold text-gray-900">
                    ${(product.price * product.count).toFixed(2)}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleRemoveProduct(product.id)}
                      className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-sm"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Cart Summary */}
        <div className="bg-cyan-50 border border-cyan-300 rounded-lg p-6 mb-8">
          <div className="flex justify-between mb-4 text-lg">
            <span className="font-semibold">Subtotal:</span>
            <span className="font-bold text-cyan-900">${total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-4 text-lg">
            <span className="font-semibold">Shipping:</span>
            <span className="font-bold text-green-600">Free</span>
          </div>
          <div className="border-t border-cyan-300 pt-4 flex justify-between text-xl">
            <span className="font-bold">Total:</span>
            <span className="font-bold text-2xl text-cyan-900">${total.toFixed(2)}</span>
          </div>
        </div>

        {/* Checkout Button */}
        <Button
          onClick={handleCheckout}
          className='w-full bg-cyan-700 hover:bg-cyan-800 text-white py-3 text-lg font-bold rounded-lg cursor-pointer'
        >
          Proceed to Checkout
        </Button>

        <Link href="/">
          <Button className="w-full mt-4 bg-gray-400 hover:bg-gray-500 text-white">
            Continue Shopping
          </Button>
        </Link>
      </div>
    ) : (
      <div className="h-screen flex flex-col justify-center items-center">
        <h2 className="text-3xl font-bold text-gray-700 mb-4">Your cart is empty</h2>
        <p className="text-gray-500 mb-8">Add some products to get started!</p>
        <Link href="/">
          <Button className="bg-cyan-700 hover:bg-cyan-800 text-white px-8 py-3 text-lg">
            Start Shopping
          </Button>
        </Link>
      </div>
    )}
  </>
}
