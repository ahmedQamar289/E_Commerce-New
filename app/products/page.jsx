import React from 'react'

import getProducts from '@/app/api/products.api';
import AllProducts from '../_component/Navbar/AllProducts/AllProducts';
export default async function Products() {

  let data = await getProducts();


  return <>
  <AllProducts/>
  </>
}
