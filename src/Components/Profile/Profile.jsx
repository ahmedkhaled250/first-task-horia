import React, { useContext, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
function Profile() {
  const { pathname } = useLocation();
  const { userData, avatar } = useContext(UserContext);
  const [isOpened, setIsOpened] = useState(false);

  const activeLinkClasses = ({ type = "profile" } = {}) => {
    let subPage;
    if (pathname == "/profile") {
      subPage = "profileData";
    } else {
      if (pathname.includes("chat")) {
        subPage = "chat";
      } else {
        subPage = pathname.split("/profile/")[1];
        if (
          pathname.includes("addProduct") ||
          pathname.includes("myProducts")
        ) {
          subPage = "product";
        }
      }
    }

    let classes = "";
    if (type == subPage) {
      classes += "after:block";
    } else {
      classes += "after:hidden";
    }
    return classes;
  };

  return (
    <section className="pt-20 pb-8">
      <div className="container max-w-screen-xl md:w-[90%] lg:w-[80%] mx-auto px-4">
        <div className="">
          <div className="bg-profileColor w-full p-5 rounded-t-md">
            <div className={`w-[80%] mx-auto flex items-center gap-3`}>
              <div className="size-20 rounded-full overflow-hidden">
                {userData?.image?.secure_url ? (
                  <img
                    src={userData.image.secure_url || avatar}
                    className="w-full"
                    alt={userData.userName}
                  />
                ) : (
                  <Skeleton className="size-full rounded-full" />
                )}
              </div>
              <h2 className="text-lg font-bold text-black">
                {userData?.userName ? (
                  userData.userName
                ) : (
                  <Skeleton className="w-40 h-5 rounded-md" />
                )}
              </h2>
            </div>
          </div>
          <div className="border-[1px] rounded-b-md border-main border-t-0">
            {!userData?.role ? (
              <div className="flex pt-2 pb-3 items-center">
                <div className="w-1/2 mx-auto h-5">
                  <Skeleton className="h-full w-full" />
                </div>
              </div>
            ) : (
              <ul className="flex items-center justify-center">
                <li className="py-2">
                  <NavLink
                    to="profileData"
                    className={`${activeLinkClasses({
                      type: "profileData",
                    })} px-2 lg:px-5 pb-3  outline-none after:w-full after:h-1 after:duration-700 after:bg-main relative after:absolute after:bottom-0 after:left-0`}
                  >
                    Profile
                  </NavLink>
                </li>
                {userData.role == "Individual" ||
                userData.role == "Business" ? (
                  <li className={`py-2`}>
                    <NavLink
                      to="dashboard"
                      className={`${activeLinkClasses({
                        type: "dashboard",
                      })} px-2 lg:px-5 pb-3  outline-none after:w-full after:h-1 after:duration-700 after:bg-main relative after:absolute after:bottom-0 after:left-0`}
                    >
                      Dashboard
                    </NavLink>
                  </li>
                ) : (
                  ""
                )}

                {userData.role == "Individual" ||
                userData.role == "Business" ? (
                  <li className="py-2">
                    <NavLink
                      onClick={() => setIsOpened(!isOpened)}
                      className={`${activeLinkClasses({
                        type: "product",
                      })} px-2 lg:px-5 pb-3  outline-none after:w-full after:h-1 after:duration-700 after:bg-main relative after:absolute after:bottom-0 after:left-0`}
                    >
                      Product
                      <div
                        className={`${
                          isOpened ? "block" : "hidden"
                        } absolute p-2 flex flex-col gap-1 border-2 bg-white left-0 top-full right-0 border-main text-center`}
                      >
                        <NavLink
                          to="addProduct"
                          className="py-1 rounded-md cursor-pointer text-main hover:text-white hover:bg-main font-medium duration-300"
                        >
                          add
                        </NavLink>
                        <NavLink
                          to="updateProduct"
                          className="py-1 rounded-md cursor-pointer text-main hover:text-white hover:bg-main font-medium duration-300"
                        >
                          update
                        </NavLink>
                        <NavLink
                          to="myProducts"
                          className="py-1 rounded-md cursor-pointer text-main hover:text-white hover:bg-main font-medium duration-300"
                        >
                          display
                        </NavLink>
                      </div>
                    </NavLink>
                  </li>
                ) : (
                  ""
                )}

                <li className="py-2">
                  <NavLink
                    to="chat"
                    className={`${activeLinkClasses({
                      type: "chat",
                    })} px-2  lg:px-5 pb-3  outline-none after:w-full after:h-1 after:duration-700 after:bg-main relative after:absolute after:bottom-0 after:left-0`}
                  >
                    Chat
                  </NavLink>
                </li>
                {userData.role == "Customer" ? (
                  <li className="py-2">
                    <NavLink
                      to="wishlist"
                      className={`${activeLinkClasses({
                        type: "wishlist",
                      })} px-2 lg:px-5 pb-3  outline-none after:w-full after:h-1 after:duration-700 after:bg-main relative after:absolute after:bottom-0 after:left-0`}
                    >
                      Wishlist
                    </NavLink>
                  </li>
                ) : (
                  ""
                )}
              </ul>
            )}
          </div>

          <div className="pt-8">
            <Outlet />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Profile;
