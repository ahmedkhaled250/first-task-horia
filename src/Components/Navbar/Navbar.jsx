import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { VscThreeBars } from "react-icons/vsc";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };
  const { pathname } = useLocation();
  const activeLinkClasses = ({ type = null } = {}) => {
    let subPage;
    if (pathname == "/") {
      subPage = "home";
    } else {
      subPage = pathname.split("/")[1];
    }

    let classes = "text-lg duration-100 font-bold ";
    if (type == subPage) {
      classes += "text-main";
      console.log(classes);
    } else {
      classes += "hover:text-main";
      console.log(classes);
    }
    return classes;
  };

  return (
    <nav className="bg-transparent px-5 py-4 flex md:block absolute  top-0 left-0 w-full">
      <div className="container  mx-auto px-5 flex gap-5 lg:flex-row items-start lg:items-center justify-between">
        <div className="">
          <NavLink className="text-main text-3xl font-bold" to="/">
            Mnawla
          </NavLink>
          <ul
            id="list"
            className={`${
              isOpen ? "flex" : "hidden"
            } lg:hidden flex-col items-start gap-3 mt-3`}
          >
            <li id="menu">
              <NavLink
                className={activeLinkClasses({ type: "home" })}
                onClick={() => toggleNavbar()}
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li id="menu">
              <NavLink
                className={activeLinkClasses({ type: "services" })}
                onClick={() => toggleNavbar()}
                to="/services"
              >
                Services
              </NavLink>
            </li>
            <li id="menu">
              <NavLink
                className={activeLinkClasses({ type: "blogs" })}
                onClick={() => toggleNavbar()}
                to="/blogs"
              >
                Blogs
              </NavLink>
            </li>
            <li id="menu">
              <NavLink
                className={activeLinkClasses({ type: "pricing" })}
                onClick={() => toggleNavbar()}
                to="/pricing"
              >
                Pricing
              </NavLink>
            </li>
            <li id="menu">
              <NavLink
                className={activeLinkClasses({ type: "about" })}
                onClick={() => toggleNavbar()}
                to="/about"
              >
                About US
              </NavLink>
            </li>
            <li id="menu">
              <NavLink
                className={activeLinkClasses({ type: "contact" })}
                onClick={() => toggleNavbar()}
                to="/contact"
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </div>
        <ul
          id="list"
          className={`hidden lg:flex flex-col lg:flex-row items-start lg:items-center gap-5  xl:gap-10 2xl:gap-14`}
        >
          <li id="menu">
            <NavLink
              className={activeLinkClasses({ type: "home" })}
              onClick={() => toggleNavbar()}
              to="/"
            >
              Home
            </NavLink>
          </li>
          <li id="menu">
            <NavLink
              className={activeLinkClasses({ type: "services" })}
              onClick={() => toggleNavbar()}
              to="/services"
            >
              Services
            </NavLink>
          </li>
          <li id="menu">
            <NavLink
              className={activeLinkClasses({ type: "blogs" })}
              onClick={() => toggleNavbar()}
              to="/blogs"
            >
              Blogs
            </NavLink>
          </li>
          <li id="menu" className>
            <NavLink
              className={activeLinkClasses({ type: "pricing" })}
              onClick={() => toggleNavbar()}
              to="/pricing"
            >
              Pricing
            </NavLink>
          </li>
          <li id="menu" className>
            <NavLink
              className={activeLinkClasses({ type: "about" })}
              onClick={() => toggleNavbar()}
              to="/about"
            >
              About US
            </NavLink>
          </li>
          <li id="menu" className>
            <NavLink
              className={activeLinkClasses({ type: "contact" })}
              onClick={() => toggleNavbar()}
              to="/contact"
            >
              contact
            </NavLink>
          </li>
        </ul>
        <div className=" flex items-center gap-3">
          <button className="bg-main text-white rounded-md py-1 px-5 border-2 border-transparent hover:bg-[#fdb446] duration-300">
            Sign In
          </button>
          <button className="bg-transparent text-main rounded-md py-1 px-5 border-2 border-main hover:border-transparent hover:bg-main hover:text-white duration-300">
            Register
          </button>
          <button className="lg:hidden" onClick={() => toggleNavbar()}>
            <VscThreeBars className="text-4xl" />
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
