import { useEffect, useState } from "react";
import api from "../Services/service";
import { Box, Stack, Typography } from "@mui/material";
import EventCard from "./EventCard";
import Menubar from "./Explore/Menubar";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
const Events = () => {
  const [event, setEvent] = useState([]);

  useEffect(() => {
    api
      .getEvents()
      .then((res) => {
        console.log(res);
        setEvent(res);
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
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <LeftNextArrow />,
    prevArrow: <RightNextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
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
  // const category = {
  //   Music: [],
  //   Games: [],
  //   Sports: [],
  //   Arts: [],
  //   Film: [],
  //   Tech: [],
  //   Fashion: [],
  //   Lifestyle: [],
  //   Culture: [],
  //   Charity: [],
  //   Kids: [],
  //   Other: [],
  // };
  const category = {
    music: [],
    games: [],
    sports: [],
    arts: [],
    film: [],
    technology: [],
    literature:[],
    fashion: [],
    lifestyle: [],
    other: [],
  };
  const num=1;
  function fetchAllCategoriesData() {
    event.forEach((item) => {
      // console.log(item.category);
      // console.log("hello");
      // console.log(category[item.categories]);
      category[item.category].push(item);
      // category[item.categories].push(item);
    });

    Object.keys(category).forEach((categoryName) => {
      if (category[categoryName].length === 0) {
        delete category[categoryName];
      }
    });
    console.log(category);
    // console.log(num+1);
  }
  fetchAllCategoriesData();

  console.log(category);
  return (
    <Stack spacing={3}>
      <Typography variant="h4" sx={{ paddingTop: 4, fontWeight: "bold" }}>
        Explore the best events happening around you
      </Typography>
      <Menubar />
      <Box>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          All Events
        </Typography>

        <Slider {...settings}>
          {event.map((item, index) => (
            <EventCard key={index} event={item} idx={index} />
          ))}
        </Slider>
      </Box>
      <Box>
        {Object.keys(category).map((categoryName, idx) => {
          return (
            <Box key={idx}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {categoryName}
              </Typography>
              {/* {console.log("hi")} */}

              <Slider {...settings}>
                {category[categoryName].map((item,idx) => {
                   console.log("in the blood",item);
                  return <EventCard key={item.EID} event={item} idx={item.EID} />;
                })}
              </Slider>
            </Box>
          );
        })}
      </Box>
    </Stack>
  );
};

export default Events;
