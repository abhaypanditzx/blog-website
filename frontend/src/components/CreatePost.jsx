import React, { useEffect, useState } from 'react'
import {Box, Button, styled, TextField} from '@mui/material'
import { useCustomHook } from '../contexts/GlobalContext'
import axios from 'axios'
const Container = styled(Box)`
display:flex;
height:fit-content; 
display:flex;
justify-content:center;
margin-top:20px;
width:auto;
background-color:white;
padding:10px;
`
const CreatePost = () => {
 
   
    const {post,setPost,posts,setPosts} = useCustomHook();
    const handlePostChange = (e)=>{
      setPost(e.target.value)
    }
    const handlePostCreate = async()=>{
      try{
        const token = localStorage.getItem("token")
        const user  =  JSON.parse(localStorage.getItem("user")); 
        if(post.length ===0) return console.log('post cannot empty')
        const response = await  axios.post('https://blog-website-ktc5.onrender.com/posts',{post}, {headers: { Authorization: `Bearer ${token}` }
    })
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