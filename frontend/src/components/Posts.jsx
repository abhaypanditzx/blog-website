import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import CreatePost from "./CreatePost";
import { useCustomHook } from "../contexts/GlobalContext";
import { FaHeart } from "react-icons/fa"; // ❤️ icon
import Comments from "./Comments";
const Posts = () => {
  const { posts, setPosts } = useCustomHook();
  const { API, userName } = useCustomHook();
  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await axios.get(`${API}/posts`);
        setPosts(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPosts();
  }, []);

  const handleDelete = async (id) => {
    try {
      const deleted = await axios.delete(`${API}/posts/${id}`, {
        data: { username: userName },
      });
      console.log("post deleted", deleted.data);
      setPosts(posts.filter((p) => p._id !== id));
    } catch (err) {
      console.error("failed to delete post", err);
    }
  };

  const handleLike = async (id) => {
    try {
      const response = await axios.post(`${API}/posts/like`, {
        id,
        username: userName,
      });
      setPosts(posts.map((p) => (p._id === id ? response.data.post : p)));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="">
      <CreatePost />
      <div className="flex flex-col   justify-center items-center flex-nowrap w-full  h-full">
        {posts.length === 0 ? (
          <div> no posts </div>
        ) : (
          posts.map((post) => (
            <div key={post._id} className="max-[350px]:w-[90vw] mt-[20px] ">
              <div className="p-[15px] relative bg-white shadow-md  h-fit min-w-[300px] max-w-[500px] mt-[40px] ">
                {post?.author === userName || userName === "admin" ? (
                  <MdDelete
                    className="delete"
                    onClick={() => handleDelete(post._id)}
                  />
                ) : (
                  ""
                )}
                <div className="author-date">
                  <i>author:{post.author ? post.author : ''}</i>
                  <small style={{ color: "grey" }}>
                    {new Date(post.createdAt).toLocaleString("en-IN", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </small>
                </div>
                <div
                  style={{
                    fontSize: "20px",
                    background: "white",
                    width: "100%",
                  }}
                >
                  <p>{post.post}</p>
                </div>
                <div className="postBottom">
                  <div id="heartLogo" className="flex items-center">
                    <FaHeart
                      onClick={() => handleLike(post._id)}
                      className={`cursor-pointer ${
                        post.likes && post.likes.includes(userName)
                          ? "text-red-500 "
                          : "text-gray-500"
                      }`}
                    />
                    {post.likes.length}
                  </div>
                </div>
              </div>
              <div>
                <Comments post={post} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Posts;
