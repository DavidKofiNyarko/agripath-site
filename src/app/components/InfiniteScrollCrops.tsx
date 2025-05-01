"use client";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Crop Data
const crops = [
  { name: "Tomato", img: "/crops/hero/tomato.png" },
  { name: "Chiili Pepper", img: "/crops/hero/chilly-pepper.png" },
  { name: "Okro", img: "/crops/hero/okro.png" },
  { name: "Pepper", img: "/crops/hero/pepper.png" },
  { name: "Potato", img: "/crops/hero/potato.png" },
  { name: "sticks", img: "/crops/hero/sticks.png" },
  { name: "Maize", img: "/crops/hero/maize.png" },
];

const InfiniteScrollCrops = () => {
  // Settings for react-slick
  const settings = {
    dots: false,
    infinite: true,
    speed: 5000,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
    pauseOnHover: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };

  return (
    <div className="w-full overflow-hidden ">
      <Slider {...settings}>
        {crops.map((crop, index) => (
          <div key={`${crop.name}-${index}`} className="flex items-center justify-center px-2">
            <img
              src={crop.img}
              alt={crop.name}
              className="w-[80px] md:w-[100px] object-contain mx-auto hover:scale-110 transition-transform duration-300"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default InfiniteScrollCrops;
