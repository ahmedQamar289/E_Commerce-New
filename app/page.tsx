import MainSlider from "./_component/Navbar/MainSlider/MainSlider";
import Categories from "./_component/Navbar/Categories/Categories";
import AllProducts from "./_component/Navbar/AllProducts/AllProducts";

export default function Home() {
  return (
    <>
      <div>
        <MainSlider />
        <Categories />
        <AllProducts />
      </div>
    </>
  );
}
