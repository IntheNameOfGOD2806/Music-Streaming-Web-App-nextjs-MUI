"use client";
import Slider from "react-slick";

import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Arrow from "../navbutton/arrow";
import "./trackCarousel.scss";
function SampleNextArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <span
      className={className}
      onClick={onClick}
      style={{ zIndex: "9999 !important", marginRight: "15px" }}
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
      style={{ zIndex: "9999 !important", marginLeft: "4px" }}
    >
      <Arrow isPrev={true} />
    </span>
  );
}
const TrackCarousel = () => {
  const settings = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    variableWidth: true,
    speed: 500,

    cssEase: "linear",
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div className="carousel-container">
      <h2> Music Tracks</h2>

      <Slider {...settings}>
        <div className="carousel-track-element">
          <h3>1</h3>
        </div>
        <div className="carousel-track-element">
          <h3>2</h3>
        </div>
        <div className="carousel-track-element">
          <h3>3</h3>
        </div>
        <div className="carousel-track-element">
          <h3>4</h3>
        </div>
        <div className="carousel-track-element">
          <h3>5</h3>
        </div>
        <div className="carousel-track-element">
          <h3>6</h3>
        </div>
      </Slider>
    </div>
  );
};

export default TrackCarousel;
