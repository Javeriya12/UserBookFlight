import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { firebaseAuth } from "../backend/firebasehandler";
import { onValue, ref } from "firebase/database";
import { firebaseDatabase } from "../backend/firebasehandler";
import {onAuthStateChanged,signOut} from "firebase/auth";
import { Button, InputLabel, TextField, Typography } from "@mui/material";
import FlightCard from './FlightCard';
import './BookFlightStyles.css';

const Book=()=>{
    const [flightList,setFlightList]=useState([]);
    const [id,setId] = useState([]);
    const [date,setDate]= useState(null);
    const nav = useNavigate();
    const handleChange =(e)=>{
        setDate(e.target.value);
    };
    const handleLogOut=()=>{
        signOut(firebaseAuth);
    };

    useEffect(()=>{
        const databaseRef = ref(firebaseDatabase,'flights');
        onValue(
            databaseRef,
            (snapshot)=>{
                setFlightList(Object.values(snapshot.val()));
                setId(Object.keys(snapshot.val()));
            },
            {onlyOnce:true}
        );
        onAuthStateChanged(firebaseAuth,(user)=>{
            if(!user){
                nav("/login");
            }
        });
    },[flightList])

    return(
        <div className="flights-container">
            <div className="header">
                <p></p>
                <Typography sx={{height:"50px",margin:"10px 10px 0 10px" }} variant ="h4">Flight List</Typography>
                <Button sx={{height:"50px",margin:"10px 10px 0 10px"}} variant="contained" onClick={handleLogOut}>Log Out</Button>
            </div>
            <div className="cards-container">
                <InputLabel sx={{marginLeft:2,marginBottom:0.5}}>Select Date:</InputLabel>
                <TextField
                   InputProps={{
                    inputProps:{
                        min:new Date().toISOString().slice(0,10),
                    },
                   }}
                   onChange={handleChange}
                   name="date"
                   sx={{margin:2}}
                   type="date"
                   ></TextField>
                   {flightList.map((flight,index)=>{
                    if(date === flight.date){
                        return(
                            <FlightCard
                            id={id[index]}
                            key={id[index]}
                            flightde={flight}
                            ></FlightCard>
                        );
                    }else if(
                        (date && date !== flight.date) ||
                        flight.occupancy <=0 ||
                        new Date(flight.date).getDate() < new Date().getDate()
                    
                    ){
                        return;
                    }else if (date === null){
                        return(
                            <FlightCard
                             id={id[index]}
                             key={id[index]}
                             flightde={flight}
                             ></FlightCard>
                        );
                    }
                   })}
            </div>

        </div>


    );
}

export default Book;