import React from "react";
import Header from "./Header/Header";
import ShopByCategory from "./ShopByCategory/ShopByCategory";
import Products from "./Products/Products";
import RequiredProducts from "./RequiredProducts/RequiredProducts";
import Brands from "./Brands/Brands";
import Membership from "./Membership/Membership";
import Join from "./Join/Join";
import Footer from "./Footer/Footer";
import Navbar from "./Navbar/Navbar";
function Home() {
  return (
    <div className="text-blackColor overflow-hidden">
      <Navbar/>
      <Header />
      <ShopByCategory />
      <Products />
      <RequiredProducts />
      <Membership />
      <Join />
      <Brands />
      <Footer/>
    </div>
  );
}

export default Home;
