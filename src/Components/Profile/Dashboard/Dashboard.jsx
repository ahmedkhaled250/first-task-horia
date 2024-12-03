import React from 'react'
import logo1 from "../../../assets/dashboard/log1.svg"
import logo2 from "../../../assets/dashboard/logo2.png"
import logo3 from "../../../assets/dashboard/logo3.png"
import logo4 from "../../../assets/dashboard/logo4.png"
import logo5 from "../../../assets/dashboard/logo5.png"
import { FaChevronDown, FaRegStar, FaStar } from 'react-icons/fa'
function Dashboard() {

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

  return (
    <div className="">
      <div className="grid grid-cols-6 gap-5">
        <div className="col-span-full md:col-span-3 xl:col-span-2">
          <div className="flex items-center gap-5 p-5 bg-[#FFEEE8]">
            <div className="p-3 bg-white">
              <img src={logo1} alt="logo1" />
            </div>
            <div className="">
              <p className="text-xl text-black">957</p>
              <p className="text-sm text-textbody">Visitors</p>
            </div>
          </div>
        </div>
        <div className="col-span-full md:col-span-3 xl:col-span-2">
          <div className="flex items-center gap-5 p-5 bg-[#FFEEE8]">
            <div className="p-3 bg-white">
              <img src={logo2} alt="logo2" />
            </div>
            <div className="">
              <p className="text-xl text-black">952</p>
              <p className="text-sm text-textbody">
                percentage of repeat visits
              </p>
            </div>
          </div>
        </div>
        <div className="col-span-full md:col-span-3 xl:col-span-2">
          <div className="flex items-center gap-5 p-5 bg-[#FFEEE8]">
            <div className="p-3 bg-white">
              <img src={logo3} alt="logo3" />
            </div>
            <div className="">
              <p className="text-xl text-black">5</p>
              <p className="text-sm text-textbody">
                {" "}
                products with the most visits.
              </p>
            </div>
          </div>
        </div>
        <div className="col-span-full md:col-span-3 xl:col-span-2">
          <div className="flex items-center gap-5 p-5 bg-[#FFEEE8]">
            <div className="p-3 bg-white">
              <img src={logo4} alt="logo4" />
            </div>
            <div className="">
              <p className="text-xl text-black">51, 429</p>
              <p className="text-sm text-textbody">Total Commends</p>
            </div>
          </div>
        </div>
        <div className="col-span-full md:col-span-3 xl:col-span-2">
          <div className="flex items-center gap-5 p-5 bg-[#FFEEE8]">
            <div className="p-3 bg-white">
              <img src={logo5} alt="logo5" />
            </div>
            <div className="">
              <p className="text-xl text-black">241</p>
              <p className="text-sm text-textbody">
                number of requests to display contact information
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 lg:w-2/3">
        <div className="flex items-center justify-between py-4 lg:px-4 border-b">
          <p>Products Rating</p>
          <button className="flex items-center gap-2 outline-none">
            This week <FaChevronDown />
          </button>
        </div>

        <div className="grid grid-cols-6 gap-5 xl:gap-10 py-4 lg:px-4 border-b">
          <div className="col-span-3">
            <div className="py-10 rounded-md bg-profileColor text-center">
              <p className="text-4xl font-bold text-main">0</p>
              <p
                className={`py-4 flex items-center justify-center gap-1 md:gap-3 text-main md:text-lg lg:text-xl`}
              >
                {displayRating(0)}
              </p>
              <p className="font-medium text-black">Overall Rating</p>
            </div>
          </div>
        </div>

        <div className="py-4 lg:px-4">
          <div className="size-full rounded-md flex items-center">
            <div className="flex text-main flex-col justify-between md:text-lg lg:text-xl size-full">
              <div className="flex items-center justify-between gap-2 md:gap-0">
                <div className="w-3/5 lg:w-3/5 bg-product h-2 rounded-full">
                  <div className="w-[45%] bg-main h-full rounded-full"></div>
                </div>

                <div className="flex items-center w-2/5 lg:w-2/5 justify-end gap-1 lg:gap-2">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <p className="font-medium">45%</p>
                </div>
              </div>

              <div className="flex items-center justify-between gap-2 md:gap-0">
                <div className="w-3/5 lg:w-3/5 bg-product h-2 rounded-full">
                  <div className="w-[30%] bg-main h-full rounded-full"></div>
                </div>
                <div className="flex items-center w-2/5 lg:w-2/5 justify-end gap-1 lg:gap-2">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <p className="font-medium">30%</p>
                </div>
              </div>

              <div className="flex items-center justify-between gap-2 md:gap-0">
                <div className="w-3/5 lg:w-3/5 bg-product h-2 rounded-full">
                  <div className="w-[10%] bg-main h-full rounded-full"></div>
                </div>
                <div className="flex items-center w-2/5 lg:w-2/5 justify-end gap-1 lg:gap-2">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <p className="font-medium">10%</p>
                </div>
              </div>

              <div className="flex items-center justify-between gap-2 md:gap-0">
                <div className="w-3/5 lg:w-3/5 bg-product h-2 rounded-full">
                  <div className="w-[10%] bg-main h-full rounded-full"></div>
                </div>
                <div className="flex items-center w-2/5 lg:w-2/5 justify-end gap-1 lg:gap-2">
                  <FaStar />
                  <FaStar />
                  <p className="font-medium">10%</p>
                </div>
              </div>

              <div className="flex items-center justify-between gap-2 md:gap-0">
                <div className="w-3/5 lg:w-3/5 bg-product h-2 rounded-full">
                  <div className="w-[5%] bg-main h-full rounded-full"></div>
                </div>
                <div className="flex items-center w-2/5 lg:w-2/5 justify-end gap-1 lg:gap-2">
                  <FaStar />
                  <p className="font-medium">5%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard
