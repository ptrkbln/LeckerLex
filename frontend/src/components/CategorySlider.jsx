import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

function CategorySlider({ categories, selectedCategory, setSelectedCategory }) {
  // Custom Previous Arrow
  const CustomPrevArrow = (props) => {
    const { onClick } = props;
    return (
      <button
        type="button"
        onClick={onClick}
        aria-label="Previous Slide"
        className="absolute -left-12 top-1/2 transform -translate-y-1/2 z-10 
                   bg-green-600 text-white rounded-full p-3 shadow-md 
                   hover:bg-green-500 hover:scale-105 transition duration-200 focus:outline-none"
      >
        <IoIosArrowBack size={24} />
      </button>
    );
  };

  // Custom Next Arrow
  const CustomNextArrow = (props) => {
    const { onClick } = props;
    return (
      <button
        type="button"
        onClick={onClick}
        aria-label="Next Slide"
        className="absolute -right-12 top-1/2 transform -translate-y-1/2 z-10 
                   bg-green-600 text-white rounded-full p-3 shadow-md 
                   hover:bg-green-500 hover:scale-105 transition duration-200 focus:outline-none"
      >
        <IoIosArrowForward size={24} />
      </button>
    );
  };

  const sliderSettings = {
    accessibility: true,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    swipeToSlide: true,
    draggable: true,
    pauseOnHover: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    appendDots: (dots) => (
      <div
        style={{
          position: "relative",
          bottom: "-20px",
          width: "100%",
        }}
      ></div>
    ),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          arrows: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          arrows: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          arrows: false,
        },
      },
    ],
  };

  return (
    <div
      className="relative max-w-screen-lg mx-auto my-16 px-4 py-4 rounded-full"
      style={{ background: "#11151E" }}
    >
      <Slider {...sliderSettings}>
        {categories.map((category) => (
          <div
            key={category.id}
            className="p-3 flex justify-center items-center"
          >
            <div
  role="button"
  tabIndex={0}
  className={`
    md:p-2 rounded-full cursor-pointer shadow-lg text-center text-md
    transition-transform duration-300 focus:outline-none
    ${
      selectedCategory === category.id
        ? "bg-gradient-to-r from-green-500 to-green-600 text-white"
        : "bg-gray-100 text-gray-800"
    }
    hover:from-green-600 hover:to-green-700 hover:bg-gradient-to-r hover:text-white hover:scale-105
  `}
  onClick={() => setSelectedCategory(category.id)}
  onKeyDown={(e) => {
    if (e.key === "Enter" || e.key === " ") {
      setSelectedCategory(category.id);
    }
  }}
>
  {category.name}
</div>

          </div>
        ))}
      </Slider>
    </div>
  );
}

export default CategorySlider;
