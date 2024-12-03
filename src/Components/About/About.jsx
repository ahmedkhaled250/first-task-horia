import React, { useState } from "react";
import Header from "../Header/Header";
import team from "../../assets/about/team.jpeg";
import sc_icon from "../../assets/about/sc_icon.png";
import { IoCall } from "react-icons/io5";
import listIcon from "../../assets/about/f_icon.svg";
import hardWork from "../../assets/about/hardWork.jpeg";
import solution from "../../assets/about/solution.jpeg";
import person from "../../assets/about/person.jpeg";
import images from "../../assets/about/images.svg";
function About() {
  const [activeTab, setActiveTab] = useState("mission");

  const handleTabLink = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <Header header="About us" nameComponent="About" />

      <section className="py-8">
        <div className="container px-5 lg:w-[90%] xl:w-[80%] mx-auto">
          <div className="grid gap-5 grid-cols-12">
            <div className="col-span-12 lg:col-span-6">
              <div className="p-2  items-center gap-3">
                <img src={sc_icon} alt="sc_icon" />
                <p className=" text-main ">About Our Company</p>
              </div>
              <h2 className="text-black text-4xl font-bold">
                A team of reliable and experienced Contractors
              </h2>
              <p className="py-7">
                Ipsam voluptatem quia voluptas sit aspernatur aut odit aut
                fugit, sed quia sit consequuntur magni dolores eos qui ratione
                voluptatem sequi nesciunt. am Neque porro dolor set quisquam
                est, qui dolorem ipsum quia dolor sit amet, consectetur,
                adipisci velit, sed quia non numquam
              </p>
              <div className="border-b-2">
                <ul className=" flex items-center justify-start gap-2">
                  <li>
                    <button
                      onClick={() => handleTabLink("mission")}
                      className={`${
                        activeTab === "mission"
                          ? "text-white bg-main"
                          : "bg-gray-300 text-black"
                      }  py-2 px-3 lg:px-5 rounded-lg rext-xl font-medium`}
                    >
                      Our Mission
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleTabLink("vission")}
                      className={`${
                        activeTab === "vission"
                          ? "text-white bg-main"
                          : "bg-gray-300 text-black"
                      }  py-2 px-3 lg:px-5 rounded-lg rext-xl font-medium`}
                    >
                      Our Vision
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleTabLink("value")}
                      className={`${
                        activeTab === "value"
                          ? "text-white bg-main"
                          : "bg-gray-300 text-black"
                      }  py-2 px-3 lg:px-5 rounded-lg rext-xl font-medium`}
                    >
                      Our Value
                    </button>
                  </li>
                </ul>
                <div>
                  {activeTab === "mission" && (
                    <div className="py-4">
                      <p className="px-4 border-l-2 border-main">
                        An IT firm or MSP who keeps your IT running smoothly at
                        all times is like a plumber who fixes your pipes; that’s
                        what they are supposed to do. Many IT firms struggle to
                        keep themselves and their IT from falling apart. We’ve
                        raised
                      </p>
                    </div>
                  )}
                  {activeTab === "vission" && (
                    <div className="py-4">
                      <p className="px-4 border-l-2 border-main">
                        An IT firm or MSP who keeps your IT running smoothly at
                        all times is like a plumber who fixes your pipes; that’s
                      </p>
                    </div>
                  )}
                  {activeTab === "value" && (
                    <div className="py-4">
                      <p className="px-4 border-l-2 border-main">
                        An IT firm or MSP who keeps your IT running smoothly at
                        all times is like a plumber who fixes your pipes; that’s
                        what they are supposed to do. Many IT firms struggle to
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex py-5 items-center gap-10">
                <button className="bg-main text-white rounded-md py-3 px-5 hover:bg-[#fdb446] duration-300">
                  Learn more
                </button>
                <div className="flex items-center gap-3">
                  <div className="border-2 border-main rounded-full p-2 lg:p-3">
                    <IoCall className="text-main text-2xl" />
                  </div>
                  <div className="">
                    <p>Want to Discuss:</p>
                    <p className=" text-2xl text-black font-bold">
                      +91(123)56789
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden lg:block col-span-6">
              <img src={team} alt="team" className="w-full" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 bg-[#F7F7F7]">
        <div className="container px-5 lg:w-[90%] xl:w-[80%] mx-auto">
          <div className="grid grid-cols-12">
            <div className="hidden lg:block col-span-6">
              <img src={images} alt="images" className="w-full" />
            </div>
            <div className="col-span-12 lg:col-span-6 ">
              <h3 className="text-2xl text-black font-bold">What We Do!</h3>
              <p className="py-3">
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout
              </p>
              <ul className="flex flex-col gap-2">
                <li className=" flex gap-2">
                  <img src={listIcon} alt="listIcon" /> World Wide Donation
                </li>
                <li className=" flex gap-2">
                  {" "}
                  <img src={listIcon} alt="listIcon" /> Various industrial
                  Applications.
                </li>
                <li className=" flex gap-2">
                  {" "}
                  <img src={listIcon} alt="listIcon" /> Providing Solutions For
                  Construction, Management
                </li>
                <li className=" flex gap-2">
                  {" "}
                  <img src={listIcon} alt="listIcon" /> Engineers design and
                  build the structure
                </li>
              </ul>
              <h3 className="text-2xl text-black font-bold py-3">
                What You Can Do in!
              </h3>
              <ul className="flex flex-col gap-2 mb-3">
                <li className=" flex gap-2">
                  {" "}
                  <img src={listIcon} alt="listIcon" /> World Wide Donation
                </li>
                <li className=" flex gap-2">
                  {" "}
                  <img src={listIcon} alt="listIcon" /> Various industrial
                  Applications.
                </li>
                <li className=" flex gap-2">
                  {" "}
                  <img src={listIcon} alt="listIcon" /> Providing Solutions For
                  Construction, Management
                </li>
                <li className=" flex gap-2">
                  {" "}
                  <img src={listIcon} alt="listIcon" /> Engineers design and
                  build the structure
                </li>
              </ul>
              <button className="bg-main text-white rounded-md py-3 px-5 hover:bg-[#fdb446] duration-300">
                More Explore
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* 
      <section className="py-8">
        <div className="container px-5 lg:w-[90%] xl:w-[80%] mx-auto gap-20">
          <div className="grid grid-cols-12">
            <div className="col-span-12 lg:col-span-6">
              <div className="w-2/3 mx-auto">
                <div className="relative w-full rounded-tl-3xl  overflow-hidden border-b-4 border-main">
                  <div className="absolute bg-black size-full left-0 top-0 bg-opacity-60">
                    <div className="absolute text-white bottom-3 left-1/2 -translate-x-1/2">
                      <p className=" tect-thin">by Post</p>
                      <p className="font-semibold ">buildexo</p>
                    </div>
                  </div>
                  <img className="w-full" src={hardWork} alt="hardWork" />
                  <img
                    src={person}
                    alt="person"
                    className=" absolute -left-8 bottom-0"
                  />
                </div>
                <p className="text-main py-3">
                  Marketing & Strategy / July 17, 2023
                </p>
                <p></p>
              </div>
            </div>
            <div className="col-span-12 lg:col-span-6">
              <div className="relative w-2/3 rounded-tr-3xl mx-auto overflow-hidden border-b-4 border-main">
                <div className="absolute bg-black size-full left-0 top-0 bg-opacity-60">
                  <div className="absolute text-white bottom-3 left-1/2 -translate-x-1/2">
                    <p className=" tect-thin">by Post</p>
                    <p className="font-semibold ">buildexo</p>
                  </div>
                </div>
                <img className="w-full" src={solution} alt="solution" />
                <img
                  src={person}
                  alt="person"
                  className=" absolute -left-8 bottom-0"
                />
              </div>
            </div>
          </div>
        </div>
      </section> */}
    </>
  );
}

export default About;
