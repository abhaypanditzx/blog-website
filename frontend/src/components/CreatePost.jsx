import React, { useEffect, useState } from 'react'
import {Box, Button, styled, TextField} from '@mui/material'
import { useCustomHook } from '../contexts/GlobalContext'
import axios from 'axios'
const Container = styled(Box)`
display:flex;
height:fit-content; 
position:fixed; 
bottom:0;
display:flex;
left:0;
justify-content:center;
margin:5px;
width:100vw;
background-color:white;
padding:10px;
box-shadow:1px 2px 10px black;
`
const CreatePost = () => {
 
   
    const {post,setPost,posts,setPosts} = useCustomHook();
    const handlePostChange = (e)=>{
      setPost(e.target.value)
    }
    const handlePostCreate = async()=>{
      try{
        const user  =  JSON.parse(localStorage.getItem("user")); 
        if(post.length ===0) return console.log('post cannot empty')
        const response = await  axios.post('httphttps://blog-website-ktc5.onrender.com/posts',{post:post,author: user.user.username})
      setPosts([response.data.savedPost, ...posts])
      }catch(err){
        console.error(err)
      }
      
    }
   
  return (
    <Container>
        <TextField value={post} variant='outlined' onChange={(e)=>handlePostChange(e)}/>
        <Button variant='contained' onClick={()=>handlePostCreate()}>
            create post
        </Button>
    </Container>
  )
}

export default CreatePost