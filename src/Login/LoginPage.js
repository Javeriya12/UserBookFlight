import { createUserWithEmailAndPassword,signInWithEmailAndPassword,onAuthStateChanged } from "firebase/auth";
import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { firebaseAuth } from "../backend/firebasehandler";
import { TextField,Button } from "@mui/material";
import './LoginStyles.css';

const Login=()=>{

    const navigate = useNavigate();
    const [isDisabled,setIsDisable] = useState(false);

    const [loginputs,setLoginputs] =useState({
        email:"",
        pass:"",
    })

    const handleChange = (e) => {
        const {name,value} = e.target;
        setLoginputs({
            ...loginputs,
            [name]:value
        })
   }  

   const handleClick = async () => {
    if( loginputs.email == ""  ) {
        alert("Email cannot be Empty");
    }
    if( loginputs.pass == ""){
        alert("Password cannot be Empty");
    }
   
        setIsDisable(!isDisabled);
        try {
        await signInWithEmailAndPassword(firebaseAuth,loginputs.email,loginputs.pass)
        alert("You have sucessfully logged in");
        navigate('/book');
        }
        catch(err){
            alert(err)
            setIsDisable(!isDisabled);
        }

}
useEffect(()=>{
    onAuthStateChanged(firebaseAuth,(user)=>{
        if(!user){
            navigate('/login');
        }


    })
   },[]);
   


    return(
        <div className="student-login-container">
        <div className="student-login-inputs">
        <h1>LOGIN</h1>
        <TextField sx={{margin:"10px",width:"400px"}} id="outlined-basic" label="Email ID" variant="outlined" name="email" value={loginputs.email} onChange={handleChange}/>
        <TextField sx={{margin:"10px",width:"400px"}} id="outlined-basic" label="Password" variant="outlined" type={'password'} name="pass" value={loginputs.pass} onChange={handleChange}/>
        {isDisabled ?  <Button sx={{height:"50px",width:"400px",alignSelf:"center",marginTop:"20px",borderRadius:"10px"}} variant="contained" disabled>Login</Button> :
            <Button sx={{height:"50px",width:"400px",alignSelf:"center",marginTop:"20px",borderRadius:"10px"}} variant="contained" onClick={handleClick}>Login</Button>
            }
        </div>
    </div>
    )
}

export default Login;