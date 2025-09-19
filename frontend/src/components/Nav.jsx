import { useEffect } from "react";
import { Avatar, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCustomHook } from "../contexts/GlobalContext";
import { MdOutlineNavigateBefore } from "react-icons/md";
const Nav = () => {
const path = document.URL
console.log(path)
  const { userName, setUserName } = useCustomHook();
  const firstletter = userName?.charAt(0);
  useEffect(() => {
    setUserName(JSON.parse(localStorage.getItem("user"))?.username);
  });
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/auth");
  };
  return (
    <nav className="sticky top-0 z-1 left-0">
      <div className=" bg-black flex items-center text-white h-[4em] justify-between width-[100vw] p-[10px] ">
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
      </div> 
      {path.match('/auth') ?
      <div onClick={()=>navigate('/')} className="flex text-gray-400 cursor-pointer items-center">
        <MdOutlineNavigateBefore className="text-3xl " /> home
      </div> : ''
}    </nav>
  );
};

export default Nav;
