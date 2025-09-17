import React, { useState } from "react";
import axios from "axios";
import { useCustomHook } from "../contexts/GlobalContext";
import { IoSend } from "react-icons/io5";

const Comments = ({ post }) => {
  const { API, userName } = useCustomHook();
  const [comment, setComment] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [allComments, setAllComments] = useState(post.comments || []);
  const visibleComments = showAll ? allComments : allComments.slice(-2);
  const handleAddComment = async () => {
    if (!comment.trim()) return;
    try {
      console.log({ userName, comment });
      const res = await axios.post(`${API}/posts/${post._id}/comment`, {
        text: comment,
        username: userName,
      });
      setAllComments(res.data.post.comments); // UI update
      setComment(""); //clear input
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="mt-[10px] max-[400px]:w-[300px] w-[400px] flex flex-col flex-nowrap">
      <h3 className="mx-[5px] text-gray-500">comments</h3>
      {visibleComments.length === 0 ? (
        <h5 className="text-sm">no comments yet</h5>
      ) : (
        visibleComments.map((c, i) => (
          <div key={i} className="px-[10px]">
            <strong className="text-md ">{c.username}:</strong>
            {c.text}
          </div>
        ))
      )}
      {allComments.length > 2 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="bg-none border-none text-blue-400 text-sm cursor-pointer mt-[5px]"
        >
          {showAll ? "Hide comments" : "View more"}
        </button>
      )}

      <div className="flex  border-[1px] w-fit border-gray-500 ">
        <input
          type="text"
          value={comment}
          className="outline-none p-1"
          placeholder="add a comment..."
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          className="bg-gray-900 text-white  min-w-[50px] flex justify-center items-center h-[40px]"
          onClick={handleAddComment}
        >
          <IoSend classsname="hover:text-white text-gray-100" />
        </button>
      </div>
    </div>
  );
};

export default Comments;
