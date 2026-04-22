import fetch from 'node-fetch';
(async ()=>{
  const category='electronics';
  const res=await fetch(`https://dummyjson.com/products/category/${category}`);
  console.log('status',res.status);
  const json=await res.json();
  console.log(JSON.stringify(json,null,2));
})();