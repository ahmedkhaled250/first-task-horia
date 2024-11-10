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
    <header className="bg-headerColor h-auto lg:h-screen flex items-center justify-center py-10">
      <div className="container lg:w-[90%] max-w-screen-xl mx-auto px-5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Side */}
          <div className="col-span-1 lg:col-span-6 flex flex-col justify-center gap-7">
            <h1 className="text-3xl md:text-4xl lg:text-5xl text-center lg:text-left font-medium md:font-semibold lg:font-bold text-main">
              <span className="text-socend">Top Quality</span> Building <br />
              Materials <span className="text-socend">for Every Project</span>
            </h1>

            {/* Search Section */}
            <div className="relative py-8 lg:py-16">
              <div className="lg:absolute flex items-center justify-center gap-2 lg:gap-10 w-fit px-4 lg:px-5 bg-white top-1/2 -translate-y-1/2 left-0 py-2 rounded-md">
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
                <div className="flex items-center gap-3">
                  <button className="bg-transparent rounded-md text-sm lg:text-[16px] py-1 px-3 lg:px-5 border-2 hover:border-transparent hover:bg-main hover:text-white duration-300">
                    Filter
                  </button>
                  <button className="bg-main text-white rounded-md text-sm lg:text-[16px] py-1 px-3 lg:px-5 border-2 border-transparent hover:bg-[#fdb446] duration-300">
                    Search
                  </button>
                </div>
              </div>
            </div>

            {/* Popular Search */}
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-sm lg:text-base">Popular Search</span>
              <button
                onClick={activeModernLink}
                className={`${
                  activeModern
                    ? "bg-main text-white border-none"
                    : "text-button border-2 bg-white"
                } rounded-3xl hover:text-white hover:bg-main duration-300 hover:border-none text-sm lg:text-base p-2`}
              >
                Modern Villa
              </button>
              <button
                onClick={activestudioLink}
                className={`${
                  activestudio
                    ? "bg-main text-white border-none"
                    : "text-button border-2 bg-white"
                } rounded-3xl hover:text-white hover:bg-main duration-300 hover:border-none text-sm lg:text-base p-2`}
              >
                Studio Apartment
              </button>
              <button
                onClick={activeTownLink}
                className={`${
                  activeTowns
                    ? "bg-main text-white border-none"
                    : "text-button border-2 bg-white"
                } rounded-3xl hover:text-white hover:bg-main duration-300 hover:border-none text-sm lg:text-base p-2`}
              >
                Town House
              </button>
            </div>
          </div>

          {/* Right Side - Images */}
          <div className="hidden lg:block lg:col-span-6">
            <div className="flex flex-wrap mt-8 lg:mt-16">
              <div className="w-full lg:w-1/2 lg:pr-4 mb-4 lg:mb-0">
                <img src={header1} className="w-full" alt="Header 1" />
              </div>
              <div className="w-full lg:w-1/2 flex flex-col gap-4">
                <img src={header2} className="w-full" alt="Header 2" />
                <img src={header3} className="w-full" alt="Header 3" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
