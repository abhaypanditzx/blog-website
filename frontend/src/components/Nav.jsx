import { useEffect, useState } from "react";
import { Avatar, Box, styled, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCustomHook } from "../contexts/GlobalContext";

const Nav = () => {
  const { userName, setUserName } = useCustomHook();
const firstletter = userName?.charAt(0)
  useEffect(() => {
    setUserName(JSON.parse(localStorage.getItem("user"))?.username);
  });
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/auth");
  };
  return (
    <nav className=" bg-black flex items-center text-white h-[4em] justify-between width-[100vw] p-[10px] ">
      {userName ? (
        <>
          <div className="flex gap-[10px] items-center"> 
            <Avatar className="h-[200px] w-[200px] " alt="U">
              {firstletter}
            </Avatar>
            {userName}
          </div>
          <Button variant="outlined" onClick={() => handleLogout()}>
            logout
          </Button>{" "}
        </>
      ) : (
        <Button variant="outlined" onClick={() => navigate("/auth")}>
          Login
        </Button>
      )}
    </nav>
  );
};

export default Nav;
