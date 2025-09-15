import { useEffect, useState } from "react";
import { Avatar, Box, styled, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCustomHook } from "../contexts/GlobalContext";
const Navbar = styled(Box)`

background:black;
display:flex;
align-items:center;
height:4em;
color:white;
justify-content:space-between;
width:100vw;
padding:10px;
& > Avatar{
height:200px;
width:200px;
}
 & > div {
 display:flex; 
 align-items:center;
 gap:20px;}
`
const Container = styled(Box)`
width:100vw;
height:100%;
display:flex;
justify-content:center;
& > Button{
height:fit-content;
width:fit-content;
margin:20px;}
`
const Nav = () => {
  const {userName,setUserName} = useCustomHook()
   
  useEffect(()=>{
     setUserName(JSON.parse(localStorage.getItem('user'))?.username);
  })
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.clear();
    navigate('/auth')

  }
  return (

    <Navbar>
      {userName ? ( <><div>
          <Avatar alt="U">{"U"}</Avatar>
            {userName} 
          </div>
            <Button variant="outlined"  onClick={()=>handleLogout()}>logout</Button> </>) 
            : (<Button variant="outlined"  onClick={() => navigate('/auth')}>Login</Button>)
}
         </Navbar >
  
  )
}

export default Nav;
