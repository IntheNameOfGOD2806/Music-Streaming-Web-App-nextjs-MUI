"use client";
import Slider from "react-slick";

import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Arrow from "../navbutton/arrow";
import "./carousel.scss";
import TrackContext, { initValue, ITrackContext } from "@/lib/TrackContext";
import { useContext, useEffect } from "react";

function SampleNextArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <span
      className={className}
      onClick={onClick}
      style={{ zIndex: "999999999999 !important", marginRight: "50px" }}
    >
      <Arrow />
    </span>
  );
}

function SamplePrevArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <span
      className={className}
      onClick={onClick}
      style={{ zIndex: "999999999999 !important", marginLeft: "50px" }}
    >
      <Arrow isPrev={true} />
    </span>
  );
}

const Carousel = () => {
  // const { track, setTrack } = useContext(TrackContext) as ITrackContext;
  // useEffect(() => {
  //   setTrack(initValue);
  // }, []);
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,

    speed: 400,
    autoplaySpeed: 1000,
    cssEase: "linear",
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div>
      <Slider {...settings}>
        <div className="carousel-element">
          <img
            src="https://images.ctfassets.net/7o4518w439ua/ZwaEosBaQBiHULspzRbOa/15d05201273dc6676499ad5118b2178c/Sony_ALPHA_Bring_on_Winter.jpg?fm=jpg"
            alt=""
          />
        </div>
        <div className="carousel-element">
          <img
            src="https://images.unsplash.com/photo-1499415479124-43c32433a620?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>
      </Slider>
    </div>
  );
};

export default Carousel;
