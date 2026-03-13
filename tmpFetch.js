import fetch from 'node-fetch';
(async ()=>{
  const id='64327d9b29c32513e420a2bd';
  const res=await fetch(`https://ecommerce.routemisr.com/api/v1/products?brand=${id}`);
  console.log('status',res.status);
  const json=await res.json();
  console.log(JSON.stringify(json,null,2));
})();