import { useEffect, useState } from 'react'
import { Box, TextField, styled, Button } from '@mui/material'
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
const Component = styled(Box)`
width:400px;
height:fit-content;
border-radius:4px;
background:#fff;
box-shadow:4px 2px 10px #0000005e;
padding:30px;
margin:auto;
display:flex;
flex-direction:column;
& > Button { 
margin-top:20px;
background-color:black;

}
`
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
function Auth({setMuser}) {
    const [authToggle, setAuthToggle] = useState('login')
    const [signup,setSignup] = useState(signupValues)
    const [login, setLogin] = useState(loginValues); 
    const navigate = useNavigate()

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
       
        const response = await axios.post("https://blog-website-ktc5.onrender.com/auth/login",login)
      localStorage.setItem('user', JSON.stringify(response.data))
      setMuser(response.data);
      console.log(response.data)
      navigate('/');
    }catch(err)
{
    console.error(err.response?.data?.message || err.message)
}}

const handleSignup = async ()=>{
    try{
     const response =  await axios.post('https://blog-website-ktc5.onrender.com/auth/signup',signup)
     localStorage.setItem('user',JSON.stringify(response.data));
    setMuser(response.data);
     navigate('/');
     console.log(response.data);
     alert('signedUp successfully!');
    }catch(err){
        console.error(err.response?.data?.message || err.message)
    }
}
    return (
        <Box>
            {authToggle === "login" ?
                <Container>
                    <Component>
                        <h1 style={{ color: "black" }}>Login</h1>
                        <TextField style={{ marginTop: '15px' }} value={login.username} onChange={(e)=>handleLoginChange(e)} name="username" label="username" variant="standard" />
                        <TextField style={{ marginTop: '15px' }} value={login.password} onChange={(e)=>handleLoginChange(e)} name="password" label=" password" variant="standard" />
                        <Button variant="contained" onClick={()=>handleLogin()}>login</Button>
                        <Button onClick={() => handleAuthMethod()} style={{ color: "#F2F2F2", backgroundColor: '#AAAAAA' }} variant="text">create new account</Button>
                    </Component>
                </Container> :
                <Container>
                    <Component>
                        <h1 style={{ color: "black" }}>signup</h1>

                        <TextField style={{ marginTop: '15px' }} value={signup.name}     onChange={(e)=>{handleSignupChange(e)}} name="name" label="name" variant="standard" />
                        <TextField style={{ marginTop: '15px' }} value={signup.username} onChange={(e)=>{handleSignupChange(e)}} name="username" label="username" variant="standard" />
                        <TextField style={{ marginTop: '15px' }} value={signup.password} onChange={(e)=>{handleSignupChange(e)}} name="password" label="password" variant="standard" />
                        <Button variant="contained" onClick={()=>handleSignup()}>signup</Button>
                        <Button onClick={() => handleAuthMethod()} style={{ color: "#F2F2F2", backgroundColor: '#AAAAAA' }} variant="text">already have an account</Button>

                    </Component>
                </Container>
            }
        </Box>
    )
}

export default Auth

