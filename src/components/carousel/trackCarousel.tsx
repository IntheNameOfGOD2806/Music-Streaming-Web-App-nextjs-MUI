"use client";
import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Arrow from "../navbutton/arrow";
import "./carousel.scss";
import "./trackCarousel.scss";

function SampleNextArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <span
      className={className}
      onClick={onClick}
      style={{ ...style, zIndex: "9999 !important", marginRight: "15px" }}
    >
      <Arrow />
    </span>
  );
}
function SamplePrevArrow(props: any) {
  // const [check, setCheck] = useState<boolean>(false);
  // useEffect(() => {setCheck(true)}, []);
  const { className, style, onClick } = props;
  // const hasMounted=useHasMounted();
  // if(!hasMounted) return <></>;
  return (
    <span
      className={className}
      onClick={onClick}
      style={{
        ...style,
        zIndex: "9999 !important",
        marginLeft: "4px",
      }}
    >
      <Arrow isPrev={true} />
    </span>
  );
}
interface Iprops {
  title: string;
  data: ITrackTop[];
}
const TrackCarousel = (props: Iprops) => {
  // console.log(props);
  const settings = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    variableWidth: true,
    speed: 150,
    cssEase: "linear",
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  return (
    <div className="carousel-container">
      <h2>{props.title}</h2>
      <Slider {...settings}>
        {props &&
          props.data.length > 0 &&
          props.data.map((item) => {
            const myLoader = ({ src }: any) => {
              return `${process.env.NEXT_PUBLIC_BACKEND_URL}/images/${item.imgUrl}`;
            };
            return (
              <div key={item._id} className="carousel-track-element">
                <div>
                  {/* <img
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/images/${item.imgUrl}`}
                    alt=""
                  /> */}
                  <div style={{ position: "relative" ,width:"100%",height:"190px"}}>
                    <Image
                      src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/images/${item.imgUrl}`}
                      alt=" track imgage"
                      loader={myLoader}
                      fill
                      objectFit="contain"
                      style={{ borderRadius: "10px",height:"100%",width:"100%",left:"-3px" }}
                    />
                  </div>

                  <Link
                    href={`/track/${item._id}?audio=${item.trackUrl}`}
                    style={{ textDecoration: "none" }}
                  >
                    <p>{item.title}</p>
                  </Link>
                  <p>{item.description}</p>
                </div>
              </div>
            );
          })}
      </Slider>
    </div>
  );
};
export default TrackCarousel;
