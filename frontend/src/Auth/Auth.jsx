import { useEffect, useState } from 'react'
import { Box, TextField, styled, Button } from '@mui/material'
import {useNavigate} from 'react-router-dom'
import { useCustomHook } from '../contexts/GlobalContext';
import axios from 'axios';

const Container = styled(Box)`
width:100vw;
height:100vh;
display:flex;
margin:auto;
`
const signupValues = {
name:"",
username:"",
password:""
}
const loginValues = {
username:"",
password:""}
function Auth() {

    const [authToggle, setAuthToggle] = useState('login')
    const [signup,setSignup] = useState(signupValues)
    const [login, setLogin] = useState(loginValues); 
    const navigate = useNavigate()
    const {API}  = useCustomHook() //API url
 

    const handleAuthMethod = () => {
        if (authToggle !== "login") {
            setAuthToggle('login')

        }
        else {
            setAuthToggle('')
        }

    }

    const handleSignupChange =(e)=>{
       setSignup({...signup,[e.target.name]:e.target.value});
    }
      const handleLoginChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };
const handleLogin = async()=>{
    try{
       
   const res = await axios.post(`${API}/auth/login`,login)
    localStorage.setItem("user", JSON.stringify(res.data.user)); // user info bhi save
    console.log("auth.js file frontend get item from localstorage:",JSON.parse(localStorage.getItem("user")));
      navigate('/');
    }catch(err)
{
    console.error(err.response?.data?.message || err.message)
}}

const handleSignup = async ()=>{
    try{
     const res =  await axios.post(`${API}/auth/signup`,signup)
     console.log(res)
     localStorage.setItem('user',JSON.stringify(res.data.user));
     navigate('/');
     console.log("new user created with auth.js file ",res.data);
    }catch(err){
        console.error(err.response?.data?.message || err.message)
    }
}
    return (
        <Box>
            {authToggle === "login" ?
                <Container>

                    <div className='max-sm:w-[300px] min-sm:w-[400px] border-1 flex flex-col h-fit  p-[30px] m-auto shadow-2xl rounded-[4px]'>
                        <h1 className='text-black font-bold text-xl'>Login</h1>
                        <TextField style={{ marginTop: '15px' }} value={login.username} onChange={(e)=>handleLoginChange(e)} name="username" label="username" variant="standard" />
                        <TextField style={{ marginTop: '15px' }} value={login.password} onChange={(e)=>handleLoginChange(e)} name="password" label=" password" variant="standard" />
                        <button className="mt-[20px] text-gray-100 p-2 bg-black " variant="contained" onClick={()=>handleLogin()}>login</button>
                        <span className='self-center-safe p-2 text-gray-400'>or</span>
                        <button className='bg-black/50 text-white p-2 '  onClick={() => handleAuthMethod()} variant="text">create new account</button>
                    </div>
                </Container> :
                <Container>
                    <div className='max-sm:w-[300px] min-sm:w-[400px] border-1 flex flex-col h-fit  p-[30px] m-auto shadow-2xl rounded-[4px]'>
 <h1 className='text-black font-bold text-xl'>sign up</h1>
                        <TextField style={{ marginTop: '15px' }} value={signup.name} onChange={(e)=>handleSignupChange(e)} name="name" label="name" variant="standard" />
                        <TextField style={{ marginTop: '15px' }} value={signup.username} onChange={(e)=>handleSignupChange(e)} name="username" label="username" variant="standard" />
                        <TextField style={{ marginTop: '15px' }} value={signup.password} onChange={(e)=>handleSignupChange(e)} name="password" label=" password" variant="standard" />
                        <button className="mt-[20px] text-gray-100 p-2 bg-black font-medium " variant="contained" onClick={()=>handleSignup()}>signup</button>
                        <span className='self-center-safe p-2 text-gray-400'>or</span>

                        <button onClick={() => handleAuthMethod()} className='bg-black/50 text-white p-2 ' variant="text">already have an account</button>

                    </div>
                </Container>
            }
        </Box>
    )
}

export default Auth

