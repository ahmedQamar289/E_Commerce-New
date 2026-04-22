"use client"

import { Button } from '@/components/ui/button'
import React, { useContext, useState } from 'react'
import { toast } from 'sonner'
import { useRouter } from "next/navigation";
import { CartContext } from '@/app/context/CartContext'
import getProducts from '@/app/api/products.api'

export default function AddBtn({id}:{id : string}) {
    const { addToCart } = useContext(CartContext);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    async function CheckAddProduct(id: string){
        setIsLoading(true);
        try {
            // التحقق من تسجيل الدخول
            const loggedInUser = localStorage.getItem("loggedInUser");
            if (!loggedInUser) {
                toast.error("❌ Please log in first!", {
                    position: "top-center",
                    duration: 2000
                });
                setTimeout(() => {
                    router.push("/login");
                }, 800);
                return;
            }

            // جلب تفاصيل المنتج
            const products = await getProducts();
            const product = products.find((p) => p.id === id);

            if (product) {
                // إضافة المنتج إلى السلة
                addToCart({
                    id: product.id,
                    title: product.title,
                    imageCover: product.imageCover,
                    price: product.price,
                    ratingsAverage: product.ratingsAverage,
                    category: product.category
                });

                toast.success("✅ Product added to cart successfully!", {
                    position: "top-center",
                    duration: 2000
                });
            } else {
                toast.error("❌ Product not found", {
                    position: "top-center",
                    duration: 2000
                });
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("❌ Failed to add product", {
                position: "top-center",
                duration: 2000
            });
        } finally {
            setIsLoading(false);
        }
    }

    return<>
        <Button 
            onClick={()=> CheckAddProduct(id)} 
            className="w-full cursor-pointer"
            disabled={isLoading}
        >
            {isLoading ? "Adding..." : "Add To Cart"}
        </Button>
    </> 
}