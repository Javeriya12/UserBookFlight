import { TextField,Button } from "@mui/material";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged } from "firebase/auth";
import { ref, set } from "firebase/database";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { firebaseAuth, firebaseDatabase } from "../backend/firebasehandler";
import './SignUpStyles.css';

const SignUp =()=>{

    const navigate = useNavigate();
    const [isDisabled,setIsDisable] = useState(false);

    const [userinputs,setUserinputs] =useState({
        Name:"",
        gender:"",
        phno:"",
       email:"",
       pass:"",
        conpass:"",
      
    })
     const handleChange = (e) => {
        const {name,value} = e.target;
        setUserinputs({
            ...userinputs,
            [name]:value
        })
   }  
     const sendData =  () => {
    const auth = getAuth();
     onAuthStateChanged(auth, async (user) => {
        if(user){
            const uid = user.uid;
            const fireref = ref(firebaseDatabase,`User-List/${uid}`)
            await set(fireref,{
              Name : userinputs.Name,
              gender:userinputs.gender,
              phno:userinputs.phno,
              email:userinputs.email,         
          })
       
        }
    })
  }
  const handleClick = async () => {
    if(userinputs.Name == "")  {
        alert("Name cannot be Empty")
    }
    if(userinputs.gender == ""){
    alert(" Gender cannot be Empty")
    }
    if( userinputs.phno == ""){
        alert("Name cannot be  Required")
        }
    if( userinputs.email  == ""){
         alert("Phone Number cannot be Empty")
    }
    if(  userinputs.pass  == ""){
        alert("Password cannot be  Empty")
   }
   if(   userinputs.conpas  == ""){
    alert("Confirm Password cannot be Empty")
  }
        
    if(userinputs.pass == userinputs.conpass)
    {
        setIsDisable(!isDisabled);
        try {
        await createUserWithEmailAndPassword(firebaseAuth,userinputs.email,userinputs.pass)
        sendData();
        alert("Account Created!")
        navigate('/login')
        }catch(err){
            alert(err)
            setIsDisable(!isDisabled);
        }
    }
    else{
        alert(" Password did not Match!");
    }

}




    return(
        <div className="student-signup-container">
        <div className="student-signup-inputs">
        <h1>SIGN UP</h1>
        <TextField sx={{margin:"10px",width:"400px"}} id="outlined-basic" label="Name" variant="outlined" name="Name" value={userinputs.Name} onChange={handleChange}/>
        <TextField sx={{margin:"10px",width:"400px"}} id="outlined-basic" label="Gender" variant="outlined" name="gender" value={userinputs.gender} onChange={handleChange}/>
        <TextField sx={{margin:"10px",width:"400px"}} id="outlined-basic" label="Phone Number" variant="outlined"  type={'number'} name="phno" value={userinputs.phno} onChange={handleChange}/>
        <TextField sx={{margin:"10px",width:"400px"}} id="outlined-basic" label="Email ID" variant="outlined" name="email" value={userinputs.email} onChange={handleChange}/>
        <TextField sx={{margin:"10px",width:"400px"}} id="outlined-basic" label="Password" variant="outlined" type={'password'} name="pass" value={userinputs.pass} onChange={handleChange}/>
        <TextField sx={{margin:"10px",width:"400px"}} id="outlined-basic" label="Confirm Password" variant="outlined" type={'password'} name="conpass" value={userinputs.conpass} onChange={handleChange}/>
        {isDisabled ?  <Button sx={{height:"50px",width:"400px",alignSelf:"center",marginTop:"20px",borderRadius:"10px"}} variant="contained" disabled>Sign Up</Button> :
            <Button sx={{height:"50px",width:"400px",alignSelf:"center",marginTop:"20px",borderRadius:"10px"}} variant="contained" onClick={handleClick}>Sign Up</Button>
            }
            <div className="signup-div">Already have an account?<Button variant="containrd"onClick={() => navigate("/login")}>Login</Button></div>
        </div>
    </div>
    )
}

 export default SignUp;