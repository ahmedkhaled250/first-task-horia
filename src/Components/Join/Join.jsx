import React from "react";
import join from "../../assets/join/join.svg";

function Join() {
  return (
    <section className="shadow-lg">
      <div className="grid grid-cols-12 px-5 sm:px-10 lg:px-0">
        {/* Left Side (Image) */}
        <div className="hidden lg:block lg:col-span-6">
          <img src={join} alt="join" className="w-full h-auto" />
        </div>

        {/* Right Side (Form) */}
        <div className="col-span-12 lg:col-span-6 flex flex-col justify-center gap-6 px-5 py-10 lg:py-0">
          <h3 className="text-xl font-bold mb-3 text-main text-center lg:text-left">
            Join
          </h3>
          <form
            className="text-socend gap-y-6 grid grid-cols-12 w-full"
            onSubmit={(e) => e.preventDefault()}
          >
            {/* First Column: First Name and Email */}
            <div className="col-span-12 md:col-span-6">
              <label className="font-medium text-sm md:text-base">
                First Name
              </label>
              <input
                type="text"
                placeholder="First Name"
                className="mt-1 mb-3 bg-white font-medium outline-none shadow-2xl py-2 px-3 w-full"
              />
              <label className="font-medium text-sm md:text-base">
                E-mail Address
              </label>
              <input
                type="text"
                placeholder="E-mail Address"
                className="mt-1 mb-3 bg-white font-medium outline-none shadow-2xl py-2 px-3 w-full"
              />
            </div>

            {/* Second Column: Password and Phone Number */}
            <div className="col-span-12 md:col-span-6">
              <label className="font-medium text-sm md:text-base">
                Password
              </label>
              <input
                type="password"
                placeholder="Password"
                className="mt-1 mb-3 bg-white font-medium outline-none shadow-2xl py-2 px-3 w-full"
              />
              <label className="font-medium text-sm md:text-base">
                Phone Number
              </label>
              <input
                type="text"
                placeholder="+1 (555) 000-0000"
                className="mt-1 mb-3 bg-white font-medium outline-none shadow-2xl py-2 px-3 w-full"
              />
            </div>

            {/* Third Column: Choose and Submit Button */}
            <div className="col-span-12 lg:col-span-6 flex flex-col gap-4 md:flex-row items-start md:items-center lg:items-start justify-start md:justify-center lg:justify-start">
              <div className="w-full md:w-1/2 lg:w-full">
                <label className="font-medium text-sm md:text-base">
                  Choose
                </label>
                <select
                  id="select"
                  className="mt-1 mb-3 bg-white font-medium outline-none shadow-2xl py-2 px-3 w-full"
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

              <button className="w-full md:w-1/2 text-white font-medium bg-main rounded-lg hover:bg-[#ffb13b] duration-300 py-2 px-4">
                Join
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Join;
