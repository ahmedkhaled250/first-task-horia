import React, { useContext } from "react";
import Skeleton from "react-loading-skeleton";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { UserContext } from "../../Context/UserContext";

function ProductDetailsLoading() {
  const {userData}=useContext(UserContext)
  const responsiveSettings = {
    0: {
      items: 1, // 1 item on small screens (mobile)
    },
    600: {
      items: 2, // 2 items on medium screens (tablets)
    },
    1000: {
      items: 3, // 3 items on large screens (desktops)
    },
  };
  return (
    <>
      <div className="lg:hidden">
        <OwlCarousel
          className="owl-theme cursor-grab"
          autoplayTimeout={2000}
          items={1}
          loop
          dots={true}
          responsive={responsiveSettings}
        >
          {Array(5)
            .fill(0)
            .map((image, index) => {
              return (
                <div key={index} className="p-5">
                  <Skeleton className="w-full rounded-md h-32" />
                </div>
              );
            })}
        </OwlCarousel>
      </div>

      <div className="grid  grid-cols-4 items-center lg:items-start gap-5">
        <div className="hidden lg:block col-span-2">
          <div className="grid grid-cols-5 w-full items-center gap-3">
            <div className="col-span-full">
              <Skeleton className="w-3/4 block mx-auto lg:h-80 xl:h-96 rounded-t-lg" />
            </div>
            <div className="col-span-full gap-3 flex items-center justify-center">
              {Array(5)
                .fill(0)
                .map((image, index) => {
                  return (
                    <div key={index} className="w-1/5">
                      <Skeleton className=" w-full rounded-md h-24" />
                    </div>
                  );
                })}
            </div>
          </div>
        </div>

        <div className=" col-span-full lg:col-span-2">
          <div className="py-10 border-b-2">
            <Skeleton className="h-8 rounded-md" />
          </div>
          {userData?.role == "Individual" || userData?.role == "Business" ? (
            ""
          ) : (
            <div className="py-10  border-b-2">
              <Skeleton className="h-10 rounded-md" />
            </div>
          )}
          <div className="py-10 border-b-2">
            <Skeleton className="h-10 rounded-md" />
          </div>
          <div className="py-10">
            <Skeleton count={3} className="h-6 rounded-md" />
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetailsLoading;
