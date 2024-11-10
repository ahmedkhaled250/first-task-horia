import React from "react";
import { FaFacebookSquare } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { RiInstagramLine } from "react-icons/ri";

function Footer() {
  return (
    <footer className="bg-headerColor">
      <div className="px-5 container lg:w-[80%] max-w-screen-xl mx-auto py-10">
        <div className="grid grid-cols-12 gap-5">
          <div className="col-span-12 my-3 md:col-span-8 lg:col-span-4 xl:col-span-4 ">
            <h3 className="text-2xl font-bold">mnawla</h3>
            <p className="my-5 font-light">
              Lorem ipsum dolor sit amet, sectetur adipisicing elit, sed do
              eiusmod mpor incididunt ut labore et dolore Lorem ipsum dolor sit
              amet, sectetur adipisicing elit, sed do eiusmod
            </p>
            <div className="flex items-center gap-3">
              <Link className="p-2 rounded-full border-2 border-blackColor hover:text-white hover:bg-blackColor duration-300">
                <FaFacebookSquare />
              </Link>
              <Link className="p-2 rounded-full border-2 border-blackColor hover:text-white hover:bg-blackColor duration-300">
                <FaTwitter />
              </Link>
              <Link className="p-2 rounded-full border-2 border-blackColor hover:text-white hover:bg-blackColor duration-300">
                <FaLinkedinIn />
              </Link>
              <Link className="p-2 rounded-full border-2 border-blackColor hover:text-white hover:bg-blackColor duration-300">
                <RiInstagramLine />
              </Link>
            </div>
          </div>
          <div className="col-span-12 my-3 lg:pr-10 md:col-span-4 lg:col-span-3 xl:col-span-2">
            <h5 className="text-xl border-b-2 w-fit border-blackColor font-bold">
              Quick Link
            </h5>
            <ul className="text-lg flex flex-col gap-2 mt-5">
              <li>
                <Link className="hover:text-main hover:underline duration-100">
                  About
                </Link>
              </li>
              <li>
                <Link className="hover:text-main hover:underline duration-100">
                  Career
                </Link>
              </li>
              <li>
                <Link className="hover:text-main hover:underline duration-100">
                  Contact
                </Link>
              </li>
              <li>
                <Link className="hover:text-main hover:underline duration-100">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-span-12 my-3 lg:pr-10 md:col-span-7  lg:col-span-5 xl:col-span-4 ">
            <h5 className="text-xl border-b-2 w-fit border-blackColor font-bold">
              Contact Info
            </h5>
            <ul className="text-lg flex flex-col gap-2 mt-5">
              <li>
                <span className="font-bold text-main">Address:</span>{" "}
                <span> lorem lorem</span>
              </li>
              <li>
                <span className="font-bold text-main">Email:</span>{" "}
                <span> lorem lorem</span>
              </li>
              <li>
                <span className="font-bold text-main">Phone:</span>{" "}
                <span>+123-456-789</span>
              </li>
              <li>
                <span className="font-bold text-main">Work Time:</span>{" "}
                <span> Mon-Fri:08.00 - 16.00</span>
              </li>
            </ul>
          </div>
          <div className="col-span-12 my-3 md:col-span-5  lg:col-span-12 xl:col-span-2">
            <form
              action=""
              className="flex md:block lg:flex justify-start lg:justify-center items-center gap-5 xl:block"
            >
              <label className="text-xl font-bold">Join Newsletter</label>
              <div className="flex mt-4">
                <input
                  type="email"
                  className="outline-none bg-white rounded-l-full teext-lg py-2 pr-6 pl-4"
                  placeholder="Your email"
                />
                <button className="rounded-full bg-main text-white py-2 px-4 text-lg -translate-x-5 font-semibold">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
