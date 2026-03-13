import Details from '@/app/_component/Navbar/Details/details'
import selectedProducts from '@/app/api/selectedProducts'
import React from 'react'

export default async function ProductDetails({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const data = await selectedProducts(id)

  return <>
  <Details data={data} />
  
  </>
}
