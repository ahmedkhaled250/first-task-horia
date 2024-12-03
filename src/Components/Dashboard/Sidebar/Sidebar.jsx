import React, { useContext } from "react";
import { IoIosLogOut } from "react-icons/io";
import { NavLink, useNavigate } from "react-router-dom";
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
  return (
    <div className="w-[20vw] h-screen bg-gray-900 text-white">
      <h2 className="text-4xl font-bold text-main p-5 border-b-2 border-gray-700">
        Mnawla
      </h2>
      <ul className="flex flex-col text-lg font-medium gap-1 my-3">
        <li>
          <NavLink
            className="hover:bg-main duration-300 py-2 px-5 w-full block"
            to=""
          >
            Profile
          </NavLink>
        </li>
        <li>
          <NavLink
            className="hover:bg-main duration-300 py-2 px-5 w-full block"
            to="category"
          >
            Category
          </NavLink>
        </li>
        <li>
          <NavLink
            className="hover:bg-main duration-300 py-2 px-5 w-full block"
            to="subcategory"
          >
            Subcategory
          </NavLink>
        </li>
        <li>
          <NavLink
            className="hover:bg-main duration-300 py-2 px-5 w-full block"
            to="brand"
          >
            Brand
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
  );
}

export default Sidebar;
