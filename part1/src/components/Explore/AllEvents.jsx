import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import api from "../../Services/service";
import { useEffect, useState } from "react";
import Carousel from "./Carousel";
import EventCard from "../EventCard";
import { Box, Typography } from "@mui/material";
const AllEvents = () => {
  const [event, setEvent] = useState([]);
  useEffect(() => {
    api
      .getEventsOne()
      .then((res) => {
        if (res.status === 200) {
          console.log(res, "in response 2000000");
          setEvent(res.data);
        }
      })
      .catch((error) => console.log("error", error));
  }, []);
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
    infinite: false,
    speed: 500,
    slidesToShow: Math.min(3, event.length),
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <LeftNextArrow />,
    prevArrow: <RightNextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
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

  const category = {
    music: [],
    games: [],
    sports: [],
    arts: [],
    film: [],
    technology: [],
    literature: [],
    fashion: [],
    lifestyle: [],
    other: [],
  };

  function fetchAllCategoriesData() {
    event.forEach((item) => {
      category[item.category].push(item);
    });

    Object.keys(category).forEach((categoryName) => {
      if (category[categoryName].length === 0) {
        delete category[categoryName];
      }
    });
  }
  
  
  fetchAllCategoriesData();
  console.log("hi");
  return (
    <>
      <Box>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          All Events
        </Typography>

        <Slider {...settings}>
          {event.map(
            (item, index) =>
              item.privacy === false && (
                <EventCard key={index} event={item} idx={index} />
              )
          )}
        </Slider>
      </Box>
      {Object.keys(category).map((categoryName, idx) => {
        return (
          <Carousel category={category} categoryName={categoryName} key={idx} />
        );
      })}
    </>
  );
};
export default AllEvents;
