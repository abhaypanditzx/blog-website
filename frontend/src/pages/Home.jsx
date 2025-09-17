import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Box ,Typography,Button, styled} from '@mui/material'

import Posts from '../components/Posts'
const Container =  styled(Box)`

& > Button {
width:fit-content;
margin-top:10px;
}
`
const Home = () => {
    const navigate =  useNavigate();
  return (
    <div className='flex flex-col items-center h-full bg-gray-100 p-10'>
      <Posts/>
    </div>
  )
}

export default Home