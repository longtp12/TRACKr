import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./carousel.scss";
import { publicRequest } from "../../requestMethods";
import { Link } from "react-router-dom";
import { platformIcons } from "../../utils/platformIcons";
import { formatReleaseDate } from "../../utils/formatStrings";

export const Carousel = () => {
  const [carouselGames, setCarouselGames] = useState([]);
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


  useEffect(() => {
    const getCarouselGames = async () => {
      try {
        const numberOfGames = 5;
        const res = await publicRequest.get("/game/random/" + numberOfGames);
        setCarouselGames(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCarouselGames();
  }, []);

  console.log(carouselGames);

  return (
    <div className="carousel">
      <Slider {...settings}>
        {carouselGames.map((carouselGame) => (
          <div className="carouselItem">
            <img
              src={carouselGame.backgroundImage}
              alt=""
              className="carouselImg"
            />
            <div className="info">
              <h1 className="title">{carouselGame.title}</h1>
              <div className="sub">
                <div className="releaseDate">
                  {formatReleaseDate(carouselGame.releaseDate)}
                </div>
                <div className="platforms">
                  {carouselGame.platforms.map((platform) => {
                    if (platform === "PlayStation")
                      return <img src={platformIcons.playstation} />;
                    if (platform === "Xbox")
                      return <img src={platformIcons.xbox} />;
                    if (platform === "Nintendo")
                      return <img src={platformIcons.switch} />;
                  })}
                </div>
              </div>
              <Link to={`/game/${carouselGame.slug}`}>
                <button className="trackItem">Track Pricing Now!</button>
              </Link>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};
