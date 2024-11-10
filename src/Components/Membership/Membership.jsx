import React from "react";
import { FaArrowRight } from "react-icons/fa6";
import { FaArrowDown } from "react-icons/fa6";
import AddFriend from "../../assets/Membership/AddFriend.svg"
import Vector from "../../assets/Membership/Vector.svg";
import connect from "../../assets/Membership/connect.svg";
function Membership() {
  return (
    <section className="py-8 bg-headerColor">
      <div className=" container lg:w-[80%] mx-auto px-5 ">
        <div className="text-socend text-center text-sm w-full lg:w-2/3 lg:mx-auto">
          <h3 className="text-2xl mb-2">
            Register your membership <br /> and start advertising now
          </h3>
          <p>
            The best platform for buying, selling and renting heavy equipment at
            reasonable prices throughout the Republic.
          </p>
        </div>
        <div className=" flex gap-10 lg:gap-0 flex-col items-center justify-center lg:grid grid-cols-12 my-10">
          <div className="w-1/2 lg:col-span-2">
                      <img src={AddFriend} className="w-full md:w-1/2 lg:w-full mx-auto" alt="AddFriend" />
            <p className="text-lg font-semibold text-center mt-4 text-socend">
              Register your membership
            </p>
          </div>
          <div className="w-1/2 lg:col-span-1"></div>
          <div className="w-1/2 lg:col-span-1 text-socend flex items-center justify-center text-6xl">
            <FaArrowRight className="hidden lg:block" />
            <FaArrowDown className="lg:hidden" />
          </div>
          <div className="w-1/2 lg:col-span-1"></div>
          <div className="w-1/2 lg:col-span-2">
            <img src={Vector} className="w-full md:w-1/2 lg:w-full mx-auto" alt="Vector" />
            <p className="text-lg font-semibold text-center mt-4 text-socend">
              Add your ads
            </p>
          </div>
          <div className="w-1/2 lg:col-span-1"></div>
          <div className="w-1/2 lg:col-span-1 text-socend flex items-center justify-center text-6xl">
            <FaArrowRight className="hidden lg:block" />
            <FaArrowDown className="lg:hidden" />
          </div>
          <div className="w-1/2 lg:col-span-1"></div>
          <div className="w-1/2 lg:col-span-2">
            <img src={connect} className="w-full md:w-1/2 lg:w-full mx-auto" alt="connect" />
            <p className="text-lg font-semibold text-center mt-4 text-socend">
              Connect with clients
            </p>
          </div>
        </div>
        <button className=" flex items-center gap-3 text-sm text-white bg-main rounded-xl py-2 mx-auto px-4">
          Price plans and subscriptions <FaArrowRight />
        </button>
      </div>
    </section>
  );
}

export default Membership;
