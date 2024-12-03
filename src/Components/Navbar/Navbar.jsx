import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { VscThreeBars } from "react-icons/vsc";
import { UserContext } from "../../Context/UserContext";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { token, setToken, setUserData } = useContext(UserContext);

  const navigate = useNavigate();
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
    let classes = "text-lg duration-100 font-bold";
    if (type == subPage) {
      classes += "text-main";
    } else {
      classes += "hover:text-main";
    }
    return classes;
  };

  const logout = () => {
    localStorage.clear();
    setToken(null);
    setUserData(null);
    navigate("/login");
  };

  // Handle the scroll event
  const handleScroll = () => {
    if (window.scrollY > 0) {
      // Adjust this value based on when you want to add the background
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  // Add event listener for scroll when component mounts
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`${
        scrolled
          ? "bg-headerColor"
          : ` ${
              isOpen ? "bg-headerColor lg:bg-transparent" : "bg-transparent"
            }  ${
              pathname == "/" ||
              pathname == "/home" ||
              pathname.includes("/profile") ||
              pathname.includes("/product/")
                ? ""
                : `${isOpen ? "lg:text-white" : "text-white"} `
            }`
      } px-5 py-4 flex md:block fixed z-50 top-0 left-0 w-full`}
    >
      <div className="container  mx-auto px-5 flex gap-5 lg:flex-row items-start lg:items-center justify-between">
        <div className="">
          <NavLink
            className="text-main text-xl md:text-3xl  outline-none font-bold"
            to="/"
          >
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
                className={` ${activeLinkClasses({
                  type: "home",
                })} outline-none`}
                onClick={() => toggleNavbar()}
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li id="menu">
              <NavLink
                className={` ${activeLinkClasses({
                  type: "category",
                })} outline-none`}
                onClick={() => toggleNavbar()}
                to="/category"
              >
                Categories
              </NavLink>
            </li>
            <li id="menu">
              <NavLink
                className={` ${activeLinkClasses({
                  type: "profile",
                })} outline-none`}
                onClick={() => toggleNavbar()}
                to="/profile"
              >
                Profile
              </NavLink>
            </li>
            <li id="menu">
              <NavLink
                className={` ${activeLinkClasses({
                  type: "products",
                })} outline-none`}
                onClick={() => toggleNavbar()}
                to="/products"
              >
                Products
              </NavLink>
            </li>
            <li id="menu">
              <NavLink
                className={` ${activeLinkClasses({
                  type: "about",
                })} outline-none`}
                onClick={() => toggleNavbar()}
                to="/about"
              >
                About US
              </NavLink>
            </li>
            <li id="menu">
              <NavLink
                className={` ${activeLinkClasses({
                  type: "contact",
                })} outline-none`}
                onClick={() => toggleNavbar()}
                to="/contact"
              >
                Contact
              </NavLink>
            </li>
            {token ? (
              <button
                onClick={logout}
                className="bg-transparent text-main rounded-md py-1 px-3 md:px-5 border-2 border-main hover:border-transparent hover:bg-main hover:text-white duration-300"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="lg:hidden bg-main text-white rounded-md py-1 px-3 md:px-5 border-2 border-transparent hover:bg-[#fdb446] duration-300"
                >
                  Sign In
                </Link>
                <Link
                  to="/subscribtionPlan"
                  className="lg:hidden bg-transparent text-main rounded-md py-1 px-3 md:px-5 border-2 border-main hover:border-transparent hover:bg-main hover:text-white duration-300"
                >
                  Register
                </Link>
              </>
            )}
          </ul>
        </div>
        <ul
          id="list"
          className={`hidden lg:flex flex-col lg:flex-row items-start lg:items-center gap-5  xl:gap-10 2xl:gap-14`}
        >
          <li id="menu">
            <NavLink
              className={` ${activeLinkClasses({ type: "home" })} outline-none`}
              onClick={() => toggleNavbar()}
              to="/"
            >
              Home
            </NavLink>
          </li>
          <li id="menu">
            <NavLink
              className={` ${activeLinkClasses({
                type: "category",
              })} outline-none`}
              onClick={() => toggleNavbar()}
              to="/category"
            >
              Categories
            </NavLink>
          </li>
          <li id="menu">
            <NavLink
              className={` ${activeLinkClasses({
                type: "profile",
              })} outline-none`}
              onClick={() => toggleNavbar()}
              to="/profile"
            >
              Profile
            </NavLink>
          </li>
          <li id="menu">
            <NavLink
              className={` ${activeLinkClasses({
                type: "products",
              })} outline-none`}
              onClick={() => toggleNavbar()}
              to="/products"
            >
              Products
            </NavLink>
          </li>
          <li id="menu">
            <NavLink
              className={` ${activeLinkClasses({
                type: "about",
              })} outline-none`}
              onClick={() => toggleNavbar()}
              to="/about"
            >
              About US
            </NavLink>
          </li>
          <li id="menu">
            <NavLink
              className={` ${activeLinkClasses({
                type: "contact",
              })} outline-none`}
              onClick={() => toggleNavbar()}
              to="/contact"
            >
              contact
            </NavLink>
          </li>
        </ul>
        <div className="hidden lg:flex items-center gap-3">
          {token ? (
            <Link
              onClick={logout}
              className="bg-transparent text-main rounded-md py-1 px-3 md:px-5 border-2 border-main hover:border-transparent hover:bg-main hover:text-white duration-300"
            >
              Logout
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-main text-white rounded-md py-1 px-3 md:px-5 border-2 border-transparent hover:bg-[#fdb446] duration-300"
              >
                Sign In
              </Link>
              <Link
                to="/subscribtionPlan"
                className="bg-transparent text-main rounded-md py-1 px-3 md:px-5 border-2 border-main hover:border-transparent hover:bg-main hover:text-white duration-300"
              >
                Register
              </Link>
            </>
          )}
        </div>
        <button className="lg:hidden" onClick={() => toggleNavbar()}>
          <VscThreeBars className="text-3xl" />
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
