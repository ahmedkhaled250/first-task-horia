import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { VscThreeBars } from "react-icons/vsc";
import { UserContext } from "../../../Context/UserContext";

const Category = () => {
 return <ul className="flex items-center gap-5 text-lg font-medium ">
    <li>
      <Link to="category" className="hover:text-main duration-300">
        Display category
      </Link>
    </li>
    <li>
      <Link to="addcategory" className="hover:text-main duration-300">
        Create category
      </Link>
    </li>
    <li>
      <Link to="updatecategory" className="hover:text-main duration-300">
        Update category
      </Link>
    </li>
  </ul>;
};
const Subcategory = () => {
 return (
   <ul className="flex items-center gap-5 text-lg font-medium ">
     <li>
       <Link to="subcategory" className="hover:text-main duration-300">
         Display subcategory
       </Link>
     </li>
     <li>
       <Link to="addsubcategory" className="hover:text-main duration-300">
         Create subcategory
       </Link>
     </li>
     <li>
       <Link to="updatesubcategory" className="hover:text-main duration-300">
         Update subcategory
       </Link>
     </li>
   </ul>
 );
};
const Brand = () => {
 return (
   <ul className="flex items-center gap-5 text-lg font-medium ">
     <li>
       <Link to="brand" className="hover:text-main duration-300">
         Display brand
       </Link>
     </li>
     <li>
       <Link to="addbrand" className="hover:text-main duration-300">
         Create brand
       </Link>
     </li>
     <li>
       <Link to="updatebrand" className="hover:text-main duration-300">
         Update brand
       </Link>
     </li>
   </ul>
 );
};
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { avatar } = useContext(UserContext);

  //   const navigate = useNavigate();
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const { pathname } = useLocation();

  const activeLinkClasses = ({ type = null } = {}) => {
    // let subPage;
    // if (pathname == "/") {
    //   subPage = "home";
    // } else {
    //   subPage = pathname.split("/")[1];
    // }
    // let classes = "text-lg duration-100 font-bold";
    // if (type == subPage) {
    //   classes += "text-main";
    // } else {
    //   classes += "hover:text-main";
    // }
    // return classes;
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
    <nav className={`px-5 py-4 flex md:block w-full bg-white`}>
      <div className="container mx-auto px-5 flex gap-5 lg:flex-row items-start lg:items-center justify-between">
        {/* {pathname.includes("subcategory") ? (
          <Subcategory />
        ) : pathname.includes("brand") ? (
          <Brand />
        ) : (
          pathname.includes("category") && <Category />
        )} */}
              <h2 className="text-xl">Welcome, Dashboard</h2>

        <div className="size-12 rounded-full overflow-hidden">
          <img src={avatar} alt="avatar" />
        </div>
        <button className="lg:hidden" onClick={() => toggleNavbar()}>
          <VscThreeBars className="text-3xl" />
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
