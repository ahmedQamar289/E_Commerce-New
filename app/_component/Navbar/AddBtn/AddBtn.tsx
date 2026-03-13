"use client"

import AddToCart from '@/app/CartActions/addToCart.action'
import { Button } from '@/components/ui/button'
import React, { useContext } from 'react'
import { toast } from 'sonner'
import { useRouter } from "next/navigation";
import { CartContext } from '@/app/context/CartContext'


export default function AddBtn({id}:{id : string}) {
    const { getUserCart } = useContext(CartContext);
  const router = useRouter();
    async function CheckAddProduct(id:string){
        let res = await AddToCart(id)
        console.log("Full response:", res);
       if (res.status==="success"){
        toast.success("✅ Product Added successful!",
    {position:"top-center",duration:2000});
        await getUserCart();
}
    else{
        console.error("Error response:", res);
        const errorMsg = res.message || res.msg || res.error || "❌ Can't add this Product";
        toast.error(errorMsg,
    { position:"top-center",duration:2000})
             setTimeout(() => {
    router.push("/login");
  },1200);
}
    }


  return<>

    <Button onClick={()=> CheckAddProduct(id)} className="w-full cursor-pointer">Add To Cart</Button>
  
  </> 
}