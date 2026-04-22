"use client"
import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../context/CartContext';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { onlinePayment } from '../../checkout.action/onlineCheckOut.action';

interface CheckoutFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

interface Product {
  id: number;
  title: string;
  price: number;
  count: number;
}

export default function CheckoutPage() {
  const { cartItems, getTotalPrice, clearCart } = useContext(CartContext);
  const [isLoading, setIsLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const router = useRouter();
  const [formData, setFormData] = useState<CheckoutFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  useEffect(() => {
    // التحقق من تسجيل الدخول
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (!loggedInUser) {
      toast.error("❌ Please log in first", {
        position: "top-center",
        duration: 2000
      });
      router.push("/login");
      return;
    }

    // التحقق من أن السلة ليست فارغة
    if (cartItems.length === 0) {
      toast.error("❌ Your cart is empty", {
        position: "top-center",
        duration: 2000
      });
      router.push("/cart");
      return;
    }

    setTotal(getTotalPrice());
    setFormData(prev => ({
      ...prev,
      email: loggedInUser
    }));
  }, [cartItems, getTotalPrice, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // التحقق من صحة البيانات
    if (!formData.firstName || !formData.lastName || !formData.address || 
        !formData.city || !formData.zipCode || !formData.cardNumber || 
        !formData.expiryDate || !formData.cvv) {
      toast.error("❌ Please fill all fields", {
        position: "top-center",
        duration: 2000
      });
      return;
    }

    // التحقق من رقم البطاقة
    if (formData.cardNumber.length !== 16) {
      toast.error("❌ Card number must be 16 digits", {
        position: "top-center",
        duration: 2000
      });
      return;
    }

    // التحقق من CVV
    if (formData.cvv.length !== 3) {
      toast.error("❌ CVV must be 3 digits", {
        position: "top-center",
        duration: 2000
      });
      return;
    }

    setIsLoading(true);

    try {
      // معالجة الدفع (محاكاة)
      await new Promise(resolve => setTimeout(resolve, 2000));

      // استدعاء دالة الدفع
      const result = await onlinePayment(
        "cart_" + Date.now(),
        window.location.href,
        formData as any
      );

      if (result?.status === "success") {
        toast.success("✅ Payment successful!", {
          position: "top-center",
          duration: 3000
        });

        // تفريغ السلة
        clearCart();

        // إظهار رسالة الشكر
        setTimeout(() => {
          router.push("/");
        }, 2000);
      } else {
        toast.error("❌ Payment failed. Please try again.", {
          position: "top-center",
          duration: 2000
        });
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("❌ An error occurred during checkout", {
        position: "top-center",
        duration: 2000
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="h-screen flex flex-col justify-center items-center">
        <h2 className="text-3xl font-bold text-gray-700 mb-4">Your cart is empty</h2>
        <Link href="/cart">
          <Button className="bg-cyan-700 hover:bg-cyan-800 text-white px-8 py-3">
            Back to Cart
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-cyan-900 mb-8 text-center">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-8">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Shipping Information</h2>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-cyan-500"
                    required
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-cyan-500"
                    required
                  />
                </div>

                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  readOnly
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 mb-4"
                />

                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-cyan-500 mb-4"
                  required
                />

                <input
                  type="text"
                  name="address"
                  placeholder="Street Address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-cyan-500 mb-4"
                  required
                />

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-cyan-500"
                    required
                  />
                  <input
                    type="text"
                    name="zipCode"
                    placeholder="ZIP Code"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-cyan-500"
                    required
                  />
                </div>
              </div>

              <div className="border-t pt-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Payment Information</h2>
                
                <input
                  type="text"
                  name="cardNumber"
                  placeholder="Card Number (16 digits)"
                  maxLength={16}
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-cyan-500 mb-4"
                  required
                />

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    name="expiryDate"
                    placeholder="MM/YY"
                    maxLength={5}
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-cyan-500"
                    required
                  />
                  <input
                    type="text"
                    name="cvv"
                    placeholder="CVV (3 digits)"
                    maxLength={3}
                    value={formData.cvv}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-cyan-500"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full mt-6 bg-cyan-700 hover:bg-cyan-800 text-white py-3 text-lg font-bold rounded-lg cursor-pointer"
              >
                {isLoading ? "Processing..." : "Complete Payment"}
              </Button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-white shadow-lg rounded-lg p-8 h-fit sticky top-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              {cartItems.map((item: Product) => (
                <div key={item.id} className="flex justify-between items-center pb-4 border-b">
                  <div>
                    <p className="font-semibold text-gray-800">{item.title.substring(0, 30)}...</p>
                    <p className="text-sm text-gray-500">Qty: {item.count}</p>
                  </div>
                  <p className="font-bold text-gray-900">${(item.price * item.count).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-semibold">${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-4">
                <span className="text-gray-600">Shipping:</span>
                <span className="font-semibold text-green-600">Free</span>
              </div>
              <div className="border-t pt-4 flex justify-between">
                <span className="text-lg font-bold">Total:</span>
                <span className="text-2xl font-bold text-cyan-900">${total.toFixed(2)}</span>
              </div>
            </div>

            <Link href="/cart" className="block mt-4">
              <Button className="w-full bg-gray-400 hover:bg-gray-500 text-white">
                Back to Cart
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
