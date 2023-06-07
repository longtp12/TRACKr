import "./testCarousel.css";
import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



export const TestCarousel = () => {
  const settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    pauseOnHover: false,
  };

  const screenshots = [
    'https://media.rawg.io/media/games/618/618c2031a07bbff6b4f611f10b6bcdbc.jpg',
    'https://media.rawg.io/media/screenshots/1ac/1ac19f31974314855ad7be266adeb500.jpg'
  ]

  return (
    <div>
      <h2> Single Item</h2>
        <div className="somethingelse">
      <Slider {...settings}>
        {screenshots.map((screenshot)=>(
            <img className="something" src={screenshot} alt="" />
        ))}
      </Slider>
        </div>
    </div>
  );
};
