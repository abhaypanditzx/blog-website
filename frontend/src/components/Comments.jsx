import React, { useState } from "react";
import axios from "axios";
import { useCustomHook } from "../contexts/GlobalContext";
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
    <div className="comments">
      <h3>comments</h3>
      {visibleComments.length === 0 ? (
        <h5>no comments yet</h5>
      ) : (
        visibleComments.map((c, i) => (
          <div key={i}>
            <strong>{c.username}:</strong>
            {c.text}
          </div>
        ))
      )}
      {allComments.length > 2 && (
        <button
          onClick={() => setShowAll(!showAll)}
          style={{
            background: "none",
            border: "none",
            color: "blue",
            cursor: "pointer",
            marginTop: "5px",
          }}
        >
          {showAll ? "Hide comments" : "View more"}
        </button>
      )}

      <input
        type="text"
        value={comment}
        placeholder="add a comment..."
        onChange={(e) => setComment(e.target.value)}
      />
      <button onClick={handleAddComment}>post comment</button>
    </div>
  );
};

export default Comments;
