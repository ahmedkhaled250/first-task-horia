import React from 'react'

function Footer() {
  return (
    <footer className="bg-white">
      <div className="px-5 container max-w-screen-xl mx-auto py-10">
        <div className="grid grid-cols-12">
          <div className="col-span-12 my-3 lg:col-span-6">
            <div className=" lg:border-l-2 lg:border-black lg:my-5">
              <p className="mt-2 lg:w-64">
                شركتنا واحدة من أفضل الشركات الرائدة في مجال تطوير وتصميم
                المواقع الإلكترونية في مصر والعالم العربي .
              </p>
            </div>
          </div>
          <div className="col-span-12 my-3 lg:pr-10 lg:col-span-3">
            <h5 className="text-3xl text-[#36768E] font-extrabold">
              {" "}
              أهم الروابط
            </h5>
            <ul className="text-lg flex flex-col gap-2 mt-5">
              <li>
                <a
                  href="#"
                  className="group hover:text-[#36768E] duration-200 hover:underline"
                >
                  الرئيسية
                  <i className="fa-solid fa-angle-right text-[12px] mr-2 group-hover:mr-1 duration-200 " />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="group hover:text-[#36768E] duration-200 hover:underline"
                >
                  من نحن
                  <i className="fa-solid fa-angle-right text-[12px] mr-2 group-hover:mr-1 duration-200 " />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="group hover:text-[#36768E] duration-200 hover:underline"
                >
                  الخدمات
                  <i className="fa-solid fa-angle-right text-[12px] mr-2 group-hover:mr-1 duration-200 " />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="group hover:text-[#36768E] duration-200 hover:underline"
                >
                  مدونة
                  <i className="fa-solid fa-angle-right text-[12px] mr-2 group-hover:mr-1 duration-200 " />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="group hover:text-[#36768E] duration-200 hover:underline"
                >
                  اتصل بنا
                  <i className="fa-solid fa-angle-right text-[12px] mr-2 group-hover:mr-1 duration-200 " />
                </a>
              </li>
            </ul>
          </div>
          <div className="col-span-12 my-3 lg:col-span-3">
            <h5 className="text-3xl text-[#36768E] font-extrabold">
              {" "}
              بيانات التواصل
            </h5>
            <ul className="text-lg flex flex-col gap-2 mt-5">
              <li>
                <i className="fa-solid text-[#36768E] pl-3 fa-house" />
                فندق توليب النرجس التجمع الخامس القاهرة
              </li>
              <li>
                <i className="fa-solid text-[#36768E] pl-3 fa-phone-flip" />
                201069535416+
              </li>
              <li>
                <i className="fa-solid text-[#36768E] pl-3 fa-envelope-open" />
                info@adologysol.com
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer
