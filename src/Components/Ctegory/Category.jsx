import React from "react";
import Header from "../Header/Header";
import maintenance from "../../assets/ShopByCategory/maintenance.svg";
import Modernization from "../../assets/ShopByCategory/Modernization.svg";
import Transportation from "../../assets/ShopByCategory/transportation.svg";
import Tires from "../../assets/ShopByCategory/Tires.svg";
import storage from "../../assets/ShopByCategory/storage.svg";
import towing from "../../assets/ShopByCategory/towing.svg";
import engine from "../../assets/ShopByCategory/engine.svg";
import cooling from "../../assets/ShopByCategory/cooling.svg";
import accessories from "../../assets/ShopByCategory/accessories.svg";
import { Link } from "react-router-dom";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
function Category() {
  return (
    <>
      <Header header="Category" nameComponent="Category" />
      <section className="text-blackColor py-10">
        <div className="container max-w-screen-xl px-5 md:w-[90%] lg:w-[85%] mx-auto">
          <h2 className="font-bold text-4xl text-center">Shop By Category</h2>
          <div className="grid grid-cols-12 pt-10">
            <div className="col-span-12 md:col-span-6 lg:col-span-4 p-2">
              <div className="py-5 bg-categoryChild px-6 lg:px-8  rounded-md shadow-md">
                <div className="flex items-center gap-4">
                  <img src={maintenance} alt="maintenance" />
                  <h3 className="text-xl font-bold text-black">Maintenance</h3>
                </div>
                <p className="text-[15px] mt-4 text-blackColor">
                  There are many variations of passages of Lorem Ipsum available
                </p>
              </div>
            </div>
            <div className="col-span-12 md:col-span-6 lg:col-span-4 p-2">
              <div className="py-5 bg-categoryChild px-6 lg:px-8 rounded-md shadow-md">
                <div className="flex items-center gap-4">
                  <img src={Modernization} alt="Modernization" />
                  <h3 className="text-xl font-bold text-black">
                    Modernization
                  </h3>
                </div>
                <p className="text-[15px] mt-4 text-blackColor">
                  The building opened in 2020 and includes more than 120+ flats
                </p>
              </div>
            </div>
            <div className="col-span-12 md:col-span-6 lg:col-span-4 p-2">
              <div className="py-5 bg-categoryChild px-6 lg:px-8  rounded-md shadow-md">
                <div className="flex items-center gap-4">
                  <img src={Modernization} alt="Modernization" />
                  <h3 className="text-xl font-bold text-black">Maintenance</h3>
                </div>
                <p className="text-[15px] mt-4 text-blackColor">
                  There are many variations of passages of Lorem Ipsum available
                </p>
              </div>
            </div>
            <div className="col-span-12 md:col-span-6 lg:col-span-4 p-2">
              <div className="py-5 bg-categoryChild px-6 lg:px-8  rounded-md shadow-md">
                <div className="flex items-center gap-4">
                  <img src={Transportation} alt="Transportation" />
                  <h3 className="text-xl font-bold text-black">
                    Transportation
                  </h3>
                </div>
                <p className="text-[15px] mt-4 text-blackColor">
                  There are many variations of passages of Lorem Ipsum available
                </p>
              </div>
            </div>
            <div className="col-span-12 md:col-span-6 lg:col-span-4 p-2">
              <div className="py-5 bg-categoryChild px-6 lg:px-8  rounded-md shadow-md">
                <div className="flex items-center gap-4">
                  <img src={Tires} alt="Tires" />
                  <h3 className="text-xl font-bold text-black">Tires</h3>
                </div>
                <p className="text-[15px] mt-4 text-blackColor">
                  There are many variations of passages of Lorem Ipsum available
                </p>
              </div>
            </div>
            <div className="col-span-12 md:col-span-6 lg:col-span-4 p-2">
              <div className="py-5 bg-categoryChild px-6 lg:px-8  rounded-md shadow-md">
                <div className="flex items-center gap-4">
                  <img src={storage} alt="storage" />
                  <h3 className="text-xl font-bold text-black">Storage</h3>
                </div>
                <p className="text-[15px] mt-4 text-blackColor">
                  There are many variations of passages of Lorem Ipsum available
                </p>
              </div>
            </div>
            <div className="col-span-12 md:col-span-6 lg:col-span-4 p-2">
              <div className="py-5 bg-categoryChild px-6 lg:px-8  rounded-md shadow-md">
                <div className="flex items-center gap-4">
                  <img src={towing} alt="towing" />
                  <h3 className="text-xl font-bold text-black">Towing tools</h3>
                </div>
                <p className="text-[15px] mt-4 text-blackColor">
                  There are many variations of passages of Lorem Ipsum available
                </p>
              </div>
            </div>
            <div className="col-span-12 md:col-span-6 lg:col-span-4 p-2">
              <div className="py-5 bg-categoryChild px-6 lg:px-8  rounded-md shadow-md">
                <div className="flex items-center gap-4">
                  <img src={engine} alt="engine" />
                  <h3 className="text-xl font-bold text-black">Engine</h3>
                </div>
                <p className="text-[15px] mt-4 text-blackColor">
                  There are many variations of passages of Lorem Ipsum available
                </p>
              </div>
            </div>
            <div className="col-span-12 md:col-span-6 lg:col-span-4 p-2">
              <div className="py-5 bg-categoryChild px-6 lg:px-8  rounded-md shadow-md">
                <div className="flex items-center gap-4">
                  <img src={cooling} alt="cooling" />
                  <h3 className="text-xl font-bold text-black">Cooling</h3>
                </div>
                <p className="text-[15px] mt-4 text-blackColor">
                  There are many variations of passages of Lorem Ipsum available
                </p>
              </div>
            </div>
            <div className="col-span-12 md:col-span-6 lg:col-span-4 p-2">
              <div className="py-5 bg-categoryChild px-6 lg:px-8  rounded-md shadow-md">
                <div className="flex items-center gap-4">
                  <img src={accessories} alt="accessories" />
                  <h3 className="text-xl font-bold text-black">Accessories</h3>
                </div>
                <p className="text-[15px] mt-4 text-blackColor">
                  There are many variations of passages of Lorem Ipsum available
                </p>
              </div>
            </div>
            <div className="col-span-12 md:col-span-6 lg:col-span-4 p-2 flex items-center justify-center">
              <div className="py-10">
                <Link className=" flex text-white" to="/">
                  <span className=" py-3 pl-3 pr-5 bg-main">Get Started</span>
                  <span className="bg-socend skew-x-12  py-3 px-2 -translate-x-2">
                    <MdKeyboardDoubleArrowRight className="text-2xl" />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Category;
