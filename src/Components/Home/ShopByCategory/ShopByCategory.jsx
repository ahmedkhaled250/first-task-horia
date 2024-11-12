import React from "react";
import Maintenance from "../../../assets/ShopByCategory/maintenance.svg";
import Modernization from "../../../assets/ShopByCategory/Modernization.svg";
import Rent from "../../../assets/ShopByCategory/Rent.svg";
import Transportation from "../../../assets/ShopByCategory/transportation.svg";
import Tires from "../../../assets/ShopByCategory/Tires.svg";
import { Link } from "react-router-dom";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

function ShopByCategory() {
  return (
    <section className="py-8">
      <div className="container max-w-screen-xl lg:w-[90%] mx-auto px-5">
        <h2 className="text-center text-3xl font-bold uppercase">Shop By Category</h2>
        <div className="grid grid-cols-12 mt-10">
          <div className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3 p-3">
            <div className="bg-headerColor rounded-xl p-3 shadow-lg">
              <div className="flex items-center gap-5">
                <img src={Maintenance} alt="Maintenance" />
                <h3 className="text-2xl font-bold text-socend ">Maintenance</h3>
              </div>
              <p className="text-[15px] mt-4 text-blackColor">
                There are many variations of passages of Lorem Ipsum available
              </p>
            </div>
          </div>
          <div className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3 p-3">
            <div className="bg-headerColor rounded-xl p-3 shadow-lg">
              <div className="flex items-center gap-5">
                <img src={Modernization} alt="Modernization" />
                <h3 className="text-2xl font-bold text-socend ">
                  Modernization
                </h3>
              </div>
              <p className="text-[15px] mt-4 text-blackColor">
                The building opened in 2020 and includes more than 120+ flats
              </p>
            </div>
          </div>
          <div className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3 p-3">
            <div className="bg-headerColor rounded-xl p-3 shadow-lg">
              <div className="flex items-center gap-5">
                <img src={Rent} alt="Rent" />
                <h3 className="text-2xl font-bold text-socend ">Rent</h3>
              </div>
              <p className="text-[15px] mt-4 text-blackColor">
                There are many variations of passages of Lorem Ipsum available
              </p>
            </div>
          </div>
          <div className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3 p-3">
            <div className="bg-headerColor rounded-xl p-3 shadow-lg">
              <div className="flex items-center gap-5">
                <img src={Rent} alt="Rent" />
                <h3 className="text-2xl font-bold text-socend ">Rent</h3>
              </div>
              <p className="text-[15px] mt-4 text-blackColor">
                There are many variations of passages of Lorem Ipsum available
              </p>
            </div>
          </div>
          <div className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3 p-3">
            <div className="bg-headerColor rounded-xl p-3 shadow-lg">
              <div className="flex items-center gap-5">
                <img src={Transportation} alt="Transportation" />
                <h3 className="text-2xl font-bold text-socend ">
                  Transportation
                </h3>
              </div>
              <p className="text-[15px] mt-4 text-blackColor">
                There are many variations of passages of Lorem Ipsum available
              </p>
            </div>
          </div>
          <div className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3 p-3">
            <div className="bg-headerColor rounded-xl p-3 shadow-lg">
              <div className="flex items-center gap-5">
                <img src={Tires} alt="Tires" />
                <h3 className="text-2xl font-bold text-socend ">Tires</h3>
              </div>
              <p className="text-[15px] mt-4 text-blackColor">
                There are many variations of passages of Lorem Ipsum available
              </p>
            </div>
          </div>
          <div className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3 p-3">
            <div className="bg-headerColor rounded-xl p-3 shadow-lg">
              <div className="flex items-center gap-5">
                <img src={Tires} alt="Tires" />
                <h3 className="text-2xl font-bold text-socend ">Tires</h3>
              </div>
              <p className="text-[15px] mt-4 text-blackColor">
                There are many variations of passages of Lorem Ipsum available
              </p>
            </div>
          </div>
          <div className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3 p-3 flex items-center justify-center">
            <div className="">
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
  );
}

export default ShopByCategory;
