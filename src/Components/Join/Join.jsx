import React from "react";
import join from "../../assets/join/join.svg";
function Join() {
  return (
    <section className="shadow-lg">
      <div className="container mx-auto px-10 lg:w-full lg:px-0 lg:mx-0">
        <div className="grid grid-cols-12">
          <div className="hidden lg:block lg:col-span-6">
            <img src={join} alt="join" />
          </div>
          <div className="col-span-12 lg:col-span-6 flex flex-col justify-center gap-3 px-10 py-10 lg:py-0">
            <h3 className="text-xl font-bold mb-2 text-main text-center">
              Join
            </h3>
            <form
              className="text-socend gap-x-10 grid grid-cols-12"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="col-span-12 md:col-span-6">
                <label className="font-medium ">First Name</label>
                <input
                  type="text"
                  placeholder="First Name"
                  className="mt-1 mb-3  bg-white font-medium outline-none shadow-2xl py-1 px-3 w-full"
                />
                <label className="font-medium ">E-mail Address</label>
                <input
                  type="text"
                  placeholder="E-mail Address"
                  className="mt-1 mb-3  bg-white font-medium outline-none shadow-2xl py-1 px-3 w-full"
                />
              </div>
              <div className="col-span-12 md:col-span-6">
                <label className="font-medium ">Password</label>
                <input
                  type="password"
                  placeholder="Password"
                  className="mt-1 mb-3  bg-white font-medium outline-none shadow-2xl py-1 px-3 w-full"
                />
                <label className="font-medium ">Phone Number</label>
                <input
                  type="text"
                  placeholder="+1 (555) 000-0000"
                  className="mt-1 mb-3  bg-white font-medium outline-none shadow-2xl py-1 px-3 w-full"
                />
              </div>
              <div className="col-span-12 lg:col-span-6 flex flex-col md:flex-row items-start md:items-center   lg:items-start justify-start md:justify-center lg:justify-start  gap-0 md:gap-10 lg:gap-0 lg:flex-col ">
                <div className="w-full md:w-1/2 lg:w-full">
                  <label className="font-medium ">Choose</label>
                  <select
                    id="select"
                    className="mt-1 mb-3 bg-white font-medium outline-none shadow-2xl py-1 px-3 w-full"
                  >
                    <option value="" disabled>
                      Select an option
                    </option>
                    <option value="CompanySeller">Company seller</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                    <option value="option4">Option 4</option>
                  </select>
                </div>
                <button className="w-full md:w-1/2  text-white font-medium bg-main rounded-lg hover:bg-[#ffb13b] duration-300 py-2 px-4">
                  Join
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Join;
