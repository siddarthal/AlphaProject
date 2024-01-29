import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import { Box, Stack, Typography, Container } from "@mui/material";
import EventCard from "../EventCard";
const Carousel = ({ category, categoryName }) => {
  function LeftNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", color: "black" }}
        onClick={onClick}
      >
        <ArrowCircleRightOutlinedIcon />
      </div>
    );
  }
  function RightNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", color: "black" }}
        onClick={onClick}
      >
        <ArrowCircleLeftOutlinedIcon />
      </div>
    );
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: Math.min(3, category[categoryName].length),
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <LeftNextArrow />,
    prevArrow: <RightNextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  
  return (
    <Box >
      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
        {categoryName}
      </Typography>
      {/* {console.log("hi")} */}

      <Slider {...settings}>
        {category[categoryName].map((item) => {
          console.log("in the blood", item.EID);
          return <EventCard key={item.EID} event={item} />;
        })}
      </Slider>
    </Box>
  );
};
export default Carousel;
