import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

function ImageSlider({ images }) {
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
    <div className="">
      <OwlCarousel
        className="owl-theme cursor-grab"
        autoplayTimeout={2000}
        items={1}
        loop
        dots={true}
        responsive={responsiveSettings}
      >
        {images.map((image, index) => {
          return (
            <div key={index} className="p-5">
              <img src={image.secure_url} className="w-full" alt={image} />
            </div>
          );
        })}
      </OwlCarousel>
    </div>
  );
}

export default ImageSlider;
