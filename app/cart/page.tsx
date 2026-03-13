"use client"
import Link from "next/link";
import React, { useEffect, useState, useContext } from 'react'
import { authOptions } from '@/app/auth';
import getMyToken from '../utilities/getMyToken';
import getloggedUserCart from '../CartActions/getuseerCart.action';
import { Product } from './../api/products.api';
import { RemoveFormattingIcon } from 'lucide-react';
import error from './../products/error';
import { RemoveItemFromCart } from '../CartActions/removeCatrItem.action';
import { toast } from 'sonner';
import { UpdateCart } from '../CartActions/updateCart.action';
import { Button } from '@/components/ui/button';
import { ClearCartItem } from '../CartActions/clearCartItem.action';
import { CartContext } from '../context/CartContext';

// Define types for cart items returned by the API
interface CartItem {
  _id: string;
  count: number;
  price: number;
  product: {
    id: string;
    title: string;
    imageCover: string;
  };
}

interface CartResponse {
  status: string;
  data?: {
    products: CartItem[];
    totalCartPrice?: number;
    cartId?: string;
    _id?: string;
  };
  message?: string;
}

export default function Cart() {
const [products , setProducts] = useState<CartItem[]>([])
const [isLoading , setIsLoading] = useState<boolean>(true)
const [removeDiseble , setremoveDiseble] = useState<boolean>(false)
const [updateDiseble , setUpdateDiseble] = useState<boolean>(false)
const [lodaingUpdate , setLodaingUpdate] = useState<boolean>(false)
const [curentId , setCurentId] = useState<string>("")
const [clearLoading, setClearLoading] = useState<boolean>(false);
const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
const [deleteId, setDeleteId] = useState<string>("");
const { getUserCart: refetchCartCount } = useContext(CartContext);
const [total, setTotal] = useState<number>(0);
const [cartId, setCartId] = useState<string>("");

 async function getuseerCart(){
try{
  const res: CartResponse = await getloggedUserCart();
  console.log("Cart response data:", res.data);
  if(res.status === "success" && res.data?.products){
    const id = res.data._id || res.data.cartId || "";
    console.log("Cart ID:", id);
    setTotal(res.data.totalCartPrice || 0);
    setProducts(res.data.products);
    setCartId(id);
    setIsLoading(false);

  }
  
  }
  catch(err){
    console.log(err);
    setIsLoading(false);

  }
}
async function deletProduyct (id:string) {
  setremoveDiseble(true)
        setDeleteLoading(true)
              setDeleteId(id)
  const res: CartResponse = await RemoveItemFromCart(id);
if(res.status === "success" && res.data?.products){
    setProducts(res.data.products);
  toast.success("✅ Product Deleted successfully",
    {position:"top-center",duration:2000})
    getuseerCart()    
    setremoveDiseble(false)
    setDeleteLoading(false)
    await refetchCartCount();

  }else{
     toast.error("❌ Can't detet this Product Now",
    {position:"top-center",duration:2000})  
    setremoveDiseble(false)
          setDeleteLoading(false)


  }

}
async function updateProduct (id:string,count:string) {
      if (parseInt(count) < 1) {
        toast.error("❌ Quantity must be at least 1", {position:"top-center", duration:2000})
        return;
      }
      setUpdateDiseble(true)
      setCurentId(id)
      setLodaingUpdate(true)
  const res: CartResponse = await UpdateCart(id, count);
if(res.status === "success" && res.data?.products){
    setProducts(res.data.products)
  toast.success("✅ Quantity updated successfully",
    {position:"top-center",duration:2000})
        getuseerCart()    
    setUpdateDiseble(false)
        setLodaingUpdate(false)
        await refetchCartCount();
            getloggedUserCart()    

  }else{
     toast.error("❌ Can't Update this Product Now",
    {position:"top-center",duration:2000})  
        setUpdateDiseble(false)
        setLodaingUpdate(false)
  }
      getloggedUserCart()    

}
async function clear() {
  setClearLoading(true)
  const res: { message: string } = await ClearCartItem();
  if(res.message === "success"){
    toast.success("✅ Cart cleared successfully",
    {position:"top-center",duration:2000})
    setProducts([])
      setClearLoading(false)
              await refetchCartCount();


  }
}

useEffect(()=>{
  getuseerCart()
},[])

if(isLoading){
  return <div className="h-screen flex justify-center items-center"><span className="loader"></span></div>
  
 }

  return <>
  
{products.length > 0 ?(
<div className=' w-2/3 mx-auto my-12'>
<div className=' flex justify-end'>
<Button
onClick={()=>clear()}
className=' bg-red-800 hover:bg-red-600 cursor-pointer my-4'>
  {clearLoading? ( 
 <i className="fas fa-spinner fa-spin"></i>
 ):(
  'Clear Cart Item')
  }
</Button>
</div>
  <h3 className=' text-cyan-800 text-lg font-bold py-5 text-4xl'>Total Cart Price : {total}</h3>
  <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
  <table className="w-full text-sm text-left rtl:text-right text-body">
    <thead className="text-sm text-body bg-neutral-secondary-medium border-b border-default-medium">
      <tr>
        <th scope="col" className="px-16 py-3">
          <span>Image</span>
        </th>
        <th scope="col" className="px-6 py-3 font-medium">
          Product
        </th>
        <th scope="col" className="px-6 py-3 font-medium">
          Qty
        </th>
        <th scope="col" className="px-6 py-3 font-medium">
          Price
        </th>
        <th scope="col" className="px-6 py-3 font-medium">
          Action
        </th>
      </tr>
    </thead>
    <tbody>
      {products.map((product: CartItem)=><tr key={product._id} className="bg-neutral-primary-soft border-b border-default hover:bg-neutral-secondary-medium">
        <td className="p-4">
          <img src={product.product.imageCover} className="w-16 md:w-24 max-w-full max-h-full" alt="Apple Watch" />
        </td>
        <td className="px-6 py-4 font-semibold text-heading">
          {product.product.title}
        </td>
        <td className="px-6 py-4">
          <form className="max-w-xs mx-auto">
            <label htmlFor="counter-input-1" className="sr-only">Choose quantity:</label>
            <div className="relative flex items-center">
              <button 
              disabled ={updateDiseble}
              onClick={(e)=>{e.preventDefault(); updateProduct(product.product.id, String(product.count-1))}} type="button" id="decrement-button-1" data-input-counter-decrement="counter-input-1" className="disabled:bg-gray-300 disabled:text-gray-500 flex items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary rounded-full text-sm focus:outline-none h-6 w-6">
                <svg className="w-3 h-3 text-heading" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" /></svg>
              </button>
              <div>
            {product.product.id === curentId ? (
         lodaingUpdate ? (
      <i className="fas fa-spinner fa-spin"></i>
          ) : (
      <span className="mx-3">{product.count}</span>
         )
          ) : (
          <span className="mx-3">{product.count}</span>
        )}
        </div>

              <button 
              disabled ={updateDiseble}
              onClick={(e)=>{e.preventDefault(); updateProduct(product.product.id, String(product.count+1))}} type="button" id="increment-button-1" data-input-counter-increment="counter-input-1" className="disabled:bg-gray-300 disabled:text-gray-500 flex items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary rounded-full text-sm focus:outline-none h-6 w-6">
                <svg className="w-3 h-3 text-heading" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14m-7 7V5" /></svg>
              </button>
            </div>
          </form>
        </td>
        <td className="px-6 py-4 font-semibold text-heading">
          {product.price * product.count} EGP
        </td>
        <td className="px-6 py-4">
          
         <div>
           {product.product.id === deleteId ?  (
            deleteLoading ? (
  <i className="fas fa-spinner fa-spin"></i>
) : (
  <button
          disabled ={removeDiseble}
          onClick={()=> deletProduyct(product.product.id)} className=' cursor-pointer text-white text-center bg-cyan-800 rounded-2xl p-3'>remove
          </button>
)):(<button
          disabled ={removeDiseble}
          onClick={()=> deletProduyct(product.product.id)} className=' cursor-pointer text-white text-center bg-cyan-800 rounded-2xl p-3'>remove
          </button>)}
         </div>
         
        </td>
      </tr>) }
    </tbody>
  </table>
</div>
<Link href={cartId ? `/checkout/${cartId}` : '#'} className="flex justify-end mt-5"> 
  <Button className=' mt-5 bg-green-700 hover:bg-green-500 cursor-pointer' disabled={!cartId}>Proceed To Checkout</Button>
  </Link>
</div>)
:(<h1 className=' text-4xl text-red-700 font-bold text-center disabled:bg-cyan-200 disabled:text-gray-700'>No Products Added Yet</h1>)}

  </>
}
