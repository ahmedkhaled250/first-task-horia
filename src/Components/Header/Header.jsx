import React from "react";
import mainHeader from "../../assets/mainHeader.jpeg"; // Import the image properly
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";

function Header({ nameComponent, header }) {
  return (
    <section
      style={{ backgroundImage: `url(${(mainHeader)})` }}
      className={`h-[70vh] bg-cover bg-center `}
    >
      <div className=" flex items-center justify-center size-full bg-headerBgColor bg-opacity-80">
        <div className="text-white text-center ">
          <h2 className="text-4xl font-bold">{header}</h2>
          <p className="flex items-center justify-center gap-3 font-light mt-1">
            <Link to="/">Home</Link> <MdOutlineKeyboardDoubleArrowRight />
            <span>{nameComponent}</span>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Header;
