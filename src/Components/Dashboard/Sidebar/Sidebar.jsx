import React, { useContext } from "react";
import { IoIosLogOut } from "react-icons/io";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../../Context/UserContext";

function Sidebar() {
  const { setToken, setUserData } = useContext(UserContext);
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    setToken(null);
    setUserData(null);
    navigate("/login");
  };

  const { pathname } = useLocation();
  console.log(pathname);

  const activeLinkClasses = ({ type = "/dashboard/traderRequests" } = {}) => {
    let subPage;
    if (pathname == "/dashboard" || pathname == "/dashboard/traderRequests") {
      subPage = "traderRequests";
    } else {
      if (pathname.includes("category")) {
        subPage = "category";
      }
      if (pathname.includes("subcategory")) {
        subPage = "subcategory";
      }
      if (pathname.includes("brand")) {
        subPage = "brand";
      }
      if (pathname.includes("productRequests")) {
        subPage = "productRequests";
      }
    }

    let classes = "";
    if (type == subPage) {
      classes += "bg-main";
    } else {
      classes += "";
    }
    return classes;
  };

  return (
    <div className="w-[25vw] h-screen bg-red-700">
      <div className="w-[20vw] h-screen bg-gray-900 text-white fixed top-0 left-0">
        <h2 className="text-4xl font-bold text-main p-5 border-b-2 border-gray-700">
          Mnawla
        </h2>
        <ul className="flex flex-col text-lg font-medium gap-1 my-3">
          <li>
            <NavLink
              className={`hover:bg-main duration-300 py-2 px-5 w-full block ${activeLinkClasses(
                { type: "category" }
              )}`}
              to="category"
            >
              Category
            </NavLink>
          </li>
          <li>
            <NavLink
              className={`hover:bg-main duration-300 py-2 px-5 w-full block ${activeLinkClasses(
                { type: "subcategory" }
              )}`}
              to="subcategory"
            >
              Subcategory
            </NavLink>
          </li>
          <li>
            <NavLink
              className={`hover:bg-main duration-300 py-2 px-5 w-full block ${activeLinkClasses(
                { type: "brand" }
              )}`}
              to="brand"
            >
              Brand
            </NavLink>
          </li>
          <li>
            <NavLink
              className={`hover:bg-main duration-300 py-2 px-5 w-full block ${activeLinkClasses(
                { type: "traderRequests" }
              )}`}
              to="traderRequests"
            >
              Trader
            </NavLink>
          </li>
          <li>
            <NavLink
              className={`hover:bg-main duration-300 py-2 px-5 w-full block ${activeLinkClasses(
                { type: "productRequests" }
              )}`}
              to="productRequests"
            >
              Product
            </NavLink>
          </li>
        </ul>
        <button
          onClick={logout}
          className=" flex items-center gap-2 hover:bg-main px-5 py-2 w-full duration-300"
        >
          <IoIosLogOut />
          Sign-out
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
