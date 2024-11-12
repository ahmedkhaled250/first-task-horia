import React, { useState } from "react";
import Huawei from "../../../assets/logos/Huawei Logo.svg";
import Monzo from "../../../assets/logos/Monzo.svg";
import VMware from "../../../assets/logos/Old VMware Logo.svg";
import Redux from "../../../assets/logos/Redux.svg";

function Brands() {
  return (
    <section className="py-20">
      <div className="w-[80%] mx-auto px-10 py-5 bg-headerColor rounded-xl ">
        <div className="grid grid-cols-12">
          <div className="col-span-12 md:col-span-6 lg:col-span-4">
            <div className="flex items-center justify-center gap-4">
              <div className="">
                <img src={Huawei} className="w-full" alt="Huawei" />
              </div>
              <div className="">
                <img src={Monzo} className="w-full" alt="Monzo" />
              </div>
              <div className="">
                <img src={VMware} className="w-full" alt="VMware" />
              </div>
              <div className="">
                <img src={Redux} className="w-full" alt="Redux" />
              </div>
            </div>
          </div>
          <div className="hidden md:block md:col-span-6 lg:col-span-4">
            <div className="flex items-center justify-center gap-4">
              <div className="">
                <img src={Huawei} className="w-full" alt="Huawei" />
              </div>
              <div className="">
                <img src={Monzo} className="w-full" alt="Monzo" />
              </div>
              <div className="">
                <img src={VMware} className="w-full" alt="VMware" />
              </div>
              <div className="">
                <img src={Redux} className="w-full" alt="Redux" />
              </div>
            </div>
          </div>
          <div className="hidden lg:block lg:col-span-4">
            <div className="flex items-center justify-center gap-4">
              <div className="">
                <img src={Huawei} className="w-full" alt="Huawei" />
              </div>
              <div className="">
                <img src={Monzo} className="w-full" alt="Monzo" />
              </div>
              <div className="">
                <img src={VMware} className="w-full" alt="VMware" />
              </div>
              <div className="">
                <img src={Redux} className="w-full" alt="Redux" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Brands;
