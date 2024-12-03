import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../../../Context/UserContext";
import { FaHeart } from "react-icons/fa";
import { PulseLoader } from "react-spinners";

function Product({ product, length }) {
  const { userData, removeFromWishList, setUserData, setToken, profile } =
    useContext(UserContext);
  console.log(product);

  const [isLoadingHeart, setIsLoadingHeart] = useState(false);

  const navigate = useNavigate();

  const removeProductFromWishList = async (productId) => {
    setIsLoadingHeart(true);
    const data = await removeFromWishList(productId);
    if (data?.data?.message == "Done") {
      console.log(data.data);

      const result = await profile();
      if (result.data?.user) {
        setUserData(result.data.user);
      }
      setIsLoadingHeart(false);
    }
    if (data?.response?.data?.errMass == "TokenExpiredError: jwt expired") {
      localStorage.clear();
      setToken(null);
      setUserData(null);
      setIsLoadingHeart(false);
      navigate("/login");
    }
  };

  return (
    <div
      className={`${
        length - 1 == userData.wishList.indexOf(product)
          ? ""
          : "border-b-2"
      } grid grid-cols-12 items-center gap-3 py-2`}
    >
      <div className="col-span-full sm:col-span-6 md:col-span-4 xl:col-span-2">
        <img
          className="size-full rounded-md"
          src={product.mainImage.secure_url}
          alt={product.enName}
        />
      </div>
      <div className="col-span-full sm:col-span-6 md:col-span-8 xl:col-span-10">
        <div className="grid grid-cols-12 gap-1 xl:gap-3 items-center">
          <h4 className="text-lg col-span-full xl:col-span-5 font-medium">
            {product.enName}
          </h4>
          <p className="text-main text-lg col-span-full xl:col-span-2 font-medium">
            <span className="text-discoundColor line-through">
              {product.discound ? `$${product.price}` : ""}
            </span>{" "}
            ${product.finalPrice}
          </p>
          <div className="flex gap-4 col-span-full xl:col-span-5 items-center">
            <button className="py-2 rounded-md px-4 bg-product">buy now</button>
            <Link
              to={`/product/${product._id}`}
              className="py-2 rounded-md px-4 bg-main text-white"
            >
              More details
            </Link>
            {isLoadingHeart ? (
              <button className="bg-profileColor text-main p-2 rounded-md">
                <PulseLoader
                  color="#FFBD59"
                  cssOverride={{}}
                  loading
                  margin={2}
                  size={7}
                  speedMultiplier={1}
                />
              </button>
            ) : (
              <button
                onClick={() => removeProductFromWishList(product._id)}
                className="bg-profileColor text-main p-2 rounded-md"
              >
                <FaHeart className="text-2xl" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
