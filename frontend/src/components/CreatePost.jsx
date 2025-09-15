import React from 'react';
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
    const {post,setPost,posts,setPosts,API,userName} = useCustomHook();
    const handlePostChange = (e)=>{
      setPost(e.target.value)
    }
    const handlePostCreate = async ()=>{
      try{
        if(post.length === 0) return console.log('post cannot be empty')
        const response = await  axios.post(`${API}/posts`,{post,username:userName})
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