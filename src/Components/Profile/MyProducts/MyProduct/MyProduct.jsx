import React, { useContext, useEffect, useState } from "react";
import { BsCart2 } from "react-icons/bs";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { IoStarSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../../../Context/UserContext";

function Product({ product }) {

  const [wishList, setWishList] = useState([]);
  const [isLoadingHeart, setIsLoadingHeart] = useState(false);
  const navigate = useNavigate();
  const {
    // addToWishList,
    // removeFromWishList,
    setUserData,
    userData,
    setToken,
    profile,
  } = useContext(UserContext);
  const userProfile = async () => {
    const data = await profile();
    if (data.data?.user) {
      setWishList(data.data.user.wishList.map((product) => product._id));
      setUserData(data.data.user);
    }
    if (data?.response?.data?.errMass == "TokenExpiredError: jwt expired") {
      localStorage.clear();
      setToken(null);
      setUserData(null);
      navigate("/login");
    }
  };
  // const addProductToWishList = async (productId) => {
  //   setIsLoadingHeart(true);
  //   const data = await addToWishList(productId);
  //   if (data?.data?.message == "Done") {
  //     console.log(data.data);

  //     const result = await profile();
  //     if (result.data?.user) {
  //       setUserData(result.data.user);
  //       setWishList(result.data.user.wishList.map((product) => product._id));
  //     }

  //     setIsLoadingHeart(false);
  //   }
  //   if (data?.response?.data?.errMass == "TokenExpiredError: jwt expired") {
  //     localStorage.clear();
  //     setToken(null);
  //     setUserData(null);
  //     setIsLoadingHeart(false);
  //     navigate("/login");
  //   }
  // };
  // const removeProductFromWishList = async (productId) => {
  //   setIsLoadingHeart(true);
  //   const data = await removeFromWishList(productId);
  //   if (data?.data?.message == "Done") {
  //     console.log(data.data);

  //     const result = await profile();
  //     if (result.data?.user) {
  //       setUserData(result.data.user);
  //       setWishList(result.data.user.wishList.map((product) => product._id));
  //     }
  //     setIsLoadingHeart(false);
  //   }
  //   if (data?.response?.data?.errMass == "TokenExpiredError: jwt expired") {
  //     localStorage.clear();
  //     setToken(null);
  //     setUserData(null);
  //     setIsLoadingHeart(false);
  //     navigate("/login");
  //   }
  // };
 
  // useEffect(() => {
  //   userProfile();
  // }, []);

  function showStars(num) {
    const stars = [];
    for (let i = 0; i < num; i++) {
      stars.push(<IoStarSharp />);
    }
    return stars;
  }

  return (
    <div className="col-span-12 sm:col-span-6 md:col-span-4 xl:col-span-3">
      <div className="rounded-lg overflow-hidden bg-white shadow-md relative">
        {/* {wishList.includes(product._id) ||
        userData?.wishList?.includes(product._id) ? (
          <button
            onClick={() => {
              if (!isLoadingHeart) {
                removeProductFromWishList(product._id);
              }
            }}
            className="absolute top-3 right-3 outline-none p-2 rounded-full text-white bg-main "
          >
            <FaHeart className="text-sm" />
          </button>
        ) : (
          <button
            onClick={() => {
              if (!isLoadingHeart) {
                addProductToWishList(product._id);
              }
            }}
            className="absolute top-3 right-3 outline-none p-2 rounded-full text-white bg-main "
          >
            <FaRegHeart className="text-sm" />
          </button>
        )} */}
        <Link to={`/product/${product._id}`}>
          <img
            src={product.mainImage.secure_url}
            alt={product.name}
            className="w-full"
          />
          <div className="p-3">
            <div className="flex justify-between items-center py-3">
              <div className="">
                <h3 className=" text-black text-xl font-medium">
                  {product.enName.length > 15
                    ? `${product.enName.slice(0, 15)}......`
                    : product.enName}
                </h3>
              </div>
              <div className="flex text-main">{showStars(product.rate)}</div>
            </div>
            <p className="font-light">
              {product.enDescription.length > 20
                ? `${product.enDescription.slice(0, 20)}......`
                : product.enDescription}
            </p>
            <div className="flex justify-between items-center py-2">
              <p className="text-xl text-black font-medium">
                {product.discound ? (
                  <span className="line-through mr-2 text-lg text-blackColor font-light">
                    {" "}
                    ${product.price}{" "}
                  </span>
                ) : (
                  ""
                )}
                ${product.finalPrice}
              </p>
              {/* <Link className="p-2 rounded-lg text-white bg-main ">
                <BsCart2 className="text-sm" />
              </Link> */}
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Product;
