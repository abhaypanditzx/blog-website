import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Box ,Typography,Button, styled} from '@mui/material'

import Posts from '../components/Posts'
const Container =  styled(Box)`
display:flex;
flex-direction:column;
justify-content:start;
height:100vh; 
align-items:center;


& > Button {
width:fit-content;
margin-top:10px;
}
`
const Home = () => {
    const navigate =  useNavigate();
  return (
    <Container >
      <Posts/>
    </Container>
  )
}

export default Home