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
import Loader from "./Loader";
const AllEvents = ({token}) => {
  const [event, setEvent] = useState([]);
  const [loading, setLoading] = useState();
  const [user, setUser] = useState(0);
  useEffect(() => {
    setLoading(true);
    console.log(token)
    api.userAccountDatails(token).then((res) => {
      console.log(res.data);
      setUser(res.data.id);
    });
    api
      .getEventsOne()
      .then((res) => {
        if (res.status === 200) {
          console.log(res, "in response 2000000");
          setEvent(res.data.reverse());
          setLoading(false);
        } else {
          alert("error in fetching events");
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log("error", error);
        setLoading(false);
      });
  }, [token]);
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

  const data = event.filter((item) => item.privacy === false).filter((item) => item.user !== user);

  const category = {
    Music: [],
    Games: [],
    Sports: [],
    Arts: [],
    Film: [],
    Technology: [],
    Literature: [],
    Fashion: [],
    Lifestyle: [],
    Other: [],
  };

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  function fetchAllCategoriesData() {
    data.forEach((item) => {
      var cat = item.category
      category[capitalizeFirstLetter(cat)].push(item);
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
      {loading ? (
        <Loader />
      ) : (
        <>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              All Events
            </Typography>
            <Slider {...settings}>
              {data.map((item, index) => (
                <EventCard key={item.EID} event={item} idx={index} />
              ))}
            </Slider>
          </Box>
          {Object.keys(category).map((categoryName, idx) => {
            return (
              <Carousel
                category={category}
                categoryName={categoryName}
                key={idx}
              />
            );
          })}
        </>
      )}
    </>
  );
};
export default AllEvents;
