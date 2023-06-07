import "./detailCarousel.css";
import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const DetailCarousel = ({ screenshots }) => {
  const settings = {
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    pauseOnHover: false,
  };

  return (
      <div className="imageDetailCarouselContainer">
        <Slider {...settings}>
          {screenshots.map((screenshot) => (
            <img className="imageDetailCarousel" src={screenshot} alt="" />
          ))}
        </Slider>
      </div>
  );
};
