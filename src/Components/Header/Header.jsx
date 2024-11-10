import React, { useState } from "react";
import header1 from "../../assets/header-1.png";
import header2 from "../../assets/header-2.png";
import header3 from "../../assets/header-3.png";
import { MdOutlineSearch } from "react-icons/md";

function Header() {
  const [activeTowns, setActiveTowns] = useState(false);
  const [activestudio, setActiveStudio] = useState(false);
  const [activeModern, setActiveModern] = useState(false);
  const activestudioLink = () => {
    setActiveStudio(!activestudio);
  };
  const activeTownLink = () => {
    setActiveTowns(!activeTowns);
  };
  const activeModernLink = () => {
    setActiveModern(!activeModern);
  };
  return (
    <header className="bg-headerColor h-screen flex items-center justify-center">
      <div className="container lg:w-[90%] max-w-screen-xl mx-auto px-5">
        <div className="grid grid-cols-12">
          <div className="col-span-12  flex flex-col justify-center gap-7 lg:col-span-6">
            <h1 className="text-2xl text-center font-medium lg:text-start md:font-semibold md:3xl lg:font-bold xl:text-4xl text-main">
              <span className="text-socend"> Top Quality </span> Building
              <br /> Materials
              <span className="text-socend"> for Every Project </span>
            </h1>
            <div className="relative py-16">
              <div className="lg:absolute translate-x-0 w-full flex items-center justify-center gap-2 lg:gap-10 lg:w-fit px-2 lg:px-5 bg-white top-50 -translate-y-1/2 left-0 py-2 rounded-md">
                <div className="flex flex-col items-start justify-start min-w-fit">
                  <p className="text-[#969696] text-sm md:text-[16px]">
                    Keyword
                  </p>
                  <p className="text-sm md:text-lg">Enter Keyword</p>
                </div>
                <MdOutlineSearch className="text-xl lg:text-4xl" />
                <input
                  type="text"
                  className="outline-0 border-l-2 pl-2 lg:pl-10 text-sm lg:text-xl py-2"
                />
                <div className=" flex items-center gap-1 lg:gap-3">
                  <button className="bg-transparent rounded-md text-sm lg:text-[16px] py-1 px-2 lg:px-5 border-2 hover:border-transparent hover:bg-main hover:text-white duration-300">
                    Filter
                  </button>
                  <button className="bg-main text-white rounded-md text-sm lg:text-[16px] py-1 px-2 lg:px-5 border-2 border-transparent hover:bg-[#fdb446] duration-300">
                    Search
                  </button>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 ">
              <span className="">Popular Search</span>
              <button
                onClick={() => activeModernLink()}
                className={`${
                  activeModern
                    ? "bg-main text-white border-none"
                    : "text-button border-2 bg-white"
                }  rounded-3xl  hover:text-white hover:bg-main duration-300 hover:border-none text-sm  p-1`}
              >
                Modern Villa
              </button>
              <button
                onClick={() => activestudioLink()}
                className={`${
                  activestudio
                    ? "bg-main text-white border-none"
                    : "text-button border-2 bg-white"
                } rounded-3xl  hover:text-white hover:bg-main duration-300 hover:border-none text-sm  p-1`}
              >
                Studio Apartment
              </button>
              <button
                onClick={() => activeTownLink()}
                className={`${
                  activeTowns
                    ? "bg-main text-white border-none"
                    : "text-button border-2 bg-white"
                } rounded-3xl  hover:text-white hover:bg-main duration-300 hover:border-none text-sm  p-1`}
              >
                Town House
              </button>
            </div>
          </div>
          <div className="hidden lg:block lg:col-span-6">
            <div className="flex items-center mt-16">
              <div className="w-1/2 pt-16">
                <img src={header1} className="w-full" alt="Header 1" />
              </div>
              <div className="w-1/2  flex flex-col">
                <div className="flex-none">
                  <img src={header2} className="w-full" alt="Header 2" />
                </div>
                <div className="flex-none">
                  <img src={header3} className="w-full" alt="Header 3" />
                </div>
              </div>
            </div>
            {/* <img className="w-full" src={mainImage} alt="mainImage" /> */}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
