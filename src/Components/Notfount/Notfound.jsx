import React from "react";
import notfoundImage from "../../assets/img_404.png"
import Header from "../Header/Header";
import { Link } from "react-router-dom";
function Notfound() {
  return (
    <>
      {/* <Header nameComponent="404 - Not Found" header="404"/> */}
      <section className="py-10 flex flex-col gap-5 items-center justify-center text-center h-screen">
        <img src={notfoundImage} alt="notfoundImage" className="h-2/3" />
        <h3 className="text-2xl font-semibold">Oops! Page Not found.</h3>
        <Link
          to="/"
          className=" py-2 px-4 rounded-lg hover:bg-[#ffad31] duration-300 bg-main text-white"
        >
          back to Home page
        </Link>
      </section>
    </>
  );
}

export default Notfound;
