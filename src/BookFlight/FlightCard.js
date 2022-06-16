import React from "react";
import { Button,Card,CardContent, Typography } from "@mui/material";

function FlightCard(props) {

    const handleClick=()=>{
        alert("You have booked successfully");
       
    }

    return (
        <Card sx={{maxWidth:"100vw"}}>
        <CardContent>
            <Typography
               sx={{color:"#0b8f2c"}}
               gutterBottom
               variant="h3"
               component="div"
            >
                {props.flightde.airline}
            </Typography>
            <div className="sec">
                <Typography  variant="h5">
                    Date:
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                    {props.flightde.date}
                </Typography> 
            </div> 
            <div className="sec">
                <Typography variant="h5">
                    Arrival:
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                    {props.flightde.arrTime}
                </Typography> 
            </div>
            <div className="sec">
                <Typography  variant="h5">
                    Departure:
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                    {props.flightde.depTime}
                </Typography> 
            </div>
            <div className="sec">
                <Typography variant="h5">
                   Boarding Point:
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                    {props.flightde.brdPoint}
                </Typography> 
            </div>
            <div className="sec">
                <Typography  variant="h5">
                   Destination:
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                    {props.flightde.destination}
                </Typography> 
            </div>
            <div className="sec">
                <Typography  variant="h5">
                   Cost:
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                    {props.flightde.cost}
                </Typography> 
            </div>
            <Button
            onClick={handleClick}
            variant="contained"
            >
                Book
            </Button>
         </CardContent>
    </Card> 
        
      
    );                   
}
    
    

export default FlightCard;