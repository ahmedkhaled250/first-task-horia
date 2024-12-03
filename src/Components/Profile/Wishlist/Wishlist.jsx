import React, { useContext, useState } from "react";
import { UserContext } from "../../../Context/UserContext";
import Product from "./Product/Product";

function Wishlist() {
  const { userData } = useContext(UserContext);
  const [productsLimits, setProductsLimits] = useState(3);

  const wishList = userData?.wishList?.slice(0, productsLimits);

  return (
    <div className="w-full text-black">
      <h3 className="font-semibold text-xl mb-3">
        Wishlist ({userData?.wishList && userData.wishList.length})
      </h3>
      {userData?.wishList?.length ? (
        <>
          <div className="border-2 rounded-md  px-3 md:px-5 lg:px-10">
            {wishList.map((product) => (
              <Product
                product={product}
                length={wishList.length}
                key={product._id}
              />
            ))}
          </div>
          {userData?.wishList?.length == wishList.length ? (
            ""
          ) : (
            <button
              onClick={() => setProductsLimits(productsLimits + 3)}
              className="bg-main text-white py-2 px-4 mx-auto block mt-5 rounded-md"
            >
              See more
            </button>
          )}
        </>
      ) : (
        <div className="text-center">Your wishlist is impty</div>
      )}
    </div>
  );
}

export default Wishlist;
