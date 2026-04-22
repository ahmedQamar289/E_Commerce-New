// Brand names with custom descriptions and icons
export const brandsData = {
  smartphones: { name: "📱 Smartphones", icon: "📱", color: "bg-blue-100" },
  laptops: { name: "💻 Laptops", icon: "💻", color: "bg-purple-100" },
  fragrances: { name: "🌸 Fragrances", icon: "🌸", color: "bg-pink-100" },
  skincare: { name: "💄 Skincare", icon: "💄", color: "bg-rose-100" },
  groceries: { name: "🛒 Groceries", icon: "🛒", color: "bg-yellow-100" },
  "home-decoration": {
    name: "🏠 Home Decoration",
    icon: "🏠",
    color: "bg-orange-100",
  },
  furniture: { name: "🪑 Furniture", icon: "🪑", color: "bg-amber-100" },
  tops: { name: "👕 Tops", icon: "👕", color: "bg-green-100" },
  "womens-dresses": {
    name: "👗 Women's Dresses",
    icon: "👗",
    color: "bg-red-100",
  },
  "womens-shoes": {
    name: "👠 Women's Shoes",
    icon: "👠",
    color: "bg-fuchsia-100",
  },
  "mens-shirts": { name: "👔 Men's Shirts", icon: "👔", color: "bg-slate-100" },
  "mens-shoes": { name: "👞 Men's Shoes", icon: "👞", color: "bg-gray-100" },
  "mens-watches": {
    name: "⌚ Men's Watches",
    icon: "⌚",
    color: "bg-indigo-100",
  },
  "womens-watches": {
    name: "⌚ Women's Watches",
    icon: "⌚",
    color: "bg-violet-100",
  },
  "womens-bags": { name: "👜 Women's Bags", icon: "👜", color: "bg-cyan-100" },
  "womens-jewellery": {
    name: "💎 Women's Jewellery",
    icon: "💎",
    color: "bg-lime-100",
  },
  sunglasses: { name: "😎 Sunglasses", icon: "😎", color: "bg-teal-100" },
  automotive: { name: "🚗 Automotive", icon: "🚗", color: "bg-red-100" },
  motorcycle: { name: "🏍️ Motorcycle", icon: "🏍️", color: "bg-orange-100" },
};

export function getBrandDisplay(slug: string) {
  return (
    brandsData[slug as keyof typeof brandsData] || {
      name: slug.charAt(0).toUpperCase() + slug.slice(1),
      icon: "📦",
      color: "bg-gray-100",
    }
  );
}
