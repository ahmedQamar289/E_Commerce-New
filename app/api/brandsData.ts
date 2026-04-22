// Brand names with custom descriptions and icons
export const brandsData = {
  smartphones: { name: "📱 Smartphones", icon: "https://img.icons8.com/color/96/000000/iphone.png", color: "bg-blue-100" },
  laptops: { name: "💻 Laptops", icon: "https://img.icons8.com/color/96/000000/laptop.png", color: "bg-purple-100" },
  fragrances: { name: "🌸 Fragrances", icon: "https://img.icons8.com/color/96/000000/perfume-bottle.png", color: "bg-pink-100" },
  skincare: { name: "💄 Skincare", icon: "https://img.icons8.com/color/96/000000/lipstick.png", color: "bg-rose-100" },
  groceries: { name: "🛒 Groceries", icon: "https://img.icons8.com/color/96/000000/shopping-cart.png", color: "bg-yellow-100" },
  "home-decoration": {
    name: "🏠 Home Decoration",
    icon: "https://img.icons8.com/color/96/000000/home.png",
    color: "bg-orange-100",
  },
  furniture: { name: "🪑 Furniture", icon: "https://img.icons8.com/color/96/000000/chair.png", color: "bg-amber-100" },
  tops: { name: "👕 Tops", icon: "https://img.icons8.com/color/96/000000/t-shirt.png", color: "bg-green-100" },
  "womens-dresses": {
    name: "👗 Women's Dresses",
    icon: "https://img.icons8.com/color/96/000000/dress.png",
    color: "bg-red-100",
  },
  "womens-shoes": {
    name: "👠 Women's Shoes",
    icon: "https://img.icons8.com/color/96/000000/womens-shoe.png",
    color: "bg-fuchsia-100",
  },
  "mens-shirts": { name: "👔 Men's Shirts", icon: "https://img.icons8.com/color/96/000000/shirt.png", color: "bg-slate-100" },
  "mens-shoes": { name: "👞 Men's Shoes", icon: "https://img.icons8.com/color/96/000000/mens-shoe.png", color: "bg-gray-100" },
  "mens-watches": {
    name: "⌚ Men's Watches",
    icon: "https://img.icons8.com/color/96/000000/wrist-watch.png",
    color: "bg-indigo-100",
  },
  "womens-watches": {
    name: "⌚ Women's Watches",
    icon: "https://img.icons8.com/color/96/000000/wrist-watch.png",
    color: "bg-violet-100",
  },
  "womens-bags": { name: "👜 Women's Bags", icon: "https://img.icons8.com/color/96/000000/handbag.png", color: "bg-cyan-100" },
  "womens-jewellery": {
    name: "💎 Women's Jewellery",
    icon: "https://img.icons8.com/color/96/000000/diamond.png",
    color: "bg-lime-100",
  },
  sunglasses: { name: "😎 Sunglasses", icon: "https://img.icons8.com/color/96/000000/sunglasses.png", color: "bg-teal-100" },
  automotive: { name: "🚗 Automotive", icon: "https://img.icons8.com/color/96/000000/car.png", color: "bg-red-100" },
  motorcycle: { name: "🏍️ Motorcycle", icon: "https://img.icons8.com/color/96/000000/motorcycle.png", color: "bg-orange-100" },
};

export function getBrandDisplay(slug: string) {
  return (
    brandsData[slug as keyof typeof brandsData] || {
      name: slug.charAt(0).toUpperCase() + slug.slice(1),
      icon: "https://img.icons8.com/color/96/000000/box.png",
      color: "bg-gray-100",
    }
  );
}
