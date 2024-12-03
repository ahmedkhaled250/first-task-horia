import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { FaHeart, FaRegHeart, FaRegStar, FaStar } from "react-icons/fa";
import { TbMessageDots } from "react-icons/tb";
import ImageSlider from "./ImageSlider/ImageSlider";
import { PulseLoader } from "react-spinners";
import ProductDetailsLoading from "./ProductDetailsLoading";
import Skeleton from "react-loading-skeleton";

function ProductDetails() {
  const { id } = useParams();
  const [image, setImage] = useState("");
  const [product, setProduct] = useState(null);

  const {
    baseUrl,
    avatar,
    userData,
    addToWishList,
    removeFromWishList,
    setUserData,
    setToken,
    profile,
  } = useContext(UserContext);
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [isLoading, setIsLoading] = useState([]);
  const [wishList, setWishList] = useState([]);
  const [isLoadingHeart, setIsLoadingHeart] = useState(false);
  const navigate = useNavigate();

  const userProfile = async () => {
    const data = await profile();
    if (data.data?.user) {
      setWishList(data.data.user.wishList.map((product) => product?._id));
      setUserData(data.data.user);
    }
    if (data?.response?.data?.errMass == "TokenExpiredError: jwt expired") {
      localStorage.clear();
      setToken(null);
      setUserData(null);
      navigate("/login");
    }
  };

  const addProductToWishList = async (productId) => {
    setIsLoadingHeart(true);
    const data = await addToWishList(productId);
    if (data?.data?.message == "Done") {
      console.log(data.data);

      const result = await profile();
      if (result.data?.user) {
        setUserData(result.data.user);
        setWishList(result.data.user.wishList.map((product) => product?._id));
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

  const removeProductFromWishList = async (productId) => {
    setIsLoadingHeart(true);
    const data = await removeFromWishList(productId);
    if (data?.data?.message == "Done") {
      console.log(data.data);

      const result = await profile();
      if (result.data?.user) {
        setUserData(result.data.user);
        setWishList(result.data.user.wishList.map((product) => product?._id));
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

  const getProduct = async () => {
    setIsLoading(true);
    const { data } = await axios.get(`${baseUrl}/product/${id}`);
    setProduct(data?.product && data.product);
    setIsLoading(false);
  };

  const displayRating = (length) => {
    if (!length) {
      return <FaRegStar />;
    } else {
      const stars = [];
      for (let i = 0; i < length; i++) {
        stars.push(<FaStar />);
      }
      return stars;
    }
  };

  useEffect(() => {
    getProduct();
    userProfile();
  }, []);
  return (
    <section className="pb-8 mt-20 lg:mt-28">
      <div className="container  lg:w-[90%] px-5 mx-auto">
        {isLoading ? (
          <ProductDetailsLoading />
        ) : (
          <>
            {product?.subImages?.length ? (
              <div className="lg:hidden">
                <ImageSlider images={product.subImages} />
              </div>
            ) : (
              ""
            )}
            <div className="grid  grid-cols-4 items-center lg:items-start gap-5">
              <div className="hidden lg:block col-span-2">
                <div className="grid grid-cols-5 w-full items-center gap-3">
                  <div className="col-span-full">
                    <img
                      src={image || product?.mainImage.secure_url}
                      className="w-3/4 mx-auto "
                      alt={product?.enName}
                    />
                  </div>
                  <div className="col-span-full gap-3 flex items-center justify-center">
                    {product &&
                      product?.subImages.map((image, index) => {
                        return (
                          <div className="w-1/5">
                            <img
                              key={index}
                              src={image.secure_url}
                              className=" w-full rounded-md cursor-pointer"
                              onClick={() => setImage(image.secure_url)}
                              alt={product.enName}
                            />
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>

              <div className=" col-span-full lg:col-span-2">
                <div className="py-10 flex items-center justify-between border-b-2">
                  <h3 className="text-xl font-bold text-black">
                    {product && product.enName}
                  </h3>
                  <div className="py-1 px-2 rounded-md bg-profileColor flex items-center gap-2 text-profileColorText">
                    <FaRegHeart />
                    109
                  </div>
                </div>
                <div className="py-10 flex items-center gap-5 border-b-2">
                  <div className="">
                    <p className=" text-main text-4xl font-bold pb-2 pr-5 ">
                      ${product && product.finalPrice}
                    </p>
                    {product && product?.discound ? (
                      <p className="text-xl line-through">${product.price}</p>
                    ) : (
                      ""
                    )}
                  </div>

                  <div className="py-2 px-4 rounded-full bg-headerColor flex items-center gap-2 text-mainText text-lg font-medium">
                    <FaRegStar />
                    109
                  </div>

                  <div className="py-2 px-4 rounded-full flex items-center gap-2 text-main text-lg font-medium">
                    <TbMessageDots />
                    67 Reviews
                  </div>
                </div>
                {userData?.role == "Individual" ||
                userData?.role == "Business" ? (
                  ""
                ) : (
                  <div className="py-10 flex items-center gap-5 border-b-2">
                    {/* <div className="flex bg-product rounded-md items-center gap-2">
                <button className="text-main text-lg font-medium py-2 px-5">
                  -
                </button>
                <span className="px-4">0</span>
                <button className="text-main text-lg font-medium py-2 px-5">
                  +
                </button>
              </div> */}
                    {isLoadingHeart ? (
                      <button
                        disabled
                        className="text-white bg-main py-2 px-4 text-lg font-medium rounded-md shadow-md"
                      >
                        <PulseLoader
                          color="#fff"
                          cssOverride={{}}
                          loading
                          margin={2}
                          size={7}
                          speedMultiplier={1}
                        />
                      </button>
                    ) : wishList.includes(product?._id) ? (
                      <button
                        onClick={() => {
                          if (!isLoadingHeart) {
                            removeProductFromWishList(product?._id);
                          }
                        }}
                        className="text-white bg-main py-2 px-4 text-lg font-medium rounded-md shadow-md flex items-center gap-2"
                      >
                        Remove To wishlist <FaHeart className="text-xl" />
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          if (!isLoadingHeart) {
                            addProductToWishList(product?._id);
                          }
                        }}
                        className="text-white bg-main py-2 px-4 text-lg font-medium rounded-md shadow-md flex items-center gap-2"
                      >
                        Add To wishlist <FaRegHeart className="text-xl" />
                      </button>
                    )}
                  </div>
                )}
                <div className="py-10">
                  <p>{product ? product.enDescription : ""}</p>
                </div>
              </div>
            </div>
          </>
        )}

        <div className="w-full mt-5">
          <h4 className="text-xl py-5 lg:pl-5 text-black font-medium">
            Customers Feedback
          </h4>
          <div className="grid grid-cols-6 gap-5 xl:gap-10">
            <div className="col-span-2 lg:pl-5">
              <div className="py-10 rounded-md bg-product text-center">
                {isLoading ? (
                  <Skeleton className="h-5 rounded-md w-10 mx-auto" />
                ) : (
                  <>
                    <p className="text-4xl font-bold text-main">
                      {product ? product.rating || 0 : ""}
                    </p>
                  </>
                )}

                {isLoading ? (
                  <Skeleton className="h-5 my-4 rounded-md w-20 mx-auto" />
                ) : (
                  <>
                    <p
                      className={`py-4 flex items-center justify-center gap-1 md:gap-3 text-main md:text-lg lg:text-xl`}
                    >
                      {product ? displayRating(product.rating || 0) : ""}
                    </p>
                  </>
                )}

                <p>Product Rating</p>
              </div>
            </div>

            <div className="col-span-4">
              <div className="size-full bg-product rounded-md flex items-center">
                <div className="flex text-main flex-col justify-between p-5 md:text-lg lg:text-xl size-full">
                  <div className="flex items-center justify-between  gap-2 md:gap-0 w-full">
                    <div className="w-2/5 lg:w-3/5 bg-slate-400 h-2 rounded-full">
                      <div className="w-[45%] bg-main h-full rounded-full"></div>
                    </div>
                    <div className="flex items-center w-3/5 lg:w-2/5 justify-end gap-1 lg:gap-2">
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <p className="font-medium">45%</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-2 md:gap-0 w-full">
                    <div className="w-2/5 lg:w-3/5 bg-slate-400 h-2 rounded-full">
                      <div className="w-[30%] bg-main h-full rounded-full"></div>
                    </div>

                    <div className="flex items-center w-3/5 lg:w-2/5 justify-end gap-1 lg:gap-2">
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <p className="font-medium">30%</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-2 md:gap-0 w-full">
                    <div className="w-2/5 lg:w-3/5 bg-slate-400 h-2 rounded-full">
                      <div className="w-[10%] bg-main h-full rounded-full"></div>
                    </div>
                    <div className="flex items-center w-3/5 lg:w-2/5 justify-end gap-1 lg:gap-2">
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <p className="font-medium">10%</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-2 md:gap-0 w-full">
                    <div className="w-2/5 lg:w-3/5 bg-slate-400 h-2 rounded-full">
                      <div className="w-[10%] bg-main h-full rounded-full"></div>
                    </div>
                    <div className="flex items-center w-3/5 lg:w-2/5 justify-end gap-1 lg:gap-2">
                      <FaStar />
                      <FaStar />
                      <p className="font-medium">10%</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-2 md:gap-0 w-full">
                    <div className="w-2/5 lg:w-3/5 bg-slate-400 h-2 rounded-full">
                      <div className="w-[5%] bg-main h-full rounded-full"></div>
                    </div>
                    <div className="flex items-center w-3/5 lg:w-2/5 justify-end gap-1 lg:gap-2">
                      <FaStar />
                      <p className="font-medium">5%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-4/5 xl:w-3/5 mt-10">
          <div className="lg:pl-5">
            <h4 className="text-xl mb-3  text-black font-medium">Reviews</h4>
            <div className="px-3">
              <div className="flex items-start  py-6 border-b-2 w-full gap-10">
                <div className="size-20 rounded-full overflow-hidden">
                  <img
                    src={avatar}
                    className="w-full"
                    alt={userData.userName || ""}
                  />
                </div>
                <div className="">
                  <div className="flex items-end gap-10">
                    <p className="text-black font-medium text-lg">
                      Nicolas cage
                    </p>
                    <p className="text-sm text-textbody ">3 Days ago</p>
                  </div>
                  <div className="flex items-center text-main mb-4 mt-2 gap-1">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                  </div>
                  <p className="text-sm text-textbody">
                    There are many variations of passages of Lorem Ipsum
                    available, but the majority have suffered alteration in some
                    form, by injected humour
                  </p>
                </div>
              </div>

              <div className="flex items-start  py-6 border-b-2 w-full gap-10">
                <div className="size-20 rounded-full overflow-hidden">
                  <img
                    src={avatar}
                    className="w-full"
                    alt={userData.userName || ""}
                  />
                </div>
                <div className="">
                  <div className="flex items-end gap-10">
                    <p className="text-black font-medium text-lg">
                      Nicolas cage
                    </p>
                    <p className="text-sm text-textbody ">3 Days ago</p>
                  </div>
                  <div className="flex items-center text-main mb-4 mt-2 gap-1">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                  </div>
                  <p className="text-sm text-textbody">
                    There are many variations of passages of Lorem Ipsum
                    available, but the majority have suffered alteration in some
                    form, by injected humour
                  </p>
                </div>
              </div>

              <div className="flex items-start  py-6 border-b-2 w-full gap-10">
                <div className="size-20 rounded-full overflow-hidden">
                  <img
                    src={avatar}
                    className="w-full"
                    alt={userData.userName || ""}
                  />
                </div>
                <div className="">
                  <div className="flex items-end gap-10">
                    <p className="text-black font-medium text-lg">
                      Nicolas cage
                    </p>
                    <p className="text-sm text-textbody ">3 Days ago</p>
                  </div>
                  <div className="flex items-center text-main mb-4 mt-2 gap-1">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                  </div>
                  <p className="text-sm text-textbody">
                    There are many variations of passages of Lorem Ipsum
                    available, but the majority have suffered alteration in some
                    form, by injected humour
                  </p>
                </div>
              </div>

              <div className="flex items-start  py-6 w-full gap-10">
                <div className="size-20 rounded-full overflow-hidden">
                  <img
                    src={avatar}
                    className="w-full"
                    alt={userData.userName || ""}
                  />
                </div>
                <div className="">
                  <div className="flex items-end gap-10">
                    <p className="text-black font-medium text-lg">
                      Nicolas cage
                    </p>
                    <p className="text-sm text-textbody ">3 Days ago</p>
                  </div>
                  <div className="flex items-center text-main mb-4 mt-2 gap-1">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                  </div>
                  <p className="text-sm text-textbody">
                    There are many variations of passages of Lorem Ipsum
                    available, but the majority have suffered alteration in some
                    form, by injected humour
                  </p>
                </div>
              </div>
            </div>
            <button className="bg-main text-white py-2 block rounded-md mt-3 mx-auto px-4">
              View More
            </button>
          </div>
        </div>

        {userData?.role == "Individual" || userData?.role == "Business" ? (
          ""
        ) : (
          <div className=" w-full lg:w-4/5 xl:w-3/5 mt-10">
            <h4 className="text-xl mb-3 text-black font-medium">
              Write a Review
            </h4>
            <div className="p-5">
              <div className=" flex items-center gap-2">
                {[...Array(5)].map((star, index) => {
                  const currentRating = index + 1;
                  return (
                    <label className="">
                      <input
                        onClick={() => setRating(currentRating)}
                        type="radio"
                        name="rating"
                        className="hidden"
                        value={currentRating}
                      />
                      <FaStar
                        onMouseEnter={() => setHover(currentRating)}
                        onMouseLeave={() => setHover(null)}
                        color={
                          currentRating <= (hover || rating)
                            ? "ffc107"
                            : "e4e5e9"
                        }
                        className={`cursor-pointer`}
                        size={50}
                      />
                    </label>
                  );
                })}
              </div>

              <div className="py-5 flex items-center gap-2">
                <textarea
                  className={`rounded-lg p-5  border-2 w-full resize-none focus:border-main outline-none`}
                  placeholder="write your review"
                  name="review"
                  id="review"
                  rows={5}
                ></textarea>
              </div>

              <button className="bg-main text-white py-2 rounded-md mt-3 px-4">
                Submit Review
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default ProductDetails;
