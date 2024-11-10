import React from "react";
import Header from "../Header/Header";
import ShopByCategory from "../ShopByCategory/ShopByCategory";
import Products from "../Products/Products";
import RequiredProducts from "../RequiredProducts/RequiredProducts";
import Brands from "../Brands/Brands";
import Membership from "../Membership/Membership";
function Home() {
  return (
    <div className="text-blackColor">
      <Header />
      <ShopByCategory />
      <Products />
      <RequiredProducts />
      <Membership />
      <Brands />
    </div>
  );
}

export default Home;
