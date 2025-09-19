import React from "react";
import { useCustomHook } from "../contexts/GlobalContext";
import axios from "axios";

const CreatePost = () => {
  const { post, setPost, posts, setPosts, API, userName } = useCustomHook();
  const regularName = JSON.parse(localStorage.getItem('user'))?.name
  const handlePostChange = (e) => {
    e.preventDefault()
    setPost(e.target.value);
  };
  const handlePostCreate = async () => {
    
    try {
      if (post.length === 0) return console.log("post cannot be empty");
      // if ( = '') return console.log("login first")
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
    <div className="flex h-[80px] max-[350px]:w-[80vw] outline-1 justify-between items-center  mt-[20px] max-[500px]:w-[320px] min-w-[300px]  max-w-[500px] bg-white/30 ">
      <input
        value={post}
        placeholder={`what's on your mind,${regularName}?`}
        variant="outlined"
        className="max-sm:w-[70vw] h-full outline-none p-2 "
        onChange={(e) => handlePostChange(e)}
      />
      <button variant="contained" className="h-full max-sm:w-[20vw] sm:w-[5rem]   font-bold bg-gray-800 text-white" onClick={() => handlePostCreate()}>
        post
      </button>
    </div>
  );
};

export default CreatePost;
