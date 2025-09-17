import React from "react";
import {  TextField } from "@mui/material";
import { useCustomHook } from "../contexts/GlobalContext";
import axios from "axios";

const CreatePost = () => {
  const { post, setPost, posts, setPosts, API, userName } = useCustomHook();
  const handlePostChange = (e) => {
    setPost(e.target.value);
  };
  const regularName = JSON.parse(localStorage.getItem('user')).name
  const handlePostCreate = async () => {
    try {
      if (post.length === 0) return console.log("post cannot be empty");
      const response = await axios.post(`${API}/posts`, {
        post,
        username: userName,
      });
      setPosts([response.data.savedPost, ...posts]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex h-[80px] outline-1 justify-between items-center  mt-[20px] max-[500px]:w-[340px] min-w-[300px]  max-w-[500px] bg-white/30 ">
      <input
        value={post}
        placeholder={`what's on your mind,${regularName}?`}
        variant="outlined"
        className="max-sm:w-[300px] h-full outline-none p-2 "
        onChange={(e) => handlePostChange(e)}
      />
      <button variant="contained" className="h-full min-w-[60px]  bg-gray-800 text-white" onClick={() => handlePostCreate()}>
        post
      </button>
    </div>
  );
};

export default CreatePost;
