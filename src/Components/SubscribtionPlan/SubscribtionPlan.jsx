import React, { useState } from "react";
import Header from "../Header/Header";
import imageForms from "../../assets/imageForms.jpeg";
import { AiOutlineCaretUp } from "react-icons/ai";
import { AiOutlineCaretDown } from "react-icons/ai";
import { Link } from "react-router-dom";

// import bgForms from "../../assets/bg"
function SubscribtionPlan() {
  const [isOpened, setIsOpend] = useState(false);
  console.log(isOpened);

  return (
    <>
      <Header
        header="join US "
        nameComponent="Price plans and subscriptions "
      />
      <section className="">
        <div className="grid grid-cols-12 px-5 sm:px-10 lg:px-0">
          {/* Left Side (Image) */}
          <div className="hidden lg:block lg:col-span-4">
            <img src={imageForms} alt="imageForms" className="w-full" />
          </div>

          {/* Right Side (Form) */}
          <div className="col-span-12 lg:col-span-8 flex flex-col justify-center py-10 lg:px-20 lg:py-2">
            <div className="flex flex-col items-center justify-center gap-8">
              <h3 className="text-xl font-bold mb-3 text-main text-center">
                just choose one (1)
              </h3>
              <button
                onClick={() => setIsOpend(!isOpened)}
                className={`py-2 w-full border-2 border-main rounded-lg ${
                  isOpened ? "" : ""
                }  duration-300 relative`}
              >
                Trader
                {isOpened ? (
                  <AiOutlineCaretUp className="text-lg absolute top-1/2 -translate-y-1/2 right-10" />
                ) : (
                  <AiOutlineCaretDown className="text-lg absolute top-1/2 -translate-y-1/2 right-10" />
                )}
                <div
                  className={`${
                    isOpened ? "block" : "hidden"
                  } absolute flex flex-col rounded-lg border-2 bg-white top-full border-main w-full text-center`}
                >
                  <Link
                    to="/businessRegister"
                    className="py-3 text-main hover:text-white hover:bg-main font-medium duration-300"
                  >
                    Business
                  </Link>
                  <Link
                    to="/individualRegister"
                    className="py-3 text-main hover:text-white hover:bg-main font-medium duration-300"
                  >
                    Individual
                  </Link>
                </div>
              </button>

              <Link
                to="/customerRegister"
                className="py-2 w-full text-center border-2 border-main rounded-lg "
              >
                costumer
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default SubscribtionPlan;
