import { Box, Typography ,Grid,Stack,Button} from "@mui/material";
import { useEffect, useState } from "react";
import api from "../../Services/service";
import { useParams,useNavigate } from "react-router-dom";
import Events from "./Events";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";

const FilterEvents1 = ({token}) => {
  const [requiredData, setRequiredData] = useState([]);
  const [arrayDisplay, setArrayDisplay] = useState([]);
  const navigate = useNavigate();
  const { eventType } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.userSpecificEvent(token);
        console.log(response.data, "hi ");
        setRequiredData(response.data);
      } catch {
        console.log("unable to fetch data");
      }
    };
    fetchData();
  }, []);
 
  useEffect(() => {
    const ans=[];
    const arr = [
      { eventType: "private", data: [] },
      { eventType: "public", data: [] },
      { eventType: "offline", data: [] },
      { eventType: "online", data: [] },
    ];
    requiredData.forEach((element) => {
      if (element.privacy) {
        arr[0].data.push(element);
      }
      if (!element.privacy) {
        arr[1].data.push(element);
      }
      if (element.medium === "offline") {
        arr[2].data.push(element);
      }
      if (element.medium === "online") {
        arr[3].data.push(element);
      }
    });
    arr.forEach((element)=>{
        if(element.eventType===eventType){
            ans.push(element.data);
            console.log("..............................");
        }
      })
      setArrayDisplay(ans[0]);
  }, [requiredData]);
  
  console.log(eventType,"eventType");
  console.log(requiredData, "data to use");
  console.log(arrayDisplay,"ans");
  return (
    <Box>
        <Stack spacing={6}>
          <Grid container>
            <Grid item xs={6}>
              <Typography variant="h4" fontSize="bold">
                Your {eventType} events
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ paddingLeft: 65 }}>
                <Button
                  variant="contained"
                  startIcon={<CreateOutlinedIcon />}
                  onClick={() => navigate("/dashboard/add")}
                >
                  Create
                </Button>
              </Box>
            </Grid>
        </Grid>
      {arrayDisplay[0] ? (
            <Grid container spacing={4}>
              {arrayDisplay.map((item, idx) => (
                <Grid item xs={6} key={idx}>
                  {" "}
                  <Events  eventdata={item} />{" "}
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography variant="body" >
              There are no {eventType} events please add events
            </Typography>
          )}
        </Stack>
    </Box>
  );
};

export default FilterEvents1;
