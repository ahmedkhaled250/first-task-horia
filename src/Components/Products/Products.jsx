import React, { useState } from "react";
import cement from "../../assets/products/cement.svg";
import iron from "../../assets/products/iron.svg";
import light from "../../assets/products/light.svg";
import paints from "../../assets/products/paints.svg";
import { IoStarSharp } from "react-icons/io5";
import { BsCart2 } from "react-icons/bs";
import { Link } from "react-router-dom";

function Products() {
  const [activeTab, setActiveTab] = useState("all");
  const handleTabLink = (tab) => {
    setActiveTab(tab);
  };
  return (
    <section className="py-8">
      <div className="container mx-auto px-5">
        <div className="">
          <p className="text-main font-thin uppercase">CHECKOUT OUR NEW</p>
          <h2 className="text-3xl font-bold mt-2 uppercase">Products</h2>
        </div>
        <ul className=" flex items-center justify-center gap-2 lg:gap-5 mt-10">
          <li>
            <button
              onClick={() => handleTabLink("all")}
              className={`${
                activeTab === "all" ? "text-white bg-main" : "bg-gray-300"
              }  py-2 px-5 lg:px-10 rounded-xl`}
            >
              All
            </button>
          </li>
          <li>
            <button
              onClick={() => handleTabLink("cement")}
              className={`${
                activeTab === "cement" ? "text-white bg-main" : "bg-gray-300"
              }  py-2 px-5 lg:px-10 rounded-xl`}
            >
              Cement
            </button>
          </li>
          <li>
            <button
              onClick={() => handleTabLink("iron")}
              className={`${
                activeTab === "iron" ? "text-white bg-main" : "bg-gray-300"
              }  py-2 px-5 lg:px-10 rounded-xl`}
            >
              Iron
            </button>
          </li>
          <li>
            <button
              onClick={() => handleTabLink("paints")}
              className={`${
                activeTab === "paints" ? "text-white bg-main" : "bg-gray-300"
              }  py-2 px-5 lg:px-10 rounded-xl`}
            >
              Paints
            </button>
          </li>
          <li>
            <button
              onClick={() => handleTabLink("lighting")}
              className={`${
                activeTab === "lighting" ? "text-white bg-main" : "bg-gray-300"
              }  py-2 px-5 lg:px-10 rounded-xl`}
            >
              Lighting
            </button>
          </li>
        </ul>
        <div>
          {activeTab === "all" && (
            <div className="grid grid-cols-12 mt-10">
              <div className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3 p-5">
                <div className="rounded-xl p-3 bg-white shadow-md">
                  <img src={light} alt="light" className="w-full" />
                  <div className="flex justify-between items-center py-3">
                    <div className="">
                      <h3 className="font-medium">Light</h3>
                      <p className="text-sm font-medium">
                        villa buildings makers
                      </p>
                    </div>
                    <div className="flex text-main">
                      <IoStarSharp />
                      <IoStarSharp />
                      <IoStarSharp />
                      <IoStarSharp />
                      <IoStarSharp />
                    </div>
                  </div>
                  <p className="text-sm font-light">(4.1k) Customer Reviews</p>
                  <div className="flex justify-between items-center py-2">
                    <p className="text-xl text-black font-medium">95.50 KWD</p>
                    <Link className="p-2 rounded-lg text-white bg-main ">
                      <BsCart2 className="text-sm" />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3 p-5">
                <div className="rounded-xl p-3 bg-white shadow-md">
                  <img src={iron} alt="light" className="w-full" />
                  <div className="flex justify-between items-center py-3">
                    <div className="">
                      <h3 className="font-medium">Iron</h3>
                      <p className="text-sm font-medium">
                        villa buildings makers
                      </p>
                    </div>
                    <div className="flex text-main">
                      <IoStarSharp />
                      <IoStarSharp />
                    </div>
                  </div>
                  <p className="text-sm font-light">(4.1k) Customer Reviews</p>
                  <div className="flex justify-between items-center py-2">
                    <p className="text-xl text-black font-medium">95.50 KWD</p>
                    <Link className="p-2 rounded-lg text-white bg-main ">
                      <BsCart2 className="text-sm" />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3 p-5">
                <div className="rounded-xl p-3 bg-white shadow-md">
                  <img src={paints} alt="light" className="w-full" />
                  <div className="flex justify-between items-center py-3">
                    <div className="">
                      <h3 className="font-medium">Paints</h3>
                      <p className="text-sm font-medium">
                        villa buildings makers
                      </p>
                    </div>
                    <div className="flex text-main">
                      <IoStarSharp />
                      <IoStarSharp />
                      <IoStarSharp />
                      <IoStarSharp />
                    </div>
                  </div>
                  <p className="text-sm font-light">(4.1k) Customer Reviews</p>
                  <div className="flex justify-between items-center py-2">
                    <p className="text-xl text-black font-medium">95.50 KWD</p>
                    <Link className="p-2 rounded-lg text-white bg-main ">
                      <BsCart2 className="text-sm" />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3 p-5">
                <div className="rounded-xl p-3 bg-white shadow-md">
                  <img src={cement} alt="light" className="w-full" />
                  <div className="flex justify-between items-center py-3">
                    <div className="">
                      <h3 className="font-medium">Cement</h3>
                      <p className="text-sm font-medium">
                        villa buildings makers
                      </p>
                    </div>
                    <div className="flex text-main">
                      <IoStarSharp />
                      <IoStarSharp />
                      <IoStarSharp />
                    </div>
                  </div>
                  <p className="text-sm font-light">(4.1k) Customer Reviews</p>
                  <div className="flex justify-between items-center py-2">
                    <p className="text-xl text-black font-medium">95.50 KWD</p>
                    <Link className="p-2 rounded-lg text-white bg-main ">
                      <BsCart2 className="text-sm" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeTab === "paints" && (
            <div className="grid grid-cols-12 mt-10">
              <div className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3 p-5">
                <div className="rounded-xl p-3 bg-white shadow-md">
                  <img src={paints} alt="light" className="w-full" />
                  <div className="flex justify-between items-center py-3">
                    <div className="">
                      <h3 className="font-medium">Paints</h3>
                      <p className="text-sm font-medium">
                        villa buildings makers
                      </p>
                    </div>
                    <div className="flex text-main">
                      <IoStarSharp />
                      <IoStarSharp />
                      <IoStarSharp />
                      <IoStarSharp />
                    </div>
                  </div>
                  <p className="text-sm font-light">(4.1k) Customer Reviews</p>
                  <div className="flex justify-between items-center py-2">
                    <p className="text-xl text-black font-medium">95.50 KWD</p>
                    <Link className="p-2 rounded-lg text-white bg-main ">
                      <BsCart2 className="text-sm" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeTab === "lighting" && (
            <div className="grid grid-cols-12 mt-10">
              <div className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3 p-5">
                <div className="rounded-xl p-3 bg-white shadow-md">
                  <img src={light} alt="light" className="w-full" />
                  <div className="flex justify-between items-center py-3">
                    <div className="">
                      <h3 className="font-medium">Light</h3>
                      <p className="text-sm font-medium">
                        villa buildings makers
                      </p>
                    </div>
                    <div className="flex text-main">
                      <IoStarSharp />
                      <IoStarSharp />
                      <IoStarSharp />
                      <IoStarSharp />
                      <IoStarSharp />
                    </div>
                  </div>
                  <p className="text-sm font-light">(4.1k) Customer Reviews</p>
                  <div className="flex justify-between items-center py-2">
                    <p className="text-xl text-black font-medium">95.50 KWD</p>
                    <Link className="p-2 rounded-lg text-white bg-main ">
                      <BsCart2 className="text-sm" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeTab === "iron" && (
            <div className="grid grid-cols-12 mt-10">
              <div className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3 p-5">
                <div className="rounded-xl p-3 bg-white shadow-md">
                  <img src={iron} alt="light" className="w-full" />
                  <div className="flex justify-between items-center py-3">
                    <div className="">
                      <h3 className="font-medium">Iron</h3>
                      <p className="text-sm font-medium">
                        villa buildings makers
                      </p>
                    </div>
                    <div className="flex text-main">
                      <IoStarSharp />
                      <IoStarSharp />
                    </div>
                  </div>
                  <p className="text-sm font-light">(4.1k) Customer Reviews</p>
                  <div className="flex justify-between items-center py-2">
                    <p className="text-xl text-black font-medium">95.50 KWD</p>
                    <Link className="p-2 rounded-lg text-white bg-main ">
                      <BsCart2 className="text-sm" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeTab === "cement" && (
            <div className="grid grid-cols-12 mt-10">
              <div className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3 p-5">
                <div className="rounded-xl p-3 bg-white shadow-md">
                  <img src={cement} alt="light" className="w-full" />
                  <div className="flex justify-between items-center py-3">
                    <div className="">
                      <h3 className="font-medium">Cement</h3>
                      <p className="text-sm font-medium">
                        villa buildings makers
                      </p>
                    </div>
                    <div className="flex text-main">
                      <IoStarSharp />
                      <IoStarSharp />
                      <IoStarSharp />
                    </div>
                  </div>
                  <p className="text-sm font-light">(4.1k) Customer Reviews</p>
                  <div className="flex justify-between items-center py-2">
                    <p className="text-xl text-black font-medium">95.50 KWD</p>
                    <Link className="p-2 rounded-lg text-white bg-main ">
                      <BsCart2 className="text-sm" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <button className="py-2 px-4 bg-main text-white rounded-xl block mt-10 mx-auto">
          View More
        </button>
      </div>
    </section>
  );
}

export default Products;
